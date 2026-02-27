import { getCurrentUserProfile, getParentSnapshot, getToysWithAvailability } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToyCard } from "@/components/app/toy-card";
import { RentalList } from "@/components/app/rental-list";

export default async function DashboardPage() {
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const [{ pointsBalance, rentals, subscription }, toys] = await Promise.all([
    getParentSnapshot(user.id),
    getToysWithAvailability("all")
  ]);

  const activeRentals = rentals.filter((r) => ["reserved", "shipped", "active", "return_requested"].includes(r.status));

  return (
    <div className="section-stack">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Points balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{pointsBalance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{activeRentals.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold capitalize">{subscription?.plan ?? "none"}</p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h3>Active rentals</h3>
        <RentalList rentals={activeRentals} />
      </section>

      <section className="space-y-4">
        <h3>Recommended toys</h3>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toys.slice(0, 6).map((toy) => (
            <ToyCard key={toy.id} toy={toy} pointsBalance={pointsBalance} canReserve />
          ))}
        </div>
      </section>
    </div>
  );
}
