import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchProductBySlug, formatToman, FALLBACK_PRODUCTS } from '../../../lib/api';
import {
  Shield,
  Star,
  Car,
  Truck,
  RotateCcw,
  Flame,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { SoundTestPlayer } from '../../../components/SoundTestPlayer';
import { ProductReviewsSection } from '../../../components/ProductReviewsSection';

/**
 * Next.js Rendering Strategy:
 * SSG (Static Site Generation) + ISR (Incremental Static Regeneration)
 *
 * 1. generateStaticParams pre-renders all product pages at build time into pure static HTML.
 * 2. revalidate = 60 guarantees fresh prices & stock data in the background without cold starts.
 * 3. dynamicParams = true enables on-demand static generation for newly added products.
 */
export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const res = await fetch(`${apiBase}/products?limit=100`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      return json.data.data.map((p: any) => ({ slug: p.slug }));
    }
  } catch {
    // Fallback static params during build if backend is offline
  }

  return FALLBACK_PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return { title: 'قطعه یافت نشد | لومیکس اسپرت' };
  }

  const metaTitle = product.seo?.metaTitle || `${product.title} | خرید آنلاین با ضمانت اصالت`;
  const metaDesc =
    product.seo?.metaDescription ||
    `${product.shortDescription} قیمت ${formatToman(product.price)} با ارسال فوری به سراسر کشور.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: product.seo?.keywords || [product.title, product.category, product.brand],
    alternates: {
      canonical: `https://lumix-sport.ir/products/${product.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://lumix-sport.ir/products/${product.slug}`,
      siteName: 'لومیکس اسپرت',
      type: 'article',
      images: [
        {
          url: product.images[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&h=630&q=85',
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumix-sport.ir';

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${siteUrl}/products/${product.slug}#product`,
        name: product.title,
        image: product.images,
        description: product.description,
        sku: `LMX-${product.slug}`,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/products/${product.slug}`,
          priceCurrency: 'IRR',
          price: product.price * 10,
          priceValidUntil: '2027-12-31',
          availability:
            product.isAvailable && product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewsCount || 1,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/products/${product.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'صفحه اصلی',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'لوازم اسپرت',
            item: `${siteUrl}/products`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: `${siteUrl}/products?category=${encodeURIComponent(product.category)}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.title,
            item: `${siteUrl}/products/${product.slug}`,
          },
        ],
      },
    ],
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 text-right text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-amber-600 transition-colors">صفحه اصلی</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600 transition-colors">لوازم اسپرت</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-600 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 line-clamp-1">{product.title}</span>
        </nav>

        {/* Product Showcase Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Images Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white aspect-square shadow-card-light">
                <img
                  src={product.images[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <img src={img} alt={`${product.title} عکس ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="lg:col-span-7">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-xl bg-amber-400 border border-amber-300 px-3 py-1 text-xs font-black text-slate-950 shadow-sm flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 fill-slate-950" />
                <span>{product.category}</span>
              </span>
              <span className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-800">
                برند رسمی {product.brand}
              </span>
              {product.socketType && (
                <span className="rounded-xl bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-bold text-sky-900">
                  پایه سوکت {product.socketType}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating & Reviews */}
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" />
                <span className="font-black text-slate-800 text-sm">{product.rating}</span>
              </div>
              <span>•</span>
              <span className="font-medium">{product.reviewsCount} دیدگاه تایید شده مشتریان</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">موجودی در انبار: {product.stock} عدد</span>
            </div>

            {/* Quick Pitch */}
            <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">
              {product.shortDescription}
            </p>

            {/* Key Highlights */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-right shadow-sm">
                <span className="text-[11px] text-amber-800 font-bold block">دسته‌بندی تخصصی</span>
                <span className="text-sm font-black text-amber-700 mt-1 block truncate">
                  {product.category}
                </span>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-right shadow-sm">
                <span className="text-[11px] text-sky-800 font-bold block">متریال اصلی</span>
                <span className="text-sm font-bold text-sky-700 mt-1 block truncate">
                  {product.material || 'آلیاژ گرید A'}
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm">
                <span className="text-[11px] text-slate-500 font-bold block">گارانتی و خدمات</span>
                <span className="text-sm font-black text-slate-800 mt-1 block">
                  {product.warrantyMonths} ماه ضمانت تعویض
                </span>
              </div>
            </div>

            {/* Warehouse Stock Alert */}
            {product.stock === 0 ? (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-bold text-rose-800 shadow-sm">
                <span className="text-base">⛔</span>
                <span>این قطعه در حال حاضر در انبار ناموجود است. به زودی در انبار لومیکس شارژ خواهد شد.</span>
              </div>
            ) : product.stock <= 10 ? (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-3.5 text-xs font-black text-amber-900 shadow-sm">
                <span className="text-base animate-bounce">🔥</span>
                <span>موجودی محدود انبار: تنها {product.stock} عدد از این قطعه در انبار باقی مانده است!</span>
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-bold text-emerald-800 shadow-sm">
                <span className="text-base">✓</span>
                <span>موجود در انبار لومیکس ({product.stock} عدد آماده ارسال فوری با تیپاکس و پست)</span>
              </div>
            )}

            {/* Price Box & Add to Cart Client Component */}
            <div className="mt-8 rounded-3xl border border-amber-200 bg-white p-6 shadow-card-light">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">قیمت نهایی با احتساب تخفیف:</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-black text-amber-600">
                      {formatToman(product.price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatToman(product.originalPrice!)}
                      </span>
                    )}
                  </div>
                </div>

                <AddToCartButton product={product} />
              </div>

              {/* Guarantees List */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>{product.warrantyMonths} ماه گارانتی اصالت کتبی</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-sky-500 shrink-0" />
                  <span>ارسال فوری رایگان برای این قطعه</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>۷ روز ضمانت بازگشت و تطابق کالا</span>
                </div>
              </div>
            </div>

            {/* Sound & Video Performance Demo Studio (Option 1) */}
            {((product.soundClips && product.soundClips.length > 0) ||
              product.videoDemoUrl ||
              product.category === 'سیستم اگزوز و مکش') && (
              <SoundTestPlayer product={product} />
            )}

            {/* Compatible Cars Section */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="mt-8 rounded-3xl border border-sky-100 bg-sky-50/50 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                  <Car className="h-4 w-4 text-sky-600" />
                  <span>خودروهای سازگار با این قطعه:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((c, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-xs text-slate-700 font-bold shadow-sm"
                    >
                      {c.carMake} {c.carModel} {c.position ? `(${c.position})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs Table */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">مشخصات فنی و متریال ساخت:</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2.5">
                  <dt className="text-slate-500 font-medium">دسته‌بندی:</dt>
                  <dd className="font-bold text-slate-900">{product.category}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2.5">
                  <dt className="text-slate-500 font-medium">برند سازنده:</dt>
                  <dd className="font-bold text-amber-700">{product.brand}</dd>
                </div>
                {product.material && (
                  <div className="flex justify-between border-b border-slate-100 pb-2.5">
                    <dt className="text-slate-500 font-medium">جنس و آلیاژ:</dt>
                    <dd className="font-bold text-slate-900">{product.material}</dd>
                  </div>
                )}
                {product.socketType && (
                  <div className="flex justify-between border-b border-slate-100 pb-2.5">
                    <dt className="text-slate-500 font-medium">پایه لامپ:</dt>
                    <dd className="font-black text-amber-600 font-mono">{product.socketType}</dd>
                  </div>
                )}
                {product.lumens && (
                  <div className="flex justify-between border-b border-slate-100 pb-2.5">
                    <dt className="text-slate-500 font-medium">شدت لومن نوری:</dt>
                    <dd className="font-bold text-sky-700">{product.lumens.toLocaleString()} LM</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-100 pb-2.5">
                  <dt className="text-slate-500 font-medium">مدت گارانتی:</dt>
                  <dd className="font-bold text-emerald-700">{product.warrantyMonths} ماه ضمانت شرکتی</dd>
                </div>
              </dl>
            </div>

            {/* Detailed Description */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 text-sm leading-relaxed whitespace-pre-line shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3">توضیحات تخصصی و راهنمای نصب:</h3>
              {product.description}
            </div>

            {/* Customer Reviews & Ratings Module */}
            <ProductReviewsSection
              productId={(product._id || product.id || product.slug) as string}
              productSlug={product.slug}
              productTitle={product.title}
              initialRating={product.rating}
              initialReviewsCount={product.reviewsCount}
            />

          </div>

        </div>

      </div>
    </div>
  );
}
