import { NextResponse } from 'next/server';
import { ASSETS_DATA } from '@/data/assets';
import { prisma, checkDbConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

function addCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function OPTIONS() {
  const res = NextResponse.json({ success: true });
  return addCorsHeaders(res);
}

export async function GET() {
  try {
    const isConnected = await checkDbConnection();
    if (!isConnected || !prisma) {
      const res = NextResponse.json({ success: true, data: ASSETS_DATA });
      return addCorsHeaders(res);
    }

    const products = await prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' }
    });
    const res = NextResponse.json({ success: true, data: products });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
