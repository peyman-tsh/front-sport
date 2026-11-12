'use client';

import React from 'react';
import { Flame, Sliders, Zap } from 'lucide-react';

interface LivePedalControlProps {
  rpm: number;
  maxRpm: number;
  idleRpm: number;
  isPedalPressed: boolean;
  isPlaying: boolean;
  onPedalDown: () => void;
  onPedalUp: () => void;
  onRpmChange: (newRpm: number) => void;
}

export function LivePedalControl({
  rpm,
  maxRpm,
  idleRpm,
  isPedalPressed,
  isPlaying,
  onPedalDown,
  onPedalUp,
  onRpmChange,
}: LivePedalControlProps) {
  const boostPercent = Math.min(100, Math.max(0, Math.round(((rpm - idleRpm) / (maxRpm - idleRpm)) * 100)));

  return (
    <div className="flex flex-col gap-4 p-5 bg-white rounded-3xl border border-sky-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
            <Zap className="h-4 w-4 fill-slate-950" />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block">پدال گاز زنده (Throttle Pedal)</span>
            <span className="text-[10px] text-slate-500">نگه‌داشتن = گاز تخته و پر کردن دور موتور</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Flame className="h-3.5 w-3.5 text-amber-600" />
          <span>بوست داینو: {boostPercent}٪</span>
        </div>
      </div>

      {/* Interactive Gas Pedal Button */}
      <button
        type="button"
        onMouseDown={onPedalDown}
        onMouseUp={onPedalUp}
        onMouseLeave={onPedalUp}
        onTouchStart={onPedalDown}
        onTouchEnd={onPedalUp}
        className={`group relative flex flex-col items-center justify-center gap-1.5 w-full py-4 rounded-2xl border-2 font-black transition-all select-none shadow-md ${
          isPedalPressed
            ? 'scale-[0.98] border-amber-500 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-soft-yellow ring-4 ring-amber-300/40'
            : 'border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 hover:from-amber-50 hover:to-amber-100 hover:border-amber-400 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-2 text-sm">
          <Flame
            className={`h-5 w-5 transition-transform ${
              isPedalPressed ? 'scale-125 text-slate-950 fill-slate-950 animate-bounce' : 'text-amber-500'
            }`}
          />
          <span>{isPedalPressed ? '🚀 تخته گاز فعال است! (در حال کات‌آف)' : '👇 کلیک کنید و پدال گاز را نگه دارید'}</span>
        </div>
        <span className="text-[11px] font-normal text-slate-500">
          با فشرده نگه‌داشتن دکمه، صدای زنده با شتاب موتور اوج می‌گیرد
        </span>
      </button>

      {/* Boost Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-100"
          style={{ width: `${boostPercent}%` }}
        />
      </div>

      {/* Manual RPM Slider */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <div className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-sky-600" />
            <span>تنظیم دستی دور موتور (RPM Slider):</span>
          </div>
          <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
            {rpm} RPM
          </span>
        </div>
        <input
          type="range"
          min={idleRpm}
          max={maxRpm}
          step={100}
          value={rpm}
          onChange={(e) => onRpmChange(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>درجا: {idleRpm}</span>
          <span>شتاب: ۳۵۰۰</span>
          <span>ردلاین: {maxRpm}</span>
        </div>
      </div>
    </div>
  );
}
