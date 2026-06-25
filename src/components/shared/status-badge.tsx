import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

type StatusBadgeProps = {
  label: string;
  variant?: StatusVariant;
  className?: string;
};

const variantClasses: Record<StatusVariant, string> = {
  default: "border-primary/20 bg-primary/10 text-primary",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  muted: "border-slate-200 bg-slate-50 text-slate-700",
};

export function StatusBadge({
  label,
  variant = "default",
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </Badge>
  );
}
