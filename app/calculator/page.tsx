"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft, Home, Zap, Banknote } from "lucide-react";
import { getRelevantAffiliateLinks } from "@/core/config/affiliate";
import { AffiliateLinkCard } from "@/components/ui/AffiliateLink";

type HousingType = "villa" | "apartment" | "townhouse" | "";
type HeatingType = "electricity" | "district_heating" | "heat_pump" | "gas" | "";

interface ReportData {
  summary: string;
  potentialSavings: number;
  recommendations: {
    type: string;
    title: string;
    description: string;
    savings?: number;
    cost?: number;
    roi?: number;
    link?: string;
  }[];
}

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    housingType: "" as HousingType,
    size: "",
    heatingType: "" as HeatingType,
    postalCode: "",
    monthlyCost: "",
    email: "",
  });

  const handleNext = () => {
    // Enkel validering per steg
    if (step === 1 && (!formData.housingType || !formData.size)) return;
    if (step === 2 && (!formData.heatingType || formData.postalCode.length < 5)) return;
    if (step === 3 && !formData.monthlyCost) return;
    
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!formData.monthlyCost) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          housingType: formData.housingType,
          heatingType: formData.heatingType,
          postalCode: formData.postalCode,
          monthlyCost: Number(formData.monthlyCost),
          email: formData.email || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Något gick fel vid beräkningen");
      }

      // Simulera lite "AI-tänkande" tid för bättre UX (minst 2.5 sek)
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setReport(data.report);
      setStep(4); // Gå till resultatvy
    } catch (err) {
      setError(err instanceof Error ? err.message : "Okänt fel");
    } finally {
      setIsLoading(false);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setReport(null);
    setFormData({ housingType: "", size: "", heatingType: "", postalCode: "", monthlyCost: "", email: "" });
    setError(null);
  };

  // --- RENDER: STEG 1 (Boende) ---
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto p-4 mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Home className="w-5 h-5" /> Steg 1: Ditt boende</CardTitle>
            <CardDescription>Välj din boendeform och ungefärlig storlek.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Boendeform</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["villa", "apartment", "townhouse"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={formData.housingType === type ? "default" : "outline"}
                    className="h-20 flex flex-col gap-1"
                    onClick={() => setFormData({ ...formData, housingType: type })}
                  >
                    <span className="text-lg capitalize">
                      {type === "villa" ? "Villa" : type === "apartment" ? "Lägenhet" : "Radhus"}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Ungefärlig storlek (m²)</Label>
              <Input
                id="size"
                type="number"
                placeholder="t.ex. 120"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>
            <Button className="w-full" onClick={handleNext} disabled={!formData.housingType || !formData.size}>
              Nästa steg <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- RENDER: STEG 2 (Uppvärmning) ---
  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto p-4 mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5" /> Steg 2: Uppvärmning</CardTitle>
            <CardDescription>Vilken typ av uppvärmning har du och var bor du?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Uppvärmningstyp</Label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { val: "electricity", label: "Direktel" },
                  { val: "district_heating", label: "Fjärrvärme" },
                  { val: "heat_pump", label: "Värmepump" },
                  { val: "gas", label: "Gas" },
                ] as const).map((item) => (
                  <Button
                    key={item.val}
                    variant={formData.heatingType === item.val ? "default" : "outline"}
                    className="h-16"
                    onClick={() => setFormData({ ...formData, heatingType: item.val })}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postnummer</Label>
              <Input
                id="postalCode"
                type="text"
                maxLength={6}
                placeholder="t.ex. 12345"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, "") })}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Tillbaka</Button>
              <Button className="flex-1" onClick={handleNext} disabled={!formData.heatingType || formData.postalCode.length < 5}>
                Nästa steg <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- RENDER: STEG 3 (Kostnad) ---
  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto p-4 mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Banknote className="w-5 h-5" /> Steg 3: Din kostnad</CardTitle>
            <CardDescription>Ungefärlig månadskostnad för energi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyCost">Månadskostnad (kr)</Label>
              <Input
                id="monthlyCost"
                type="number"
                placeholder="t.ex. 1500"
                value={formData.monthlyCost}
                onChange={(e) => setFormData({ ...formData, monthlyCost: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-post (Valfritt, för att spara rapporten)</Label>
              <Input
                id="email"
                type="email"
                placeholder="din@email.se"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Tillbaka</Button>
              <Button className="flex-1" onClick={handleSubmit} disabled={!formData.monthlyCost || isLoading}>
                {isLoading ? "AI analyserar..." : "Generera rapport"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- RENDER: LADDNING ---
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4 mt-20 text-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">AI analyserar dina data...</h2>
        <p className="text-gray-600">Vi jämför din profil med tusentals liknande hushåll i Europa.</p>
      </div>
    );
  }

  // --- RENDER: RESULTAT ---
   // --- RENDER: RESULTAT ---
  if (step === 4 && report) {
    // Hämta relevanta affiliate-länkar baserat på användarens val
    const relevantLinks = getRelevantAffiliateLinks(
      formData.heatingType,
      formData.housingType
    );

    return (
      <div className="max-w-3xl mx-auto p-4 mt-10 space-y-6">
        {/* Huvudrapport */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-2xl">Din personliga energirapport</CardTitle>
            <CardDescription>{report.summary}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Potentiell besparing</p>
            <p className="text-5xl font-bold text-green-700 mt-2">{report.potentialSavings} kr<span className="text-xl text-gray-600 font-normal">/mån</span></p>
          </CardContent>
        </Card>

        {/* 3 Rekommendationer */}
        <div className="grid md:grid-cols-3 gap-4">
          {report.recommendations.map((rec, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600">{rec.description}</p>
                {rec.savings && <p className="text-sm font-semibold text-green-600">Besparing: ~{rec.savings} kr/mån</p>}
                {rec.cost && <p className="text-sm font-semibold text-blue-600">Investering: ~{rec.cost} kr (ROI: {rec.roi}%)</p>}
                {rec.link && (
                  <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block mt-2">
                    Läs mer hos myndigheten →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Affiliate-sektion - NYTT! */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              💡 Rekommenderade tjänster
            </CardTitle>
            <CardDescription>
              Dessa tjänster kan hjälpa dig att genomföra besparingsåtgärderna
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {relevantLinks.map((link) => (
                <AffiliateLinkCard
                  key={link.id}
                  name={link.name}
                  description={link.description}
                  url={link.url}
                  category={link.category}
                  calculationId={undefined} // Kan läggas till senare
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              * Vi kan få provision om du klickar på dessa länkar. Detta påverkar inte priset för dig.
            </p>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button size="lg" variant="outline" onClick={() => setStep(3)}>
            Ändra dina uppgifter
          </Button>
          <Button size="lg" onClick={resetCalculator}>
            Gör en ny beräkning
          </Button>
        </div>
      </div>
    );
  }

  return null;
}