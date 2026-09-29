import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { authenticateUser, registerUser } from '@/features/auth/server';

const AUTH_SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-development-change-in-prod';

export async function GET(request, { params }) {
  const { all } = await params;
  const endpoint = all ? all.join('/') : '';

  if (endpoint === 'session') {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    try {
      const decoded = jwt.verify(token, AUTH_SECRET);
      return NextResponse.json({ authenticated: true, user: decoded });
    } catch {
      return NextResponse.json({ authenticated: false, user: null });
    }
  }

  return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
}

export async function POST(request, { params }) {
  const { all } = await params;
  const endpoint = all ? all.join('/') : '';
  const body = await request.json().catch(() => ({}));

  try {
    if (endpoint === 'login') {
      const { email, password } = body;
      const { user, token } = await authenticateUser(email, password);

      const cookieStore = await cookies();
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({ success: true, user });
    }

    if (endpoint === 'register') {
      const { name, email, password } = body;
      const { user, token } = await registerUser(name, email, password);

      const cookieStore = await cookies();
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({ success: true, user });
    }

    if (endpoint === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete('auth_token');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
