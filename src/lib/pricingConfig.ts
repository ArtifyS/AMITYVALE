export const sessionOptions = {
  15: {
    id: "session_15",
    duration: 15,
    label: "Quick Check-In",
    price: 100,
    description: "For one focused question, situation, or conversation that needs clarity.",
    fit: "Focused • Brief • Direct",
    emphasize: false
  },
  30: {
    id: "session_30",
    duration: 30,
    label: "Focused Session",
    price: 190,
    description: "More room to explore one specific concern, pattern, or difficult conversation.",
    fit: "Focused • Exploratory • Practical",
    emphasize: false
  },
  45: {
    id: "session_45",
    duration: 45,
    label: "Extended Session",
    price: 270,
    description: "For conversations that need more time to understand the pattern and what may need to change.",
    fit: "Deeper • Reflective • Unhurried",
    emphasize: false
  },
  60: {
    id: "session_60",
    duration: 60,
    label: "Full Session",
    price: 300,
    description: "The most spacious option for exploring communication, connection, intimacy, or a more complex situation.",
    fit: "Full • Spacious • In-Depth",
    emphasize: true
  }
} as const;

export type SessionDuration = keyof typeof sessionOptions;

export function getSessionOption(duration: number) {
  if (duration === 15 || duration === 30 || duration === 45 || duration === 60) {
    return sessionOptions[duration];
  }
  return null;
}
