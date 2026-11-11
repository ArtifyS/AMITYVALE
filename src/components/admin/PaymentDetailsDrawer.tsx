"use client";

import React from "react";
import { AdminPayment } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import {
  X,
  CreditCard,
  DollarSign,
  Calendar,
  ExternalLink,
  ShieldCheck,
  User,
  Clock,
  Receipt,
} from "lucide-react";

interface PaymentDetailsDrawerProps {
  payment: AdminPayment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentDetailsDrawer({
  payment,
  isOpen,
  onClose,
}: PaymentDetailsDrawerProps) {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/80 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-medium text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                  {payment.bookingNumber}
                </span>
                <StatusBadge status={payment.status} />
              </div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight mt-1">
                ${payment.amount}.00 {payment.currency}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* CLIENT CARD */}
            <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Client Information
              </span>
              <div className="font-semibold text-stone-900 text-sm">
                {payment.clientName}
              </div>
              <div className="text-stone-500 font-mono text-[11px]">
                {payment.clientEmail}
              </div>
            </div>

            {/* BREAKDOWN */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-100 pb-2">
                Settlement Itemization
              </span>

              <div className="space-y-2 font-mono text-[11.5px]">
                <div className="flex justify-between text-stone-600">
                  <span>Base Session Rate:</span>
                  <span className="font-semibold text-stone-900">
                    ${payment.basePrice || payment.amount - (payment.additionalFee || 0)}
                  </span>
                </div>

                {payment.additionalFee > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Additional Participant Fees:</span>
                    <span className="font-semibold text-stone-900">
                      +${payment.additionalFee}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-stone-200 font-sans font-bold text-stone-900 text-xs">
                  <span>Total Captured</span>
                  <span className="font-mono text-sm">${payment.amount}.00 USD</span>
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD & STRIPE INTENT */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-100 pb-2">
                Payment Channel
              </span>

              <div className="space-y-2">
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
                  <span className="text-stone-800 font-mono text-[11px]">
                    {new Date(payment.date).toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block text-[10px] mb-1">
                    Stripe Payment Intent ID:
                  </span>
                  <span className="font-mono text-[11px] text-stone-700 bg-stone-100 p-2 rounded block truncate select-all">
                    {payment.stripePaymentIntentId}
                  </span>
                </div>
              </div>
            </div>

            {/* STRIPE ACTION */}
            <div className="space-y-2">
              <button
                disabled
                className="w-full py-2.5 px-4 bg-stone-100 text-stone-400 border border-stone-200 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed text-xs"
              >
                <span>View in Stripe Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <p className="text-[11px] text-stone-400 text-center">
                Direct Stripe webhook & dispute link will connect in Phase 5.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/80 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

