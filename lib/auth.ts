import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function requireUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}

export async function requireAdmin() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (error || profile?.role !== "admin") {
    throw new Error("Forbidden");
  }

  return { supabase, user };
}
