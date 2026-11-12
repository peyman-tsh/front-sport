'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Radio, Video, Sliders, Sparkles } from 'lucide-react';
import { VEHICLE_PROFILES, VehicleProfile } from './sound-test/soundTestData';
import { TachometerGauge } from './sound-test/TachometerGauge';
import { LivePedalControl } from './sound-test/LivePedalControl';
import { AudioEqualizer } from './sound-test/AudioEqualizer';
import { VehicleSelector, SOUND_MODES, SoundModeOption } from './sound-test/VehicleSelector';
import { DynoVideoTab } from './sound-test/DynoVideoTab';

interface SoundTestPlayerProps {
  product: Product;
}

export function SoundTestPlayer({ product }: SoundTestPlayerProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProfile>(VEHICLE_PROFILES[0]);
  const [selectedMode, setSelectedMode] = useState<SoundModeOption>(SOUND_MODES[0]);
  const [activeTab, setActiveTab] = useState<'sound' | 'video'>('sound');

  const [rpm, setRpm] = useState<number>(selectedVehicle.idleRpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>('0:00');
  const [isPedalPressed, setIsPedalPressed] = useState<boolean>(false);

  // Equalizer visualizer levels
  const [eqLevels, setEqLevels] = useState<number[]>([
    25, 35, 45, 60, 40, 30, 45, 65, 55, 40, 35, 28, 22, 18, 14, 10,
  ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pedalIntervalRef = useRef<any>(null);
  const currentRpmRef = useRef<number>(rpm);

  useEffect(() => {
    currentRpmRef.current = rpm;
  }, [rpm]);

  // Determine current active audio URL
  const currentAudioUrl = selectedVehicle.audioUrl;

  const playAudio = async (targetRpm = currentRpmRef.current) => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;
      if (!audio.src.endsWith(currentAudioUrl)) {
        audio.src = currentAudioUrl;
      }

      audio.loop = true;
      audio.muted = isMuted;

      // Allow pitch shift on revving
      audio.preservesPitch = false;
      (audio as any).mozPreservesPitch = false;
      (audio as any).webkitPreservesPitch = false;

      // Pitch calculation based on RPM
      const baseRpm = selectedVehicle.redlineRpm * 0.7;
      const pitchRatio = Math.max(0.6, Math.min(1.85, targetRpm / baseRpm));
      audio.playbackRate = pitchRatio;

      audio.ontimeupdate = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setAudioProgress((audio.currentTime / audio.duration) * 100);
          const mins = Math.floor(audio.currentTime / 60);
          const secs = Math.floor(audio.currentTime % 60);
          setCurrentTimeDisplay(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio play restricted by browser policy:', err);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(rpm);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleSelectVehicle = (vehicle: VehicleProfile) => {
    setSelectedVehicle(vehicle);
    setRpm(vehicle.idleRpm);
    if (audioRef.current) {
      audioRef.current.src = vehicle.audioUrl;
      if (isPlaying) {
        playAudio(vehicle.idleRpm);
      }
    }
  };

  const handleSelectMode = (mode: SoundModeOption) => {
    setSelectedMode(mode);
    if (audioRef.current) {
      audioRef.current.src = mode.audioUrl;
      if (isPlaying) {
        playAudio(mode.baseRpm);
      }
    }
  };

  const handleRpmChange = (newRpm: number) => {
    setRpm(newRpm);
    if (isPlaying && audioRef.current) {
      const baseRpm = selectedVehicle.redlineRpm * 0.7;
      audioRef.current.playbackRate = Math.max(0.6, Math.min(1.85, newRpm / baseRpm));
    }
  };

  // Live Pedal revving handlers
  const handlePedalDown = () => {
    setIsPedalPressed(true);
    if (!isPlaying) {
      playAudio(rpm);
    }

    if (pedalIntervalRef.current) clearInterval(pedalIntervalRef.current);

    pedalIntervalRef.current = setInterval(() => {
      setRpm((prev) => {
        const next = Math.min(selectedVehicle.maxRpm, prev + 180);
        if (audioRef.current) {
          const baseRpm = selectedVehicle.redlineRpm * 0.7;
          audioRef.current.playbackRate = Math.max(0.6, Math.min(1.85, next / baseRpm));
        }
        return next;
      });
    }, 45);
  };

  const handlePedalUp = () => {
    setIsPedalPressed(false);
    if (pedalIntervalRef.current) {
      clearInterval(pedalIntervalRef.current);
      pedalIntervalRef.current = null;
    }

    // Deceleration smoothly back to idle
    const decelInterval = setInterval(() => {
      setRpm((prev) => {
        if (prev <= selectedVehicle.idleRpm + 100) {
          clearInterval(decelInterval);
          return selectedVehicle.idleRpm;
        }
        const next = prev - 220;
        if (audioRef.current) {
          const baseRpm = selectedVehicle.redlineRpm * 0.7;
          audioRef.current.playbackRate = Math.max(0.6, Math.min(1.85, next / baseRpm));
        }
        return next;
      });
    }, 40);
  };

  // Equalizer visualizer animation when playing
  useEffect(() => {
    let animId: any;
    if (isPlaying) {
      const interval = setInterval(() => {
        const factor = rpm / selectedVehicle.maxRpm;
        setEqLevels(
          Array.from({ length: 16 }, (_, i) => {
            const base = 25 + Math.sin(Date.now() / 150 + i) * 20;
            return Math.min(100, Math.max(10, Math.round(base + factor * 50 + Math.random() * 15)));
          })
        );
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isPlaying, rpm, selectedVehicle.maxRpm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (pedalIntervalRef.current) {
        clearInterval(pedalIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-6 md:p-8 shadow-sm">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-amber-500 animate-pulse" />
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              استودیو داینو و تست صدای زنده خودروها
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            شبیه‌ساز حرفه‌ای صدای اگزوز و تیونینگ برای خودروهای مختلف ایران‌خودرو، سایپا و وارداتی
          </p>
        </div>

        {/* Tab switch between Sound Simulation & Dyno Video */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('sound')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'sound'
                ? 'bg-amber-400 text-slate-950 shadow-soft-yellow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="h-4 w-4" />
            <span>شبیه‌ساز صدا و گاز زنده</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'video'
                ? 'bg-amber-400 text-slate-950 shadow-soft-yellow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="h-4 w-4" />
            <span>ویدیوی داینو</span>
          </button>
        </div>
      </div>

      {activeTab === 'sound' ? (
        <div className="flex flex-col gap-8">
          {/* Main Dyno Cluster: Tachometer Gauge + Live Pedal + Equalizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Tachometer (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <TachometerGauge
                rpm={rpm}
                maxRpm={selectedVehicle.maxRpm}
                redlineRpm={selectedVehicle.redlineRpm}
                isPlaying={isPlaying}
              />
            </div>

            {/* Controls & Equalizer (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <LivePedalControl
                rpm={rpm}
                maxRpm={selectedVehicle.maxRpm}
                idleRpm={selectedVehicle.idleRpm}
                isPedalPressed={isPedalPressed}
                isPlaying={isPlaying}
                onPedalDown={handlePedalDown}
                onPedalUp={handlePedalUp}
                onRpmChange={handleRpmChange}
              />

              <AudioEqualizer
                eqLevels={eqLevels}
                isPlaying={isPlaying}
                isMuted={isMuted}
                audioProgress={audioProgress}
                currentTimeDisplay={currentTimeDisplay}
                rpm={rpm}
                onTogglePlay={togglePlay}
                onToggleMute={toggleMute}
              />
            </div>
          </div>

          {/* Vehicle Selector (All Cars with Specific Sounds) */}
          <div className="border-t border-slate-100 pt-6">
            <VehicleSelector
              selectedVehicleId={selectedVehicle.id}
              selectedModeId={selectedMode.id}
              onSelectVehicle={handleSelectVehicle}
              onSelectMode={handleSelectMode}
            />
          </div>
        </div>
      ) : (
        <DynoVideoTab product={product} />
      )}
    </div>
  );
}
