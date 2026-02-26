import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { supabase } = await requireUser();
    const { id } = await context.params;
    const { error } = await supabase.rpc("request_rental_return", { p_rental_id: id });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to request return" },
      { status: 400 }
    );
  }
}
