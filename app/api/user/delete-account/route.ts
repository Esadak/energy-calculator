import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options"; // Eller "@/lib/auth" beroende på vad du valde
import { prisma } from "@/lib/prisma"; // Se till att denna sökväg stämmer med ditt projekt

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Inte autentiserad" },
        { status: 401 }
      );
    }

    // 1. Radera alla beräkningar för användaren först (för att undvika foreign key fel)
    await prisma.calculation.deleteMany({
      where: { userEmail: session.user.email },
    });

    // 2. Radera själva användarkontot
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Kunde inte radera konto" },
      { status: 500 }
    );
  }
}