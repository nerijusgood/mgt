import { getAdminToyCatalog } from "@/lib/data";
import { AdminToysManager } from "@/components/admin/toys-manager";

export default async function AdminToysPage() {
  const toys = await getAdminToyCatalog();

  return (
    <div className="section-stack">
      <h3>Toy catalog</h3>
      <AdminToysManager toys={toys} />
    </div>
  );
}
