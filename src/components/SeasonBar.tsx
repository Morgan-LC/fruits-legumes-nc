import { cn } from "@/lib/utils";
import type { ProductionLevel } from "@/types";
import { MONTH_SHORT } from "@/types";

interface SeasonBarProps {
  months: ProductionLevel[];
  compact?: boolean;
}

const levelColors: Record<ProductionLevel, string> = {
  3: "bg-green-600",
  2: "bg-green-400",
  1: "bg-green-100",
  0: "bg-slate-100",
};

export function SeasonBar({ months, compact = false }: SeasonBarProps) {
  return (
    <div className={cn("flex gap-0.5", compact ? "gap-0" : "gap-0.5")}>
      {months.map((level, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className={cn(
              "w-full rounded-sm",
              compact ? "h-3" : "h-4",
              levelColors[level]
            )}
            title={`${MONTH_SHORT[i]}: ${level === 3 ? "Pleine production" : level === 2 ? "Production intermédiaire" : level === 1 ? "Faible production" : "Pas de production"}`}
          />
          {!compact && (
            <span className="text-[9px] text-muted-foreground mt-0.5 leading-none">
              {MONTH_SHORT[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
