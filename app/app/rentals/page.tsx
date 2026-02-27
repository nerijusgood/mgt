import { getCurrentUserProfile, getParentSnapshot } from "@/lib/data";
import { RentalList } from "@/components/app/rental-list";

export default async function ParentRentalsPage() {
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const { rentals } = await getParentSnapshot(user.id);
  const active = rentals.filter((r) => ["reserved", "shipped", "active", "return_requested"].includes(r.status));
  const history = rentals.filter((r) => ["returned", "lost"].includes(r.status));

  return (
    <div className="section-stack">
      <section className="space-y-4">
        <h3>Active rentals</h3>
        <RentalList rentals={active} />
      </section>
      <section className="space-y-4">
        <h3>Rental history</h3>
        <RentalList rentals={history} />
      </section>
    </div>
  );
}
