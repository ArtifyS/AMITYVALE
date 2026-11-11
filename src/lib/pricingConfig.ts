/**
 * Shared Pricing Configuration for AmityHale
 * Single source of truth for pricing calculations across Pricing, Booking, Review,
 * Database records, and eventual Stripe checkout.
 */

export const SESSION_PRICES = {
  15: 100,
  30: 190,
  45: 270,
  60: 300,
} as const;

export type SessionDuration = keyof typeof SESSION_PRICES;

export const ADDITIONAL_PARTICIPANT_FEE = 25;

/**
 * Optional technical ceiling to prevent overflow or malformed inputs.
 * Mr. Angel has not set a business maximum yet, so this is high and configurable.
 */
export const MAX_PARTICIPANTS = 20;

export interface PriceCalculation {
  duration: SessionDuration;
  participantCount: number;
  basePrice: number;
  additionalParticipants: number;
  additionalParticipantFee: number;
  total: number;
  basePriceCents: number;
  additionalParticipantFeeCents: number;
  totalPriceCents: number;
  totalCents: number;
  isShared: boolean;
  sessionFormat: "Individual Session" | "Shared Session";
  sessionFormatKey: "individual" | "shared";
}

/**
 * Centralized pricing calculation function.
 * Formula: totalPrice = baseSessionPrice + ((participantCount - 1) * 25)
 */
export function calculateSessionPrice(
  duration: number | null | undefined,
  participantCount: number | null | undefined
): PriceCalculation {
  // Sanitize duration
  const validDuration: SessionDuration =
    duration === 15 || duration === 30 || duration === 45 || duration === 60
      ? duration
      : 30;

  // Sanitize participant count (must be integer >= 1)
  const parsedCount = typeof participantCount === "number" ? Math.floor(participantCount) : 1;
  const validParticipantCount = Math.max(1, Math.min(parsedCount || 1, MAX_PARTICIPANTS));

  const basePrice = SESSION_PRICES[validDuration];
  const additionalParticipants = Math.max(0, validParticipantCount - 1);
  const additionalParticipantFee = additionalParticipants * ADDITIONAL_PARTICIPANT_FEE;
  const total = basePrice + additionalParticipantFee;

  return {
    duration: validDuration,
    participantCount: validParticipantCount,
    basePrice,
    additionalParticipants,
    additionalParticipantFee,
    total,
    basePriceCents: basePrice * 100,
    additionalParticipantFeeCents: additionalParticipantFee * 100,
    totalPriceCents: total * 100,
    totalCents: total * 100,
    isShared: validParticipantCount > 1,
    sessionFormat: validParticipantCount > 1 ? "Shared Session" : "Individual Session",
    sessionFormatKey: validParticipantCount > 1 ? "shared" : "individual",
  };
}

export const sessionOptions = {
  15: {
    id: "session_15",
    duration: 15 as SessionDuration,
    label: "Quick Check-In",
    price: SESSION_PRICES[15],
    description: "For one focused question, situation, or conversation that needs clarity.",
    fit: "Focused • Brief • Direct",
    emphasize: false,
  },
  30: {
    id: "session_30",
    duration: 30 as SessionDuration,
    label: "Focused Session",
    price: SESSION_PRICES[30],
    description: "More room to explore one specific concern, pattern, or difficult conversation.",
    fit: "Focused • Exploratory • Practical",
    emphasize: true, // 30-min card is MOST CHOSEN
  },
  45: {
    id: "session_45",
    duration: 45 as SessionDuration,
    label: "Extended Session",
    price: SESSION_PRICES[45],
    description: "For conversations that need more time to understand the pattern and what may need to change.",
    fit: "Deeper • Reflective • Unhurried",
    emphasize: false,
  },
  60: {
    id: "session_60",
    duration: 60 as SessionDuration,
    label: "Full Session",
    price: SESSION_PRICES[60],
    description: "The most spacious option for exploring communication, connection, intimacy, or a more complex situation.",
    fit: "Full • Spacious • In-Depth",
    emphasize: false,
  },
} as const;

export function getSessionOption(duration: number) {
  if (duration === 15 || duration === 30 || duration === 45 || duration === 60) {
    return sessionOptions[duration];
  }
  return null;
}
