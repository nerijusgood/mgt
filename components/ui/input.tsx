import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[52px] w-full border border-[#383838] bg-transparent px-4 text-sm font-normal text-foreground transition-colors duration-150 placeholder:text-[#9fa8ad] focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
