'use client';

import React from 'react';
import { Layers, Plus, Trash2, Sparkles, Wind, Disc, Compass, Flame, Zap } from 'lucide-react';

interface AdminCategoriesTabProps {
  categoriesList: any[];
  onOpenAddCategory: () => void;
  onDeleteCategory: (id: string, name: string) => void;
}

export function AdminCategoriesTab({
  categoriesList,
  onOpenAddCategory,
  onDeleteCategory,
}: AdminCategoriesTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
        <div>
          <h3 className="text-sm font-black text-slate-900">
            مدیریت دسته‌بندی‌های قطعات اسپرت و تیونینگ
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ایجاد و حذف دسته‌بندی‌های کاتالوگ فروشگاه با به‌روزرسانی آنی در منوها
          </p>
        </div>
        <button
          onClick={onOpenAddCategory}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>افزودن دسته‌بندی جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesList.map((cat: any) => (
          <div
            key={cat._id || cat.id || cat.slug}
            className="flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:border-amber-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{cat.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{cat.slug}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteCategory(cat._id || cat.id, cat.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="حذف دسته‌بندی"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {cat.description && (
                <p className="text-[11px] text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">وضعیت در منو:</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                فعال در مگامنو
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
