'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  fetchCustomerDashboard,
  fetchCustomerOrders,
  updateCustomerProfile,
  addCustomerAddress,
  deleteCustomerAddress,
  formatToman,
  FALLBACK_PRODUCTS,
} from '../../lib/api';
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Flame,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  CreditCard,
  Truck,
  ChevronLeft,
  Loader2,
  Car,
  Shield,
  ArrowRight,
} from 'lucide-react';

function CustomerDashboardContent() {
  const { user, token, isAuthenticated, isLoading: authLoading, logout, openAuthModal } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Address Modal State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phoneNumber: '',
    province: 'تهران',
    city: 'تهران',
    postalAddress: '',
    postalCode: '',
  });

  // Settings State
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'overview');
  }, [searchParams]);

  useEffect(() => {
    if (token) {
      loadData();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [token, authLoading]);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [dash, ords] = await Promise.all([
        fetchCustomerDashboard(token).catch(() => null),
        fetchCustomerOrders(token).catch(() => []),
      ]);

      if (dash) {
        setDashboardData(dash);
        setProfileName(dash.user?.fullName || '');
        setProfileEmail(dash.user?.email || '');
      }
      setOrders(ords || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری اطلاعات پنل');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSavingProfile(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await updateCustomerProfile(token, {
        fullName: profileName,
        email: profileEmail || undefined,
      });
      setSuccessMessage('مشخصات کاربری با موفقیت به‌روزرسانی شد.');
      await loadData();
    } catch (err: any) {
      setError(err.message || 'خطا در ذخیره تغییرات');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await addCustomerAddress(token, addressForm);
      setIsAddAddressOpen(false);
      setAddressForm({
        fullName: '',
        phoneNumber: '',
        province: 'تهران',
        city: 'تهران',
        postalAddress: '',
        postalCode: '',
      });
      setSuccessMessage('آدرس جدید به دفترچه آدرس‌ها اضافه شد.');
      await loadData();
    } catch (err: any) {
      setError(err.message || 'خطا در ثبت آدرس جدید');
    }
  };

  const handleDeleteAddress = async (index: number) => {
    if (!token) return;
    if (!confirm('آیا از حذف این آدرس اطمینان دارید؟')) return;
    try {
      await deleteCustomerAddress(token, index);
      setSuccessMessage('آدرس با موفقیت حذف شد.');
      await loadData();
    } catch (err: any) {
      setError(err.message || 'خطا در حذف آدرس');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="text-xs font-bold text-slate-600">در حال فراخوانی اطلاعات پنل کاربری...</span>
      </div>
    );
  }

  // Guest State - Prompt Login
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-sky-100 bg-white p-8 text-center shadow-card-light">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mb-4 shadow-sm">
            <User className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">ورود به پنل کاربری لومیکس اسپرت</h2>
          <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
            برای دسترسی به سوابق سفارش‌ها، آدرس‌های ثبت‌شده و اطلاعات کاربری، لطفاً وارد حساب خود شوید یا ثبت‌نام کنید.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-500 hover:to-amber-600 transition-all"
            >
              ورود به حساب کاربری
            </button>
            <Link
              href="/products"
              className="w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalOrders: orders.length,
    totalSpent: 0,
    activeOrdersCount: 0,
    savedAddressesCount: dashboardData?.savedAddresses?.length || 0,
    favoritesCount: dashboardData?.favoriteProductIds?.length || 0,
  };

  const savedAddresses = dashboardData?.savedAddresses || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 text-right text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-amber-600 transition-colors">صفحه اصلی</Link>
          <span>/</span>
          <span className="text-slate-800">پنل مدیریت حساب کاربری</span>
        </nav>

        {/* Global Notifications */}
        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 shadow-sm">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Right Column: User Panel Sidebar Navigation */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              
              {/* Profile Card Header */}
              <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-card-light text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black text-2xl shadow-soft-yellow">
                  {user.fullName ? user.fullName.charAt(0) : 'U'}
                  <div className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-sky-200 text-emerald-600 shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>

                <h2 className="mt-3 text-base font-black text-slate-900">{user.fullName}</h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5" dir="ltr">{user.phoneNumber}</p>

                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-800">
                  <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{user.role === 'ADMIN' ? 'مدیر ارشد لومیکس اسپرت' : 'عضو طلایی باشگاه مشتریان'}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-card-light space-y-1">
                {[
                  { id: 'overview', label: 'پیشخوان و آمار', icon: Flame },
                  { id: 'orders', label: 'سفارش‌های من', icon: ShoppingBag, badge: orders.length },
                  { id: 'addresses', label: 'دفترچه آدرس‌ها', icon: MapPin, badge: savedAddresses.length },
                  { id: 'favorites', label: 'لیست علاقه‌مندی‌ها', icon: Heart, badge: stats.favoritesCount },
                  { id: 'settings', label: 'تنظیمات حساب کاربری', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSuccessMessage(null);
                        setError(null);
                      }}
                      className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 shadow-soft-yellow font-black'
                          : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge !== 'undefined' && item.badge > 0 && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                            isActive ? 'bg-slate-950 text-white' : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100 mt-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خروج از حساب</span>
                </button>
              </div>

            </div>
          </aside>

          {/* Left Column: Tab Views */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Greeting Banner */}
                <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-l from-amber-400 via-amber-300 to-amber-100 p-6 sm:p-8 text-slate-950 shadow-soft-yellow">
                  <div className="relative z-10 max-w-xl">
                    <span className="inline-block rounded-full bg-slate-950 px-3 py-1 text-[11px] font-bold text-amber-300 mb-2">
                      خوش آمدید به پنل لومیکس اسپرت
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
                      سلام، {user.fullName}!
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                      از این بخش می‌توانید وضعیت بسته‌های ارسالی، آدرس‌های تحویل کالا، فاکتورها و قطعات سازگار با خودروی خود را مدیریت کنید.
                    </p>
                  </div>
                  <Flame className="absolute -bottom-8 left-4 h-44 w-44 text-amber-500/30 pointer-events-none" />
                </div>

                {/* 4 Stat Metric Cards (Yellow, Soft Blue, White) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm text-right">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 mb-2">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 block">کل سفارش‌ها</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {stats.totalOrders}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm text-right">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-600 mb-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 block">در جریان آماده‌سازی</span>
                    <span className="text-2xl font-black text-sky-700 mt-1 block">
                      {stats.activeOrdersCount}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm text-right">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-600 mb-2">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 block">آدرس‌های ثبت‌شده</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {stats.savedAddressesCount}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm text-right">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 mb-2">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 block">مجموع خریدها</span>
                    <span className="text-lg font-black text-amber-600 mt-1 block truncate">
                      {formatToman(stats.totalSpent)}
                    </span>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-card-light">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-amber-500" />
                      <h3 className="text-sm font-black text-slate-900">آخرین سفارش‌های ثبت‌شده</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-sky-700 hover:underline"
                    >
                      مشاهده همه ({orders.length}) ←
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-8 text-center text-slate-500">
                      <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">هنوز سفارشی ثبت نکرده‌اید</p>
                      <Link
                        href="/products"
                        className="mt-3 inline-block rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-soft-yellow"
                      >
                        مشاهده کاتالوگ قطعات اسپرت
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.orderNumber} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs text-slate-900">
                                {order.orderNumber}
                              </span>
                              <span className="rounded-lg bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                                {order.status === 'PAID' ? 'پرداخت شده' : order.status === 'PENDING' ? 'در انتظار پرداخت' : order.status === 'PROCESSING' ? 'در حال آماده‌سازی' : order.status === 'SHIPPED' ? 'تحویل تیپاکس' : order.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {order.items?.length || 1} قلم کالا • تحویل به: {order.shippingAddress?.fullName} ({order.shippingAddress?.city})
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-black text-sm text-amber-600">
                              {formatToman(order.totalAmount)}
                            </span>
                            <Link
                              href={`/checkout/verify?authority=${order.orderNumber}&status=OK`}
                              className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100"
                            >
                              مشاهده فاکتور
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">جستجوی قطعه مناسب خودرو شما</h4>
                      <p className="text-[11px] text-slate-500 mt-1">بررسی سازگاری کیت مکش، اگزوز، تعلیق و هدلایت</p>
                    </div>
                    <Link
                      href="/#car-finder"
                      className="rounded-xl bg-amber-400 p-2.5 text-slate-950 shadow-soft-yellow hover:bg-amber-500"
                    >
                      <Car className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">راهنمای فنی و اصول تیونینگ</h4>
                      <p className="text-[11px] text-slate-500 mt-1">جدول پایه‌ها، کن‌باس و استرس‌بار</p>
                    </div>
                    <Link
                      href="/car-guide"
                      className="rounded-xl bg-sky-100 p-2.5 text-sky-800 hover:bg-sky-200"
                    >
                      <Shield className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">سفارش‌های من ({orders.length})</h3>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-amber-600 hover:underline"
                  >
                    خرید قطعه جدید ←
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="rounded-3xl border border-sky-100 bg-white p-12 text-center text-slate-500 shadow-card-light">
                    <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-slate-800">هیچ سفارشی ثبت نشده است</h4>
                    <p className="text-xs text-slate-500 mt-1">سفارش‌های شما پس از ثبت خرید در اینجا نمایش داده می‌شوند.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderNumber}
                        className="rounded-3xl border border-sky-100 bg-white p-6 shadow-card-light space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-sm text-slate-900 font-mono">
                              #{order.orderNumber}
                            </span>
                            <span className="rounded-xl bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                              {order.status === 'PAID' ? 'پرداخت شده و آماده ارسال' : order.status === 'PROCESSING' ? 'در حال بسته‌بندی در انبار' : order.status === 'SHIPPED' ? 'تحویل پست و تیپاکس' : order.status === 'DELIVERED' ? 'تحویل داده شده' : 'در انتظار پرداخت'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500">
                            ثبت شده در: {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-800 font-black text-[10px]">
                                  {item.quantity}×
                                </span>
                                <span className="font-bold text-slate-800">{item.title}</span>
                              </div>
                              <span className="font-black text-slate-900">
                                {formatToman(item.totalPrice || item.unitPrice * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Delivery Info */}
                        <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Truck className="h-4 w-4 text-sky-600" />
                            <span>
                              ارسال به: {order.shippingAddress?.fullName} ({order.shippingAddress?.city}، {order.shippingAddress?.postalAddress})
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 font-medium">مبلغ کل فاکتور:</span>
                            <span className="text-base font-black text-amber-600">
                              {formatToman(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">دفترچه آدرس‌های ارسال ({savedAddresses.length})</h3>
                  <button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500"
                  >
                    <Plus className="h-4 w-4" />
                    <span>افزودن آدرس جدید</span>
                  </button>
                </div>

                {savedAddresses.length === 0 ? (
                  <div className="rounded-3xl border border-sky-100 bg-white p-12 text-center text-slate-500 shadow-card-light">
                    <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-slate-800">هنوز آدرسی ثبت نکرده‌اید</h4>
                    <p className="text-xs text-slate-500 mt-1">با ثبت آدرس، در خریدهای بعدی سریع‌تر سفارش خود را تکمیل خواهید کرد.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedAddresses.map((addr: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-3xl border border-sky-100 bg-white p-5 shadow-card-light space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">
                            {addr.fullName}
                          </span>
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="حذف آدرس"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          استان {addr.province}، شهر {addr.city}، {addr.postalAddress}
                        </p>

                        <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>کد پستی: {addr.postalCode}</span>
                          <span>تماس: {addr.phoneNumber}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Address Dialog Modal */}
                {isAddAddressOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                      onClick={() => setIsAddAddressOpen(false)}
                    />
                    <div className="relative w-full max-w-lg rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 text-right shadow-2xl z-10">
                      <h3 className="text-base font-black text-slate-900 mb-4">افزودن آدرس پستی جدید</h3>
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">نام تحویل‌گیرنده:</label>
                            <input
                              type="text"
                              required
                              value={addressForm.fullName}
                              onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-400 focus:bg-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">شماره تماس:</label>
                            <input
                              type="tel"
                              required
                              dir="ltr"
                              value={addressForm.phoneNumber}
                              onChange={(e) => setAddressForm({ ...addressForm, phoneNumber: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-left focus:border-amber-400 focus:bg-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">استان:</label>
                            <input
                              type="text"
                              required
                              value={addressForm.province}
                              onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-400 focus:bg-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">شهر:</label>
                            <input
                              type="text"
                              required
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-400 focus:bg-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">نشانی دقیق پستی:</label>
                          <textarea
                            required
                            rows={3}
                            value={addressForm.postalAddress}
                            onChange={(e) => setAddressForm({ ...addressForm, postalAddress: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium focus:border-amber-400 focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">کد پستی ۱۰ رقمی:</label>
                          <input
                            type="text"
                            required
                            dir="ltr"
                            maxLength={10}
                            value={addressForm.postalCode}
                            onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-left focus:border-amber-400 focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsAddAddressOpen(false)}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                          >
                            انصراف
                          </button>
                          <button
                            type="submit"
                            className="rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500"
                          >
                            ذخیره آدرس
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: FAVORITES */}
            {activeTab === 'favorites' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">لیست قطعات نشان‌شده (Wishlist)</h3>
                  <Link href="/products" className="text-xs font-bold text-amber-600 hover:underline">
                    مشاهده سایر قطعات ←
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {FALLBACK_PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.slug}
                      className="rounded-3xl border border-sky-100 bg-white p-4 shadow-card-light space-y-3"
                    >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                        <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        <Link href={`/products/${prod.slug}`} className="hover:text-amber-600">
                          {prod.title}
                        </Link>
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-black text-xs text-amber-600">{formatToman(prod.price)}</span>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="rounded-xl bg-amber-400 px-3 py-1.5 text-[11px] font-black text-slate-950 shadow-soft-yellow"
                        >
                          خرید سریع
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-card-light space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900">تنظیمات حساب کاربری</h3>
                  <p className="text-xs text-slate-500 mt-1">مشخصات هویتی و اطلاعات تماس خود را در این بخش ویرایش کنید.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">شماره تلفن همراه (تایید شده):</label>
                    <input
                      type="tel"
                      disabled
                      dir="ltr"
                      value={user.phoneNumber}
                      className="w-full rounded-xl border border-slate-200 bg-slate-100 p-3 text-xs font-bold text-slate-500 text-left cursor-not-allowed"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">تغییر شماره همراه تنها از طریق تماس با پشتیبانی امکان‌پذیر است.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">آدرس ایمیل:</label>
                    <input
                      type="email"
                      dir="ltr"
                      placeholder="name@example.com"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold text-left focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:from-amber-500 hover:to-amber-600 transition-all disabled:opacity-50 mt-4"
                  >
                    {isSavingProfile ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>در حال ذخیره...</span>
                      </>
                    ) : (
                      <span>ذخیره تغییرات حساب</span>
                    )}
                  </button>
                </form>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          <span className="text-xs font-bold text-slate-600">در حال بارگذاری پنل کاربری لومیکس اسپرت...</span>
        </div>
      }
    >
      <CustomerDashboardContent />
    </React.Suspense>
  );
}
