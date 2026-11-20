"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthModal } from "@/components/auth/auth-modal";
import { 
  Zap, 
  Leaf, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  LogOut,
  User,
  X,
  Lightbulb,
  HelpCircle,
  BookOpen
} from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeResourceModal, setActiveResourceModal] = useState<'faq' | 'blog' | 'tips' | null>(null);

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
          
          {/* Login/Logout Section */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Mina beräkningar
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Logga ut
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>
                Logga in
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
<section className="py-12 md:py-16">
  <div className="container mx-auto px-6 md:px-12 lg:px-20">
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
          <Zap className="w-3 h-3" />
          Drivs av Google Gemini AI
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Sänk dina energikostnader med <span className="text-blue-600">AI</span>
        </h1>
        
        <p className="text-base text-gray-600 leading-relaxed">
          Få personliga rekommendationer och spara upp till{" "}
          <span className="text-green-600 font-semibold">5 000 kr/år</span> på dina energikostnader. 
          AI-driven analys för svenska hushåll.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/calculator">
            <Button className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 w-full sm:w-auto text-sm">
              Beräkna din besparing <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href="#hur-fungerar">
            <Button variant="outline" className="px-5 py-2.5 w-full sm:w-auto text-sm">
              Så fungerar det
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Ingen registrering
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Gratis att använda
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-green-600" />
            Miljövänligt
          </div>
        </div>
      </div>

      {/* Hero Image/Card */}
      <div className="relative">
        <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 w-full h-80 md:h-96">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <Zap className="w-12 h-12 mx-auto mb-2 opacity-90" />
              <h3 className="text-xl font-bold mb-1">Smart Energi</h3>
              <p className="text-sm opacity-90">AI-driven besparing</p>
            </div>
          </div>
          
          {/* Floating Card 1 - Miljövänligt */}
          <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md p-2.5 max-w-[160px]">
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-green-600" />
              <span className="font-semibold text-gray-900 text-xs">Miljövänligt</span>
            </div>
            <p className="text-[10px] text-gray-600 mt-0.5">Minska utsläppen</p>
          </div>

          {/* Floating Card 2 - Besparing */}
          <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-md p-2.5">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-md">
                <TrendingDown className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 leading-none">417 kr/mån</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Potentiell besparing</p>
              </div>
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
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Huvudsektion med 4 kolumner */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Kolonn 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Energy Calculator</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Din intelligenta partner för att optimera energiförbrukningen och sänka kostnaderna med AI-drivna insikter.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium">
                <Zap className="w-3 h-3" />
                Drivs av Google Gemini AI
              </div>
            </div>

            {/* Kolonn 2: Produkt */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Produkt</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/calculator" className="hover:text-white transition">Kalkylator</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Mina beräkningar</Link></li>
                <li><Link href="#funktioner" className="hover:text-white transition">Funktioner</Link></li>
                <li><Link href="#hur-fungerar" className="hover:text-white transition">Så fungerar det</Link></li>
              </ul>
            </div>

            {/* Kolonn 3: Resurser */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resurser</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveResourceModal('blog')}
                    className="hover:text-white transition text-left"
                  >
                    Energiblogg
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveResourceModal('faq')}
                    className="hover:text-white transition text-left"
                  >
                    Vanliga frågor
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveResourceModal('tips')}
                    className="hover:text-white transition text-left"
                  >
                    Spartips
                  </button>
                </li>
                <li>
                  <a href="https://energykoll.se" className="hover:text-white transition">
                    energykoll.se
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolonn 4: Sociala medier */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Följ oss</h4>
              <p className="text-sm text-gray-400 mb-4">
                Häng med för energitips, nyheter och uppdateringar!
              </p>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="bg-gray-800 hover:bg-black p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.88z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                {/* © {new Date().getFullYear()} Energy Calculator. Alla rättigheter förbehållna. */}
              </p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
                  Integritet
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition">
                  Villkor
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Resource Modal */}
      {activeResourceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-3">
                {activeResourceModal === 'faq' && <HelpCircle className="w-6 h-6 text-white" />}
                {activeResourceModal === 'blog' && <BookOpen className="w-6 h-6 text-white" />}
                {activeResourceModal === 'tips' && <Lightbulb className="w-6 h-6 text-white" />}
                <h3 className="text-xl font-bold text-white">
                  {activeResourceModal === 'faq' && 'Vanliga frågor'}
                  {activeResourceModal === 'blog' && 'Energiblogg'}
                  {activeResourceModal === 'tips' && 'Spartips'}
                </h3>
              </div>
              <button
                onClick={() => setActiveResourceModal(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
                aria-label="Stäng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 space-y-4">
              
              {/* FAQ Content */}
              {activeResourceModal === 'faq' && (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Hur fungerar Energy Calculator?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Vår AI analyserar din bostadsprofil och jämför den med tusentals liknande hushåll i Europa. Baserat på detta ger vi skräddarsydda rekommendationer för att sänka dina energikostnader.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Är det verkligen gratis?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ja! Grundversionen av Energy Calculator är helt gratis att använda. Du behöver inte ens registrera dig för att göra en första beräkning.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Hur mycket kan jag spara?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Genomsnittliga besparingar ligger på 3 000–5 000 kr per år, beroende på din nuvarande energianvändning och vilka åtgärder du implementerar.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Vilken AI används?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Vi använder Google Gemini AI för att analysera data och generera personliga rekommendationer baserade på senaste forskningen om energieffektivisering.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Behöver jag installera något?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Nej, Energy Calculator är en webbapplikation som fungerar direkt i din webbläsare på både dator, surfplatta och mobil.
                    </p>
                  </div>
                </div>
              )}

              {/* Blog Content */}
              {activeResourceModal === 'blog' && (
                <div className="space-y-6">
                  <article className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>📅 15 nov 2026</span>
                      <span>•</span>
                      <span>5 min läsning</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">5 enkla sätt att sänka elräkningen i vinter</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Med stigande energipriser är det viktigare än någonsin att vara smart med sin förbrukning. Här är fem konkreta åtgärder som gör stor skillnad – utan att det kostar dig något.
                    </p>
                  </article>

                  <article className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>📅 8 nov 2026</span>
                      <span>•</span>
                      <span>3 min läsning</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Så fungerar värmepumpar – och är det värt det?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Värmepumpar har blivit allt mer populära, men vad kostar de egentligen och hur snabbt tjänar du igen investeringen? Vi reder ut begreppen.
                    </p>
                  </article>

                  <article className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>📅 1 nov 2026</span>
                      <span>•</span>
                      <span>4 min läsning</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">AI i hemmet – framtidens energisparande</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Artificiell intelligens revolutionerar hur vi hanterar energi. Läs om hur smarta system kan optimera din förbrukning automatiskt.
                    </p>
                  </article>
                </div>
              )}

              {/* Tips Content */}
              {activeResourceModal === 'tips' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Sänk temperaturen med 1°C</h4>
                        <p className="text-gray-600 text-sm">
                          Genom att sänka inomhustemperaturen med bara en grad kan du spara upp till 5% på uppvärmningskostnaden. Det motsvarar cirka 800 kr per år för ett genomsnittligt hus.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Byt till LED-belysning</h4>
                        <p className="text-gray-600 text-sm">
                          LED-lampor använder upp till 80% mindre energi än gamla glödlampor och håller 25 gånger längre. Investeringen tjänas igen på bara några månader.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Wallet className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Tvätta i 30°C istället för 60°C</h4>
                        <p className="text-gray-600 text-sm">
                          För de flesta kläder räcker 30°C utmärkt. Du sparar upp till 40% energi per tvätt och kläderna håller längre.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <TrendingDown className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Använd timers på dina apparater</h4>
                        <p className="text-gray-600 text-sm">
                          Ställ in timers på element, varmvattenberedare och andra energikrävande apparater så att de bara är aktiva när du faktiskt behöver dem.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Täta fönster och dörrar</h4>
                        <p className="text-gray-600 text-sm">
                          Dragiga fönster och dörrar kan stå för upp till 25% av värmeförlusten. Tätningslister är billiga och enkla att montera själv.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 bg-gray-50 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setActiveResourceModal(null)}
              >
                Stäng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}