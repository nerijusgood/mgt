import { TrustBadge, type TrustBadgeProps } from "@/components/TrustBadge";

export function TrustBadgeGroup({ badges }: { badges: TrustBadgeProps[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Trust badges">
      {badges.map((badge) => (
        <div key={badge.title} role="listitem">
          <TrustBadge {...badge} />
        </div>
      ))}
    </div>
  );
}
