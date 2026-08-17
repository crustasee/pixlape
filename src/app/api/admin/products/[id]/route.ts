import { NextResponse } from 'next/server';
import { ASSETS_DATA } from '@/data/assets';
import { AssetItem } from '@/types';
import { prisma, checkDbConnection } from '@/lib/db';
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const isConnected = await checkDbConnection();
    if (!isConnected) {
      const product = ASSETS_DATA.find((a: AssetItem) => String(a.id) === params.id);
      if (!product) {
        const res = NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        return addCorsHeaders(res);
      }
      const res = NextResponse.json({ success: true, data: product });
      return addCorsHeaders(res);
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

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
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const body = (await req.json()) as Record<string, unknown>;

    const isConnected = await checkDbConnection();
    if (!isConnected) {
      // Mock mode fallback
      const updatedProduct = { id: params.id, ...body };
      const res = NextResponse.json({ success: true, data: updatedProduct });
      return addCorsHeaders(res);
    }

    // Clean up fields that might be strings but need to be numbers in DB
    const updateData: any = { ...body };
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.downloads !== undefined) updateData.downloads = Number(body.downloads);
    if (body.rating !== undefined) updateData.rating = Number(body.rating);

    // Slug regeneration if name changed
    if (typeof body.name === 'string') {
      const baseSlug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      updateData.slug = `${baseSlug}-${params.id}`;
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    const res = NextResponse.json({ success: true, data: product });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdmin(req);
    if (!auth.success) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const isConnected = await checkDbConnection();
    if (!isConnected) {
      const res = NextResponse.json({ success: true, message: `Product ${params.id} deleted successfully` });
      return addCorsHeaders(res);
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    const res = NextResponse.json({ success: true, message: `Product ${params.id} deleted successfully` });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
