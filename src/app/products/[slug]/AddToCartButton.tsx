'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Product } from '../../../types';
import { useCart } from '../../../components/CartContext';

export function AddToCartButton({ product }: { product: Product }) {
  const { cart, addToCart, updateQuantity, openCart } = useCart();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const productId = product.id || product._id || product.slug;
  const inCartItem = cart.find(
    (item) => (item.product.id || item.product._id || item.product.slug) === productId
  );
  const currentQuantityInCart = inCartItem ? inCartItem.quantity : 0;

  const handleInitialAdd = () => {
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleIncrement = () => {
    if (currentQuantityInCart < product.stock) {
      updateQuantity(productId, currentQuantityInCart + 1);
    }
  };

  const handleDecrement = () => {
    if (currentQuantityInCart > 0) {
      updateQuantity(productId, currentQuantityInCart - 1);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {currentQuantityInCart === 0 ? (
        // Initial state: 0 items in cart
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleInitialAdd}
            disabled={product.stock <= 0}
            className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-black transition-all shadow-soft-yellow ${
              product.stock <= 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 text-slate-950 hover:bg-amber-500 hover:shadow-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="h-4 w-4" />
                <span className="whitespace-nowrap">به سبد اضافه شد</span>
              </>
            ) : product.stock <= 0 ? (
              <span className="whitespace-nowrap">اتمام موجودی در انبار</span>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span className="whitespace-nowrap">افزودن به سبد خرید</span>
              </>
            )}
          </button>

          {/* Explicit 0 Indicator */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-2 text-xs font-bold text-sky-800 whitespace-nowrap">
            <span className="text-slate-500">در سبد شما:</span>
            <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-sky-200">
              ۰ عدد
            </span>
          </div>
        </div>
      ) : (
        // Product already in cart with active counter
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-3.5 py-2 shadow-sm">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="کاهش تعداد"
              className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-sky-200 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center px-1">
              <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">در سبد</span>
              <span className="text-sm font-black text-slate-950">{currentQuantityInCart}</span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={currentQuantityInCart >= product.stock}
              aria-label="افزایش تعداد"
              className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-600 border border-sky-200 transition-colors disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={openCart}
            className="flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500 transition-all whitespace-nowrap"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>مشاهده و تسویه سبد</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
