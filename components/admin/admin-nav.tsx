import Link from "next/link";

const links = [
  ["/admin/inventory", "Inventory"],
  ["/admin/toys", "Toys"],
  ["/admin/rentals", "Rentals"]
] as const;

export function AdminNav() {
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
