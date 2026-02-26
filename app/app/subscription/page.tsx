import { getCurrentUserProfile, getParentSnapshot } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SubscriptionPage() {
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const { subscription } = await getParentSnapshot(user.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          Plan: <span className="font-semibold capitalize">{subscription?.plan ?? "none"}</span>
        </p>
        <p>
          Status: <span className="font-semibold capitalize">{subscription?.status ?? "none"}</span>
        </p>
        <p>Monthly points: {subscription?.monthly_points ?? 0}</p>
        <p>
          Renewal date:{" "}
          {subscription?.renewal_date ? new Date(subscription.renewal_date).toLocaleDateString() : "Not set"}
        </p>
        <p className="text-sm text-muted-foreground">POC uses admin-triggered simulate renewal instead of full Stripe webhook wiring.</p>
      </CardContent>
    </Card>
  );
}
