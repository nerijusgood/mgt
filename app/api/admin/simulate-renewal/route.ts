import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { simulateRenewalSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = simulateRenewalSchema.parse(await request.json());

    const { error } = await supabase.from("points_transactions").insert({
      user_id: body.userId,
      type: "allocation",
      amount: body.amount,
      reference_id: null
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Simulation failed" }, { status: 400 });
  }
}
