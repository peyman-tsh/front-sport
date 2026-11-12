'use client';

import React from 'react';
import { Car, Flame, CheckCircle2, ShieldCheck, Radio } from 'lucide-react';
import { VehicleProfile, VEHICLE_PROFILES } from './soundTestData';

export interface SoundModeOption {
  id: string;
  title: string;
  audioUrl: string;
  badge: string;
  baseRpm: number;
}

export const SOUND_MODES: SoundModeOption[] = [
  {
    id: 'open-silencer',
    title: 'سایلنسر باز ریسینگ (غرش پرحجم)',
    audioUrl: '/audio/hks-open-silencer.wav',
    badge: 'حالت پیست و ریس',
    baseRpm: 6500,
  },
  {
    id: 'closed-silencer',
    title: 'سایلنسر بسته شهری (بدون جریمه و نرم)',
    audioUrl: '/audio/hks-closed-silencer.wav',
    badge: 'شهری سایلنت',
    baseRpm: 3200,
  },
  {
    id: 'pop-bang',
    title: 'کات‌آف رگباری و پاپ اند بنگ (Pops & Bangs)',
    audioUrl: '/audio/hks-pop-bang.wav',
    badge: 'بک‌فایر ۲-استپ',
    baseRpm: 7200,
  },
];

interface VehicleSelectorProps {
  selectedVehicleId: string;
  selectedModeId: string;
  onSelectVehicle: (vehicle: VehicleProfile) => void;
  onSelectMode: (mode: SoundModeOption) => void;
}

export function VehicleSelector({
  selectedVehicleId,
  selectedModeId,
  onSelectVehicle,
  onSelectMode,
}: VehicleSelectorProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Vehicles Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-sky-600" />
            <h3 className="text-sm font-black text-slate-900">
              انتخاب خودرو برای تست صدای اختصاصی موتور:
            </h3>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
            ۷ خودرو و موتور تیونینگ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VEHICLE_PROFILES.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle.id;
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => onSelectVehicle(vehicle)}
                className={`relative flex flex-col text-right p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/80 shadow-soft-yellow ring-2 ring-amber-300/60'
                    : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900">
                      {vehicle.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {vehicle.engine}
                    </span>
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                  <span className="font-bold text-slate-600">
                    {vehicle.tag}
                  </span>
                  <span className="font-mono text-amber-600 font-black">
                    ردلاین {vehicle.redlineRpm} RPM
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Exhaust Sound Mode Tabs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-black text-slate-900">
            حالت‌های آکوستیک اگزوز و سایلنسر:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SOUND_MODES.map((mode) => {
            const isSelected = selectedModeId === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode)}
                className={`flex flex-col text-right p-3 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500 text-slate-950 font-black shadow-soft-yellow'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <span className="text-xs font-bold">{mode.title}</span>
                <span
                  className={`text-[10px] mt-1 ${
                    isSelected ? 'text-slate-900 font-medium' : 'text-slate-500'
                  }`}
                >
                  {mode.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
