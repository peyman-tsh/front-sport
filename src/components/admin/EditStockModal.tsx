'use client';

import React from 'react';
import { X, CheckCircle2, Boxes } from 'lucide-react';

interface EditStockModalProps {
  product: any;
  newStockInput: number;
  onStockInputChange: (value: number) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function EditStockModal({
  product,
  newStockInput,
  onStockInputChange,
  onClose,
  onSubmit,
}: EditStockModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-sky-100 text-right animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-black text-slate-900">تنظیم موجودی انبار</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1">{product.title}</div>
            <div className="text-[11px] text-slate-500 font-mono">شناسه: {product.slug}</div>
          </div>

          <div className="rounded-2xl bg-amber-50/70 p-3.5 border border-amber-200/80">
            <span className="text-xs text-amber-900 font-medium block">
              موجودی فعلی در انبار: <strong className="font-mono text-sm">{product.stock}</strong> عدد
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              تعداد موجودی جدید:
            </label>
            <input
              type="number"
              min="0"
              required
              value={newStockInput}
              onChange={(e) => onStockInputChange(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-center font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-amber-400 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
            >
              ذخیره تغییرات انبار
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
