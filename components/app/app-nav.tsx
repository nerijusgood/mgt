import Link from "next/link";

const links = [
  ["/app/dashboard", "Dashboard"],
  ["/app/toys", "Toys"],
  ["/app/rentals", "Rentals"],
  ["/app/subscription", "Subscription"],
  ["/app/points", "Points"]
] as const;

export function AppNav() {
  return (
    <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="rounded-full border bg-white px-4 py-2 text-sm">
          {label}
        </Link>
      ))}
    </nav>
  );
}
