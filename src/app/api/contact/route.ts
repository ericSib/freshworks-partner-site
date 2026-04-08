import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL_REGEX } from "@/lib/validation";
import { upsertHubSpotContact } from "@/lib/hubspot";

/** Lazy-instantiated Resend client — avoids build-time crash when env var is absent. */
function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL ?? "contact@whataservice.fr";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, challenge } = body;

    // Validate required fields
    if (!name || !email || !company || !challenge) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sync to HubSpot CRM (fire-and-forget — never blocks the response)
    const hubspotSync = upsertHubSpotContact({ name, email, company, challenge });

    // If no Resend API key, log and return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log("[Contact Form] No RESEND_API_KEY set. Submission:", {
        name,
        email,
        company,
        challenge,
      });
      await hubspotSync;
      return NextResponse.json({ success: true });
    }

    const resend = getResendClient();

    // Send emails + HubSpot sync in parallel
    await Promise.all([
      // Notification email to WaS
      resend.emails.send({
        from: "What A Service <noreply@whataservice.fr>",
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
        from: "Eric Sib — What A Service <noreply@whataservice.fr>",
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
