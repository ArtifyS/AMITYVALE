"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  AdminBooking,
  BookingStatus,
  AdminClient,
  AdminLead,
  LeadStatus,
  AdminPayment,
  PaymentMetrics,
  PaymentStatus,
  AdminArticleItem,
} from "@/lib/admin/types";
import { MOCK_BOOKINGS, MOCK_LEADS, MOCK_PAYMENTS, MOCK_ARTICLES } from "@/lib/admin/mock-data";
import {
  getEffectiveBookingStatus,
  syncLiveBookings,
  syncLiveLeads,
  syncLivePayments,
  syncLiveArticles,
  markCompletedMockBooking,
  markNoShowMockBooking,
  rescheduleMockBooking,
  cancelMockBooking,
  addBookingPrivateNote,
  updateMockLeadStatus,
  refundMockPayment,
} from "@/lib/admin/repositories";

const STORAGE_KEY = "amityhale_admin_bookings_v4";
const LEADS_STORAGE_KEY = "amityhale_admin_leads_v3";
const PAYMENTS_STORAGE_KEY = "amityhale_admin_payments_v2";
const ARTICLES_STORAGE_KEY = "amityhale_admin_articles_v1";
const FEATURED_ARTICLE_KEY = "amityhale_featured_article_id";

export interface BookingCounts {
  all: number;
  upcoming: number;
  needs_review: number;
  completed: number;
  cancelled: number;
}

export interface ClientMetrics {
  clientBookings: AdminBooking[];
  upcomingSessions: AdminBooking[];
  pastSessions: AdminBooking[];
  completedCount: number;
  upcomingCount: number;
  pastCount: number;
  hasUpcoming: boolean;
  isPastClient: boolean;
  totalPaid: number;
  nextSessionDate: string | null;
  lastSessionDate: string | null;
}

export function getClientMetrics(
  client: AdminClient,
  allBookings: AdminBooking[],
  allPayments?: AdminPayment[]
): ClientMetrics {
  const clientEmailNorm = (client.email || "").trim().toLowerCase();
  const clientBookings = allBookings.filter(
    (b) =>
      (b.clientId && b.clientId === client.id) ||
      (b.primaryClientEmail && b.primaryClientEmail.trim().toLowerCase() === clientEmailNorm)
  );

  // Upcoming confirmed sessions:
  // - status is Confirmed or Rescheduled
  // - scheduled session end time has not passed (effective status === "confirmed")
  // - not cancelled, not completed, not no_show
  const upcomingSessions = clientBookings
    .filter((b) => getEffectiveBookingStatus(b) === "confirmed")
    .sort((a, b) => {
      const timeA = new Date(`${a.sessionDate} ${a.sessionTime}`).getTime();
      const timeB = new Date(`${b.sessionDate} ${b.sessionTime}`).getTime();
      return timeA - timeB;
    });

  // Past sessions:
  // - final outcome is Completed or No-Show
  // (do NOT include future cancelled bookings)
  const pastSessions = clientBookings
    .filter((b) => b.status === "completed" || b.status === "no_show")
    .sort((a, b) => {
      const timeA = new Date(`${a.sessionDate} ${a.sessionTime}`).getTime();
      const timeB = new Date(`${b.sessionDate} ${b.sessionTime}`).getTime();
      return timeB - timeA;
    });

  const completedSessions = clientBookings.filter((b) => b.status === "completed");
  const completedCount = completedSessions.length;
  const upcomingCount = upcomingSessions.length;
  const pastCount = pastSessions.length;

  // Has upcoming session: has at least one future confirmed booking
  const hasUpcoming = upcomingCount > 0;

  // Past client: has at least one completed session AND does NOT currently have any future confirmed booking
  const isPastClient = completedCount > 0 && !hasUpcoming;

  // Total Paid / LTV:
  // Helcim successful payments minus refunds for this client
  const totalPaid = allPayments && allPayments.length > 0
    ? allPayments
        .filter(
          (p) =>
            (p.clientId && p.clientId === client.id) ||
            (p.clientEmail && p.clientEmail.trim().toLowerCase() === clientEmailNorm)
        )
        .reduce((sum, p) => sum + (p.netAmount ?? (p.amount - (p.amountRefunded || 0))), 0)
    : clientBookings.reduce((sum, b) => {
        if (b.paymentStatus === "paid") {
          return sum + (b.amountTotal || 0);
        }
        return sum;
      }, 0);

  // Next Session: closest future confirmed booking
  const nextSessionDate =
    upcomingSessions.length > 0
      ? `${upcomingSessions[0].sessionDate} · ${upcomingSessions[0].sessionTime}`
      : null;

  // Last Session: most recent completed session or past session
  const lastSessionDate =
    pastSessions.length > 0 ? pastSessions[0].sessionDate : null;

  return {
    clientBookings,
    upcomingSessions,
    pastSessions,
    completedCount,
    upcomingCount,
    pastCount,
    hasUpcoming,
    isPastClient,
    totalPaid,
    nextSessionDate,
    lastSessionDate,
  };
}

interface AdminDataContextType {
  bookings: AdminBooking[];
  isLoaded: boolean;
  counts: BookingCounts;
  needsReviewCount: number;
  leads: AdminLead[];
  newLeadsCount: number;
  contactedLeadsCount: number;
  convertedLeadsCount: number;
  allActiveLeadsCount: number;
  archivedLeadsCount: number;
  payments: AdminPayment[];
  paymentMetrics: PaymentMetrics;
  refundPayment: (id: string, amount: number, type: "full" | "partial") => Promise<AdminPayment | null>;
  markCompleted: (id: string) => Promise<AdminBooking | null>;
  markNoShow: (id: string) => Promise<AdminBooking | null>;
  reschedule: (id: string, newDate: string, newTime: string) => Promise<AdminBooking | null>;
  cancelBooking: (id: string, reason?: string) => Promise<AdminBooking | null>;
  addNote: (id: string, noteText: string) => Promise<AdminBooking | null>;
  updateBooking: (updated: AdminBooking) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<AdminLead | null>;
  markLeadContacted: (id: string) => Promise<AdminLead | null>;
  convertLead: (id: string) => Promise<AdminLead | null>;
  updateLead: (updated: AdminLead) => void;
  simulatePaidBooking: (email: string, details?: Partial<AdminBooking>) => AdminBooking;
  resetToDefault: () => void;
  articles: AdminArticleItem[];
  setFeaturedArticle: (id: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<AdminBooking[]>(MOCK_BOOKINGS);
  const [leads, setLeads] = useState<AdminLead[]>(MOCK_LEADS);
  const [payments, setPayments] = useState<AdminPayment[]>(MOCK_PAYMENTS);
  const [articles, setArticles] = useState<AdminArticleItem[]>(MOCK_ARTICLES);
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
        }
      } else {
        setBookings(MOCK_BOOKINGS);
        syncLiveBookings(MOCK_BOOKINGS);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_BOOKINGS));
        } catch {}
      }
    } catch (e) {
      console.error("Failed to parse bookings from localStorage:", e);
    }

    try {
      const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
      if (storedLeads) {
        const parsedLeads = JSON.parse(storedLeads) as AdminLead[];
        if (Array.isArray(parsedLeads) && parsedLeads.length > 0) {
          const migrated = parsedLeads.map((l) => ({
            ...l,
            status: ((l.status as string) === "new" ? "active" : l.status) as LeadStatus,
          }));
          setLeads(migrated);
          syncLiveLeads(migrated);
        }
      } else {
        setLeads(MOCK_LEADS);
        syncLiveLeads(MOCK_LEADS);
        try {
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(MOCK_LEADS));
        } catch {}
      }
    } catch (e) {
      console.error("Failed to parse leads from localStorage:", e);
    }

    try {
      const storedPayments = localStorage.getItem(PAYMENTS_STORAGE_KEY);
      if (storedPayments) {
        const parsedPayments = JSON.parse(storedPayments) as AdminPayment[];
        if (Array.isArray(parsedPayments) && parsedPayments.length > 0) {
          // Normalize legacy Stripe fields to Helcim
          const normalized = parsedPayments.map((p, idx) => ({
            ...p,
            helcimTransactionId:
              p.helcimTransactionId ||
              p.stripePaymentIntentId?.replace("pi_", "HX-") ||
              `HX-8492019${idx}`,
            amountRefunded: p.amountRefunded || (p.status === "refunded" ? p.amount : 0),
            netAmount:
              p.netAmount !== undefined
                ? p.netAmount
                : Math.max(0, p.amount - (p.amountRefunded || (p.status === "refunded" ? p.amount : 0))),
          }));
          setPayments(normalized);
          syncLivePayments(normalized);
        }
      } else {
        setPayments(MOCK_PAYMENTS);
        syncLivePayments(MOCK_PAYMENTS);
        try {
          localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(MOCK_PAYMENTS));
        } catch {}
      }
    } catch (e) {
      console.error("Failed to parse payments from localStorage:", e);
    }

    try {
      const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (storedArticles) {
        const parsedArticles = JSON.parse(storedArticles) as AdminArticleItem[];
        if (Array.isArray(parsedArticles) && parsedArticles.length > 0) {
          setArticles(parsedArticles);
          syncLiveArticles(parsedArticles);
        }
      } else {
        setArticles(MOCK_ARTICLES);
        syncLiveArticles(MOCK_ARTICLES);
        try {
          localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(MOCK_ARTICLES));
          const initFeatured = MOCK_ARTICLES.find((a) => a.featured);
          if (initFeatured) {
            localStorage.setItem(FEATURED_ARTICLE_KEY, initFeatured.id);
          }
        } catch {}
      }
    } catch (e) {
      console.error("Failed to parse articles from localStorage:", e);
    }

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

  const persistLeads = useCallback((newList: AdminLead[]) => {
    setLeads(newList);
    syncLiveLeads(newList);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to persist leads:", e);
    }
  }, []);

  const persistPayments = useCallback((newList: AdminPayment[]) => {
    setPayments(newList);
    syncLivePayments(newList);
    try {
      localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to persist payments:", e);
    }
  }, []);

  const refundPayment = useCallback(
    async (id: string, refundAmount: number, type: "full" | "partial"): Promise<AdminPayment | null> => {
      const updated = await refundMockPayment(id, refundAmount, type);
      if (updated) {
        setPayments((prev) => {
          const next = prev.map((p) => (p.id === id ? updated : p));
          try {
            localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(next));
          } catch {}
          syncLivePayments(next);
          return next;
        });
      }
      return updated;
    },
    []
  );

  const updateLeadStatus = useCallback(
    async (id: string, newStatus: LeadStatus): Promise<AdminLead | null> => {
      const updated = await updateMockLeadStatus(id, newStatus);
      if (updated) {
        setLeads((prev) => {
          const next = prev.map((l) => (l.id === id ? updated : l));
          try {
            localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(next));
          } catch {}
          syncLiveLeads(next);
          return next;
        });
      }
      return updated;
    },
    []
  );

  const markLeadContacted = useCallback(
    async (id: string): Promise<AdminLead | null> => {
      return updateLeadStatus(id, "contacted");
    },
    [updateLeadStatus]
  );

  const convertLead = useCallback(
    async (id: string): Promise<AdminLead | null> => {
      return updateLeadStatus(id, "converted");
    },
    [updateLeadStatus]
  );

  const updateLead = useCallback((updated: AdminLead) => {
    setLeads((prev) => {
      const next = prev.map((l) => (l.id === updated.id ? updated : l));
      try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      syncLiveLeads(next);
      return next;
    });
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

  const setFeaturedArticle = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.map((a) => ({
        ...a,
        featured: a.id === id || a.slug === id,
      }));
      syncLiveArticles(updated);
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
        const feat = updated.find((a) => a.featured);
        if (feat) {
          localStorage.setItem(FEATURED_ARTICLE_KEY, feat.id);
        }
      } catch (err) {
        console.error("Failed to persist featured article:", err);
      }
      return updated;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    persistBookings(MOCK_BOOKINGS);
    persistLeads(MOCK_LEADS);
    persistPayments(MOCK_PAYMENTS);
    setArticles(MOCK_ARTICLES);
    syncLiveArticles(MOCK_ARTICLES);
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(MOCK_ARTICLES));
      const feat = MOCK_ARTICLES.find((a) => a.featured);
      if (feat) {
        localStorage.setItem(FEATURED_ARTICLE_KEY, feat.id);
      }
    } catch {}
  }, [persistBookings, persistLeads, persistPayments]);

  // Dynamic lead conversion synchronization with paid bookings
  const syncedLeads = useMemo<AdminLead[]>(() => {
    return leads.map((lead) => {
      const leadEmailNorm = (lead.email || "").trim().toLowerCase();
      const matchedPaidBooking = bookings.find(
        (b) =>
          (b.primaryClientEmail || "").trim().toLowerCase() === leadEmailNorm &&
          b.paymentStatus === "paid"
      );

      if (matchedPaidBooking) {
        return {
          ...lead,
          status: "converted" as LeadStatus,
          convertedAt: lead.convertedAt || matchedPaidBooking.createdAt || new Date().toISOString(),
          convertedBookingId: lead.convertedBookingId || matchedPaidBooking.id,
          clientId: lead.clientId || matchedPaidBooking.clientId || "cli_001",
          firstBookingAmount: lead.firstBookingAmount || matchedPaidBooking.amountTotal,
          firstBookingDetails:
            lead.firstBookingDetails ||
            `${matchedPaidBooking.duration} min · $${matchedPaidBooking.amountTotal}`,
        };
      }
      if ((lead.status as string) === "new") {
        return { ...lead, status: "active" as LeadStatus };
      }
      return lead;
    });
  }, [leads, bookings]);

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

  const allActiveLeadsCount = useMemo(() => {
    return syncedLeads.filter(
      (l) => l.status !== "converted" && (l.status as string) !== "booked" && l.status !== "archived"
    ).length;
  }, [syncedLeads]);

  const contactedLeadsCount = useMemo(() => {
    return syncedLeads.filter((l) => l.status === "contacted").length;
  }, [syncedLeads]);

  const convertedLeadsCount = useMemo(() => {
    return syncedLeads.filter(
      (l) => l.status === "converted" || (l.status as string) === "booked"
    ).length;
  }, [syncedLeads]);

  const archivedLeadsCount = useMemo(() => {
    return syncedLeads.filter((l) => l.status === "archived").length;
  }, [syncedLeads]);

  const newLeadsCount = allActiveLeadsCount;

  const paymentMetrics = useMemo<PaymentMetrics>(() => {
    const thisMonth = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const paidSessions = payments.filter((p) => p.status === "paid" || p.status === "partially_refunded").length;
    const totalRefunded = payments.reduce((sum, p) => sum + (p.amountRefunded || 0), 0);
    const netRevenue = thisMonth - totalRefunded;

    return {
      thisMonth,
      paidSessions,
      totalRefunded,
      netRevenue,
      refundedAmount: totalRefunded,
      pendingCount: 0,
    };
  }, [payments]);

  const simulatePaidBooking = useCallback(
    (email: string, details?: Partial<AdminBooking>) => {
      const normEmail = email.trim().toLowerCase();
      const newBooking: AdminBooking = {
        id: `bk_${Date.now()}`,
        bookingNumber: `AH-${Math.floor(1000 + Math.random() * 9000)}`,
        clientId: "cli_001",
        primaryClientName: "Client",
        primaryClientEmail: normEmail,
        primaryClientPhone: "+1 (555) 000-0000",
        coachingArea: "Relationship Coaching",
        duration: 60,
        participantCount: 1,
        sessionDate: new Date().toISOString().split("T")[0],
        sessionTime: "11:00 AM",
        timezone: "America/New_York (EST)",
        status: "confirmed",
        paymentStatus: "paid",
        basePrice: 300,
        additionalFee: 0,
        amountTotal: 300,
        currency: "USD",
        createdAt: new Date().toISOString(),
        activityTimeline: [],
        participants: [
          {
            participantNumber: 1,
            isPrimaryContact: true,
            firstName: "Client",
            lastName: "",
            dateOfBirth: "1990-01-01",
            placeOfBirth: "New York, NY",
            sex: "Female",
            sexualOrientation: "Straight / Heterosexual",
            profession: "Professional",
            email: normEmail,
            phone: "+1 (555) 000-0000",
            consultationPurpose: "Initial consultation",
          },
        ],
        ...details,
      };
      setBookings((prev) => {
        const next = [newBooking, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        syncLiveBookings(next);
        return next;
      });
      return newBooking;
    },
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__amityAdmin = {
        simulatePaidBooking,
        resetToDefault,
      };
    }
  }, [simulatePaidBooking, resetToDefault]);

  const value = useMemo(
    () => ({
      bookings,
      isLoaded,
      counts,
      needsReviewCount,
      leads: syncedLeads,
      newLeadsCount,
      contactedLeadsCount,
      convertedLeadsCount,
      allActiveLeadsCount,
      archivedLeadsCount,
      payments,
      paymentMetrics,
      refundPayment,
      markCompleted,
      markNoShow,
      reschedule,
      cancelBooking,
      addNote,
      updateBooking,
      updateLeadStatus,
      markLeadContacted,
      convertLead,
      updateLead,
      simulatePaidBooking,
      resetToDefault,
      articles,
      setFeaturedArticle,
    }),
    [
      bookings,
      isLoaded,
      counts,
      needsReviewCount,
      syncedLeads,
      newLeadsCount,
      contactedLeadsCount,
      convertedLeadsCount,
      allActiveLeadsCount,
      archivedLeadsCount,
      payments,
      paymentMetrics,
      refundPayment,
      markCompleted,
      markNoShow,
      reschedule,
      cancelBooking,
      addNote,
      updateBooking,
      updateLeadStatus,
      markLeadContacted,
      convertLead,
      updateLead,
      simulatePaidBooking,
      resetToDefault,
      articles,
      setFeaturedArticle,
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

