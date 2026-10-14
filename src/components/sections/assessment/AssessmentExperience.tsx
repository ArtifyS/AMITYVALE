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

export function AssessmentExperience() {
  const prefersReducedMotion = useReducedMotion();

  // Assessment & Category State
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<AssessmentCategoryKey | null>(null);
  const [step, setStep] = useState<AssessmentStep>("intro");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [safetyAnswer, setSafetyAnswer] = useState<string | null>(null);
  const [openReflection, setOpenReflection] = useState<string>("");
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [resultData, setResultData] = useState<AssessmentResultData | null>(null);

  // Lead capture state
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
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
    setSelectedCategoryKey(catKey);
    setAnswers({});
    setSafetyAnswer(null);
    setOpenReflection("");
    setCurrentQuestionIdx(0);

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
          marketingConsent,
          leadSource: "free_connection_checkin",
        }),
      }).catch(() => {});
      setStep("category_prompt");
    } else {
      setStep("email_capture");
    }
    scrollToCard();
  };

  // Step 2: Handle Lead Capture Form Submission
  const handleLeadSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmittingLead || leadSuccessTransition) return;

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setEmailError("Enter a valid email address to continue.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setEmailError("Enter a valid email address to continue.");
      return;
    }

    setEmailError("");
    setLeadSaveError("");
    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/assessment-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: firstName.trim() || undefined,
          selectedArea: selectedCategoryKey,
          marketingConsent,
          leadSource: "free_connection_checkin",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save email");
      }

      // Success: Briefly show "Ready." for ~350ms then advance
      setIsSubmittingLead(false);
      setLeadSuccessTransition(true);
      setLeadCapturedInSession(true);

      setTimeout(() => {
        setLeadSuccessTransition(false);
        setStep("category_prompt");
        scrollToCard();
      }, 350);
    } catch (err) {
      setIsSubmittingLead(false);
      setLeadSaveError("We could not save your email just yet. Please try again.");
    }
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
      setStep("intro");
      return;
    }
  };

  // Retake assessment (Preserves captured email in current session)
  const handleRetake = () => {
    setSelectedCategoryKey(null);
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

  // Category icons mapping
  const renderCategoryIcon = (key: AssessmentCategoryKey, className: string = "w-5 h-5") => {
    switch (key) {
      case "romantic":
        return <Heart className={className} />;
      case "family":
        return <Users className={className} />;
      case "friendship":
        return <Sparkles className={className} />;
      case "faith":
        return <Compass className={className} />;
      case "personal-growth":
        return <Leaf className={className} />;
    }
  };

  // Pill styling for band badges
  const renderBandBadge = (band: ScoreBand) => {
    switch (band) {
      case "STEADIER":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-sans font-semibold tracking-wide bg-[#0E5A63]/10 text-[#0E5A63] border border-[#0E5A63]/20">
            Steadier
          </span>
        );
      case "MIXED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-sans font-semibold tracking-wide bg-[#D8A23D]/15 text-[#9A701E] border border-[#D8A23D]/30">
            Mixed
          </span>
        );
      case "WORTH EXPLORING":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-sans font-semibold tracking-wide bg-[#FF5A4F]/10 text-[#FF5A4F] border border-[#FF5A4F]/20">
            Worth Exploring
          </span>
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-[calc(100vh-76px)] bg-white py-8 md:py-16 px-4 sm:px-6 flex flex-col justify-center">
      
      {/* ====================================================
          STEP 0: INTRO & CATEGORY SELECTION
          ==================================================== */}
      {step === "intro" && (
        <div className="max-w-[1040px] mx-auto w-full">
          {/* Hero Section */}
          <div className="text-center max-w-[760px] mx-auto mb-12 md:mb-16">
            <span className="inline-block font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-4">
              Free Reflective Check-In
            </span>
            <h1 className="font-serif text-[38px] md:text-[52px] lg:text-[58px] leading-[1.08] text-[#0B2A4A] mb-5 tracking-tight">
              A Few Questions.<br />
              <span className="text-[#FF5A4F] italic">A Clearer Place to Begin.</span>
            </h1>
            <p className="text-[#5C5550] text-[16px] md:text-[18px] leading-[1.65] mb-6 max-w-[580px] mx-auto">
              Take a few minutes to reflect on the relationship or part of life that feels most important right now.
            </p>
            
            {/* Trust line */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-[12px] md:text-[13px] text-[#5C5550]/80 font-sans tracking-wide bg-[#F7F3EF] px-5 py-2 rounded-full mb-6">
              <span>About 2–3 minutes</span>
              <span>•</span>
              <span>Private</span>
              <span>•</span>
              <span>No payment required</span>
            </div>

            {/* Subtle Disclaimer */}
            <p className="text-[12px] text-[#5C5550]/70 max-w-md mx-auto italic">
              This is a reflective coaching tool, not a diagnosis or clinical assessment.
            </p>
          </div>

          {/* Section: Choose the Area */}
          <div className="mb-6 text-center">
            <h2 className="font-serif text-[24px] md:text-[30px] text-[#0B2A4A] mb-2">
              What Would You Like to Reflect On?
            </h2>
            <p className="text-[#5C5550] text-[14.5px] md:text-[15.5px]">
              Choose the area that feels closest to what is on your mind.
            </p>
          </div>

          {/* 5 Cards (3 + 2 layout on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6 max-w-[960px] mx-auto">
            {/* Top row of 3 cards */}
            {ASSESSMENT_CATEGORIES.slice(0, 3).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`group md:col-span-2 bg-white rounded-[24px] p-7 text-left border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  selectedCategoryKey === cat.id ? "border-[#FF5A4F]/60 ring-2 ring-[#FF5A4F]/20" : "border-[#151312]/[0.08]"
                }`}
              >
                {/* Accent Top Border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[4px] transition-all duration-300 group-hover:h-[6px]"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="font-serif text-[18px] font-bold"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.number}
                    </span>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${cat.accentColor}18`, color: cat.accentColor }}
                    >
                      {renderCategoryIcon(cat.id, "w-4 h-4")}
                    </div>
                  </div>

                  <h3 className="font-serif text-[20px] md:text-[21px] text-[#0B2A4A] mb-2 leading-snug group-hover:text-[#FF5A4F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.5] text-[#5C5550]">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-[12.5px] font-sans font-semibold tracking-wide text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors">
                  <span>Start Check-In</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}

            {/* Bottom row of 2 cards (centered via 6-column grid offset) */}
            {ASSESSMENT_CATEGORIES.slice(3, 5).map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`group md:col-span-3 ${
                  idx === 0 ? "md:col-start-1 lg:col-start-1" : ""
                } bg-white rounded-[24px] p-7 text-left border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  selectedCategoryKey === cat.id ? "border-[#FF5A4F]/60 ring-2 ring-[#FF5A4F]/20" : "border-[#151312]/[0.08]"
                }`}
              >
                {/* Accent Top Border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[4px] transition-all duration-300 group-hover:h-[6px]"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="font-serif text-[18px] font-bold"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.number}
                    </span>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${cat.accentColor}18`, color: cat.accentColor }}
                    >
                      {renderCategoryIcon(cat.id, "w-4 h-4")}
                    </div>
                  </div>

                  <h3 className="font-serif text-[20px] md:text-[21px] text-[#0B2A4A] mb-2 leading-snug group-hover:text-[#FF5A4F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.5] text-[#5C5550]">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-[12.5px] font-sans font-semibold tracking-wide text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors">
                  <span>Start Check-In</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          STEP 1: EMAIL / LEAD CAPTURE (Centered Premium Card)
          ==================================================== */}
      {step === "email_capture" && selectedCategory && (
        <motion.div
          key="email_capture"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.3 }}
          className="max-w-[660px] mx-auto w-full"
        >
          <div className="bg-white rounded-[26px] md:rounded-[28px] p-7 sm:p-10 md:p-12 border border-[#FF5A4F]/25 shadow-[0_16px_45px_rgba(11,42,74,0.06)] relative overflow-hidden">
            
            {/* Top Accent Line with selected category color */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4px]"
              style={{ backgroundColor: selectedCategory.accentColor }}
            />

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmittingLead}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-sans text-[#5C5550] hover:text-[#0B2A4A] transition-colors mb-6 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Context Badge */}
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-sans font-semibold mb-5 border"
              style={{
                backgroundColor: `${selectedCategory.accentColor}12`,
                borderColor: `${selectedCategory.accentColor}35`,
                color: selectedCategory.accentColor === "#FF5A4F" ? "#D94035" : selectedCategory.accentColor
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedCategory.accentColor }} />
              <span>You selected: <strong>{selectedCategory.title}</strong></span>
            </div>

            {/* Eyebrow & Headings */}
            <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] font-bold block mb-2">
              YOUR PRIVATE CHECK-IN
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#0B2A4A] leading-[1.2] mb-3">
              Your Reflection Starts Here.
            </h2>
            <p className="text-[#5C5550] text-[14.5px] sm:text-[15.5px] leading-[1.6] mb-8">
              Enter your email to continue your free Amity Vale Connection Check-In and receive guidance related to the area you selected.
            </p>

            {/* Lead Form */}
            <form onSubmit={handleLeadSubmit} noValidate className="space-y-4">
              
              {/* First Name (Optional) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="first_name_input" className="text-[13px] font-sans font-semibold text-[#0B2A4A]">
                    First name
                  </label>
                  <span className="text-[11.5px] font-sans text-[#5C5550]/70">
                    Optional
                  </span>
                </div>
                <input
                  id="first_name_input"
                  name="given-name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full h-[52px] rounded-[13px] border border-[#0B2A4A]/15 px-4 text-[14.5px] font-sans text-[#0B2A4A] placeholder:text-[#5C5550]/40 bg-white focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/25 transition-all"
                />
              </div>

              {/* Email Address (Required) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="email_address_input" className="text-[13px] font-sans font-semibold text-[#0B2A4A]">
                    Email address
                  </label>
                  <span className="text-[11.5px] font-sans text-[#FF5A4F] font-semibold">
                    Required
                  </span>
                </div>
                <input
                  id="email_address_input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (leadSaveError) setLeadSaveError("");
                  }}
                  onBlur={() => {
                    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                      setEmailError("Enter a valid email address to continue.");
                    }
                  }}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "email_error_text" : undefined}
                  placeholder="you@example.com"
                  className={`w-full h-[52px] rounded-[13px] border px-4 text-[14.5px] font-sans text-[#0B2A4A] placeholder:text-[#5C5550]/40 bg-white focus:outline-none transition-all ${
                    emailError 
                      ? "border-[#FF5A4F] ring-1 ring-[#FF5A4F]" 
                      : "border-[#0B2A4A]/15 focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/25"
                  }`}
                />
                {emailError && (
                  <p id="email_error_text" className="text-[12px] text-[#FF5A4F] mt-1.5 font-medium flex items-center gap-1">
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* Marketing Consent Checkbox (Optional, unchecked by default) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#FF5A4F] border-[#0B2A4A]/25 focus:ring-[#FF5A4F]/30 accent-[#FF5A4F]"
                  />
                  <span className="text-[12.5px] sm:text-[13px] text-[#5C5550] group-hover:text-[#0B2A4A] leading-[1.45] transition-colors select-none">
                    Send me occasional Amity Vale guidance and resources related to the area I selected.
                  </span>
                </label>
              </div>

              {/* Error Message if Network/Storage Fails */}
              {leadSaveError && (
                <div className="p-3.5 rounded-[14px] bg-[#FFF8F7] border border-[#FF5A4F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-[#FF5A4F]">
                  <p className="font-medium">{leadSaveError}</p>
                  <button
                    type="button"
                    onClick={() => handleLeadSubmit()}
                    className="text-[12.5px] font-semibold underline hover:no-underline shrink-0"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={!email.trim() || isSubmittingLead || leadSuccessTransition}
                size="lg"
                className="w-full h-[54px] rounded-full bg-[#FF5A4F] hover:bg-[#F0443A] text-white text-[15px] font-sans font-semibold shadow-none flex items-center justify-center gap-2 mt-6 disabled:opacity-45 disabled:cursor-not-allowed transition-all"
              >
                {leadSuccessTransition ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Ready.</span>
                  </>
                ) : isSubmittingLead ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Continue to My Check-In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

            </form>

            {/* Privacy Trust Statement */}
            <p className="text-[12px] text-[#5C5550]/75 leading-[1.55] text-center mt-6">
              Your email is used to provide your check-in experience and relevant Amity Vale guidance. Unsubscribe anytime.{" "}
              <Link href="/about" className="underline hover:text-[#0B2A4A] transition-colors font-medium">
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
          STEP 6: DETERMINISTIC RESULTS VIEW
          ==================================================== */}
      {step === "results" && resultData && selectedCategory && (
        <div className="max-w-[940px] mx-auto w-full">
          
          {/* Results Header */}
          <div className="text-center max-w-[700px] mx-auto mb-10 md:mb-14">
            <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 block">
              Your Check-In
            </span>
            <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] leading-[1.1] text-[#0B2A4A] mb-4">
              Here’s What Your Answers Suggest.
            </h1>
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.65]">
              {resultData.overallReflection}
            </p>
          </div>

          {/* Safety Alert (If Flagged) */}
          {resultData.safetyFlag && (
            <div className="mb-8 bg-[#FFF8F7] border border-[#FF5A4F]/30 rounded-[24px] p-6 md:p-8 flex gap-4 md:gap-5 items-start shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FF5A4F]/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5 text-[#FF5A4F]" />
              </div>
              <div>
                <h3 className="font-serif text-[19px] md:text-[21px] text-[#0B2A4A] mb-2 font-semibold">
                  Something Important to Notice
                </h3>
                <p className="text-[#5C5550] text-[14.5px] leading-[1.6] mb-3">
                  Your answers suggest that feeling safe and respected may deserve attention before focusing only on communication techniques. If fear, threats, control, or safety are part of this relationship, consider seeking appropriate support in addition to coaching.
                </p>
                <p className="text-[13px] text-[#FF5A4F] font-medium">
                  If you are in immediate danger, contact the emergency services available where you live.
                </p>
              </div>
            </div>
          )}

          {/* Core Insights Grid: Steadier vs Worth Exploring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Steadier Area Card */}
            <div className="bg-white rounded-[24px] p-7 md:p-8 border border-[#151312]/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#0E5A63]" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#0E5A63]">
                    A Steadier Area
                  </span>
                  {renderBandBadge(resultData.primaryStrength.band)}
                </div>
                <h3 className="font-serif text-[22px] md:text-[24px] text-[#0B2A4A] mb-3">
                  {resultData.primaryStrength.label}
                </h3>
                <p className="text-[#5C5550] text-[14.5px] leading-[1.65]">
                  {resultData.primaryStrength.strengthCopy}
                </p>
              </div>
            </div>

            {/* Worth Exploring Card */}
            <div className="bg-white rounded-[24px] p-7 md:p-8 border border-[#151312]/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#FF5A4F]" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#FF5A4F]">
                    {resultData.isBalanced ? "One Area to Notice" : "Worth Exploring"}
                  </span>
                  {renderBandBadge(resultData.primaryFocus.band)}
                </div>
                <h3 className="font-serif text-[22px] md:text-[24px] text-[#0B2A4A] mb-3">
                  {resultData.primaryFocus.label}
                </h3>
                <p className="text-[#5C5550] text-[14.5px] leading-[1.65]">
                  {resultData.primaryFocus.focusCopy}
                </p>
              </div>
            </div>

          </div>

          {/* Pattern to Notice & Next Step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            {/* Pattern to Notice */}
            <div className="bg-[#FAF7F4] rounded-[24px] p-7 md:p-8 border border-[#151312]/[0.05]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#5C5550] block mb-2">
                Pattern to Notice
              </span>
              <h4 className="font-serif text-[19px] text-[#0B2A4A] mb-3 font-semibold">
                How this dynamic often develops
              </h4>
              <p className="text-[#5C5550] text-[14.5px] leading-[1.65]">
                {resultData.primaryFocus.patternCopy}
              </p>
            </div>

            {/* One Small Next Step */}
            <div className="bg-[#F4ECE6] rounded-[24px] p-7 md:p-8 border border-[#FF5A4F]/20 relative">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#FF5A4F] block mb-2">
                One Small Next Step
              </span>
              <h4 className="font-serif text-[19px] text-[#0B2A4A] mb-3 font-semibold">
                Something concrete you can try
              </h4>
              <p className="text-[#151312] text-[14.5px] leading-[1.65]">
                {resultData.primaryFocus.nextStepCopy}
              </p>
            </div>

          </div>

          {/* Path-Specific Observations (if applicable) */}
          {resultData.pathObservations.length > 0 && (
            <div className="mb-10 bg-white rounded-[24px] p-6 md:p-7 border border-[#151312]/[0.08] shadow-sm">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#D8A23D] block mb-2">
                Context Observations
              </span>
              <div className="space-y-2">
                {resultData.pathObservations.map((obs, idx) => (
                  <p key={idx} className="text-[#5C5550] text-[14.5px] leading-[1.6]">
                    • {obs}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Optional User Reflection Display */}
          {resultData.openReflectionText && (
            <div className="mb-10 bg-[#FFFDFB] rounded-[24px] p-6 md:p-8 border border-[#D8A23D]/30 shadow-sm">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#D8A23D] block mb-2">
                Your 3-Month Reflection
              </span>
              <p className="font-serif italic text-[17px] text-[#0B2A4A] leading-[1.5]">
                “{resultData.openReflectionText}”
              </p>
            </div>
          )}

          {/* Qualitative 5 Dimensions Overview */}
          <div className="bg-white rounded-[26px] p-6 md:p-8 border border-[#151312]/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-12">
            <div className="mb-6">
              <h3 className="font-serif text-[21px] md:text-[23px] text-[#0B2A4A] mb-1">
                Reflective Summary by Area
              </h3>
              <p className="text-[13.5px] text-[#5C5550]">
                A qualitative breakdown of the five dimensions explored in this check-in.
              </p>
            </div>

            <div className="divide-y divide-[#151312]/[0.06]">
              {resultData.dimensions.map((dim) => (
                <div key={dim.key} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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

          {/* Conversion CTA Block */}
          <div className="bg-[#0B2A4A] rounded-[28px] p-8 md:p-12 text-white text-center relative overflow-hidden mb-10 shadow-lg">
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-[240px] h-[240px] rounded-full bg-[#FF5A4F] opacity-15 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-[620px] mx-auto">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#FF5A4F] block mb-3">
                Next Steps in Coaching
              </span>
              <h3 className="font-serif text-[28px] md:text-[36px] text-white leading-[1.2] mb-4">
                Want to Talk Through What Came Up?
              </h3>
              <p className="text-white/80 text-[15px] md:text-[16px] leading-[1.65] mb-8">
                A private coaching session offers a dedicated, confidential conversation to explore these dynamics and clarify your next steps.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF5A4F] hover:bg-[#F0443A] text-white rounded-full px-8 h-[52px] text-[14px] font-sans font-semibold shadow-none"
                  asChild
                >
                  <Link href={selectedCategory.coachingHref}>
                    {selectedCategory.coachingCtaLabel}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-[52px] text-[14px] font-sans font-semibold"
                  asChild
                >
                  <Link href="/book">
                    Book a Private Session
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Retake Check-In Option */}
          <div className="text-center pt-2 pb-8">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-[#5C5550] hover:text-[#0B2A4A] transition-colors"
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
