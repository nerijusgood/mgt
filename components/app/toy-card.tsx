"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToyWithAvailability } from "@/lib/types";

type Props = {
  toy: ToyWithAvailability;
  pointsBalance?: number;
  canReserve?: boolean;
};

export function ToyCard({ toy, pointsBalance = 0, canReserve = false }: Props) {
  const [pending, setPending] = useState(false);
  const insufficient = pointsBalance < toy.points_cost;
  const unavailable = toy.available_units === 0;

  async function handleReserve() {
    setPending(true);
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toyId: toy.id })
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Reservation failed");
      toast.success("Toy reserved successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reservation failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
        <Image src={toy.image_url} alt={toy.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{toy.name}</CardTitle>
        <CardDescription className="line-clamp-3">{toy.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{toy.points_cost} points</Badge>
          <Badge variant={toy.available_units > 0 ? "success" : "outline"}>{toy.available_units} available</Badge>
          <Badge variant="outline">
            {toy.age_min_months}-{toy.age_max_months} months
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {toy.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        {canReserve && (
          <Button onClick={handleReserve} disabled={pending || insufficient || unavailable} className="w-full" aria-label={`Reserve ${toy.name}`}>
            {insufficient ? "Not enough points" : unavailable ? "No units available" : pending ? "Reserving..." : "Reserve"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
