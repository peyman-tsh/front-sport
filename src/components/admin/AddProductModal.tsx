'use client';

import React from 'react';
import { X, Plus, Boxes } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  productForm: any;
  categoriesList: any[];
  onFormChange: (form: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddProductModal({
  isOpen,
  productForm,
  categoriesList,
  onFormChange,
  onClose,
  onSubmit,
}: AddProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-3xl bg-white p-6 shadow-2xl border border-sky-100 text-right animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-black text-slate-900">
              ثبت قطعه اسپرت و مشخصات فنی جدید در انبار
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">نام کامل محصول:</label>
              <input
                type="text"
                required
                placeholder="مثال: منبع اگزوز استیل سایلنسردار HKS"
                value={productForm.title}
                onChange={(e) =>
                  onFormChange({
                    ...productForm,
                    title: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-آ-ی]/g, ''),
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">شناسه یکتا (Slug):</label>
              <input
                type="text"
                required
                placeholder="hks-exhaust-sport"
                value={productForm.slug}
                onChange={(e) => onFormChange({ ...productForm, slug: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono font-medium text-slate-900 focus:border-amber-400 outline-none text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">برند سازنده:</label>
              <input
                type="text"
                required
                value={productForm.brand}
                onChange={(e) => onFormChange({ ...productForm, brand: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">دسته‌بندی:</label>
              <select
                value={productForm.category}
                onChange={(e) => onFormChange({ ...productForm, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none bg-white"
              >
                {categoriesList && categoriesList.length > 0 ? (
                  categoriesList.map((cat: any) => (
                    <option key={cat.slug || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="سیستم اگزوز و مکش">سیستم اگزوز و مکش</option>
                    <option value="سیستم تعلیق و فنربندی">سیستم تعلیق و فنربندی</option>
                    <option value="کیت بدنه و آیرودینامیک">کیت بدنه و آیرودینامیک</option>
                    <option value="تزئینات و کابین اسپرت">تزئینات و کابین اسپرت</option>
                    <option value="روشنایی و هدلایت">روشنایی و هدلایت</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">موجودی اولیه انبار:</label>
              <input
                type="number"
                min="0"
                required
                value={productForm.stock}
                onChange={(e) => onFormChange({ ...productForm, stock: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-amber-400 outline-none text-center font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">قیمت فروش (تومان):</label>
              <input
                type="number"
                min="1000"
                required
                value={productForm.price}
                onChange={(e) => onFormChange({ ...productForm, price: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-amber-400 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">قیمت اولیه/قبل تخفیف (تومان):</label>
              <input
                type="number"
                min="0"
                value={productForm.originalPrice}
                onChange={(e) =>
                  onFormChange({ ...productForm, originalPrice: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-amber-400 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">متریال / جنس بدنه:</label>
              <input
                type="text"
                placeholder="استیل ۳۰۴ ضدزنگ"
                value={productForm.material}
                onChange={(e) => onFormChange({ ...productForm, material: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">گارانتی (ماه):</label>
              <input
                type="number"
                min="0"
                value={productForm.warrantyMonths}
                onChange={(e) =>
                  onFormChange({ ...productForm, warrantyMonths: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">توضیحات کوتاه:</label>
            <textarea
              rows={2}
              required
              value={productForm.shortDescription}
              onChange={(e) => onFormChange({ ...productForm, shortDescription: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">لینک تصویر محصول:</label>
            <input
              type="url"
              required
              value={productForm.images[0] || ''}
              onChange={(e) => onFormChange({ ...productForm, images: [e.target.value] })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-amber-400 outline-none text-left"
            />
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-amber-400 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
            >
              ثبت قطعه در انبار و فروشگاه
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
