"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SimulateRenewal({ userId, monthlyPoints }: { userId: string; monthlyPoints: number }) {
  const [amount, setAmount] = useState(String(monthlyPoints));
  const [pending, setPending] = useState(false);

  async function run() {
    setPending(true);
    try {
      const res = await fetch("/api/admin/simulate-renewal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount: Number(amount) })
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Simulation failed");
      toast.success("Points allocated");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Simulation failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="max-w-40" />
      <Button onClick={run} disabled={pending}>
        {pending ? "Running..." : "Simulate renewal"}
      </Button>
    </div>
  );
}
