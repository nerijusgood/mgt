import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustBadgeGroup } from "@/components/TrustBadgeGroup";

const trustBadges = [
  { title: "CE Certified", subtitle: "Complies with EU toy safety standards", variant: "safety" as const },
  { title: "EN 71 Tested", subtitle: "Independently tested for child safety", variant: "safety" as const },
  { title: "Professionally Sanitized", subtitle: "Cleaned after every rental cycle", variant: "hygiene" as const },
  { title: "Age-Verified Play", subtitle: "Matched to your child’s development stage", variant: "development" as const },
  { title: "Eco-Friendly Materials", subtitle: "Designed for circular use and low waste", variant: "sustainability" as const },
  { title: "Flexible Subscription", subtitle: "Pause or swap anytime", variant: "service" as const }
];

const audienceCards = [
  {
    id: "daycares",
    title: "For Daycares (Institutions)",
    copy: "Highest toy usage, predictable rotations, durable sets, hygiene-first.",
    cta: "For daycares"
  },
  {
    id: "dagpleje",
    title: "For Dagpleje / Childminders",
    copy: "Smaller sets, flexible swaps, low effort.",
    cta: "For childminders"
  }
];

const pillars = [
  {
    title: "Development",
    bullets: ["Motor skills & sensory play", "Creativity & problem-solving", "Collaboration in group play"]
  },
  {
    title: "Sustainability",
    bullets: ["Reuse instead of buying new", "Circular economy model", "Less waste, smarter budgets"]
  },
  {
    title: "Hygiene",
    bullets: ["Sanitized after every return", "Safety standards (CE / EN 71)", "Inspected before redeployment"]
  },
  {
    title: "Simplicity",
    bullets: ["Predictable toy rotation", "Low effort for staff", "Clear pricing & support"]
  }
];

const painSolutions = [
  {
    pain: "Toy clutter and uneven quality",
    solution: "Curated durable sets"
  },
  {
    pain: "Worn-out toys",
    solution: "Rotations keep play fresh"
  },
  {
    pain: "Hygiene concerns",
    solution: "Sanitization + safety standards"
  },
  {
    pain: "Limited budgets",
    solution: "Subscription/rotation reduces wasteful purchases"
  },
  {
    pain: "Time pressure",
    solution: "Simple reorder/swaps"
  }
];

const institutionSteps = [
  {
    title: "Choose age ranges & group needs",
    text: "Set age bands and focus areas for each room or group."
  },
  {
    title: "Receive curated rotation boxes",
    text: "Get durable toy sets tailored for development and everyday institutional use."
  },
  {
    title: "Swap monthly or when ready",
    text: "Keep play fresh while maintaining hygiene and predictable planning."
  }
];

export default function HomePage() {
  return (
    <div className="section-stack">
      <section className="surface overflow-hidden bg-gradient-to-br from-secondary/85 to-card p-8 md:p-10">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Mother Goose Toys</p>
        <h1 className="max-w-3xl">Toy rotation for daycares — development-focused, hygienic, and low-effort.</h1>
        <p className="mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">
          Curated toy rotations for ages 0–5, designed for motor skills, creativity, and collaboration — professionally sanitized after every cycle.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#daycares"
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition duration-soft ease-soft hover:brightness-95"
          >
            Get a daycare quote
          </Link>
          <Link
            href="/toys"
            className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition duration-soft ease-soft hover:bg-muted"
          >
            See toy examples
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Used by daycare institutions across Copenhagen</p>
      </section>

      <section className="section-stack" aria-label="Audience options">
        <h2>Choose your setup</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {audienceCards.map((audience) => (
            <Card key={audience.id} id={audience.id}>
              <CardHeader>
                <CardTitle>{audience.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{audience.copy}</p>
                <Link
                  href={`#${audience.id}`}
                  className="inline-flex rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition duration-soft ease-soft hover:bg-muted"
                >
                  {audience.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-stack" aria-labelledby="pillars-title">
        <h2 id="pillars-title">Built around what institutions need most</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <CardHeader>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-stack" aria-labelledby="leaders-title">
        <h2 id="leaders-title">Why daycare leaders choose us</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {painSolutions.map((item) => (
            <Card key={item.pain}>
              <CardContent className="pt-6">
                <p className="text-sm font-semibold text-foreground">{item.pain}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-stack" aria-labelledby="trust-title">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="trust-title">Trust built into every rotation</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Safety, hygiene, and development quality standards designed for institutions and reassuring for parents.
            </p>
          </div>
          <Link href="/hygiene" className="inline-flex whitespace-nowrap rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition duration-soft ease-soft hover:bg-muted">
            Safety & cleaning process
          </Link>
        </div>
        <TrustBadgeGroup badges={trustBadges} />
      </section>

      <section className="section-stack" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title">How it works for institutions</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {institutionSteps.map((step, idx) => (
            <Card key={step.title}>
              <CardHeader>
                <CardTitle>
                  {idx + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Designed for predictable planning and low staff effort.</p>
      </section>

      <section className="surface p-6 md:p-8" aria-labelledby="final-cta-title">
        <h2 id="final-cta-title">Ready to simplify toys for your institution?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Trusted by professionals. Loved by kids. Reassuring for parents.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#daycares"
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition duration-soft ease-soft hover:brightness-95"
          >
            Get a daycare quote
          </Link>
          <Link
            href="#"
            className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition duration-soft ease-soft hover:bg-muted"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
