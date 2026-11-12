'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  ThumbsUp,
  CheckCircle,
  Plus,
  X,
  MessageSquare,
  ShieldCheck,
  Send,
  Sparkles,
  Award,
  Filter,
  Car,
  ChevronDown,
} from 'lucide-react';
import {
  ReviewItem,
  ReviewSummary,
  fetchProductReviews,
  fetchProductReviewSummary,
  submitProductReview,
} from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface ProductReviewsSectionProps {
  productId: string;
  productSlug: string;
  productTitle: string;
  initialRating?: number;
  initialReviewsCount?: number;
}

export function ProductReviewsSection({
  productId,
  productSlug,
  productTitle,
  initialRating = 5,
  initialReviewsCount = 0,
}: ProductReviewsSectionProps) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'fiveStar'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  // Review form state
  const [formData, setFormData] = useState({
    customerName: '',
    carModel: '',
    rating: 5,
    cutOffLineScore: 5,
    beamThrowScore: 5,
    fanNoiseScore: 5,
    comment: '',
    advantageInput: '',
    advantages: [] as string[],
    disadvantageInput: '',
    disadvantages: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      setIsLoading(true);
      try {
        const [reviewsRes, summaryRes] = await Promise.all([
          fetchProductReviews(productSlug || productId, 1, 50),
          fetchProductReviewSummary(productSlug || productId),
        ]);

        if (isMounted) {
          setReviews(reviewsRes.data || []);
          setSummary(summaryRes);
        }
      } catch (err) {
        console.error('Error loading reviews:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [productId, productSlug]);

  // Pre-fill user name if logged in
  useEffect(() => {
    if (user?.fullName && !formData.customerName) {
      setFormData((prev) => ({ ...prev, customerName: user.fullName }));
    }
  }, [user]);

  // Add advantage tag
  const handleAddAdvantage = () => {
    if (!formData.advantageInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      advantages: [...prev.advantages, prev.advantageInput.trim()],
      advantageInput: '',
    }));
  };

  // Remove advantage tag
  const handleRemoveAdvantage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      advantages: prev.advantages.filter((_, i) => i !== index),
    }));
  };

  // Add disadvantage tag
  const handleAddDisadvantage = () => {
    if (!formData.disadvantageInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      disadvantages: [...prev.disadvantages, prev.disadvantageInput.trim()],
      disadvantageInput: '',
    }));
  };

  // Remove disadvantage tag
  const handleRemoveDisadvantage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      disadvantages: prev.disadvantages.filter((_, i) => i !== index),
    }));
  };

  // Handle helpful vote click
  const handleHelpfulClick = (reviewId: string) => {
    if (hasVoted[reviewId]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
    setHasVoted((prev) => ({
      ...prev,
      [reviewId]: true,
    }));
  };

  // Submit review handler
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.comment.trim()) {
      setFormError('لطفاً نام و متن نظر خود را وارد فرمایید.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const newReview = await submitProductReview({
        productId: productId || productSlug,
        customerName: formData.customerName.trim(),
        carModel: formData.carModel.trim() || undefined,
        rating: formData.rating,
        cutOffLineScore: formData.cutOffLineScore,
        beamThrowScore: formData.beamThrowScore,
        fanNoiseScore: formData.fanNoiseScore,
        comment: formData.comment.trim(),
        advantages: formData.advantages,
        disadvantages: formData.disadvantages,
      });

      // Optimistic update: Prepend to reviews list
      setReviews((prev) => [newReview, ...prev]);

      // Reset form
      setFormSuccess(true);
      setFormData({
        customerName: user?.fullName || '',
        carModel: '',
        rating: 5,
        cutOffLineScore: 5,
        beamThrowScore: 5,
        fanNoiseScore: 5,
        comment: '',
        advantageInput: '',
        advantages: [],
        disadvantageInput: '',
        disadvantages: [],
      });

      setTimeout(() => {
        setFormSuccess(false);
        setIsFormOpen(false);
      }, 2500);
    } catch (err: any) {
      setFormError(err.message || 'خطا در ثبت نظر. لطفاً مجدداً تلاش نمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate current score values
  const totalCount = reviews.length > 0 ? reviews.length : initialReviewsCount;
  const currentRating =
    reviews.length > 0
      ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1))
      : summary?.averageRating || initialRating;

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'verified') return r.isVerifiedBuyer;
    if (activeFilter === 'fiveStar') return r.rating === 5;
    return true;
  });

  return (
    <section className="mt-12 rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light text-right">
      
      {/* Header & Metrics Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>نظرات تخصصی و واقعی خریداران</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            تجربه رانندگی و بازخورد مشتریان
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مشاهده نظرات، تست عملکرد روی خودروهای مختلف و ثبت تجربیات نصب
          </p>
        </div>

        {/* Big Overall Rating Card & Action */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-gradient-to-r from-amber-50/70 via-sky-50/40 to-white p-4 sm:p-5 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">
              {currentRating}
            </span>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(currentRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-bold block mt-0.5">
                بر اساس {totalCount} نظر ثبت شده
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>{isFormOpen ? 'بستن فرم ثبت نظر' : 'ثبت نظر و تجربه نصب'}</span>
          </button>
        </div>

      </div>

      {/* Expandable Review Form */}
      {isFormOpen && (
        <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/20 p-5 sm:p-7 shadow-sm animate-in fade-in slide-in-from-top-3 duration-200">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                ثبت تجربه شما درباره «{productTitle}»
              </h3>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {formSuccess ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center animate-in fade-in zoom-in-95">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white mb-3">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="text-base font-black text-emerald-900">
                نظر شما با موفقیت ثبت شد!
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                سپاس از به اشتراک‌گذاری تجربه فنی شما با سایر ماشین‌بازان و علاقه‌مندان به تیونینگ.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-5">
              
              {/* Star Rating Selectors */}
              <div className="rounded-xl border border-amber-200 bg-white p-4">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  امتیاز کلی شما به این قطعه: <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= formData.rating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]'
                            : 'fill-slate-100 text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="mr-3 text-xs font-black text-amber-900 font-mono">
                    {formData.rating} از ۵ ستاره
                  </span>
                </div>
              </div>

              {/* Customer Name & Car Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: کیان راد"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    مدل خودرو و تیپ موتور (اختیاری)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: پژو ۲۰۶ تیپ ۵ (TU5) / دنا پلاس"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:outline-none shadow-sm"
                    />
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  متن نظر و تجربه فنی شما <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="تجربه رانندگی، شتاب، صدا، کیفیت متریال ساخت، نحوه نصب و رضایت کلی خود را شرح دهید..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-400 focus:outline-none shadow-sm resize-none"
                />
              </div>

              {/* Advantages (نکات مثبت) */}
              <div>
                <label className="block text-xs font-bold text-emerald-800 mb-1.5">
                  نکات مثبت (مزایا)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="مثال: استیل ۳۰۴ ضدزنگ اصل، صدای بم بدون جیغ"
                    value={formData.advantageInput}
                    onChange={(e) => setFormData({ ...formData, advantageInput: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAdvantage();
                      }
                    }}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-emerald-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddAdvantage}
                    className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                  >
                    افزودن
                  </button>
                </div>

                {formData.advantages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.advantages.map((adv, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-900"
                      >
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        <span>{adv}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAdvantage(idx)}
                          className="text-emerald-700 hover:text-rose-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Disadvantages (نکات منفی) */}
              <div>
                <label className="block text-xs font-bold text-rose-800 mb-1.5">
                  نکات منفی (معایب احتمالی)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="مثال: نیاز به جوشکاری تمیز، بست اختصاصی"
                    value={formData.disadvantageInput}
                    onChange={(e) => setFormData({ ...formData, disadvantageInput: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDisadvantage();
                      }
                    }}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-rose-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDisadvantage}
                    className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100"
                  >
                    افزودن
                  </button>
                </div>

                {formData.disadvantages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.disadvantages.map((dis, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1 text-xs font-medium text-rose-900"
                      >
                        <span>{dis}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDisadvantage(idx)}
                          className="text-rose-700 hover:text-rose-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {formError && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-700">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-300 transition-all disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'در حال ثبت...' : 'ثبت نهایی نظر'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
        <span className="text-xs font-bold text-slate-500 ml-2 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>فیلتر نظرات:</span>
        </span>

        <button
          onClick={() => setActiveFilter('all')}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          همه نظرات ({reviews.length})
        </button>

        <button
          onClick={() => setActiveFilter('verified')}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeFilter === 'verified'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          فقط خریداران تایید شده
        </button>

        <button
          onClick={() => setActiveFilter('fiveStar')}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeFilter === 'fiveStar'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          فقط ۵ ستاره‌ها
        </button>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            در حال دریافت نظرات خریداران...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-700">هنوز نظری در این بخش ثبت نشده است</h4>
            <p className="text-xs text-slate-400 mt-1">
              اولین نفری باشید که تجربه رانندگی و نصب این قطعه را ثبت می‌کند!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-amber-100 border border-amber-300 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>ثبت اولین نظر برای این قطعه</span>
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const revId = rev._id || rev.id || Math.random().toString();
            const votes = helpfulVotes[revId] || 0;
            const voted = hasVoted[revId] || false;

            return (
              <div
                key={revId}
                className="rounded-2xl border border-slate-100 bg-slate-50/40 p-5 hover:border-amber-200 hover:bg-white transition-all shadow-sm"
              >
                {/* Author Info & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-900 font-black text-xs">
                      {rev.customerName ? rev.customerName.charAt(0) : 'ک'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {rev.customerName}
                        </span>
                        {rev.isVerifiedBuyer && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            <CheckCircle className="h-3 w-3" />
                            <span>خریدار تایید شده</span>
                          </span>
                        )}
                      </div>

                      {rev.carModel && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                          <Car className="h-3 w-3 text-sky-600" />
                          <span>نصب شده روی: {rev.carModel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stars Badge */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3.5 w-3.5 ${
                            s <= rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {rev.comment}
                </p>

                {/* Pros & Cons */}
                {((rev.advantages && rev.advantages.length > 0) ||
                  (rev.disadvantages && rev.disadvantages.length > 0)) && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {rev.advantages && rev.advantages.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-emerald-800 block">
                          نکات مثبت:
                        </span>
                        {rev.advantages.map((adv, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-600">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{adv}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {rev.disadvantages && rev.disadvantages.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-rose-800 block">
                          نکات منفی:
                        </span>
                        {rev.disadvantages.map((dis, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-600">
                            <span className="text-rose-500 font-bold">✕</span>
                            <span>{dis}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful Vote Footer */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">لومیکس اسپرت • بازخورد تایید شده فنی</span>

                  <button
                    onClick={() => handleHelpfulClick(revId)}
                    disabled={voted}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-colors ${
                      voted
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>مفید بود {votes > 0 ? `(${votes})` : ''}</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
