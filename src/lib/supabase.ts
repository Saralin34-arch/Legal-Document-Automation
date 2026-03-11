import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Template = {
  id: string;
  name: string;
  description: string | null;
  file_name: string;
  content: string;
  placeholders: string[];
  created_at: string;
  updated_at: string;
};

export type ClientProfile = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  extra_fields: Record<string, string> | null;
  created_at: string;
  updated_at: string;
};

export type GeneratedDocument = {
  id: string;
  template_id: string;
  client_profile_id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
};
