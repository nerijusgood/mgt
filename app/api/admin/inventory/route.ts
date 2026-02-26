import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateUnitSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = updateUnitSchema.parse(await request.json());

    const update: { status: string; condition: string; last_cleaned_at?: string } = {
      status: body.status,
      condition: body.condition
    };

    if (body.status === "available" || body.status === "cleaning") {
      update.last_cleaned_at = new Date().toISOString();
    }

    const { error } = await supabase.from("toy_units").update(update).eq("id", body.unitId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 400 });
  }
}
