import { NextResponse } from 'next/server';
import { AssetService } from '@/lib/asset-service';

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
    const products = await AssetService.getAllAsync();
    const res = NextResponse.json({ success: true, data: products });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Error fetching products' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

