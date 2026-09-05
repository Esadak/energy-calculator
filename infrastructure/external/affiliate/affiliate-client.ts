export interface AffiliateLink {
  id: string;
  provider: string;
  url: string;
  label: string;
  category: string;
}

const affiliateLinks: Record<string, AffiliateLink> = {
  'solar-panels': {
    id: 'solar-panels',
    provider: 'SolarProvider EU',
    url: 'https://example.com/solar',
    label: 'Get Solar Panels',
    category: 'solar',
  },
  'heat-pump': {
    id: 'heat-pump',
    provider: 'HeatPump Pro',
    url: 'https://example.com/heat-pump',
    label: 'Explore Heat Pumps',
    category: 'heating',
  },
  'insulation': {
    id: 'insulation',
    provider: 'InsulateEU',
    url: 'https://example.com/insulation',
    label: 'Insulation Services',
    category: 'insulation',
  },
  'smart-meter': {
    id: 'smart-meter',
    provider: 'SmartMeter Direct',
    url: 'https://example.com/smart-meter',
    label: 'Smart Meter',
    category: 'monitoring',
  },
};

export function getAffiliateLink(id: string): AffiliateLink | null {
  return affiliateLinks[id] ?? null;
}

export async function trackAffiliateClick(linkId: string, source: string): Promise<void> {
  console.log(`Affiliate click tracked: ${linkId} from ${source}`);
}
