import { NextResponse } from 'next/server';
import { AssetService } from '@/lib/asset-service';
import { verifyAdmin } from '@/lib/admin';

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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const product = await AssetService.getByIdAsync(id);
    if (!product) {
      const res = NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      return addCorsHeaders(res);
    }

    const res = NextResponse.json({ success: true, data: product });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const body = (await req.json()) as Record<string, any>;
    const updated = await AssetService.updateAssetAsync(id, body);

    if (!updated) {
      const res = NextResponse.json({ success: false, error: 'Product update failed or not found' }, { status: 404 });
      return addCorsHeaders(res);
    }

    const res = NextResponse.json({ success: true, data: updated });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const deleted = await AssetService.deleteAssetAsync(id);
    const res = NextResponse.json({
      success: true,
      message: deleted ? `Product ${id} deleted successfully` : `Product ${id} could not be deleted`,
    });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
