'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, Boxes } from 'lucide-react';
import { formatToman } from '../../lib/api';

interface AdminProductsTabProps {
  products: any[];
  onOpenAddProduct: () => void;
  onDeleteProduct: (productId: string) => void;
  onOpenEditStock: (product: any) => void;
}

export function AdminProductsTab({
  products,
  onOpenAddProduct,
  onDeleteProduct,
  onOpenEditStock,
}: AdminProductsTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
        <div>
          <h3 className="text-sm font-black text-slate-900">کاتالوگ و محصولات فروشگاه</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            مجموعاً {products.length} کالا در انبار فعال ثبت شده است.
          </p>
        </div>
        <button
          onClick={onOpenAddProduct}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sky-50/70 border-b border-sky-100 text-slate-700 font-black">
              <tr>
                <th className="py-3 px-4">محصول</th>
                <th className="py-3 px-4">دسته‌بندی</th>
                <th className="py-3 px-4 text-center">قیمت فروش</th>
                <th className="py-3 px-4 text-center">موجودی انبار</th>
                <th className="py-3 px-4 text-center">گارانتی</th>
                <th className="py-3 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {products.map((item: any) => (
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
                        <div className="text-[10px] text-slate-400 font-mono">برند: {item.brand}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-600">
                    {item.category}
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                    {formatToman(item.price)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenEditStock(item)}
                      className="font-mono text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md hover:bg-amber-100"
                    >
                      {item.stock} عدد
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center font-medium text-slate-600">
                    {item.warrantyMonths ? `${item.warrantyMonths} ماه` : 'اصالت فیزیکی'}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        target="_blank"
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="مشاهده"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(item.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="حذف قطعه"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
