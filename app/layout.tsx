import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Energy Calculator - Sänk dina energikostnader med AI',
  description:
    'Få personliga rekommendationer för att sänka dina energikostnader. AI-driven analys för svenska hushåll.',
  keywords: [
    'energikalkylator',
    'energibesparing',
    'lägre energikostnader',
    'AI energi',
    'solceller',
    'värmepump',
    'energieffektivitet',
  ],
  authors: [{ name: 'Energy Calculator' }],
  openGraph: {
    title: 'Energy Calculator - Sänk dina energikostnader med AI',
    description:
      'Få personliga rekommendationer för att sänka dina energikostnader med upp till 5000 kr per år.',
    locale: 'sv_SE',
    type: 'website',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energy Calculator - Sänk dina energikostnader med AI',
    description:
      'Få personliga rekommendationer för att sänka dina energikostnader med upp till 5000 kr per år.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  robots: {
    index: true,
    follow: true,
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
