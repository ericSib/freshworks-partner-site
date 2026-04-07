import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // If no API key, log and return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log("[Contact Form] No RESEND_API_KEY set. Submission:", {
        name,
        email,
        company,
        challenge,
      });
      return NextResponse.json({ success: true });
    }

    // Send notification email to WaS
    await resend.emails.send({
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
    });

    // Send confirmation email to prospect
    await resend.emails.send({
      from: "Eric Sib — What A Service <noreply@whataservice.fr>",
      to: [email],
      subject: "Bien reçu — What A Service",
      text: [
        `Bonjour ${name},`,
        "",
        "Merci pour votre message. Je reviens vers vous sous 24 heures.",
        "",
        "Si vous souhaitez accélérer, réservez directement un créneau :",
        "https://calendly.com/whataservice",
        "",
        "À très vite,",
        "Eric Sib",
        "What A Service",
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
