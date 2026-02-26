import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { type RentalStatus, type ToyUnitStatus } from "@/lib/types";

export async function getCurrentUserProfile() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase.from("profiles").select("id, full_name, role").eq("id", user.id).single();

  return { user, profile };
}

export async function getToysWithAvailability(ageBucket?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("toys_with_availability").select("*").order("available_units", { ascending: false });

  if (ageBucket && ageBucket !== "all") {
    const [min, max] = ageBucket.split("-").map(Number);
    query = query.gte("age_min_months", min).lte("age_max_months", max);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getParentSnapshot(userId: string) {
  const supabase = await createServerSupabaseClient();

  const [{ data: points }, { data: rentals }, { data: subscription }] = await Promise.all([
    supabase.from("points_transactions").select("amount").eq("user_id", userId),
    supabase
      .from("rentals")
      .select("id, status, created_at, due_date, returned_at, toy_units(toys(name, points_cost))")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase.from("subscriptions").select("*").eq("user_id", userId).single()
  ]);

  const pointsBalance = (points ?? []).reduce((sum, row) => sum + row.amount, 0);
  return { pointsBalance, rentals: rentals ?? [], subscription };
}

export async function getPointsLedger(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("points_transactions")
    .select("id, type, amount, reference_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAdminInventory() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("toy_units")
    .select("id, status, condition, last_cleaned_at, toy_id, toys(name)")
    .order("id", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getAdminToyCatalog() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("toys").select("*").order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAdminRentals() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("rentals")
    .select("id, status, created_at, due_date, returned_at, user_id, toy_unit_id, toy_units(toys(name))")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAdminSubscribers() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("user_id, monthly_points, plan, status, profiles(full_name)")
    .order("renewal_date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export const rentalRequestableStatuses: RentalStatus[] = ["reserved", "shipped", "active"];
export const adminRentalStatuses: RentalStatus[] = [
  "reserved",
  "shipped",
  "active",
  "return_requested",
  "returned",
  "lost"
];
export const adminUnitStatuses: ToyUnitStatus[] = [
  "available",
  "reserved",
  "shipped",
  "in_use",
  "returned",
  "cleaning",
  "retired"
];
