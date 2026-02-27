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
    <div className="section-stack">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3>Reserve toys</h3>
          <p className="mt-2 text-sm text-muted-foreground">Available points: {pointsBalance}</p>
        </div>
        <AgeFilter value={selectedAge} />
      </div>

      {toys.length === 0 ? (
        <div className="surface px-6 py-8 text-sm text-muted-foreground">No toys match the selected filter.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toys.map((toy) => (
            <ToyCard key={toy.id} toy={toy} pointsBalance={pointsBalance} canReserve />
          ))}
        </div>
      )}
    </div>
  );
}
