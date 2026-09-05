import { prisma } from '@/infrastructure/database/client';
import { NextRequest, NextResponse } from 'next/server';
import { calculationRepository } from '@/infrastructure/database/repositories/calculation-repository';
import { z } from 'zod';

const saveSchema = z.object({
  email: z.string().email(),
  calculationId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = saveSchema.parse(body);

    // Uppdatera den befintliga beräkningen med email
    const updated = await prisma.calculation.update({
      where: { id: validated.calculationId },
      data: { userEmail: validated.email },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Rapporten är sparad!',
      data: updated 
    });
  } catch (error) {
    console.error('Save calculation error:', error);
    return NextResponse.json(
      { success: false, error: 'Kunde inte spara rapporten' },
      { status: 400 }
    );
  }
}