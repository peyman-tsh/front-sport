'use client';

import React from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface AudioEqualizerProps {
  eqLevels: number[];
  isPlaying: boolean;
  isMuted: boolean;
  audioProgress: number;
  currentTimeDisplay: string;
  rpm: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function AudioEqualizer({
  eqLevels,
  isPlaying,
  isMuted,
  audioProgress,
  currentTimeDisplay,
  rpm,
  onTogglePlay,
  onToggleMute,
}: AudioEqualizerProps) {
  const estimatedDb = isPlaying ? Math.min(118, Math.round(75 + (rpm / 7000) * 40)) : 0;

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-md">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="font-bold text-slate-300">طیف فرکانسی آکوستیک اگزوز (۱۶ باند)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md">
            {estimatedDb} dB SPL
          </span>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label="قطع / وصل صدا"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* 16-Band Equalizer Bars */}
      <div className="flex items-end justify-between gap-1.5 h-16 bg-slate-900/80 rounded-2xl p-2.5 border border-slate-800">
        {eqLevels.map((lvl, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className={`w-full rounded-t-sm transition-all duration-75 ${
                isPlaying
                  ? lvl > 75
                    ? 'bg-rose-500'
                    : lvl > 45
                    ? 'bg-amber-400'
                    : 'bg-sky-400'
                  : 'bg-slate-700/60'
              }`}
              style={{ height: `${isPlaying ? lvl : 8}%` }}
            />
          </div>
        ))}
      </div>

      {/* Audio Timeline & Play/Pause */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold transition-all shadow-sm shrink-0 ${
            isPlaying
              ? 'bg-amber-400 text-slate-950 hover:bg-amber-500'
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-slate-950" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-100"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>{currentTimeDisplay}</span>
            <span>لوپ ممتد داینو</span>
          </div>
        </div>
      </div>
    </div>
  );
}
