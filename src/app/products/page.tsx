import React from 'react';
import type { Metadata } from 'next';
import { ProductCard } from '../../components/ProductCard';
import { fetchProducts } from '../../lib/api';
import { Sliders, Filter } from 'lucide-react';
import Link from 'next/link';

/**
 * Next.js Rendering Strategy:
 * Dynamic SSR (Server-Side Rendering)
 * Reads dynamic searchParams on each request and renders customized server-side HTML.
 * Ensures search engines crawl all faceted filter pages (e.g., ?category=...&brand=...) with 100% SEO visibility.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'کاتالوگ و خرید انواع لوازم اسپرت و تیونینگ خودرو | کیت مکش، اگزوز، تعلیق و هدلایت',
  description:
    'مشاهده و خرید اینترنتی انواع لوازم اسپرت و تیونینگ خودرو، کیت مکش K&N، منبع اگزوز HKS، کمک فنر اسپرت KDS، لیپ سپر کربن و هدلایت‌های پرچمدار با ارسال فوری و ضمانت اصالت کالا.',
  alternates: {
    canonical: 'https://lumix-sport.ir/products',
  },
};

interface SearchParams {
  category?: string;
  socketType?: string;
  brand?: string;
  search?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryParts = [];
  if (searchParams.category) queryParts.push(`category=${encodeURIComponent(searchParams.category)}`);
  if (searchParams.socketType) queryParts.push(`socketType=${searchParams.socketType}`);
  if (searchParams.brand) queryParts.push(`brand=${encodeURIComponent(searchParams.brand)}`);
  if (searchParams.search) queryParts.push(`search=${encodeURIComponent(searchParams.search)}`);

  const { data: products } = await fetchProducts(queryParts.join('&'));

  const categories = [
    'همه دسته‌ها',
    'سیستم اگزوز و مکش',
    'سیستم تعلیق و فنربندی',
    'کیت بدنه و آیرودینامیک',
    'تزئینات و کابین اسپرت',
    'روشنایی و هدلایت',
  ];

  const brands = ['همه برندها', 'K&N', 'HKS', 'KDS', 'Samurai Sport', 'OMP Racing', 'M-Performance', 'HP Design', 'Conpex'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-right mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-2">
            <Sliders className="h-4 w-4 text-sky-600" />
            <span>کاتالوگ جامع قطعات و لوازم اسپرت خودرو (SSR Server-Rendered)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            خرید قطعات اسپرت و تیونینگ
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium">
            فیلتر بر اساس دسته‌بندی قطعات، برند، متریال ساخت و سازگاری با انواع خودروها
          </p>
        </div>

        {/* Filter Navigation Bar (Pure White & Light Blue) */}
        <div className="rounded-3xl border border-sky-100 bg-white p-6 mb-10 text-right space-y-5 shadow-card-light">
          
          {/* Category Filter */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-2.5">دسته‌بندی قطعات اسپرت:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const isActive = c === 'همه دسته‌ها' ? !searchParams.category : searchParams.category === c;
                const href = c === 'همه دسته‌ها' ? '/products' : `/products?category=${encodeURIComponent(c)}`;
                return (
                  <Link
                    key={c}
                    href={href}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-soft-yellow'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {c}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="border-t border-slate-100 pt-4">
            <span className="block text-xs font-bold text-slate-700 mb-2.5">فیلتر برند سازنده:</span>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => {
                const isActive = b === 'همه برندها' ? !searchParams.brand : searchParams.brand === b;
                const href = b === 'همه برندها' ? '/products' : `/products?brand=${encodeURIComponent(b)}`;
                return (
                  <Link
                    key={b}
                    href={href}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? 'border border-sky-300 bg-sky-100 text-sky-900 shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-800'
                    }`}
                  >
                    {b}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        {/* Products Results List */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-sky-100 bg-white p-12 text-center text-slate-500 shadow-card-light">
            <Filter className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">قطعه‌ای با این مشخصات یافت نشد</h3>
            <p className="text-xs text-slate-500 mt-1">لطفاً فیلترهای انتخابی را پاک کنید تا مدل‌های دیگر نمایش داده شوند.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow"
            >
              مشاهده همه قطعات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
