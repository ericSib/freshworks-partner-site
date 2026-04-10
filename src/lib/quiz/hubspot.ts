/**
 * HubSpot integration dedicated to quiz lead capture.
 *
 * Unlike /api/contact leads (generic inbound form), quiz leads carry
 * structured maturity data that drives segmentation and nurture
 * campaigns in HubSpot: score, level, segment (itsm/cx), weakest
 * dimensions, demographics.
 *
 * The custom properties below must exist on the HubSpot Contact
 * schema before deployment — see the US-18.9 story for the runbook.
 */

import type { QuizSubmitPayload } from "@/lib/validation";

const HUBSPOT_API = "https://api.hubapi.com";

interface HubSpotError {
  status: string;
  message: string;
  category: string;
}

/** Best-effort first name from the email local-part. */
function deriveFirstNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  if (!local) return "";
  // Normalise "jean.dupont" / "jean_dupont" / "jean-dupont" → "Jean"
  const first = local.split(/[._-]/)[0] ?? local;
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

/** Resolve a translated label from an i18n key via the caller's `t()`. */
type Translator = (key: string) => string;

/**
 * Map the validated quiz payload to the set of HubSpot custom properties.
 * Pure function — easy to unit-test.
 */
export function buildQuizProperties(
  payload: QuizSubmitPayload,
  t?: Translator
): Record<string, string> {
  const firstname = deriveFirstNameFromEmail(payload.email);
  const top3 = payload.weakestDimensions.slice(0, 3);
  const maturityLabel = t
    ? t(payload.maturityLevel.labelKey)
    : payload.maturityLevel.labelKey;

  return {
    email: payload.email,
    firstname,
    lastname: "",
    company: `Quiz ${payload.segment.toUpperCase()} lead`,
    hs_lead_status: "NEW",
    lifecyclestage: "marketingqualifiedlead",
    quiz_segment: payload.segment,
    quiz_score: String(payload.overallScore),
    quiz_level: String(payload.maturityLevel.level),
    quiz_maturity_label: maturityLabel,
    quiz_weakest_dim_1: top3[0]?.id ?? "",
    quiz_weakest_dim_2: top3[1]?.id ?? "",
    quiz_weakest_dim_3: top3[2]?.id ?? "",
    quiz_company_size: payload.demographics.companySize,
    quiz_industry: payload.demographics.industry,
    quiz_role: payload.demographics.role,
    quiz_submitted_at: new Date().toISOString(),
  };
}

async function findContactByEmail(
  email: string,
  token: string
): Promise<string | null> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName: "email", operator: "EQ", value: email }],
        },
      ],
      limit: 1,
    }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    total: number;
    results: { id: string }[];
  };
  return data.total > 0 ? data.results[0].id : null;
}

async function createContact(
  properties: Record<string, string>,
  token: string
): Promise<{ id: string }> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const err = (await res.json()) as HubSpotError;
    throw new Error(`HubSpot create failed: ${err.message}`);
  }

  return res.json() as Promise<{ id: string }>;
}

async function updateContact(
  contactId: string,
  properties: Record<string, string>,
  token: string
): Promise<void> {
  const res = await fetch(
    `${HUBSPOT_API}/crm/v3/objects/contacts/${contactId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    }
  );

  if (!res.ok) {
    const err = (await res.json()) as HubSpotError;
    throw new Error(`HubSpot update failed: ${err.message}`);
  }
}

/**
 * Upsert a quiz lead in HubSpot CRM.
 *
 * - If a contact with this email exists → update with the latest quiz data.
 * - If not → create a new marketing-qualified lead.
 * - Fails silently (logs error) so the submit endpoint is never blocked
 *   by CRM issues: the user still sees their results.
 */
export async function upsertHubSpotQuizLead(
  payload: QuizSubmitPayload,
  t?: Translator
): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    console.log("[HubSpot] No HUBSPOT_ACCESS_TOKEN set — skipping quiz CRM sync.");
    return;
  }

  try {
    const properties = buildQuizProperties(payload, t);
    const existingId = await findContactByEmail(payload.email, token);

    if (existingId) {
      await updateContact(existingId, properties, token);
      console.log(
        `[HubSpot] Updated quiz lead ${existingId} (${payload.email})`
      );
    } else {
      const created = await createContact(properties, token);
      console.log(
        `[HubSpot] Created quiz lead ${created.id} (${payload.email})`
      );
    }
  } catch (error) {
    console.error("[HubSpot] Quiz lead sync failed:", error);
  }
}
