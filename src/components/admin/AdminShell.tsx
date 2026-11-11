"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { ToastProvider } from "./ToastProvider";
import { AdminDataProvider } from "./AdminDataContext";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Global Escape key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // If user is on the admin login page, render clean full-screen view without shell
  if (pathname === "/admin/login") {
    return (
      <ToastProvider>
        <main className="min-h-screen bg-stone-50 font-sans">{children}</main>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-[#F8F9FA] text-stone-900 flex font-sans antialiased">
          {/* DESKTOP SIDEBAR (Fixed left column) */}
          <div className="hidden lg:block w-64 shrink-0 fixed inset-y-0 left-0 z-40">
            <AdminSidebar />
          </div>

          {/* MOBILE DRAWER OVERLAY */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="relative w-64 max-w-[80vw] h-full z-10 flex flex-col shadow-2xl">
                <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
            <AdminHeader onOpenMobileSidebar={() => setMobileMenuOpen(true)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </AdminDataProvider>
    </ToastProvider>
  );
}
