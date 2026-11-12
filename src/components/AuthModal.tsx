'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Phone,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  Flame,
  AlertCircle,
  CheckCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode with context state whenever modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!phoneNumber || !/^09[0-9]{9}$/.test(phoneNumber)) {
      setError('لطفاً یک شماره موبایل معتبر ۱۱ رقمی وارد نمایید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }

    if (!password || password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    if (mode === 'register' && (!fullName || fullName.trim().length < 3)) {
      setError('نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(phoneNumber, password);
      } else {
        await register(fullName, phoneNumber, password, email || undefined);
      }
    } catch (err: any) {
      setError(err.message || 'خطایی در پردازش رخ داد. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog (White, Yellow, Soft Blue) */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 text-right shadow-2xl z-10 transition-all">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="بستن"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-soft-yellow">
            <Flame className="h-5 w-5 fill-slate-950" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              LUMIX <span className="text-amber-500">SPORT</span>
            </h3>
            <span className="text-[11px] font-medium text-slate-500">
              ورود به باشگاه مشتریان و پیگیری سفارش‌ها
            </span>
          </div>
        </div>

        {/* Tab Toggle (White/Soft Blue Glass) */}
        <div className="flex rounded-2xl bg-sky-50/70 p-1 mb-6 border border-sky-100 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 rounded-xl py-2.5 transition-all ${
              mode === 'login'
                ? 'bg-amber-400 text-slate-950 shadow-soft-yellow font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ورود به حساب
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 rounded-xl py-2.5 transition-all ${
              mode === 'register'
                ? 'bg-amber-400 text-slate-950 shadow-soft-yellow font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ثبت‌نام سریع
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Only for Register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام و نام خانوادگی:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: سامان راد"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none"
                />
                <User className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              شماره تلفن همراه:
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                dir="ltr"
                placeholder="09123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-10 text-xs font-bold text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none text-left"
              />
              <Phone className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Email (Optional, for Register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                آدرس ایمیل (اختیاری):
              </label>
              <div className="relative">
                <input
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none text-left"
                />
                <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رمز عبور:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                dir="ltr"
                placeholder="حداقل ۶ کاراکتر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-10 text-xs font-bold text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none text-left"
              />
              <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-500 hover:to-amber-600 transition-all disabled:opacity-50 mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                <span>در حال اعتبارسنجی...</span>
              </>
            ) : mode === 'login' ? (
              <span>ورود به حساب کاربری</span>
            ) : (
              <span>عضویت در لومیکس اسپرت</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
