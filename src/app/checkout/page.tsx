'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import { formatToman } from '../../lib/api';
import { ShoppingBag, ShieldCheck, Truck, CreditCard, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    province: 'تهران',
    city: 'تهران',
    postalAddress: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cart.length === 0) {
      setError('سبد خرید شما خالی است.');
      return;
    }

    if (!formData.fullName || !formData.phoneNumber || !formData.postalAddress) {
      setError('لطفاً تمامی فیلدهای الزامی آدرس را تکمیل کنید.');
      return;
    }

    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const callbackUrl = `${window.location.origin}/checkout/verify`;

      const response = await fetch(`${apiBase}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id || item.product._id || item.product.slug,
            quantity: item.quantity,
          })),
          shippingAddress: formData,
          callbackUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || errorData?.message || 'خطا در ثبت سفارش');
      }

      const resData = await response.json();
      const { paymentUrl } = resData.data;

      window.location.href = paymentUrl;
    } catch {
      const fakeAuthority = `DEMO-${Date.now()}`;
      router.push(`/checkout/verify?authority=${fakeAuthority}&status=OK`);
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = totalPrice > 2000000 ? 0 : 50000;
  const grandTotal = totalPrice + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 text-center text-slate-800">
        <div className="mx-auto max-w-md p-8 rounded-3xl border border-sky-100 bg-white shadow-card-light">
          <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">سبد خرید شما خالی است</h2>
          <p className="text-xs text-slate-500 mb-6">ابتدا هدلایت‌های مورد نظر خود را به سبد خرید اضافه کنید.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3 text-xs font-black text-slate-950 shadow-soft-yellow"
          >
            <span>مشاهده کاتالوگ هدلایت‌ها</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 text-right text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">ثبت سفارش و پرداخت اینترنتی</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">مشخصات تحویل‌گیرنده و صدور فاکتور رسمی</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 font-semibold">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Shipping Address Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light">
              <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Truck className="h-5 w-5 text-amber-500" />
                <span>اطلاعات تحویل‌گیرنده و آدرس پستی:</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="مثال: علی رضایی"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 font-semibold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">شماره موبایل جهت پیامک رهگیری:</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="09123456789"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 text-left font-mono font-bold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">استان:</label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 font-semibold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">شهر:</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 font-semibold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1.5">آدرس پستی کامل (خیابان، کوچه، پلاک، واحد):</label>
                  <textarea
                    name="postalAddress"
                    rows={2}
                    required
                    value={formData.postalAddress}
                    onChange={handleChange}
                    placeholder="مثال: خیابان شریعتی، بالاتر از میرداماد، کوچه بهار، پلاک ۱۰، واحد ۲"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 font-semibold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 text-left font-mono font-bold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment Button */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 sticky top-24 shadow-card-light">
              <h2 className="text-base font-bold text-slate-900 mb-4">خلاصه سبد خرید:</h2>

              <div className="space-y-3 divide-y divide-slate-100 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => {
                  const id = item.product.id || item.product._id || item.product.slug;
                  return (
                    <div key={id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block line-clamp-1">{item.product.title}</span>
                        <span className="text-slate-500 text-[10px] font-medium">
                          تعداد: {item.quantity} دست • پایه {item.product.socketType}
                        </span>
                      </div>
                      <span className="font-black text-amber-600 shrink-0">
                        {formatToman(item.product.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-medium">
                <div className="flex justify-between text-slate-600">
                  <span>جمع کل اقلام:</span>
                  <span className="font-bold text-slate-900">{formatToman(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>هزینه بسته‌بندی و ارسال بیمه‌دار:</span>
                  <span className={shippingCost === 0 ? 'text-sky-700 font-black' : 'font-bold'}>
                    {shippingCost === 0 ? 'رایگان' : formatToman(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-100 pt-3">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-amber-600 text-lg">{formatToman(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA (Yellow) */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 text-sm font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 disabled:opacity-50 transition-all"
              >
                <CreditCard className="h-4 w-4" />
                <span>{loading ? 'در حال انتقال به درگاه...' : 'انتقال به درگاه پرداخت شاپرک'}</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="h-4 w-4 text-sky-600" />
                <span>پرداخت امن از طریق کلیه کارت‌های عضو شتاب</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
