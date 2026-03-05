import Link from "next/link";
import { BadgeCheck, Leaf, ShieldCheck, Sparkles } from "lucide-react";

const companyLinks = [
  { href: "#", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "#", label: "Contact" }
];

const policyLinks = [
  { href: "#", label: "Safety standards (CE, EN 71)" },
  { href: "/hygiene", label: "Sanitization process" },
  { href: "#", label: "Sustainability" },
  { href: "#", label: "Privacy (GDPR)" },
  { href: "#", label: "Terms" }
];

const trustItems = [
  { label: "CE Certified", icon: ShieldCheck },
  { label: "EN 71 Tested", icon: BadgeCheck },
  { label: "Sanitized after every return", icon: Sparkles },
  { label: "Age-verified play", icon: BadgeCheck },
  { label: "Eco-friendly", icon: Leaf }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-card/75" aria-labelledby="footer-title">
      <div className="mx-auto w-full max-w-[72rem] px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="surface order-1 p-6 lg:col-span-5" aria-labelledby="footer-title">
            <h2 id="footer-title" className="text-xl">
              Mother Goose Toys
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Toy subscriptions for ages 0–5 — curated for development, professionally sanitized, and designed for circular use.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Trust highlights">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <p key={item.label} className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {item.label}
                  </p>
                );
              })}
            </div>
          </section>

          <section className="surface order-2 p-6 lg:col-span-4" aria-label="Footer links">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-base">Company</h3>
                <ul className="mt-3 space-y-2">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground underline-offset-4 transition-colors duration-soft ease-soft hover:text-foreground hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base">Trust & Policies</h3>
                <ul className="mt-3 space-y-2">
                  {policyLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground underline-offset-4 transition-colors duration-soft ease-soft hover:text-foreground hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="surface order-3 p-6 lg:col-span-3" aria-labelledby="support-title">
            <h3 id="support-title" className="text-base">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Response within 24h on weekdays</li>
              <li>
                Email:{" "}
                <a href="mailto:support@mothergoosetoys.com" className="underline underline-offset-4 hover:text-foreground">
                  support@mothergoosetoys.com
                </a>
              </li>
              <li>FAQ</li>
            </ul>
          </section>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Mother Goose Toys. All rights reserved.</p>
          <p>Made for families in Denmark.</p>
          <p className="inline-flex gap-2">
            <Link href="#" className="hover:text-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="#" className="hover:text-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <Link href="#" className="hover:text-foreground hover:underline underline-offset-4">
              Cookies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
