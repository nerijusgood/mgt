import { getCurrentUserProfile, getPointsLedger } from "@/lib/data";
import { PointsTable } from "@/components/app/points-table";

export default async function PointsPage() {
  const { user } = await getCurrentUserProfile();
  if (!user) return null;

  const rows = await getPointsLedger(user.id);

  return (
    <div className="section-stack">
      <h3>Points ledger</h3>
      <PointsTable rows={rows} />
    </div>
  );
}
