import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }

  const cookieStore = await cookies();

  const maxAge = 60 * 50;

  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
    sameSite: 'lax',
  });

  return NextResponse.json({ message: 'Token set' });
}
