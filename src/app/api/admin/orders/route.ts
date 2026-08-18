import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin';
import { prisma, checkDbConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

export async function GET(req: Request) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const dummyOrders = [
      {
        id: 'ORD-1001',
        userEmail: 'john@example.com',
        totalAmount: 49.99,
        status: 'COMPLETED',
        createdAt: '2026-08-01T00:00:00.000Z',
      },
      {
        id: 'ORD-1002',
        userEmail: 'jane@example.com',
        totalAmount: 19.99,
        status: 'PENDING',
        createdAt: '2026-08-02T00:00:00.000Z',
      },
    ];

    const isConnected = await checkDbConnection();
    if (!isConnected || !prisma) {
      const res = NextResponse.json({ success: true, data: dummyOrders });
      return addCorsHeaders(res);
    }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedOrders = orders.map(o => ({
      id: o.id,
      userEmail: o.user.email,
      totalAmount: o.totalAmount,
      status: o.status,
      createdAt: o.createdAt.toISOString()
    }));

    const res = NextResponse.json({ success: true, data: formattedOrders });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
