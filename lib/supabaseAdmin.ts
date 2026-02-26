import { createClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv, getServiceRoleKey } from "@/lib/env";

export function createSupabaseAdmin() {
  const env = getPublicSupabaseEnv();
  const serviceRoleKey = getServiceRoleKey();

  return createClient(env.supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
