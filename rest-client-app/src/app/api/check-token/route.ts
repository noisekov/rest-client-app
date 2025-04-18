import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken');

  if (!token) {
    return NextResponse.json({ message: 'No token' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Token is valid' });
}
