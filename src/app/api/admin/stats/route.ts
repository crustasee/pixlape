import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin';
import { AssetService } from '@/lib/asset-service';

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

    const serviceStats = await AssetService.getStatsAsync();

    const stats = {
      totalProducts: serviceStats.totalAssets,
      totalDownloads: 254000,
      totalRevenue: serviceStats.premiumAssets * 29,
      activeUsers: 1240,
      monthlyTrend: [
        { month: 'Jan', revenue: 400 },
        { month: 'Feb', revenue: 650 },
        { month: 'Mar', revenue: 900 },
        { month: 'Apr', revenue: 1100 },
        { month: 'May', revenue: serviceStats.premiumAssets * 29 || 1800 },
      ],
    };

    const res = NextResponse.json({ success: true, data: stats });
    return addCorsHeaders(res);
  } catch (err: any) {
    const res = NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

