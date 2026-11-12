'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  MessageCircle,
  Clock,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Sparkles,
  Wind,
  Disc,
  Compass,
  Zap,
  MapPin,
  Send,
  HelpCircle,
  ChevronRight,
  Car,
  Headphones,
  Sliders,
} from 'lucide-react';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    carModel: '',
    category: 'سیستم اگزوز و مکش',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.fullName) return;

    setIsSubmitting(true);
    // Simulate swift instant registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      carModel: '',
      category: 'سیستم اگزوز و مکش',
      description: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50 text-right text-slate-800">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-sky-100 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            صفحه اصلی
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 rotate-180" />
          <span className="font-bold text-amber-700">مشاوره تخصصی تیونینگ و ارتقای خودرو</span>
        </div>
      </div>

      {/* Hero Section with Prominent Phone CTA */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-sm mb-4">
              <Headphones className="h-4 w-4 text-amber-600 animate-pulse" />
              <span>مرکز مشاوره فنی و مهندسی لومیکس اسپرت</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
              مشاوره تخصصی تیونینگ <br className="hidden sm:inline" />
              <span className="text-amber-500">و ارتقای عملکرد خودرو</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              قبل از انتخاب و خرید کیت مکش، منبع اگزوز، کمک‌فنر اسپرت، استرس‌بار یا هدلایت، با کارشناسان ارشد فنی ما صحبت کنید تا بهترین قطعه متناسب با موتور و کاربری خودروی شما انتخاب شود.
            </p>

            {/* Direct Phone Call Card (Hero Highlight) */}
            <div className="mt-8 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-6 sm:p-8 shadow-[0_10px_35px_rgba(245,158,11,0.15)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-4 text-right">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-md shrink-0">
                    <PhoneCall className="h-8 w-8 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-wide block">
                      تماس تلفنی مستقیم و بدون واسطه
                    </span>
                    <a
                      href="tel:09304702517"
                      className="text-2xl sm:text-3xl font-black text-slate-950 tracking-wider hover:text-amber-600 transition-colors font-mono dir-ltr inline-block mt-0.5"
                    >
                      09304702517
                    </a>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-600" />
                      <span>پاسخگویی سریع: هر روز ۹:۰۰ صبح الی ۲۱:۰۰ شب</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                  <a
                    href="tel:09304702517"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-soft-yellow hover:bg-amber-300 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>برقراری تماس مستقیم</span>
                  </a>

                  <a
                    href="https://wa.me/989304702517"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>پیام در واتساپ</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Grid: Consultation Areas & Request Callback Form */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Column: 4 Technical Consultation Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                در چه زمینه‌هایی می‌توانید مشاوره بگیرید؟
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                کارشناسان لومیکس اسپرت با تسلط بر پلتفرم خودروهای داخلی و خارجی بهترین پیشنهادات فنی را به شما ارائه می‌دهند:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pillar 1 */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <Wind className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">سیستم اگزوز، هدرز و مکش</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  محاسبه قطر لوله رابط استیل ۳۰۴ متناسب با موتور (TU5, EF7, XU7, توربو)، جلوگیری از افت گشتاور دور پایین، و انتخاب منبع سایلنسردار HKS برای رسیدن به صدای بم و استاندارد بدون جریمه.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 mb-3">
                  <Disc className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">کاهش ارتفاع و سیستم تعلیق</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  تنظیم دقیق ارتفاع با فنر لول لنزو (لب به لب، ۱ انگشت، ۲ انگشت) و کمک فنر پوسته کوتاه روغنی-گازی KDS کره، بدون کوچک‌ترین کوبش یا خشک شدن سواری داخل اتاق.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">هدلایت و ارتقای نور خودرو</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  تطبیق دقیق پایه لامپ (H7, H4, H1, H11)، انتخاب توان موثر بر حسب مس لوله‌ای خنک‌کننده کانپکس (Conpex M8 Pro)، بدون خطا در ECU و با خط کات استاندارد بدون اذیت راننده مقابل.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 mb-3">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">استرس‌بار، کیت بدنه و آیرودینامیک</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  تقویت مقاومت پیچشی شاسی، حذف کامل گیجی فرمان در مانورهای سریع، و نصب اصولی لیپ سپر سامورایی، دیفیوزر و بال عقب کربن جهت پایداری آیرودینامیک در سرعت‌های بالا.
                </p>
              </div>

            </div>

            {/* Testimonials / Guarantee Ribbon */}
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/70 via-sky-50/40 to-white p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  تضمین ۱۰۰٪ سازگاری با خودرو و گارانتی مرجوعی
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  تمام قطعات پیشنهاد شده توسط کارشناسان لومیکس دارای ضمانت فیتینگ فابریک و ۲۴ ماه ضمانت تعویض کتبی می‌باشند.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Callback Request Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light sticky top-24">
              
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold">درخواست تماس کارشناس با شما</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  ثبت فرم مشاوره رایگان
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  اطلاعات خود را وارد کنید، کارشناسان فنی در سریع‌ترین زمان با شما تماس می‌گیرند:
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md mb-3">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-base font-black text-emerald-950">
                    درخواست مشاوره با موفقیت ثبت شد!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-2 leading-relaxed font-medium">
                    کارشناس ارشد تیونینگ به زودی با شماره <span className="font-mono font-bold">{formData.phone}</span> جهت راهنمایی دقیق خودروی شما تماس خواهد گرفت.
                  </p>
                  <p className="text-xs text-slate-500 mt-4">
                    یا در صورت تمایل می‌توانید همین حالا با شماره مستقیم زیر تماس حاصل فرمایید:
                  </p>
                  <a
                    href="tel:09304702517"
                    className="inline-block mt-2 font-mono font-black text-lg text-amber-700 bg-amber-100/80 border border-amber-300 rounded-xl px-4 py-1.5 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                  >
                    09304702517
                  </a>
                  <button
                    onClick={handleReset}
                    className="mt-5 block w-full rounded-xl bg-white border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      نام و نام خانوادگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: علی محمدی"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      شماره تماس همراه <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="مثال: 09123456789"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      مدل و تیپ خودرو
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مثال: پژو ۲۰۶ تیپ ۵ / دنا پلاس توربو / پراید"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm"
                      />
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      بخش مورد نظر برای تیونینگ
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm"
                    >
                      <option value="سیستم اگزوز و مکش">سیستم اگزوز، منبع و کیت مکش</option>
                      <option value="سیستم تعلیق و فنربندی">کمک فنر KDS، فنر لول و ارتفاع</option>
                      <option value="روشنایی و هدلایت">هدلایت‌های توربو و روشنایی</option>
                      <option value="کیت بدنه و آیرودینامیک">کیت بدنه، بال کربن و دیفیوزر</option>
                      <option value="استرس‌بار و پایداری">استرس‌بار تقویت شاسی و تعادل</option>
                      <option value="مشاوره عمومی تیونینگ">تیونینگ و ارتقای کلی خودرو</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      توضیحات یا سوالات خاص شما (اختیاری)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="اگر صدای خاصی مد نظر دارید یا سوال فنی مشخصی دارید در اینجا بنویسید..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-300 hover:to-amber-400 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'در حال ارسال درخواست...' : 'ارسال درخواست و دریافت مشاوره فوری'}</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-medium mt-2">
                    اطلاعات شما نزد مرکز لومیکس اسپرت کاملاً محفوظ بوده و فقط جهت تماس مشاوره فنی استفاده می‌شود.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Workshop Address & Working Hours Section */}
      <section className="border-t border-sky-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">تلفن مستقیم مشاوره</h4>
                <a
                  href="tel:09304702517"
                  className="mt-1 block font-mono text-base font-black text-amber-700 dir-ltr text-right hover:text-amber-800"
                >
                  09304702517
                </a>
                <p className="text-xs text-slate-500 mt-1">تماس تلفنی، واتساپ و پیامک</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">ساعات پاسخگویی فنی</h4>
                <p className="text-xs font-bold text-slate-800 mt-1">شنبه تا پنج‌شنبه: ۹ الی ۲۱</p>
                <p className="text-xs text-slate-500 mt-1">جمعه‌ها: ۱۰ الی ۱۶ (پشتیبانی آنلاین)</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">مرکز تخصصی و انبار مرکزی</h4>
                <p className="text-xs text-slate-700 mt-1 font-medium">تهران، خیابان ملت، بورس قطعات یدکی و تیونینگ</p>
                <p className="text-xs text-slate-500 mt-1">امکان ارسال فوری با پیک در تهران و تیپاکس به شهرستان</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
