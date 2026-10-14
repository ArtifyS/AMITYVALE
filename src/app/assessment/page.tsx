import { Metadata } from "next";
import { AssessmentExperience } from "@/components/sections/assessment/AssessmentExperience";

export const metadata: Metadata = {
  title: "Connection Check-In | Free Reflective Coaching Tool | Amity Vale",
  description: "A private, 2–3 minute reflective check-in to help you notice patterns in romantic relationships, family, friendships, faith, or personal growth.",
};

export default function AssessmentPage() {
  return (
    <main className="flex-1 w-full bg-white selection:bg-[#FF5A4F]/20 selection:text-[#161514]">
      <AssessmentExperience />
    </main>
  );
}
