import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartProvider } from '../components/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { AuthProvider } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';
import { PageTransitionLoader } from '../components/PageTransitionLoader';

// High-Performance Next.js Font Optimization with Persian Vazirmatn
const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lumix-sport.ir'),
  title: {
    default: 'فروشگاه تخصصی لوازم اسپرت و تیونینگ خودرو | لومیکس اسپرت (LUMIX SPORT)',
    template: '%s | لومیکس اسپرت',
  },
  description:
    'مرجع تخصصی خرید لوازم اسپرت و تیونینگ خودرو با ضمانت اصالت. خرید انواع کیت مکش K&N، منبع اگزوز سایلنسردار HKS، کمک فنر اسپرت KDS، کیت بدنه کربن و هدلایت‌های پرقدرت.',
  keywords: [
    'لوازم اسپرت ماشین',
    'فروشگاه تیونینگ خودرو',
    'کیت مکش استیل',
    'منبع اگزوز اسپرت',
    'کمک فنر اسپرت KDS',
    'لیپ سپر جلو کربن',
    'بال عقب اسپرت',
    'فرمان اسپرت دی کات',
    'استرس بار دنا و پژو',
    'هدلایت کانپکس',
  ],
  authors: [{ name: 'Lumix Automotive Sport Team' }],
  creator: 'Lumix Sport',
  publisher: 'Lumix Sport',
  openGraph: {
    title: 'فروشگاه تخصصی لوازم اسپرت و تیونینگ خودرو لومیکس اسپرت',
    description: 'خرید اینترنتی انواع قطعات اسپرت و تیونینگ برای تمام خودروهای داخلی و خارجی با ارسال فوری و مشاوره تخصصی.',
    url: 'https://lumix-sport.ir',
    siteName: 'لومیکس اسپرت',
    locale: 'fa_IR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lumix-sport.ir',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoPartsStore',
        '@id': 'https://lumix-sport.ir/#store',
        name: 'لومیکس اسپرت - مرکز تخصصی لوازم اسپرت و تیونینگ خودرو',
        description:
          'فروشگاه تخصصی انواع لوازم اسپرت خودرو، کیت مکش استیل، سیستم اگزوز، کمک فنر اسپرت، کیت بدنه کربن و هدلایت‌های نسل جدید با ضمانت اصالت کالا.',
        url: 'https://lumix-sport.ir',
        telephone: '+982112345678',
        priceRange: 'IRR',
        currenciesAccepted: 'IRR, IRT',
        paymentAccepted: 'Zarinpal, Shetab, Credit Card',
        openingHours: 'Mo,Tu,We,Th,Sa,Su 09:00-21:00',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://lumix-sport.ir/#website',
        url: 'https://lumix-sport.ir',
        name: 'لومیکس اسپرت (LUMIX SPORT)',
        description: 'مرجع آنلاین تیونینگ و ارتقای عملکرد خودرو',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://lumix-sport.ir/products?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} font-sans scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans selection:bg-amber-200 selection:text-amber-900">
        <Suspense fallback={null}>
          <PageTransitionLoader />
        </Suspense>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <AuthModal />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
