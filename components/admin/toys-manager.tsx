"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Toy = {
  id: number;
  name: string;
  description: string;
  age_min_months: number;
  age_max_months: number;
  points_cost: number;
  tags: string[];
  image_url: string;
};

const empty = {
  name: "",
  description: "",
  age_min_months: "0",
  age_max_months: "12",
  points_cost: "20",
  tags: "",
  image_url: ""
};

export function AdminToysManager({ toys }: { toys: Toy[] }) {
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);

  function startEdit(toy: Toy) {
    setEditingId(toy.id);
    setForm({
      name: toy.name,
      description: toy.description,
      age_min_months: String(toy.age_min_months),
      age_max_months: String(toy.age_max_months),
      points_cost: String(toy.points_cost),
      tags: toy.tags.join(", "),
      image_url: toy.image_url
    });
  }

  async function submit() {
    setPending(true);
    try {
      const res = await fetch("/api/admin/toys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId ?? undefined })
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Save failed");
      toast.success(editingId ? "Toy updated" : "Toy created");
      setEditingId(null);
      setForm(empty);
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  async function remove(id: number) {
    setPending(true);
    try {
      const res = await fetch(`/api/admin/toys?id=${id}`, { method: "DELETE" });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Delete failed");
      toast.success("Toy deleted");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2">
        <Input placeholder="Toy name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <Input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
        />
        <div className="md:col-span-2">
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
        </div>
        <Input
          placeholder="Age min months"
          type="number"
          value={form.age_min_months}
          onChange={(e) => setForm((p) => ({ ...p, age_min_months: e.target.value }))}
        />
        <Input
          placeholder="Age max months"
          type="number"
          value={form.age_max_months}
          onChange={(e) => setForm((p) => ({ ...p, age_max_months: e.target.value }))}
        />
        <Input
          placeholder="Points cost"
          type="number"
          value={form.points_cost}
          onChange={(e) => setForm((p) => ({ ...p, points_cost: e.target.value }))}
        />
        <Input placeholder="Tags comma-separated" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} />
        <div className="md:col-span-2 flex gap-2">
          <Button onClick={submit} disabled={pending}>
            {pending ? "Saving..." : editingId ? "Update toy" : "Create toy"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={() => { setEditingId(null); setForm(empty); }}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Ages</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toys.map((toy) => (
            <TableRow key={toy.id}>
              <TableCell>{toy.name}</TableCell>
              <TableCell>
                {toy.age_min_months}-{toy.age_max_months}
              </TableCell>
              <TableCell>{toy.points_cost}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" onClick={() => startEdit(toy)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => remove(toy.id)} disabled={pending}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
