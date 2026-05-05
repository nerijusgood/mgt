"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Audience = "parent" | "daycare" | "institution";

const audiences: { value: Audience; label: string }[] = [
  { value: "parent", label: "parent" },
  { value: "daycare", label: "daycare" },
  { value: "institution", label: "institution" }
];

export function ComingSoonSignup() {
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), segment: audience ?? undefined })
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to join the waitlist");
      }

      const message = payload.message ?? "You're on the list.";
      setSuccessMessage(message);
      setEmail("");
      toast.success(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to join the waitlist";
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  if (successMessage) {
    return (
      <p style={{ color: "var(--mgt-text-primary)", fontSize: "14px", fontWeight: 500 }}>
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Audience selector */}
      <div className="flex flex-col gap-2">
        <p style={{ color: "var(--mgt-text-subtle)", fontSize: "12px", fontWeight: 600, letterSpacing: "-0.01em" }}>
          I am a...
        </p>
        <div className="flex gap-5">
          {audiences.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 select-none"
            >
              <span
                className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center"
                style={{
                  border: "2px solid #383838",
                  borderRadius: "50%"
                }}
              >
                {audience === value && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#383838",
                      display: "block"
                    }}
                  />
                )}
              </span>
              <input
                type="radio"
                name="audience"
                value={value}
                checked={audience === value}
                onChange={() => setAudience(value)}
                className="sr-only"
              />
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#383838", letterSpacing: "-0.01em" }}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--mgt-divider)", width: "100%" }} />

      <Input
        id="waitlist-email"
        type="email"
        autoComplete="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        maxLength={254}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Joining..." : "Notify me"}
      </Button>
      <p style={{ color: "var(--mgt-text-subtle)", fontSize: "11px", letterSpacing: "-0.01em" }}>
        No spam. Launch updates only.
      </p>
    </form>
  );
}
