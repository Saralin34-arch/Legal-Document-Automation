"use client";

import { useRouter } from "next/navigation";
import ClientForm, { type ClientFormData } from "@/components/ClientForm";

export default function NewClientPage() {
  const router = useRouter();

  const handleSubmit = async (data: ClientFormData) => {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to save");
    }
    router.push("/clients");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-legal-navy">New client</h1>
      <p className="mt-2 text-legal-stone">
        Add a client profile. These fields map to common placeholders like
        client_name, client_address, effective_date.
      </p>
      <div className="mt-6 max-w-xl">
        <ClientForm onSubmit={handleSubmit} submitLabel="Create client" />
      </div>
    </div>
  );
}
