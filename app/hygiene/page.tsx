import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HygienePage() {
  return (
    <div className="section-stack">
      <div>
        <h1>Hygiene & Safety</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Every toy unit is checked, sanitized, and quality-reviewed before it returns to a family.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our sanitization promise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>We inspect each toy when it comes back, then apply child-safe cleaning protocols.</p>
          <p>Only units that pass our quality check are marked available for the next rental cycle.</p>
        </CardContent>
      </Card>
    </div>
  );
}
