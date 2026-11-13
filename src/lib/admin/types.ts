import { ParticipantProfile } from "@/lib/participantProfile";
import { SessionDuration } from "@/lib/pricingConfig";

export type BookingStatus =
  | "confirmed"
  | "needs_review"
  | "completed"
  | "no_show"
  | "cancelled"
  | "in_progress"
  | "rescheduled";
export type PaymentStatus = "paid" | "refunded" | "partially_refunded" | "pending" | "failed";
export type LeadStatus = "active" | "contacted" | "converted" | "archived" | "new" | "booked";
export type ArticleStatus = "draft" | "published";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  title: string;
}

export interface AdminBookingParticipant extends ParticipantProfile {
  participantNumber: number;
  isPrimaryContact: boolean;
  ageAtBooking?: number | null;
}

export interface BookingActivityItem {
  id: string;
  type: "created" | "paid" | "confirmed" | "rescheduled" | "completed" | "no_show" | "cancelled" | "note_added";
  title: string;
  description?: string;
  timestamp: string;
}

export interface AdminBooking {
  id: string;
  bookingNumber: string;
  clientId?: string;
  primaryClientName: string;
  primaryClientEmail: string;
  primaryClientPhone: string;
  coachingArea: string;
  coachingSubArea?: string;
  duration: SessionDuration;
  participantCount: number;
  participants: AdminBookingParticipant[];
  sessionDate: string; // "YYYY-MM-DD"
  sessionTime: string; // "09:00 AM"
  timezone: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amountTotal: number;
  basePrice: number;
  additionalFee: number;
  currency: string;
  googleMeetLink?: string;
  createdAt: string;
  clientNotes?: string;
  adminNotes?: string;
  activityTimeline: BookingActivityItem[];
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalBookings: number;
  totalSpend: number;
  clientSince: string;
  firstSessionDate: string;
  lastSessionDate: string;
  nextSessionDate?: string | null;
  status: "active" | "completed" | "paused";
  primaryCoachingArea: string;
  primaryFocus?: string;
  notes?: string;
  privateNotes?: string[];
}

export interface AdminLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  selectedArea: string; // "intimacy" | "relationship" | "health" | "spiritual" | "personal_growth"
  relationshipFocus?: string | null; // "business" | "family" | "partnerships"
  leadSource: string;
  status: LeadStatus;
  createdAt: string;
  contactedAt?: string;
  convertedAt?: string;
  clientId?: string;
  convertedBookingId?: string;
  firstBookingAmount?: number;
  firstBookingDetails?: string;
  primaryChallenge?: string;
  assessmentSummary?: string;
  notes?: string;
}

export interface LeadMetrics {
  allLeads: number; // current active non-converted, non-archived leads
  contacted: number;
  converted: number;
  conversionRate: number; // e.g. 12.5%
  total: number;
  newLeads?: number; // legacy compatibility
  allActiveCount?: number;
}

export interface AdminPayment {
  id: string;
  bookingId: string;
  bookingNumber: string;
  clientId?: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  amountRefunded?: number;
  netAmount?: number;
  basePrice: number;
  additionalFee: number;
  participantCount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  paymentMethod: string;
  cardBrand?: string;
  cardLast4?: string;
  helcimTransactionId: string;
  stripePaymentIntentId?: string; // legacy deprecated
  receiptUrl?: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface PaymentMetrics {
  thisMonth: number;
  paidSessions: number;
  totalRefunded: number;
  netRevenue: number;
  pendingCount?: number;
  refundedAmount?: number;
}

export interface AdminArticleItem {
  id: string;
  slug: string;
  title: string;
  category: "Relationships" | "Business" | "Faith & Spiritual Life" | "Personal Growth";
  excerpt: string;
  content: string;
  featuredImage: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  views: number;
  status: ArticleStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface DashboardStats {
  todaySessionsCount: number;
  activeBookingsCount: number;
  needsReviewCount?: number;
  totalRevenueMonth: number;
  revenueGrowthPercent: number;
  newLeadsCount: number;
  totalClientsCount: number;
  completedSessionsCount: number;
  totalRevenueAllTime: number;
}

/* SETTINGS INTERFACES */
export interface TimeWindow {
  start: string;
  end: string;
}

export interface DaySchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  enabled: boolean;
  windows: TimeWindow[];
}

export interface BlockedDate {
  id: string;
  date: string;
  reason: string;
}

export interface PricingSettings {
  duration15: number;
  duration30: number;
  duration45: number;
  duration60: number;
  additionalParticipant: number;
}

export interface BookingPolicySettings {
  minimumNoticeHours: number;
  rescheduleCutoffHours: number;
  cancellationCutoffHours: number;
  defaultTimezone: string;
}

export interface ProfileSettings {
  displayName: string;
  businessEmail: string;
  phone: string;
  timezone: string;
  businessName: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "booking" | "reschedule" | "lead" | "article" | "payment";
  link?: string;
}
