'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AssetItem, Product } from '@/types';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { IconRenderer } from '@/components/ui/IconRenderer';

export interface ProductTableProps {
  products: (Product | AssetItem)[];
  onDelete?: (id: string | number) => void;
  onTogglePremium?: (id: string | number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDelete,
  onTogglePremium,
}) => {
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteConfirmId && onDelete) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const confirmProduct = products.find((p) => p.id === deleteConfirmId);

  const columns: Column<any>[] = [
    {
      header: 'ASSET PRODUCT',
      cell: (item) => (
        <div className="flex items-center space-x-4 select-none font-mono">
          <div className="w-12 h-12 rounded-lg bg-white border-1 border-border-color flex items-center justify-center shrink-0 shadow-hard-sm hover:scale-105 transition-transform duration-200 p-2 overflow-hidden">
            <IconRenderer icon={item.icon} alt={item.name} className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="font-mono font-black text-darkteal hover:text-yellow-green transition-colors truncate max-w-[200px] sm:max-w-[280px] text-base uppercase tracking-tight">
              {item.name}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold mt-1 text-darkteal">
              <span className="bg-white/30 text-black px-2 py-0.5 rounded-md border-1.5 border-border-color shadow-[1px_1px_0_var(--border-color)] font-black">
                {item.version}
              </span>
              <span>•</span>
              <span className="font-bold">{item.size}</span>
              <span>•</span>
              <span className="text-text font-black">{item.license ? item.license.split(' ')[0] : 'Free'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'CATEGORY',
      cell: (item) => {
        const cat = item.category || 'tools_app';
        let colorClass = 'bg-darkteal text-black';
        if (cat === 'design_app') colorClass = 'bg-green-400 text-black';
        else if (cat === 'multimedia') colorClass = 'bg-purple-400 text-white';
        else if (cat === 'apk_package') colorClass = 'bg-green-300 text-black';
        else if (cat === 'tools_app') colorClass = 'bg-pink-300 text-black';
        else if (cat === 'art_graphics') colorClass = 'bg-red-400 text-white';

        const catName = cat.replace('_', ' ');

        return (
          <span className={`capitalize px-3 py-1.5 text-xs font-black tracking-wider rounded-xl border-2 border-border-color font-mono shadow-[2.5px_2.5px_0_var(--border-color)] ${colorClass} select-none uppercase inline-block`}>
            {catName}
          </span>
        );
      },
    },
    {
      header: 'PLATFORMS',
      cell: (item) => (
        <div className="flex flex-wrap items-center gap-1.5 font-mono">
          {Array.isArray(item.os) ? (
            item.os.map((osItem: string, idx: number) => {
              let osColor = 'bg-blue-500 text-text border-border-color';
              if (osItem === 'windows') osColor = 'bg-blue-400 text-black';
              else if (osItem === 'macos') osColor = 'bg-purple-400 text-white';
              else if (osItem === 'linux') osColor = 'bg-red-400 text-white';
              else if (osItem === 'cli') osColor = 'bg-orange-300 text-black';

              return (
                <span
                  key={idx}
                  className={`text-sm px-2.5 py-1 rounded-lg border-2 border-border-color font-mono font-black uppercase tracking-wider shadow-[1.5px_1.5px_0_var(--border-color)] ${osColor}`}
                >
                  {osItem}
                </span>
              );
            })
          ) : (
            <span className="text-sm text-darkteal font-mono font-black bg-white px-2 py-1 rounded border border-border-color">ALL Platform</span>
          )}
        </div>
      ),
    },
    {
      header: 'PRICE / TYPE',
      cell: (item) => (
        <div className="flex flex-col select-none font-mono">
          <span className="font-black text-darkteal font-mono text-base sm:text-lg tracking-tight">
            {typeof item.price === 'number'
              ? item.price === 0
                ? 'FREE'
                : `$${item.price.toFixed(2)}`
              : item.price || 'FREE'}
          </span>
          <button
            onClick={() => onTogglePremium && onTogglePremium(item.id)}
            className={`mt-1.5 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl border-2 border-border-color transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-none cursor-pointer w-fit shadow-[2px_2px_0_var(--border-color)] ${item.isPremium
              ? 'bg-neo-pink text-darkteal'
              : 'bg-neo-lime text-black'
              }`}
          >
            {item.isPremium ? 'PRO' : 'FREE'}
          </button>
        </div>
      ),
    },
    {
      header: 'ACTIONS',
      cell: (item) => (
        <div className="flex items-center space-x-2 font-mono">
          {/* Quick View Button */}
          <button
            onClick={() => setPreviewProduct(item)}
            className="w-10 h-10 rounded-xl bg-white border-2 border-border-color hover:bg-neo-yellow text-text flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer shrink-0 p-2"
            title="Quick View"
            aria-label={`Quick view ${item.name}`}
          >
            <IconRenderer icon="/icon/02eye.svg" alt="View" className="w-6 h-6 object-contain" />
          </button>

          {/* Edit Details Button */}
          <Link href={`/admin/products/${item.id}`}>
            <button
              className="w-10 h-10 rounded-xl bg-white border-2 border-border-color hover:bg-neo-cyan text-black flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer shrink-0 p-2"
              title="Edit Product Details"
              aria-label={`Edit ${item.name}`}
            >
              <IconRenderer icon="/icon/02edit.svg" alt="Edit" className="w-6 h-6 object-contain" />
            </button>
          </Link>

          {/* View Public Page Link Button */}
          <Link href={`/preview/${item.id}`} target="_blank">
            <button
              className="w-10 h-10 rounded-xl bg-white border-2 border-border-color hover:bg-neo-lime text-black flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer shrink-0 p-2"
              title="View Public Page"
              aria-label={`View public page for ${item.name}`}
            >
              <IconRenderer icon="/icon/02link.svg" alt="Link" className="w-6 h-6 object-contain" />
            </button>
          </Link>

          {/* Delete Product Button */}
          {onDelete && (
            <button
              onClick={() => setDeleteConfirmId(item.id)}
              className="w-10 h-10 rounded-xl bg-white border-2 border-border-color hover:bg-neo-pink text-black hover:text-white flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer shrink-0 p-2"
              title="Delete Product"
              aria-label={`Delete ${item.name}`}
            >
              <IconRenderer icon="/icon/02trash.svg" alt="Delete" className="w-6 h-6 object-contain" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="border-2 border-border-color rounded-2xl overflow-hidden shadow-hard-lg bg-surface">
        <Table data={products} columns={columns} keyExtractor={(item) => item.id} />
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={!!previewProduct}
        onClose={() => setPreviewProduct(null)}
        title={previewProduct ? `Asset Detail: ${previewProduct.name}` : ''}
      >
        {previewProduct && (
          <div className="space-y-6 text-sm text-text font-mono">
            <div className="flex items-start space-x-4 bg-surface p-5 rounded-2xl border-2 border-border-color shadow-hard-sm">
              <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center shrink-0 border-2 border-border-color shadow-hard-sm select-none p-2.5 overflow-hidden">
                <IconRenderer icon={previewProduct.icon} alt={previewProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h4 className="text-lg font-black text-text truncate font-mono uppercase tracking-tight">{previewProduct.name}</h4>
                <p className="text-xs text-text/80 leading-relaxed font-mono font-medium">{previewProduct.desc}</p>
                <div className="flex items-center space-x-2 pt-1 select-none font-mono">
                  <span className="px-2.5 py-1 text-xs bg-yellow-100 text-black border border-border-color rounded-lg font-black">
                    {previewProduct.version}
                  </span>
                  <span className="px-2.5 py-1 text-xs bg-neo-lime text-black border border-border-color rounded-lg font-black">
                    {previewProduct.size}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-4 rounded-xl border-2 border-border-color shadow-hard-sm">
                <span className="text-text/70 block text-xs font-black uppercase">Category</span>
                <span className="font-black text-text uppercase text-sm mt-0.5 block">{previewProduct.category?.replace('_', ' ')}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-border-color shadow-hard-sm">
                <span className="text-text/70 block text-xs font-black uppercase">License Terms</span>
                <span className="font-black text-text text-sm mt-0.5 block">{previewProduct.license || 'Free Use'}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2 select-none">
              <Link href={`/preview/${previewProduct.id}`} target="_blank">
                <Button variant="neutral" size="sm" className="font-mono text-xs font-black uppercase flex items-center gap-2 py-2.5 px-4">
                  <IconRenderer icon="/icon/button/link.svg" alt="Link" className="w-4 h-4 object-contain" />
                  <span>VIEW LIVE PAGE</span>
                </Button>
              </Link>
              <Link href={`/admin/products/${previewProduct.id}`}>
                <Button variant="primary" size="sm" className="font-mono text-xs font-black uppercase bg-neo-cyan text-black border-2 border-border-color flex items-center gap-2 py-2.5 px-4">
                  <IconRenderer icon="/icon/02edit.svg" alt="Edit" className="w-4 h-4 object-contain" />
                  <span>EDIT DETAILS</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Delete Asset"
      >
        <div className="space-y-5 font-mono text-text">
          <p className="text-sm leading-relaxed font-bold">
            Are you sure you want to delete <strong className="text-neo-pink font-black uppercase text-base">{confirmProduct?.name}</strong> from the vault catalog? This action will immediately remove the asset from the main website.
          </p>
          <div className="flex justify-end space-x-3 pt-2 select-none">
            <Button variant="neutral" size="sm" onClick={() => setDeleteConfirmId(null)} className="font-mono text-xs font-black uppercase px-4 py-2.5">
              CANCEL
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm} className="font-mono text-xs font-black uppercase flex items-center gap-2 px-4 py-2.5">
              <IconRenderer icon="/icon/button/trash.svg" alt="Delete" className="w-4 h-4 object-contain" />
              <span>YES, DELETE ASSET</span>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
