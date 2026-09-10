import { NextRequest, NextResponse } from 'next/server';
import { calculationRepository } from '@/infrastructure/database/repositories/calculation-repository';

export async function GET(req: NextRequest) {
  // Kolla om användaren har en giltig session
  const sessionToken = req.cookies.get('admin_session')?.value;
  
  if (!sessionToken) {
    return NextResponse.json(
      { success: false, error: 'Inte inloggad' },
      { status: 401 }
    );
  }

  try {
    const stats = await calculationRepository.getStats();
    const recent = await calculationRepository.getRecent(10);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentCalculations: recent,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Kunde inte hämta statistik' },
      { status: 500 }
    );
  }
}