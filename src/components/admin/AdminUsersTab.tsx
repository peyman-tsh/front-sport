'use client';

import React from 'react';
import { Users, ShieldCheck, User } from 'lucide-react';

interface AdminUsersTabProps {
  usersList: any[];
}

export function AdminUsersTab({ usersList }: AdminUsersTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
        <div>
          <h3 className="text-sm font-black text-slate-900">کاربران و مشتریان عضو</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            تعداد کل کاربران ثبت‌نامی در سامانه: {usersList.length} نفر
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sky-50/70 border-b border-sky-100 text-slate-700 font-black">
              <tr>
                <th className="py-3 px-4">کاربر</th>
                <th className="py-3 px-4">شماره تماس</th>
                <th className="py-3 px-4 text-center">نقش کاربری</th>
                <th className="py-3 px-4 text-center">تاریخ عضویت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {usersList.map((u: any) => (
                <tr key={u._id || u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                        {u.fullName?.charAt(0) || 'U'}
                      </div>
                      <span className="font-bold text-slate-900">{u.fullName || 'کاربر سیستم'}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {u.phoneNumber}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {u.role === 'ADMIN' ? 'مدیر ارشد لومیکس' : 'مشتری رسمی'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center font-mono text-slate-500 text-[11px]">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('fa-IR') : '-'}
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
