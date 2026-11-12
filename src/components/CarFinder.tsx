'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, CheckCircle2, ArrowLeft, AlertCircle, Wrench, Flame, Wind, Disc } from 'lucide-react';
import { CAR_SPECS_DATA } from '../lib/api';
import { CarBulbSpec } from '../types';

export function CarFinder() {
  const makes = Array.from(new Set(CAR_SPECS_DATA.map((c) => c.carMake)));
  const [selectedMake, setSelectedMake] = useState<string>(makes[0]);
  const models = CAR_SPECS_DATA.filter((c) => c.carMake === selectedMake);
  const [selectedModel, setSelectedModel] = useState<CarBulbSpec>(models[0]);

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    const newModels = CAR_SPECS_DATA.filter((c) => c.carMake === make);
    if (newModels.length > 0) {
      setSelectedModel(newModels[0]);
    }
  };

  return (
    <section id="car-finder" className="relative py-16 bg-gradient-to-b from-[#F8FAFC] via-sky-50/40 to-white border-y border-sky-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-sky-800 mb-3 shadow-sm">
            <Car className="h-3.5 w-3.5 text-sky-600" />
            <span>راهنمای جامع قطعات اسپرت و سازگاری با خودروها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            لوازم اسپرت متناسب با خودروی شما
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            خودروی خود را انتخاب کنید تا قطعات تیونینگ، کیت‌های مکش، سیستم اگزوز، کیت بدنه و هدلایت‌های استاندارد آن را مشاهده کنید.
          </p>
        </div>

        {/* Interactive Selector Card (White & Soft Sky Blue) */}
        <div className="mt-10 mx-auto max-w-4xl rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Make Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                ۱. کمپانی سازنده خودرو:
              </label>
              <div className="flex flex-wrap gap-2">
                {makes.map((make) => (
                  <button
                    key={make}
                    type="button"
                    onClick={() => handleMakeChange(make)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      selectedMake === make
                        ? 'bg-amber-400 text-slate-950 shadow-soft-yellow'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {make}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                ۲. مدل خودرو:
              </label>
              <select
                aria-label="انتخاب مدل خودرو"
                value={selectedModel.carModel}
                onChange={(e) => {
                  const m = models.find((item) => item.carModel === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="w-full rounded-xl border border-sky-200 bg-sky-50/50 px-4 py-3 text-sm text-slate-900 font-semibold focus:border-amber-400 focus:bg-white focus:outline-none shadow-sm"
              >
                {models.map((m) => (
                  <option key={m.carModel} value={m.carModel}>
                    {m.carModel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display */}
          <div className="mt-8 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/60 to-white p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-sky-100 pb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>قطعات اسپرت سازگار با {selectedModel.carMake} {selectedModel.carModel}:</span>
            </div>

            {/* Sport Categories Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Air Intake & Exhaust */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-amber-800">
                  <Wind className="h-4 w-4 text-amber-600" />
                  <span>کیت مکش و اگزوز اسپرت</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-600">
                  سازگار با کیت استیل و منبع HKS
                </div>
                <Link
                  href="/products?category=سیستم اگزوز و مکش"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
                >
                  <span>مشاهده کیت‌های مکش و اگزوز</span>
                  <ArrowLeft className="h-3 w-3" />
                </Link>
              </div>

              {/* Suspension & Handling */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-sky-800">
                  <Disc className="h-4 w-4 text-sky-600" />
                  <span>تعلیق و استرس‌بار</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-600">
                  کمک اسپرت KDS و میله تعادل شاسی
                </div>
                <Link
                  href="/products?category=سیستم تعلیق و فنربندی"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 hover:underline"
                >
                  <span>مشاهده کمک و تعلیق اسپرت</span>
                  <ArrowLeft className="h-3 w-3" />
                </Link>
              </div>

              {/* Body Kit & Aero */}
              <div className="rounded-2xl border border-sky-200 bg-white p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span>کیت بدنه و روشنایی</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-600">
                  لیپ سپر، بال صندوق، نور {selectedModel.lowBeam}
                </div>
                <Link
                  href={`/products?category=کیت بدنه و آیرودینامیک`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline"
                >
                  <span>مشاهده کیت بدنه و لیپ‌ها</span>
                  <ArrowLeft className="h-3 w-3" />
                </Link>
              </div>

            </div>

            {selectedModel.notes && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <span>مشخصات فنی و تیونینگ این خودرو: {selectedModel.notes}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
