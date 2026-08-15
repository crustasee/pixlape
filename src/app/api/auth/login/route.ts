import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, checkDbConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'dev-secret-key-pixlape';

// CORS Response Helper
function addCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export async function OPTIONS() {
  const res = NextResponse.json({ success: true });
  return addCorsHeaders(res);
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      const res = NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
      return addCorsHeaders(res);
    }

    const isConnected = await checkDbConnection();

    if (!isConnected) {
      // Fallback for mocked mode if DB not connected
      if (email === 'admin@pixlape.com' && password === 'adminpassword') {
        const token = jwt.sign({ userId: 'mock-admin-id', role: 'ADMIN' }, JWT_SECRET, { expiresIn: '1d' });
        const res = NextResponse.json({
          success: true,
          data: {
            user: { id: 'mock-admin-id', name: 'Mock Admin', email, role: 'ADMIN' },
            token,
          }
        });
        return addCorsHeaders(res);
      }
      const res = NextResponse.json({ success: false, error: 'Database not available and mock login failed' }, { status: 500 });
      return addCorsHeaders(res);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      const res = NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const res = NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
      return addCorsHeaders(res);
    }

    if (user.role !== 'ADMIN') {
      const res = NextResponse.json({ success: false, error: 'Access denied: Admin role required' }, { status: 403 });
      return addCorsHeaders(res);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const res = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
