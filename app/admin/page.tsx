"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  BarChart3, 
  Download, 
  Users, 
  TrendingUp, 
  MapPin,
  LogOut,
  Shield,
  AlertCircle
} from "lucide-react";

interface Stats {
  totalCalculations: number;
  averageMonthlyCost: number;
  topPostalCodes: { postalCode: string; count: number }[];
}

interface Calculation {
  id: string;
  createdAt: string;
  userEmail?: string;
  housingType: string;
  heatingType: string;
  postalCode: string;
  monthlyCost: number;
  isPremium: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentCalculations, setRecentCalculations] = useState<Calculation[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        setIsAuthenticated(true);
        const data = await res.json();
        if (data.success) {
          setStats(data.data.stats);
          setRecentCalculations(data.data.recentCalculations);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword("");
        // Hämta stats efter inloggning
        const statsRes = await fetch("/api/admin/stats");
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.data.stats);
          setRecentCalculations(statsData.data.recentCalculations);
        }
      } else {
        setPasswordError(data.error || "Fel lösenord");
      }
    } catch (error) {
      setPasswordError("Kunde inte ansluta till servern");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsAuthenticated(false);
    setStats(null);
    setRecentCalculations([]);
  };

  const handleExport = () => {
    window.location.href = "/api/admin/export";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // --- LOGIN VY ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-2xl">Admin Inloggning</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Lösenord</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ange admin-lösenord"
                  disabled={loading}
                />
              </div>
              {passwordError && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {passwordError}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loggar in...
                  </>
                ) : (
                  "Logga in"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Energy Calculator - Statistik & Data</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportera CSV
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logga ut
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Totala beräkningar
              </CardTitle>
              <Users className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.totalCalculations ?? 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Snitt månadskostnad
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.averageMonthlyCost ? `${Math.round(stats.averageMonthlyCost)} kr` : "0 kr"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Populäraste postnummer
              </CardTitle>
              <MapPin className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.topPostalCodes[0]?.postalCode ?? "-"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.topPostalCodes[0]?.count ?? 0} beräkningar
              </p>
            </CardContent>
          </Card>
        </div>

        {stats && stats.topPostalCodes.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Topp 5 Postnummer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topPostalCodes.map((item, index) => (
                  <div key={item.postalCode} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 font-mono w-6">#{index + 1}</span>
                      <span className="font-medium">{item.postalCode}</span>
                    </div>
                    <span className="text-gray-600">{item.count} beräkningar</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Senaste 10 beräkningar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentCalculations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Inga beräkningar ännu</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Datum</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Boende</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Uppvärmning</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Postnummer</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Kostnad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCalculations.map((calc) => (
                      <tr key={calc.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm">
                          {new Date(calc.createdAt).toLocaleDateString("sv-SE")}
                        </td>
                        <td className="py-3 px-2 text-sm">{calc.userEmail || "-"}</td>
                        <td className="py-3 px-2 text-sm capitalize">
                          {calc.housingType === "villa" ? "Villa" : 
                           calc.housingType === "apartment" ? "Lägenhet" : "Radhus"}
                        </td>
                        <td className="py-3 px-2 text-sm capitalize">
                          {calc.heatingType === "electricity" ? "El" : 
                           calc.heatingType === "district_heating" ? "Fjärrvärme" :
                           calc.heatingType === "heat_pump" ? "Värmepump" : "Gas"}
                        </td>
                        <td className="py-3 px-2 text-sm font-mono">{calc.postalCode}</td>
                        <td className="py-3 px-2 text-sm text-right font-medium">{calc.monthlyCost} kr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Affiliate-klick (senaste 30 dagar)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Totala affiliate-klick loggas i databasen. Anslut till affiliate-nätverk som Adtraction eller Awin för att börja tjäna provision.
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Elavtal</p>
                <p className="text-lg font-bold">Elskling, Compricer</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Solceller</p>
                <p className="text-lg font-bold">Otovo</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Värmepumpar</p>
                <p className="text-lg font-bold">Via Hem</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Smart hem</p>
                <p className="text-lg font-bold">Tibber</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}