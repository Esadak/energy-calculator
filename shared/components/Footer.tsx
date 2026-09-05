import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = [
  {
    title: 'Tjänster',
    links: [
      { label: 'Kalkylator', href: '/calculator' },
      { label: 'Sparad rapport', href: '/result' },
      { label: 'Admin', href: '/admin' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Hur det fungerar', href: '/#how-it-works' },
      { label: 'Funktioner', href: '/#features' },
      { label: 'Rekommendationer', href: '/#categories' },
    ],
  },
  {
    title: 'Juridik',
    links: [
      { label: 'Integritetspolicy', href: '/#privacy' },
      { label: 'Användarvillkor', href: '/#terms' },
      { label: 'Cookies', href: '/#cookies' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-bold">Energy Calculator</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Hjälper svenska hushåll sänka sina energikostnader med AI-driven analys.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Energy Calculator. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
