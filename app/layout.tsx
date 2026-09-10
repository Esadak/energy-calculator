import type { Metadata } from 'next';
import './globals.css';
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'EnergyKoll AI - Sänk dina energikostnader',
  description: 'Få personliga, AI-drivna rekommendationer för att spara upp till 5 000 kr/år på dina energikostnader. Gratis och utan registrering.',
  metadataBase: new URL('https://energykoll.se'),
  // Favicon som SVG data URI (samma blå blixt)
  icons: {
    icon: {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E",
      type: 'image/svg+xml',
    },
    shortcut: {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E",
      type: 'image/svg+xml',
    },
    apple: {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E",
      type: 'image/svg+xml',
    },
  },
  openGraph: {
    title: 'EnergyKoll AI - Sänk dina energikostnader',
    description: 'Få personliga, AI-drivna rekommendationer för att spara upp till 5 000 kr/år på dina energikostnader.',
    url: 'https://energykoll.se',
    siteName: 'EnergyKoll AI',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnergyKoll AI - Sänk dina energikostnader',
    description: 'Få personliga, AI-drivna rekommendationer för att spara upp till 5 000 kr/år på dina energikostnader.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        {/* Lägg till Providers här */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
