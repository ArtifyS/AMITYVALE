"use client";

import React, { useState, useEffect } from "react";
import { AdminPayment, PaymentMetrics } from "@/lib/admin/types";
import { getPayments, getPaymentMetrics } from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PaymentDetailsDrawer } from "@/components/admin/PaymentDetailsDrawer";
import {
  CreditCard,
  DollarSign,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [metrics, setMetrics] = useState<PaymentMetrics>({
    thisMonth: 3250,
    paidSessions: 14,
    pendingCount: 2,
    refundedAmount: 190,
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<AdminPayment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [metricsData, paymentsData] = await Promise.all([
        getPaymentMetrics(),
        getPayments({
          status: statusFilter,
          search: searchQuery,
        }),
      ]);
      setMetrics(metricsData);
      setPayments(paymentsData);
      setLoading(false);
    }
    load();
  }, [statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Payments
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Audit trail of client payments, Stripe transaction IDs, and settlement records.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stripe Connect Integration Ready</span>
        </div>
      </div>

      {/* TOP PAYMENT METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* This Month */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            This Month
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            ${metrics.thisMonth.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Net settled volume</p>
        </div>

        {/* Paid Sessions */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Paid Sessions
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {metrics.paidSessions}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Confirmed client sessions</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Pending
          </span>
          <div className="text-2xl font-bold text-amber-700 font-mono">
            {metrics.pendingCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Awaiting settlement</p>
        </div>

        {/* Refunded */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Refunded
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            ${metrics.refundedAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Cancellation policies met</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
          {[
            { id: "all", label: "All Payments" },
            { id: "paid", label: "Paid" },
            { id: "pending", label: "Pending" },
            { id: "refunded", label: "Refunded" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client or booking #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
          />
        </div>
      </div>

      {/* PAYMENTS TABLE (DESKTOP) */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Booking</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    Loading payments...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPayment(p)}
                    className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                  >
                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                        {p.clientName}
                      </div>
                      <div className="text-[11px] text-stone-400">{p.clientEmail}</div>
                    </td>

                    {/* Booking */}
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-700">
                      {p.bookingNumber}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                      {new Date(p.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-stone-900">
                      ${p.amount}.00
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={p.status} />
                    </td>

                    {/* Method */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-700">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-mono text-[11px]">
                          {p.cardBrand || "Visa"} •••• {p.cardLast4 || "4242"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPayment(p);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE LIST VIEW (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-2.5">
        {loading ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading payments...
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No payments found.
          </div>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPayment(p)}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2 active:bg-stone-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">{p.clientName}</div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                    {p.bookingNumber} · {new Date(p.date).toLocaleDateString()}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono">
                  {p.cardBrand || "Visa"} •••• {p.cardLast4 || "4242"}
                </span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  ${p.amount}.00
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAYMENT DETAILS COMPACT DRAWER */}
      <PaymentDetailsDrawer
        payment={selectedPayment}
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
