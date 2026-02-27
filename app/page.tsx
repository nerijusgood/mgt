import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cues = [
  "Sanitized between every swap",
  "Age-appropriate toy recommendations",
  "Flexible monthly exchange cycle"
];

export default function HomePage() {
  return (
    <div className="section-stack">
      <section className="surface overflow-hidden bg-gradient-to-br from-secondary/85 to-card p-8 md:p-10">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Mother Goose Toys</p>
        <h1 className="max-w-3xl">Fresh toys every month, without toy pile chaos.</h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          Subscribe, spend points on age-appropriate toys, and return when your child is ready for the next rotation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/register" className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition duration-soft ease-soft hover:brightness-95">
            Start free setup
          </Link>
          <Link href="/toys" className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition duration-soft ease-soft hover:bg-muted">
            Browse toys
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cues.map((cue) => (
          <Card key={cue}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground">{cue}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {["Pick a plan", "Reserve with points", "Swap and repeat"].map((title, idx) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>
                {idx + 1}. {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {idx === 0 && "Choose a monthly points plan that matches your family cadence."}
                {idx === 1 && "Reserve available toys and track usage from your dashboard."}
                {idx === 2 && "Request returns, refresh inventory, and reserve the next set."}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
