import Link from "next/link";
import { FileText, Users, FileCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-legal-navy">
        Legal Document Automation
      </h1>
      <p className="mt-2 text-legal-stone">
        Upload templates, manage client profiles, and generate documents with
        one click.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <Link
          href="/templates"
          className="flex flex-col rounded-lg border border-legal-stone/20 bg-white p-6 shadow-sm transition hover:border-legal-accent/40 hover:shadow-md"
        >
          <FileText className="h-10 w-10 text-legal-accent" />
          <h2 className="mt-3 font-semibold text-legal-navy">Templates</h2>
          <p className="mt-1 text-sm text-legal-stone">
            Upload and manage document templates with placeholders.
          </p>
        </Link>
        <Link
          href="/clients"
          className="flex flex-col rounded-lg border border-legal-stone/20 bg-white p-6 shadow-sm transition hover:border-legal-accent/40 hover:shadow-md"
        >
          <Users className="h-10 w-10 text-legal-accent" />
          <h2 className="mt-3 font-semibold text-legal-navy">Clients</h2>
          <p className="mt-1 text-sm text-legal-stone">
            Add and edit client profiles for document generation.
          </p>
        </Link>
        <Link
          href="/generate"
          className="flex flex-col rounded-lg border border-legal-stone/20 bg-white p-6 shadow-sm transition hover:border-legal-accent/40 hover:shadow-md"
        >
          <FileCheck className="h-10 w-10 text-legal-accent" />
          <h2 className="mt-3 font-semibold text-legal-navy">Generate</h2>
          <p className="mt-1 text-sm text-legal-stone">
            Pick a template and client to generate a document.
          </p>
        </Link>
      </div>
    </div>
  );
}
