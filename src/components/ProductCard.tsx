'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Zap, Shield, Check, Flame, Layers } from 'lucide-react';
import { Product } from '../types';
import { formatToman } from '../lib/api';
import { useCart } from './CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-amber-400 hover:shadow-card-hover hover:-translate-y-1">
      <div>
        {/* Top Image Showcase */}
        <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] w-full block overflow-hidden bg-slate-100 group/img">
          <img
            src={mainImage}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
          />

          {/* Category / Socket Badge (Warm Golden Yellow) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-xl bg-amber-400 border border-amber-300 px-3 py-1 text-xs font-black text-slate-950 shadow-soft-yellow">
            <Flame className="h-3.5 w-3.5 fill-slate-950" />
            <span>{product.socketType ? `پایه ${product.socketType}` : product.category}</span>
          </div>

          {/* Sound Test Badge */}
          {((product.soundClips && product.soundClips.length > 0) || product.category === 'سیستم اگزوز و مکش') && (
            <div className="absolute top-11 right-3 flex items-center gap-1.5 rounded-xl bg-slate-950/90 border border-amber-400/50 px-2.5 py-1 text-[11px] font-black text-amber-300 shadow-md backdrop-blur-md hover:bg-amber-500 hover:text-slate-950 transition-all">
              <span className="text-xs animate-pulse">🔊</span>
              <span>تست زنده صدا</span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 rounded-xl bg-rose-500 px-2.5 py-0.5 text-xs font-black text-white shadow-sm">
              {discountPercent}٪ تخفیف
            </div>
          )}

          {/* Bottom Specs Ribbon (Soft Light Blue / White Glass) */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between rounded-xl bg-white/95 border border-sky-100 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur-md">
            {product.lumens && product.wattage ? (
              <>
                <span className="flex items-center gap-1 text-amber-600">
                  <Zap className="h-3 w-3 fill-amber-500" />
                  {product.lumens.toLocaleString()} LM
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-sky-700">{product.wattage} وات واقعی</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-800">{product.colorTemperature || 6000}K</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1 text-amber-600 truncate max-w-[150px]">
                  <Layers className="h-3 w-3" />
                  {product.category}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-sky-700 font-medium">کیفیت اورجینال اسپرت</span>
              </>
            )}
          </div>
        </Link>

        {/* Content Info */}
        <div className="p-5 text-right">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span className="font-black text-slate-800">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Features Pills (Light Blue & Soft Yellow) */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.material && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] text-sky-800 font-bold truncate max-w-[180px]">
                <Check className="h-3 w-3 text-sky-600 shrink-0" />
                <span className="truncate">{product.material}</span>
              </span>
            )}
            {product.warrantyMonths > 0 && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] text-amber-800 font-bold">
                <Shield className="h-3 w-3 text-amber-600" />
                {product.warrantyMonths} ماه ضمانت
              </span>
            )}
          </div>

          {/* Warehouse Stock Alert / Indicator */}
          <div className="mt-2.5">
            {product.stock === 0 ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                ناموجود در انبار
              </span>
            ) : product.stock <= 10 ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-300 px-2.5 py-0.5 text-[10px] font-black text-amber-800 animate-pulse">
                <span>🔥</span>
                <span>تنها {product.stock} عدد در انبار باقی مانده</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <span>✓</span>
                <span>موجود در انبار ({product.stock} عدد)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-4">
        <div className="flex items-center justify-between">
          <div className="text-right">
            {hasDiscount && (
              <span className="block text-xs text-slate-400 line-through">
                {formatToman(product.originalPrice!)}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-amber-600">
              {formatToman(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {((product.soundClips && product.soundClips.length > 0) || product.category === 'سیستم اگزوز و مکش') && (
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 px-2.5 py-2 text-xs font-bold transition-all shadow-sm"
                title="تست صدای زنده این قطعه"
              >
                <span>🔊 تست صدا</span>
              </Link>
            )}

            {product.stock > 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-3.5 py-2 text-xs font-black text-slate-950 shadow-soft-yellow transition-all"
                title="افزودن به سبد خرید"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>خرید</span>
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-1 rounded-xl bg-slate-200 px-3 py-2 text-xs font-bold text-slate-500 cursor-not-allowed"
              >
                ناموجود
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
