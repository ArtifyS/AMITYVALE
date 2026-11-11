import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { calculateSessionPrice, SESSION_PRICES, MAX_PARTICIPANTS } from "@/lib/pricingConfig";
import {
  ParticipantProfile,
  validateParticipantProfile,
  calculateAgeFromDob,
} from "@/lib/participantProfile";
import fs from "fs/promises";
import path from "path";

interface AdditionalParticipantInput {
  name?: string;
  email?: string;
}

interface BookingRequestBody {
  coachingArea?: string;
  coachingSubArea?: string;
  duration?: number;
  participantCount?: number;
  participants?: ParticipantProfile[];
  date?: string | null;
  timeSlot?: string | null;
  timezone?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  additionalParticipants?: AdditionalParticipantInput[];
  contextNote?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingRequestBody = await req.json();

    // 1. Validate session duration
    const validDurations = Object.keys(SESSION_PRICES).map(Number);
    const duration = Number(body.duration);
    if (!validDurations.includes(duration)) {
      return NextResponse.json(
        { error: "Please select a valid session duration." },
        { status: 400 }
      );
    }

    // 2. Validate and sanitize participant count
    let participantCount = Number(body.participantCount);
    if (!participantCount || isNaN(participantCount) || participantCount < 1) {
      participantCount = 1;
    }
    if (participantCount > MAX_PARTICIPANTS) {
      participantCount = MAX_PARTICIPANTS;
    }

    // 3. Process and validate participants profiles
    const rawParticipants: ParticipantProfile[] = Array.isArray(body.participants)
      ? body.participants
      : [];

    const sanitizedParticipants: Array<ParticipantProfile & {
      participantNumber: number;
      isPrimaryContact: boolean;
      ageAtBooking: number | null;
    }> = [];

    if (rawParticipants.length > 0) {
      // Validate up to participantCount profiles
      for (let i = 0; i < participantCount; i++) {
        const raw = rawParticipants[i] || ({} as ParticipantProfile);
        const isPrimary = i === 0;
        const { isValid, errors } = validateParticipantProfile(raw, { isPrimary });
        if (!isValid) {
          const firstErr = Object.values(errors)[0] || "Invalid participant details.";
          return NextResponse.json(
            { error: `Participant ${i + 1}: ${firstErr}` },
            { status: 400 }
          );
        }

        const ageAtBooking = calculateAgeFromDob(raw.dateOfBirth);

        sanitizedParticipants.push({
          participantNumber: i + 1,
          isPrimaryContact: isPrimary,
          firstName: raw.firstName.trim(),
          lastName: raw.lastName.trim(),
          dateOfBirth: raw.dateOfBirth.trim(),
          ageAtBooking,
          placeOfBirth: raw.placeOfBirth.trim(),
          sex: raw.sex,
          sexualOrientation: raw.sexualOrientation,
          sexualOrientationSelfDescribe: raw.sexualOrientationSelfDescribe?.trim() || "",
          profession: raw.profession.trim(),
          email: raw.email.trim().toLowerCase(),
          phone: raw.phone.trim(),
          consultationPurpose: raw.consultationPurpose.trim(),
        });
      }
    } else {
      // Fallback for basic contact details
      const cleanFirstName = (body.firstName || "").trim();
      const cleanLastName = (body.lastName || "").trim();
      const cleanEmail = (body.email || "").trim().toLowerCase();
      const cleanPhone = (body.phone || "").trim();

      if (!cleanFirstName || !cleanLastName) {
        return NextResponse.json(
          { error: "First name and last name are required." },
          { status: 400 }
        );
      }

      sanitizedParticipants.push({
        participantNumber: 1,
        isPrimaryContact: true,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        dateOfBirth: "",
        ageAtBooking: null,
        placeOfBirth: "",
        sex: "",
        sexualOrientation: "",
        sexualOrientationSelfDescribe: "",
        profession: "",
        email: cleanEmail,
        phone: cleanPhone,
        consultationPurpose: (body.contextNote || "").trim(),
      });
    }

    const primaryParticipant = sanitizedParticipants[0];

    // 4. SERVER-AUTHORITATIVE PRICE CALCULATION
    // Never trust frontend prices, formulas, or totals.
    const pricing = calculateSessionPrice(duration, participantCount);

    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();

    const bookingRecord = {
      id: bookingId,
      // Pricing data (integer cents for financial precision)
      base_price: pricing.basePrice,
      additional_participant_fee: pricing.additionalParticipantFee,
      total_price: pricing.total,
      base_price_cents: pricing.basePriceCents,
      additional_participant_fee_cents: pricing.additionalParticipantFeeCents,
      total_price_cents: pricing.totalCents,
      currency: "USD",
      // Session details
      session_duration_minutes: pricing.duration,
      participant_count: pricing.participantCount,
      session_format: pricing.sessionFormatKey, // 'individual' | 'shared'
      session_format_label: pricing.sessionFormat,
      coaching_area: body.coachingArea || "intimacy",
      coaching_sub_area: body.coachingSubArea || null,
      scheduled_date: body.date || null,
      scheduled_time_slot: body.timeSlot || null,
      timezone: body.timezone || "America/New_York",
      // Primary Contact convenience fields
      primary_first_name: primaryParticipant.firstName,
      primary_last_name: primaryParticipant.lastName,
      primary_email: primaryParticipant.email,
      primary_phone: primaryParticipant.phone || null,
      // Full Participants JSON snapshot
      participants_json: sanitizedParticipants,
      // Notes & Status
      context_note: primaryParticipant.consultationPurpose || null,
      status: "pending_payment",
      created_at: now,
      updated_at: now,
    };

    let supabaseSaved = false;

    // 5. Save to Supabase if configured
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { error: bookingErr } = await supabase.from("bookings").insert({
          id: bookingRecord.id,
          base_price_cents: bookingRecord.base_price_cents,
          additional_participant_fee_cents: bookingRecord.additional_participant_fee_cents,
          total_price_cents: bookingRecord.total_price_cents,
          currency: bookingRecord.currency,
          session_duration_minutes: bookingRecord.session_duration_minutes,
          participant_count: bookingRecord.participant_count,
          session_format: bookingRecord.session_format,
          coaching_area: bookingRecord.coaching_area,
          coaching_sub_area: bookingRecord.coaching_sub_area,
          scheduled_date: bookingRecord.scheduled_date,
          scheduled_time_slot: bookingRecord.scheduled_time_slot,
          timezone: bookingRecord.timezone,
          primary_first_name: bookingRecord.primary_first_name,
          primary_last_name: bookingRecord.primary_last_name,
          primary_email: bookingRecord.primary_email,
          primary_phone: bookingRecord.primary_phone,
          additional_participants_json: sanitizedParticipants.slice(1),
          participants_json: sanitizedParticipants,
          context_note: bookingRecord.context_note,
          status: bookingRecord.status,
          created_at: bookingRecord.created_at,
          updated_at: bookingRecord.updated_at,
        });

        if (!bookingErr) {
          supabaseSaved = true;

          // Relational participant rows insertion
          const participantRows = sanitizedParticipants.map((p) => ({
            booking_id: bookingRecord.id,
            participant_number: p.participantNumber,
            is_primary_contact: p.isPrimaryContact,
            first_name: p.firstName,
            last_name: p.lastName,
            date_of_birth: p.dateOfBirth || null,
            age_at_booking: p.ageAtBooking,
            place_of_birth: p.placeOfBirth,
            sex: p.sex,
            sexual_orientation: p.sexualOrientation,
            sexual_orientation_self_description: p.sexualOrientationSelfDescribe || null,
            profession: p.profession,
            email: p.email || null,
            phone: p.phone || null,
            consultation_purpose: p.consultationPurpose,
            created_at: now,
          }));

          try {
            await supabase.from("booking_participants").insert(participantRows);
          } catch (pErr: any) {
            console.warn("Optional booking_participants table write:", pErr?.message);
          }
        } else {
          console.warn("Supabase bookings insert warning:", bookingErr.message);
        }
      } catch (sbErr) {
        console.warn("Supabase client error:", sbErr);
      }
    }

    // 6. Persistent local file backup (local persistence and audit trail)
    try {
      const dataDir = path.join(process.cwd(), "data");
      const filePath = path.join(dataDir, "bookings.json");

      await fs.mkdir(dataDir, { recursive: true });

      let existingBookings: any[] = [];
      try {
        const content = await fs.readFile(filePath, "utf-8");
        existingBookings = JSON.parse(content);
      } catch {
        existingBookings = [];
      }

      existingBookings.push(bookingRecord);
      await fs.writeFile(filePath, JSON.stringify(existingBookings, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Local bookings file write skipped (serverless filesystem):", fsErr);
    }

    return NextResponse.json({
      success: true,
      bookingId,
      pricing: {
        duration: pricing.duration,
        basePrice: pricing.basePrice,
        additionalParticipants: pricing.additionalParticipants,
        additionalParticipantFee: pricing.additionalParticipantFee,
        total: pricing.total,
        participantCount: pricing.participantCount,
        sessionFormat: pricing.sessionFormat,
      },
      savedToDatabase: supabaseSaved,
    });
  } catch (err: any) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking." },
      { status: 500 }
    );
  }
}
