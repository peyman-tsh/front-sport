'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from './CartContext';
import { formatToman } from '../lib/api';

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2000000;
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const neededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">سبد خرید شما ({totalItems} کالا)</h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-xl p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Tracker (Soft Light Blue & Yellow Progress) */}
          <div className="bg-sky-50/80 px-5 py-3 border-b border-sky-100 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-sky-800 font-bold">
                <ShieldCheck className="h-4 w-4 text-sky-600" />
                <span>تبریک! ارسال این سفارش کاملاً رایگان است.</span>
              </div>
            ) : (
              <div>
                <p className="text-slate-700 font-medium">
                  فقط <span className="font-bold text-amber-600">{formatToman(neededForFreeShipping)}</span> دیگر تا ارسال رایگان!
                </p>
                <div className="mt-2 h-2 w-full bg-sky-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8FAFC]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="h-16 w-16 text-slate-300 mb-3" />
                <p className="text-sm font-bold text-slate-700">سبد خرید شما در حال حاضر خالی است.</p>
                <p className="text-xs text-slate-500 mt-1">از کاتالوگ هدلایت‌ها دیدن کرده و محصول مناسب خودروی خود را انتخاب کنید.</p>
                <button
                  onClick={closeCart}
                  className="mt-5 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow"
                >
                  مشاهده هدلایت‌ها
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const id = item.product.id || item.product._id || item.product.slug;
                const img = item.product.images?.[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80';
                return (
                  <div
                    key={id}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
                  >
                    <img
                      src={img}
                      alt={item.product.title}
                      className="h-20 w-20 rounded-xl object-cover bg-slate-100 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between text-right">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                            پایه {item.product.socketType}
                          </span>
                          <button
                            onClick={() => removeFromCart(id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                          {item.product.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-amber-600">
                          {formatToman(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 border border-sky-200 bg-sky-50/70 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(id, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-black text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(id, item.quantity + 1)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Bar */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white shadow-lg">
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-slate-600 font-semibold">مبلغ کل قابل پرداخت:</span>
                <span className="text-xl font-black text-amber-600">{formatToman(totalPrice)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 text-sm font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all"
              >
                <span>تکمیل سفارش و پرداخت آنلاین</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
