export type AssessmentCategoryKey = 
  | "intimacy"
  | "relationship"
  | "health"
  | "spiritual"
  | "personal_growth";

export type RelationshipFocus = "business" | "family" | "partnerships";

export interface CategoryInfo {
  id: AssessmentCategoryKey;
  number: string;
  title: string;
  description: string;
  accentColor: string; // hex
  accentBg: string;
  accentBorder: string;
  promptIntro: string;
  coachingHref: string;
  coachingCtaLabel: string;
}

export const ASSESSMENT_CATEGORIES: CategoryInfo[] = [
  {
    id: "intimacy",
    number: "01",
    title: "Intimacy Coaching",
    description: "Emotional trust, physical closeness, and the bond you share.",
    accentColor: "#DE5D52",
    accentBg: "bg-[#DE5D52]/10",
    accentBorder: "border-[#DE5D52]",
    promptIntro: "Thinking about this connection over the past month, how true has each statement felt?",
    coachingHref: "/coaching#intimacy",
    coachingCtaLabel: "Explore Intimacy Coaching",
  },
  {
    id: "relationship",
    number: "02",
    title: "Relationship Coaching",
    description: "Business, family, and partnerships shaped by communication, expectations, and shared responsibilities.",
    accentColor: "#0B2A4A",
    accentBg: "bg-[#0B2A4A]/10",
    accentBorder: "border-[#0B2A4A]",
    promptIntro: "Thinking about this relationship over the past month, how true has each statement felt?",
    coachingHref: "/coaching#relationship",
    coachingCtaLabel: "Explore Relationship Coaching",
  },
  {
    id: "health",
    number: "03",
    title: "Health Coaching",
    description: "Wellness priorities, changing routines, and the realities that health-related decisions can place on everyday life.",
    accentColor: "#0E5A63",
    accentBg: "bg-[#0E5A63]/10",
    accentBorder: "border-[#0E5A63]",
    promptIntro: "Thinking about your daily habits, energy, and physical routines recently, how true has each statement felt?",
    coachingHref: "/coaching#health",
    coachingCtaLabel: "Explore Health Coaching",
  },
  {
    id: "spiritual",
    number: "04",
    title: "Spiritual Coaching",
    description: "Beliefs, values, purpose, and the questions that shape how you understand your spiritual life.",
    accentColor: "#B87A18",
    accentBg: "bg-[#B87A18]/10",
    accentBorder: "border-[#B87A18]",
    promptIntro: "Thinking about your beliefs, values, or spiritual life recently, how true has each statement felt?",
    coachingHref: "/coaching#spiritual",
    coachingCtaLabel: "Explore Spiritual Coaching",
  },
  {
    id: "personal_growth",
    number: "05",
    title: "Personal Growth",
    description: "Identity, life transitions, self-discovery, and the changes taking place within you.",
    accentColor: "#127A70",
    accentBg: "bg-[#127A70]/10",
    accentBorder: "border-[#127A70]",
    promptIntro: "Thinking about yourself and your personal chapter recently, how true has each statement felt?",
    coachingHref: "/coaching#personal-growth",
    coachingCtaLabel: "Explore Personal Growth Coaching",
  },
];

export interface QuestionItem {
  id: number;
  text: string;
}

export const RESPONSE_OPTIONS = [
  { label: "Not at all true", value: 1 },
  { label: "Slightly true", value: 2 },
  { label: "Somewhat true", value: 3 },
  { label: "Mostly true", value: 4 },
  { label: "Very true", value: 5 },
];

export const SAFETY_QUESTION = {
  text: "Do you ever feel afraid of how this person may react when you disagree, say no, or set a boundary?",
  options: ["Never", "Rarely", "Sometimes", "Often"],
};

export const CORE_INTERPERSONAL_QUESTIONS: QuestionItem[] = [
  { id: 1, text: "I can say what I really mean without feeling that I have to carefully manage the other person’s reaction." },
  { id: 2, text: "When I talk about something important, I generally feel listened to and understood." },
  { id: 3, text: "We can disagree without the conversation quickly becoming hostile, dismissive, or completely shut down." },
  { id: 4, text: "I feel respected when I express a need, limit, or different point of view." },
  { id: 5, text: "I trust this person to handle vulnerable or personal things I share with care." },
  { id: 6, text: "The effort to maintain this relationship feels reasonably mutual." },
  { id: 7, text: "I feel genuine warmth, interest, or care between us." },
  { id: 8, text: "After tension or conflict, we are usually able to repair and reconnect." },
  { id: 9, text: "I can be myself in this relationship without constantly keeping the peace or playing a role." },
  { id: 10, text: "When I think about this relationship, I can imagine a constructive way forward." },
];

export const INTIMACY_ADDITIONAL_QUESTIONS: QuestionItem[] = [
  { id: 11, text: "We can talk about affection, closeness, or intimacy without pressure, ridicule, or avoidance." },
  { id: 12, text: "Our expectations about commitment, closeness, and emotional presence are clear enough to discuss honestly." },
];

export const BUSINESS_ADDITIONAL_QUESTIONS: QuestionItem[] = [
  { id: 11, text: "Our roles, responsibilities, and professional expectations are clear and mutually respected." },
  { id: 12, text: "We can resolve operational friction or misaligned objectives without defensive escalation." },
];

export const FAMILY_ADDITIONAL_QUESTIONS: QuestionItem[] = [
  { id: 11, text: "I can care about this person without feeling responsible for fixing every problem or managing all of their emotions." },
  { id: 12, text: "Old family roles or past conflicts do not completely control how we relate to each other today." },
];

export const PARTNERSHIP_ADDITIONAL_QUESTIONS: QuestionItem[] = [
  { id: 11, text: "We can discuss shared commitments, financial priorities, or long-term alignment with transparency." },
  { id: 12, text: "Trust and mutual respect are strong enough to navigate tough partnership crossroads." },
];

export const HEALTH_QUESTIONS: QuestionItem[] = [
  { id: 1, text: "My daily habits and physical routines currently support the energy I need for what matters most." },
  { id: 2, text: "I am able to prioritize sleep, rest, or recovery without feeling constant guilt or compromise." },
  { id: 3, text: "When lifestyle changes or wellness adjustments feel necessary, I have clarity on what first steps to take." },
  { id: 4, text: "I can communicate my wellness boundaries, energy limits, and pacing to the people around me." },
  { id: 5, text: "Stress or demanding schedules do not completely derail my essential daily self-care routines." },
  { id: 6, text: "I approach health adjustments with patience and consistency rather than extreme or temporary measures." },
  { id: 7, text: "My everyday environment makes it manageable to sustain positive, nourishing choices." },
  { id: 8, text: "I notice when my body or mind signals fatigue and I take reasonable steps to respond." },
  { id: 9, text: "I have realistic, steady goals for my wellbeing that fit the current season of my life." },
  { id: 10, text: "When routines are disrupted, I am able to reset without harsh self-blame or losing momentum." },
];

export const SPIRITUAL_QUESTIONS: QuestionItem[] = [
  { id: 1, text: "My spiritual life or personal worldview currently gives me some sense of meaning or direction." },
  { id: 2, text: "I can be honest about doubt, uncertainty, or difficult questions without feeling that I have to pretend." },
  { id: 3, text: "My core values and the way I live my everyday life feel reasonably aligned." },
  { id: 4, text: "I have moments, environments, or practices that help me feel grounded and spiritually connected." },
  { id: 5, text: "I can tell the difference between what I truly believe and what others expect me to believe." },
  { id: 6, text: "When questions feel difficult, I have someone or somewhere I can safely explore them." },
  { id: 7, text: "My beliefs generally help me approach other people with greater clarity, compassion, or responsibility." },
  { id: 8, text: "I feel able to reconsider beliefs or assumptions that no longer make sense to me." },
  { id: 9, text: "I have some sense of what I want my spiritual life or inner journey to grow toward." },
  { id: 10, text: "I can live with some uncertainty without feeling that I must have every answer immediately." },
];

export const PERSONAL_GROWTH_QUESTIONS: QuestionItem[] = [
  { id: 1, text: "I can usually recognize what I am feeling before it turns into an automatic reaction." },
  { id: 2, text: "I can name what I need without immediately dismissing it." },
  { id: 3, text: "I can set a boundary without feeling that I must endlessly justify it." },
  { id: 4, text: "I notice recurring patterns in the relationships I choose and the way I respond." },
  { id: 5, text: "I trust myself to make important decisions even when others may disagree." },
  { id: 6, text: "I can learn from a mistake without defining myself by it." },
  { id: 7, text: "My everyday choices generally reflect what matters to me." },
  { id: 8, text: "I have a reasonable sense of what I want to change or strengthen next." },
  { id: 9, text: "I can ask for support when I genuinely need it." },
  { id: 10, text: "When I notice something about myself I want to change, I can approach it with curiosity rather than only criticism." },
];

export function getQuestionsForCategory(
  category: AssessmentCategoryKey,
  relationshipFocus?: RelationshipFocus | null
): QuestionItem[] {
  switch (category) {
    case "intimacy":
      return [...CORE_INTERPERSONAL_QUESTIONS, ...INTIMACY_ADDITIONAL_QUESTIONS];
    case "relationship":
      if (relationshipFocus === "business") {
        return [...CORE_INTERPERSONAL_QUESTIONS, ...BUSINESS_ADDITIONAL_QUESTIONS];
      }
      if (relationshipFocus === "family") {
        return [...CORE_INTERPERSONAL_QUESTIONS, ...FAMILY_ADDITIONAL_QUESTIONS];
      }
      return [...CORE_INTERPERSONAL_QUESTIONS, ...PARTNERSHIP_ADDITIONAL_QUESTIONS];
    case "health":
      return HEALTH_QUESTIONS;
    case "spiritual":
      return SPIRITUAL_QUESTIONS;
    case "personal_growth":
      return PERSONAL_GROWTH_QUESTIONS;
  }
}

export type ScoreBand = "STEADIER" | "MIXED" | "WORTH EXPLORING";

export interface DimensionResult {
  key: string;
  label: string;
  score: number;
  band: ScoreBand;
  strengthCopy: string;
  focusCopy: string;
  patternCopy: string;
  nextStepCopy: string;
}

export interface DimensionDefinition {
  key: string;
  label: string;
  qIds: [number, number];
  strengthCopy: string;
  focusCopy: string;
  patternCopy: string;
  nextStepCopy: string;
}

export const INTERPERSONAL_DIMENSIONS: DimensionDefinition[] = [
  {
    key: "communication",
    label: "Communication & Understanding",
    qIds: [2, 3],
    strengthCopy: "Your answers suggest that there is some ability to talk about important things and feel heard, even when conversations are not always easy.",
    focusCopy: "Important conversations may be getting lost in defensiveness, shutdown, or misunderstanding before either person feels fully heard.",
    patternCopy: "When sensitive topics arise, conversations can slide into protective habits before either person feels completely understood.",
    nextStepCopy: "In your next important conversation, try stating one feeling or need clearly before explaining what you think the other person is doing wrong.",
  },
  {
    key: "trust",
    label: "Trust & Respect",
    qIds: [4, 5],
    strengthCopy: "There appears to be a meaningful foundation of respect and care around vulnerable or personal conversations.",
    focusCopy: "You may be holding back because openness does not always feel fully respected or safe.",
    patternCopy: "Guardedness frequently develops when past openness was met with judgment, minimization, or unpredictable reactions.",
    nextStepCopy: "Notice one topic you tend to soften, avoid, or over-explain. Ask yourself what would help you discuss it more honestly and respectfully.",
  },
  {
    key: "connection",
    label: "Connection & Reciprocity",
    qIds: [6, 7],
    strengthCopy: "Care and effort still appear to be present, which can provide an important foundation for working through harder areas.",
    focusCopy: "The relationship may currently feel uneven, distant, or less mutually engaged than you would like.",
    patternCopy: "When one person repeatedly carries the relational initiative, quiet exhaustion or resentment tends to accumulate over time.",
    nextStepCopy: "Identify one small form of connection or effort that would feel meaningful to you, and consider expressing it clearly rather than hoping it will be noticed.",
  },
  {
    key: "authenticity",
    label: "Authenticity & Boundaries",
    qIds: [1, 9],
    strengthCopy: "You appear to have some room to express yourself and maintain your own perspective within this relationship.",
    focusCopy: "You may be spending significant energy keeping the peace, managing reactions, or minimizing what you actually need.",
    patternCopy: "Prioritizing harmony at the cost of your authentic limits often feels necessary in the moment, but gradually drains genuine closeness.",
    nextStepCopy: "Choose one small boundary or preference you can express clearly without over-explaining or apologizing for having it.",
  },
  {
    key: "repair",
    label: "Repair & Direction",
    qIds: [8, 10],
    strengthCopy: "Even when things become difficult, your answers suggest that there may still be some ability to repair and imagine a constructive way forward.",
    focusCopy: "Conflict may be ending without real repair, leaving the same issue ready to return later.",
    patternCopy: "Moving forward without real resolution can look like harmony on the surface, while the unresolved issue waits underneath.",
    nextStepCopy: "After the next difficult conversation, ask: ‘Is there anything still unresolved between us that we should come back to when we are calmer?’",
  },
];

export const HEALTH_DIMENSIONS: DimensionDefinition[] = [
  {
    key: "energy_rest",
    label: "Daily Rhythm & Rest",
    qIds: [1, 2],
    strengthCopy: "Your daily rhythms and recovery practices appear to provide a dependable foundation for your ongoing energy.",
    focusCopy: "Fatigue or disrupted sleep habits may be diminishing the energy you have for daily demands.",
    patternCopy: "When schedules become compressed, rest and recovery are often the first necessities set aside.",
    nextStepCopy: "Identify one small evening or morning ritual that protects 20 minutes of undisturbed rest or recovery.",
  },
  {
    key: "boundaries_pacing",
    label: "Boundaries & Pacing",
    qIds: [4, 5],
    strengthCopy: "You show an ability to communicate your capacity and protect your energy even during busier periods.",
    focusCopy: "Demands from others or external pressures may frequently push past your physical or emotional limits.",
    patternCopy: "Reluctance to communicate physical limits often leads to accumulated depletion and burnout.",
    nextStepCopy: "Practice communicating one clear scheduling or energy boundary this week without over-explaining.",
  },
  {
    key: "awareness_response",
    label: "Body Awareness & Reset",
    qIds: [3, 8],
    strengthCopy: "You notice signals of fatigue or tension and respond with constructive adjustments.",
    focusCopy: "You may tend to push through warning signs of exhaustion until your body forces an unplanned pause.",
    patternCopy: "Ignoring early signals of tension makes it harder to reset before fatigue becomes chronic.",
    nextStepCopy: "When you first notice signs of fatigue during the day, take a five-minute pause before continuing.",
  },
  {
    key: "mindset_consistency",
    label: "Mindset & Consistency",
    qIds: [6, 10],
    strengthCopy: "You approach lifestyle habits with sustainable consistency rather than all-or-nothing extremes.",
    focusCopy: "Disruptions to your schedule may trigger discouragement or difficulty getting back on track.",
    patternCopy: "All-or-nothing expectations around wellness often turn minor disruptions into extended pauses.",
    nextStepCopy: "Focus on maintaining one minimum baseline habit even on the busiest or most imperfect days.",
  },
  {
    key: "sustainable_goals",
    label: "Sustainable Direction",
    qIds: [7, 9],
    strengthCopy: "Your wellness priorities fit the actual reality and demands of your current life season.",
    focusCopy: "Your health goals may feel disconnected from your everyday environment or current commitments.",
    patternCopy: "Setting health expectations that do not account for life's current demands creates constant friction.",
    nextStepCopy: "Choose one realistic wellness priority that directly fits your current weekly schedule.",
  },
];

export const SPIRITUAL_DIMENSIONS: DimensionDefinition[] = [
  {
    key: "meaning_direction",
    label: "Meaning & Direction",
    qIds: [1, 9],
    strengthCopy: "Your spiritual life offers an anchoring sense of purpose, orientation, and guiding meaning in your day-to-day life.",
    focusCopy: "You may currently be feeling adrift or disconnected from a clear sense of spiritual direction or purpose.",
    patternCopy: "Life transitions, losses, or shifts in perspective often bring seasons where familiar sources of meaning feel less accessible.",
    nextStepCopy: "Take a quiet moment to reflect on what currently feels genuinely meaningful to you, without pressure to have a complete framework.",
  },
  {
    key: "honesty_questions",
    label: "Honesty & Questions",
    qIds: [2, 8],
    strengthCopy: "You have room to hold honest questions and doubts without feeling forced to pretend or suppress what is true for you.",
    focusCopy: "You may feel pressure to present certainty or keep questions to yourself rather than exploring them openly.",
    patternCopy: "Suppressing doubts to preserve belonging or certainty can quietly turn spiritual life into a performance.",
    nextStepCopy: "Write down one honest question you carry about faith or life, and consider discussing it with someone who welcomes nuance.",
  },
  {
    key: "values_alignment",
    label: "Values & Alignment",
    qIds: [3, 7],
    strengthCopy: "Your core values and the way you live your daily life appear reasonably integrated and mutually reinforcing.",
    focusCopy: "There may be an uncomfortable gap between what you value deeply and how your time, energy, or relationships are currently unfolding.",
    patternCopy: "When external obligations run ahead of inner values, life can feel hurried or disconnected from what matters.",
    nextStepCopy: "Choose one daily commitment or habit that feels misaligned with your deeper values, and explore what one small adjustment could look like.",
  },
  {
    key: "connection_support",
    label: "Connection & Support",
    qIds: [4, 6],
    strengthCopy: "You have grounding practices or supportive connections that help sustain your spiritual wellbeing.",
    focusCopy: "You may be walking through this season of spiritual life without the community, quiet, or support you desire.",
    patternCopy: "Spiritual isolation often deepens when previous circles no longer feel like a safe fit for where you are now.",
    nextStepCopy: "Consider one simple practice, environment, or trustworthy person that brings you a sense of calm, rest, or spiritual grounding.",
  },
  {
    key: "belief_openness",
    label: "Personal Belief & Openness",
    qIds: [5, 10],
    strengthCopy: "You demonstrate an ability to discern your own authentic convictions while remaining open to growth and perspective.",
    focusCopy: "It may be difficult to separate your own true convictions from the expectations, rules, or judgments of others.",
    patternCopy: "Inherited beliefs can become heavy when they are carried out of obligation rather than personal conviction.",
    nextStepCopy: "Ask yourself which of your beliefs feels like your own genuine conviction, versus one you maintain primarily to satisfy others.",
  },
];

// Alias for compatibility
export const FAITH_DIMENSIONS = SPIRITUAL_DIMENSIONS;

export const PERSONAL_GROWTH_DIMENSIONS: DimensionDefinition[] = [
  {
    key: "self_awareness",
    label: "Self-Awareness",
    qIds: [1, 4],
    strengthCopy: "You have a solid capacity to notice your emotional responses and recognize relationship patterns as they unfold.",
    focusCopy: "Emotional reactions or recurring habits may sometimes feel like they take over before you have time to pause and reflect.",
    patternCopy: "Automatic reactions often serve as protective reflexes learned in earlier chapters of life.",
    nextStepCopy: "When you notice a sudden wave of irritation, anxiety, or withdrawal, pause for three breaths before choosing your response.",
  },
  {
    key: "needs_boundaries",
    label: "Needs & Boundaries",
    qIds: [2, 3],
    strengthCopy: "You have some comfort in identifying what you need and establishing reasonable limits for yourself.",
    focusCopy: "You may frequently find yourself over-explaining your boundaries, ignoring your own needs, or feeling guilty for having limits.",
    patternCopy: "Dismissing your own needs to accommodate others often prevents relationships from being truly authentic.",
    nextStepCopy: "Practice saying a simple, courteous 'no' or 'I need a moment to consider that' without providing a long list of justifications.",
  },
  {
    key: "self_trust",
    label: "Self-Trust & Support",
    qIds: [5, 9],
    strengthCopy: "You can navigate important decisions with self-trust while remaining capable of seeking support when appropriate.",
    focusCopy: "You may second-guess your judgment frequently or struggle to reach out for support when you genuinely need it.",
    patternCopy: "Carrying everything alone can feel like strength, but often leads to exhaustion and emotional depletion.",
    nextStepCopy: "Identify one decision or challenge where you can trust your instinct, or ask a reliable ally for input without relinquishing your agency.",
  },
  {
    key: "learning_compassion",
    label: "Learning & Self-Compassion",
    qIds: [6, 10],
    strengthCopy: "You are able to learn from setbacks and misunderstandings with a constructive, curious mindset rather than self-condemnation.",
    focusCopy: "Mistakes or perceived shortcomings may quickly trigger harsh internal criticism or self-doubt.",
    patternCopy: "Treating mistakes as proof of inadequacy keeps you cautious, whereas treating them as data creates room to grow.",
    nextStepCopy: "The next time something doesn't go as planned, ask: 'What is this situation teaching me?' rather than 'What is wrong with me?'",
  },
  {
    key: "direction_alignment",
    label: "Direction & Alignment",
    qIds: [7, 8],
    strengthCopy: "Your daily priorities and choices align thoughtfully with the person you are actively working to become.",
    focusCopy: "You may feel somewhat uncertain about your next direction or find daily routines disconnected from your broader aspirations.",
    patternCopy: "When life becomes reactive to daily demands, long-term personal clarity naturally gets pushed to the background.",
    nextStepCopy: "Define one small, concrete priority that matters to your growth this month, and protect 30 minutes each week to nurture it.",
  },
];

export function getBandForScore(score: number): ScoreBand {
  if (score >= 4.0) return "STEADIER";
  if (score >= 3.0) return "MIXED";
  return "WORTH EXPLORING";
}

export interface AssessmentResultData {
  category: AssessmentCategoryKey;
  relationshipFocus?: RelationshipFocus | null;
  dimensions: DimensionResult[];
  isBalanced: boolean;
  primaryStrength: DimensionResult;
  primaryFocus: DimensionResult;
  overallReflection: string;
  pathObservations: string[];
  safetyFlag: boolean;
  openReflectionText?: string;
}

export function calculateResults(
  category: AssessmentCategoryKey,
  answers: Record<number, number>,
  safetyAnswer?: string,
  openReflectionText?: string,
  relationshipFocus?: RelationshipFocus | null
): AssessmentResultData {
  let dimensionDefs: DimensionDefinition[];
  if (category === "spiritual") {
    dimensionDefs = SPIRITUAL_DIMENSIONS;
  } else if (category === "personal_growth") {
    dimensionDefs = PERSONAL_GROWTH_DIMENSIONS;
  } else if (category === "health") {
    dimensionDefs = HEALTH_DIMENSIONS;
  } else {
    dimensionDefs = INTERPERSONAL_DIMENSIONS;
  }

  const dimensions: DimensionResult[] = dimensionDefs.map((def) => {
    const val1 = answers[def.qIds[0]] ?? 3;
    const val2 = answers[def.qIds[1]] ?? 3;
    const score = Number(((val1 + val2) / 2).toFixed(2));
    const band = getBandForScore(score);
    return {
      key: def.key,
      label: def.label,
      score,
      band,
      strengthCopy: def.strengthCopy,
      focusCopy: def.focusCopy,
      patternCopy: def.patternCopy,
      nextStepCopy: def.nextStepCopy,
    };
  });

  // Determine highest and lowest
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  const isBalanced = highest.score - lowest.score < 0.35;

  // Primary focus is lowest
  const primaryStrength = highest;
  const primaryFocus = lowest;

  // Overall reflection
  let overallReflection = "";
  if (isBalanced) {
    overallReflection = "Your answers look relatively balanced across these areas, suggesting a steady baseline without extreme friction or sharp polarization. Taking time to notice the smaller subtleties can help sustain and deepen this foundation.";
  } else if (highest.band === "STEADIER" && lowest.band === "WORTH EXPLORING") {
    overallReflection = `Your answers highlight clear areas of grounding—particularly in ${highest.label}—alongside specific places where conversations or energy may be feeling strained.`;
  } else if (highest.band === "STEADIER") {
    overallReflection = `Your answers indicate noticeable strengths in ${highest.label}, providing a reliable anchor from which other aspects can gradually be explored.`;
  } else {
    overallReflection = "Your answers suggest several areas that may currently feel challenging, mixed, or deserving of thoughtful space to unpack without rush.";
  }

  // Path-specific observations
  const pathObservations: string[] = [];
  if (category === "intimacy") {
    const q11 = answers[11] ?? 3;
    const q12 = answers[12] ?? 3;
    if (q11 >= 4 && q12 >= 4) {
      pathObservations.push("Closeness and future expectations appear to be reasonably discussable.");
    } else {
      pathObservations.push("Closeness, intimacy, or expectations about the connection may deserve a more direct and pressure-free conversation.");
    }
  } else if (category === "relationship") {
    const q11 = answers[11] ?? 3;
    const q12 = answers[12] ?? 3;
    if (relationshipFocus === "business") {
      if (q11 < 4) pathObservations.push("Role boundaries and professional clarity may need explicit re-alignment.");
      if (q12 < 4) pathObservations.push("Operational friction may benefit from clearer, less defensive communication protocols.");
      if (q11 >= 4 && q12 >= 4) pathObservations.push("Professional expectations and objective alignment appear reasonably solid.");
    } else if (relationshipFocus === "family") {
      if (q11 < 4) pathObservations.push("You may be carrying more emotional responsibility for family members than feels sustainable.");
      if (q12 < 4) pathObservations.push("Old roles or family patterns may still be influencing your interactions.");
      if (q11 >= 4 && q12 >= 4) pathObservations.push("Family boundaries and mutual care show constructive grounding.");
    } else {
      if (q11 < 4) pathObservations.push("Long-term alignment and shared priorities may benefit from more transparent dialogue.");
      if (q12 < 4) pathObservations.push("Partnership trust and decision-making may need dedicated space to realign.");
      if (q11 >= 4 && q12 >= 4) pathObservations.push("Trust and long-term partnership goals appear to have meaningful shared foundation.");
    }
  } else if (category === "health") {
    const q1 = answers[1] ?? 3;
    const q2 = answers[2] ?? 3;
    if (q1 < 4 || q2 < 4) {
      pathObservations.push("Daily rest and energy pacing appear to be key areas for steady, realistic adjustments.");
    } else {
      pathObservations.push("Daily recovery habits and rhythm show a steady, supportive baseline.");
    }
  }

  // Safety flag check (only for intimacy and relationship)
  const isInterpersonal = category === "intimacy" || category === "relationship";
  const safetyFlag = isInterpersonal && (safetyAnswer === "Sometimes" || safetyAnswer === "Often");

  return {
    category,
    relationshipFocus,
    dimensions,
    isBalanced,
    primaryStrength,
    primaryFocus,
    overallReflection,
    pathObservations,
    safetyFlag,
    openReflectionText: openReflectionText?.trim() || undefined,
  };
}
