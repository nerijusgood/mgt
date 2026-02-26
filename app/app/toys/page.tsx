import { getCurrentUserProfile, getParentSnapshot, getToysWithAvailability } from "@/lib/data";
import { ToyCard } from "@/components/app/toy-card";
import { AgeFilter } from "@/components/app/age-filter";

export default async function ParentToysPage({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const params = await searchParams;
  const selectedAge = params.age ?? "all";
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const [{ pointsBalance }, toys] = await Promise.all([getParentSnapshot(user.id), getToysWithAvailability(selectedAge)]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold">Reserve toys</h2>
        <AgeFilter value={selectedAge} />
      </div>

      <p className="text-sm text-muted-foreground">Available points: {pointsBalance}</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} pointsBalance={pointsBalance} canReserve />
        ))}
      </div>
    </div>
  );
}
