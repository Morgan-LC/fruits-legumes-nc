import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Produce, ProductionLevel } from "@/types";
import { MONTH_SHORT } from "@/types";

interface CalendarTableProps {
  items: Produce[];
  highlightMonth?: number;
}

const cellColors: Record<ProductionLevel, string> = {
  3: "bg-green-600",
  2: "bg-green-400",
  1: "bg-green-100",
  0: "bg-white",
};

const cellTitles: Record<ProductionLevel, string> = {
  3: "Pleine production",
  2: "Production intermédiaire",
  1: "Faible production",
  0: "Pas de production",
};

export function CalendarTable({ items, highlightMonth }: CalendarTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b">
            <th className="text-left px-3 py-2 font-semibold min-w-[140px] sticky left-0 bg-slate-50 z-10">
              Produit
            </th>
            {MONTH_SHORT.map((m, i) => (
              <th
                key={i}
                className={cn(
                  "px-1 py-2 font-medium text-center w-10",
                  highlightMonth === i && "bg-green-50 text-green-700"
                )}
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((produce, idx) => (
            <tr
              key={produce.id}
              className={cn(
                "border-b last:border-0 hover:bg-slate-50 transition-colors",
                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              )}
            >
              <td className="px-3 py-1.5 sticky left-0 bg-inherit z-10">
                <Link
                  to={`/produit/${produce.id}`}
                  className="flex items-center gap-1.5 hover:text-green-700 transition-colors font-medium"
                >
                  <span>{produce.emoji}</span>
                  <span className="truncate">{produce.name}</span>
                  {produce.isLocal && (
                    <span className="text-[10px] text-amber-600 shrink-0">🇳🇨</span>
                  )}
                </Link>
              </td>
              {produce.months.map((level, monthIdx) => (
                <td
                  key={monthIdx}
                  className={cn(
                    "px-1 py-1.5 text-center",
                    highlightMonth === monthIdx && "ring-inset ring-1 ring-green-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-4 rounded mx-auto",
                      cellColors[level]
                    )}
                    title={cellTitles[level]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
