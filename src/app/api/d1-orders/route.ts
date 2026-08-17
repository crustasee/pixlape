import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

export type OrderRow = {
  Id: string;
  CustomerName: string;
  OrderDate: number;
};

export async function GET() {
  try {
    const cf = (await getCloudflareContext()) as { env: { MY_DB: D1Database } };
    const env = cf?.env;

    if (!env?.MY_DB) {
      return NextResponse.json(
        {
          error: 'D1 binding MY_DB is not configured or available.',
          message: 'Ensure wrangler.jsonc contains d1_databases binding with MY_DB.',
        },
        { status: 500 }
      );
    }

    const db: D1Database = env.MY_DB;
    const result = await db.prepare(
      "SELECT Id, CustomerName, OrderDate FROM [Order] ORDER BY ShippedDate DESC LIMIT 100"
    ).all<OrderRow>();

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'D1 Query Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
