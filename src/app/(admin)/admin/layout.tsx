import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-soft-linen text-evergreen font-body relative admin-grid-bg">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        {children}
      </div>
    </div>
  );
}
