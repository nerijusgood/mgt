import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { upsertToySchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = upsertToySchema.parse(await request.json());

    const payload = {
      name: body.name,
      description: body.description,
      age_min_months: body.age_min_months,
      age_max_months: body.age_max_months,
      points_cost: body.points_cost,
      tags: body.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      image_url: body.image_url
    };

    if (body.id) {
      const { error } = await supabase.from("toys").update(payload).eq("id", body.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase.from("toys").insert(payload);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Save failed" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Missing valid toy id" }, { status: 400 });
    }

    const { error } = await supabase.from("toys").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Delete failed" }, { status: 400 });
  }
}
