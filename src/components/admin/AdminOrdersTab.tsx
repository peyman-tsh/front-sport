'use client';

import React from 'react';
import { ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import { formatToman } from '../../lib/api';

interface AdminOrdersTabProps {
  orders: any[];
  onUpdateStatus: (orderNumber: string, status: string) => void;
}

export function AdminOrdersTab({ orders, onUpdateStatus }: AdminOrdersTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
        <div>
          <h3 className="text-sm font-black text-slate-900">سفارش‌های مشتریان لومیکس</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            مجموعاً {orders.length} سفارش در سیستم ثبت گردیده است.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sky-50/70 border-b border-sky-100 text-slate-700 font-black">
              <tr>
                <th className="py-3 px-4">شماره پیگیری</th>
                <th className="py-3 px-4">مشتری</th>
                <th className="py-3 px-4 text-center">تعداد قطعات</th>
                <th className="py-3 px-4 text-center">مبلغ کل</th>
                <th className="py-3 px-4 text-center">وضعیت سفارش</th>
                <th className="py-3 px-4 text-center">تغییر وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {orders.map((ord: any) => (
                <tr key={ord.orderNumber || ord._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">
                    {ord.orderNumber || ord._id}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{ord.shippingAddress?.fullName || 'کاربر مهمان'}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {ord.shippingAddress?.phoneNumber || ord.userId?.phoneNumber || '-'}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-bold">
                    {ord.items?.length || 1} قلم
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-black text-slate-900">
                    {formatToman(ord.totalAmount || 0)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'SHIPPED'
                          ? 'bg-sky-100 text-sky-800'
                          : ord.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {ord.status === 'DELIVERED'
                        ? 'تحویل شده'
                        : ord.status === 'SHIPPED'
                        ? 'ارسال شده با تیپاکس'
                        : ord.status === 'CANCELLED'
                        ? 'لغو شده'
                        : 'در حال پردازش در انبار'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <select
                      value={ord.status}
                      onChange={(e) => onUpdateStatus(ord.orderNumber, e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 focus:border-amber-400 outline-none"
                    >
                      <option value="PROCESSING">در حال پردازش</option>
                      <option value="SHIPPED">ارسال شده</option>
                      <option value="DELIVERED">تحویل شده</option>
                      <option value="CANCELLED">لغو شده</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
