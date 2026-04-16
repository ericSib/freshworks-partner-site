/**
 * HubSpot CRM integration — Creates or updates contacts from form submissions.
 *
 * Uses the HubSpot CRM v3 API with a Private App token.
 * The token is read from `HUBSPOT_ACCESS_TOKEN` env var (never bundled client-side).
 */

import { createLogger } from "@/lib/logger";

const HUBSPOT_API = "https://api.hubapi.com";
const log = createLogger("HubSpot");

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  challenge: string;
}

interface HubSpotError {
  status: string;
  message: string;
  category: string;
}

/**
 * Split a full name into first and last name.
 * "Jean Dupont" → { firstname: "Jean", lastname: "Dupont" }
 * "Jean"        → { firstname: "Jean", lastname: "" }
 */
export function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstname: parts[0] ?? "",
    lastname: parts.slice(1).join(" "),
  };
}

/**
 * Build the HubSpot properties object from form data.
 */
export function buildProperties(data: ContactPayload) {
  const { firstname, lastname } = splitName(data.name);
  return {
    email: data.email,
    firstname,
    lastname,
    company: data.company,
    message: `Challenge: ${data.challenge}`,
    hs_lead_status: "NEW",
    lifecyclestage: "lead",
  };
}

/**
 * Search for an existing contact by email.
 * Returns the contact ID if found, null otherwise.
 */
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
          filters: [
            { propertyName: "email", operator: "EQ", value: email },
          ],
        },
      ],
      limit: 1,
    }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { total: number; results: { id: string }[] };
  return data.total > 0 ? data.results[0].id : null;
}

/**
 * Create a new contact in HubSpot.
 */
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

/**
 * Update an existing contact in HubSpot.
 */
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
 * Upsert a contact in HubSpot CRM.
 *
 * - If a contact with this email exists → update with latest data.
 * - If not → create a new contact.
 * - Fails silently (logs error) so the form submission is never blocked by CRM issues.
 */
export async function upsertHubSpotContact(
  data: ContactPayload
): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    log.info("No HUBSPOT_ACCESS_TOKEN set — skipping CRM sync");
    return;
  }

  try {
    const properties = buildProperties(data);
    const existingId = await findContactByEmail(data.email, token);

    if (existingId) {
      await updateContact(existingId, properties, token);
      log.info("Updated contact", { contactId: existingId, email: data.email });
    } else {
      const created = await createContact(properties, token);
      log.info("Created contact", { contactId: created.id, email: data.email });
    }
  } catch (error) {
    // Never block form submission because of a CRM error.
    log.error("CRM sync failed", error, { email: data.email });
  }
}
