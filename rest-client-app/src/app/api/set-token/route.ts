import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 5,
    sameSite: 'lax',
  });

  return NextResponse.json({ message: 'Token set' });
}
