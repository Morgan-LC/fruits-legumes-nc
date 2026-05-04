import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page introuvable</p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
