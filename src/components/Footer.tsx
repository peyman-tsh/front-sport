'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-gradient-to-b from-white via-sky-50/30 to-slate-100 text-slate-600 text-right">
      
      {/* Trust Badges Bar */}
      <div className="border-b border-sky-100 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-amber-700 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">ضمانت اصالت و سلامت</h4>
              <p className="text-xs text-slate-500 mt-0.5">ضمانت قطعات و تطابق دقیق فیزیکی</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100/80 text-sky-700 shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">ارسال فوری سراسری</h4>
              <p className="text-xs text-slate-500 mt-0.5">پست پیشتاز و تیپاکس به تمام ایران</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100/80 text-sky-700 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">متریال گرید A ریسینگ</h4>
              <p className="text-xs text-slate-500 mt-0.5">استیل ۳۰۴، فیبر کربن و آلیاژ مس</p>
            </div>
          </div>

          {/* Interactive Consultation Trust Card */}
          <Link
            href="/consultation"
            className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-amber-100 shadow-sm hover:border-amber-300 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-amber-700 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">مشاوره تخصصی تیونینگ</h4>
              <p className="text-xs text-slate-500 mt-0.5">راهنمایی فنی قبل از خرید قطعات</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand Summary */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-soft-yellow">
              <Flame className="h-5 w-5 fill-slate-950" />
            </div>
            <span className="text-lg font-black text-slate-900">
              LUMIX <span className="text-amber-500">SPORT</span>
            </span>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            مرکز تخصصی لوازم اسپرت، کیت بدنه، اگزوز، مکش و روشنایی خودرو با هدف ارتقاء کارایی و زیبایی خودروهای داخلی و خارجی.
            ما معتبرترین قطعات تیونینگ را با بهترین قیمت و ضمانت کتبی به سراسر کشور عرضه می‌کنیم.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <span>پشتیبانی و ثبت سفارش: ۲۴ ساعته آنلاین</span>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="md:col-span-3">
          <h5 className="text-sm font-bold text-slate-900 mb-3">دسته‌بندی‌های اصلی</h5>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/products?category=سیستم اگزوز و مکش" className="hover:text-amber-600 transition-colors">کیت مکش هوای خنک و اگزوز اسپرت</Link></li>
            <li><Link href="/products?category=سیستم تعلیق و فنربندی" className="hover:text-amber-600 transition-colors">کمک فنر اسپرت KDS و استرس‌بار</Link></li>
            <li><Link href="/products?category=کیت بدنه و آیرودینامیک" className="hover:text-amber-600 transition-colors">لیپ سپر سامورایی و بال عقب کربن</Link></li>
            <li><Link href="/products?category=تزئینات و کابین اسپرت" className="hover:text-amber-600 transition-colors">غربیلک فرمان اسپرت و دکوراتیو</Link></li>
            <li><Link href="/products?category=روشنایی و هدلایت" className="hover:text-amber-600 transition-colors">هدلایت‌های پرقدرت توربو کانپکس</Link></li>
          </ul>
        </div>

        {/* Dedicated Consultation & Direct Phone Block */}
        <div className="md:col-span-5">
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-sky-50/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black">
                  <Headphones className="h-4 w-4" />
                </div>
                <h5 className="text-sm font-black text-slate-950">
                  مشاوره تخصصی تیونینگ خودرو
                </h5>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                پاسخگویی سریع
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
              نیاز به راهنمایی در انتخاب کیت مکش، منبع اگزوز متناسب با حجم موتور، تنظیم ارتفاع یا هدلایت دارید؟ همین حالا با کارشناس ارشد ما صحبت کنید:
            </p>

            {/* Direct Phone Number Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-soft-yellow shrink-0">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">شماره تماس مستقیم کارشناس</span>
                  <a
                    href="tel:09304702517"
                    className="font-mono text-xl font-black text-slate-950 hover:text-amber-600 transition-colors dir-ltr block"
                  >
                    09304702517
                  </a>
                </div>
              </div>

              <a
                href="tel:09304702517"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-300 transition-all shadow-sm"
              >
                <span>تماس فوری</span>
              </a>
            </div>

            {/* Link to Full Consultation Page */}
            <Link
              href="/consultation"
              className="flex items-center justify-between rounded-xl bg-white/90 border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-800 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-all group"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>ورود به صفحه کامل مشاوره و ثبت فرم آنلاین</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:-translate-x-0.5 transition-all" />
            </Link>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>ساعات پاسخگویی: ۹ الی ۲۱</span>
              <a
                href="https://wa.me/989304702517"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
              >
                <MessageCircle className="h-3 w-3" />
                <span>پشتیبانی واتساپ</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-100 py-6 text-center text-xs text-slate-500 font-medium">
        <p>تمامی حقوق مادی و معنوی برای فروشگاه آنلاین لومیکس اسپرت محفوظ است.</p>
      </div>
    </footer>
  );
}
