import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { extractPlaceholders } from "@/lib/placeholders";

export async function GET() {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, file_name, content } = body as {
    name?: string;
    description?: string;
    file_name?: string;
    content?: string;
  };
  if (!name || !file_name || content === undefined) {
    return NextResponse.json(
      { error: "Missing name, file_name, or content" },
      { status: 400 }
    );
  }
  const placeholders = extractPlaceholders(content);
  const { data, error } = await supabase
    .from("templates")
    .insert({
      name,
      description: description ?? null,
      file_name,
      content,
      placeholders,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
