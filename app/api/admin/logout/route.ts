import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Ta bort session-cookien
  response.cookies.delete('admin_session');
  
  return response;
}