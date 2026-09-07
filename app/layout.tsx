import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EnergyKoll AI - Sänk dina energikostnader',
  description: 'Få personliga, AI-drivna rekommendationer för att spara upp till 5 000 kr/år på dina energikostnader. Gratis och utan registrering.',
  metadataBase: new URL('https://energikoll-ai.vercel.app'), // <-- DETTA ÄR DET VIKTIGA TILLÄGGET!
  openGraph: {
    title: 'EnergyKoll AI - Sänk dina energikostnader',
    description: 'Få personliga, AI-drivna rekommendationer för att spara pengar på energi.',
    url: 'https://energikoll-ai.vercel.app',
    siteName: 'EnergyKoll AI',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnergyKoll AI - Sänk dina energikostnader',
    description: 'Få personliga, AI-drivna rekommendationer för att spara pengar på energi.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
