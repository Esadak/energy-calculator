"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, AlertCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Fel email eller lösenord");
      setLoading(false);
    } else {
      // Lyckad inloggning!
      onClose();
      router.refresh(); // Uppdatera sidan för att visa inloggad status
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Något gick fel");
      setLoading(false);
    } else {
      // Automatisk inloggning efter registrering
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.ok) {
        onClose();
        router.refresh();
      } else {
        setError("Konto skapat, men kunde inte logga in automatiskt. Försök logga in.");
        setIsLogin(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 m-4">
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Rubrik */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Logga in" : "Skapa konto"}
        </h2>

        {/* Flikar */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Logga in
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Registrera
          </button>
        </div>

        {/* Felmeddelande */}
        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Formulär */}
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Namn (valfritt)</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt namn"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="namn@exempel.se"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minst 6 tecken"
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isLogin ? "Loggar in..." : "Skapar konto..."}
              </>
            ) : (
              isLogin ? "Logga in" : "Registrera"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}