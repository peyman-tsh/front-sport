'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  fetchAdminDashboard,
  fetchAdminInventory,
  updateAdminProductStock,
  adjustAdminProductStock,
  fetchAdminOrders,
  updateAdminOrderStatus,
  fetchAdminUsers,
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminCategories,
  createAdminCategory,
  deleteAdminCategory,
} from '../../lib/api';
import {
  ShieldAlert,
  Boxes,
  ShoppingBag,
  Users,
  Layers,
  Flame,
  Plus,
  TrendingUp,
  Loader2,
  RefreshCw,
  LogOut,
  Sliders,
} from 'lucide-react';

import { AdminOverviewTab } from '../../components/admin/AdminOverviewTab';
import { AdminInventoryTab } from '../../components/admin/AdminInventoryTab';
import { AdminProductsTab } from '../../components/admin/AdminProductsTab';
import { AdminCategoriesTab } from '../../components/admin/AdminCategoriesTab';
import { AdminOrdersTab } from '../../components/admin/AdminOrdersTab';
import { AdminUsersTab } from '../../components/admin/AdminUsersTab';
import { EditStockModal } from '../../components/admin/EditStockModal';
import { AddProductModal } from '../../components/admin/AddProductModal';
import { AddCategoryModal } from '../../components/admin/AddCategoryModal';

function AdminPanelContent() {
  const { user, token, isAuthenticated, isLoading: authLoading, logout, openAuthModal } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filters & Modals
  const [invSearch, setInvSearch] = useState('');
  const [invFilter, setInvFilter] = useState<'all' | 'low' | 'out'>('all');
  const [stockModalProduct, setStockModalProduct] = useState<any | null>(null);
  const [newStockInput, setNewStockInput] = useState<number>(0);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Forms
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    brand: 'K&N',
    category: 'سیستم اگزوز و مکش',
    price: 1500000,
    originalPrice: 1800000,
    stock: 15,
    material: 'استیل ۳۰۴',
    warrantyMonths: 12,
    shortDescription: 'توضیحات کوتاه قطعه اسپرت',
    description: 'توضیحات کامل و تخصصی قطعه برای سئو',
    images: ['https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'],
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    icon: 'Flame',
    description: '',
    accentColor: '#F59E0B',
  });

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'overview');
  }, [searchParams]);

  useEffect(() => {
    if (token && user?.role === 'ADMIN') {
      loadAllAdminData();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [token, user, authLoading]);

  const loadAllAdminData = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [dash, inv, ords, usrs, cats] = await Promise.all([
        fetchAdminDashboard(token).catch(() => null),
        fetchAdminInventory(token).catch(() => null),
        fetchAdminOrders(token).catch(() => ({ data: [] })),
        fetchAdminUsers(token).catch(() => ({ data: [] })),
        fetchAdminCategories(token).catch(() => []),
      ]);

      setDashboardData(dash);
      setInventoryData(inv);
      setOrders(ords?.data || ords || []);
      setUsersList(usrs?.data || usrs || []);
      setCategoriesList(cats || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری اطلاعات پنل مدیریت');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdjustStock = async (productId: string, delta: number) => {
    if (!token) return;
    try {
      await adjustAdminProductStock(token, productId, delta);
      setSuccessMsg('موجودی انبار با موفقیت به‌روزرسانی شد.');
      const [inv, dash] = await Promise.all([
        fetchAdminInventory(token, {
          lowStockOnly: invFilter === 'low',
          outOfStockOnly: invFilter === 'out',
          search: invSearch,
        }),
        fetchAdminDashboard(token),
      ]);
      setInventoryData(inv);
      setDashboardData(dash);
    } catch (err: any) {
      setError(err.message || 'خطا در تغییر موجودی انبار');
    }
  };

  const handleSaveStockModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !stockModalProduct) return;
    try {
      await updateAdminProductStock(token, stockModalProduct.id, Number(newStockInput));
      setStockModalProduct(null);
      setSuccessMsg(`موجودی کالا با موفقیت به ${newStockInput} عدد تغییر یافت.`);
      const [inv, dash] = await Promise.all([
        fetchAdminInventory(token),
        fetchAdminDashboard(token),
      ]);
      setInventoryData(inv);
      setDashboardData(dash);
    } catch (err: any) {
      setError(err.message || 'خطا در به‌روزرسانی موجودی');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await createAdminProduct(token, productForm);
      setIsAddProductOpen(false);
      setSuccessMsg('محصول جدید با موفقیت به انبار اضافه شد.');
      await loadAllAdminData();
    } catch (err: any) {
      setError(err.message || 'خطا در افزودن محصول');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!token) return;
    if (!confirm('آیا از حذف این قطعه از انبار و فروشگاه اطمینان دارید؟')) return;
    try {
      await deleteAdminProduct(token, productId);
      setSuccessMsg('محصول با موفقیت حذف شد.');
      await loadAllAdminData();
    } catch (err: any) {
      setError(err.message || 'خطا در حذف محصول');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await createAdminCategory(token, categoryForm);
      setIsAddCategoryOpen(false);
      setCategoryForm({ name: '', slug: '', icon: 'Flame', description: '', accentColor: '#F59E0B' });
      setSuccessMsg('دسته‌بندی جدید با موفقیت ایجاد شد.');
      const updatedCats = await fetchAdminCategories(token);
      setCategoriesList(updatedCats);
    } catch (err: any) {
      setError(err.message || 'خطا در ایجاد دسته‌بندی');
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!token) return;
    if (!confirm(`آیا از حذف دسته‌بندی "${name}" اطمینان دارید؟`)) return;
    try {
      await deleteAdminCategory(token, id);
      setSuccessMsg(`دسته‌بندی "${name}" با موفقیت حذف شد.`);
      const updatedCats = await fetchAdminCategories(token);
      setCategoriesList(updatedCats);
    } catch (err: any) {
      setError(err.message || 'خطا در حذف دسته‌بندی');
    }
  };

  const handleSearchInventory = async () => {
    if (!token) return;
    try {
      const inv = await fetchAdminInventory(token, {
        lowStockOnly: invFilter === 'low',
        outOfStockOnly: invFilter === 'out',
        search: invSearch,
      });
      setInventoryData(inv);
    } catch (err: any) {
      setError(err.message || 'خطا در فیلتر انبار');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-amber-500" />
        <span className="text-xs font-bold text-slate-600">در حال اتصال به پایگاه داده انبارداری...</span>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 text-right">
        <div className="max-w-md w-full rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-card-light space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">دسترسی غیرمجاز به پنل مدیریت</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            این بخش اختصاصی مدیران ارشد سیستم و انبارداری لومیکس اسپرت است. لطفاً با حساب کاربری مدیر وارد شوید.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full rounded-xl bg-amber-400 py-3 text-xs font-black text-slate-950 shadow-soft-yellow hover:bg-amber-500"
            >
              ورود به حساب کاربری مدیریت
            </button>
            <Link
              href="/"
              className="w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 pt-8 text-right">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-soft-yellow">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">پیشخوان مدیریت و انبارداری</h1>
                <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900">
                  مدیر: {user?.fullName || 'علی تقی تاش'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                کنترل موجودی انبار قطعات، افزودن محصول، دسته‌بندی‌ها و پیگیری سفارشات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllAdminData}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>به‌روزرسانی</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
            >
              <LogOut className="h-4 w-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold animate-in fade-in">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-950">✕</button>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold animate-in fade-in">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-rose-700 hover:text-rose-950">✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200/80">
          {[
            { id: 'overview', label: 'نمای کلی و آمار', icon: TrendingUp },
            { id: 'inventory', label: 'انبارداری و موجودی', icon: Boxes },
            { id: 'products', label: 'محصولات و کاتالوگ', icon: Flame },
            { id: 'categories', label: 'دسته‌بندی‌های کاتالوگ', icon: Layers },
            { id: 'orders', label: 'سفارش‌های مشتریان', icon: ShoppingBag },
            { id: 'users', label: 'کاربران و اعضا', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 shadow-soft-yellow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Subcomponents */}
        {activeTab === 'overview' && (
          <AdminOverviewTab
            dashboardData={dashboardData}
            inventoryData={inventoryData}
            onNavigateTab={setActiveTab}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
          />
        )}

        {activeTab === 'inventory' && (
          <AdminInventoryTab
            inventoryData={inventoryData}
            invSearch={invSearch}
            invFilter={invFilter}
            onSearchChange={setInvSearch}
            onFilterChange={(f) => {
              setInvFilter(f);
              if (token) {
                fetchAdminInventory(token, {
                  lowStockOnly: f === 'low',
                  outOfStockOnly: f === 'out',
                  search: invSearch,
                }).then(setInventoryData);
              }
            }}
            onSearchSubmit={handleSearchInventory}
            onQuickAdjust={handleQuickAdjustStock}
            onOpenEditStockModal={(prod) => {
              setStockModalProduct(prod);
              setNewStockInput(prod.stock);
            }}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
          />
        )}

        {activeTab === 'products' && (
          <AdminProductsTab
            products={inventoryData?.items || []}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onDeleteProduct={handleDeleteProduct}
            onOpenEditStock={(prod) => {
              setStockModalProduct(prod);
              setNewStockInput(prod.stock);
            }}
          />
        )}

        {activeTab === 'categories' && (
          <AdminCategoriesTab
            categoriesList={categoriesList}
            onOpenAddCategory={() => setIsAddCategoryOpen(true)}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrdersTab
            orders={orders}
            onUpdateStatus={async (orderNumber, status) => {
              if (!token) return;
              try {
                await updateAdminOrderStatus(token, orderNumber, status);
                setSuccessMsg(`وضعیت سفارش ${orderNumber} تغییر کرد.`);
                const ords = await fetchAdminOrders(token);
                setOrders(ords?.data || ords || []);
              } catch (err: any) {
                setError(err.message || 'خطا در تغییر وضعیت');
              }
            }}
          />
        )}

        {activeTab === 'users' && (
          <AdminUsersTab usersList={usersList} />
        )}
      </div>

      {/* Modals */}
      <EditStockModal
        product={stockModalProduct}
        newStockInput={newStockInput}
        onStockInputChange={setNewStockInput}
        onClose={() => setStockModalProduct(null)}
        onSubmit={handleSaveStockModal}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        productForm={productForm}
        categoriesList={categoriesList}
        onFormChange={setProductForm}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={handleCreateProduct}
      />

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        categoryForm={categoryForm}
        onFormChange={setCategoryForm}
        onClose={() => setIsAddCategoryOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      }
    >
      <AdminPanelContent />
    </Suspense>
  );
}
