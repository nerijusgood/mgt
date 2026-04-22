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
    <form onSubmit={onSubmit} className="space-y-3" aria-label="Coming soon waitlist signup">
      <div className="space-y-2">
        <Label htmlFor="waitlist-email">Join the waitlist</Label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            placeholder="name@institution.dk"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="bg-background sm:flex-1"
          />
          <Button type="submit" className="sm:min-w-44" disabled={pending}>
            {pending ? "Joining..." : "Join the waitlist"}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        We will use EmailOctopus to send launch updates and early-access invites.
      </p>
      {successMessage ? <p className="text-sm text-foreground">{successMessage}</p> : null}
    </form>
  );
}
