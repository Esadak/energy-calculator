import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Integritetspolicy</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Senast uppdaterad: 21 november 2026</p>
            
            <p>
              Vi på EnergyKoll AI tar din integritet på största allvar. Denna policy beskriver hur vi samlar in, 
              använder och skyddar din information när du använder vår tjänst.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Information vi samlar in</h2>
            <p>
              När du använder vår kalkylator samlar vi endast in den information du frivilligt anger, 
              såsom bostadstyp, uppvärmningsform och postnummer. Vi sparar inte personligt identifierbar 
              information (som namn eller exakt adress) utan ditt uttryckliga medgivande.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Hur vi använder din data</h2>
            <p>
              Din data används uteslutande för att generera personliga energirekommendationer via vår 
              AI-motor (Google Gemini). Vi säljer aldrig din data till tredje part.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Dina rättigheter</h2>
            <p>
              Enligt GDPR har du rätt att begära ut, rätta eller radera all data vi har om dig. 
              Kontakta oss på <span className="text-blue-600">kontakt@energykoll.se</span> för sådan förfrågan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}