"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import { Plus } from "lucide-react";

type Template = {
  id: string;
  name: string;
  description: string | null;
  file_name: string;
  placeholders: string[];
  created_at: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((data) => {
        setTemplates(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-legal-navy">Templates</h1>
        <Link
          href="/templates/new"
          className="inline-flex items-center gap-2 rounded bg-legal-accent px-4 py-2 text-sm font-medium text-white hover:bg-legal-accentDark"
        >
          <Plus className="h-4 w-4" /> New template
        </Link>
      </div>
      <p className="mt-2 text-legal-stone">
        Upload .txt or paste content. Placeholders like {"{{client_name}}"} are
        detected automatically.
      </p>
      {loading ? (
        <p className="mt-6 text-legal-stone">Loading…</p>
      ) : templates.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-legal-stone/40 bg-white/50 p-8 text-center">
          <p className="text-legal-stone">No templates yet.</p>
          <Link
            href="/templates/new"
            className="mt-2 inline-block text-legal-accent hover:underline"
          >
            Upload your first template
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <li key={t.id}>
              <TemplateCard template={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
