import { getAdminInventory } from "@/lib/data";
import { AdminInventoryTable } from "@/components/admin/inventory-table";

export default async function AdminInventoryPage() {
  const rows = await getAdminInventory();

  return (
    <div className="section-stack">
      <h3>Inventory units</h3>
      <AdminInventoryTable rows={rows} />
    </div>
  );
}
