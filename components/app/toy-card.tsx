"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToyWithAvailability } from "@/lib/types";

type Props = {
  toy: ToyWithAvailability;
  pointsBalance?: number;
  canReserve?: boolean;
};

function deriveSkillTag(tags: string[]) {
  const joined = tags.join(" ").toLowerCase();
  if (joined.includes("fine") || joined.includes("grasp") || joined.includes("construction")) return "Fine Motor Skills";
  if (joined.includes("gross") || joined.includes("active") || joined.includes("walking")) return "Gross Motor Skills";
  if (joined.includes("puzzle") || joined.includes("stem") || joined.includes("letters")) return "Problem Solving";
  if (joined.includes("language") || joined.includes("pretend")) return "Language & Social Skills";
  return "Fine Motor Skills";
}

function benefitLine(tags: string[]) {
  const joined = tags.join(" ").toLowerCase();
  if (joined.includes("music") || joined.includes("sensory")) return "Supports sensory discovery and everyday confidence through playful repetition.";
  if (joined.includes("puzzle") || joined.includes("construction") || joined.includes("stem")) return "Builds early reasoning through hands-on play that encourages problem solving.";
  return "Encourages hand-eye coordination and early problem solving.";
}

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

  const ageTag = `${Math.max(0, Math.floor(toy.age_min_months / 12))}-${Math.max(1, Math.ceil(toy.age_max_months / 12))} Years`;
  const skillTag = deriveSkillTag(toy.tags);

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
        <Image src={toy.image_url} alt={toy.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{toy.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{ageTag}</Badge>
          <Badge variant="outline">{skillTag}</Badge>
          <Badge variant="success">Sanitized</Badge>
          <Badge>{toy.points_cost} points</Badge>
          <Badge variant={toy.available_units > 0 ? "success" : "outline"}>{toy.available_units} available</Badge>
        </div>

        <p className="text-sm text-muted-foreground">{benefitLine(toy.tags)}</p>

        {canReserve && (
          <Button onClick={handleReserve} disabled={pending || insufficient || unavailable} className="w-full" aria-label={`Add ${toy.name} to subscription`}>
            {insufficient
              ? "Not enough points"
              : unavailable
                ? "No units available"
                : pending
                  ? "Adding..."
                  : "Add to subscription"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
