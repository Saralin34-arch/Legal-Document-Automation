/**
 * Placeholder detection for legal document templates.
 * Detects {{placeholder_name}} style tokens in text.
 */

const PLACEHOLDER_REGEX = /\{\{([a-zA-Z0-9_]+)\}\}/g;

/**
 * Extract unique placeholder keys from template content.
 * Example: "Hello {{client_name}}, date: {{effective_date}}" -> ["client_name", "effective_date"]
 */
export function extractPlaceholders(content: string): string[] {
  const keys = new Set<string>();
  let match: RegExpExecArray | null;
  const re = new RegExp(PLACEHOLDER_REGEX.source, "g");
  while ((match = re.exec(content)) !== null) {
    keys.add(match[1]);
  }
  return Array.from(keys).sort();
}

/**
 * Check if a string contains any placeholders.
 */
export function hasPlaceholders(content: string): boolean {
  return PLACEHOLDER_REGEX.test(content);
}

/**
 * Human-readable label for a placeholder key.
 * client_name -> Client Name
 */
export function placeholderToLabel(key: string): string {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
