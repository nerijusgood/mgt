import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground transition-colors duration-soft ease-soft placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
