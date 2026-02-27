import { getAdminRentals, getAdminSubscribers } from "@/lib/data";
import { AdminRentalsTable } from "@/components/admin/rentals-table";
import { SimulateRenewal } from "@/components/admin/simulate-renewal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Subscriber = {
  user_id: string;
  monthly_points: number;
  plan: string;
  status: string;
  profiles: { full_name: string | null } | { full_name: string | null }[] | null;
};

function profileName(profiles: Subscriber["profiles"], fallback: string) {
  if (Array.isArray(profiles)) return profiles[0]?.full_name ?? fallback;
  return profiles?.full_name ?? fallback;
}

export default async function AdminRentalsPage() {
  const [rentals, subscribersRaw] = await Promise.all([getAdminRentals(), getAdminSubscribers()]);
  const subscribers = subscribersRaw as Subscriber[];

  return (
    <div className="section-stack">
      <section className="space-y-4">
        <h3>Rental lifecycle</h3>
        <AdminRentalsTable rows={rentals} />
      </section>

      <section className="space-y-4">
        <h3>Simulate monthly renewals</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {subscribers.map((subscription) => (
            <Card key={subscription.user_id}>
              <CardHeader>
                <CardTitle>{profileName(subscription.profiles, subscription.user_id.slice(0, 8))}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
