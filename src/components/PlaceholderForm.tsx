"use client";

import { useState } from "react";
import { placeholderToLabel } from "@/lib/placeholders";
import type { ReplacementMap } from "@/lib/replacement";

const STANDARD_KEYS = [
  "client_name",
  "client_email",
  "client_phone",
  "client_address",
  "client_city",
  "client_state",
  "client_postal_code",
  "client_country",
  "effective_date",
];

type Props = {
  placeholders: string[];
  initialValues?: ReplacementMap;
  onSubmit: (values: ReplacementMap) => void | Promise<void>;
  submitLabel?: string;
};

export default function PlaceholderForm({
  placeholders,
  initialValues = {},
  onSubmit,
  submitLabel = "Generate Preview",
}: Props) {
  const [values, setValues] = useState<ReplacementMap>(() => {
    const map: ReplacementMap = { ...initialValues };
    for (const key of placeholders) {
      if (map[key] === undefined) map[key] = "";
    }
    return map;
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  if (placeholders.length === 0) {
    return (
      <p className="text-sm text-legal-stone">
        No placeholders in this template. You can generate the document as-is.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {placeholders.map((key) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            {placeholderToLabel(key)}
          </label>
          {key === "effective_date" && !initialValues[key] ? (
            <input
              type="text"
              value={values[key] ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            />
          ) : (
            <input
              type="text"
              value={values[key] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
              placeholder={STANDARD_KEYS.includes(key) ? undefined : `{{${key}}}`}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-legal-accent px-4 py-2 font-medium text-white hover:bg-legal-accentDark disabled:opacity-60"
      >
        {saving ? "Generating…" : submitLabel}
      </button>
    </form>
  );
}
