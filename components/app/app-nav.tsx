"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  ["/app/dashboard", "Dashboard"],
  ["/app/toys", "Toys"],
  ["/app/rentals", "Rentals"],
  ["/app/subscription", "Subscription"],
  ["/app/points", "Points"]
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Parent section navigation" className="mb-8 flex gap-2 overflow-x-auto pb-2">
      {links.map(([href, label]) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-soft ease-soft",
              active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
