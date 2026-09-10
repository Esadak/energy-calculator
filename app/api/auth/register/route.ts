import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email och lösenord krävs' },
        { status: 400 }
      );
    }

    // Kolla om användaren redan finns
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'En användare med denna email finns redan' },
        { status: 400 }
      );
    }

    // Hasha lösenordet (ALDRI spara i klartext!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa användaren
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'Användare skapad!', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Något gick fel vid registrering' },
      { status: 500 }
    );
  }
}