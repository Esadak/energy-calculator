import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Användarvillkor</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Senast uppdaterad: 21 november 2026</p>
            
            <p>
              Genom att använda EnergyKoll AI godkänner du dessa användarvillkor. 
              Läs dem noggrant innan du använder tjänsten.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Tjänstens syfte</h2>
            <p>
              EnergyKoll AI tillhandahåller uppskattningar och rekommendationer baserade på AI-analys. 
              Resultaten är vägledande och ska inte ses som professionell ekonomisk eller teknisk rådgivning.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Ansvarsbegränsning</h2>
            <p>
              Vi strävar efter högsta möjliga noggrannhet, men garanterar inte att alla beräkningar 
              är helt felfria. Besparingssiffror är uppskattningar baserade genomsnittsdata.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Ändringar</h2>
            <p>
              Vi förbehåller oss rätten att uppdatera dessa villkor när som helst. 
              Större ändringar meddelas via vår webbplats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}