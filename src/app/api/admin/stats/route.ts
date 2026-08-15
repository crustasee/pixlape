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

    const isConnected = await checkDbConnection();
    let totalProducts = 28;
    let totalDownloads = 254000;
    let totalRevenue = 49.0;
    let activeUsers = 1240;

    if (isConnected) {
      try {
        const prodCount = await prisma.product.count();
        if (prodCount > 0) {
          totalProducts = prodCount;
        }

        const sumDownloads = await prisma.product.aggregate({
          _sum: { downloads: true }
        });
        if (sumDownloads._sum.downloads !== null) {
          totalDownloads = sumDownloads._sum.downloads;
        }

        // Revenue from orders
        const sumOrders = await prisma.order.aggregate({
          where: { status: 'COMPLETED' },
          _sum: { totalAmount: true }
        });
        if (sumOrders._sum.totalAmount !== null) {
          totalRevenue = sumOrders._sum.totalAmount;
        }

        const userCount = await prisma.user.count();
        if (userCount > 0) {
          activeUsers = userCount;
        }
      } catch (err) {
        console.error("Prisma error in stats query:", err);
      }
    }

    const stats = {
      totalProducts,
      totalDownloads,
      totalRevenue,
      activeUsers,
      monthlyTrend: [
        { month: 'Jan', revenue: 400 },
        { month: 'Feb', revenue: 650 },
        { month: 'Mar', revenue: 900 },
        { month: 'Apr', revenue: 1100 },
        { month: 'May', revenue: totalRevenue || 1800 },
      ],
    };

    const res = NextResponse.json({ success: true, data: stats });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}
