"use client";

import { useState } from "react";

export type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  extra_fields?: Record<string, string>;
};

const defaultData: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "USA",
};

type Props = {
  initialData?: Partial<ClientFormData>;
  onSubmit: (data: ClientFormData) => void | Promise<void>;
  submitLabel?: string;
};

export default function ClientForm({
  initialData,
  onSubmit,
  submitLabel = "Save Client",
}: Props) {
  const [data, setData] = useState<ClientFormData>({
    ...defaultData,
    ...initialData,
  });
  const [saving, setSaving] = useState(false);

  const update = (field: keyof ClientFormData, value: string | Record<string, string>) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-legal-navy">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          placeholder="John Smith"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-legal-navy">
          Address
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          placeholder="123 Main St"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            City
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            State
          </label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => update("state", e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-legal-navy">
            Postal Code
          </label>
          <input
            type="text"
            value={data.postal_code}
            onChange={(e) => update("postal_code", e.target.value)}
            className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-legal-navy">
          Country
        </label>
        <input
          type="text"
          value={data.country}
          onChange={(e) => update("country", e.target.value)}
          className="w-full rounded border border-legal-stone/30 px-3 py-2 text-legal-navy focus:border-legal-accent focus:outline-none focus:ring-1 focus:ring-legal-accent"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-legal-accent px-4 py-2 font-medium text-white hover:bg-legal-accentDark disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
