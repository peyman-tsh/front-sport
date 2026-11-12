'use client';

import React, { useState } from 'react';
import { Sun, Eye, CloudRain, Zap } from 'lucide-react';

interface KelvinOption {
  kelvin: number;
  name: string;
  englishName: string;
  beamColorHex: string;
  beamGlowRgba: string;
  bestFor: string;
  penetration: string;
  description: string;
}

const KELVIN_DATA: KelvinOption[] = [
  {
    kelvin: 3000,
    name: 'زرد طلایی عمیق (مه‌شکن)',
    englishName: '3000K Golden Fog',
    beamColorHex: '#F59E0B',
    beamGlowRgba: 'rgba(245, 158, 11, 0.45)',
    bestFor: 'مه‌شکن، جاده‌های کوهستانی، باران سیل‌آسا و کولاک برفی',
    penetration: 'حداکثر نفوذ (طول موج بلند بدون بازتاب از قطرات آب)',
    description: 'بهترین انتخاب برای پروژکتورهای داخل سپر. نور زرد به دلیل طول موج بلند، از میان ذرات مه و غبار عبور کرده و مانع از بازتاب کورکننده به چشم راننده می‌شود.',
  },
  {
    kelvin: 4300,
    name: 'سفید گرم فابریک (همه شرایط جوی)',
    englishName: '4300K OEM All-Weather',
    beamColorHex: '#FEF08A',
    beamGlowRgba: 'rgba(254, 240, 138, 0.4)',
    bestFor: 'دید عالی در آسفالت خیس و سیاه، رانندگی‌های طولانی‌مدت',
    penetration: 'بسیار بالا در تمام فصول سال',
    description: 'همان رنگ نوری که کارخانه‌های مرسدس بنز، ب‌ام‌و و پورشه برای چراغ‌های فابریک استفاده می‌کنند. کمترین میزان خستگی چشم در سفرهای شبانه بین‌شهری.',
  },
  {
    kelvin: 6000,
    name: 'سفید کریستالی زنونی (محبوب‌ترین)',
    englishName: '6000K Diamond White',
    beamColorHex: '#F8FAFC',
    beamGlowRgba: 'rgba(248, 250, 252, 0.45)',
    bestFor: 'نهایت شفافیت تابلوها، نور بالا و پایین در هوای صاف',
    penetration: 'عالی در هوای خشک و آسفالت استاندارد',
    description: 'پرطرفدارترین کلوین در میان رانندگان ایرانی. جلوه لوکس، روشنایی فوق‌العاده بالا و بازتاب کریستالی علائم راهنمایی و خط‌کشی‌های جاده.',
  },
  {
    kelvin: 8000,
    name: 'آبی یخی اسپرت',
    englishName: '8000K Ice Blue',
    beamColorHex: '#38BDF8',
    beamGlowRgba: 'rgba(56, 189, 248, 0.45)',
    bestFor: 'زیبایی اسپرت، گردهمایی‌های خودرویی و رانندگی شهری',
    penetration: 'متوسط (مناسب هوای صاف شهری)',
    description: 'طیف یخی خاص با تم ملایم آبی که به خودرو نمای اسپرت و جذاب می‌بخشد.',
  },
];

export function BeamSimulator() {
  const [selected, setSelected] = useState<KelvinOption>(KELVIN_DATA[2]); // Default 6000K

  return (
    <section id="beam-simulator" className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-[#F8FAFC] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 mb-3 shadow-sm">
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            <span>شبیه‌ساز تعاملی طیف رنگی کلوین (Kelvin Simulator)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            شبیه‌ساز نوری کلوین هدلایت در جاده شبانه
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            روی گزینه‌های کلوین کلیک کنید تا تغییر طیف نوری و میزان نفوذ آن روی جاده را مقایسه کنید.
          </p>
        </div>

        {/* Kelvin Switch Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {KELVIN_DATA.map((item) => (
            <button
              key={item.kelvin}
              type="button"
              onClick={() => setSelected(item)}
              className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold transition-all shadow-sm ${
                selected.kelvin === item.kelvin
                  ? 'border-2 border-amber-400 bg-amber-50 text-slate-950 shadow-soft-yellow'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-slate-300 shadow-sm"
                style={{ backgroundColor: item.beamColorHex }}
              />
              <span>{item.kelvin}K</span>
              <span className="hidden sm:inline text-xs font-semibold text-slate-500">({item.englishName.split(' ')[1]})</span>
            </button>
          ))}
        </div>

        {/* Interactive Night Highway Simulation Screen */}
        <div className="mt-10 mx-auto max-w-4xl rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light">
          <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-[#070A10] border border-slate-800 flex items-center justify-center">
            
            {/* Dark Highway Road Lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#06080E] via-[#090D15] to-[#0E1522]" />

            {/* Simulated Headlight Cone with selected color */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 50% at 50% 65%, ${selected.beamGlowRgba} 0%, transparent 80%)`,
              }}
            />

            {/* Projected Light Beam Cones */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 rounded-full blur-xl opacity-60 transition-all duration-500"
              style={{ backgroundColor: selected.beamColorHex }}
            />

            {/* Road Perspective Lane Marks */}
            <div className="absolute bottom-0 inset-x-0 h-40 flex justify-center">
              <div className="w-1 bg-amber-400/50 opacity-70 transform rotate-12 origin-bottom translate-x-24" />
              <div className="w-1.5 border-r-2 border-dashed border-white/60 h-full transform origin-bottom" />
              <div className="w-1 bg-amber-400/50 opacity-70 transform -rotate-12 origin-bottom -translate-x-24" />
            </div>

            {/* Active Kelvin Display Badge */}
            <div className="absolute top-4 right-4 rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-1.5 text-xs font-mono text-white backdrop-blur-md shadow-md">
              طیف فعال: <span className="font-bold" style={{ color: selected.beamColorHex }}>{selected.kelvin} Kelvin</span>
            </div>

            {/* Cut-off Horizon Line */}
            <div className="absolute top-1/2 inset-x-0 border-b border-white/20">
              <span className="absolute right-4 -top-5 text-[10px] text-slate-400 font-mono">
                ECE R112 CUT-OFF
              </span>
            </div>
          </div>

          {/* Description & Technical Breakdown */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
            <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                <CloudRain className="h-4 w-4 text-sky-600" />
                <span>بهترین کاربرد:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{selected.bestFor}</p>
              
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-700">
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span>{selected.penetration}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                <Eye className="h-4 w-4 text-amber-600" />
                <span>تحلیل بینایی‌سنجی رانندگی:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{selected.description}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
