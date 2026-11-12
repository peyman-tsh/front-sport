'use client';

import React from 'react';
import Link from 'next/link';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Minus,
  Edit3,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

interface AdminInventoryTabProps {
  inventoryData: any;
  invSearch: string;
  invFilter: 'all' | 'low' | 'out';
  onSearchChange: (val: string) => void;
  onFilterChange: (val: 'all' | 'low' | 'out') => void;
  onSearchSubmit: () => void;
  onQuickAdjust: (productId: string, delta: number) => void;
  onOpenEditStockModal: (product: any) => void;
  onOpenAddProduct: () => void;
}

export function AdminInventoryTab({
  inventoryData,
  invSearch,
  invFilter,
  onSearchChange,
  onFilterChange,
  onSearchSubmit,
  onQuickAdjust,
  onOpenEditStockModal,
  onOpenAddProduct,
}: AdminInventoryTabProps) {
  const items = inventoryData?.items || [];
  const totalUnits = inventoryData?.totalUnits || 0;
  const lowStockCount = inventoryData?.lowStockCount || 0;

  return (
    <div className="space-y-5">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="جستجو در انبار (نام کالا یا دسته‌بندی)..."
              value={invSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
              className="w-full rounded-xl border border-slate-200 pl-3 pr-9 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          <button
            onClick={onSearchSubmit}
            className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 shrink-0"
          >
            جستجو
          </button>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              invFilter === 'all'
                ? 'bg-amber-400 text-slate-950 font-black shadow-soft-yellow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            همه موجودی ({totalUnits} عدد)
          </button>
          <button
            onClick={() => onFilterChange('low')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              invFilter === 'low'
                ? 'bg-amber-500 text-slate-950 font-black shadow-soft-yellow'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            کمتر از ۱۰ عدد ({lowStockCount})
          </button>
          <button
            onClick={() => onFilterChange('out')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              invFilter === 'out'
                ? 'bg-rose-500 text-white font-black'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            اتمام موجودی
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sky-50/70 border-b border-sky-100 text-slate-700 font-black">
              <tr>
                <th className="py-3 px-4">نام قطعه اسپرت</th>
                <th className="py-3 px-4">دسته‌بندی</th>
                <th className="py-3 px-4 text-center">وضعیت انبار</th>
                <th className="py-3 px-4 text-center">تعداد موجودی</th>
                <th className="py-3 px-4 text-center">تغییر سریع</th>
                <th className="py-3 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {items.map((item: any) => {
                const stock = item.stock;
                const isLow = stock > 0 && stock <= 10;
                const isOut = stock === 0;

                return (
                  <tr key={item.id || item.slug} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {item.images?.[0] ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Boxes className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-600">
                      {item.category}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {isOut ? (
                        <span className="inline-block rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-800">
                          ناموجود در انبار
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900">
                          <AlertTriangle className="h-3 w-3 text-amber-600" />
                          <span>کسری انبار ({stock} عدد باقی‌مانده)</span>
                        </span>
                      ) : (
                        <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          موجود کافی
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-mono text-sm font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {stock}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => onQuickAdjust(item.id, -1)}
                          disabled={stock <= 0}
                          title="کاهش ۱ عدد"
                          className="h-6 w-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuickAdjust(item.id, 1)}
                          title="افزایش ۱ عدد"
                          className="h-6 w-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuickAdjust(item.id, 5)}
                          title="شارژ ۵ عدد"
                          className="h-6 px-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] hover:bg-amber-500 shadow-sm"
                        >
                          +۵
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenEditStockModal(item)}
                          className="flex items-center gap-1 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800 hover:bg-sky-100"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>تنظیم دستی</span>
                        </button>
                        <Link
                          href={`/products/${item.slug}`}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-slate-700"
                          title="مشاهده صفحه عمومی کالا"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
