"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AdminBooking } from "@/lib/admin/types";
import {
  MoreVertical,
  CheckCircle2,
  CalendarClock,
  Ban,
  UserX,
  FileText,
  X,
} from "lucide-react";

interface BookingActionMenuProps {
  booking: AdminBooking;
  onViewDetails: (booking: AdminBooking) => void;
  onMarkCompleted: (booking: AdminBooking) => void;
  onMarkNoShow: (booking: AdminBooking) => void;
  onReschedule: (booking: AdminBooking) => void;
  onCancel: (booking: AdminBooking) => void;
}

export function BookingActionMenu({
  booking,
  onViewDetails,
  onMarkCompleted,
  onMarkNoShow,
  onReschedule,
  onCancel,
}: BookingActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; openUp: boolean }>({
    top: 0,
    left: 0,
    openUp: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 200;
    const estimatedHeight = 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openUp = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
    const top = openUp ? rect.top - estimatedHeight - 6 : rect.bottom + 6;

    let left = rect.right - menuWidth;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }

    setCoords({
      top: Math.max(12, top),
      left,
      openUp,
    });
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Click outside & Escape key listeners
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    const handleScrollOrResize = (e: Event) => {
      // If user scrolls anywhere outside the menu on desktop, close the menu to avoid detached floating
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, { capture: true, passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, { capture: true });
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, handleClose]);

  const canMarkCompleted = booking.status !== "completed";
  const canMarkNoShow = booking.status === "needs_review" || booking.status === "confirmed";
  const canReschedule = booking.status !== "cancelled";
  const canCancel = booking.status !== "cancelled";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Booking options menu"
        className={`p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors ${
          isOpen ? "bg-stone-100 text-stone-900" : ""
        }`}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          isMobile ? (
            /* MOBILE BOTTOM ACTION SHEET */
            <div
              className="fixed inset-0 z-[9999] flex items-end justify-center bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={handleClose}
            >
              <div
                ref={menuRef}
                className="w-full max-w-lg bg-white rounded-t-2xl shadow-2xl border-t border-stone-200 p-5 space-y-3 animate-in slide-in-from-bottom duration-250"
                onClick={(e) => e.stopPropagation()}
                role="menu"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {booking.primaryClientName}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      #{booking.bookingNumber} · {booking.sessionDate} at {booking.sessionTime}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1 pt-1 text-xs">
                  <button
                    onClick={() => {
                      handleClose();
                      onViewDetails(booking);
                    }}
                    className="w-full px-3.5 py-3 text-stone-800 hover:bg-stone-50 rounded-xl transition-colors text-left flex items-center gap-2.5 font-medium"
                    role="menuitem"
                  >
                    <FileText className="w-4 h-4 text-stone-400" />
                    <span>View Booking Details</span>
                  </button>

                  {canMarkCompleted && (
                    <button
                      onClick={() => {
                        handleClose();
                        onMarkCompleted(booking);
                      }}
                      className="w-full px-3.5 py-3 text-stone-800 hover:bg-stone-50 hover:text-emerald-700 rounded-xl transition-colors text-left flex items-center gap-2.5 font-medium"
                      role="menuitem"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Mark Completed</span>
                    </button>
                  )}

                  {canMarkNoShow && (
                    <button
                      onClick={() => {
                        handleClose();
                        onMarkNoShow(booking);
                      }}
                      className="w-full px-3.5 py-3 text-stone-800 hover:bg-stone-50 hover:text-orange-700 rounded-xl transition-colors text-left flex items-center gap-2.5 font-medium"
                      role="menuitem"
                    >
                      <UserX className="w-4 h-4 text-orange-600" />
                      <span>Mark No-Show</span>
                    </button>
                  )}

                  {canReschedule && (
                    <button
                      onClick={() => {
                        handleClose();
                        onReschedule(booking);
                      }}
                      className="w-full px-3.5 py-3 text-stone-800 hover:bg-stone-50 rounded-xl transition-colors text-left flex items-center gap-2.5 font-medium"
                      role="menuitem"
                    >
                      <CalendarClock className="w-4 h-4 text-stone-400" />
                      <span>Reschedule Session</span>
                    </button>
                  )}

                  {canCancel && (
                    <button
                      onClick={() => {
                        handleClose();
                        onCancel(booking);
                      }}
                      className="w-full px-3.5 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left flex items-center gap-2.5 font-medium"
                      role="menuitem"
                    >
                      <Ban className="w-4 h-4 text-rose-500" />
                      <span>Cancel Session</span>
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* DESKTOP SMART-POSITIONED PORTAL DROPDOWN */
            <div
              ref={menuRef}
              style={{
                position: "fixed",
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                width: "200px",
              }}
              className="z-[9999] bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 text-xs text-left animate-in fade-in zoom-in-95 duration-150 select-none"
              onClick={(e) => e.stopPropagation()}
              role="menu"
            >
              <button
                onClick={() => {
                  handleClose();
                  onViewDetails(booking);
                }}
                className="w-full px-3.5 py-2 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left flex items-center gap-2"
                role="menuitem"
              >
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                <span>View Details</span>
              </button>

              {canMarkCompleted && (
                <button
                  onClick={() => {
                    handleClose();
                    onMarkCompleted(booking);
                  }}
                  className="w-full px-3.5 py-2 text-stone-700 hover:bg-stone-50 hover:text-emerald-700 transition-colors text-left flex items-center gap-2"
                  role="menuitem"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Completed</span>
                </button>
              )}

              {canMarkNoShow && (
                <button
                  onClick={() => {
                    handleClose();
                    onMarkNoShow(booking);
                  }}
                  className="w-full px-3.5 py-2 text-stone-700 hover:bg-stone-50 hover:text-orange-700 transition-colors text-left flex items-center gap-2"
                  role="menuitem"
                >
                  <UserX className="w-3.5 h-3.5 text-orange-600" />
                  <span>Mark No-Show</span>
                </button>
              )}

              {canReschedule && (
                <button
                  onClick={() => {
                    handleClose();
                    onReschedule(booking);
                  }}
                  className="w-full px-3.5 py-2 text-stone-700 hover:bg-stone-50 hover:text-[#0B2A4A] transition-colors text-left flex items-center gap-2"
                  role="menuitem"
                >
                  <CalendarClock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reschedule</span>
                </button>
              )}

              {canCancel && (
                <button
                  onClick={() => {
                    handleClose();
                    onCancel(booking);
                  }}
                  className="w-full px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left flex items-center gap-2 border-t border-stone-100 mt-1 pt-2"
                  role="menuitem"
                >
                  <Ban className="w-3.5 h-3.5 text-rose-500" />
                  <span>Cancel Session</span>
                </button>
              )}
            </div>
          ),
          document.body
        )}
    </>
  );
}

