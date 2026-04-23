import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProduceCard } from "@/components/ProduceCard";
import { MonthPicker } from "@/components/MonthPicker";
import { SeasonLegend } from "@/components/SeasonLegend";
import { fruits, legumes } from "@/data/produce";
import type { Produce } from "@/types";

interface ProduceListPageProps {
  category: "fruit" | "legume";
}

export function ProduceListPage({ category }: ProduceListPageProps) {
  const allItems = category === "fruit" ? fruits : legumes;
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth());
  const [onlyLocal, setOnlyLocal] = useState(false);

  const filtered = useMemo(() => {
    let items: Produce[] = allItems;

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedMonth !== null) {
      items = items.filter((p) => p.months[selectedMonth] > 0);
    }

    if (onlyLocal) {
      items = items.filter((p) => p.isLocal);
    }

    if (selectedMonth !== null) {
      items = [...items].sort((a, b) => b.months[selectedMonth] - a.months[selectedMonth]);
    }

    return items;
  }, [allItems, search, selectedMonth, onlyLocal]);

  const title = category === "fruit" ? "Fruits" : "Légumes";
  const icon = category === "fruit" ? "🍊" : "🥦";

  return (
    <div className="container py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {icon} {title} de Nouvelle-Calédonie
        </h1>
        <p className="text-muted-foreground">
          {allItems.length} {title.toLowerCase()} répertoriés dans le calendrier de production
          locale.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Rechercher un ${category === "fruit" ? "fruit" : "légume"}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <button
            onClick={() => setOnlyLocal(!onlyLocal)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              onlyLocal
                ? "bg-amber-100 border-amber-300 text-amber-800"
                : "bg-white border-input hover:bg-accent"
            }`}
          >
            🇳🇨 Produits locaux uniquement
          </button>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Filtrer par mois de disponibilité :
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <MonthPicker
              selected={selectedMonth ?? -1}
              onChange={(m) => setSelectedMonth(selectedMonth === m ? null : m)}
            />
            {selectedMonth !== null && (
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>

      <SeasonLegend />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </p>
        {selectedMonth !== null && (
          <Badge variant="outline" className="text-green-700 border-green-300">
            Disponibles en{" "}
            {new Date(2024, selectedMonth).toLocaleString("fr-FR", { month: "long" })}
          </Badge>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p>Aucun résultat pour ces critères.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((p) => (
            <ProduceCard
              key={p.id}
              produce={p}
              currentMonth={selectedMonth ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
