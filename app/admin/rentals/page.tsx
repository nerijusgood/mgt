import { getAdminRentals, getAdminSubscribers } from "@/lib/data";
import { AdminRentalsTable } from "@/components/admin/rentals-table";
import { SimulateRenewal } from "@/components/admin/simulate-renewal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminRentalsPage() {
  const [rentals, subscribers] = await Promise.all([getAdminRentals(), getAdminSubscribers()]);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Rental lifecycle</h2>
        <AdminRentalsTable rows={rentals} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Simulate monthly renewals</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {subscribers.map((subscription) => (
            <Card key={subscription.user_id}>
              <CardHeader>
                <CardTitle>{subscription.profiles?.full_name ?? subscription.user_id.slice(0, 8)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {subscription.plan} ({subscription.status})
                </p>
                <SimulateRenewal userId={subscription.user_id} monthlyPoints={subscription.monthly_points} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
