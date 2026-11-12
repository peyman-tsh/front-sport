import React from 'react';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { CarFinder } from '../components/CarFinder';
import { BeamSimulator } from '../components/BeamSimulator';
import { ProductCard } from '../components/ProductCard';
import { fetchFeaturedProducts } from '../lib/api';
import { Flame, ArrowLeft, HelpCircle, Layers } from 'lucide-react';

/**
 * Next.js Rendering Strategy:
 * ISR (Incremental Static Regeneration)
 * Pre-renders the homepage at build time for ultra-fast TTFB (< 50ms)
 * and automatically revalidates in the background every 120 seconds.
 */
export const revalidate = 120;

export default async function HomePage() {
  const featuredProducts = await fetchFeaturedProducts();

  const categories = [
    { name: 'همه محصولات', slug: '' },
    { name: 'سیستم اگزوز و مکش', slug: 'سیستم اگزوز و مکش' },
    { name: 'سیستم تعلیق و فنربندی', slug: 'سیستم تعلیق و فنربندی' },
    { name: 'کیت بدنه و آیرودینامیک', slug: 'کیت بدنه و آیرودینامیک' },
    { name: 'تزئینات و کابین اسپرت', slug: 'تزئینات و کابین اسپرت' },
    { name: 'روشنایی و هدلایت', slug: 'روشنایی و هدلایت' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Car Compatibility Finder Tool (Interactive Client Island) */}
      <CarFinder />

      {/* Featured Products Grid (SSG/ISR with Server Component) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-right">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 mb-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <Flame className="h-4 w-4 fill-amber-500" />
                <span>برترین‌های لوازم اسپرت و تیونینگ ۲۰۲۶</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">پرفروش‌ترین قطعات اسپرت و تقویتی</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">دست‌اول‌ترین کیت‌های مکش استیل، اگزوز HKS، کمک اسپرت KDS و هدلایت‌های پرقدرت</p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>مشاهده تمام قطعات</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {/* Sport Categories Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-slate-500 font-bold ml-2">دسته‌بندی‌ها:</span>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.slug ? `/products?category=${encodeURIComponent(cat.slug)}` : '/products'}
                className="rounded-xl border border-sky-200 bg-sky-50/60 px-3.5 py-1.5 text-xs font-bold text-sky-800 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 transition-all shadow-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Kelvin Beam Simulator (Client Island) */}
      <BeamSimulator />

      {/* FAQ Section (Static SEO Topical Authority) */}
      <section className="py-20 bg-gradient-to-b from-sky-50/60 to-white border-t border-sky-100 text-right">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-100/70 border border-sky-200 px-3.5 py-1 rounded-full mb-2">
              <HelpCircle className="h-4 w-4 text-sky-600" />
              <span>سوالات متداول تیونینگ و لوازم اسپرت</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">راهنمای تخصصی تیونینگ و ارتقای خودرو</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">آیا نصب کیت مکش استیل K&N تاثیری در شتاب و مصرف سوخت دارد؟</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                بله، لوله استیل ۳۰۴ صاف و صیقلی مانع از آشفتگی جریان هوا شده و با تامین هوای خنک‌تر و متراکم‌تر به داخل منیفولد، راندمان احتراق را بالا می‌برد. نتیجه آن افزایش ۴ الی ۷ اسب بخار توان خروجی، رفع کپ پدال گاز و در رانندگی آرام شهری، کاهش مصرف سوخت است.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">تفاوت منبع اگزوز سایلنسردار با معمولی چیست؟ آیا جریمه پلیس دارد؟</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                منبع اگزوز سایلنسردار دارای یک قطعه خفه کن مکانیکی با پیچ است. در حالت سایلنسر باز، صدای بم و پرطنین اسپرت خواهید داشت و هر زمان که وارد محیط‌های شهری یا مراکز معاینه فنی می‌شوید، با بستن سایلنسر در کمتر از ۱ دقیقه، صدا کاملاً مانند منبع فابریک کارخانه بی صدا می‌شود.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">آیا کمک فنر اسپرت KDS باعث کوبش شدید اتاق خودرو می‌شود؟</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                خیر، کمک فنرهای KDS روغنی-گازی با پیستون سوپاپ‌دار اختصاصی طراحی شده‌اند تا در دست‌اندازهای تیز ضربه اولیه را جذب کنند و تنها مانع از تکان‌های جانبی و انحراف خودرو در پیچ‌ها شوند؛ بنابراین سواری به مراتب نرم‌تر و اصولی‌تر از بریدن فنر یا کمک‌های دست‌ساز سنتی است.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">استرس‌بار شاسی چه مزیتی در رانندگی دارد؟</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                استرس‌بار با اتصال دو سر بالایی کمک‌فنرها، استحکام پیچشی بدنه را در پیچ‌ها تا ۳۵٪ افزایش می‌دهد. این امر از گیجی فرمان در سرعت‌های بالا جلوگیری کرده و مانع از دفرمه شدن هندسه اتاق و خرابی زودرس جلوبندی می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
