"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

type Template = {
  id: string;
  name: string;
  description: string | null;
  file_name: string;
  placeholders: string[];
  created_at: string;
};

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates?selected=${template.id}`}
      className="block rounded-lg border border-legal-stone/20 bg-white p-4 shadow-sm transition hover:border-legal-accent/40 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="rounded bg-legal-accent/10 p-2">
          <FileText className="h-5 w-5 text-legal-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-legal-navy">{template.name}</h3>
          <p className="mt-0.5 text-sm text-legal-stone">
            {template.file_name}
            {template.placeholders?.length > 0 && (
              <span className="ml-2">
                · {template.placeholders.length} placeholder
                {template.placeholders.length !== 1 ? "s" : ""}
              </span>
            )}
          </p>
          {template.description && (
            <p className="mt-1 text-sm text-legal-stone/80 line-clamp-2">
              {template.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
