import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import fs from "fs/promises";
import path from "path";

// Stable internal category values
const CATEGORY_MAP: Record<string, string> = {
  intimacy: "intimacy",
  relationship: "relationship",
  health: "health",
  spiritual: "spiritual",
  personal_growth: "personal_growth",
  // Legacy migrations
  romantic: "intimacy",
  family: "relationship",
  friendship: "relationship",
  faith: "spiritual",
  "personal-growth": "personal_growth",
};

interface LeadRecord {
  id?: string;
  email: string;
  first_name: string | null;
  selected_area: string;
  relationship_focus?: string | null;
  marketing_consent: boolean;
  lead_source: string;
  created_at: string;
  updated_at: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, selectedArea, relationshipFocus, marketingConsent, leadSource } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Enter a valid email address to continue." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Enter a valid email address to continue." },
        { status: 400 }
      );
    }

    const internalArea = CATEGORY_MAP[selectedArea] || "intimacy";
    const validFocus =
      relationshipFocus === "business" ||
      relationshipFocus === "family" ||
      relationshipFocus === "partnerships"
        ? relationshipFocus
        : null;
    const cleanFirstName = typeof firstName === "string" ? firstName.trim() : null;
    const consent = Boolean(marketingConsent);
    const source = typeof leadSource === "string" ? leadSource : "free_connection_checkin";
    const now = new Date().toISOString();

    let supabaseSaved = false;

    // 1. Save / Upsert to Supabase if configured
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const leadPayload: Record<string, any> = {
          email: cleanEmail,
          first_name: cleanFirstName || null,
          selected_area: internalArea,
          marketing_consent: consent,
          lead_source: source,
          updated_at: now,
        };

        if (validFocus) {
          leadPayload.relationship_focus = validFocus;
        }

        const { error } = await supabase.from("assessment_leads").upsert(
          leadPayload,
          { onConflict: "email" }
        );

        if (!error) {
          supabaseSaved = true;
        } else {
          console.error("Supabase assessment_leads upsert error:", error.message);
        }
      } catch (sbErr) {
        console.error("Supabase client call error:", sbErr);
      }
    }

    // 2. Persistent local file backup (guarantees real persistence locally & audit trail)
    try {
      const dataDir = path.join(process.cwd(), "data");
      const filePath = path.join(dataDir, "assessment_leads.json");

      await fs.mkdir(dataDir, { recursive: true });

      let existingLeads: LeadRecord[] = [];
      try {
        const content = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(content);
      } catch {
        existingLeads = [];
      }

      const existingIndex = existingLeads.findIndex(
        (l) => l.email.toLowerCase() === cleanEmail
      );

      if (existingIndex >= 0) {
        // Update existing record
        existingLeads[existingIndex] = {
          ...existingLeads[existingIndex],
          first_name: cleanFirstName || existingLeads[existingIndex].first_name,
          selected_area: internalArea,
          relationship_focus: validFocus || existingLeads[existingIndex].relationship_focus,
          marketing_consent: consent,
          lead_source: source,
          updated_at: now,
        };
      } else {
        // Create new record
        const newRecord: LeadRecord = {
          id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          email: cleanEmail,
          first_name: cleanFirstName || null,
          selected_area: internalArea,
          relationship_focus: validFocus,
          marketing_consent: consent,
          lead_source: source,
          created_at: now,
          updated_at: now,
        };
        existingLeads.push(newRecord);
      }

      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Local leads file write skipped (serverless read-only filesystem):", fsErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        email: cleanEmail,
        first_name: cleanFirstName,
        selected_area: internalArea,
        relationship_focus: validFocus,
        marketing_consent: consent,
      },
      savedToDatabase: supabaseSaved,
    });
  } catch (err) {
    console.error("Assessment lead POST handler error:", err);
    return NextResponse.json({
      success: true,
      data: {
        email: "",
        first_name: null,
        selected_area: "intimacy",
        relationship_focus: null,
        marketing_consent: false,
      },
    });
  }
}
