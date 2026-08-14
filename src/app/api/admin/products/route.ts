import { NextResponse } from 'next/server';
import { ASSETS_DATA } from '@/data/assets';
import { prisma, checkDbConnection } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin';

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
    // Verify admin
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const isConnected = await checkDbConnection();
    if (!isConnected) {
      const res = NextResponse.json({ success: true, data: ASSETS_DATA });
      return addCorsHeaders(res);
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const res = NextResponse.json({ success: true, data: products });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export async function POST(req: Request) {
  try {
    // Verify admin
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      const res = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      return addCorsHeaders(res);
    }

    const body = await req.json();
    const { name, desc, size, os, tag, icon, license, version, category, isPremium, price, stock, downloadLink, status, authorName, format } = body;

    if (!name || !desc) {
      const res = NextResponse.json({ success: false, error: 'Name and description are required' }, { status: 400 });
      return addCorsHeaders(res);
    }

    // Generate unique slug
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Date.now()}`;

    const isConnected = await checkDbConnection();

    if (!isConnected) {
      // Mock mode fallback
      const newProduct = {
        id: `AST-${Date.now()}`,
        slug,
        name,
        desc,
        size: size || '0 MB',
        os: os || ['all'],
        rating: 5.0,
        downloads: 0,
        tag: tag || 'General',
        icon: icon || '📦',
        license: license || 'Freeware',
        version: version || 'v1.0.0',
        category: category || 'design_app',
        isPremium: !!isPremium,
        price: Number(price) || 0.0,
        stock: Number(stock) || 100,
        downloadLink: downloadLink || '',
        status: status || 'PUBLISHED',
        authorName: authorName || 'Unknown',
        format: format || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const res = NextResponse.json({ success: true, data: newProduct }, { status: 201 });
      return addCorsHeaders(res);
    }

    const product = await prisma.product.create({
      data: {
        slug,
        name,
        desc,
        size: size || '0 MB',
        os: os || ['all'],
        rating: 5.0,
        downloads: 0,
        tag: tag || 'General',
        icon: icon || '📦',
        license: license || 'Freeware',
        version: version || 'v1.0.0',
        category: category || 'design_app',
        isPremium: !!isPremium,
        price: Number(price) || 0.0,
        stock: Number(stock) || 100,
        downloadLink: downloadLink || '',
        status: status || 'PUBLISHED',
        authorName: authorName || 'Unknown',
        format: format || ''
      }
    });

    const res = NextResponse.json({ success: true, data: product }, { status: 201 });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Database error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
