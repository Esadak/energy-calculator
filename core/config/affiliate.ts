export interface AffiliateLink {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'electricity' | 'solar' | 'heatpump' | 'insulation' | 'smart_home';
  commission?: string;
}

export const affiliateLinks: AffiliateLink[] = [
  // Elavtal
  {
    id: 'elskling',
    name: 'Elskling',
    description: 'Jämför elavtal och hitta det billigaste alternativet för ditt hushåll.',
    url: 'https://www.elskling.se/?ref=energy-calc', // Byt till din riktiga affiliate-länk
    category: 'electricity',
    commission: '200 kr per tecknat avtal',
  },
  {
    id: 'compricer',
    name: 'Compricer',
    description: 'Gratis jämförelsetjänst för el, bredband och försäkringar.',
    url: 'https://www.compricer.se/?ref=energy-calc',
    category: 'electricity',
  },
  
  // Solceller
  {
    id: 'otovo',
    name: 'Otovo',
    description: 'Nordens största solcellsföretag. Få offerter från certifierade installatörer.',
    url: 'https://www.otovo.se/?ref=energy-calc',
    category: 'solar',
    commission: '500-2000 kr per installation',
  },
  
  // Värmepumpar
  {
    id: 'via_hem',
    name: 'Via Hem',
    description: 'Jämför offerter på värmepumpar från lokala installatörer.',
    url: 'https://www.viahem.se/?ref=energy-calc',
    category: 'heatpump',
  },
  
  // Isolering
  {
    id: 'rot_avdrag',
    name: 'Skatteverket - ROT-avdrag',
    description: 'Läs mer om ROT-avdrag för energieffektivisering av din bostad.',
    url: 'https://www.skatteverket.se/privat/fastigheterochbostad/renoveraochbyggahus/rotavdrag.4.18e1b10334ebe8bc80009397.html',
    category: 'insulation',
  },
  
  // Smarta hem
  {
    id: 'tibber',
    name: 'Tibber',
    description: 'Smart elavtal med timpris och app som hjälper dig spara energi.',
    url: 'https://www.tibber.com/se?ref=energy-calc',
    category: 'smart_home',
  },
];

/**
 * Hämtar relevanta affiliate-länkar baserat på användarens profil
 */
export function getRelevantAffiliateLinks(
  heatingType: string,
  housingType: string
): AffiliateLink[] {
  const links: AffiliateLink[] = [];

  // Alla får elavtals-rekommendationer
  links.push(...affiliateLinks.filter(l => l.category === 'electricity').slice(0, 2));

  // Villa-ägare får solcells- och värmepumps-rekommendationer
  if (housingType === 'villa') {
    links.push(...affiliateLinks.filter(l => l.category === 'solar'));
    links.push(...affiliateLinks.filter(l => l.category === 'heatpump'));
  }

  // Alla får smarta hem-rekommendationer
  links.push(...affiliateLinks.filter(l => l.category === 'smart_home'));

  // Ta bort dubbletter och begränsa till 4 länkar
  const uniqueLinks = Array.from(new Map(links.map(l => [l.id, l])).values());
  return uniqueLinks.slice(0, 4);
}