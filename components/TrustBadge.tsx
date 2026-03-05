import { BadgeCheck, Brain, Leaf, RefreshCw, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TrustBadgeVariant = "safety" | "hygiene" | "development" | "sustainability" | "service";

const variantStyles: Record<TrustBadgeVariant, string> = {
  safety: "bg-[#e9f0ec] text-foreground",
  hygiene: "bg-[#edf4fa] text-foreground",
  development: "bg-[#f3efe6] text-foreground",
  sustainability: "bg-[#edf2ea] text-foreground",
  service: "bg-[#f6ede9] text-foreground"
};

const variantIcons: Record<TrustBadgeVariant, LucideIcon> = {
  safety: ShieldCheck,
  hygiene: Sparkles,
  development: Brain,
  sustainability: Leaf,
  service: RefreshCw
};

export type TrustBadgeProps = {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  variant?: TrustBadgeVariant;
};

export function TrustBadge({ icon: CustomIcon, title, subtitle, variant = "safety" }: TrustBadgeProps) {
  const Icon = CustomIcon ?? variantIcons[variant] ?? BadgeCheck;

  return (
    <div className={cn("surface flex items-start gap-3 p-4", variantStyles[variant])}>
      <span className="rounded-full bg-card p-2" aria-hidden>
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}
