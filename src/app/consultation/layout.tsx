import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مشاوره تخصصی تیونینگ و ارتقای خودرو | لومیکس اسپرت',
  description:
    'دریافت مشاوره رایگان و تخصصی جهت انتخاب بهترین کیت مکش، سیستم اگزوز، کمک فنر اسپرت و هدلایت متناسب با خودروی شما توسط مهندسین تیونینگ لومیکس اسپرت.',
  keywords: [
    'مشاوره تیونینگ خودرو',
    'مشاوره خرید کیت مکش',
    'مشاوره سیستم اگزوز اسپرت',
    'تیونینگ 206',
    'تیونینگ دنا پلاس',
    'تیونینگ پارس',
  ],
  alternates: {
    canonical: 'https://lumix-sport.ir/consultation',
  },
  openGraph: {
    title: 'مشاوره رایگان و تخصصی تیونینگ و ارتقای خودرو | لومیکس اسپرت',
    description:
      'انتخاب دقیق‌ترین قطعات اسپرت و تیونینگ متناسب با بودجه و خودروی شما با پاسخگویی کمتر از ۱۵ دقیقه.',
    url: 'https://lumix-sport.ir/consultation',
    siteName: 'لومیکس اسپرت',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
