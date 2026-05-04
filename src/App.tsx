import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { CalendarPage } from "@/pages/CalendarPage";
import { ProduceListPage } from "@/pages/ProduceListPage";
import { ProduceDetailPage } from "@/pages/ProduceDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendrier" element={<CalendarPage />} />
            <Route path="/fruits" element={<ProduceListPage category="fruit" />} />
            <Route path="/legumes" element={<ProduceListPage category="legume" />} />
            <Route path="/produit/:id" element={<ProduceDetailPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
