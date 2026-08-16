'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">Shopping Cart</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center space-y-4">
        <div className="text-5xl">🛒</div>
        <h2 className="text-xl font-semibold text-white">Your cart is currently empty</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Explore our collection of premium mods, web assets, and developer utilities.
        </p>

        <div className="pt-4">
          <Link href="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
