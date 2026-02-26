import { NextResponse } from "next/server";
import { reserveToySchema } from "@/lib/validators";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireUser();
    const body = reserveToySchema.parse(await request.json());

    const { data, error } = await supabase.rpc("reserve_toy", { p_toy_id: body.toyId });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ rentalId: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reservation failed" },
      { status: 400 }
    );
  }
}
