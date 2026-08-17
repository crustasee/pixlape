/// <reference types="@cloudflare/workers-types" />

export type OrderRow = {
  Id: string;
  CustomerName: string;
  OrderDate: number;
};

declare global {
  interface CloudflareEnv {
    MY_DB: D1Database;
  }

  namespace NodeJS {
    interface ProcessEnv {
      MY_DB?: D1Database;
    }
  }
}
