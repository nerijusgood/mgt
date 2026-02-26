import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  "Create your parent account",
  "Choose a subscription plan",
  "Spend points to reserve toys",
  "Use toys and request return",
  "Admin cleans and re-lists units"
];

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">How it works</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={step}>
            <CardHeader>
              <CardTitle>
                Step {index + 1}: {step}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Simple flow designed for busy parents and clean inventory operations.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
