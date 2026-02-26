import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-secondary to-white p-8">
        <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">Mother Goose Toys</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight">Fresh toys every month, without toy pile chaos.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Subscribe, spend points on age-appropriate toys, and return when your child is ready for the next batch.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/auth/register" className="rounded-md bg-primary px-5 py-3 text-white">
            Start free setup
          </Link>
          <Link href="/toys" className="rounded-md border bg-white px-5 py-3">
            Browse toys
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Pick a plan", "Reserve with points", "Swap and repeat"].map((title, idx) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>
                {idx + 1}. {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {idx === 0 && "Choose monthly points for your household."}
                {idx === 1 && "Reserve available toys and ship quickly."}
                {idx === 2 && "Request return and unlock new toys."}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
