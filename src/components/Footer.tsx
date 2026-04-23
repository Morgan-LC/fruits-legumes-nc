import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-green-700 mb-3">
              <Leaf className="h-4 w-4" />
              <span>Fruits & Légumes NC</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Calendrier saisonnier des fruits et légumes produits localement en Nouvelle-Calédonie.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: "/", label: "Accueil" },
                { to: "/calendrier", label: "Calendrier" },
                { to: "/fruits", label: "Fruits" },
                { to: "/legumes", label: "Légumes" },
                { to: "/a-propos", label: "À propos" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-muted-foreground hover:text-green-700 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Sources</h4>
            <p className="text-sm text-muted-foreground">
              Données issues du calendrier saisonnier IFEL — CAP-NC (Août 2022).
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Sources : Arbofruits, DAVAR, Chambre d'agriculture et de la pêche, Provinces.
            </p>
          </div>
        </div>

        <Separator className="my-6" />
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} Fruits & Légumes NC — Données IFEL / CAP-NC
        </p>
      </div>
    </footer>
  );
}
