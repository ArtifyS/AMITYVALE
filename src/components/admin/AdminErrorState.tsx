"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface AdminErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function AdminErrorState({
  title = "Something went wrong.",
  message = "An error occurred while loading this administrative view. Please try refreshing.",
  onRetry,
}: AdminErrorStateProps) {
  return (
    <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-stone-200/80 shadow-2xs max-w-md mx-auto my-8 space-y-4">
      <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-stone-900 text-sm">{title}</h3>
        <p className="text-xs text-stone-500 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-lg text-xs transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}

