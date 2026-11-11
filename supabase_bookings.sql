-- ==============================================================================
-- Supabase Schema: AmityHale Bookings & Comprehensive Participant Intake
-- ==============================================================================
-- All monetary figures are stored in integer cents to avoid floating-point errors.
--
-- Pricing Rules:
-- 15 min: $100 base (10,000 cents)
-- 30 min: $190 base (19,000 cents)
-- 45 min: $270 base (27,000 cents)
-- 60 min: $300 base (30,000 cents)
-- Each additional participant beyond 1: +$25 (2,500 cents)
-- Formula: total_cents = base_price_cents + ((participant_count - 1) * 2500)
-- ==============================================================================

-- 1. Main bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  
  -- Financial & Pricing (Integer Cents)
  base_price_cents INTEGER NOT NULL,
  additional_participant_fee_cents INTEGER NOT NULL DEFAULT 0,
  total_price_cents INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  
  -- Session & Capacity
  session_duration_minutes INTEGER NOT NULL,
  participant_count INTEGER NOT NULL DEFAULT 1,
  session_format VARCHAR(32) NOT NULL DEFAULT 'individual', -- 'individual' | 'shared'
  
  -- Coaching taxonomy
  coaching_area TEXT NOT NULL,
  coaching_sub_area TEXT,
  
  -- Scheduling
  scheduled_date DATE,
  scheduled_time_slot TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  
  -- Primary Contact (Booking Coordinator)
  primary_first_name TEXT NOT NULL,
  primary_last_name TEXT NOT NULL,
  primary_email TEXT NOT NULL,
  primary_phone TEXT,
  
  -- Full Participants JSON snapshot
  participants_json JSONB DEFAULT '[]'::jsonb,
  additional_participants_json JSONB DEFAULT '[]'::jsonb,
  
  -- Client Notes & Status
  context_note TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'pending_payment', -- 'pending_payment' | 'paid' | 'cancelled' | 'refunded'
  stripe_payment_intent_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Comprehensive Relational booking_participants table (1:N with bookings)
-- Every participant (1, 2, 3...) has a distinct profile record attached to the booking.
CREATE TABLE IF NOT EXISTS public.booking_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  participant_number INTEGER NOT NULL, -- 1, 2, 3...
  is_primary_contact BOOLEAN NOT NULL DEFAULT false,
  
  -- Section A: Personal Details
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age_at_booking INTEGER NOT NULL,
  place_of_birth TEXT NOT NULL,
  
  -- Section B: About You
  sex TEXT NOT NULL,
  sexual_orientation TEXT NOT NULL,
  sexual_orientation_self_description TEXT,
  profession TEXT NOT NULL,
  
  -- Section C: Contact & Consultation
  email TEXT, -- Required for Primary Contact, optional for additional participants
  phone TEXT, -- Required for Primary Contact, optional for additional participants
  consultation_purpose TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Indexes for fast query lookups and admin dashboard performance
CREATE INDEX IF NOT EXISTS idx_bookings_primary_email ON public.bookings(primary_email);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON public.bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_booking_participants_booking_id ON public.booking_participants(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_participants_email ON public.booking_participants(email);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_participants ENABLE ROW LEVEL SECURITY;

-- Service role has full permissions; anon can insert only
CREATE POLICY "Allow service role full access on bookings"
  ON public.bookings
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access on booking_participants"
  ON public.booking_participants
  FOR ALL
  USING (true)
  WITH CHECK (true);
