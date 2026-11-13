"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminPayment } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PaymentDetailsDrawer } from "@/components/admin/PaymentDetailsDrawer";
import {
  CreditCard,
  DollarSign,
  Search,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const {
    payments,
    paymentMetrics,
    refundPayment,
    isLoaded,
  } = useAdminData();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // Filtered payments list
  const filteredPayments = useMemo(() => {
    let list = [...payments];

    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.clientName.toLowerCase().includes(q) ||
          p.clientEmail.toLowerCase().includes(q) ||
          p.bookingNumber.toLowerCase().includes(q) ||
          (p.helcimTransactionId && p.helcimTransactionId.toLowerCase().includes(q))
      );
    }

    // Sort by payment date descending (most recent first)
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return list;
  }, [payments, statusFilter, searchQuery]);

  const selectedPayment = useMemo(() => {
    if (!selectedPaymentId) return null;
    return payments.find((p) => p.id === selectedPaymentId) || null;
  }, [payments, selectedPaymentId]);

  const handleRefund = async (id: string, amount: number, type: "full" | "partial") => {
    await refundPayment(id, amount, type);
  };

  const tabs = [
    { id: "all", label: "All Payments", count: payments.length },
    { id: "paid", label: "Paid", count: payments.filter((p) => p.status === "paid").length },
    { id: "refunded", label: "Refunded", count: payments.filter((p) => p.status === "refunded").length },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Payments
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Audit trail of client payments, Helcim transaction IDs, and settlement records.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
          <span className="font-medium text-stone-700">Helcim Integration:</span>
          <span className="text-stone-500 font-medium">Not Connected</span>
        </div>
      </div>

      {/* TOP FOUR KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* KPI 1: THIS MONTH */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            This Month
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            ${paymentMetrics.thisMonth.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500 font-medium mt-1">Successful payments</p>
        </div>

        {/* KPI 2: PAID SESSIONS */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Paid Sessions
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {paymentMetrics.paidSessions}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Confirmed paid bookings</p>
        </div>

        {/* KPI 3: TOTAL REFUNDED */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Total Refunded
          </span>
          <div className="text-2xl font-bold text-rose-700 font-mono">
            ${paymentMetrics.totalRefunded.toLocaleString()}
          </div>
          <p className="text-[11px] text-rose-600 font-medium mt-1">Returned to clients</p>
        </div>

        {/* KPI 4: NET REVENUE */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Net Revenue
          </span>
          <div className="text-2xl font-bold text-emerald-800 font-mono">
            ${paymentMetrics.netRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Payments less refunds</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        {/* Status Tabs: All Payments, Paid, Refunded */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900 font-medium"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono font-bold ${
                    isActive
                      ? "bg-[#0B2A4A]/10 text-[#0B2A4A]"
                      : "bg-stone-200/70 text-stone-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, booking # or Helcim ID..."
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
              {!isLoaded ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    Loading payments...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    No payment records found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPaymentId(p.id)}
                    className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                  >
                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                        {p.clientName}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {p.clientEmail}
                      </div>
                    </td>

                    {/* Booking */}
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-700">
                      {p.bookingNumber}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600" suppressHydrationWarning>
                      {new Date(p.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-stone-900">
                      <div>${p.amount}.00</div>
                      {p.status === "partially_refunded" && (
                        <div className="text-[10px] text-amber-700 font-normal">
                          Net: ${p.netAmount}
                        </div>
                      )}
                      {p.status === "refunded" && (
                        <div className="text-[10px] text-rose-600 font-normal">
                          Refunded
                        </div>
                      )}
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
                          setSelectedPaymentId(p.id);
                        }}
                        className="px-3 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
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
        {!isLoaded ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading payments...
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No payments found.
          </div>
        ) : (
          filteredPayments.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPaymentId(p.id)}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2.5 active:bg-stone-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-stone-900 text-sm">{p.clientName}</div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5" suppressHydrationWarning>
                    {p.bookingNumber} · {new Date(p.date).toLocaleDateString("en-US")}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono">
                  {p.cardBrand || "Visa"} •••• {p.cardLast4 || "4242"}
                </span>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    ${p.amount}.00
                  </span>
                  {p.status === "partially_refunded" && (
                    <span className="block text-[10.5px] text-amber-700 font-mono">
                      Net: ${p.netAmount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAYMENT DETAILS COMPACT DRAWER */}
      <PaymentDetailsDrawer
        payment={selectedPayment}
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPaymentId(null)}
        onRefund={handleRefund}
      />
    </div>
  );
}
