import { NextResponse } from "next/server";

const COOKIE_NAME = "mg_demo_access";

export async function POST(request: Request) {
  const demoPassword = process.env.DEMO_ACCESS_PASSWORD;
  if (!demoPassword) {
    return NextResponse.json({ error: "Demo password is not configured" }, { status: 400 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (password !== demoPassword) {
    return NextResponse.json({ error: "Invalid demo password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, demoPassword, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}
