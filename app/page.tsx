import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Leaf, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Energy Calculator</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#hur-fungerar" className="text-gray-600 hover:text-gray-900 transition">
              Så fungerar det
            </Link>
            <Link href="#funktioner" className="text-gray-600 hover:text-gray-900 transition">
              Funktioner
            </Link>
            <Link href="/calculator" className="text-gray-600 hover:text-gray-900 transition">
              Kalkylator
            </Link>
          </nav>
          <Link href="/calculator">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Kom igång <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Drivs av Google Gemini AI
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Sänk dina energikostnader med <span className="text-blue-600">AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Få personliga rekommendationer och spara upp till{" "}
              <span className="text-green-600 font-semibold">5 000 kr/år</span> på dina energikostnader. 
              AI-driven analys för svenska hushåll.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/calculator">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto">
                  Beräkna din besparing <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#hur-fungerar">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Så fungerar det
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Ingen registrering
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Gratis att använda
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Miljövänligt
              </div>
            </div>
          </div>

          {/* Hero Image/Card - FIXAD VERSION */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-blue-600 aspect-[4/3]">
              {/* Använder en gradient som bakgrund istället för extern bild */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Zap className="w-24 h-24 mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-2">Smart Energi</h3>
                  <p className="text-xl opacity-90">AI-driven besparing</p>
                </div>
              </div>
              
              {/* Floating Card 1 - Miljövänligt */}
              <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg p-4 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Miljövänligt</span>
                </div>
                <p className="text-sm text-gray-600">Minska utsläppen</p>
              </div>

              {/* Floating Card 2 - Besparing */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">417 kr/mån</p>
                    <p className="text-sm text-gray-600">Potentiell besparing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="hur-fungerar" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Så fungerar det
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tre enkla steg till lägre energikostnader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold">Berätta om ditt boende</h3>
                <p className="text-gray-600">
                  Svara på 3 enkla frågor om din bostad och uppvärmning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold">AI-analys</h3>
                <p className="text-gray-600">
                  Vår AI jämför din profil med tusentals liknande hushåll i Europa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold">Få rekommendationer</h3>
                <p className="text-gray-600">
                  Personliga tips för att spara pengar direkt.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funktioner" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Varför använda Energy Calculator?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vi hjälper dig att hitta de bästa sätten att spara energi och pengar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <Wallet className="w-12 h-12 text-blue-600" />
                <h3 className="text-xl font-semibold">Spara pengar</h3>
                <p className="text-gray-600">
                  Få konkreta förslag på hur du kan sänka dina månadskostnader med upp till 5000 kr/år.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <Zap className="w-12 h-12 text-blue-600" />
                <h3 className="text-xl font-semibold">AI-driven analys</h3>
                <p className="text-gray-600">
                  Vår avancerade AI analyserar din situation och ger skräddarsydda rekommendationer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <Leaf className="w-12 h-12 text-green-600" />
                <h3 className="text-xl font-semibold">Miljövänligt</h3>
                <p className="text-gray-600">
                  Minska ditt koldioxidavtryck samtidigt som du sparar pengar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Redo att sänka dina energikostnader?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Gör beräkningen nu - det tar bara 30 sekunder och är helt gratis.
          </p>
          <Link href="/calculator">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Beräkna din besparing nu <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Energy Calculator</span>
            </div>
            <p className="text-sm">
              © 2026 Energy Calculator. Drivs av Google Gemini AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}