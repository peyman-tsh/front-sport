'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Flame } from 'lucide-react';

export function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<any>(null);
  const safetyTimeoutRef = useRef<any>(null);
  const minDisplayTimerRef = useRef<any>(null);
  const isNavigatingRef = useRef(false);

  // Start full-screen loading animation
  const startLoading = () => {
    isNavigatingRef.current = true;
    setIsLoading(true);
    setProgress(30);

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    if (minDisplayTimerRef.current) clearTimeout(minDisplayTimerRef.current);

    // Smoothly spool progress up to 90%
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimerRef.current);
          return 90;
        }
        const step = Math.max(2, (90 - prev) * 0.2);
        return Math.min(90, prev + step);
      });
    }, 40);

    // Safety timeout in case navigation stalls (kept tight so it never hangs)
    safetyTimeoutRef.current = setTimeout(() => {
      finishLoading();
    }, 1200);
  };

  // Complete full-screen loading animation
  const finishLoading = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

    setProgress(100);

    // Ensure animation has a brief pleasing presence before fading out
    minDisplayTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      isNavigatingRef.current = false;
      setTimeout(() => setProgress(0), 200);
    }, 140);
  };

  // Intercept all internal page navigation clicks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      if (!target || target.tagName !== 'A') return;

      const anchor = target as HTMLAnchorElement;
      const href = anchor.getAttribute('href');

      if (!href) return;

      // Ignore external, hash jumps, tel, mailto, target="_blank", downloads
      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        (href.startsWith('/#') && window.location.pathname === '/')
      ) {
        return;
      }

      // Check if it's an internal route that actually changes the page
      try {
        const targetUrl = new URL(anchor.href, window.location.origin);
        if (targetUrl.origin === window.location.origin) {
          const currentPath = window.location.pathname + window.location.search;
          const targetPath = targetUrl.pathname + targetUrl.search;

          if (targetPath !== currentPath) {
            startLoading();
          }
        }
      } catch {
        // ignore invalid urls
      }
    };

    const handlePopState = () => {
      // In Next.js App Router, back/forward navigation is restored immediately from client cache.
      // Calling full startLoading() would wait for a route event that already fired, causing a 4-second freeze.
      // Instead, we give a fast, snappy ~180ms pulse that immediately finishes smoothly.
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (minDisplayTimerRef.current) clearTimeout(minDisplayTimerRef.current);

      setIsLoading(true);
      setProgress(75);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => setProgress(0), 160);
        }, 110);
      }, 70);
    };

    document.addEventListener('click', handleDocumentClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      window.removeEventListener('popstate', handlePopState);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (minDisplayTimerRef.current) clearTimeout(minDisplayTimerRef.current);
    };
  }, []);

  // When pathname or searchParams change, route change completed
  useEffect(() => {
    if (isLoading || isNavigatingRef.current) {
      finishLoading();
    }
  }, [pathname, searchParams]);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/92 backdrop-blur-xl transition-all duration-300 ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Top Nitro Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400 shadow-[0_0_15px_rgba(245,158,11,1)] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
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
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_35px_rgba(245,158,11,0.65)] transform transition-transform hover:scale-105">
            <Flame className="h-10 w-10 sm:h-12 sm:w-12 fill-slate-950 text-slate-950 animate-bounce" />
          </div>
        </div>

        {/* Boost Spool Meter Bar (No text, pure visual progress) */}
        <div className="mt-8 w-44 sm:w-56 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400 rounded-full transition-all duration-100 shadow-[0_0_8px_#f59e0b]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
