"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DocumentPreview from "@/components/DocumentPreview";

type Doc = {
  id: string;
  title: string;
  content: string;
  status: string;
  templates?: { name: string } | null;
  client_profiles?: { name: string } | null;
};

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setDoc(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (content: string) => {
    const res = await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to save");
    }
    const data = await res.json();
    setDoc((prev) => (prev ? { ...prev, ...data } : data));
  };

  const handleExport = () => {
    if (!doc) return;
    const blob = new Blob([doc.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9-_]/gi, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-legal-stone">Loading…</p>;
  if (error || !doc) {
    return (
      <div>
        <p className="text-red-600">{error || "Document not found."}</p>
        <button
          type="button"
          onClick={() => router.push("/generate")}
          className="mt-2 text-legal-accent hover:underline"
        >
          Back to Generate
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-legal-stone">
        {doc.templates?.name && <span>Template: {doc.templates.name}</span>}
        {doc.client_profiles?.name && (
          <span>· Client: {doc.client_profiles.name}</span>
        )}
      </div>
      <DocumentPreview
        title={doc.title}
        content={doc.content}
        onSave={handleSave}
        onExport={handleExport}
      />
    </div>
  );
}
