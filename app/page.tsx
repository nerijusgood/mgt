import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { ComingSoonSignup } from "@/components/marketing/coming-soon-signup";

const pillars = [
  {
    title: "Sustainability",
    copy: "Circular toy rotations that reduce waste and unnecessary re-buying.",
    icon: Leaf
  },
  {
    title: "Cost-efficient",
    copy: "A smarter alternative to constantly replacing worn toy inventory.",
    icon: Wallet
  },
  {
    title: "Hygiene",
    copy: "Professionally sanitized and checked between every rotation cycle.",
    icon: Sparkles
  },
  {
    title: "Safety-first",
    copy: "Prepared for childcare environments with trusted processes and standards.",
    icon: ShieldCheck
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
      <section className="mx-auto flex min-h-screen w-full max-w-[78rem] items-center px-4 py-10 md:px-6">
        <div className="surface grid w-full overflow-hidden p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8">
          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground">
                MG
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight">Mother Goose Toys</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Coming soon</p>
              </div>
            </div>

            <h1 className="max-w-xl">Fresh toy rotation for daycares and childminders, launching soon.</h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              A simpler way to keep toys sustainable, hygienic, and development-focused without the constant effort of
              buying and replacing everything yourself.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {launchPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ComingSoonSignup />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-border bg-background/80 p-4">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <pillar.icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{pillar.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pillar.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="order-1 relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-info to-[#6f79e6] p-4 sm:min-h-[420px] lg:order-2 lg:min-h-[640px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_30%)]" />
            <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/45 bg-white/88 shadow-[0_20px_50px_rgba(46,46,46,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
                alt="Children playing with colorful toys in a bright childcare setting"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-white">
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/80">Launch preview</p>
                <p className="mt-2 max-w-sm text-xl font-semibold">
                  Curated toy rotations designed for busy caregivers and everyday learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
