import { useMemo } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeasonBar } from "@/components/SeasonBar";
import { SeasonLegend } from "@/components/SeasonLegend";
import { ProduceCard } from "@/components/ProduceCard";
import { getProduceById, allProduce } from "@/data/produce";
import { MONTH_NAMES, PRODUCTION_LABELS } from "@/types";

export function ProduceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const produce = id ? getProduceById(id) : undefined;

  const currentMonth = useMemo(() => new Date().getMonth(), []);

  const related = useMemo(() => {
    if (!produce) return [];
    return allProduce
      .filter(
        (p) =>
          p.id !== produce.id &&
          p.category === produce.category &&
          p.months[currentMonth] >= 2
      )
      .slice(0, 4);
  }, [produce, currentMonth]);

  useSEO({
    title: produce ? `${produce.name} — ${produce.category === "fruit" ? "Fruit" : "Légume"} de saison en Nouvelle-Calédonie` : "Produit",
    description: produce?.description,
  });

  if (!produce) {
    return <Navigate to="/" replace />;
  }

  const currentLevel = produce.months[currentMonth];
  const peakMonths = produce.months
    .map((level, i) => ({ level, month: i }))
    .filter(({ level }) => level === 3)
    .map(({ month }) => MONTH_NAMES[month]);

  const availableMonths = produce.months
    .map((level, i) => ({ level, month: i }))
    .filter(({ level }) => level >= 2)
    .map(({ month }) => MONTH_NAMES[month]);

  return (
    <div className="container py-8 flex flex-col gap-8 max-w-4xl">
      {/* Retour */}
      <Link
        to={produce.category === "fruit" ? "/fruits" : "/legumes"}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux {produce.category === "fruit" ? "fruits" : "légumes"}
      </Link>

      {/* En-tête */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="text-8xl flex items-center justify-center w-40 h-40 bg-slate-50 rounded-2xl border shrink-0 mx-auto md:mx-0">
          {produce.emoji}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant={produce.category === "fruit" ? "default" : "secondary"}
              className={
                produce.category === "fruit"
                  ? "bg-orange-100 text-orange-700 border-orange-200"
                  : "bg-emerald-100 text-emerald-700 border-emerald-200"
              }
            >
              {produce.category === "fruit" ? "🍊 Fruit" : "🥦 Légume"}
            </Badge>
            {produce.isLocal && (
              <Badge variant="local" className="flex items-center gap-1">
                🇳🇨 Produit typiquement calédonien
              </Badge>
            )}
            <Badge
              variant={
                currentLevel === 3
                  ? "full"
                  : currentLevel === 2
                  ? "intermediate"
                  : currentLevel === 1
                  ? "weak"
                  : "none"
              }
            >
              {currentLevel > 0 ? "En saison" : "Hors saison"} en{" "}
              {MONTH_NAMES[currentMonth]}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold mb-3">{produce.name}</h1>
          <p className="text-muted-foreground leading-relaxed">{produce.description}</p>
        </div>
      </div>

      {/* Calendrier de disponibilité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Leaf className="h-5 w-5 text-green-600" />
            Disponibilité au fil des mois
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SeasonBar months={produce.months} />
          <SeasonLegend />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {peakMonths.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-700 mb-1">Pleine saison</p>
                <p className="text-sm text-muted-foreground">{peakMonths.join(", ")}</p>
              </div>
            )}
            {availableMonths.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-1">Disponible (intermédiaire+)</p>
                <p className="text-sm text-muted-foreground">{availableMonths.join(", ")}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tableau mensuel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détail par mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {produce.months.map((level, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2 rounded-md text-sm ${
                  i === currentMonth ? "ring-2 ring-green-500" : ""
                } ${
                  level === 3
                    ? "bg-green-50 text-green-800"
                    : level === 2
                    ? "bg-green-50/60 text-green-700"
                    : level === 1
                    ? "bg-slate-50 text-slate-600"
                    : "bg-white text-slate-400"
                }`}
              >
                <span className="font-medium">
                  {MONTH_NAMES[i]}
                  {i === currentMonth && " 📍"}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    level === 3
                      ? "bg-green-600"
                      : level === 2
                      ? "bg-green-400"
                      : level === 1
                      ? "bg-green-200"
                      : "bg-slate-200"
                  }`}
                  title={PRODUCTION_LABELS[level]}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Produits similaires en saison */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Autres {produce.category === "fruit" ? "fruits" : "légumes"} de saison en{" "}
            {MONTH_NAMES[currentMonth]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProduceCard key={p.id} produce={p} currentMonth={currentMonth} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
