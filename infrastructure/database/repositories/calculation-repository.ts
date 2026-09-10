import { prisma } from '../client';
import type { Calculation } from '@prisma/client';

// NYTT: Lägger till userId i interfacet
export interface CreateCalculationData {
  userId?: string; // <-- NYTT
  userEmail?: string;
  housingType: string;
  heatingType: string;
  postalCode: string;
  monthlyCost: number;
  aiReport?: string;
  isPremium?: boolean;
}

export const calculationRepository = {
  async create(data: CreateCalculationData): Promise<Calculation> {
    return await prisma.calculation.create({
      data: {
        userId: data.userId, // <-- NYTT: Sparar userId om den finns
        userEmail: data.userEmail,
        housingType: data.housingType,
        heatingType: data.heatingType,
        postalCode: data.postalCode,
        monthlyCost: data.monthlyCost,
        aiReport: data.aiReport,
        isPremium: data.isPremium ?? false,
      },
    });
  },

  async findById(id: string): Promise<Calculation | null> {
    return await prisma.calculation.findUnique({
      where: { id },
    });
  },

  // NYTT: Hämta beräkningar för en specifik användare (behövs för dashboarden)
  async findByUserId(userId: string): Promise<Calculation[]> {
    return await prisma.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAll(): Promise<Calculation[]> {
    return await prisma.calculation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getStats() {
    const totalCalculations = await prisma.calculation.count();
    
    const avgCostResult = await prisma.calculation.aggregate({
      _avg: { monthlyCost: true },
    });

    const topPostalCodes = await prisma.$queryRaw<
      { postalCode: string; count: bigint }[]
    >`
      SELECT "postal_code" as "postalCode", COUNT(*) as count
      FROM calculations
      GROUP BY "postal_code"
      ORDER BY count DESC
      LIMIT 5
    `;

    return {
      totalCalculations,
      averageMonthlyCost: Number(avgCostResult._avg.monthlyCost) || 0,
      topPostalCodes: topPostalCodes.map((p) => ({
        postalCode: p.postalCode,
        count: Number(p.count),
      })),
    };
  },

  async getRecent(limit: number = 10): Promise<Calculation[]> {
    return await prisma.calculation.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },
};