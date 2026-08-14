'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { Table, Column } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      userId: 'USR-01',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      totalAmount: 29.00,
      status: 'completed',
      items: [
        { id: 1, productId: 9, productName: 'CorelDraw 2026 Graphics Suite', price: 29.00, quantity: 1 },
      ],
      createdAt: '2026-08-01',
    },
    {
      id: 'ORD-1002',
      userId: 'USR-02',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      totalAmount: 19.99,
      status: 'pending',
      items: [
        { id: 2, productId: 2, productName: 'Beatone Brush Procreate', price: 19.99, quantity: 1 },
      ],
      createdAt: '2026-08-02',
    },
    {
      id: 'ORD-1003',
      userId: 'USR-03',
      userName: 'Alex Rivera',
      userEmail: 'alex@creator.dev',
      totalAmount: 49.00,
      status: 'completed',
      items: [
        { id: 3, productId: 4, productName: 'High-Res Device Mockups', price: 49.00, quantity: 1 },
      ],
      createdAt: '2026-08-03',
    },
    {
      id: 'ORD-1004',
      userId: 'USR-04',
      userName: 'Sarah Chen',
      userEmail: 'sarah@design.io',
      totalAmount: 12.00,
      status: 'cancelled',
      items: [
        { id: 4, productId: 3, productName: 'Pixel Retro Fonts Vault', price: 12.00, quantity: 1 },
      ],
      createdAt: '2026-08-03',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateStatus = (orderId: string | number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const completedCount = orders.filter((o) => o.status === 'completed').length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const columns: Column<Order>[] = [
    {
      header: 'Order Reference',
      cell: (item) => (
        <div className="font-mono text-xs font-black text-text flex items-center space-x-2">
          <span>🛒</span>
          <span>{item.id}</span>
        </div>
      ),
    },
    {
      header: 'Customer',
      cell: (item) => (
        <div>
          <div className="font-head font-black text-text text-xs uppercase">{item.userName}</div>
          <div className="text-[11px] text-text/70 font-mono font-bold">{item.userEmail}</div>
        </div>
      ),
    },
    {
      header: 'Total Amount',
      cell: (item) => (
        <span className="font-mono font-black text-text text-xs bg-neo-yellow px-2 py-0.5 rounded border border-border-color shadow-[1px_1px_0_var(--border-color)]">
          ${item.totalAmount.toFixed(2)} USD
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => {
        const statusStyles = {
          completed: 'bg-neo-lime text-black',
          pending: 'bg-neo-yellow text-black',
          cancelled: 'bg-neo-pink text-white',
          failed: 'bg-surface text-text',
        };
        return (
          <span
            className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase rounded-md border border-border-color shadow-[1px_1px_0_var(--border-color)] ${
              statusStyles[item.status] || statusStyles.pending
            }`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      header: 'Date',
      cell: (item) => <span className="font-mono text-xs font-bold text-text/80">{String(item.createdAt)}</span>,
    },
    {
      header: 'Actions',
      cell: (item) => (
        <Button size="sm" variant="neutral" onClick={() => setSelectedOrder(item)} className="font-mono text-xs font-black uppercase">
          VIEW DETAILS
        </Button>
      ),
    },
  ];

  return (
    <>
      <AdminHeader title="Manage Orders & Transactions" breadcrumb={['Admin', 'Orders']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full text-text font-body">
        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon="💰" trend="18%" isPositive />
          <StatCard title="Total Orders" value={orders.length} icon="🛒" trend="10%" isPositive />
          <StatCard title="Completed Orders" value={completedCount} icon="✅" trend="14%" isPositive />
          <StatCard title="Pending Orders" value={pendingCount} icon="⏳" trend="2%" isPositive={false} />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface border-2 border-border-color p-4 rounded-2xl shadow-hard font-mono">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="🔍 Search order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-xs font-black text-text">Filter Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-white border-2 border-border-color rounded-xl text-xs font-black text-text focus:outline-none shadow-hard-sm"
            >
              <option value="all">All Orders</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-surface border-2 border-border-color rounded-2xl overflow-hidden shadow-hard-lg">
          <Table data={filteredOrders} columns={columns} keyExtractor={(item) => item.id} />
        </div>

        {/* Order Details Modal */}
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={selectedOrder ? `Order Details: ${selectedOrder.id}` : ''}
        >
          {selectedOrder && (
            <div className="space-y-4 text-xs font-mono text-text">
              <div className="bg-white p-4 rounded-xl border-2 border-border-color shadow-hard-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-text/70">Customer Name:</span>
                  <strong className="text-text font-head font-black uppercase">{selectedOrder.userName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Email Address:</span>
                  <span className="font-bold text-text">{selectedOrder.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Order Date:</span>
                  <span className="font-bold text-text">{String(selectedOrder.createdAt)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-text text-xs uppercase tracking-wider font-head">Purchased Items</h4>
                <div className="bg-white p-3 rounded-xl border-2 border-border-color shadow-hard-sm space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <div className="font-black text-text uppercase font-head">{item.productName}</div>
                        <div className="text-[10px] text-text/70">Qty: {item.quantity}</div>
                      </div>
                      <span className="font-bold text-neo-pink bg-neo-yellow px-2 py-0.5 rounded border border-border-color">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center bg-neo-yellow p-3 rounded-xl border-2 border-border-color shadow-hard-sm text-black">
                <span className="font-black font-head uppercase">Total Paid:</span>
                <span className="font-black text-base">
                  ${selectedOrder.totalAmount.toFixed(2)} USD
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-black uppercase text-text">Update Order Status</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedOrder.status === 'completed' ? 'primary' : 'neutral'}
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                    className="font-mono text-xs font-black uppercase"
                  >
                    MARK COMPLETED
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedOrder.status === 'pending' ? 'secondary' : 'neutral'}
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                    className="font-mono text-xs font-black uppercase"
                  >
                    MARK PENDING
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedOrder.status === 'cancelled' ? 'danger' : 'neutral'}
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                    className="font-mono text-xs font-black uppercase"
                  >
                    CANCEL ORDER
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </>
  );
}
