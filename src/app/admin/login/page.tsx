"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("angel@amityhale.com");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulated quick admin authentication for Phase 1
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* LOGO & TITLE */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[#0B2A4A] text-white flex items-center justify-center font-bold text-xl shadow-md mb-4">
            A
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-900 tracking-tight">
              AmityHale
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#D8A23D]/20 text-[#9E6E16] border border-[#D8A23D]/40">
              Admin Portal
            </span>
          </div>
          <p className="mt-2 text-xs text-stone-500 max-w-xs">
            Sign in to access client sessions, booking schedules, and intake management.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-sm border border-stone-200/80 rounded-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5"
              >
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-stone-700 uppercase tracking-wider"
                >
                  Password
                </label>
                <span className="text-[11px] text-stone-400">Phase 1 Dev Mode</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-stone-300 text-[#0B2A4A] focus:ring-[#0B2A4A] w-4 h-4"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#143B63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B2A4A] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* SECURITY FOOTER NOTE */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>End-to-end encrypted administrative console.</span>
          </div>
        </div>

        {/* BACK TO SITE LINK */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
          >
            ← Return to AmityHale.com
          </Link>
        </div>
      </div>
    </div>
  );
}

