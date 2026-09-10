import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculationRepository } from "@/infrastructure/database/repositories/calculation-repository";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Calendar, Home, Zap } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const calculations = await calculationRepository.findByUserId(session.user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tillbaka
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Mina Beräkningar</h1>
          </div>
          <div className="text-sm text-gray-600">
            {session.user.email}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {calculations.length === 0 ? (
          <Card className="text-center py-12 max-w-md mx-auto">
            <CardContent className="pt-6">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inga sparade beräkningar än</h3>
              <p className="text-gray-600 mb-6">Gör din första energiberäkning för att se den här.</p>
              <Link href="/calculator">
                <Button>Gör en beräkning nu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculations.map((calc) => {
              let reportData = null;
              try {
                if (calc.aiReport) reportData = JSON.parse(calc.aiReport);
              } catch (e) {
                console.error("Failed to parse AI report", e);
              }

              const housingLabel = calc.housingType === "villa" ? "Villa" : calc.housingType === "apartment" ? "Lägenhet" : "Radhus";
              const heatingLabel = calc.heatingType === "electricity" ? "El" : calc.heatingType === "district_heating" ? "Fjärrvärme" : calc.heatingType === "heat_pump" ? "Värmepump" : "Gas";

              return (
                <Card key={calc.id} className="hover:shadow-lg transition-shadow border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Home className="w-5 h-5 text-blue-600" />
                          {housingLabel}
                        </CardTitle>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(calc.createdAt).toLocaleDateString("sv-SE")}
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
  {Number(calc.monthlyCost)} kr
</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap className="w-4 h-4" />
                      <span>{heatingLabel}</span>
                      <span className="mx-2">•</span>
                      <span>{calc.postalCode}</span>
                    </div>
                    
                    {reportData?.potentialSavings && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800 font-medium">
                          💡 Potentiell besparing: ~{reportData.potentialSavings} kr/mån
                        </p>
                      </div>
                    )}

                    <Link href={`/calculator?reportId=${calc.id}`}>
                      <Button variant="outline" className="w-full">
                        Visa detaljerad rapport
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}