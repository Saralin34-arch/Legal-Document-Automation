/**
 * Placeholder replacement engine.
 * Replaces {{key}} in template content with values from a record.
 */

const PLACEHOLDER_REGEX = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export type ReplacementMap = Record<string, string>;

/**
 * Replace all {{key}} placeholders in content with values from the map.
 * Missing keys are replaced with empty string (or optional placeholder).
 */
export function replacePlaceholders(
  content: string,
  values: ReplacementMap,
  options?: { missingValue?: string }
): string {
  const missing = options?.missingValue ?? "";
  return content.replace(PLACEHOLDER_REGEX, (_, key: string) => {
    const value = values[key];
    return value !== undefined && value !== null ? String(value) : missing;
  });
}

/**
 * Build a replacement map from common client fields + extra_fields.
 */
export function buildReplacementMap(
  client: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    extra_fields?: Record<string, string> | null;
  },
  overrides?: ReplacementMap
): ReplacementMap {
  const map: ReplacementMap = {
    client_name: client.name ?? "",
    client_email: client.email ?? "",
    client_phone: client.phone ?? "",
    client_address: client.address ?? "",
    client_city: client.city ?? "",
    client_state: client.state ?? "",
    client_postal_code: client.postal_code ?? "",
    client_country: client.country ?? "",
    effective_date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  if (client.extra_fields && typeof client.extra_fields === "object") {
    for (const [k, v] of Object.entries(client.extra_fields)) {
      map[k] = v != null ? String(v) : "";
    }
  }
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      map[k] = v != null ? String(v) : "";
    }
  }
  return map;
}
