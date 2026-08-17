export type OrderRow = {
  Id: string;
  CustomerName: string;
  OrderDate: number;
};

export interface Env {
  MY_DB: D1Database;
}

const workerHandler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const result = await env.MY_DB.prepare(
      "SELECT Id, CustomerName, OrderDate FROM [Order] ORDER BY ShippedDate DESC LIMIT 100",
    ).all<OrderRow>();
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default workerHandler;
