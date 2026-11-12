'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Car, Shield, Sparkles, Zap, Flame, Gauge, Wrench } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-[#F8FAFC] pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Soft Ambient Light Glows (Yellow & Light Blue) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-sky-200/50 via-amber-100/40 to-sky-200/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Pitch (RTL) */}
          <div className="lg:col-span-7 text-right">
            
            {/* Top Pill (Soft Light Blue + Amber Sparkle) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-1.5 text-xs font-bold text-sky-800 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>فروشگاه تخصصی لوازم اسپرت، کیت بدنه، اگزوز و تیونینگ خودرو ۲۰۲۶</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.25] tracking-tight">
              خودروی خود را به یک شاهکار <br />
              <span className="bg-gradient-to-l from-amber-500 via-amber-600 to-amber-500 bg-clip-text text-transparent">
                اسپرت و پرقدرت تبدیل کنید
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              مرجع دست‌اول کیت‌های مکش هوای خنک استیل ۳۰۴، منابع اگزوز سایلنسردار HKS،
              سیستم‌های تعلیق اسپرت KDS، کیت بدنه فیبر کربن، بال عقب آیرودینامیک و قوی‌ترین سیستم‌های روشنایی خودرو.
            </p>

            {/* CTAs (Yellow & White/Soft Blue) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#car-finder"
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-black text-slate-950 shadow-soft-yellow transition-all hover:from-amber-500 hover:to-amber-600 hover:scale-[1.02]"
              >
                <Car className="h-4 w-4" />
                <span>پیدا کردن قطعات متناسب با خودروی من</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </a>

              <Link
                href="/products"
                className="flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all"
              >
                <span>مشاهده کاتالوگ لوازم اسپرت</span>
              </Link>

              <Link
                href="/products/hks-hi-power-exhaust-muffler"
                className="flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-50 px-5 py-3.5 text-sm font-black text-amber-900 shadow-sm hover:bg-amber-100 hover:scale-[1.02] transition-all"
              >
                <span className="text-base animate-pulse">🔊</span>
                <span>تست زنده صدای قطعات (داینو)</span>
              </Link>
            </div>

            {/* Feature Badges (Light Blue & Yellow) */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8 max-w-lg">
              <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3 text-right">
                <div className="flex items-center gap-1.5 text-amber-700 font-black text-lg sm:text-xl">
                  <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>+۵۰۰۰</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">قطعه اسپرت و تیونینگ</p>
              </div>

              <div className="rounded-xl bg-sky-50/80 border border-sky-200/80 p-3 text-right">
                <div className="flex items-center gap-1.5 text-sky-700 font-black text-lg sm:text-xl">
                  <Shield className="h-4 w-4 text-sky-600" />
                  <span>ضمانت اصالت</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">آلیاژ اصلی و گارانتی</p>
              </div>

              <div className="rounded-xl bg-sky-50/80 border border-sky-200/80 p-3 text-right">
                <div className="flex items-center gap-1.5 text-sky-700 font-black text-lg sm:text-xl">
                  <Gauge className="h-4 w-4 text-sky-500" />
                  <span>افزایش شتاب</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">تنفس و تعادل بهینه</p>
              </div>
            </div>

          </div>

          {/* Left Column: Visual Sport & Tuning Parts Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl border border-sky-100 bg-white p-6 shadow-card-hover">
              
              {/* Graphic Showcase Container */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                
                {/* Background Glows */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full bg-amber-400/20 blur-2xl animate-pulse" />
                  <div className="w-40 h-40 rounded-full bg-sky-400/25 blur-xl" />
                </div>

                {/* Road / Track Grid */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent flex flex-col justify-end p-4">
                  <div className="w-full h-0.5 border-b border-dashed border-amber-400/60" />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                    <span className="text-sky-300 font-bold">TUNING & PERFORMANCE</span>
                    <span className="text-amber-400 font-mono font-bold">READY FOR TRACK</span>
                  </div>
                </div>

                {/* Central Sport Icon Graphic */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border-2 border-amber-400 shadow-soft-yellow">
                    <Flame className="h-10 w-10 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="text-xs font-black text-amber-300 tracking-wide bg-slate-900/80 px-3 py-1 rounded-full border border-amber-400/30">
                    LUMIX SPORT RACING
                  </span>
                </div>
              </div>

              {/* Quick Feature Specs under Graphic */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-sky-50/70 border border-sky-100 px-4 py-2.5 text-xs">
                <span className="text-slate-500 font-medium">دسته‌بندی‌ها:</span>
                <span className="font-bold text-slate-900">مکش استیل، اگزوز، تعلیق، کیت بدنه، روشنایی</span>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-xl bg-amber-50/60 border border-amber-100 px-4 py-2.5 text-xs">
                <span className="text-slate-500 font-medium">کیفیت متریال:</span>
                <span className="font-bold text-amber-800">استیل ۳۰۴ تایوان، فیبر کربن، آلیاژ مس و آلومینیوم ۶۰۶۳</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
