"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { Article } from "@/lib/articlesData";
import { ArticleReadingProgress } from "./ArticleReadingProgress";
import { ArticleFaqAccordion } from "./ArticleFaqAccordion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

interface Props {
  article: Article;
  relatedArticles: Article[];
}

const PRACTICE_STEPS = [
  {
    number: "01",
    title: "Name one concern.",
    desc: "Focus on a specific situation rather than everything that has gone wrong.",
  },
  {
    number: "02",
    title: "Describe its impact.",
    desc: "Explain what you felt and why the situation matters to you.",
  },
  {
    number: "03",
    title: "Invite their perspective.",
    desc: "Ask how they experienced the same situation, and listen before responding.",
  },
  {
    number: "04",
    title: "Agree on one next step.",
    desc: "Identify something practical you can revisit together.",
  },
];

export function ArticleDetailView({ article, relatedArticles }: Props) {
  // Format publication date if present
  const formattedDate = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="w-full bg-[#FFFFFF] relative selection:bg-[#FF5A4F]/20 selection:text-[#0B2A4A] overflow-x-clip">
      {/* Thin Reading Progress Bar directly under sticky navbar */}
      <ArticleReadingProgress />

      {/* ==================================================
          1. FULL-WIDTH EDITORIAL HERO (IMAGE AS HERO BACKGROUND)
          - Featured image fills full hero area
          - Height: 580-650px desktop (70-78vh, min 540, max 680), 500-580px mobile
          - Object-position tuned to preserve both faces
          - Controlled multi-stop cinematic gradient
          - Content positioned bottom-left inside max-w-[1220px] container
          - Typography: editorial serif 58-68px, subtitle 18-20px, metadata
         ================================================== */}
      <header
        className="relative w-full overflow-hidden bg-[#051220] -mt-[var(--navbar-height,72px)] lg:-mt-[var(--navbar-height,76px)]"
        style={{
          marginTop: "calc(var(--navbar-height, 72px) * -1)",
          height: "100svh",
          minHeight: "560px",
        }}
      >
        {/* Background Photograph */}
        <Image
          src={article.image}
          alt="Couple having an honest and empathetic conversation"
          fill
          priority
          className="object-cover object-[center_25%] sm:object-[center_28%]"
          sizes="100vw"
        />

        {/* Controlled Multi-stop Cinematic Gradient Overlays */}
        {/* Base vertical gradient: deep near bottom, soft near top */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(5,18,32,0.94) 0%, rgba(5,18,32,0.70) 36%, rgba(5,18,32,0.38) 65%, rgba(5,18,32,0.15) 100%)",
          }}
        />
        {/* Directional radial gradient to deepen bottom-left text area */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 5% 95%, rgba(5,18,32,0.96) 0%, rgba(5,18,32,0.65) 55%, transparent 85%)",
          }}
        />

        {/* Hero Content Positioned Bottom-Left with Top Navbar Safe Area */}
        <div className="relative z-20 w-full h-full max-w-[1220px] mx-auto px-6 sm:px-10 lg:px-14 pt-[calc(var(--navbar-height,72px)+24px)] pb-10 sm:pb-12 lg:pb-14 flex flex-col justify-end">
          <div className="max-w-[760px]">
            {/* Category Eyebrow */}
            <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] sm:text-[12px] font-bold mb-3 sm:mb-4 block">
              {article.category}
            </span>

            {/* H1 Title */}
            <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.0] tracking-tight text-[#FDFBF7] mb-4 sm:mb-5">
              How to Communicate Better <br className="hidden sm:inline" />
              Without Turning It Into <br className="hidden md:inline" />
              <span className="text-[#FF5A4F] italic">a Fight.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[18.5px] md:text-[19.5px] leading-[1.5] text-white/90 font-normal mb-5 max-w-[680px]">
              Practical ways to express what matters, listen differently, and keep difficult conversations from becoming another argument.
            </p>

            {/* Minimal Metadata */}
            <div className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] font-sans uppercase tracking-[0.12em] text-white/70 font-semibold">
              <span>8 MIN READ</span>
              <span className="text-white/30">•</span>
              <span>AMITY VALE JOURNAL</span>
              {formattedDate && (
                <>
                  <span className="text-white/30">•</span>
                  <span>{formattedDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================
          2. OPENING EDITORIAL INTRODUCTION
          - Width: ~880px, centered
          - Top spacing: 64-80px desktop, 44-56px mobile
          - Large editorial lead: "It starts with something small."
          - Key thesis callout (800-860px) with thin coral rule
         ================================================== */}
      <section
        id="article-main-content"
        className="w-full pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16"
      >
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          {/* ARTICLE LEAD */}
          <p className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] tracking-tight mb-8">
            It starts with something small.
          </p>

          <div className="max-w-[800px] space-y-5 text-[18px] sm:text-[19px] md:text-[19.5px] leading-[1.78] text-[#26313A]">
            <p>
              A conversation about money. An evening when your partner seems distracted. A responsibility you have mentioned three times already.
            </p>
            <p>
              You bring it up because it matters to you. But somewhere between explaining how you feel and trying to be understood, the conversation changes. Voices become sharper. Someone gets defensive. Old frustrations resurface.
            </p>
            <p>
              And suddenly, you are no longer talking about the thing that bothered you. You are arguing about how you are talking to each other.
            </p>
            <p>
              If this sounds familiar, you are not necessarily failing at communication. You may simply be caught in a pattern that neither of you knows how to interrupt.
            </p>
          </div>

          {/* KEY THESIS CALLOUT */}
          <div className="my-10 sm:my-12 max-w-[840px] pl-6 sm:pl-8 py-5 pr-6 border-l-[3.5px] border-[#FF5A4F] bg-[#FAF8F5]/85 rounded-r-[14px]">
            <p className="font-serif text-[20px] sm:text-[23px] md:text-[25px] leading-[1.45] text-[#0B2A4A] italic">
              “Communicating better with your partner starts with three changes: expressing your needs without attacking, listening without immediately defending yourself, and knowing when to pause before a disagreement becomes hurtful.”
            </p>
          </div>

          <div className="max-w-[800px] text-[18px] sm:text-[19px] leading-[1.78] text-[#26313A]">
            <p>
              The goal is not to eliminate disagreements. It is to make room for honesty without losing the connection you are trying to protect.
            </p>
          </div>
        </div>

        {/* ==================================================
            3. SECTION: WHY DO SIMPLE CONVERSATIONS TURN INTO ARGUMENTS?
            - Normal reading width ~740px
            - Editorial exchange (~880px wider): What Is Said vs What May Be Heard
           ================================================== */}
        <div className="relative w-full">
          {/* Side Decorative Accent: 3.png entering from Left edge */}
          <DecorativeAccent
            src="/3.png"
            opacity={0.38}
            animateVariant="none"
            className="-left-[120px] sm:-left-[180px] md:-left-[240px] lg:-left-[280px] top-[40px] w-[260px] sm:w-[360px] md:w-[480px] lg:w-[540px] pointer-events-none z-0"
            style={{ transform: "rotate(-12deg)" }}
          />

          <div className="relative z-10">
            <div className="max-w-[740px] mx-auto px-5 sm:px-8 mt-16 sm:mt-20">
              <h2
                id="why-conversations-turn-into-arguments"
                className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] mb-6"
              >
                Why Do Simple Conversations Turn Into Arguments?
              </h2>

              <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
                <p>
                  Sometimes, what appears to be an argument about one thing is connected to something much deeper.
                </p>
                <p>
                  A disagreement about spending may involve a need for security. Frustration over household responsibilities may reflect feeling unsupported. A complaint about time spent together may come from missing the closeness you once shared.
                </p>
                <p>
                  When those underlying feelings remain unspoken, frustration can emerge as criticism.
                </p>
              </div>
            </div>

            {/* EDITORIAL EXCHANGE (WIDER ~880px) */}
            <div className="max-w-[880px] mx-auto px-5 sm:px-8 my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 rounded-[20px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08]">
                {/* What is said */}
                <div className="border-b md:border-b-0 md:border-r border-[#0B2A4A]/10 pb-4 md:pb-0 md:pr-6">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F] block mb-2">
                    WHAT IS SAID
                  </span>
                  <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.4]">
                    “You never make time for me.”
                  </p>
                </div>

                {/* What may be heard */}
                <div className="pt-2 md:pt-0 md:pl-2">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#0E5A63] block mb-2">
                    WHAT MAY BE HEARD
                  </span>
                  <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.4]">
                    “Nothing I do is ever enough.”
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[740px] mx-auto px-5 sm:px-8 space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
              <p>Both feel misunderstood, and both begin defending themselves.</p>
              <p>The original need for connection gets buried beneath the argument.</p>
              <p>
                Recognizing this pattern does not mean every conflict has a hidden emotional meaning. Sometimes the issue really is an unpaid bill or an unfinished responsibility. But understanding both the practical problem and the feelings surrounding it creates a better starting point.
              </p>
            </div>
          </div>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ==================================================
            4. THE SIX NUMBERED COMMUNICATION SECTIONS
            - Large subtle serif numbers (01-06)
            - Deep navy editorial headings
            - Specific styled treatments:
              - Section 2: Instead / Try 2-col comparison (~920px)
              - Section 3: Wider pull quote (~820px)
              - Section 5: 20+ Minute Reset cue
              - Section 6: Vague vs Specific contrast
           ================================================== */}

        {/* ---------------- SECTION 01 ---------------- */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
          <div className="relative mb-6">
            <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
              01
            </span>
            <h2
              id="choose-the-right-moment"
              className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
            >
              Choose the Right Moment, <br className="hidden sm:inline" />
              Not Just the Right Words
            </h2>
          </div>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>
              Even a thoughtful conversation can go badly when one person is exhausted, distracted, or already overwhelmed.
            </p>
            <p>
              A difficult subject deserves more attention than the few minutes before leaving for work or the end of a particularly stressful day.
            </p>
            <p>Instead of raising an important issue without warning, try asking:</p>

            {/* Practical Script Quote */}
            <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#FF5A4F] bg-[#FCFBF8]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#FF5A4F] block mb-1.5">
                TRY ASKING
              </span>
              <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
                “Something has been on my mind, and I would really like to talk about it. Is now a good time, or could we find a moment tonight?”
              </p>
            </div>

            <p>
              This gives your partner an opportunity to be mentally present rather than immediately reactive.
            </p>
            <p>
              It also communicates something important: <em>I want to have this conversation with you, not force you into it.</em>
            </p>
            <p>
              Of course, good timing should not become an excuse to avoid uncomfortable subjects indefinitely. If now is not the right moment, agree on another time.
            </p>
            <p>Making space for a conversation is part of taking it seriously.</p>
          </div>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ---------------- SECTION 02 ---------------- */}
        <div className="relative w-full">
          {/* Side Decorative Accent: 5.png entering from Right edge */}
          <DecorativeAccent
            src="/5.png"
            opacity={0.36}
            animateVariant="none"
            className="-right-[110px] sm:-right-[170px] md:-right-[230px] lg:-right-[270px] top-[-20px] w-[250px] sm:w-[340px] md:w-[460px] lg:w-[520px] pointer-events-none z-0"
            style={{ transform: "rotate(15deg)" }}
          />

          <div className="relative z-10">
            <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-6">
              <div className="relative mb-6">
                <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
                  02
                </span>
                <h2
                  id="express-without-attacking"
                  className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
                >
                  Express What Hurts <br className="hidden sm:inline" />
                  Without Attacking Who They Are
                </h2>
              </div>

              <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
                <p>
                  There is a meaningful difference between describing something that hurt you and making a judgment about your partner&apos;s character.
                </p>
                <p>Consider these two approaches.</p>
              </div>
            </div>

            {/* INSTEAD / TRY COMPARISON (WIDER ~920px, 2-COLUMN) */}
            <div className="max-w-[920px] mx-auto px-5 sm:px-8 my-8 sm:my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Left: INSTEAD */}
                <div className="p-6 sm:p-7 rounded-[18px] bg-[#FAF8F6] border border-[#0B2A4A]/[0.08]">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#5B6470] block mb-2.5">
                    INSTEAD OF
                  </span>
                  <p className="font-serif italic text-[18px] sm:text-[19.5px] leading-[1.5] text-[#5B6470]">
                    “You never listen to me. You only care about yourself.”
                  </p>
                </div>

                {/* Right: TRY THIS */}
                <div className="p-6 sm:p-7 rounded-[18px] bg-[#F4F9F9] border border-[#0E5A63]/18">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#0E5A63] block mb-2.5">
                    TRY THIS
                  </span>
                  <p className="font-serif text-[18px] sm:text-[19.5px] leading-[1.5] text-[#0B2A4A] font-medium">
                    “I felt disconnected when I was sharing something important earlier and we were both distracted. Could we spend a few minutes talking without our phones?”
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20 space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
              <p>
                The second approach identifies a specific moment, explains its emotional impact, and makes a clear request.
              </p>
              <p>
                This is similar to what relationship researchers at{" "}
                <a
                  href="https://www.gottman.com/blog/softening-startup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B2A4A] font-medium underline decoration-[#FF5A4F]/60 underline-offset-4 hover:text-[#FF5A4F] hover:decoration-[#FF5A4F] transition-colors"
                >
                  The Gottman Institute
                </a>{" "}
                describe as a <em>softened start-up</em>: introducing a concern without blame or character attacks.
              </p>
              <p>
                A softer opening does not mean minimizing your feelings or pretending something is acceptable when it is not.
              </p>
              <p>You can be gentle and firm at the same time.</p>

              {/* Script Quote */}
              <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#FF5A4F] bg-[#FCFBF8]">
                <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
                  “I know this has been a stressful week, but I still need us to talk about how responsibilities are being shared.”
                </p>
              </div>

              <p>Your feelings deserve to be expressed. So does your need for change.</p>
              <p>
                The difference is whether the conversation invites understanding or demands a defense.
              </p>
            </div>
          </div>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ---------------- SECTION 03 ---------------- */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-6">
          <div className="relative mb-6">
            <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
              03
            </span>
            <h2
              id="listen-for-understanding"
              className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
            >
              Listen for Understanding <br className="hidden sm:inline" />
              Before Preparing Your Response
            </h2>
          </div>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>When someone says something that feels unfair, the natural impulse is to correct them.</p>
            <p>
              You begin mentally gathering examples, explanations, and evidence for why they are mistaken.
            </p>
            <p>
              But while you prepare your response, you may miss what they are actually trying to communicate.
            </p>
            <p>
              Listening differently means temporarily setting aside your argument long enough to understand their experience.
            </p>
            <p>You might say:</p>

            {/* Script */}
            <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#FF5A4F] bg-[#FCFBF8]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#FF5A4F] block mb-1.5">
                TRY SAYING
              </span>
              <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
                “So when I kept working after dinner, you felt like spending time together was not a priority. Am I understanding that correctly?”
              </p>
            </div>

            <p>You do not have to agree with every part of their interpretation.</p>
          </div>
        </div>

        {/* WIDER EMPHASIZED PULL QUOTE (~820px) */}
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 my-10 text-center">
          <blockquote className="font-serif text-[21px] sm:text-[25px] leading-[1.4] text-[#0B2A4A] italic px-4 py-4 border-y border-[#0B2A4A]/10">
            “Understanding someone&apos;s feelings is not the same as accepting every accusation or giving up your perspective.”
          </blockquote>
        </div>

        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20 space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
          <p>
            It simply demonstrates that you are willing to hear their experience before asking them to hear yours.
          </p>
          <p>Once your partner feels understood, you can share another perspective:</p>

          {/* Script 2 */}
          <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#0B2A4A]/25 bg-[#FCFBF8]">
            <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
              “I can understand why it looked that way. I was worried about finishing something for work, but I should have let you know what was happening.”
            </p>
          </div>

          <p>Both experiences can matter without one canceling out the other.</p>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ---------------- SECTION 04 ---------------- */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
          <div className="relative mb-6">
            <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
              04
            </span>
            <h2
              id="stay-with-one-conversation"
              className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
            >
              Stay With One Conversation <br className="hidden sm:inline" />
              at a Time
            </h2>
          </div>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>
              One of the quickest ways to lose direction during an argument is to bring every unresolved frustration into the room.
            </p>
            <p>
              A conversation about weekend plans becomes a discussion about last month&apos;s disagreement, which becomes a debate about who has sacrificed more over the years.
            </p>
            <p>Before long, neither person knows what needs to be resolved.</p>
            <p>Try keeping the conversation focused on one issue.</p>
            <p>If other concerns emerge, acknowledge them without immediately pursuing them.</p>

            {/* Script Quote */}
            <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#FF5A4F] bg-[#FCFBF8]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#FF5A4F] block mb-1.5">
                TRY SAYING
              </span>
              <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
                “I know we also need to talk about what happened last weekend. I do want to address that. Could we finish talking about tonight first?”
              </p>
            </div>

            <p>
              This does not dismiss other problems. It gives each one a better chance of receiving the attention it deserves.
            </p>
            <p>Not every concern needs to be solved in a single conversation.</p>
          </div>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ---------------- SECTION 05 ---------------- */}
        <div className="relative w-full">
          {/* Side Decorative Accent: 3.png entering from Right edge */}
          <DecorativeAccent
            src="/3.png"
            opacity={0.36}
            animateVariant="none"
            className="-right-[110px] sm:-right-[170px] md:-right-[230px] lg:-right-[270px] top-[40px] w-[250px] sm:w-[350px] md:w-[460px] lg:w-[530px] pointer-events-none z-0"
            style={{ transform: "rotate(-18deg)" }}
          />

          <div className="relative z-10 max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
            <div className="relative mb-6">
              <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
                05
              </span>
              <h2
                id="know-when-to-pause"
                className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
              >
                Know When to Pause <br className="hidden sm:inline" />
                Before Things Escalate
              </h2>
            </div>

            <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
              <p>
                There is a point in some disagreements when continuing becomes less helpful than stopping.
              </p>
              <p>
                You might notice your voice getting louder, your chest tightening, or your thoughts turning toward proving your partner wrong rather than understanding them.
              </p>
              <p>These are signs that you may need a pause.</p>

              {/* Visual Cue */}
              <div className="my-6 pl-5 border-l-2 border-[#0B2A4A]/15 py-1">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#0E5A63] block mb-1">
                  20+ MINUTE RESET
                </span>
                <p className="text-[17px] text-[#26313A] leading-[1.65]">
                  The Gottman Institute recommends taking at least 20 minutes to settle yourself when a conflict becomes emotionally overwhelming. The important part is using that time to calm down rather than rehearse the argument.{" "}
                  <a
                    href="https://www.gottman.com/blog/the-four-horsemen-stonewalling/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B2A4A] font-medium underline decoration-[#FF5A4F]/60 underline-offset-4 hover:text-[#FF5A4F] hover:decoration-[#FF5A4F] transition-colors"
                  >
                    Read its guidance on taking constructive breaks.
                  </a>
                </p>
              </div>

              <p>Try saying:</p>

              {/* Script Quote */}
              <div className="my-8 pl-6 sm:pl-7 py-3 border-l-[3px] border-[#FF5A4F] bg-[#FCFBF8]">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#FF5A4F] block mb-1.5">
                  TRY SAYING
                </span>
                <p className="font-serif italic text-[20px] sm:text-[22px] text-[#0B2A4A] leading-[1.5]">
                  “I care about this, and I want to work through it. I&apos;m getting overwhelmed, though. Can we take half an hour and come back to it?”
                </p>
              </div>

              <p>Notice that this is not the same as storming away or refusing to speak.</p>
              <p>
                You are communicating three things: the conversation matters, you need time to regulate your emotions, and you intend to return.
              </p>
              <p>A healthy pause protects the discussion. Avoidance leaves it unfinished.</p>
            </div>
          </div>
        </div>

        {/* Short Editorial Divider */}
        <div className="w-[32px] h-[1.5px] bg-[#FF5A4F]/40 mx-auto my-16 sm:my-20" />

        {/* ---------------- SECTION 06 ---------------- */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
          <div className="relative mb-6">
            <span className="font-serif text-[64px] sm:text-[76px] lg:text-[84px] text-[#FF5A4F]/22 leading-none block -mb-5 sm:-mb-6 select-none font-bold">
              06
            </span>
            <h2
              id="ask-for-a-specific-change"
              className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A]"
            >
              Ask for a Specific Change, <br className="hidden sm:inline" />
              Not a Perfect Partner
            </h2>
          </div>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>Many relationship conversations end with vague promises.</p>

            {/* Vague promises box */}
            <div className="my-6 p-6 rounded-[16px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#5B6470] block mb-2">
                VAGUE PROMISES
              </span>
              <div className="space-y-1.5 font-serif italic text-[17px] sm:text-[18px] text-[#5B6470]">
                <p>“We need to communicate better.”</p>
                <p>“We should spend more time together.”</p>
                <p>“I&apos;ll try harder.”</p>
              </div>
            </div>

            <p>
              These intentions may be sincere, but neither person knows exactly what will be different tomorrow.
            </p>
            <p>Instead, identify one practical change.</p>
            <p>
              If the issue is feeling disconnected, perhaps you agree to have dinner without phones twice a week.
            </p>
            <p>
              If responsibilities feel unequal, you might divide particular tasks and revisit the arrangement on Sunday.
            </p>
            <p>
              If interruptions are a recurring problem, you could agree to let each other finish speaking before responding.
            </p>
            <p>
              Small, observable agreements are easier to follow through on than broad promises to become a different person.
            </p>
            <p>
              And following through matters. Communication does not improve only because we find better words. It improves when those words are supported by dependable behavior.
            </p>
          </div>
        </div>

        {/* ==================================================
            5. MID-ARTICLE FREE CHECK-IN CTA
            - Positioned right after the 6 numbered sections
            - Full horizontal editorial band (~1040px wide)
            - Warm ivory / light coral background
            - Left ~65% copy, Right ~35% button
            - Single action only (/assessment)
           ================================================== */}
        <section className="w-full px-5 sm:px-8 my-16 sm:my-24">
          <div className="max-w-[1040px] mx-auto rounded-[24px] bg-[#FFF9F6] border border-[#FF5A4F]/20 p-8 sm:p-10 lg:p-12 shadow-[0_10px_30px_rgba(255,90,79,0.05)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left Copy */}
              <div className="max-w-[620px]">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F] block mb-2.5">
                  FREE CONNECTION CHECK-IN
                </span>
                <h3 className="font-serif text-[26px] sm:text-[32px] leading-[1.15] text-[#0B2A4A] mb-3">
                  Which Part of the Pattern <br className="hidden sm:inline" />
                  Feels Most Familiar?
                </h3>
                <p className="text-[#26313A] text-[16px] sm:text-[17px] leading-[1.65]">
                  Take a few minutes to reflect on communication, trust, connection, boundaries, and repair — and see what may deserve more attention.
                </p>
              </div>

              {/* Right CTA */}
              <div className="shrink-0">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14px] hover:bg-[#D9735A] transition-colors shadow-sm w-full sm:w-auto"
                >
                  <span>Take the Free Check-In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            6. REAL-LIFE EXAMPLE — WIDER & VISUAL (~920px)
            - "What Better Communication Can Sound Like in Real Life"
            - The Usual Pattern vs A Different Beginning
            - Partner A (coral) / Partner B (teal) editorial transcript
           ================================================== */}
        <div className="relative w-full">
          {/* Side Decorative Accent: 5.png entering from Left edge */}
          <DecorativeAccent
            src="/5.png"
            opacity={0.38}
            animateVariant="none"
            className="-left-[110px] sm:-left-[170px] md:-left-[230px] lg:-left-[270px] top-[60px] w-[260px] sm:w-[360px] md:w-[470px] lg:w-[540px] pointer-events-none z-0"
            style={{ transform: "rotate(12deg)" }}
          />

          <div className="relative z-10 max-w-[920px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
            <h2
              id="real-life-example"
              className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] mb-6 text-center"
            >
              What Better Communication Can Sound Like in Real Life
            </h2>

            <div className="max-w-[740px] mx-auto space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A] mb-8 text-center sm:text-left">
              <p>Imagine a couple who have been together for many years.</p>
              <p>
                One partner feels that work has taken over their evenings. The other feels pressured by professional responsibilities and believes their efforts to support the household go unnoticed.
              </p>
            </div>

            {/* THE USUAL PATTERN */}
            <div className="max-w-[740px] mx-auto my-8 p-6 rounded-[18px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08] text-center">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#5B6470] block mb-3">
                THE USUAL PATTERN
              </span>
              <p className="font-serif italic text-[19px] sm:text-[21px] text-[#0B2A4A] mb-2">
                “You always put work before me.”
              </p>
              <div className="w-4 h-4 mx-auto text-[#FF5A4F]/60 my-1 font-sans">↓</div>
              <p className="font-serif italic text-[19px] sm:text-[21px] text-[#5B6470]">
                “Nothing I do is ever good enough for you.”
              </p>
            </div>

            <div className="max-w-[740px] mx-auto text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A] my-6">
              <p className="font-serif text-[22px] text-[#0B2A4A] italic text-center">
                Now imagine a different beginning.
              </p>
            </div>

            {/* EDITORIAL TRANSCRIPT (PARTNER A / PARTNER B) */}
            <div className="my-8 rounded-[22px] bg-[#FAF8F5] border border-[#0B2A4A]/10 p-6 sm:p-10 space-y-6">
              <div className="border-b border-[#0B2A4A]/8 pb-5">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F] block mb-2">
                  PARTNER A
                </span>
                <p className="font-serif text-[19px] sm:text-[21px] text-[#0B2A4A] leading-[1.55]">
                  “I&apos;ve been missing our evenings together. I know work has been demanding, but I&apos;ve been feeling lonely lately.”
                </p>
              </div>

              <div className="border-b border-[#0B2A4A]/8 pb-5">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#0E5A63] block mb-2">
                  PARTNER B
                </span>
                <p className="font-serif text-[19px] sm:text-[21px] text-[#0B2A4A] leading-[1.55]">
                  “I didn&apos;t realize it was affecting you that much. I&apos;ve been trying to keep up with everything, and I feel overwhelmed.”
                </p>
              </div>

              <div className="border-b border-[#0B2A4A]/8 pb-5">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F] block mb-2">
                  PARTNER A
                </span>
                <p className="font-serif text-[19px] sm:text-[21px] text-[#0B2A4A] leading-[1.55]">
                  “I understand that. I&apos;m not asking you to ignore your responsibilities. I just want us to feel connected again.”
                </p>
              </div>

              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#0E5A63] block mb-2">
                  PARTNER B
                </span>
                <p className="font-serif text-[19px] sm:text-[21px] text-[#0B2A4A] leading-[1.55]">
                  “Could we keep Friday evening free for ourselves and check in during the week?”
                </p>
              </div>
            </div>

            <div className="max-w-[740px] mx-auto space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
              <p>The problem has not magically disappeared.</p>
              <p>
                Work is still demanding. Both people still have needs. They may need to negotiate what is realistic.
              </p>
              <p>
                But the conversation has moved from accusation toward understanding and a possible agreement.
              </p>
              <p className="font-serif italic text-[22px] text-[#0B2A4A]">That is progress.</p>
            </div>
          </div>
        </div>

        {/* ==================================================
            7. REPAIR ATTEMPTS: "WHAT IF THE CONVERSATION HAS ALREADY BECOME AN ARGUMENT?"
            - Compact "THREE WAYS TO RESET" 3-column layout
            - Gottman repair attempts link
           ================================================== */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mt-16 sm:mt-20 mb-6">
          <h2
            id="repair-an-argument"
            className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] mb-6"
          >
            What If the Conversation Has Already Become an Argument?
          </h2>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>You do not have to wait until the next disagreement to practice communicating differently.</p>
            <p>
              Sometimes the most useful thing you can do is recognize that a conversation is going in the wrong direction and attempt to repair it.
            </p>
          </div>
        </div>

        {/* THREE WAYS TO RESET (3 COLUMNS DESKTOP, STACKED MOBILE) */}
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 my-8 sm:my-10">
          <div className="text-center mb-6">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F]">
              THREE WAYS TO RESET
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-[18px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08]">
              <span className="font-serif text-[26px] text-[#FF5A4F] font-bold block mb-2">01</span>
              <p className="font-serif italic text-[17.5px] leading-[1.45] text-[#0B2A4A]">
                “That came out more harshly than I meant. Can I try again?”
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08]">
              <span className="font-serif text-[26px] text-[#FF5A4F] font-bold block mb-2">02</span>
              <p className="font-serif italic text-[17.5px] leading-[1.45] text-[#0B2A4A]">
                “I think we&apos;re both feeling misunderstood. I want to hear what you&apos;re saying.”
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[#FAF8F5] border border-[#0B2A4A]/[0.08]">
              <span className="font-serif text-[26px] text-[#FF5A4F] font-bold block mb-2">03</span>
              <p className="font-serif italic text-[17.5px] leading-[1.45] text-[#0B2A4A]">
                “I don&apos;t want us to hurt each other while we&apos;re trying to solve this.”
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20 space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
          <p>
            Relationship researchers call these kinds of efforts <em>repair attempts</em>: words or actions intended to reduce tension and restore a more constructive connection.{" "}
            <a
              href="https://www.gottman.com/blog/repair-secret-weapon-emotionally-connected-couples/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B2A4A] font-medium underline decoration-[#FF5A4F]/60 underline-offset-4 hover:text-[#FF5A4F] hover:decoration-[#FF5A4F] transition-colors"
            >
              The Gottman Institute discusses why repair matters.
            </a>
          </p>
          <p>
            A repair attempt is not a substitute for accountability. If you have said something hurtful, acknowledge it. If a promise has been broken, address what needs to change.
          </p>
          <p>
            The purpose is not to erase the disagreement. It is to make it possible to continue with greater care.
          </p>
        </div>

        {/* ==================================================
            8. "WHEN BETTER COMMUNICATION IS NOT ENOUGH"
            - Calmer and more serious
            - Normal reading width
            - Safety comes first inset with Love Is Respect link
            - NO coaching CTA inside or near safety
           ================================================== */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
          <h2
            id="when-communication-is-not-enough"
            className="font-serif text-[30px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] mb-6"
          >
            When Better Communication Is Not Enough
          </h2>

          <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
            <p>Sometimes, despite thoughtful conversations, the same problems continue.</p>
            <p>
              Perhaps one person consistently avoids difficult discussions. Perhaps trust has been damaged, responsibilities remain unfair, or important needs have been ignored for years.
            </p>
            <p>
              In these situations, changing how you speak may help, but lasting improvement also requires willingness, accountability, and action.
            </p>
            <p>
              A qualified couples therapist or another appropriate professional may be helpful when recurring conflict feels impossible to resolve together.
            </p>
            <p>There is also an important distinction between ordinary disagreement and abuse.</p>

            {/* SAFETY INSET (NO CTA) */}
            <div className="my-8 rounded-[18px] bg-[#FAF8F5] border border-[#0B2A4A]/12 border-l-4 border-l-[#FF5A4F] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[#0B2A4A] font-serif text-[20px] sm:text-[21px] font-bold mb-2.5">
                <Shield className="w-5 h-5 text-[#FF5A4F] shrink-0" />
                <h4>SAFETY COMES FIRST</h4>
              </div>
              <p className="text-[#26313A] text-[16.5px] sm:text-[17px] leading-[1.65]">
                If conversations involve threats, intimidation, coercion, or fear of retaliation, the priority is safety—not finding a gentler way to speak.{" "}
                <a
                  href="https://www.loveisrespect.org/resources/conflict-resolution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#FF5A4F]/70 underline-offset-4 text-[#0B2A4A] font-medium hover:text-[#FF5A4F] transition-colors"
                >
                  Love Is Respect
                </a>{" "}
                explains how unhealthy conflict can differ from ordinary disagreements and provides resources for support.
              </p>
            </div>

            <p className="italic text-[#5B6470]">
              No one should have to communicate perfectly to be treated with dignity and respect.
            </p>
          </div>
        </div>

        {/* ==================================================
            9. FOUR-STEP CONVERSATION RESET (~1000px WIDER)
            - A Small Practice for Your Next Difficult Conversation
            - Desktop: 4 columns with connecting rule
            - Mobile: vertical timeline
           ================================================== */}
        <section className="relative w-full px-5 sm:px-8 my-16 sm:my-24">
          {/* Side Decorative Accent: 3.png entering from Right edge */}
          <DecorativeAccent
            src="/3.png"
            opacity={0.36}
            animateVariant="none"
            className="-right-[110px] sm:-right-[170px] md:-right-[230px] lg:-right-[270px] top-[30px] w-[250px] sm:w-[350px] md:w-[460px] lg:w-[520px] pointer-events-none z-0"
            style={{ transform: "rotate(-14deg)" }}
          />

          <div className="relative z-10 max-w-[1000px] mx-auto">
            <div className="text-center max-w-[740px] mx-auto mb-12">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#FF5A4F] block mb-2">
                PRACTICAL FRAMEWORK
              </span>
              <h2
                id="small-practice"
                className="font-serif text-[30px] sm:text-[36px] md:text-[40px] leading-[1.12] text-[#0B2A4A] mb-4"
              >
                A Small Practice for Your Next Difficult Conversation
              </h2>
              <p className="text-[17px] sm:text-[18px] text-[#26313A] leading-[1.6]">
                The next time something important is bothering you, try this brief conversation reset:
              </p>
            </div>

            {/* Desktop: 4 horizontal columns with connecting line */}
            <div className="hidden lg:grid grid-cols-4 gap-6 relative">
              {/* Connecting line */}
              <div
                className="absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-[#FF5A4F]/25 pointer-events-none z-0"
                aria-hidden="true"
              />

              {PRACTICE_STEPS.map((step) => (
                <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FCFBF8] border-2 border-[#FF5A4F] flex items-center justify-center font-serif text-[22px] font-bold text-[#FF5A4F] mb-4 shadow-sm">
                    {step.number}
                  </div>
                  <h4 className="font-serif text-[19px] text-[#0B2A4A] mb-2 font-semibold">
                    {step.title}
                  </h4>
                  <p className="text-[#26313A] text-[15px] leading-[1.6]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet: Vertical Timeline */}
            <div className="lg:hidden space-y-8 relative border-l-2 border-[#FF5A4F]/30 pl-6 sm:pl-8 ml-3 sm:ml-4">
              {PRACTICE_STEPS.map((step) => (
                <div key={step.number} className="relative">
                  <span className="font-serif text-[28px] sm:text-[32px] text-[#FF5A4F] font-bold leading-none block mb-1">
                    {step.number}
                  </span>
                  <h4 className="font-serif text-[20px] sm:text-[22px] text-[#0B2A4A] mb-1.5 font-semibold">
                    {step.title}
                  </h4>
                  <p className="text-[#26313A] text-[16px] sm:text-[17px] leading-[1.6]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-[740px] mx-auto text-center mt-10 space-y-3 text-[17px] sm:text-[18px] text-[#26313A] leading-[1.7]">
              <p>
                You do not need to deliver these words perfectly. The exercise is simply a way to slow down a familiar pattern and make space for a different outcome.
              </p>
              <p className="font-medium text-[#0B2A4A]">
                Even if you only manage one part of it, that is something you can build on.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            10. FAQ SECTION
            - Restrained accordion (border-top, border-bottom)
            - No giant enclosing card
           ================================================== */}
        <div className="max-w-[740px] mx-auto px-5 sm:px-8 my-16 sm:my-20">
          <h2
            id="faq"
            className="font-serif text-[28px] sm:text-[32px] md:text-[36px] leading-[1.12] text-[#0B2A4A] mb-4 text-center sm:text-left"
          >
            Frequently Asked Questions
          </h2>

          <ArticleFaqAccordion />
        </div>

        {/* ==================================================
            11. ARTICLE CONCLUSION
            - "The Goal Is Not Perfect Communication. It Is Deeper Understanding."
            - Final bold closing pull quote (~820px wide):
              “You do not have to agree on everything to make each other feel heard.”
           ================================================== */}
        <div className="relative w-full">
          {/* Side Decorative Accent: 5.png entering from Left edge */}
          <DecorativeAccent
            src="/5.png"
            opacity={0.38}
            animateVariant="none"
            className="-left-[100px] sm:-left-[160px] md:-left-[220px] lg:-left-[260px] top-[10px] w-[250px] sm:w-[340px] md:w-[450px] lg:w-[510px] pointer-events-none z-0"
            style={{ transform: "rotate(20deg)" }}
          />

          <div className="relative z-10">
            <div className="max-w-[740px] mx-auto px-5 sm:px-8 mt-16 sm:mt-24 mb-16 sm:mb-20">
              <h2
                id="deeper-understanding"
                className="font-serif text-[32px] sm:text-[38px] md:text-[42px] leading-[1.1] text-[#0B2A4A] mb-6 text-center sm:text-left"
              >
                The Goal Is Not Perfect Communication. <br className="hidden sm:inline" />
                It Is Deeper Understanding.
              </h2>

              <div className="space-y-5 text-[18px] sm:text-[18.5px] leading-[1.78] text-[#26313A]">
                <p>
                  Healthy communication does not mean never raising your voice, never feeling frustrated, or always knowing the right thing to say.
                </p>
                <p>
                  It means learning to recognize when a conversation is moving away from understanding—and choosing, when possible, a different direction.
                </p>
                <p>
                  Some conversations will still be difficult. Some disagreements will take time to resolve. Others may reveal changes that need to happen beyond the conversation itself.
                </p>
                <p>
                  But every genuine effort to listen, speak with care, take responsibility, and follow through creates another opportunity for connection.
                </p>
              </div>
            </div>

            {/* STRONG CLOSING PULL QUOTE (~820px WIDE, NO CARD) */}
            <div className="max-w-[820px] mx-auto px-5 sm:px-8 my-12 sm:my-16 text-center">
              <div className="py-8 px-6 border-y border-[#0B2A4A]/12">
                <p className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.28] text-[#0B2A4A]">
                  “You do not have to agree on everything to make each other{" "}
                  <span className="text-[#FF5A4F] italic">feel heard.”</span>
                </p>
              </div>
              <p className="text-[#5B6470] italic text-[17px] mt-4">
                And sometimes, that is where a better conversation begins.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            12. FINAL CONVERSION CTA
            - Width ~1100px
            - Background: Deep Navy (#0B2A4A)
            - Radius: 28-32px
            - Eyebrow: WHEN THE SAME CONVERSATION KEEPS BECOMING THE SAME FIGHT
            - Heading: Sometimes Understanding the Pattern Is the First Step Toward Changing It.
            - Primary: Book a Private Session -> /booking
            - Secondary: Take the Free Check-In -> /assessment
            - Tertiary: Explore Relationship Coaching -> /coaching#romantic
           ================================================== */}
        <section className="w-full px-4 sm:px-6 mt-16 sm:mt-24 mb-20 md:mb-28">
          <div className="max-w-[1100px] mx-auto relative rounded-[28px] md:rounded-[36px] bg-[#0B2A4A] text-white py-14 sm:py-16 md:py-20 px-6 sm:px-10 md:px-16 overflow-hidden shadow-[0_24px_60px_rgba(11,42,74,0.18)]">
            {/* Subtle Brand Decoration */}
            <DecorativeAccent
              src="/3.png"
              opacity={0.09}
              animateVariant="none"
              className="w-[420px] right-[-100px] bottom-[-100px] z-0 pointer-events-none"
            />

            <div className="relative z-10 max-w-[760px] mx-auto text-center">
              <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 md:mb-4 block">
                WHEN THE SAME CONVERSATION KEEPS BECOMING THE SAME FIGHT
              </span>

              <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[50px] leading-[1.06] tracking-tight text-[#FDFBF7] mb-5">
                Sometimes Understanding the Pattern <br className="hidden sm:inline" />
                <span className="text-[#FF5A4F] italic">Is the First Step Toward Changing It.</span>
              </h2>

              <p className="text-[#FDFBF7]/85 text-[16.5px] sm:text-[17.5px] md:text-[18px] leading-[1.65] mb-9 max-w-[640px] mx-auto font-normal">
                If difficult conversations keep creating distance, a private session can help you slow things down, understand what is happening, and decide what to try differently.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-7">
                <Link
                  href="/booking"
                  className="h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14px] tracking-wide hover:bg-[#D9735A] hover:-translate-y-0.5 transition-all duration-200 shadow-sm w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <span>Book a Private Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/assessment"
                  className="h-[52px] px-8 rounded-full bg-white/5 border border-white/20 text-[#FDFBF7] font-sans font-bold text-[14px] tracking-wide hover:bg-white/10 hover:border-white/30 transition-all duration-200 w-full sm:w-auto inline-flex items-center justify-center"
                >
                  Take the Free Check-In
                </Link>
              </div>

              {/* Tertiary coaching anchor */}
              <div>
                <Link
                  href="/coaching#romantic"
                  className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-[#FDFBF7]/70 hover:text-[#FF5A4F] transition-colors"
                >
                  <span>Explore Relationship Coaching</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            13. RELATED ARTICLES (CONTINUE READING)
            - Up to 3 articles from data
            - Compact editorial tiles
           ================================================== */}
        {relatedArticles.length > 0 && (
          <section className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-20 md:pb-28 border-t border-[#0B2A4A]/8 bg-[#FCFBF8]">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex items-baseline justify-between mb-8 md:mb-10">
                <h3 className="font-serif text-[26px] md:text-[30px] text-[#0B2A4A] tracking-tight">
                  Continue Reading
                </h3>
                <Link
                  href="/articles"
                  className="text-[13px] font-sans font-semibold text-[#FF5A4F] hover:underline"
                >
                  View all articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((rel) => (
                  <article key={rel.id} className="group flex flex-col cursor-pointer">
                    <Link
                      href={`/articles/${rel.slug}`}
                      className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden mb-4 bg-[#F2EDE8] block"
                    >
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-[1.025] transition-transform duration-300 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#FF5A4F] mb-2">
                      <span>{rel.category}</span>
                      <span className="text-[#0B2A4A]/20">•</span>
                      <span className="text-[#5B6470] font-normal tracking-normal normal-case text-[12px]">
                        {rel.readTime}
                      </span>
                    </div>

                    <h4 className="font-serif text-[20px] md:text-[22px] leading-[1.2] text-[#0B2A4A] tracking-tight mb-2 line-clamp-2 group-hover:text-[#FF5A4F] transition-colors duration-200">
                      <Link href={`/articles/${rel.slug}`}>{rel.title}</Link>
                    </h4>

                    <p className="text-[#26313A] text-[14px] leading-[1.6] line-clamp-2 mb-3">
                      {rel.excerpt}
                    </p>

                    <div className="mt-auto pt-1">
                      <Link
                        href={`/articles/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-200"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </article>
  );
}
