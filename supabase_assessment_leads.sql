-- Supabase Table: assessment_leads
-- Stores leads captured from the Amity Vale Connection Check-In

CREATE TABLE IF NOT EXISTS public.assessment_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    selected_area TEXT NOT NULL,
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    lead_source TEXT NOT NULL DEFAULT 'free_connection_checkin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for querying by selected area and marketing consent
CREATE INDEX IF NOT EXISTS idx_assessment_leads_area ON public.assessment_leads(selected_area);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_marketing ON public.assessment_leads(marketing_consent);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_created ON public.assessment_leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.assessment_leads ENABLE ROW LEVEL SECURITY;

-- Allow anon service role or server-side insert/upsert
CREATE POLICY "Allow server-side upsert on assessment_leads"
    ON public.assessment_leads
    FOR ALL
    USING (true)
    WITH CHECK (true);
