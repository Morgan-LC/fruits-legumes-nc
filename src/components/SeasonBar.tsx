import { cn } from "@/lib/utils";
import type { ProductionLevel } from "@/types";
import { MONTH_SHORT } from "@/types";

interface SeasonBarProps {
  months: ProductionLevel[];
  compact?: boolean;
  highlightMonth?: number;
}

const levelColors: Record<ProductionLevel, string> = {
  3: "bg-green-600",
  2: "bg-green-400",
  1: "bg-green-100",
  0: "bg-slate-100",
};

export function SeasonBar({ months, compact = false, highlightMonth }: SeasonBarProps) {
  return (
    <div className="flex gap-0.5">
      {months.map((level, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className={cn(
              "w-full rounded-sm",
              compact ? "h-3" : "h-4",
              levelColors[level],
              highlightMonth === i && "outline outline-2 outline-offset-1 outline-green-600"
            )}
            title={`${MONTH_SHORT[i]}: ${level === 3 ? "Pleine production" : level === 2 ? "Production intermédiaire" : level === 1 ? "Faible production" : "Pas de production"}`}
          />
          {!compact && (
            <span className={cn(
              "text-[9px] mt-0.5 leading-none",
              highlightMonth === i ? "text-green-700 font-semibold" : "text-muted-foreground"
            )}>
              {MONTH_SHORT[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
