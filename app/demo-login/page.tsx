"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DemoLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = searchParams.get("next") || "/";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        setError(payload.error ?? "Invalid demo password");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md pt-8">
      <Card>
        <CardHeader>
          <CardTitle>Demo Access</CardTitle>
          <CardDescription>Enter the demo password to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" aria-label="Demo access form">
            <div className="space-y-2">
              <Label htmlFor="demo-password">Password</Label>
              <Input
                id="demo-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Checking..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
