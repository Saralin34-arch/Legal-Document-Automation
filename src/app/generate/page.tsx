"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildReplacementMap } from "@/lib/replacement";

type Template = { id: string; name: string };
type ClientProfile = { id: string; name: string; email?: string | null; address?: string | null; city?: string | null; state?: string | null; postal_code?: string | null; country?: string | null; extra_fields?: Record<string, string> | null };

export default function GeneratePage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/templates").then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
    ]).then(([tData, cData]) => {
      setTemplates(Array.isArray(tData) ? tData : []);
      setClients(Array.isArray(cData) ? cData : []);
    }).finally(() => setLoading(false));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!templateId || !clientId) {
      setError("Please select a template and a client.");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template_id: templateId,
          client_profile_id: clientId,
          title: title.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      router.push(`/documents/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate document.");
    } finally {
      setGenerating(false);
    }
  };

  const selectedClient = clients.find((c) => c.id === clientId);
  const mapPreview = selectedClient ? buildReplacementMap(selectedClient) : null;

  if (loading) {
    return <p className="text-legal-stone">Loading…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-legal-navy">Generate document</h1>
      <p className="mt-2 text-legal-stone">
        Choose a template and client. The system will fill placeholders and open
        a preview for review and export.
      </p>
      <form onSubmit={handleGenerate} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Template *
          </label>
          <select
            required
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          >
            <option value="">Select a template</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Client *
          </label>
          <select
            required
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Document title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            placeholder="e.g. Retainer Agreement - John Smith"
          />
        </div>
        {mapPreview && (
          <div className="rounded border border-legal-stone/20 bg-legal-cream/50 p-3 text-sm">
            <p className="font-medium text-legal-navy">Preview values:</p>
            <ul className="mt-1 list-inside list-disc text-legal-stone">
              {Object.entries(mapPreview).slice(0, 6).map(([k, v]) => (
                <li key={k}>
                  {k}: {v || "(empty)"}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={generating}
          className="rounded bg-legal-accent px-4 py-2 font-medium text-white hover:bg-legal-accentDark disabled:opacity-60"
        >
          {generating ? "Generating…" : "Generate & preview"}
        </button>
      </form>
    </div>
  );
}
