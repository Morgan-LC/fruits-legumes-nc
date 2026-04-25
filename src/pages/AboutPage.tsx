import { Leaf, BookOpen, MapPin, Users } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AboutPage() {
  useSEO({
    title: "À propos",
    description: "En savoir plus sur le calendrier saisonnier des fruits et légumes de Nouvelle-Calédonie. Données issues du calendrier IFEL / CAP-NC 2022.",
  });

  return (
    <div className="container py-8 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-3">À propos</h1>
        <p className="text-muted-foreground text-lg">
          Ce site recense les fruits et légumes produits localement en Nouvelle-Calédonie,
          avec leur calendrier de disponibilité mois par mois.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Source des données
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Les données de ce calendrier sont issues du{" "}
              <strong className="text-foreground">
                Calendrier saisonnier IFEL / CAP-NC (Août 2022)
              </strong>
              , élaboré à partir des informations collectées auprès des structures suivantes :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Arbofruits</li>
              <li>DAVAR (Direction des Affaires Vétérinaires, Alimentaires et Rurales)</li>
              <li>Chambre d'agriculture et de la pêche de Nouvelle-Calédonie</li>
              <li>Provinces (Province Sud, Province Nord, Province des Îles)</li>
            </ul>
            <p className="mt-2">
              Contact IFEL : contact@ifel.nc — CAP-NC : www.cap-nc.nc
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Contexte local
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              La Nouvelle-Calédonie bénéficie d'un climat tropical à subtropical, avec une saison
              chaude et humide de novembre à avril, et une saison fraîche et sèche de mai à
              octobre.
            </p>
            <p>
              Ce calendrier est donc{" "}
              <strong className="text-foreground">inversé par rapport à l'hémisphère nord</strong>{" "}
              : les mangues, litchis et autres fruits tropicaux sont disponibles en fin d'année,
              tandis que les agrumes et légumes d'hiver sont de saison de mai à septembre.
            </p>
            <p>
              Certains produits comme l'igname, le taro, le manioc, la chouchoute ou les bananes
              Poingo occupent une place centrale dans la culture kanak et mélanésienne.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Comprendre la légende
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                {
                  color: "bg-green-600",
                  label: "Pleine production locale",
                  desc: "Le produit est en pleine saison, abondant sur les marchés locaux.",
                },
                {
                  color: "bg-green-400",
                  label: "Production locale intermédiaire",
                  desc: "Le produit est disponible mais en quantité moindre.",
                },
                {
                  color: "bg-green-100",
                  label: "Faible production locale",
                  desc: "Production marginale, le produit peut être difficile à trouver localement.",
                },
                {
                  color: "bg-slate-100 border border-slate-200",
                  label: "Pas de production locale significative",
                  desc: "Le produit n'est pas cultivé ou récolté localement ce mois-ci.",
                },
              ].map(({ color, label, desc }) => (
                <div key={label} className="flex gap-3">
                  <div className={`w-4 h-4 rounded shrink-0 mt-0.5 ${color}`} />
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Pourquoi manger local et de saison ?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Consommer des fruits et légumes de saison produits localement en Nouvelle-Calédonie
              présente de nombreux avantages :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground">Fraîcheur et qualité</strong> : les produits
                n'ont pas voyagé, ils sont récoltés à maturité.
              </li>
              <li>
                <strong className="text-foreground">Soutien à l'économie locale</strong> :
                acheter local soutient les agriculteurs calédoniens.
              </li>
              <li>
                <strong className="text-foreground">Impact environnemental réduit</strong> :
                moins de transport, moins d'emballage.
              </li>
              <li>
                <strong className="text-foreground">Prix plus accessibles</strong> : les produits
                de pleine saison sont plus abondants et souvent moins chers.
              </li>
              <li>
                <strong className="text-foreground">Biodiversité</strong> : valoriser les variétés
                locales contribue à préserver la biodiversité agricole calédonienne.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
