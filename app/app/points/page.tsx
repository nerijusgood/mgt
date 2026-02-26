import { getCurrentUserProfile, getPointsLedger } from "@/lib/data";
import { PointsTable } from "@/components/app/points-table";

export default async function PointsPage() {
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const rows = await getPointsLedger(user.id);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Points ledger</h2>
      <PointsTable rows={rows} />
    </div>
  );
}
