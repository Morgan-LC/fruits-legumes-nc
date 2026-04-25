import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeasonBar } from "@/components/SeasonBar";
import type { Produce, ProductionLevel } from "@/types";
import { cn } from "@/lib/utils";

interface ProduceCardProps {
  produce: Produce;
  currentMonth?: number;
}

const levelVariant: Record<ProductionLevel, "full" | "intermediate" | "weak" | "none"> = {
  3: "full",
  2: "intermediate",
  1: "weak",
  0: "none",
};

const levelLabel: Record<ProductionLevel, string> = {
  3: "Pleine saison",
  2: "En saison",
  1: "Faible production",
  0: "Hors saison",
};

export function ProduceCard({ produce, currentMonth }: ProduceCardProps) {
  const monthLevel =
    currentMonth !== undefined ? produce.months[currentMonth] : undefined;

  return (
    <Link to={`/produit/${produce.id}`} className="block group">
      <Card className="h-full hover:shadow-md transition-shadow duration-200 hover:border-green-300">
        <CardContent className="p-4 flex flex-col gap-3">
          {/* Mobile : badge sous le nom, à côté de la catégorie */}
          <div className="flex items-start gap-2 md:hidden">
            <span className="text-3xl shrink-0">{produce.emoji}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm leading-tight group-hover:text-green-700 transition-colors">
                {produce.name}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span
                  className={cn(
                    "text-xs",
                    produce.category === "fruit" ? "text-orange-500" : "text-emerald-600"
                  )}
                >
                  {produce.category === "fruit" ? "Fruit" : "Légume"}
                </span>
                {produce.isLocal && (
                  <Badge variant="local" className="text-[10px]">
                    🇳🇨 Local
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Desktop : badge en haut à droite */}
          <div className="hidden md:flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{produce.emoji}</span>
              <div>
                <h3 className="font-semibold text-sm leading-tight group-hover:text-green-700 transition-colors">
                  {produce.name}
                </h3>
                <span
                  className={cn(
                    "text-xs",
                    produce.category === "fruit" ? "text-orange-500" : "text-emerald-600"
                  )}
                >
                  {produce.category === "fruit" ? "Fruit" : "Légume"}
                </span>
              </div>
            </div>
            {produce.isLocal && (
              <Badge variant="local" className="shrink-0 text-[10px]">
                🇳🇨 Local
              </Badge>
            )}
          </div>

          {monthLevel !== undefined && (
            <Badge variant={levelVariant[monthLevel]} className="self-start">
              {levelLabel[monthLevel]}
            </Badge>
          )}

          <p className="text-xs text-muted-foreground line-clamp-2">{produce.description}</p>

          <SeasonBar months={produce.months} compact />
        </CardContent>
      </Card>
    </Link>
  );
}
