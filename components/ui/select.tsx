import type React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-card px-3.5 text-sm text-foreground transition-colors duration-soft ease-soft",
        className
      )}
      {...props}
    />
  );
}
