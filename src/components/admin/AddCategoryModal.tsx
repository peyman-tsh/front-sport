'use client';

import React from 'react';
import { X, Layers } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  categoryForm: {
    name: string;
    slug: string;
    icon: string;
    description: string;
    accentColor: string;
  };
  onFormChange: (form: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddCategoryModal({
  isOpen,
  categoryForm,
  onFormChange,
  onClose,
  onSubmit,
}: AddCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-sky-100 text-right animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-black text-slate-900">افزودن دسته‌بندی جدید قطعات اسپرت</h3>
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
            <label className="block text-xs font-bold text-slate-800 mb-1">
              عنوان دسته‌بندی:
            </label>
            <input
              type="text"
              required
              placeholder="مثال: رینگ و لاستیک اسپرت"
              value={categoryForm.name}
              onChange={(e) =>
                onFormChange({
                  ...categoryForm,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              اسلاگ انگلیسی یکتا (URL Slug):
            </label>
            <input
              type="text"
              required
              placeholder="sport-wheels"
              value={categoryForm.slug}
              onChange={(e) => onFormChange({ ...categoryForm, slug: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 focus:border-amber-400 outline-none text-left"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              توضیحات کوتاه:
            </label>
            <textarea
              rows={2}
              placeholder="انواع رینگ‌های آلیاژی سبک‌وزن OZ، BBS و لاستیک‌های نیمه‌اسلیک"
              value={categoryForm.description}
              onChange={(e) => onFormChange({ ...categoryForm, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-amber-400 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
            >
              ایجاد دسته‌بندی جدید
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
