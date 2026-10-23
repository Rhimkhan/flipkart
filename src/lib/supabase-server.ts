import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// SUPABASE_SERVICE_ROLE_KEY is strictly server-side and never exposed to client code
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const effectiveKey =
  serviceRoleKey &&
  !serviceRoleKey.includes("your-service-role-key-here") &&
  serviceRoleKey.trim() !== ""
    ? serviceRoleKey
    : anonKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  effectiveKey &&
  supabaseUrl !== "https://your-project.supabase.co"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, effectiveKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
