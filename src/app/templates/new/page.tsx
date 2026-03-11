"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractPlaceholders } from "@/lib/placeholders";

export default function NewTemplatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setContent(text);
      if (!name) setName(file.name.replace(/\.[^.]+$/, ""));
    };
    reader.readAsText(file);
  };

  const placeholders = content ? extractPlaceholders(content) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    if (!name.trim()) {
      setUploadError("Template name is required.");
      return;
    }
    if (!content.trim()) {
      setUploadError("Please paste content or upload a file.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          file_name: fileName || "template.txt",
          content: content.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/templates");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to save template.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-legal-navy">New template</h1>
      <p className="mt-2 text-legal-stone">
        Upload a .txt file or paste content. Use {"{{placeholder_name}}"} for
        variables.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Template name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            placeholder="e.g. Retainer Agreement"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Upload file or paste content *
          </label>
          <input
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileChange}
            className="block w-full text-sm text-legal-stone file:mr-2 file:rounded file:border-0 file:bg-legal-accent/10 file:px-3 file:py-1.5 file:text-legal-accent"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="mt-2 w-full rounded border border-legal-stone/30 px-3 py-2 font-mono text-sm text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            placeholder="Or paste template content here. Use {{client_name}}, {{effective_date}}, etc."
          />
          {placeholders.length > 0 && (
            <p className="mt-1 text-sm text-legal-stone">
              Detected placeholders: {placeholders.join(", ")}
            </p>
          )}
        </div>
        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-legal-accent px-4 py-2 font-medium text-white hover:bg-legal-accentDark disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save template"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-legal-stone/30 px-4 py-2 font-medium text-legal-navy hover:bg-legal-cream"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
