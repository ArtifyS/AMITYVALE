/**
 * Participant Profile Definitions and Utilities for AmityHale Booking
 */

export interface ParticipantProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO format "YYYY-MM-DD"
  age?: number | null; // Derived automatically
  placeOfBirth: string;
  sex: "Female" | "Male" | "Intersex" | "Prefer not to say" | "";
  sexualOrientation:
    | "Straight / Heterosexual"
    | "Gay"
    | "Lesbian"
    | "Bisexual"
    | "Asexual"
    | "Pansexual"
    | "Queer"
    | "Questioning"
    | "Prefer to self-describe"
    | "Prefer not to say"
    | "";
  sexualOrientationSelfDescribe?: string;
  profession: string;
  email: string;
  phone: string;
  consultationPurpose: string;
}

export const SEX_OPTIONS = [
  "Female",
  "Male",
  "Intersex",
  "Prefer not to say",
] as const;

export const SEXUAL_ORIENTATION_OPTIONS = [
  "Straight / Heterosexual",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Asexual",
  "Pansexual",
  "Queer",
  "Questioning",
  "Prefer to self-describe",
  "Prefer not to say",
] as const;

export function createEmptyParticipantProfile(): ParticipantProfile {
  return {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: null,
    placeOfBirth: "",
    sex: "",
    sexualOrientation: "",
    sexualOrientationSelfDescribe: "",
    profession: "",
    email: "",
    phone: "",
    consultationPurpose: "",
  };
}

/**
 * Calculates exact age in years from a "YYYY-MM-DD" string.
 * Uses local date decomposition to avoid UTC timezone shifts.
 */
export function calculateAgeFromDob(dobString: string): number | null {
  if (!dobString || typeof dobString !== "string") return null;
  const parts = dobString.split("-");
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  const birthDate = new Date(year, month, day);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  // Ensure birthDate is not in the future
  if (birthDate > today) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 && age <= 125 ? age : null;
}

export interface ParticipantErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  sex?: string;
  sexualOrientation?: string;
  sexualOrientationSelfDescribe?: string;
  profession?: string;
  email?: string;
  phone?: string;
  consultationPurpose?: string;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single participant profile according to Mr. Angel's required fields.
 * Participant 1 (Primary Contact): Email and Phone are REQUIRED.
 * Additional Participants (2+): Email and Phone are OPTIONAL (validated only if supplied).
 */
export function validateParticipantProfile(
  profile: ParticipantProfile,
  options: { isPrimary?: boolean } = { isPrimary: true }
): { isValid: boolean; errors: ParticipantErrors } {
  const isPrimary = options.isPrimary ?? true;
  const errors: ParticipantErrors = {};

  if (!profile.firstName.trim()) {
    errors.firstName = "Enter a first name.";
  }

  if (!profile.lastName.trim()) {
    errors.lastName = "Enter a last name.";
  }

  if (!profile.dateOfBirth.trim()) {
    errors.dateOfBirth = "Select a date of birth.";
  } else {
    const age = calculateAgeFromDob(profile.dateOfBirth);
    if (age === null) {
      errors.dateOfBirth = "Enter a valid past date of birth.";
    }
  }

  if (!profile.placeOfBirth.trim()) {
    errors.placeOfBirth = "Enter a place of birth.";
  }

  if (!profile.sex.trim()) {
    errors.sex = "Select an option.";
  }

  if (!profile.sexualOrientation.trim()) {
    errors.sexualOrientation = "Select an option.";
  } else if (
    profile.sexualOrientation === "Prefer to self-describe" &&
    !profile.sexualOrientationSelfDescribe?.trim()
  ) {
    errors.sexualOrientationSelfDescribe = "Please specify.";
  }

  if (!profile.profession.trim()) {
    errors.profession = "Enter a profession.";
  }

  // Section C: Contact & Consultation
  const cleanEmail = profile.email.trim();
  if (isPrimary) {
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      errors.email = "Enter a valid email address.";
    }
  } else {
    // Optional for additional participants, but validate if entered
    if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) {
      errors.email = "Enter a valid email address.";
    }
  }

  const cleanPhone = profile.phone.trim();
  if (isPrimary) {
    if (!cleanPhone) {
      errors.phone = "Enter a phone number.";
    }
  } else {
    // Optional for additional participants, but basic validation if entered
    if (cleanPhone && cleanPhone.length < 5) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (!profile.consultationPurpose.trim()) {
    errors.consultationPurpose = "Briefly describe the purpose of the consultation.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

