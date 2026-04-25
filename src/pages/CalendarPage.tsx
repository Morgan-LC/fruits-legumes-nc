import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarTable } from "@/components/CalendarTable";
import { MonthPicker } from "@/components/MonthPicker";
import { SeasonLegend } from "@/components/SeasonLegend";
import { fruits, legumes } from "@/data/produce";

export function CalendarPage() {
  useSEO({
    title: "Calendrier saisonnier",
    description: "Calendrier complet des fruits et légumes produits localement en Nouvelle-Calédonie, mois par mois. Données IFEL / CAP-NC 2022.",
  });

  const [highlightMonth, setHighlightMonth] = useState<number>(new Date().getMonth());

  return (
    <div className="container py-4 md:py-8 flex flex-col gap-5 md:gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Calendrier saisonnier</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Retrouvez la disponibilité de tous les fruits et légumes produits localement en
          Nouvelle-Calédonie, mois par mois. Données issues du calendrier IFEL / CAP-NC (2022).
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Mettre en évidence un mois
        </h2>
        <MonthPicker selected={highlightMonth} onChange={setHighlightMonth} />
      </div>

      <SeasonLegend />

      <Tabs defaultValue="fruits">
        <TabsList className="mb-4">
          <TabsTrigger value="fruits">🍊 Fruits ({fruits.length})</TabsTrigger>
          <TabsTrigger value="legumes">🥦 Légumes ({legumes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="fruits">
          <CalendarTable items={fruits} highlightMonth={highlightMonth} />
        </TabsContent>

        <TabsContent value="legumes">
          <CalendarTable items={legumes} highlightMonth={highlightMonth} />
        </TabsContent>
      </Tabs>

      <p className="text-xs text-muted-foreground">
        Source : Arbofruits, DAVAR, Chambre d'agriculture et de la pêche, Provinces. Août 2022.
        Contact : contact@ifel.nc — www.cap-nc.nc
      </p>
    </div>
  );
}
