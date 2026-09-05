import type { CalculatorFormData } from '@/features/calculator/types';

const housingLabels: Record<string, string> = {
  villa: 'villa (fristående hus)',
  apartment: 'lägenhet',
  townhouse: 'radhus',
};

const heatingLabels: Record<string, string> = {
  electricity: 'direktverkad el',
  district_heating: 'fjärrvärme',
  heat_pump: 'värmepump',
  gas: 'gas',
};

export function buildEnergyAnalysisPrompt(input: CalculatorFormData): string {
  const housing = housingLabels[input.housingType] ?? input.housingType;
  const heating = heatingLabels[input.heatingType] ?? input.heatingType;

  return `You are a certified energy expert in Europe. The user lives in a ${housing} with ${heating} and pays ${input.monthlyCost} SEK per month in postal code ${input.postalCode}.

Generate a JSON response with this exact structure:
{
  "summary": "Brief summary of their situation",
  "potentialSavings": number (estimated monthly savings in SEK),
  "recommendations": [
    {
      "type": "immediate_win",
      "title": "Short title",
      "description": "Detailed explanation of free action they can take today",
      "savings": number
    },
    {
      "type": "investment",
      "title": "Short title",
      "description": "Investment that pays off within 2 years",
      "cost": number,
      "roi": number
    },
    {
      "type": "subsidy",
      "title": "Short title",
      "description": "Government/municipal subsidy they should investigate",
      "link": "URL to authority"
    }
  ]
}

Answer in Swedish. Be professional, empathetic, and fact-based.
Return only valid JSON, no markdown.`;
}
