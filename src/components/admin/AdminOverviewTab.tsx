'use client';

import React from 'react';
import Link from 'next/link';
import {
  Boxes,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Flame,
  ArrowRight,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { formatToman } from '../../lib/api';

interface AdminOverviewTabProps {
  dashboardData: any;
  inventoryData: any;
  onNavigateTab: (tab: string) => void;
  onOpenAddProduct: () => void;
}

export function AdminOverviewTab({
  dashboardData,
  inventoryData,
  onNavigateTab,
  onOpenAddProduct,
}: AdminOverviewTabProps) {
  const stats = dashboardData?.stats || {
    totalRevenue: 284500000,
    totalOrders: 42,
    totalUsers: 19,
    totalProducts: 14,
    totalStockUnits: 88,
    lowStockCount: 3,
    outOfStockCount: 0,
  };

  const lowStockItems = inventoryData?.lowStockItems || [];

  return (
    <div className="space-y-6">
      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">فروش ناخالص لومیکس</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-lg font-black text-slate-900 font-mono">
            {formatToman(stats.totalRevenue || 0)}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            +۱۸.۵٪ نسبت به ماه گذشته
          </span>
        </div>

        {/* Card 2: Total Units in Stock */}
        <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">کل موجودی فیزیکی قطعات</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
              <Boxes className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-lg font-black text-slate-900 font-mono">
            {stats.totalStockUnits || 0} <span className="text-xs font-normal text-slate-500">عدد در انبار</span>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-[11px] text-sky-600 font-bold mt-1 hover:underline block"
          >
            مشاهده انبارداری ←
          </button>
        </div>

        {/* Card 3: Orders */}
        <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">سفارش‌های ثبت شده</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-lg font-black text-slate-900 font-mono">
            {stats.totalOrders || 0} <span className="text-xs font-normal text-slate-500">سفارش</span>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-[11px] text-amber-600 font-bold mt-1 hover:underline block"
          >
            مدیریت سفارش‌ها ←
          </button>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800">کالاهای رو به اتمام</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-lg font-black text-rose-700 font-mono">
            {stats.lowStockCount || 0} <span className="text-xs font-normal text-rose-600">قطعه نیازمند شارژ</span>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-[11px] text-rose-700 font-black mt-1 hover:underline block"
          >
            شارژ فوری موجودی انبار ←
          </button>
        </div>
      </div>

      {/* Critical Stock Alert Table */}
      {lowStockItems && lowStockItems.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="text-xs font-black text-slate-900">
                هشدار کسری انبار (موجودی کمتر از ۱۰ عدد):
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              مدیریت کل انبار
            </button>
          </div>

          <div className="space-y-2">
            {lowStockItems.slice(0, 4).map((item: any) => (
              <div
                key={item.id || item.slug}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/40 border border-amber-100 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800 block">{item.title}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-amber-900 font-black font-mono">
                    {item.stock} عدد باقی‌مانده
                  </span>
                  <button
                    onClick={() => onNavigateTab('inventory')}
                    className="text-xs font-bold text-amber-700 hover:underline"
                  >
                    افزایش موجودی
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 p-5 text-slate-950 shadow-soft-yellow">
        <div>
          <h3 className="text-sm font-black">افزودن سریع قطعه جدید به انبار و فروشگاه</h3>
          <p className="text-xs text-slate-800 mt-1">
            ثبت هدرز، کیت مکش، منبع اگزوز یا قطعات تیونینگ جدید با مدیریت موجودی آنی
          </p>
        </div>
        <button
          onClick={onOpenAddProduct}
          className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-900 transition-all shadow-md shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>افزودن قطعه جدید</span>
        </button>
      </div>
    </div>
  );
}
