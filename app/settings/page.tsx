"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch("/api/user/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        await signOut({ redirect: false });
        router.push("/");
      } else {
        setError(data.error || "Något gick fel");
      }
    } catch (error) {
      setError("Kunde inte ansluta till servern");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Du måste vara inloggad för att se denna sida.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-8 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till dashboard
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Profilinformation */}
          <Card>
            <CardHeader>
              <CardTitle>Profilinformation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={session.user?.email || ""} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Ta bort konto */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Ta bort konto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                När du tar bort ditt konto raderas all din data permanent, inklusive:
              </p>
              <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
                <li>Ditt användarkonto</li>
                <li>Alla dina beräkningar</li>
                <li>All sparad historik</li>
              </ul>

              {!showConfirm ? (
                <Button
                  variant="destructive"
                  onClick={() => setShowConfirm(true)}
                >
                  Ta bort mitt konto
                </Button>
              ) : (
                <div className="space-y-4 border-t pt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">
                          Är du helt säker?
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                          Denna åtgärd kan inte ångras. All din data kommer att raderas permanent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Ange ditt lösenord för att bekräfta
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ditt lösenord"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting || !password}
                    >
                      {isDeleting ? "Raderar..." : "Ja, radera mitt konto"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowConfirm(false);
                        setPassword("");
                        setError("");
                      }}
                    >
                      Avbryt
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}