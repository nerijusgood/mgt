import { getToysWithAvailability } from "@/lib/data";
import { ToyCard } from "@/components/app/toy-card";
import { Select } from "@/components/ui/select";

const ageFilters = [
  ["all", "All ages"],
  ["0-12", "0-12 months"],
  ["12-24", "12-24 months"],
  ["24-36", "24-36 months"],
  ["36-48", "36-48 months"],
  ["48-60", "48-60 months"]
] as const;

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
        <form>
          <Select name="age" defaultValue={selectedAge} onChange={(e) => e.currentTarget.form?.submit()}>
            {ageFilters.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </form>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </div>
  );
}
