'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Zap,
  Car,
  Sliders,
  Search,
  ShieldCheck,
  Flame,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  Layers,
  Wind,
  Disc,
  Compass,
  Menu,
  X,
  CheckCircle,
  Boxes,
  Radio,
  Headphones,
} from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';

export interface CategoryMenuData {
  title: string;
  category: string;
  icon: any;
  accent: string;
  description: string;
  subItems: { title: string; href: string }[];
}

export const SPORT_CATEGORIES_MENU: CategoryMenuData[] = [
  {
    title: 'سیستم اگزوز و مکش',
    category: 'سیستم اگزوز و مکش',
    icon: Wind,
    accent: 'amber',
    description: 'کیت مکش هوای خنک، منبع اگزوز سایلنسردار، هدرز و سراگزوز',
    subItems: [
      { title: 'کیت مکش استیل K&N', href: '/products?category=سیستم اگزوز و مکش&search=کیت مکش' },
      { title: 'منبع اگزوز سایلنسردار HKS', href: '/products?category=سیستم اگزوز و مکش&search=HKS' },
      { title: 'سر اگزوز هفت‌رنگ و تیتانیوم', href: '/products?category=سیستم اگزوز و مکش' },
      { title: 'فیلتر هوای اسپرت قابل شستشو', href: '/products?category=سیستم اگزوز و مکش' },
    ],
  },
  {
    title: 'سیستم تعلیق و فنربندی',
    category: 'سیستم تعلیق و فنربندی',
    icon: Disc,
    accent: 'sky',
    description: 'کمک اسپرت روغنی-گازی، فنر لول لنزو، استرس‌بار تقویت شاسی',
    subItems: [
      { title: 'کمک فنر اسپرت KDS کره', href: '/products?category=سیستم تعلیق و فنربندی&search=KDS' },
      { title: 'استرس‌بار شاسی HP Design', href: '/products?category=سیستم تعلیق و فنربندی&search=استرس' },
      { title: 'فنر لول ریسینگ لنزو', href: '/products?category=سیستم تعلیق و فنربندی' },
      { title: 'کیت تنظیم ارتفاع و ریگلاژی', href: '/products?category=سیستم تعلیق و فنربندی' },
    ],
  },
  {
    title: 'کیت بدنه و آیرودینامیک',
    category: 'کیت بدنه و آیرودینامیک',
    icon: Compass,
    accent: 'amber',
    description: 'لیپ سپر جلو، بال عقب فیبر کربن، دیفیوزر و فلپ بدنه',
    subItems: [
      { title: 'لیپ سپر جلو ۳ تکه سامورایی', href: '/products?category=کیت بدنه و آیرودینامیک&search=لیپ' },
      { title: 'بال عقب صندوق کربن M-Performance', href: '/products?category=کیت بدنه و آیرودینامیک&search=بال' },
      { title: 'دیفیوزر عقب با چراغ فرمول یک', href: '/products?category=کیت بدنه و آیرودینامیک' },
      { title: 'بادگیر شیشه و فلپ رکاب', href: '/products?category=کیت بدنه و آیرودینامیک' },
    ],
  },
  {
    title: 'تزئینات و کابین اسپرت',
    category: 'تزئینات و کابین اسپرت',
    icon: Flame,
    accent: 'sky',
    description: 'فرمان مسابقه‌ای D-Cut، سردنده اسپرت، نشانگر بوست، قاب کیلومتر',
    subItems: [
      { title: 'غربیلک فرمان اسپرت D-Cut چرم OMP', href: '/products?category=تزئینات و کابین اسپرت&search=OMP' },
      { title: 'سردنده اسپرت آلومینیومی', href: '/products?category=تزئینات و کابین اسپرت' },
      { title: 'پدال مسابقه‌ای ضد لغزش', href: '/products?category=تزئینات و کابین اسپرت' },
      { title: 'نشانگر بوست و فشار روغن', href: '/products?category=تزئینات و کابین اسپرت' },
    ],
  },
  {
    title: 'روشنایی و هدلایت',
    category: 'روشنایی و هدلایت',
    icon: Zap,
    accent: 'amber',
    description: 'هدلایت‌های پرچمدار ۳ لول مس، چیپ CSP Pro، لنز بای ال‌ای‌دی',
    subItems: [
      { title: 'هدلایت کانپکس M8 Pro توربو مس', href: '/products?category=روشنایی و هدلایت&search=Conpex' },
      { title: 'هدلایت دو کنتاکت H4 پراید و ال۹۰', href: '/products?socketType=H4' },
      { title: 'هدلایت پایه H7 نور پایین', href: '/products?socketType=H7' },
      { title: 'هدلایت طلایی ۳۰۰۰K مه‌شکن', href: '/products?socketType=H11' },
    ],
  },
];

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-100 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between xl:justify-center xl:gap-3 2xl:gap-5 px-3 sm:px-4 lg:px-6">
        
        {/* Right side: Mobile Menu Button + Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            aria-label="منوی موبایل"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="group flex items-center gap-2 shrink-0">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-soft-yellow transition-transform group-hover:scale-105">
              <Flame className="h-4.5 w-4.5 fill-slate-950" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 whitespace-nowrap">
                LUMIX <span className="text-amber-500">SPORT</span>
              </span>
              <span className="text-[9px] font-medium text-slate-400 whitespace-nowrap hidden 2xl:block">
                مرکز تیونینگ خودرو
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation with Mega-Menu (Centered inline) */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5 text-xs font-bold text-slate-600 whitespace-nowrap shrink-0">
          
          {/* Complete Categories Mega-Menu Trigger */}
          <div className="relative shrink-0" ref={megaMenuRef}>
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-all whitespace-nowrap shrink-0 ${
                isMegaMenuOpen
                  ? 'bg-amber-400 text-slate-950 shadow-soft-yellow font-black'
                  : 'text-slate-700 hover:text-amber-600 hover:bg-sky-50'
              }`}
            >
              <Layers className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">دسته‌بندی قطعات</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Mega-Menu Dropdown Panel */}
            {isMegaMenuOpen && (
              <div
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="absolute right-0 top-full mt-2 w-[760px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-2xl z-50 text-right animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-black text-slate-900">
                      همه بخش‌ها و قطعات اسپرت لومیکس
                    </span>
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="text-xs font-bold text-amber-600 hover:underline"
                  >
                    مشاهده کل کاتالوگ ←
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {SPORT_CATEGORIES_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.category}
                        className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:border-amber-300 hover:bg-amber-50/40 transition-all group"
                      >
                        {/* Category Main Header Link */}
                        <Link
                          href={`/products?category=${encodeURIComponent(item.category)}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="flex items-center gap-2 font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-amber-400 shadow-sm text-amber-600">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span>{item.title}</span>
                        </Link>

                        <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-1">
                          {item.description}
                        </p>

                        {/* Sub-items */}
                        <ul className="mt-3 space-y-1.5 border-t border-slate-200/60 pt-2 text-xs">
                          {item.subItems.map((sub, idx) => (
                            <li key={idx}>
                              <Link
                                href={sub.href}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="block text-slate-600 hover:text-amber-700 hover:font-bold transition-all py-0.5"
                              >
                                • {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/products"
            className="flex items-center gap-1.5 transition-colors hover:text-amber-600 whitespace-nowrap shrink-0 px-1.5 py-1"
          >
            <Sliders className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span className="whitespace-nowrap">کاتالوگ سریع</span>
          </Link>

          <Link
            href="/products/hks-hi-power-exhaust-muffler"
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-black text-amber-900 transition-all hover:bg-amber-100 hover:shadow-sm whitespace-nowrap shrink-0"
          >
            <Radio className="h-3.5 w-3.5 text-amber-600 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">تست صدا (داینو)</span>
          </Link>

          <Link
            href="/#car-finder"
            className="flex items-center gap-1.5 transition-colors hover:text-sky-600 whitespace-nowrap shrink-0 px-1.5 py-1"
          >
            <Car className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span className="whitespace-nowrap">سازگاری خودرو</span>
          </Link>

          <Link
            href="/consultation"
            className="flex items-center gap-1.5 transition-colors hover:text-amber-600 whitespace-nowrap shrink-0 px-1.5 py-1 text-slate-700 font-bold"
          >
            <Headphones className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span className="whitespace-nowrap">مشاوره تخصصی تیونینگ</span>
          </Link>
        </nav>

        {/* Vertical divider on desktop */}
        <div className="hidden xl:block h-6 w-px bg-slate-200/80 shrink-0" />

        {/* Left side: Search, Cart, & User Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Quick Search */}
          <Link
            href="/products"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50/50 text-slate-600 hover:border-sky-200 hover:bg-sky-100/70 hover:text-sky-700 transition-all shrink-0"
            title="جستجو در محصولات"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={openCart}
            aria-label="سبد خرید"
            className="relative flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-xl border border-sky-200 bg-sky-50 px-2.5 sm:px-3 text-sky-800 hover:bg-sky-100 transition-all font-semibold shadow-sm shrink-0 whitespace-nowrap"
          >
            <ShoppingBag className="h-4 w-4 text-sky-600 shrink-0" />
            <span className="hidden sm:inline text-xs whitespace-nowrap">سبد خرید</span>
            <span className="flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-amber-400 text-[11px] font-black text-slate-950 shadow-sm shrink-0">
              {totalItems}
            </span>
          </button>

          {/* User Auth Module Control */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated && user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex h-9 sm:h-10 items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-all shadow-sm whitespace-nowrap"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                    {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.fullName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-amber-700" />
                </button>

                {/* Logged In User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-sky-100 bg-white p-4 shadow-xl z-50 text-right">
                    <div className="border-b border-slate-100 pb-3">
                      <div className="font-bold text-xs text-slate-900">{user.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{user.phoneNumber}</div>
                      <span className="inline-block mt-1.5 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        {user.role === 'ADMIN' ? 'مدیر ارشد لومیکس' : 'مشتری رسمی'}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1">
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl bg-amber-100 border border-amber-300 px-3 py-2 text-xs text-amber-950 font-black hover:bg-amber-200 transition-colors mb-1"
                        >
                          <Boxes className="h-3.5 w-3.5 text-amber-700" />
                          <span>کنسول مدیریت و انبارداری</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-800 hover:bg-amber-50 hover:text-amber-700 font-bold"
                      >
                        <User className="h-3.5 w-3.5 text-amber-500" />
                        <span>پنل کاربری و پیشخوان</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 font-medium"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 text-sky-600" />
                        <span>سفارش‌های من</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=addresses"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 font-medium"
                      >
                        <Car className="h-3.5 w-3.5 text-sky-600" />
                        <span>دفترچه آدرس‌ها</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold border-t border-slate-100 mt-1 pt-2"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>خروج از حساب</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-3 sm:px-4 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-500 hover:to-amber-600 transition-all whitespace-nowrap"
              >
                <User className="h-4 w-4 shrink-0" />
                <span className="inline whitespace-nowrap">ورود / عضویت</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Drawer (Responsive Menu with full categories) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-sky-100 bg-white px-4 pt-4 pb-6 text-right space-y-4 shadow-lg animate-in slide-in-from-top-2">
          
          {/* User state on Mobile */}
          <div className="rounded-2xl bg-sky-50/70 p-3 border border-sky-100">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{user.fullName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{user.phoneNumber}</div>
                </div>
                <button
                  onClick={logout}
                  className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow"
              >
                <User className="h-4 w-4" />
                <span>ورود یا ثبت‌نام در لومیکس اسپرت</span>
              </button>
            )}
          </div>

          {/* Categories Title */}
          <div>
            <div className="text-xs font-black text-slate-900 mb-2 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-amber-500" />
              <span>دسته‌بندی قطعات اسپرت:</span>
            </div>
            <div className="space-y-1.5 pr-2">
              {SPORT_CATEGORIES_MENU.map((item) => (
                <div key={item.category}>
                  <Link
                    href={`/products?category=${encodeURIComponent(item.category)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs font-bold text-slate-800 hover:text-amber-600 py-1"
                  >
                    • {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <Link
              href="/products/hks-hi-power-exhaust-muffler"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300 px-3 py-2 text-xs font-black text-amber-900 whitespace-nowrap"
            >
              <Radio className="h-4 w-4 text-amber-600 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">استودیو تست صدا (داینو اختصاصی)</span>
            </Link>
            <Link
              href="/#car-finder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 py-1.5 whitespace-nowrap"
            >
              <Car className="h-4 w-4 text-sky-600 shrink-0" />
              <span className="whitespace-nowrap">سازگاری با خودرو شما</span>
            </Link>
            <Link
              href="/consultation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl bg-amber-50/90 border border-amber-300 px-3 py-2 text-xs font-black text-amber-950 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-amber-600" />
                <span>مشاوره تخصصی تیونینگ</span>
              </div>
              <span className="font-mono text-xs text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-lg">09304702517</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
