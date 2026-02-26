"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select } from "@/components/ui/select";

const ageFilters = [
  ["all", "All ages"],
  ["0-12", "0-12 months"],
  ["12-24", "12-24 months"],
  ["24-36", "24-36 months"],
  ["36-48", "36-48 months"],
  ["48-60", "48-60 months"]
] as const;

export function AgeFilter({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(nextAge: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextAge === "all") {
      params.delete("age");
    } else {
      params.set("age", nextAge);
    }
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  }

  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {ageFilters.map(([ageValue, label]) => (
        <option key={ageValue} value={ageValue}>
          {label}
        </option>
      ))}
    </Select>
  );
}
