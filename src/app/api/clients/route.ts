import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("client_profiles")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    postal_code,
    country,
    extra_fields,
  } = body;
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("client_profiles")
    .insert({
      name,
      email: email ?? null,
      phone: phone ?? null,
      address: address ?? null,
      city: city ?? null,
      state: state ?? null,
      postal_code: postal_code ?? null,
      country: country ?? "USA",
      extra_fields: extra_fields ?? {},
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
