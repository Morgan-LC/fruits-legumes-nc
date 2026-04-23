import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Leaf, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProduceCard } from "@/components/ProduceCard";
import { SeasonLegend } from "@/components/SeasonLegend";
import { getFullSeasonProduce, getInSeasonProduce } from "@/data/produce";
import { MONTH_NAMES } from "@/types";

export function HomePage() {
  const currentMonth = useMemo(() => new Date().getMonth(), []);
  const currentMonthName = MONTH_NAMES[currentMonth];

  const fullSeason = useMemo(() => getFullSeasonProduce(currentMonth), [currentMonth]);
  const inSeason = useMemo(() => getInSeasonProduce(currentMonth), [currentMonth]);

  const fruits = fullSeason.filter((p) => p.category === "fruit").slice(0, 6);
  const legumes = fullSeason.filter((p) => p.category === "legume").slice(0, 6);

  const localProduce = inSeason.filter((p) => p.isLocal);

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-700 to-emerald-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🇳🇨 Nouvelle-Calédonie
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              À chaque saison,
              <br />
              ses fruits et légumes
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-lg">
              Découvrez les produits locaux disponibles en ce moment en Nouvelle-Calédonie et
              consommez local, frais et de saison.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-green-800 hover:bg-green-50">
                <Link to="/calendrier">
                  Voir le calendrier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-white/10 hover:bg-white/20"
              >
                <Link to="/fruits">Explorer les fruits</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Mois en cours */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sun className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold">En ce mois de {currentMonthName}</h2>
              </div>
              <p className="text-muted-foreground">
                {fullSeason.length} produits en pleine production locale
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/calendrier">
                Tout voir <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <SeasonLegend />

          {fruits.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🍊 Fruits de saison
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {fruits.map((p) => (
                  <ProduceCard key={p.id} produce={p} currentMonth={currentMonth} />
                ))}
              </div>
              {fullSeason.filter((p) => p.category === "fruit").length > 6 && (
                <div className="mt-3 text-center">
                  <Button asChild variant="ghost">
                    <Link to="/fruits">
                      Voir tous les fruits{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}

          {legumes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🥦 Légumes de saison
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {legumes.map((p) => (
                  <ProduceCard key={p.id} produce={p} currentMonth={currentMonth} />
                ))}
              </div>
              {fullSeason.filter((p) => p.category === "legume").length > 6 && (
                <div className="mt-3 text-center">
                  <Button asChild variant="ghost">
                    <Link to="/legumes">
                      Voir tous les légumes <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Produits locaux mis en avant */}
        {localProduce.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              <h2 className="text-2xl font-bold">Produits typiquement calédoniens</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Ces produits sont emblématiques du terroir et de la culture calédonienne.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {localProduce.map((p) => (
                <ProduceCard key={p.id} produce={p} currentMonth={currentMonth} />
              ))}
            </div>
          </section>
        )}

        {/* Statistiques */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-100 bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                  <span className="text-xl">🍊</span> Fruits locaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-800">29</div>
                <p className="text-sm text-green-600">variétés répertoriées</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5" /> Légumes locaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-800">36</div>
                <p className="text-sm text-emerald-600">variétés répertoriées</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-700 flex items-center gap-2">
                  <span className="text-xl">🇳🇨</span> Produits traditionnels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-800">12</div>
                <p className="text-sm text-amber-600">produits emblématiques calédoniens</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
