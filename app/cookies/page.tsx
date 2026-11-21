import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till startsidan
          </Button>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Cookie className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Cookiepolicy</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Senast uppdaterad: 21 november 2026</p>
            
            <p>
              EnergyKoll AI använder cookies för att förbättra din upplevelse och förstå hur vår tjänst används.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">Vad är cookies?</h2>
            <p>
              Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. 
              De hjälper oss att komma ihåg dina inställningar och analysera trafik.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">Cookies vi använder</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nödvändiga cookies:</strong> Krävs för att sidan ska fungera (t.ex. inloggning).</li>
              <li><strong>Analyscookies:</strong> Hjälper oss att förstå hur besökare använder sidan (t.ex. via anonymiserad statistik).</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">Hantera cookies</h2>
            <p>
              Du kan när som helst radera cookies via din webbläsares inställningar. 
              Observera att detta kan påverka vissa funktioner på sidan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}