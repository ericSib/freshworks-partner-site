import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quizSubmitSchema, type QuizSubmitPayload } from "@/lib/validation";
import { quizRateLimiter } from "@/lib/rate-limit";
import { upsertHubSpotQuizLead } from "@/lib/quiz/hubspot";
import { createLogger } from "@/lib/logger";
import { getRequestId, REQUEST_ID_HEADER } from "@/lib/request-id";

/** Lazy Resend client — avoid build-time crash when the env var is absent. */
function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL ?? "contact@whataservice.fr";

/** Extract the client IP from request headers (Vercel sets x-forwarded-for). */
function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

/** Structured log data for quiz submissions. */
function quizLogData(payload: QuizSubmitPayload): Record<string, unknown> {
  return {
    segment: payload.segment,
    overallScore: payload.overallScore,
    level: payload.maturityLevel.level,
    emailDomain: payload.email.split("@")[1] ?? "unknown",
  };
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const log = createLogger("QuizSubmit", requestId);

  try {
    // --- Rate limiting (independent from /api/contact bucket) ---
    const ip = getClientIp(request);
    const rateCheck = quizRateLimiter.check(ip);
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
    const result = quizSubmitSchema.safeParse(body);

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

    const payload = result.data;

    // --- CRM sync (fire-and-forget pattern — upsert itself never throws) ---
    const hubspotSync = upsertHubSpotQuizLead(payload);

    // --- Resend emails (optional — dev mode skips if no API key) ---
    if (!process.env.RESEND_API_KEY) {
      log.info("No RESEND_API_KEY set — dev mode submission", quizLogData(payload));
      await hubspotSync;
      return NextResponse.json(
        { success: true },
        { headers: { [REQUEST_ID_HEADER]: requestId } }
      );
    }

    const resend = getResendClient();

    await Promise.all([
      // Internal notification to the sales inbox
      resend.emails.send({
        from: "What A Service <noreply@whataservice.fr>",
        to: [RECIPIENT_EMAIL],
        replyTo: payload.email,
        subject: `Quiz ${payload.segment.toUpperCase()} — score ${payload.overallScore}/100 (${payload.email})`,
        text: [
          `Segment : ${payload.segment.toUpperCase()}`,
          `Score : ${payload.overallScore}/100`,
          `Niveau : ${payload.maturityLevel.level}`,
          `Email : ${payload.email}`,
          "",
          `Entreprise : ${payload.demographics.companySize}`,
          `Secteur : ${payload.demographics.industry}`,
          `Rôle : ${payload.demographics.role}`,
          "",
          "Dimensions à renforcer :",
          ...payload.weakestDimensions
            .slice(0, 3)
            .map((d, i) => `  ${i + 1}. ${d.id} — ${d.score.toFixed(1)}/5`),
          "",
          "---",
          "Envoyé depuis le quiz de maturité whataservice.fr",
        ].join("\n"),
      }),
      // Confirmation email to the prospect
      resend.emails.send({
        from: "Eric Sib — What A Service <noreply@whataservice.fr>",
        to: [payload.email],
        subject: "Votre Score de Maturité ITSM/CX — What A Service",
        text: [
          "Bonjour,",
          "",
          `Merci d'avoir complété notre évaluation de maturité ${payload.segment.toUpperCase()}.`,
          "",
          `Votre score global : ${payload.overallScore}/100 (niveau ${payload.maturityLevel.level}).`,
          "",
          "Je vous propose un échange de 30 minutes pour discuter concrètement",
          "de votre trajectoire de maturité :",
          "https://calendly.com/whataservice/demo",
          "",
          "À très vite,",
          "Eric Sib",
          "What A Service",
        ].join("\n"),
      }),
      hubspotSync,
    ]);

    log.info("Quiz submitted", quizLogData(payload));
    return NextResponse.json(
      { success: true },
      { headers: { [REQUEST_ID_HEADER]: requestId } }
    );
  } catch (error) {
    log.error("Quiz submission failed", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { [REQUEST_ID_HEADER]: requestId } }
    );
  }
}
