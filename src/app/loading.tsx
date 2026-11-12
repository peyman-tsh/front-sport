import React from 'react';
import { Flame } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/92 backdrop-blur-xl">
      {/* Top Nitro Spool Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400 shadow-[0_0_15px_rgba(245,158,11,1)] w-3/4 animate-pulse" />
      </div>

      {/* Main Large Automotive Centerpiece */}
      <div className="relative flex flex-col items-center justify-center select-none scale-110 sm:scale-125">
        
        {/* Ambient Radial Golden Glow */}
        <div className="absolute -inset-10 rounded-full bg-amber-400/25 blur-3xl animate-pulse pointer-events-none" />

        {/* Outer Tachometer / Turbo Compressor Rotating Ring */}
        <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44">
          
          {/* Segmented Outer Spinner Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-amber-400/30 border-t-amber-500 border-r-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-spin [animation-duration:1.1s]" />

          {/* Counter-Rotating Dashed Inner Turbine Ring */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-dashed border-sky-400/60 animate-spin [animation-direction:reverse] [animation-duration:2.2s]" />

          {/* Third Orbit Pulsing Ring */}
          <div className="absolute inset-5 sm:inset-6 rounded-full border border-amber-300/40 animate-ping [animation-duration:2s]" />

          {/* Center Hub: Heavy Glowing Squircle with Flame */}
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_35px_rgba(245,158,11,0.65)]">
            <Flame className="h-10 w-10 sm:h-12 sm:w-12 fill-slate-950 text-slate-950 animate-bounce" />
          </div>
        </div>

        {/* Boost Spool Meter Bar (No text, pure visual progress) */}
        <div className="mt-8 w-44 sm:w-56 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 shadow-inner">
          <div className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400 rounded-full w-2/3 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        </div>
      </div>
    </div>
  );
}
