"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Plus } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string | null;
  city: string | null;
  created_at: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-legal-navy">Clients</h1>
        <Link
          href="/clients/new"
          className="inline-flex items-center gap-2 rounded bg-legal-accent px-4 py-2 text-sm font-medium text-white hover:bg-legal-accentDark"
        >
          <Plus className="h-4 w-4" /> New client
        </Link>
      </div>
      <p className="mt-2 text-legal-stone">
        Client profiles are used to fill placeholders when generating documents.
      </p>
      {loading ? (
        <p className="mt-6 text-legal-stone">Loading…</p>
      ) : clients.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-legal-stone/40 bg-white/50 p-8 text-center">
          <p className="text-legal-stone">No clients yet.</p>
          <Link
            href="/clients/new"
            className="mt-2 inline-block text-legal-accent hover:underline"
          >
            Add your first client
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <li key={c.id}>
              <Link
                href={`/clients?selected=${c.id}`}
                className="flex items-start gap-3 rounded-lg border border-legal-stone/20 bg-white p-4 shadow-sm transition hover:border-legal-accent/40 hover:shadow-md"
              >
                <div className="rounded bg-legal-accent/10 p-2">
                  <User className="h-5 w-5 text-legal-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-legal-navy">{c.name}</h3>
                  {c.email && (
                    <p className="text-sm text-legal-stone">{c.email}</p>
                  )}
                  {c.city && (
                    <p className="text-sm text-legal-stone">{c.city}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
