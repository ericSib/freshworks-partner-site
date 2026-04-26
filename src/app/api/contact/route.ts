import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { upsertHubSpotContact } from "@/lib/hubspot";
import { createLogger } from "@/lib/logger";
import { getRequestId, REQUEST_ID_HEADER } from "@/lib/request-id";
import { getDefaultSender, getReplySender } from "@/lib/email/sender";

/** Lazy-instantiated Resend client — avoids build-time crash when env var is absent. */
function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL ?? "contact@whataservice.fr";

/** Extract client IP from request headers (Vercel sets x-forwarded-for). */
function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const log = createLogger("ContactForm", requestId);

  try {
    // --- Rate limiting ---
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateCheck.retryAfterMs / 1000)),
            [REQUEST_ID_HEADER]: requestId,
          },
        }
      );
    }

    // --- Parse & validate with Zod ---
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", details },
        { status: 400, headers: { [REQUEST_ID_HEADER]: requestId } }
      );
    }

    const { name, email, company, challenge, website } = result.data;

    // --- Honeypot check — silently reject bots ---
    if (website) {
      // Return 200 to not tip off the bot, but do nothing
      return NextResponse.json({ success: true });
    }

    // Sync to HubSpot CRM (fire-and-forget — never blocks the response)
    const hubspotSync = upsertHubSpotContact({ name, email, company, challenge });

    // If no Resend API key, log and return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      log.info("No RESEND_API_KEY set — dev mode submission", {
        email,
        company,
      });
      await hubspotSync;
      return NextResponse.json(
        { success: true },
        { headers: { [REQUEST_ID_HEADER]: requestId } }
      );
    }

    const resend = getResendClient();

    // Send emails + HubSpot sync in parallel
    await Promise.all([
      // Notification email to WaS
      resend.emails.send({
        from: getDefaultSender(),
        to: [RECIPIENT_EMAIL],
        replyTo: email,
        subject: `Nouvelle demande de ${name} — ${company}`,
        text: [
          `Nom : ${name}`,
          `Email : ${email}`,
          `Entreprise : ${company}`,
          `Challenge : ${challenge}`,
          "",
          "---",
          "Envoyé depuis le formulaire whataservice.fr",
        ].join("\n"),
      }),
      // Confirmation email to prospect
      resend.emails.send({
        from: getReplySender(),
        to: [email],
        subject: "Bien reçu — What A Service",
        text: [
          `Bonjour ${name},`,
          "",
          "Merci pour votre message. Je reviens vers vous sous 24 heures.",
          "",
          "Si vous souhaitez accélérer, réservez directement un créneau :",
          "https://calendly.com/whataservice/demo",
          "",
          "À très vite,",
          "Eric Sib",
          "What A Service",
        ].join("\n"),
      }),
      // HubSpot CRM sync
      hubspotSync,
    ]);

    log.info("Contact form submitted", { email, company });
    return NextResponse.json(
      { success: true },
      { headers: { [REQUEST_ID_HEADER]: requestId } }
    );
  } catch (error) {
    log.error("Contact form failed", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { [REQUEST_ID_HEADER]: requestId } }
    );
  }
}
