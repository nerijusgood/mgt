import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateRentalSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = updateRentalSchema.parse(await request.json());

    if (body.status === "returned") {
      const { error } = await supabase.rpc("admin_mark_rental_returned", { p_rental_id: body.rentalId });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true });
    }

    const update: { status: string; returned_at?: string | null } = { status: body.status };
    if (body.status === "returned") {
      update.returned_at = new Date().toISOString();
    }

    const { error } = await supabase.from("rentals").update(update).eq("id", body.rentalId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 400 });
  }
}
