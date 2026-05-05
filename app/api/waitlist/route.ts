import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  // RFC 5321 max email length is 254 chars; trim and lowercase for normalization
  email: z.string().trim().toLowerCase().max(254).email(),
  segment: z.enum(["parent", "daycare", "institution"]).optional()
});

// Simple in-memory rate limiter: max 3 attempts per IP per 15 minutes.
// Sufficient for a single-instance coming-soon page; replace with Redis/KV for multi-instance.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  // Require JSON content type
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    return NextResponse.json({ error: "Waitlist is not available right now." }, { status: 500 });
  }

  let body: { email: string; segment?: string };
  try {
    const raw = await request.json();
    body = waitlistSchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: body.email,
        tags: ["coming-soon", "website", ...(body.segment ? [body.segment] : [])]
      }),
      cache: "no-store"
    });

    const payload = (await response.json()) as { code?: string };

    if (!response.ok) {
      if (payload.code === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
        return NextResponse.json({ message: "You are already on the waitlist." });
      }
      // Don't forward raw upstream error messages to the client
      return NextResponse.json({ error: "Unable to join the waitlist." }, { status: 400 });
    }

    return NextResponse.json({ message: "You're on the list. We'll be in touch soon." });
  } catch {
    return NextResponse.json({ error: "Unable to join the waitlist." }, { status: 500 });
  }
}
