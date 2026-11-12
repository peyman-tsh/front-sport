'use client';

import React from 'react';
import { Gauge, Flame } from 'lucide-react';

interface TachometerGaugeProps {
  rpm: number;
  maxRpm?: number;
  redlineRpm?: number;
  isPlaying: boolean;
}

export function TachometerGauge({
  rpm,
  maxRpm = 7500,
  redlineRpm = 6500,
  isPlaying,
}: TachometerGaugeProps) {
  // Dial angles from -125deg to +125deg (250 degree sweep)
  const rpmRatio = Math.min(1, Math.max(0, rpm / maxRpm));
  const needleAngle = -125 + rpmRatio * 250;
  const isRedline = rpm >= redlineRpm;
  const estimatedSpeed = Math.round((rpm / 6500) * 195);
  const gear = rpm < 1500 ? 'N' : rpm < 3200 ? '2' : rpm < 5200 ? '3' : '4';

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Background Radial Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isRedline
            ? 'bg-rose-500/20 animate-pulse'
            : isPlaying
            ? 'bg-amber-500/10'
            : 'opacity-0'
        }`}
      />

      {/* SVG Dial */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {/* Dial Track */}
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeDasharray="360"
            strokeDashoffset="100"
          />
          {/* Active RPM Arc */}
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke={isRedline ? '#f43f5e' : '#f59e0b'}
            strokeWidth="10"
            strokeDasharray="360"
            strokeDashoffset={360 - (rpmRatio * 260)}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>

        {/* Needle */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75"
          style={{ transform: `rotate(${needleAngle}deg)` }}
        >
          <div className="w-1.5 h-24 bg-gradient-to-t from-transparent via-amber-400 to-amber-300 rounded-full origin-bottom -translate-y-8 shadow-lg shadow-amber-500/50" />
        </div>

        {/* Center Hub & Digital RPM */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            دور موتور
          </span>
          <span
            className={`text-2xl font-black font-mono tracking-tighter ${
              isRedline ? 'text-rose-400 animate-ping' : 'text-amber-400'
            }`}
          >
            {rpm.toLocaleString('fa-IR')}
          </span>
          <span className="text-[9px] font-semibold text-slate-400">RPM × 1000</span>
        </div>
      </div>

      {/* Speed & Gear Indicators */}
      <div className="mt-2 grid grid-cols-2 gap-4 w-full max-w-xs text-center border-t border-slate-800/80 pt-3">
        <div className="flex flex-col items-center bg-slate-800/40 rounded-xl py-1.5 border border-slate-700/50">
          <span className="text-[10px] text-slate-400">سرعت تقریبی</span>
          <span className="text-sm font-black text-white font-mono">
            {estimatedSpeed} <span className="text-[10px] text-slate-400">km/h</span>
          </span>
        </div>
        <div className="flex flex-col items-center bg-slate-800/40 rounded-xl py-1.5 border border-slate-700/50">
          <span className="text-[10px] text-slate-400">دنده داینو</span>
          <span className="text-sm font-black text-amber-400 font-mono">GEAR {gear}</span>
        </div>
      </div>

      {/* Redline Alert Pill */}
      {isRedline && (
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-300 text-[11px] font-bold animate-bounce">
          <Flame className="h-3.5 w-3.5 text-rose-400" />
          <span>محدوده کات‌آف و ردلاین ریسی (Redline Limit)</span>
        </div>
      )}
    </div>
  );
}
