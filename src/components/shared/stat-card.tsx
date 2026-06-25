import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction?: "up" | "down" | "neutral";
  };
  className?: string;
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  const TrendIcon =
    trend?.direction === "down"
      ? ArrowDownRight
      : trend?.direction === "up"
        ? ArrowUpRight
        : null;

  return (
    <Card
      className={cn(
        "rounded-2xl border-border/70 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <div className="space-y-1">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {value}
              </h3>

              {subtitle ? (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
          </div>

          {Icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
        </div>

        {trend ? (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium",
                trend.direction === "up" &&
                  "bg-emerald-50 text-emerald-700 border border-emerald-100",
                trend.direction === "down" &&
                  "bg-rose-50 text-rose-700 border border-rose-100",
                trend.direction === "neutral" &&
                  "bg-slate-50 text-slate-700 border border-slate-100",
              )}
            >
              {TrendIcon ? <TrendIcon className="h-3.5 w-3.5" /> : null}
              {trend.value}
            </span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
