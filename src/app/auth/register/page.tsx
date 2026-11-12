'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { Flame, Phone, Lock, User, Mail, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || fullName.trim().length < 3) {
      setError('نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.');
      return;
    }

    if (!phoneNumber || !/^09[0-9]{9}$/.test(phoneNumber)) {
      setError('لطفاً شماره همراه معتبر ۱۱ رقمی وارد نمایید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }

    if (!password || password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(fullName, phoneNumber, password, email || undefined);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'خطا در ثبت‌نام');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-sky-100 bg-white p-8 text-right shadow-card-light">
        
        {/* Brand */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-soft-yellow mb-3">
            <Flame className="h-6 w-6 fill-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">عضویت در لومیکس اسپرت</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            ایجاد حساب کاربری جهت ثبت آسان سفارش و دریافت تخفیف‌های ویژه
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">نام و نام خانوادگی:</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="مثال: آرمان مرادی"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-10 text-xs font-bold text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none"
              />
              <User className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">شماره تلفن همراه:</label>
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">ایمیل (اختیاری):</label>
            <div className="relative">
              <input
                type="email"
                dir="ltr"
                placeholder="arman@tuning.ir"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none text-left"
              />
              <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">رمز عبور:</label>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-500 hover:to-amber-600 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                <span>در حال ثبت اطلاعات...</span>
              </>
            ) : (
              <span>تکمیل ثبت‌نام و ورود</span>
            )}
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center">
          <p className="text-xs text-slate-500">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link href="/auth/login" className="font-bold text-amber-600 hover:underline">
              وارد شوید
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
