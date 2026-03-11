import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { buildReplacementMap, replacePlaceholders } from "@/lib/replacement";

export async function GET() {
  const { data, error } = await supabase
    .from("generated_documents")
    .select("*, templates(name), client_profiles(name)")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { template_id, client_profile_id, title } = body as {
    template_id?: string;
    client_profile_id?: string;
    title?: string;
  };
  if (!template_id || !client_profile_id) {
    return NextResponse.json(
      { error: "Missing template_id or client_profile_id" },
      { status: 400 }
    );
  }

  const [templateRes, clientRes] = await Promise.all([
    supabase.from("templates").select("content").eq("id", template_id).single(),
    supabase
      .from("client_profiles")
      .select("*")
      .eq("id", client_profile_id)
      .single(),
  ]);

  if (templateRes.error || !templateRes.data) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 404 }
    );
  }
  if (clientRes.error || !clientRes.data) {
    return NextResponse.json(
      { error: "Client profile not found" },
      { status: 404 }
    );
  }

  const map = buildReplacementMap(clientRes.data);
  const content = replacePlaceholders(templateRes.data.content, map);

  const docTitle =
    title ?? `Document ${new Date().toISOString().slice(0, 10)}`;
  const { data, error } = await supabase
    .from("generated_documents")
    .insert({
      template_id,
      client_profile_id,
      title: docTitle,
      content,
      status: "draft",
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
