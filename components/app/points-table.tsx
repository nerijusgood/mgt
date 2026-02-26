import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LedgerRow = {
  id: string;
  type: string;
  amount: number;
  reference_id: string | null;
  created_at: string;
};

export function PointsTable({ rows }: { rows: LedgerRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant="outline">{row.type}</Badge>
            </TableCell>
            <TableCell>{row.reference_id ?? "-"}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
