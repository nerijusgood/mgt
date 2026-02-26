import { getToysWithAvailability } from "@/lib/data";
import { ToyCard } from "@/components/app/toy-card";
import { AgeFilter } from "@/components/app/age-filter";

export default async function PublicToysPage({
  searchParams
}: {
  searchParams: Promise<{ age?: string }>;
}) {
  const params = await searchParams;
  const selectedAge = params.age ?? "all";
  const toys = await getToysWithAvailability(selectedAge);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <h1 className="text-3xl font-semibold">Browse toys</h1>
        <AgeFilter value={selectedAge} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </div>
  );
}
