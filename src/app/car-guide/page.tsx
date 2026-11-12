import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CAR_SPECS_DATA } from '../../lib/api';
import { Car, ShieldCheck, Zap } from 'lucide-react';

/**
 * Next.js Rendering Strategy:
 * Pure SSG (Static Site Generation)
 * Automotive bulb fitment data is pre-rendered at build time with 24-hour ISR cache.
 */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'جدول کامل پایه لامپ هدلایت تمام خودروهای ایران‌خودرو، سایپا و وارداتی',
  description:
    'راهنمای جامع پایه‌های نور بالا، نور پایین و مه‌شکن خودروهای پژو ۲۰۶، ۲۰۷، پارس، دنا پلاس، تارا، شاهین، کوییک، پراید و ال۹۰ برای خرید دقیق هدلایت بدون اشتباه.',
  alternates: {
    canonical: 'https://lumix-sport.ir/car-guide',
  },
};

export default function CarGuidePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 text-right text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-sky-800 mb-3 shadow-sm">
            <Car className="h-3.5 w-3.5 text-sky-600" />
            <span>بانک اطلاعاتی پایه لامپ خودروها (SSG Pre-rendered)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            جدول مرجع پایه‌های هدلایت خودرو
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            قبل از خرید هدلایت، پایه کاسه چراغ خودروی خود را در این جدول چک کنید تا خریدی دقیق و بدون مرجوعی داشته باشید.
          </p>
        </div>

        {/* Master Table (Pure White & Light Blue) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-card-light mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="border-b border-sky-100 bg-sky-50/70 text-slate-700 font-bold">
                <tr>
                  <th className="py-4 px-6">کمپانی</th>
                  <th className="py-4 px-6">مدل خودرو</th>
                  <th className="py-4 px-6 text-amber-700">نور پایین (Low Beam)</th>
                  <th className="py-4 px-6 text-sky-700">نور بالا (High Beam)</th>
                  <th className="py-4 px-6 text-slate-700">مه‌شکن (Fog Light)</th>
                  <th className="py-4 px-6">نکات فنی و خرید مستقیم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {CAR_SPECS_DATA.map((car, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{car.carMake}</td>
                    <td className="py-4 px-6 font-black text-amber-700">{car.carModel}</td>
                    <td className="py-4 px-6">
                      <Link
                        href={`/products?socketType=${car.lowBeam}`}
                        className="inline-block rounded-xl bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-black text-amber-900 hover:bg-amber-400 hover:text-slate-950 transition-colors shadow-sm"
                      >
                        {car.lowBeam}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        href={`/products?socketType=${car.highBeam}`}
                        className="inline-block rounded-xl bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-black text-sky-900 hover:bg-sky-500 hover:text-white transition-colors shadow-sm"
                      >
                        {car.highBeam}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      {car.fogLight ? (
                        <Link
                          href={`/products?socketType=${car.fogLight}`}
                          className="inline-block rounded-xl bg-slate-100 border border-slate-300 px-3 py-1 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors shadow-sm"
                        >
                          {car.fogLight}
                        </Link>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-medium max-w-xs">
                      {car.notes || 'نصب فابریک بدون تغییر سوکت'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Guide Articles (White & Soft Light Blue) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-card-light">
            <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 mb-3">
              <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
              <h3>چگونه هدلایت را روی خودرو بدون دستکاری سیم‌کشی نصب کنیم؟</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              کلیه هدلایت‌های استاندارد لومیکس دارای سوکت فابریک مطابق پایه لامپ ماشین (Plug & Play) هستند. کافیست لامپ هالوژنی قبلی را با چرخاندن ضامن خارج کرده، پایه هدلایت را جا زده و سوکت را متصل کنید. دقت کنید تیغه‌های چیپ هدلایت در حالت عمودی (ساعت ۹ و ۳) قرار گیرند تا خط افق نور پایین دقیقاً تشکیل شود.
            </p>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-card-light">
            <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 mb-3">
              <ShieldCheck className="h-5 w-5 text-sky-600" />
              <h3>چرا خودروهای پژو، تارا و شاهین به سیستم کن‌باس (Canbus) احتیاج دارند؟</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              سیستم برق خودروهای جدید دارای یونیت مدیریت هوشمند (BSI یا BCM) است که مقاومت لامپ را دائماً پایش می‌کند. از آنجا که هدلایت‌های LED برق کمتری مصرف می‌کنند، یونیت خودرو بدون چیپ Canbus خطای سوختگی لامپ صادر می‌کند یا در دورهای بالا جریان را قطع می‌نماید. هدلایت‌های Canbus ما این مقاومت را شبیه‌سازی کرده و صددرصد بدون ارور کار می‌کنند.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
