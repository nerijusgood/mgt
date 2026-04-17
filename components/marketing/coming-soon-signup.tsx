"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        body: JSON.stringify({ email })
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to join the waitlist");
      }

      const message = payload.message ?? "You are on the list.";
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

  return (
    <form onSubmit={onSubmit} className="surface space-y-4 p-6 md:p-7" aria-label="Coming soon waitlist signup">
      <div className="space-y-2">
        <Label htmlFor="waitlist-email">Work email</Label>
        <Input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          placeholder="name@institution.dk"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Joining..." : "Join the waitlist"}
      </Button>
      <p className="text-xs text-muted-foreground">
        We will use EmailOctopus to send launch updates and early-access invites.
      </p>
      {successMessage ? <p className="text-sm text-foreground">{successMessage}</p> : null}
    </form>
  );
}
