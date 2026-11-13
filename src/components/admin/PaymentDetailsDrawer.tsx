"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminPayment } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import {
  X,
  CreditCard,
  DollarSign,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface PaymentDetailsDrawerProps {
  payment: AdminPayment | null;
  isOpen: boolean;
  onClose: () => void;
  onRefund?: (id: string, refundAmount: number, type: "full" | "partial") => Promise<void>;
}

export function PaymentDetailsDrawer({
  payment,
  isOpen,
  onClose,
  onRefund,
}: PaymentDetailsDrawerProps) {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundType, setRefundType] = useState<"full" | "partial">("full");
  const [partialAmount, setPartialAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [refundError, setRefundError] = useState<string | null>(null);

  if (!isOpen || !payment) return null;

  const currentRefunded = payment.amountRefunded || 0;
  const remainingRefundable = Math.max(0, payment.amount - currentRefunded);
  const canRefund = (payment.status === "paid" || payment.status === "partially_refunded") && remainingRefundable > 0;

  const handleOpenRefund = () => {
    setRefundType("full");
    setPartialAmount(remainingRefundable.toString());
    setRefundError(null);
    setShowRefundModal(true);
  };

  const handleConfirmRefund = async () => {
    if (!onRefund) return;
    setRefundError(null);

    let amountToRefund = remainingRefundable;
    if (refundType === "partial") {
      const parsed = parseFloat(partialAmount);
      if (isNaN(parsed) || parsed <= 0) {
        setRefundError("Please enter a valid refund amount greater than $0.");
        return;
      }
      if (parsed > remainingRefundable) {
        setRefundError(`Maximum refundable amount is $${remainingRefundable}.00.`);
        return;
      }
      amountToRefund = parsed;
    }

    try {
      setIsProcessing(true);
      await onRefund(payment.id, amountToRefund, refundType);
      setIsProcessing(false);
      setShowRefundModal(false);
    } catch (e: any) {
      setIsProcessing(false);
      setRefundError(e?.message || "Failed to process refund. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <div
            className="w-screen max-w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/80 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-medium text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {payment.bookingNumber}
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight mt-1.5 font-mono">
                  ${payment.amount}.00 {payment.currency}
                </h2>
                {payment.status === "partially_refunded" && (
                  <p className="text-[11px] text-amber-700 font-mono mt-0.5">
                    Refunded: ${payment.amountRefunded} · Net: ${payment.netAmount}
                  </p>
                )}
                {payment.status === "refunded" && (
                  <p className="text-[11px] text-rose-700 font-mono mt-0.5">
                    Fully refunded to client · Net: $0.00
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              {/* CLIENT CARD */}
              <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Client Information
                  </span>
                  <Link
                    href={payment.clientId ? `/admin/clients/${payment.clientId}` : `/admin/clients`}
                    className="text-[11px] font-semibold text-[#0B2A4A] hover:text-[#FF5A4F] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="font-semibold text-stone-900 text-sm">
                  {payment.clientName}
                </div>
                <div className="text-stone-500 font-mono text-[11px]">
                  {payment.clientEmail}
                </div>
              </div>

              {/* SETTLEMENT ITEMIZATION */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-100 pb-2">
                  Payment Summary
                </span>

                <div className="space-y-2 font-mono text-[11.5px]">
                  <div className="flex justify-between text-stone-600">
                    <span>Base Session Rate:</span>
                    <span className="font-semibold text-stone-900">
                      ${payment.basePrice || payment.amount - (payment.additionalFee || 0)}.00
                    </span>
                  </div>

                  {payment.additionalFee > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Additional Participant Fees:</span>
                      <span className="font-semibold text-stone-900">
                        +${payment.additionalFee}.00
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-stone-200 font-sans font-bold text-stone-900 text-xs">
                    <span>Total Charged:</span>
                    <span className="font-mono text-sm">${payment.amount}.00 USD</span>
                  </div>

                  {currentRefunded > 0 && (
                    <>
                      <div className="flex justify-between text-rose-700 pt-1 text-xs">
                        <span>Total Refunded:</span>
                        <span className="font-mono font-semibold">-${currentRefunded}.00</span>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-stone-100 text-xs">
                        <span>Net Settled Volume:</span>
                        <span className="font-mono text-sm">${payment.netAmount ?? (payment.amount - currentRefunded)}.00 USD</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* PAYMENT CHANNEL & HELCIM RECORD */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-100 pb-2">
                  Helcim Payment Channel
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Method:</span>
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                      <span>
                        {payment.cardBrand || "Card"} •••• {payment.cardLast4 || "4242"}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Processed On:</span>
                    <span className="text-stone-800 font-mono text-[11px]" suppressHydrationWarning>
                      {new Date(payment.date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {payment.refundedAt && (
                    <div className="flex items-center justify-between text-rose-700">
                      <span>Refund Processed:</span>
                      <span className="font-mono text-[11px]" suppressHydrationWarning>
                        {new Date(payment.refundedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-stone-400 block text-[10px] mb-1">
                      Helcim Transaction ID:
                    </span>
                    <span className="font-mono text-[11px] text-stone-800 bg-stone-100 px-2.5 py-1.5 rounded-lg block truncate select-all font-semibold">
                      {payment.helcimTransactionId}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIONS: REFUND & HELCIM INTEGRATION */}
              <div className="space-y-2.5 pt-1">
                {canRefund && (
                  <button
                    onClick={handleOpenRefund}
                    className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/90 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-xs cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                    <span>
                      Refund Payment {payment.status === "partially_refunded" ? `(Remaining: $${remainingRefundable})` : ""}
                    </span>
                  </button>
                )}

                {/* HELCIM DASHBOARD BUTTON */}
                <button
                  disabled
                  className="w-full py-2.5 px-4 bg-stone-100 text-stone-400 border border-stone-200 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed text-xs select-none"
                  title="Helcim merchant dashboard connection in sandbox/preparation phase"
                >
                  <span>View in Helcim</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-stone-400 text-center">
                  Direct Helcim processor API & webhook verification in preparation phase.
                </p>

                {/* LINK TO BOOKING */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                  <Link
                    href={`/admin/bookings?search=${encodeURIComponent(payment.bookingNumber)}`}
                    className="flex-1 py-2 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg text-center font-medium text-xs transition-colors"
                  >
                    View Booking Details
                  </Link>
                  <Link
                    href={payment.clientId ? `/admin/clients/${payment.clientId}` : `/admin/clients`}
                    className="flex-1 py-2 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg text-center font-medium text-xs transition-colors"
                  >
                    View Client Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/80 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REFUND MODAL */}
      {showRefundModal && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900 tracking-tight">
                  Refund Payment
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Helcim Transaction: <span className="font-mono font-medium text-stone-700">{payment.helcimTransactionId}</span>
                </p>
              </div>
              <button
                onClick={() => setShowRefundModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Summary of original transaction */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 font-mono text-[11.5px]">
                <div className="flex justify-between text-stone-600 font-sans">
                  <span>Client:</span>
                  <span className="font-semibold text-stone-900">{payment.clientName}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Original Payment:</span>
                  <span className="font-bold text-stone-900">${payment.amount}.00 USD</span>
                </div>
                {currentRefunded > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Already Refunded:</span>
                    <span className="font-semibold">-${currentRefunded}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-sans font-semibold pt-1 border-t border-stone-200">
                  <span>Remaining Refundable:</span>
                  <span className="font-mono text-emerald-800">${remainingRefundable}.00 USD</span>
                </div>
              </div>

              {/* Refund Type Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800 block text-xs">
                  Refund Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRefundType("full");
                      setRefundError(null);
                    }}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      refundType === "full"
                        ? "bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-2xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    Full Refund (${remainingRefundable})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRefundType("partial");
                      setRefundError(null);
                    }}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      refundType === "partial"
                        ? "bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-2xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    Partial Refund
                  </button>
                </div>
              </div>

              {/* Partial amount input */}
              {refundType === "partial" && (
                <div className="space-y-1 pt-1">
                  <label className="font-semibold text-stone-800 block text-xs">
                    Refund Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max={remainingRefundable}
                      value={partialAmount}
                      onChange={(e) => {
                        setPartialAmount(e.target.value);
                        setRefundError(null);
                      }}
                      className="w-full pl-7 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                      placeholder="0.00"
                    />
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Enter an amount up to ${remainingRefundable}.00
                  </span>
                </div>
              )}

              {/* Confirmation disclaimer notice */}
              <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Notice:</strong> Refunds will be returned through the original Helcim transaction. The client will not be prompted to re-enter card credentials.
                </p>
              </div>

              {refundError && (
                <p className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                  {refundError}
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmRefund}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-2xs disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Confirm Helcim Refund"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

