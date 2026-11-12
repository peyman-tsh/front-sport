'use client';

import React from 'react';
import { Video, ExternalLink, Zap } from 'lucide-react';
import { Product } from '../../types';

interface DynoVideoTabProps {
  product: Product;
}

export function DynoVideoTab({ product }: DynoVideoTabProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900 rounded-3xl border border-slate-800 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-amber-400" />
          <h3 className="text-sm font-black text-slate-100">
            ویدیوی تست داینو و تست خیابانی منبع اگزوز و قطعات اسپرت
          </h3>
        </div>
        <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-xl">
          کیفیت 4K استودیو
        </span>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
        <iframe
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
          title="تست صدای اگزوز در داینو"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block">افزایش توان سر چرخ</span>
          <span className="text-sm font-black text-amber-400 font-mono">+6.4 HP Dyno</span>
        </div>
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block">افزایش گشتاور میانی</span>
          <span className="text-sm font-black text-sky-400 font-mono">+11.2 N.m Torque</span>
        </div>
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block">کاهش بک‌پرشر خروجی</span>
          <span className="text-sm font-black text-emerald-400 font-mono">-42% Backpressure</span>
        </div>
      </div>
    </div>
  );
}
