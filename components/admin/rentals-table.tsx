"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = {
  id: string;
  status: string;
  created_at: string;
  due_date: string;
  user_id: string;
  toy_units: { toys: { name: string } | { name: string }[] | null } | { toys: { name: string } | { name: string }[] | null }[] | null;
};

const statuses = ["reserved", "shipped", "active", "return_requested", "returned", "lost"];

function toyName(toyUnits: Row["toy_units"]) {
  const unit = Array.isArray(toyUnits) ? toyUnits[0] : toyUnits;
  const toys = unit?.toys;
  if (Array.isArray(toys)) return toys[0]?.name ?? "Unknown";
  return toys?.name ?? "Unknown";
}

export function AdminRentalsTable({ rows }: { rows: Row[] }) {
  const [statusById, setStatusById] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<string | null>(null);

  async function save(rentalId: string, currentStatus: string) {
    setPending(rentalId);
    try {
      const status = statusById[rentalId] ?? currentStatus;
      const res = await fetch("/api/admin/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rentalId, status })
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Update failed");
      toast.success("Rental updated");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    } finally {
      setPending(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rental</TableHead>
          <TableHead>Toy</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id.slice(0, 8)}</TableCell>
            <TableCell>{toyName(row.toy_units)}</TableCell>
            <TableCell>{row.user_id.slice(0, 8)}</TableCell>
            <TableCell>
              <Select aria-label={`Status for rental ${row.id.slice(0, 8)}`} value={statusById[row.id] ?? row.status} onChange={(e) => setStatusById((p) => ({ ...p, [row.id]: e.target.value }))}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Button onClick={() => save(row.id, row.status)} disabled={pending === row.id}>
                {pending === row.id ? "Saving..." : "Save"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
