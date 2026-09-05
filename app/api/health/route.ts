import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/client';

export async function GET() {
  try {
    // Testa databasanslutning med en enkel fråga
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return NextResponse.json(
      {
        status: 'disconnected',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}