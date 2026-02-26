import { getAdminInventory } from "@/lib/data";
import { AdminInventoryTable } from "@/components/admin/inventory-table";

export default async function AdminInventoryPage() {
  const rows = await getAdminInventory();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Inventory units</h2>
      <AdminInventoryTable rows={rows} />
    </div>
  );
}
