import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // Hämta lösenordet från server-miljövariabeln
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin-lösenord ej konfigurerat' },
        { status: 500 }
      );
    }

    // Jämför lösenord
    if (password === correctPassword) {
      // Skapa en session-token
      const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

      const response = NextResponse.json({
        success: true,
        token: sessionToken,
      });

      // Sätt en httpOnly cookie
      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 timmar
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Fel lösenord' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfel' },
      { status: 500 }
    );
  }
}