import { NextRequest, NextResponse } from 'next/server';
import { getEnergyReport } from '@/core/ai/gemini-client';
import { calculationRepository } from '@/infrastructure/database/repositories/calculation-repository';
import { z } from 'zod';

// Valideringsschema för inkommande data
const calculateSchema = z.object({
  housingType: z.string(),
  heatingType: z.string(),
  postalCode: z.string().min(5).max(6),
  monthlyCost: z.number().min(100).max(50000),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = calculateSchema.parse(body);

    // Bygg prompt för AI:n
    const prompt = `Du är en certifierad energiexpert i Europa. Användaren bor i en ${validated.housingType} med ${validated.heatingType} och betalar ${validated.monthlyCost} kr per månad i postnummer ${validated.postalCode}.

Generera en JSON-rapport med exakt denna struktur:
{
  "summary": "Kort sammanfattning av deras situation",
  "potentialSavings": <nummer - uppskattad månatlig besparing i SEK>,
  "recommendations": [
    {
      "type": "immediate_win",
      "title": "Kort titel",
      "description": "Detaljerad förklaring av gratis åtgärd de kan göra idag",
      "savings": <nummer>
    },
    {
      "type": "investment",
      "title": "Kort titel",
      "description": "Investering som betalar sig inom 2 år",
      "cost": <nummer>,
      "roi": <nummer>
    },
    {
      "type": "subsidy",
      "title": "Kort titel",
      "description": "Statligt/kommunalt bidrag de bör undersöka",
      "link": "URL till myndighet"
    }
  ]
}

Svara på svenska. Var professionell, empatisk och faktabaserad.`;

    // Anropa AI:n
    const report = await getEnergyReport(prompt);

    // Spara beräkningen i databasen
    const calculation = await calculationRepository.create({
      housingType: validated.housingType,
      heatingType: validated.heatingType,
      postalCode: validated.postalCode,
      monthlyCost: validated.monthlyCost,
      userEmail: validated.email,
      aiReport: JSON.stringify(report),
      isPremium: false,
    });

    return NextResponse.json({
      success: true,
      calculationId: calculation.id,
      report,
    });
  } catch (error) {
    console.error('Calculate error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Ogiltig input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Kunde inte generera rapport' },
      { status: 500 }
    );
  }
}