import { NextResponse } from 'next/server';
import { calculationRepository } from '@/infrastructure/database/repositories/calculation-repository';

export async function GET() {
  try {
    const calculations = await calculationRepository.findAll();

    const headers = ['ID', 'Datum', 'Email', 'Boende', 'Uppvärmning', 'Postnummer', 'Månadskostnad', 'Premium'];
    const rows = calculations.map((c) => [
      c.id,
      c.createdAt.toISOString(),
      c.userEmail || '',
      c.housingType,
      c.heatingType,
      c.postalCode,
      c.monthlyCost.toString(),
      c.isPremium ? 'Ja' : 'Nej',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename=calculations.csv',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Kunde inte exportera data' },
      { status: 500 }
    );
  }
}