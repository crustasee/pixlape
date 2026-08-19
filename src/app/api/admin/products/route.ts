import { NextResponse } from 'next/server';
import { AssetService } from '@/lib/asset-service';
import { verifyAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

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

export async function GET(req: Request) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const products = await AssetService.getAllAsync();
    const res = NextResponse.json({ success: true, data: products });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export async function POST(req: Request) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const body = (await req.json()) as Record<string, any>;
    const { name, desc, price, category, size, os, tag, icon, license, version, isPremium, downloadUrl, downloadLink } = body;

    if (!name || !desc) {
      const res = NextResponse.json({ success: false, error: 'Name and description are required' }, { status: 400 });
      return addCorsHeaders(res);
    }

    const created = await AssetService.createAssetAsync({
      name,
      desc,
      price: price ?? (isPremium ? 29 : 0),
      category,
      size,
      os,
      tag,
      icon,
      license,
      version,
      isPremium: Boolean(isPremium),
      downloadUrl: downloadUrl || downloadLink || '',
    });

    const res = NextResponse.json({ success: true, data: created }, { status: 201 });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

