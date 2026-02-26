import { getAdminToyCatalog } from "@/lib/data";
import { AdminToysManager } from "@/components/admin/toys-manager";

export default async function AdminToysPage() {
  const toys = await getAdminToyCatalog();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Toy catalog</h2>
      <AdminToysManager toys={toys} />
    </div>
  );
}
