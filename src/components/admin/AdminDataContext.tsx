"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { AdminBooking, BookingStatus } from "@/lib/admin/types";
import { MOCK_BOOKINGS } from "@/lib/admin/mock-data";
import {
  getEffectiveBookingStatus,
  syncLiveBookings,
  markCompletedMockBooking,
  markNoShowMockBooking,
  rescheduleMockBooking,
  cancelMockBooking,
  addBookingPrivateNote,
} from "@/lib/admin/repositories";

const STORAGE_KEY = "amityhale_admin_bookings_v2";

export interface BookingCounts {
  all: number;
  upcoming: number;
  needs_review: number;
  completed: number;
  cancelled: number;
}

interface AdminDataContextType {
  bookings: AdminBooking[];
  isLoaded: boolean;
  counts: BookingCounts;
  needsReviewCount: number;
  markCompleted: (id: string) => Promise<AdminBooking | null>;
  markNoShow: (id: string) => Promise<AdminBooking | null>;
  reschedule: (id: string, newDate: string, newTime: string) => Promise<AdminBooking | null>;
  cancelBooking: (id: string, reason?: string) => Promise<AdminBooking | null>;
  addNote: (id: string, noteText: string) => Promise<AdminBooking | null>;
  updateBooking: (updated: AdminBooking) => void;
  resetToDefault: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<AdminBooking[]>(MOCK_BOOKINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AdminBooking[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
          syncLiveBookings(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse bookings from localStorage:", e);
    }

    // Default initialization
    setBookings(MOCK_BOOKINGS);
    syncLiveBookings(MOCK_BOOKINGS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_BOOKINGS));
    } catch {}
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage and repositories
  const persistBookings = useCallback((newList: AdminBooking[]) => {
    setBookings(newList);
    syncLiveBookings(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to persist bookings:", e);
    }
  }, []);

  // Mutations
  const markCompleted = useCallback(async (id: string): Promise<AdminBooking | null> => {
    const updated = await markCompletedMockBooking(id);
    if (updated) {
      setBookings((prev) => {
        const next = prev.map((b) => (b.id === id || b.bookingNumber === id ? updated : b));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        syncLiveBookings(next);
        return next;
      });
    }
    return updated;
  }, []);

  const markNoShow = useCallback(async (id: string): Promise<AdminBooking | null> => {
    const updated = await markNoShowMockBooking(id);
    if (updated) {
      setBookings((prev) => {
        const next = prev.map((b) => (b.id === id || b.bookingNumber === id ? updated : b));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        syncLiveBookings(next);
        return next;
      });
    }
    return updated;
  }, []);

  const reschedule = useCallback(
    async (id: string, newDate: string, newTime: string): Promise<AdminBooking | null> => {
      const updated = await rescheduleMockBooking(id, newDate, newTime);
      if (updated) {
        setBookings((prev) => {
          const next = prev.map((b) => (b.id === id || b.bookingNumber === id ? updated : b));
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {}
          syncLiveBookings(next);
          return next;
        });
      }
      return updated;
    },
    []
  );

  const cancelBooking = useCallback(
    async (id: string, reason?: string): Promise<AdminBooking | null> => {
      const updated = await cancelMockBooking(id, reason);
      if (updated) {
        setBookings((prev) => {
          const next = prev.map((b) => (b.id === id || b.bookingNumber === id ? updated : b));
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {}
          syncLiveBookings(next);
          return next;
        });
      }
      return updated;
    },
    []
  );

  const addNote = useCallback(async (id: string, noteText: string): Promise<AdminBooking | null> => {
    const updated = await addBookingPrivateNote(id, noteText);
    if (updated) {
      setBookings((prev) => {
        const next = prev.map((b) => (b.id === id || b.bookingNumber === id ? updated : b));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        syncLiveBookings(next);
        return next;
      });
    }
    return updated;
  }, []);

  const updateBooking = useCallback(
    (updated: AdminBooking) => {
      persistBookings(
        bookings.map((b) => (b.id === updated.id || b.bookingNumber === updated.bookingNumber ? updated : b))
      );
    },
    [bookings, persistBookings]
  );

  const resetToDefault = useCallback(() => {
    persistBookings(MOCK_BOOKINGS);
  }, [persistBookings]);

  // Derived counts dynamically based on effective status
  const counts = useMemo<BookingCounts>(() => {
    let all = 0;
    let upcoming = 0;
    let needs_review = 0;
    let completed = 0;
    let cancelled = 0;

    for (const b of bookings) {
      all++;
      const eff = getEffectiveBookingStatus(b);
      if (eff === "needs_review") {
        needs_review++;
      } else if (eff === "confirmed" || eff === "rescheduled") {
        upcoming++;
      } else if (eff === "completed") {
        completed++;
      } else if (eff === "cancelled") {
        cancelled++;
      } else {
        // fallback
        if (b.status === "completed") completed++;
        else if (b.status === "cancelled") cancelled++;
        else upcoming++;
      }
    }

    return { all, upcoming, needs_review, completed, cancelled };
  }, [bookings]);

  const needsReviewCount = counts.needs_review;

  const value = useMemo(
    () => ({
      bookings,
      isLoaded,
      counts,
      needsReviewCount,
      markCompleted,
      markNoShow,
      reschedule,
      cancelBooking,
      addNote,
      updateBooking,
      resetToDefault,
    }),
    [
      bookings,
      isLoaded,
      counts,
      needsReviewCount,
      markCompleted,
      markNoShow,
      reschedule,
      cancelBooking,
      addNote,
      updateBooking,
      resetToDefault,
    ]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}

