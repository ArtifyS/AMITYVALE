"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  Heart, 
  Users, 
  ArrowUpRight,
  Leaf, 
  HelpCircle,
  Lock
} from "lucide-react";
import { 
  ASSESSMENT_CATEGORIES, 
  RESPONSE_OPTIONS, 
  SAFETY_QUESTION,
  getQuestionsForCategory, 
  calculateResults,
  AssessmentCategoryKey, 
  CategoryInfo,
  QuestionItem,
  DimensionResult,
  AssessmentResultData,
  ScoreBand
} from "@/lib/assessmentData";
import { Button } from "@/components/ui/Button";

type AssessmentStep = 
  | "intro"
  | "email_capture"
  | "category_prompt"
  | "question"
  | "safety"
  | "reflection"
  | "results";

// Category visual styling tokens: subtle 3.5% tints, subtle borders, accent colors
const CATEGORY_STYLES: Record<
  AssessmentCategoryKey,
  {
    accent: string;
    bgTint: string;
    borderDefault: string;
    iconBg: string;
    iconBorder: string;
    iconColor: string;
  }
> = {
  romantic: {
    accent: "#DE5D52",
    bgTint: "rgba(222, 93, 82, 0.035)",
    borderDefault: "rgba(222, 93, 82, 0.16)",
    iconBg: "rgba(222, 93, 82, 0.09)",
    iconBorder: "rgba(222, 93, 82, 0.18)",
    iconColor: "#DE5D52",
  },
  family: {
    accent: "#C28726",
    bgTint: "rgba(194, 135, 38, 0.035)",
    borderDefault: "rgba(194, 135, 38, 0.18)",
    iconBg: "rgba(194, 135, 38, 0.09)",
    iconBorder: "rgba(194, 135, 38, 0.18)",
    iconColor: "#C28726",
  },
  friendship: {
    accent: "#167E8A",
    bgTint: "rgba(22, 126, 138, 0.035)",
    borderDefault: "rgba(22, 126, 138, 0.18)",
    iconBg: "rgba(22, 126, 138, 0.09)",
    iconBorder: "rgba(22, 126, 138, 0.18)",
    iconColor: "#167E8A",
  },
  faith: {
    accent: "#B87A18",
    bgTint: "rgba(184, 122, 24, 0.035)",
    borderDefault: "rgba(184, 122, 24, 0.18)",
    iconBg: "rgba(184, 122, 24, 0.09)",
    iconBorder: "rgba(184, 122, 24, 0.18)",
    iconColor: "#B87A18",
  },
  "personal-growth": {
    accent: "#127A70",
    bgTint: "rgba(18, 122, 112, 0.035)",
    borderDefault: "rgba(18, 122, 112, 0.18)",
    iconBg: "rgba(18, 122, 112, 0.09)",
    iconBorder: "rgba(18, 122, 112, 0.18)",
    iconColor: "#127A70",
  },
};

// Helper to produce concise, emotionally intelligent main interpretation
function getMainInterpretation(
  cat: AssessmentCategoryKey,
  focus: DimensionResult,
  isBalanced: boolean
): string {
  if (isBalanced) {
    switch (cat) {
      case "romantic":
        return "Your responses reflect a relatively steady baseline across your connection. Rather than sharp division, what stands out is the opportunity to protect everyday warmth and gently nurture deeper emotional intimacy.";
      case "family":
        return "Your answers suggest a relatively stable foundation with this family member. The opportunity is not about solving major crises, but maintaining healthy boundaries and intentional presence.";
      case "friendship":
        return "Your responses suggest a reasonably balanced friendship where care and contact exist, with room to deepen mutual understanding as your lives evolve.";
      case "faith":
        return "Your answers reflect an open and grounded relationship with your faith or spiritual life, with space to explore new questions without feeling unsettled.";
      case "personal-growth":
        return "Your answers indicate a thoughtful, balanced awareness of yourself, with steady room to align your daily choices more intentionally with your values.";
    }
  }

  switch (focus.key) {
    case "communication":
      return cat === "romantic"
        ? "There appears to be a desire for closeness, but important conversations may be getting caught in defensiveness or withdrawal before either of you feels completely met."
        : "Conversations may be getting lost in misunderstanding or unspoken tension, making it harder to talk honestly about what matters most.";
    case "trust":
      return cat === "romantic"
        ? "Your responses suggest that vulnerability may be feeling guarded right now, where sharing deeper feelings or doubts feels less protected than you would like."
        : "Past experiences or guardedness may be making openness feel risky, leading to hesitation before sharing what is genuinely on your mind.";
    case "connection":
      return cat === "romantic"
        ? "The emotional engagement between you may currently feel uneven, where one person carries more of the relational effort while the other drifts into distance."
        : "The relationship may feel somewhat distant or one-sided, leaving a desire for more consistent mutual warmth and reciprocity.";
    case "authenticity":
      return cat === "family"
        ? "You may be spending significant emotional energy managing reactions or keeping the peace, leaving less room to honor your own authentic limits and needs."
        : "A recurring pattern of keeping the peace or accommodating others may be quietly draining your sense of ease and genuine connection.";
    case "repair":
      return cat === "romantic"
        ? "Your answers suggest that conflict may not be ending in true repair, which can leave the same underlying tension returning again in subtle ways."
        : "Tension often passes without being fully resolved, which can allow old grievances to linger quietly beneath the surface.";
    case "meaning_direction":
      return "You may be experiencing a season where familiar sources of meaning feel distant, leaving you searching for a clearer, more grounded spiritual sense of direction.";
    case "honesty_questions":
      return "You may be carrying honest doubts or questions that feel difficult to express openly, creating an internal tension between what you feel and what you think is expected of you.";
    case "values_alignment":
      return "There appears to be a quiet tension between what you value deeply and how daily time, obligations, or energy are currently unfolding.";
    case "connection_support":
      return "Spiritual life may currently feel solitary, without the supportive community, quiet reflection, or guidance you feel you need.";
    case "belief_openness":
      return "You may be untangling inherited expectations from your own genuine convictions, which often feels disorienting before it brings clarity.";
    case "self_awareness":
      return "Automatic emotional reactions may sometimes take the lead before you have space to pause, reflect, and choose how you truly want to respond.";
    case "needs_boundaries":
      return "You may find yourself frequently second-guessing your right to have limits, over-explaining boundaries, or setting your own needs aside.";
    case "self_trust":
      return "A tendency to question your own judgment or carry difficulties alone may be keeping you from making decisions with quiet confidence.";
    case "learning_compassion":
      return "Self-criticism may be quick to arise when things feel uncertain or imperfect, turning normal setbacks into heavier emotional burdens.";
    case "direction_alignment":
      return "Daily demands may be crowding out long-term personal clarity, making it difficult to feel anchored in where you are heading next.";
    default:
      return focus.focusCopy;
  }
}

export function AssessmentExperience() {
  const prefersReducedMotion = useReducedMotion();

  // Assessment & Category State
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<AssessmentCategoryKey | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [hoveredKey, setHoveredKey] = useState<AssessmentCategoryKey | null>(null);
  const [step, setStep] = useState<AssessmentStep>("intro");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [safetyAnswer, setSafetyAnswer] = useState<string | null>(null);
  const [openReflection, setOpenReflection] = useState<string>("");
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [resultData, setResultData] = useState<AssessmentResultData | null>(null);

  // Lead capture state
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadSaveError, setLeadSaveError] = useState<string>("");
  const [leadCapturedInSession, setLeadCapturedInSession] = useState<boolean>(false);
  const [leadSuccessTransition, setLeadSuccessTransition] = useState<boolean>(false);

  // Ref to scroll into view when questions advance
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCategory: CategoryInfo | undefined = ASSESSMENT_CATEGORIES.find(
    (c) => c.id === selectedCategoryKey
  );

  const questions: QuestionItem[] = selectedCategoryKey
    ? getQuestionsForCategory(selectedCategoryKey)
    : [];

  const isInterpersonal = 
    selectedCategoryKey === "romantic" || 
    selectedCategoryKey === "family" || 
    selectedCategoryKey === "friendship";

  // Smooth scroll helper
  const scrollToCard = () => {
    if (typeof window !== "undefined") {
      const topOffset = containerRef.current?.getBoundingClientRect().top ?? 0;
      if (topOffset < 0 || topOffset > 200) {
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  };

  // Step 1: User selects category
  const handleSelectCategory = (catKey: AssessmentCategoryKey) => {
    if (isSelecting) return;
    setIsSelecting(true);
    setSelectedCategoryKey(catKey);
    setAnswers({});
    setSafetyAnswer(null);
    setOpenReflection("");
    setCurrentQuestionIdx(0);

    // Quick selected state before transitioning smoothly
    setTimeout(() => {
      setIsSelecting(false);
      // If email was already captured in this browser session, advance straight to prompt
      if (leadCapturedInSession && email) {
        // Quietly update selected area in background
        fetch("/api/assessment-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName,
            selectedArea: catKey,
            marketingConsent: false,
            leadSource: "free_connection_checkin",
          }),
        }).catch(() => {});
        setStep("category_prompt");
      } else {
        setStep("email_capture");
      }
      scrollToCard();
    }, 240);
  };

  // Validation & Form Validity
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFormValid = Boolean(firstName.trim().length > 0 && isEmailFormatValid);

  // Step 2: Handle Lead Capture Form Submission
  const handleLeadSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmittingLead || leadSuccessTransition) return;

    let hasError = false;
    const cleanFirstName = firstName.trim();
    if (!cleanFirstName) {
      setFirstNameError("Enter your first name to continue.");
      hasError = true;
    } else {
      setFirstNameError("");
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setEmailError("Enter your email address to continue.");
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        setEmailError("Enter a valid email address.");
        hasError = true;
      } else {
        setEmailError("");
      }
    }

    if (hasError) return;

    setLeadSaveError("");
    setIsSubmittingLead(true);

    try {
      await fetch("/api/assessment-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: cleanFirstName,
          selectedArea: selectedCategoryKey,
          marketingConsent: false,
          leadSource: "free_connection_checkin",
        }),
      }).catch((fetchErr) => {
        console.warn("Lead save notice (demo mode):", fetchErr);
      });
    } catch (err) {
      console.warn("Lead submit notice (demo mode):", err);
    }

    // Always succeed and advance smoothly to the assessment
    setIsSubmittingLead(false);
    setLeadSuccessTransition(true);
    setLeadCapturedInSession(true);

    setTimeout(() => {
      setLeadSuccessTransition(false);
      setStep("category_prompt");
      scrollToCard();
    }, 300);
  };

  // Step 3: Begin questions from prompt screen
  const handleStartQuestions = () => {
    setStep("question");
    setCurrentQuestionIdx(0);
    scrollToCard();
  };

  // Selecting a Likert answer for current question
  const handleSelectAnswer = (qId: number, value: number) => {
    if (isAdvancing) return;
    setIsAdvancing(true);

    const updatedAnswers = { ...answers, [qId]: value };
    setAnswers(updatedAnswers);

    // Advance after 280ms
    setTimeout(() => {
      setIsAdvancing(false);
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx((prev) => prev + 1);
        scrollToCard();
      } else {
        // Finished scored questions
        if (isInterpersonal) {
          setStep("safety");
        } else {
          setStep("reflection");
        }
        scrollToCard();
      }
    }, 280);
  };

  // Selecting safety question answer
  const handleSelectSafety = (ans: string) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    setSafetyAnswer(ans);

    setTimeout(() => {
      setIsAdvancing(false);
      setStep("reflection");
      scrollToCard();
    }, 280);
  };

  // Proceed to results
  const handleCompleteAssessment = () => {
    if (!selectedCategoryKey) return;
    const computed = calculateResults(
      selectedCategoryKey,
      answers,
      safetyAnswer || undefined,
      openReflection
    );
    setResultData(computed);
    setStep("results");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Back navigation
  const handleBack = () => {
    if (isAdvancing || isSubmittingLead) return;

    if (step === "results") {
      setStep("intro");
      return;
    }

    if (step === "reflection") {
      if (isInterpersonal) {
        setStep("safety");
      } else {
        setStep("question");
        setCurrentQuestionIdx(questions.length - 1);
      }
      return;
    }

    if (step === "safety") {
      setStep("question");
      setCurrentQuestionIdx(questions.length - 1);
      return;
    }

    if (step === "question") {
      if (currentQuestionIdx > 0) {
        setCurrentQuestionIdx((prev) => prev - 1);
      } else {
        setStep("category_prompt");
      }
      return;
    }

    if (step === "category_prompt") {
      if (leadCapturedInSession) {
        setStep("intro");
      } else {
        setStep("email_capture");
      }
      return;
    }

    if (step === "email_capture") {
      setSelectedCategoryKey(null);
      setIsSelecting(false);
      setHoveredKey(null);
      setStep("intro");
      return;
    }
  };

  // Retake assessment (Preserves captured email in current session)
  const handleRetake = () => {
    setSelectedCategoryKey(null);
    setIsSelecting(false);
    setHoveredKey(null);
    setAnswers({});
    setSafetyAnswer(null);
    setOpenReflection("");
    setCurrentQuestionIdx(0);
    setResultData(null);
    setStep("intro");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Category icons mapping with refined line weights & subtle tint fills
  const renderCategoryIcon = (key: AssessmentCategoryKey, className: string = "w-[18px] h-[18px]") => {
    switch (key) {
      case "romantic":
        return <Heart className={className} strokeWidth={2.1} fill="currentColor" fillOpacity={0.16} />;
      case "family":
        return <Users className={className} strokeWidth={2.1} />;
      case "friendship":
        return <Sparkles className={className} strokeWidth={2.1} fill="currentColor" fillOpacity={0.16} />;
      case "faith":
        return <Compass className={className} strokeWidth={2.1} />;
      case "personal-growth":
        return <ArrowUpRight className={className} strokeWidth={2.3} />;
    }
  };

  // Pill styling for band badges
  const renderBandBadge = (band: ScoreBand) => {
    switch (band) {
      case "STEADIER":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-wide bg-[#167E8A]/10 text-[#167E8A] border border-[#167E8A]/20">
            Steadier area
          </span>
        );
      case "MIXED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-wide bg-[#C28726]/12 text-[#9A6B1A] border border-[#C28726]/25">
            Mixed
          </span>
        );
      case "WORTH EXPLORING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-wide bg-[#DE5D52]/10 text-[#DE5D52] border border-[#DE5D52]/20">
            Worth exploring
          </span>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-[calc(100vh-76px)] bg-white px-4 sm:px-6 flex flex-col justify-center relative overflow-hidden ${
        step === "intro"
          ? "pt-5 pb-8 sm:pt-7 sm:pb-10 md:pt-8 md:pb-12"
          : step === "email_capture"
          ? "pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-8 md:pb-12"
          : step === "results"
          ? "py-8 sm:py-12 md:py-16"
          : "py-8 md:py-16"
      }`}
    >
      {/* Subtle decorative radial glow */}
      {step === "intro" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(255,90,79,0.03),transparent_70%)]"
        />
      )}

      {/* ====================================================
          STEP 0: INTRO & CATEGORY SELECTION
          ==================================================== */}
      {step === "intro" && (
        <div className="max-w-[960px] mx-auto w-full relative z-10">
          {/* Header Section */}
          <div className="text-center max-w-[640px] mx-auto mb-5 sm:mb-6 md:mb-7">
            <span className="inline-block font-sans uppercase tracking-[0.18em] text-[#FF5A4F] text-[11px] sm:text-[12px] font-bold mb-2 sm:mb-2.5">
              Free Connection Check-In
            </span>
            <h1 className="font-serif text-[34px] sm:text-[40px] md:text-[46px] leading-[1.04] text-[#0B2A4A] tracking-tight">
              What Would You Like{" "}
              <span className="text-[#FF5A4F] italic block sm:inline">to Focus On?</span>
            </h1>
            <p className="text-[#26313A] text-[14px] sm:text-[15px] leading-relaxed mt-2.5 sm:mt-3">
              Choose the area that feels most relevant right now.
            </p>
          </div>

          {/* DESKTOP / TABLET SELECTION (3 + 2 Compact Grid) */}
          <div className="hidden md:block w-full">
            {/* ROW 1: 3 cards */}
            <div className="grid grid-cols-3 gap-4 lg:gap-4.5 w-full">
              {ASSESSMENT_CATEGORIES.slice(0, 3).map((cat) => {
                const styles = CATEGORY_STYLES[cat.id];
                const isSelected = selectedCategoryKey === cat.id;
                const isHovered = hoveredKey === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    onMouseEnter={() => setHoveredKey(cat.id)}
                    onMouseLeave={() => setHoveredKey(null)}
                    disabled={isSelecting}
                    style={{
                      backgroundColor: isSelected ? styles.iconBg : styles.bgTint,
                      borderColor: isSelected || isHovered ? styles.accent : styles.borderDefault,
                    }}
                    className={`group relative w-full h-[132px] rounded-[20px] p-4 lg:p-4.5 text-left transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between border shadow-[0_10px_28px_rgba(11,42,74,0.04)] hover:shadow-[0_14px_32px_rgba(11,42,74,0.08)] hover:-translate-y-[2.5px] ${
                      isSelected ? "ring-2 ring-offset-1" : ""
                    }`}
                  >
                    {/* Top row: Icon + Number */}
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105"
                        style={{
                          backgroundColor: styles.iconBg,
                          borderColor: styles.iconBorder,
                          color: styles.iconColor,
                        }}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          renderCategoryIcon(cat.id, "w-[18px] h-[18px]")
                        )}
                      </div>
                      <span
                        className="font-sans text-[12px] font-bold tracking-wider"
                        style={{ color: styles.accent }}
                      >
                        {cat.number}
                      </span>
                    </div>

                    {/* Bottom row: Title + Tiny Arrow */}
                    <div className="flex items-end justify-between w-full gap-2 mt-auto">
                      <h3 className="font-serif text-[21px] lg:text-[22px] text-[#0B2A4A] leading-[1.18] font-normal tracking-tight line-clamp-2">
                        {cat.title}
                      </h3>
                      <div className="shrink-0 pb-0.5">
                        {isSelected ? (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: styles.accent }}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        ) : (
                          <ArrowRight className="w-4 h-4 text-[#0B2A4A]/40 group-hover:text-[#0B2A4A] group-hover:translate-x-[3px] transition-all duration-200" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ROW 2: 2 cards centered */}
            <div className="flex justify-center gap-4 lg:gap-4.5 w-full mt-4 lg:mt-4.5">
              {ASSESSMENT_CATEGORIES.slice(3, 5).map((cat) => {
                const styles = CATEGORY_STYLES[cat.id];
                const isSelected = selectedCategoryKey === cat.id;
                const isHovered = hoveredKey === cat.id;

                return (
                  <div
                    key={cat.id}
                    className="w-[calc((100%-2rem)/3)] lg:w-[calc((100%-2.25rem)/3)]"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      onMouseEnter={() => setHoveredKey(cat.id)}
                      onMouseLeave={() => setHoveredKey(null)}
                      disabled={isSelecting}
                      style={{
                        backgroundColor: isSelected ? styles.iconBg : styles.bgTint,
                        borderColor: isSelected || isHovered ? styles.accent : styles.borderDefault,
                      }}
                      className={`group relative w-full h-[132px] rounded-[20px] p-4 lg:p-4.5 text-left transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between border shadow-[0_10px_28px_rgba(11,42,74,0.04)] hover:shadow-[0_14px_32px_rgba(11,42,74,0.08)] hover:-translate-y-[2.5px] ${
                        isSelected ? "ring-2 ring-offset-1" : ""
                      }`}
                    >
                      {/* Top row: Icon + Number */}
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105"
                          style={{
                            backgroundColor: styles.iconBg,
                            borderColor: styles.iconBorder,
                            color: styles.iconColor,
                          }}
                        >
                          {isSelected ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            renderCategoryIcon(cat.id, "w-[18px] h-[18px]")
                          )}
                        </div>
                        <span
                          className="font-sans text-[12px] font-bold tracking-wider"
                          style={{ color: styles.accent }}
                        >
                          {cat.number}
                        </span>
                      </div>

                      {/* Bottom row: Title + Tiny Arrow */}
                      <div className="flex items-end justify-between w-full gap-2 mt-auto">
                        <h3 className="font-serif text-[21px] lg:text-[22px] text-[#0B2A4A] leading-[1.18] font-normal tracking-tight line-clamp-2">
                          {cat.title}
                        </h3>
                        <div className="shrink-0 pb-0.5">
                          {isSelected ? (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: styles.accent }}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          ) : (
                            <ArrowRight className="w-4 h-4 text-[#0B2A4A]/40 group-hover:text-[#0B2A4A] group-hover:translate-x-[3px] transition-all duration-200" />
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE SELECTION (5 Compact Horizontal Rows) */}
          <div className="block md:hidden w-full space-y-2.5">
            {ASSESSMENT_CATEGORIES.map((cat) => {
              const styles = CATEGORY_STYLES[cat.id];
              const isSelected = selectedCategoryKey === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  disabled={isSelecting}
                  style={{
                    backgroundColor: isSelected ? styles.iconBg : styles.bgTint,
                    borderColor: isSelected ? styles.accent : styles.borderDefault,
                  }}
                  className={`w-full h-[60px] px-4 rounded-[16px] flex items-center justify-between text-left transition-all duration-180 cursor-pointer border shadow-[0_4px_16px_rgba(11,42,74,0.03)] active:scale-[0.99] ${
                    isSelected ? "ring-2 ring-offset-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                      className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: styles.iconBg,
                        borderColor: styles.iconBorder,
                        color: styles.iconColor,
                      }}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        renderCategoryIcon(cat.id, "w-[17px] h-[17px]")
                      )}
                    </div>
                    <span className="font-serif text-[16px] text-[#0B2A4A] font-medium leading-tight truncate">
                      {cat.title}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: styles.accent }}
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#0B2A4A]/40" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Trust line & Disclaimer Below Options */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-[12px] sm:text-[12.5px] text-[#26313A] font-sans font-medium tracking-wide">
              2–3 minutes &nbsp;•&nbsp; Private &nbsp;•&nbsp; Free
            </p>
            <p className="mt-1.5 text-[11px] sm:text-[11.5px] text-[#26313A]/70 italic max-w-md mx-auto px-4">
              This is a reflective coaching tool, not a diagnosis or clinical assessment.
            </p>
          </div>
        </div>
      )}

      {/* ====================================================
          STEP 1: EMAIL / LEAD CAPTURE (Clean Open Page Layout)
          ==================================================== */}
      {step === "email_capture" && selectedCategory && (
        <motion.div
          key="email_capture"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.28 }}
          className="max-w-[580px] mx-auto w-full relative z-10 px-1 sm:px-0"
        >
          {/* Back Button */}
          <div className="mb-5 sm:mb-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmittingLead}
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-[#0B2A4A] hover:text-[#FF5A4F] transition-colors disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Small Selected-Area Indicator */}
          <div className="mb-4 sm:mb-5">
            <div 
              className="inline-flex items-center gap-2 text-[11.5px] font-sans font-bold tracking-[0.14em] uppercase"
              style={{ color: CATEGORY_STYLES[selectedCategory.id]?.iconColor || selectedCategory.accentColor }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: CATEGORY_STYLES[selectedCategory.id]?.iconColor || selectedCategory.accentColor }} 
              />
              <span>Selected: {selectedCategory.title}</span>
            </div>
          </div>

          {/* Eyebrow, Short Heading, One Short Explanatory Line */}
          <div className="mb-7 sm:mb-8">
            <span className="font-sans uppercase tracking-[0.18em] text-[#FF5A4F] text-[11px] font-bold block mb-2 sm:mb-2.5">
              YOUR PRIVATE CHECK-IN
            </span>
            <h1 className="font-serif text-[32px] sm:text-[38px] md:text-[40px] leading-[1.08] text-[#0B2A4A] tracking-tight mb-2.5 sm:mb-3">
              Let’s Personalize Your Check-In.
            </h1>
            <p className="text-[#26313A] text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Enter your name and email to continue your free check-in and receive your results.
            </p>
          </div>

          {/* Lead Form */}
          <form onSubmit={handleLeadSubmit} noValidate className="space-y-[18px] sm:space-y-[20px]">
            
            {/* First Name (Required) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="first_name_input" className="text-[12px] font-sans font-bold tracking-wider text-[#0B2A4A] uppercase">
                  First Name
                </label>
                <span className="text-[11px] font-sans font-semibold text-[#FF5A4F]">
                  Required
                </span>
              </div>
              <input
                id="first_name_input"
                name="given-name"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (firstNameError) setFirstNameError("");
                  if (leadSaveError) setLeadSaveError("");
                }}
                onBlur={() => {
                  if (!firstName.trim()) {
                    setFirstNameError("Enter your first name to continue.");
                  }
                }}
                placeholder="e.g. Sarah"
                className={`w-full h-[54px] sm:h-[56px] rounded-[13px] px-4 text-[15px] font-sans text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 bg-white border transition-all duration-150 focus:outline-none ${
                  firstNameError
                    ? "border-[#DE5D52] ring-2 ring-[#DE5D52]/20"
                    : "border-[#0B2A4A]/15 focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20"
                }`}
              />
              {firstNameError && (
                <p className="text-[12px] text-[#DE5D52] font-medium mt-1.5">
                  {firstNameError}
                </p>
              )}
            </div>

            {/* Email Address (Required) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="email_address_input" className="text-[12px] font-sans font-bold tracking-wider text-[#0B2A4A] uppercase">
                  Email Address
                </label>
                <span className="text-[11px] font-sans font-semibold text-[#FF5A4F]">
                  Required
                </span>
              </div>
              <input
                id="email_address_input"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                  if (leadSaveError) setLeadSaveError("");
                }}
                onBlur={() => {
                  const trimmed = email.trim();
                  if (!trimmed) {
                    setEmailError("Enter your email address to continue.");
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                    setEmailError("Enter a valid email address.");
                  }
                }}
                placeholder="you@example.com"
                className={`w-full h-[54px] sm:h-[56px] rounded-[13px] px-4 text-[15px] font-sans text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 bg-white border transition-all duration-150 focus:outline-none ${
                  emailError
                    ? "border-[#DE5D52] ring-2 ring-[#DE5D52]/20"
                    : "border-[#0B2A4A]/15 focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20"
                }`}
              />
              {emailError && (
                <p className="text-[12px] text-[#DE5D52] font-medium mt-1.5">
                  {emailError}
                </p>
              )}
            </div>

            {/* Error Message if Network/Storage Fails */}
            {leadSaveError && (
              <div className="p-3.5 rounded-[13px] bg-[#FFF8F7] border border-[#DE5D52]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-[#DE5D52]">
                <p className="font-medium">{leadSaveError}</p>
                <button
                  type="button"
                  onClick={() => handleLeadSubmit()}
                  className="text-[12.5px] font-semibold underline hover:no-underline shrink-0 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 sm:pt-3">
              <button
                type="submit"
                disabled={!isFormValid || isSubmittingLead || leadSuccessTransition}
                className={`w-full h-[54px] sm:h-[56px] rounded-[14px] text-[15px] font-sans font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  !isFormValid || isSubmittingLead || leadSuccessTransition
                    ? "bg-[#EFEAE6] text-[#26313A]/35 cursor-not-allowed border-none shadow-none"
                    : "bg-[#FF5A4F] hover:bg-[#E54F44] text-white cursor-pointer shadow-[0_4px_14px_rgba(255,90,79,0.25)] hover:shadow-[0_6px_20px_rgba(255,90,79,0.32)] hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {leadSuccessTransition ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Ready</span>
                  </>
                ) : isSubmittingLead ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Continue to My Check-In</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Privacy Supporting Line */}
          <div className="mt-4 sm:mt-5 text-center">
            <p className="text-[12px] sm:text-[12.5px] text-[#26313A]/70 leading-relaxed">
              Your details are used to provide your check-in experience and results.{" "}
              <Link href="#" className="underline hover:text-[#0B2A4A] transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      )}

      {/* ====================================================
          STEP 2: CATEGORY INTRO PROMPT (Before Question 1)
          ==================================================== */}
      {step === "category_prompt" && selectedCategory && (
        <motion.div
          key="category_prompt"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.35 }}
          className="max-w-[780px] mx-auto w-full"
        >
          <div className="bg-white rounded-[28px] p-8 md:p-14 border border-[#151312]/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4px]"
              style={{ backgroundColor: selectedCategory.accentColor }}
            />

            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-sans text-[#5C5550] hover:text-[#0B2A4A] transition-colors mb-8 self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="w-12 h-12 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#F7F3EF]">
              {renderCategoryIcon(selectedCategory.id, "w-6 h-6 text-[#0B2A4A]")}
            </div>

            <span className="font-sans uppercase tracking-[0.18em] text-[11px] font-bold block mb-3" style={{ color: selectedCategory.accentColor }}>
              {selectedCategory.title}
            </span>

            <h2 className="font-serif text-[26px] md:text-[34px] text-[#0B2A4A] leading-[1.25] mb-6 max-w-[620px] mx-auto">
              “{selectedCategory.promptIntro}”
            </h2>

            <p className="text-[#5C5550] text-[15px] md:text-[16px] leading-[1.65] max-w-[500px] mx-auto mb-8">
              Take your time with each question. Answer as things genuinely have felt recently, rather than how you wish they were.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleStartQuestions}
                size="lg"
                className="w-full sm:w-auto bg-[#FF5A4F] hover:bg-[#F0443A] text-white rounded-full px-8 h-[52px] text-[14px] font-sans font-semibold shadow-none flex items-center justify-center gap-2"
              >
                <span>Begin ({questions.length} Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#151312]/[0.06] text-[12px] text-[#5C5550]/70 flex items-center justify-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Private & confidential • 5 response choices • Take it at your own pace</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====================================================
          STEP 3: SCORED QUESTIONS (ONE AT A TIME)
          ==================================================== */}
      {step === "question" && selectedCategory && (
        <div className="max-w-[880px] mx-auto w-full">
          {/* Card Wrapper */}
          <div className="bg-white rounded-[26px] md:rounded-[30px] p-6 sm:p-10 md:p-12 border border-[#151312]/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.06)] relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4px]"
              style={{ backgroundColor: selectedCategory.accentColor }}
            />

            {/* Header: Back Button & Category Badge */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={handleBack}
                disabled={isAdvancing}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-sans text-[#5C5550] hover:text-[#0B2A4A] transition-colors disabled:opacity-40"
                aria-label="Previous question"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-sans uppercase tracking-[0.14em] font-semibold text-[#5C5550]/80">
                  {selectedCategory.title}
                </span>
              </div>
            </div>

            {/* Progress Bar & Counter */}
            <div className="mb-8 md:mb-10">
              <div className="flex justify-between items-center text-[12px] font-sans text-[#5C5550] mb-2 font-medium">
                <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%</span>
              </div>
              <div 
                className="w-full h-[5px] bg-[#151312]/[0.06] rounded-full overflow-hidden" 
                role="progressbar" 
                aria-valuenow={currentQuestionIdx + 1} 
                aria-valuemin={1} 
                aria-valuemax={questions.length}
              >
                <motion.div
                  className="h-full bg-[#FF5A4F] rounded-full"
                  initial={false}
                  animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Question Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={questions[currentQuestionIdx].id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: prefersReducedMotion ? 0.05 : 0.2 }}
                className="mb-8 md:mb-12"
              >
                <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] text-[#0B2A4A]">
                  {questions[currentQuestionIdx].text}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Response Options */}
            <fieldset className="border-0 p-0 m-0">
              <legend className="sr-only">Response scale for: {questions[currentQuestionIdx].text}</legend>
              <div 
                className="grid grid-cols-1 sm:grid-cols-5 gap-3"
                role="radiogroup"
                aria-label="How true has this felt?"
              >
                {RESPONSE_OPTIONS.map((opt) => {
                  const currentQId = questions[currentQuestionIdx].id;
                  const isSelected = answers[currentQId] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isAdvancing}
                      onClick={() => handleSelectAnswer(currentQId, opt.value)}
                      className={`group relative rounded-[18px] p-4 sm:p-5 text-left sm:text-center transition-all duration-200 border flex sm:flex-col items-center justify-between sm:justify-center min-h-[58px] sm:min-h-[108px] ${
                        isSelected
                          ? "bg-[#FF5A4F]/[0.08] border-[#FF5A4F] shadow-sm text-[#0B2A4A]"
                          : "bg-white hover:bg-[#FDFCFB] border-[#151312]/[0.08] hover:border-[#151312]/20 text-[#5C5550] hover:text-[#0B2A4A]"
                      }`}
                    >
                      <span className={`text-[13.5px] md:text-[14px] font-sans font-medium leading-snug ${
                        isSelected ? "font-semibold text-[#0B2A4A]" : ""
                      }`}>
                        {opt.label}
                      </span>

                      {/* Small Indicator */}
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 sm:mt-2 shrink-0 ${
                          isSelected
                            ? "bg-[#FF5A4F] text-white scale-100"
                            : "border border-[#151312]/20 group-hover:border-[#151312]/40"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Subtle footer tip */}
            <div className="mt-8 pt-6 border-t border-[#151312]/[0.06] flex items-center justify-between text-[11.5px] text-[#5C5550]/70">
              <span>Select an answer to automatically continue</span>
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================
          STEP 4: SAFETY QUESTION (Romantic, Family, Friendship)
          ==================================================== */}
      {step === "safety" && selectedCategory && (
        <div className="max-w-[840px] mx-auto w-full">
          <div className="bg-white rounded-[26px] md:rounded-[30px] p-6 sm:p-10 md:p-12 border border-[#151312]/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.06)] relative overflow-hidden">
            
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={handleBack}
                disabled={isAdvancing}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-sans text-[#5C5550] hover:text-[#0B2A4A] transition-colors disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="text-[11px] font-sans uppercase tracking-[0.14em] font-semibold text-[#5C5550]/80">
                Additional Context
              </span>
            </div>

            <div className="mb-6">
              <span className="inline-block font-sans uppercase tracking-[0.16em] text-[#0E5A63] text-[11px] font-bold mb-2">
                Respect & Safety Check
              </span>
              <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[29px] leading-[1.3] text-[#0B2A4A]">
                {SAFETY_QUESTION.text}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              {SAFETY_QUESTION.options.map((opt) => {
                const isSelected = safetyAnswer === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAdvancing}
                    onClick={() => handleSelectSafety(opt)}
                    className={`rounded-[18px] p-5 text-center transition-all duration-200 border flex items-center justify-between sm:justify-center gap-3 sm:flex-col min-h-[58px] sm:min-h-[96px] ${
                      isSelected
                        ? "bg-[#0E5A63]/[0.08] border-[#0E5A63] shadow-sm text-[#0B2A4A]"
                        : "bg-white hover:bg-[#FDFCFB] border-[#151312]/[0.08] hover:border-[#151312]/20 text-[#5C5550] hover:text-[#0B2A4A]"
                    }`}
                  >
                    <span className={`text-[14px] font-sans font-medium ${isSelected ? "font-semibold text-[#0B2A4A]" : ""}`}>
                      {opt}
                    </span>
                    <div 
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                        isSelected
                          ? "bg-[#0E5A63] text-white scale-100"
                          : "border border-[#151312]/20"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[12px] text-[#5C5550]/70 italic">
              This question provides helpful context for understanding relationship dynamics and is not scored numerically.
            </p>
          </div>
        </div>
      )}

      {/* ====================================================
          STEP 5: OPTIONAL OPEN REFLECTION
          ==================================================== */}
      {step === "reflection" && selectedCategory && (
        <div className="max-w-[800px] mx-auto w-full">
          <div className="bg-white rounded-[26px] md:rounded-[30px] p-6 sm:p-10 md:p-12 border border-[#151312]/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.06)] relative overflow-hidden">
            
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-sans text-[#5C5550] hover:text-[#0B2A4A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="text-[11px] font-sans uppercase tracking-[0.14em] font-semibold text-[#5C5550]/80">
                Optional Reflection
              </span>
            </div>

            <div className="mb-6">
              <span className="inline-block font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] font-bold mb-2">
                Looking Ahead
              </span>
              <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[29px] leading-[1.3] text-[#0B2A4A] mb-3">
                If one thing could feel different in this part of your life three months from now, what would you hope had changed?
              </h3>
              <p className="text-[#5C5550] text-[14px]">
                This is completely optional and will be included in your private summary.
              </p>
            </div>

            <div className="mb-6">
              <textarea
                value={openReflection}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setOpenReflection(e.target.value);
                  }
                }}
                maxLength={300}
                rows={4}
                placeholder="Write a brief reflection here (optional)..."
                className="w-full rounded-[18px] border border-[#151312]/[0.12] p-4 text-[14.5px] font-sans text-[#0B2A4A] placeholder:text-[#5C5550]/50 focus:outline-none focus:ring-2 focus:ring-[#FF5A4F]/40 focus:border-[#FF5A4F] resize-none"
              />
              <div className="flex justify-end text-[12px] text-[#5C5550]/60 mt-1">
                <span>{openReflection.length}/300</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#151312]/[0.06]">
              <button
                type="button"
                onClick={handleCompleteAssessment}
                className="text-[13px] font-sans font-medium text-[#5C5550] hover:text-[#0B2A4A] transition-colors order-2 sm:order-1"
              >
                Skip & View Results
              </button>

              <Button
                type="button"
                onClick={handleCompleteAssessment}
                size="lg"
                className="w-full sm:w-auto bg-[#FF5A4F] hover:bg-[#F0443A] text-white rounded-full px-8 h-[50px] text-[14px] font-sans font-semibold shadow-none flex items-center justify-center gap-2 order-1 sm:order-2"
              >
                <span>View My Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================
          STEP 6: REFINED EDITORIAL RESULTS VIEW
          ==================================================== */}
      {step === "results" && resultData && selectedCategory && (
        <div className="max-w-[820px] mx-auto w-full relative z-10 px-1 sm:px-0">
          
          {/* A) Intro / Result Hero */}
          <div className="text-center max-w-[680px] mx-auto mb-10 md:mb-14">
            <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 block">
              Your Check-In
            </span>
            <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] leading-[1.12] text-[#0B2A4A] tracking-tight mb-4">
              {firstName.trim() ? (
                <>
                  {firstName.trim()},{" "}
                  <span className="text-[#FF5A4F] italic">here is what your check-in suggests.</span>
                </>
              ) : (
                <>
                  Here is what your{" "}
                  <span className="text-[#FF5A4F] italic">check-in suggests.</span>
                </>
              )}
            </h1>
            <p className="text-[#26313A] text-[15px] sm:text-[16px] leading-[1.65]">
              Based on your reflection on {selectedCategory.title}, your answers suggest a few patterns that may deserve more attention, care, or conversation.
            </p>
          </div>

          {/* B) Main Interpretation Section */}
          <div className="bg-[#FAF7F4] rounded-[22px] p-6 sm:p-8 md:p-10 border border-[#0B2A4A]/[0.06] mb-12 md:mb-16">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF5A4F] block mb-2">
              A Pattern Worth Noticing
            </span>
            <h2 className="font-serif text-[22px] sm:text-[26px] text-[#0B2A4A] font-medium leading-snug mb-3.5">
              What your reflection is pointing toward
            </h2>
            <p className="text-[#26313A] text-[15.5px] sm:text-[16.5px] leading-[1.7]">
              {getMainInterpretation(
                resultData.category,
                resultData.primaryFocus,
                resultData.isBalanced
              )}
            </p>
          </div>

          {/* C) Three Insight Sections Only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7 lg:gap-8 mb-12 md:mb-16">
            
            {/* 1. A Steadier Area */}
            <div className="pt-4 border-t-2 border-[#167E8A]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#167E8A] block mb-2">
                A Steadier Area
              </span>
              <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0B2A4A] font-medium leading-snug mb-2.5">
                {resultData.primaryStrength.label}
              </h3>
              <p className="text-[#26313A] text-[14px] sm:text-[14.5px] leading-[1.65]">
                {resultData.primaryStrength.strengthCopy}
              </p>
            </div>

            {/* 2. Worth Exploring */}
            <div className="pt-4 border-t-2 border-[#DE5D52]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#DE5D52] block mb-2">
                Worth Exploring
              </span>
              <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0B2A4A] font-medium leading-snug mb-2.5">
                {resultData.primaryFocus.label}
              </h3>
              <p className="text-[#26313A] text-[14px] sm:text-[14.5px] leading-[1.65]">
                {resultData.primaryFocus.focusCopy}
              </p>
            </div>

            {/* 3. One Next Step */}
            <div className="pt-4 border-t-2 border-[#C28726]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#C28726] block mb-2">
                One Next Step
              </span>
              <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0B2A4A] font-medium leading-snug mb-2.5">
                A gentle place to begin
              </h3>
              <p className="text-[#26313A] text-[14px] sm:text-[14.5px] leading-[1.65]">
                {resultData.primaryFocus.nextStepCopy}
              </p>
            </div>

          </div>

          {/* D) Reflective Summary by Area (Compact List) */}
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <h3 className="font-serif text-[22px] sm:text-[24px] text-[#0B2A4A] font-medium mb-1">
                Reflective Summary by Area
              </h3>
              <p className="text-[13.5px] text-[#26313A]/70">
                A simple overview of the patterns reflected in this check-in.
              </p>
            </div>

            <div className="divide-y divide-[#0B2A4A]/[0.08] border-y border-[#0B2A4A]/[0.08]">
              {resultData.dimensions.map((dim) => (
                <div key={dim.key} className="py-3.5 flex items-center justify-between gap-4">
                  <span className="text-[14.5px] font-sans font-medium text-[#0B2A4A]">
                    {dim.label}
                  </span>
                  <div>
                    {renderBandBadge(dim.band)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E) Conditional Safety Note (Only if triggered) */}
          {resultData.safetyFlag && (
            <div className="mb-10 bg-[#FFF9F8] border border-[#DE5D52]/25 rounded-[18px] p-5 sm:p-6 text-left">
              <h4 className="font-serif text-[18px] sm:text-[19px] text-[#0B2A4A] font-medium mb-2">
                Something important to notice
              </h4>
              <p className="text-[14px] text-[#26313A] leading-relaxed mb-2.5">
                Your answers suggest that feeling safe and respected may deserve attention before focusing only on communication. If fear, control, or threats are part of this situation, additional support beyond coaching may be important.
              </p>
              <p className="text-[12.5px] text-[#DE5D52] font-medium">
                If you are in immediate danger, contact emergency or local support services available where you live.
              </p>
            </div>
          )}

          {/* F) Coaching CTA Section */}
          <div className="bg-[#0B2A4A] rounded-[24px] p-8 sm:p-10 md:p-12 text-white text-center relative overflow-hidden mb-8 shadow-md">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-[240px] h-[240px] rounded-full bg-[#FF5A4F] opacity-15 blur-3xl pointer-events-none"
            />
            
            <div className="relative z-10 max-w-[580px] mx-auto">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A4F] block mb-2.5">
                Next Steps in Coaching
              </span>
              <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-white leading-[1.18] mb-3">
                Want to Talk Through What Came Up?
              </h3>
              <p className="text-white/80 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-7 max-w-[500px] mx-auto">
                A private coaching session can help you explore these patterns more clearly and decide what your next step could look like.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF5A4F] hover:bg-[#E54F44] text-white rounded-[14px] px-8 h-[52px] text-[14.5px] font-sans font-semibold shadow-none cursor-pointer"
                  asChild
                >
                  <Link href="/book">
                    Book a Private Session
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/25 text-white hover:bg-white/10 rounded-[14px] px-7 h-[52px] text-[14px] font-sans font-medium cursor-pointer"
                  asChild
                >
                  <Link href={selectedCategory.coachingHref}>
                    Explore Coaching Areas
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* G) Retake Link */}
          <div className="text-center pt-2 pb-6">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-sans font-medium text-[#26313A]/60 hover:text-[#0B2A4A] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake the Check-In</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
