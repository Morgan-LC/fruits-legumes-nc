export type ProductionLevel = 0 | 1 | 2 | 3;
// 0 = aucune production locale significative
// 1 = faible production locale
// 2 = production locale intermédiaire
// 3 = pleine production locale

export type Category = "fruit" | "legume";

export interface Produce {
  id: string;
  name: string;
  category: Category;
  emoji: string;
  description: string;
  isLocal: boolean; // typique de la Nouvelle-Calédonie
  // tableau des 12 mois: Jan=0 … Déc=11
  months: [
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
    ProductionLevel,
  ];
}

export const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const;

export const MONTH_SHORT = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
] as const;

export const PRODUCTION_LABELS: Record<ProductionLevel, string> = {
  0: "Pas de production locale significative",
  1: "Faible production locale",
  2: "Production locale intermédiaire",
  3: "Pleine production locale",
};
