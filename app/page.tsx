import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComingSoonSignup } from "@/components/marketing/coming-soon-signup";

const pillars = [
  {
    title: "Development",
    copy: "Rotation boxes designed to support motor skills, sensory play, creativity, and collaborative learning."
  },
  {
    title: "Sustainability",
    copy: "A circular toy model that reduces waste, avoids overbuying, and helps institutions spend budgets more carefully."
  },
  {
    title: "Hygiene",
    copy: "Every toy set is professionally sanitized, safety-checked, and prepared for redeployment after each cycle."
  },
  {
    title: "Simplicity",
    copy: "Predictable swaps, durable toy mixes, and clear support so staff spend less time managing toy inventory."
  }
];

const audience = [
  {
    title: "For daycares",
    copy: "High-usage, durable toy rotations for ages 0-5 with hygiene and planning built in."
  },
  {
    title: "For childminders",
    copy: "Flexible smaller sets with low-effort swaps for home-based care environments."
  }
];

const launchPoints = [
  "Early-access spots for pilot institutions",
  "Curated rotation boxes for ages 0-5",
  "Professional sanitization after each return"
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/40 to-background">
      <section className="mx-auto flex min-h-screen w-full max-w-[72rem] items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Mother Goose Toys</p>
            <h1 className="max-w-3xl">Coming soon: curated toy rotation for modern childcare.</h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              We are building a simpler way for daycares and childminders to keep toys fresh, hygienic, and development-focused without constant re-buying.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/toys"
                className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition duration-soft ease-soft hover:bg-muted"
              >
                View toy examples
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-muted-foreground transition duration-soft ease-soft hover:text-foreground"
              >
                See the model
              </Link>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {launchPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {audience.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <ComingSoonSignup />

            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <Card key={pillar.title}>
                  <CardHeader>
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{pillar.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
