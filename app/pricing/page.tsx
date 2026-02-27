import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Basic", points: 80, price: "$19/mo" },
  { name: "Standard", points: 140, price: "$29/mo" },
  { name: "Premium", points: 220, price: "$45/mo" }
];

export default function PricingPage() {
  return (
    <div className="section-stack">
      <h1>Pricing</h1>
      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-3xl font-semibold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.points} points per month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
