"use client";

import { useState, useEffect } from "react";

type Props = {
  title: string;
  content: string;
  onSave?: (content: string) => void | Promise<void>;
  onExport?: () => void;
  readOnly?: boolean;
};

export default function DocumentPreview({
  title,
  content,
  onSave,
  onExport,
  readOnly = false,
}: Props) {
  const [editedContent, setEditedContent] = useState(content);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setEditedContent(content);
  }, [content]);
  const isDirty = editedContent !== content;

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave(editedContent);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-legal-stone/20 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-legal-stone/20 px-4 py-3">
        <h2 className="font-semibold text-legal-navy">{title}</h2>
        <div className="flex gap-2">
          {onSave && !readOnly && (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="rounded bg-legal-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-legal-accentDark disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save edits"}
            </button>
          )}
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="rounded border border-legal-stone/30 px-3 py-1.5 text-sm font-medium text-legal-navy hover:bg-legal-cream"
            >
              Export
            </button>
          )}
        </div>
      </div>
      <div className="min-h-[400px] p-4">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          readOnly={readOnly}
          className="h-full min-h-[380px] w-full resize-y rounded border border-legal-stone/20 p-4 font-mono text-sm text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent disabled:bg-legal-cream disabled:opacity-90"
          spellCheck="true"
        />
      </div>
    </div>
  );
}
