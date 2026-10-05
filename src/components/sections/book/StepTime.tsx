import React, { useState } from "react";
import { BookingState } from "./BookPage";

const mockSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM"
];

// Simple calendar generation for mock
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function StepTime({ state, setState, next, back }: { state: BookingState, setState: (updates: Partial<BookingState>) => void, next: () => void, back: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    const d = new Date(year, month, day);
    // Don't allow past dates in a real app, mock allows it for simplicity unless we check:
    if (d < new Date(new Date().setHours(0,0,0,0))) return;
    setState({ date: d, timeSlot: null });
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-[28px] md:text-[32px] text-[#161514] mb-2">
        Choose a Time That Works for You.
      </h2>
      <p className="text-[15px] text-[#161514]/70 mb-8 max-w-[500px]">
        Select an available date and time for your private online session.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10 bg-white p-6 md:p-8 rounded-[16px] border-[1px] border-[#161514]/10">
        
        {/* Calendar (Left) */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <span className="font-sans text-[14px] font-medium text-[#161514]">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F5F1] text-[#161514]/60"
              >
                &larr;
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F5F1] text-[#161514]/60"
              >
                &rarr;
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <div key={d} className="font-sans text-[10px] uppercase tracking-wider text-[#161514]/40 py-2">
                {d}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(year, month, day);
              const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
              const isSelected = state.date?.getDate() === day && state.date?.getMonth() === month && state.date?.getFullYear() === year;
              
              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  disabled={isPast}
                  className={`w-full aspect-square flex items-center justify-center rounded-full text-[13px] transition-colors ${
                    isSelected 
                      ? "bg-[#161514] text-white" 
                      : isPast 
                        ? "text-[#161514]/20 cursor-not-allowed" 
                        : "text-[#161514] hover:bg-[#F8F5F1]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots (Right) */}
        <div className="w-full lg:w-[240px] flex flex-col border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-[#161514]/10 pt-6 lg:pt-0 lg:pl-10">
          <div className="mb-6 flex flex-col">
            <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#161514]/60 mb-2">
              Timezone
            </span>
            <select 
              value={state.timezone}
              onChange={(e) => setState({ timezone: e.target.value })}
              className="w-full bg-transparent border-b-[1px] border-[#161514]/20 text-[13px] py-1 text-[#161514] focus:outline-none"
            >
              <option value="America/New_York">America/New_York (EST/EDT)</option>
              <option value="America/Chicago">America/Chicago (CST/CDT)</option>
              <option value="America/Denver">America/Denver (MST/MDT)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
              <option value="Europe/London">Europe/London (GMT/BST)</option>
            </select>
          </div>

          {!state.date ? (
            <div className="text-[13px] text-[#161514]/40 italic mt-4">
              Select a date to view available times.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#161514]/60 mb-2">
                Available Times
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {mockSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setState({ timeSlot: slot })}
                    className={`h-[42px] flex items-center justify-center rounded-[6px] border-[1px] text-[13px] transition-colors ${
                      state.timeSlot === slot 
                        ? "border-[#E98267] bg-[#E98267]/10 text-[#E98267] font-medium" 
                        : "border-[#161514]/10 text-[#161514] hover:border-[#161514]/30"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={back}
          className="text-[13px] font-medium uppercase tracking-wide text-[#161514]/60 hover:text-[#161514]"
        >
          &larr; Back
        </button>
        <button
          onClick={next}
          disabled={!state.date || !state.timeSlot}
          className={`flex items-center justify-center h-[50px] px-8 rounded-[3px] text-[13px] font-medium tracking-wide uppercase transition-colors ${
            state.date && state.timeSlot 
              ? "bg-[#161514] text-white hover:bg-[#161514]/90" 
              : "bg-[#161514]/10 text-[#161514]/40 cursor-not-allowed"
          }`}
        >
          Continue to Details &rarr;
        </button>
      </div>
    </div>
  );
}
