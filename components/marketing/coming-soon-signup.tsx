"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ComingSoonSignup() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email: email.trim() })
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
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
        {pending ? "joining..." : "notify me"}
      </Button>
      <p style={{ color: "var(--mgt-text-subtle)", fontSize: "11px", letterSpacing: "-0.01em" }}>
        no spam. launch updates only.
      </p>
    </form>
  );
}
