"use client";

import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-legal-cream text-legal-navy">
      <header className="border-b border-legal-stone/20 bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-semibold text-legal-navy hover:text-legal-accent"
          >
            Legal Doc Automation
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/templates"
              className="text-sm font-medium text-legal-stone hover:text-legal-accent"
            >
              Templates
            </Link>
            <Link
              href="/clients"
              className="text-sm font-medium text-legal-stone hover:text-legal-accent"
            >
              Clients
            </Link>
            <Link
              href="/generate"
              className="text-sm font-medium text-legal-stone hover:text-legal-accent"
            >
              Generate
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
