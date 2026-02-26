"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Rental = {
  id: string;
  status: string;
  created_at: string;
  due_date: string;
  returned_at: string | null;
  toy_units: { toys: { name: string; points_cost: number } | null } | null;
};

export function RentalList({ rentals }: { rentals: Rental[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function requestReturn(rentalId: string) {
    setPendingId(rentalId);
    try {
      const res = await fetch(`/api/rentals/${rentalId}/request-return`, { method: "POST" });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Unable to request return");
      toast.success("Return requested");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to request return");
    } finally {
      setPendingId(null);
    }
  }

  if (rentals.length === 0) {
    return <p className="text-sm text-muted-foreground">No rentals yet.</p>;
  }

  return (
    <div className="space-y-3">
      {rentals.map((rental) => {
        const canRequest = ["reserved", "shipped", "active"].includes(rental.status);
        return (
          <Card key={rental.id}>
            <CardContent className="flex flex-col gap-3 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="font-medium">{rental.toy_units?.toys?.name ?? "Unknown toy"}</p>
                <p className="text-sm text-muted-foreground">Due: {new Date(rental.due_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{rental.status}</Badge>
                {canRequest && (
                  <Button
                    variant="outline"
                    onClick={() => requestReturn(rental.id)}
                    disabled={pendingId === rental.id}
                  >
                    {pendingId === rental.id ? "Sending..." : "Request return"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
