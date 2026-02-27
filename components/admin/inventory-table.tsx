"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = {
  id: number;
  status: string;
  condition: string;
  last_cleaned_at: string | null;
  toy_id: number;
  toys: { name: string } | { name: string }[] | null;
};

const statuses = ["available", "reserved", "shipped", "in_use", "returned", "cleaning", "retired"];
const conditions = ["new", "good", "worn", "damaged"];

function toyName(toys: Row["toys"]) {
  if (Array.isArray(toys)) return toys[0]?.name ?? "Unknown";
  return toys?.name ?? "Unknown";
}

export function AdminInventoryTable({ rows }: { rows: Row[] }) {
  const [drafts, setDrafts] = useState<Record<number, { status: string; condition: string }>>({});
  const [pending, setPending] = useState<number | null>(null);

  function updateRow(id: number, key: "status" | "condition", value: string) {
    setDrafts((prev) => ({ ...prev, [id]: { status: prev[id]?.status ?? "available", condition: prev[id]?.condition ?? "good", [key]: value } }));
  }

  async function save(id: number, fallbackStatus: string, fallbackCondition: string) {
    const draft = drafts[id] ?? { status: fallbackStatus, condition: fallbackCondition };
    setPending(id);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId: id, status: draft.status, condition: draft.condition })
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Update failed");
      toast.success("Inventory updated");
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
          <TableHead>Unit</TableHead>
          <TableHead>Toy</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>#{row.id}</TableCell>
            <TableCell>{toyName(row.toys)}</TableCell>
            <TableCell>
              <Select aria-label={`Status for unit ${row.id}`} value={drafts[row.id]?.status ?? row.status} onChange={(e) => updateRow(row.id, "status", e.target.value)}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select
                aria-label={`Condition for unit ${row.id}`}
                value={drafts[row.id]?.condition ?? row.condition}
                onChange={(e) => updateRow(row.id, "condition", e.target.value)}
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Button onClick={() => save(row.id, row.status, row.condition)} disabled={pending === row.id}>
                {pending === row.id ? "Saving..." : "Save"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
