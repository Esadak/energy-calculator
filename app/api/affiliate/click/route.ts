import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/client';
import { z } from 'zod';

const clickSchema = z.object({
  affiliateId: z.string(),
  calculationId: z.string().uuid().optional(),
  category: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = clickSchema.parse(body);

    // Hämta IP-adress
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Spara klicket i databasen
    await prisma.affiliateClick.create({
      data: {
        category: validated.category,
        calculationId: validated.calculationId,
        ipAddress: ip,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Affiliate click error:', error);
    return NextResponse.json(
      { success: false, error: 'Kunde inte logga klick' },
      { status: 400 }
    );
  }
}