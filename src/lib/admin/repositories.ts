import {
  MOCK_BOOKINGS,
  MOCK_CLIENTS,
  MOCK_LEADS,
  MOCK_PAYMENTS,
  MOCK_PAYMENT_METRICS,
  MOCK_ARTICLES,
  MOCK_DASHBOARD_STATS,
  MOCK_WEEKLY_SCHEDULE,
  MOCK_BLOCKED_DATES,
  MOCK_PRICING_SETTINGS,
  MOCK_BOOKING_POLICY,
  MOCK_PROFILE_SETTINGS,
  MOCK_NOTIFICATIONS,
  CURRENT_ADMIN_USER,
  TODAY_STRING,
} from "./mock-data";
import {
  AdminBooking,
  BookingStatus,
  AdminClient,
  AdminLead,
  AdminPayment,
  PaymentMetrics,
  PaymentStatus,
  AdminArticleItem,
  DashboardStats,
  AdminUser,
  BookingActivityItem,
  LeadMetrics,
  LeadStatus,
  DaySchedule,
  BlockedDate,
  PricingSettings,
  BookingPolicySettings,
  ProfileSettings,
  AdminNotification,
} from "./types";

// In-memory mutable cache
let liveBookings: AdminBooking[] = [...MOCK_BOOKINGS];
let liveClients: AdminClient[] = [...MOCK_CLIENTS];
let liveLeads: AdminLead[] = [...MOCK_LEADS];
let livePayments: AdminPayment[] = [...MOCK_PAYMENTS];
let liveArticles: AdminArticleItem[] = [...MOCK_ARTICLES];
let liveSchedule: DaySchedule[] = [...MOCK_WEEKLY_SCHEDULE];
let liveBlockedDates: BlockedDate[] = [...MOCK_BLOCKED_DATES];
let livePricingSettings: PricingSettings = { ...MOCK_PRICING_SETTINGS };
let liveBookingPolicy: BookingPolicySettings = { ...MOCK_BOOKING_POLICY };
let liveProfileSettings: ProfileSettings = { ...MOCK_PROFILE_SETTINGS };
let liveNotifications: AdminNotification[] = [...MOCK_NOTIFICATIONS];

export function syncLiveBookings(bookings: AdminBooking[]): void {
  liveBookings = [...bookings];
}

export function getLiveBookingsList(): AdminBooking[] {
  return [...liveBookings];
}

export function syncLiveLeads(leads: AdminLead[]): void {
  liveLeads = [...leads];
}

export function getLiveLeadsList(): AdminLead[] {
  return [...liveLeads];
}

export function syncLiveClients(clients: AdminClient[]): void {
  liveClients = [...clients];
}

export function getLiveClientsList(): AdminClient[] {
  return [...liveClients];
}

/**
 * Calculates whether a scheduled session's end time has passed.
 */
export function getSessionEndDateTime(dateStr: string, timeStr: string, durationMinutes: number = 60): Date {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hours = 0;
    let minutes = 0;
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      const meridian = match[3].toUpperCase();
      if (meridian === "PM" && hours < 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;
    }
    const start = new Date(year, month - 1, day, hours, minutes, 0);
    return new Date(start.getTime() + durationMinutes * 60 * 1000);
  } catch {
    return new Date();
  }
}

export function hasSessionEnded(dateStr: string, timeStr: string, durationMinutes: number = 60): boolean {
  const end = getSessionEndDateTime(dateStr, timeStr, durationMinutes);
  return Date.now() > end.getTime();
}

/**
 * Returns the effective status of a booking.
 * A confirmed/scheduled booking whose end time has passed dynamically becomes "needs_review",
 * unless explicitly marked completed, cancelled, or no-show.
 */
export function getEffectiveBookingStatus(booking: AdminBooking): BookingStatus {
  if (booking.status === "completed" || booking.status === "cancelled" || booking.status === "no_show") {
    return booking.status;
  }
  if (
    booking.status === "confirmed" ||
    booking.status === "in_progress" ||
    booking.status === "rescheduled" ||
    booking.status === "needs_review"
  ) {
    if (hasSessionEnded(booking.sessionDate, booking.sessionTime, booking.duration)) {
      return "needs_review";
    }
    return "confirmed";
  }
  return booking.status;
}

export async function getCurrentAdminUser(): Promise<AdminUser> {
  return CURRENT_ADMIN_USER;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const needsReviewCount = liveBookings.filter(
    (b) => getEffectiveBookingStatus(b) === "needs_review"
  ).length;
  const activeBookingsCount = liveBookings.filter(
    (b) => getEffectiveBookingStatus(b) === "confirmed"
  ).length;
  const completedSessionsCount = liveBookings.filter(
    (b) => b.status === "completed"
  ).length;
  const newLeadsCount = liveLeads.filter(
    (l) => l.status === "new"
  ).length;

  return {
    ...MOCK_DASHBOARD_STATS,
    activeBookingsCount,
    needsReviewCount,
    completedSessionsCount,
    newLeadsCount,
  };
}

export async function getTodaySchedule(): Promise<AdminBooking[]> {
  return liveBookings
    .filter(
      (b) =>
        b.sessionDate === TODAY_STRING &&
        b.status !== "cancelled"
    )
    .map((b) => ({ ...b, status: getEffectiveBookingStatus(b) }));
}

export async function getUpcomingBookings(limit: number = 6): Promise<AdminBooking[]> {
  return liveBookings
    .filter((b) => getEffectiveBookingStatus(b) === "confirmed")
    .map((b) => ({ ...b, status: getEffectiveBookingStatus(b) }))
    .sort((a, b) => {
      const dateA = new Date(`${a.sessionDate} ${a.sessionTime}`).getTime();
      const dateB = new Date(`${b.sessionDate} ${b.sessionTime}`).getTime();
      return dateA - dateB;
    })
    .slice(0, limit);
}

export async function getBookingCounts(): Promise<{
  all: number;
  upcoming: number;
  needs_review: number;
  completed: number;
  cancelled: number;
}> {
  return {
    all: liveBookings.length,
    upcoming: liveBookings.filter(
      (b) => getEffectiveBookingStatus(b) === "confirmed"
    ).length,
    needs_review: liveBookings.filter(
      (b) => getEffectiveBookingStatus(b) === "needs_review"
    ).length,
    completed: liveBookings.filter((b) => b.status === "completed").length,
    cancelled: liveBookings.filter((b) => b.status === "cancelled").length,
  };
}

export async function getBookings(options?: {
  status?: string;
  search?: string;
  coachingArea?: string;
  relationshipFocus?: string;
  paymentStatus?: string;
  dateRange?: string;
}): Promise<AdminBooking[]> {
  let list = liveBookings.map((b) => ({
    ...b,
    status: getEffectiveBookingStatus(b),
  }));

  if (options?.status && options.status !== "all") {
    if (options.status === "upcoming") {
      list = list.filter((b) => b.status === "confirmed");
    } else if (options.status === "needs_review") {
      list = list.filter((b) => b.status === "needs_review");
    } else {
      list = list.filter((b) => b.status === options.status);
    }
  }

  if (options?.coachingArea && options.coachingArea !== "all") {
    const targetArea = options.coachingArea.toLowerCase().trim();
    list = list.filter((b) => b.coachingArea.toLowerCase().trim() === targetArea);
  }

  if (options?.relationshipFocus && options.relationshipFocus !== "all") {
    list = list.filter((b) => b.coachingSubArea === options.relationshipFocus);
  }

  if (options?.paymentStatus && options.paymentStatus !== "all") {
    list = list.filter((b) => b.paymentStatus === options.paymentStatus);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.primaryClientName.toLowerCase().includes(q) ||
        b.primaryClientEmail.toLowerCase().includes(q) ||
        b.bookingNumber.toLowerCase().includes(q) ||
        b.participants.some((p) =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(q)
        )
    );
  }

  return list;
}

export async function getBookingById(id: string): Promise<AdminBooking | null> {
  const found = liveBookings.find(
    (b) => b.id === id || b.bookingNumber === id || b.bookingNumber === `#${id}`
  );
  return found || null;
}

export async function rescheduleMockBooking(
  id: string,
  newDate: string,
  newTime: string
): Promise<AdminBooking | null> {
  const idx = liveBookings.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (idx === -1) return null;

  const prev = liveBookings[idx];
  const newActivity: BookingActivityItem = {
    id: `act_${Date.now()}`,
    type: "rescheduled",
    title: "Session Rescheduled",
    description: `Moved from ${prev.sessionDate} · ${prev.sessionTime} to ${newDate} · ${newTime}`,
    timestamp: new Date().toISOString(),
  };

  const updated: AdminBooking = {
    ...prev,
    sessionDate: newDate,
    sessionTime: newTime,
    status: "confirmed",
    activityTimeline: [newActivity, ...(prev.activityTimeline || [])],
  };

  liveBookings[idx] = updated;
  return updated;
}

export async function cancelMockBooking(
  id: string,
  reason?: string
): Promise<AdminBooking | null> {
  const idx = liveBookings.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (idx === -1) return null;

  const prev = liveBookings[idx];
  const newActivity: BookingActivityItem = {
    id: `act_${Date.now()}`,
    type: "cancelled",
    title: "Session Cancelled",
    description: reason ? `Reason: ${reason}` : "Session cancelled by Administrator.",
    timestamp: new Date().toISOString(),
  };

  const updated: AdminBooking = {
    ...prev,
    status: "cancelled",
    activityTimeline: [newActivity, ...(prev.activityTimeline || [])],
  };

  liveBookings[idx] = updated;
  return updated;
}

export async function markCompletedMockBooking(
  id: string
): Promise<AdminBooking | null> {
  const idx = liveBookings.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (idx === -1) return null;

  const prev = liveBookings[idx];
  const newActivity: BookingActivityItem = {
    id: `act_${Date.now()}`,
    type: "completed",
    title: "Session Completed",
    description: "Marked completed by Coach Angel.",
    timestamp: new Date().toISOString(),
  };

  const updated: AdminBooking = {
    ...prev,
    status: "completed",
    activityTimeline: [newActivity, ...(prev.activityTimeline || [])],
  };

  liveBookings[idx] = updated;
  return updated;
}

export async function markNoShowMockBooking(
  id: string
): Promise<AdminBooking | null> {
  const idx = liveBookings.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (idx === -1) return null;

  const prev = liveBookings[idx];
  const newActivity: BookingActivityItem = {
    id: `act_${Date.now()}`,
    type: "no_show",
    title: "Marked as No-Show",
    description: "Client did not attend the scheduled consultation.",
    timestamp: new Date().toISOString(),
  };

  const updated: AdminBooking = {
    ...prev,
    status: "no_show",
    activityTimeline: [newActivity, ...(prev.activityTimeline || [])],
  };

  liveBookings[idx] = updated;
  return updated;
}

export async function addBookingPrivateNote(
  id: string,
  noteText: string
): Promise<AdminBooking | null> {
  const idx = liveBookings.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (idx === -1) return null;

  const prev = liveBookings[idx];
  const newActivity: BookingActivityItem = {
    id: `act_${Date.now()}`,
    type: "note_added",
    title: "Internal Note Added",
    description: "Private coach note updated.",
    timestamp: new Date().toISOString(),
  };

  const updated: AdminBooking = {
    ...prev,
    adminNotes: prev.adminNotes
      ? `${prev.adminNotes}\n\n[${new Date().toLocaleDateString()}]: ${noteText}`
      : `[${new Date().toLocaleDateString()}]: ${noteText}`,
    activityTimeline: [newActivity, ...(prev.activityTimeline || [])],
  };

  liveBookings[idx] = updated;
  return updated;
}

export async function getClients(search?: string, filter?: string): Promise<AdminClient[]> {
  let list = [...liveClients];

  if (filter === "active") {
    list = list.filter((c) => c.status === "active");
  } else if (filter === "past") {
    list = list.filter((c) => c.status === "completed" || c.status === "paused");
  } else if (filter === "upcoming") {
    list = list.filter((c) => Boolean(c.nextSessionDate));
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }
  return list;
}

export async function getClientById(id: string): Promise<AdminClient | null> {
  const found = liveClients.find((c) => c.id === id || c.email === id);
  return found || null;
}

export async function getClientBookings(clientIdOrEmail: string): Promise<AdminBooking[]> {
  return liveBookings.filter(
    (b) =>
      b.clientId === clientIdOrEmail ||
      b.primaryClientEmail.toLowerCase() === clientIdOrEmail.toLowerCase()
  );
}

export async function addClientPrivateNote(
  clientId: string,
  noteText: string
): Promise<AdminClient | null> {
  const idx = liveClients.findIndex((c) => c.id === clientId);
  if (idx === -1) return null;

  const prev = liveClients[idx];
  const updated: AdminClient = {
    ...prev,
    privateNotes: [noteText, ...(prev.privateNotes || [])],
  };

  liveClients[idx] = updated;
  return updated;
}

/* LEADS REPOSITORY */
export async function getLeadMetrics(): Promise<LeadMetrics> {
  const total = liveLeads.length;
  const contacted = liveLeads.filter((l) => l.status === "contacted").length;
  const converted = liveLeads.filter((l) => l.status === "converted" || (l.status as string) === "booked").length;
  // All active/non-converted, non-archived leads
  const allLeads = liveLeads.filter((l) => l.status !== "converted" && (l.status as string) !== "booked" && l.status !== "archived").length;
  const conversionRate = total > 0 ? Math.round((converted / total) * 1000) / 10 : 0;

  return {
    allLeads,
    contacted,
    converted,
    conversionRate,
    total,
    allActiveCount: allLeads,
    newLeads: allLeads,
  };
}

export async function getLeads(options?: {
  status?: string;
  coachingArea?: string;
  relationshipFocus?: string;
  search?: string;
}): Promise<AdminLead[]> {
  let list = [...liveLeads];

  if (options?.status && options.status !== "all") {
    if (options.status === "all_leads" || options.status === "all_active") {
      list = list.filter((l) => l.status !== "converted" && (l.status as string) !== "booked" && l.status !== "archived");
    } else {
      list = list.filter((l) => l.status === options.status);
    }
  }

  if (options?.coachingArea && options.coachingArea !== "all") {
    list = list.filter((l) => l.selectedArea === options.coachingArea);
  }

  if (options?.relationshipFocus && options.relationshipFocus !== "all") {
    list = list.filter((l) => l.relationshipFocus === options.relationshipFocus);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.toLowerCase().includes(q)) ||
        (l.primaryChallenge && l.primaryChallenge.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getLeadById(id: string): Promise<AdminLead | null> {
  const found = liveLeads.find((l) => l.id === id);
  return found || null;
}

export async function updateMockLeadStatus(
  id: string,
  newStatus: LeadStatus
): Promise<AdminLead | null> {
  const idx = liveLeads.findIndex((l) => l.id === id);
  if (idx === -1) return null;

  const current = liveLeads[idx];
  const now = new Date().toISOString();

  const updated: AdminLead = {
    ...current,
    status: newStatus,
    contactedAt:
      newStatus === "contacted" && !current.contactedAt ? now : current.contactedAt,
    convertedAt:
      newStatus === "converted" && !current.convertedAt ? now : current.convertedAt,
  };

  // If converting, match with existing client or booking if possible
  if (newStatus === "converted") {
    const leadEmailNorm = current.email.trim().toLowerCase();
    const matchedClient = liveClients.find(
      (c) => (c.email || "").trim().toLowerCase() === leadEmailNorm
    );
    const matchedBooking = liveBookings.find(
      (b) =>
        ((b.primaryClientEmail || "").trim().toLowerCase() === leadEmailNorm ||
          (matchedClient && b.clientId === matchedClient.id)) &&
        b.paymentStatus === "paid"
    );

    if (matchedClient && !updated.clientId) {
      updated.clientId = matchedClient.id;
    }
    if (matchedBooking) {
      if (!updated.convertedBookingId) updated.convertedBookingId = matchedBooking.id;
      if (!updated.firstBookingAmount) updated.firstBookingAmount = matchedBooking.amountTotal;
      if (!updated.firstBookingDetails) {
        updated.firstBookingDetails = `${matchedBooking.duration} min · $${matchedBooking.amountTotal}`;
      }
    }
  }

  liveLeads[idx] = updated;
  return updated;
}

/* ARTICLES CMS REPOSITORY */
export async function getArticles(options?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<AdminArticleItem[]> {
  let list = [...liveArticles];

  if (options?.status && options.status !== "all") {
    list = list.filter((a) => a.status === options.status);
  }

  if (options?.category && options.category !== "all") {
    list = list.filter((a) => a.category === options.category);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getArticlesAdmin(): Promise<AdminArticleItem[]> {
  return liveArticles;
}

export async function getArticleById(idOrSlug: string): Promise<AdminArticleItem | null> {
  const found = liveArticles.find(
    (a) => a.id === idOrSlug || a.slug === idOrSlug
  );
  return found || null;
}

export async function createMockArticle(
  data: Omit<AdminArticleItem, "id" | "views">
): Promise<AdminArticleItem> {
  const newId = `art_${Date.now()}`;
  if (data.featured) {
    liveArticles = liveArticles.map((a) => ({ ...a, featured: false }));
  }

  const newArticle: AdminArticleItem = {
    ...data,
    id: newId,
    views: 0,
  };

  liveArticles = [newArticle, ...liveArticles];
  return newArticle;
}

export async function updateMockArticle(
  id: string,
  updates: Partial<AdminArticleItem>
): Promise<AdminArticleItem | null> {
  const idx = liveArticles.findIndex((a) => a.id === id || a.slug === id);
  if (idx === -1) return null;

  if (updates.featured) {
    liveArticles = liveArticles.map((a) =>
      a.id === id ? a : { ...a, featured: false }
    );
  }

  const updated: AdminArticleItem = {
    ...liveArticles[idx],
    ...updates,
    updatedDate: new Date().toISOString().split("T")[0],
  };

  liveArticles[idx] = updated;
  return updated;
}

export async function deleteMockArticle(id: string): Promise<boolean> {
  const prevLen = liveArticles.length;
  liveArticles = liveArticles.filter((a) => a.id !== id && a.slug !== id);
  return liveArticles.length < prevLen;
}

export async function duplicateMockArticle(id: string): Promise<AdminArticleItem | null> {
  const target = liveArticles.find((a) => a.id === id || a.slug === id);
  if (!target) return null;

  const duplicated: AdminArticleItem = {
    ...target,
    id: `art_${Date.now()}`,
    slug: `${target.slug}-copy`,
    title: `${target.title} (Copy)`,
    status: "draft",
    featured: false,
    publishedDate: new Date().toISOString().split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
    views: 0,
  };

  liveArticles = [duplicated, ...liveArticles];
  return duplicated;
}

export async function togglePublishMockArticle(
  id: string
): Promise<AdminArticleItem | null> {
  const idx = liveArticles.findIndex((a) => a.id === id || a.slug === id);
  if (idx === -1) return null;

  const current = liveArticles[idx];
  const newStatus = current.status === "published" ? "draft" : "published";
  const updated: AdminArticleItem = {
    ...current,
    status: newStatus,
    updatedDate: new Date().toISOString().split("T")[0],
  };

  liveArticles[idx] = updated;
  return updated;
}

export function syncLiveArticles(articles: AdminArticleItem[]): void {
  liveArticles = [...articles];
}

export async function setMockArticleFeatured(
  id: string
): Promise<AdminArticleItem | null> {
  liveArticles = liveArticles.map((a) => ({
    ...a,
    featured: a.id === id || a.slug === id,
  }));
  const found = liveArticles.find((a) => a.id === id || a.slug === id);
  return found || null;
}

/* PAYMENTS REPOSITORY */
export function syncLivePayments(payments: AdminPayment[]): void {
  livePayments = [...payments];
}

export function getLivePaymentsList(): AdminPayment[] {
  return [...livePayments];
}

export async function getPaymentMetrics(): Promise<PaymentMetrics> {
  const thisMonth = livePayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const paidSessions = livePayments.filter((p) => p.status === "paid" || p.status === "partially_refunded").length;
  const totalRefunded = livePayments.reduce((sum, p) => sum + (p.amountRefunded || 0), 0);
  const netRevenue = thisMonth - totalRefunded;

  return {
    thisMonth,
    paidSessions,
    totalRefunded,
    netRevenue,
    refundedAmount: totalRefunded,
    pendingCount: 0,
  };
}

export async function getPayments(options?: {
  status?: string;
  search?: string;
}): Promise<AdminPayment[]> {
  let list = [...livePayments];

  if (options?.status && options.status !== "all") {
    list = list.filter((p) => p.status === options.status);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.clientName.toLowerCase().includes(q) ||
        p.clientEmail.toLowerCase().includes(q) ||
        p.bookingNumber.toLowerCase().includes(q) ||
        (p.helcimTransactionId && p.helcimTransactionId.toLowerCase().includes(q)) ||
        (p.stripePaymentIntentId && p.stripePaymentIntentId.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getPaymentById(id: string): Promise<AdminPayment | null> {
  const found = livePayments.find((p) => p.id === id || p.bookingId === id);
  return found || null;
}

export async function refundMockPayment(
  id: string,
  refundAmount: number,
  type: "full" | "partial"
): Promise<AdminPayment | null> {
  const idx = livePayments.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const current = livePayments[idx];
  const newAmountRefunded =
    type === "full" ? current.amount : (current.amountRefunded || 0) + refundAmount;
  const newStatus: PaymentStatus =
    newAmountRefunded >= current.amount ? "refunded" : "partially_refunded";
  const updated: AdminPayment = {
    ...current,
    status: newStatus,
    amountRefunded: newAmountRefunded,
    netAmount: Math.max(0, current.amount - newAmountRefunded),
    refundedAt: new Date().toISOString(),
  };
  livePayments[idx] = updated;
  return updated;
}

/* SETTINGS REPOSITORY */
export async function getWeeklySchedule(): Promise<DaySchedule[]> {
  return liveSchedule;
}

export async function updateWeeklySchedule(newSchedule: DaySchedule[]): Promise<DaySchedule[]> {
  liveSchedule = [...newSchedule];
  return liveSchedule;
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  return liveBlockedDates;
}

export async function addBlockedDate(date: string, reason: string): Promise<BlockedDate> {
  const item: BlockedDate = {
    id: `blk_${Date.now()}`,
    date,
    reason,
  };
  liveBlockedDates = [item, ...liveBlockedDates];
  return item;
}

export async function removeBlockedDate(id: string): Promise<boolean> {
  const prev = liveBlockedDates.length;
  liveBlockedDates = liveBlockedDates.filter((b) => b.id !== id);
  return liveBlockedDates.length < prev;
}

export async function getPricingSettings(): Promise<PricingSettings> {
  return livePricingSettings;
}

export async function updatePricingSettings(settings: PricingSettings): Promise<PricingSettings> {
  livePricingSettings = { ...settings };
  return livePricingSettings;
}

export async function getBookingPolicySettings(): Promise<BookingPolicySettings> {
  return liveBookingPolicy;
}

export async function updateBookingPolicySettings(settings: BookingPolicySettings): Promise<BookingPolicySettings> {
  liveBookingPolicy = { ...settings };
  return liveBookingPolicy;
}

export async function getProfileSettings(): Promise<ProfileSettings> {
  return liveProfileSettings;
}

export async function updateProfileSettings(settings: ProfileSettings): Promise<ProfileSettings> {
  liveProfileSettings = { ...settings };
  return liveProfileSettings;
}

/* NOTIFICATIONS REPOSITORY */
export async function getNotifications(): Promise<AdminNotification[]> {
  return liveNotifications;
}

export async function markNotificationRead(id: string): Promise<void> {
  liveNotifications = liveNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
}

export async function markAllNotificationsRead(): Promise<void> {
  liveNotifications = liveNotifications.map((n) => ({ ...n, read: true }));
}

/* GLOBAL SEARCH ACROSS SYSTEM */
export interface SearchGroupResult {
  type: "booking" | "client" | "lead" | "article";
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  href?: string;
  data?: any;
}

export async function globalSearch(query: string): Promise<{
  bookings: SearchGroupResult[];
  clients: SearchGroupResult[];
  leads: SearchGroupResult[];
  articles: SearchGroupResult[];
  totalCount: number;
}> {
  if (!query || query.trim().length === 0) {
    return { bookings: [], clients: [], leads: [], articles: [], totalCount: 0 };
  }

  const q = query.toLowerCase().trim();

  const bookings: SearchGroupResult[] = liveBookings
    .filter(
      (b) =>
        b.primaryClientName.toLowerCase().includes(q) ||
        b.primaryClientEmail.toLowerCase().includes(q) ||
        b.bookingNumber.toLowerCase().includes(q) ||
        b.coachingArea.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((b) => ({
      type: "booking",
      id: b.id,
      title: `${b.primaryClientName} — ${b.bookingNumber}`,
      subtitle: `${b.sessionDate} at ${b.sessionTime} · ${b.coachingArea}`,
      badge: b.status,
      data: b,
    }));

  const clients: SearchGroupResult[] = liveClients
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((c) => ({
      type: "client",
      id: c.id,
      title: c.name,
      subtitle: `${c.email} · ${c.location} (${c.totalBookings} sessions)`,
      href: `/admin/clients/${c.id}`,
    }));

  const leads: SearchGroupResult[] = liveLeads
    .filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.selectedArea.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((l) => ({
      type: "lead",
      id: l.id,
      title: l.name,
      subtitle: `${l.email} · ${l.selectedArea} lead`,
      badge: l.status,
      data: l,
    }));

  const articles: SearchGroupResult[] = liveArticles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((a) => ({
      type: "article",
      id: a.id,
      title: a.title,
      subtitle: `${a.category} · ${a.readTime}`,
      badge: a.status,
      href: `/admin/articles`,
    }));

  const totalCount =
    bookings.length + clients.length + leads.length + articles.length;

  return { bookings, clients, leads, articles, totalCount };
}
