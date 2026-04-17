import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Waitlist is not configured. Missing EmailOctopus credentials." },
      { status: 500 }
    );
  }

  try {
    const body = waitlistSchema.parse(await request.json());

    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: body.email,
        tags: ["coming-soon", "website"]
      }),
      cache: "no-store"
    });

    const payload = (await response.json()) as { code?: string; message?: string };

    if (!response.ok) {
      if (payload.code === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
        return NextResponse.json({ message: "You are already on the waitlist." });
      }

      return NextResponse.json(
        { error: payload.message ?? "Unable to add email to EmailOctopus." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "You are on the waitlist. We will be in touch soon."
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to join the waitlist." },
      { status: 500 }
    );
  }
}
