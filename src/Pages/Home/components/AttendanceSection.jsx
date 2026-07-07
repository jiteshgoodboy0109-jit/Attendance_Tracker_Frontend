import { getElapsedHoursMinsStr, formatTimer, getTimeStr } from "../../../utils/home";
import { useState } from "react";
import {
  FiLogIn,
  FiLogOut,
  FiCheck,
  FiMapPin,
  FiAlertTriangle,
} from "react-icons/fi";
import { PiHandWaving } from "react-icons/pi";

export function AttendanceSection({
  checkInStatus,
  timerSeconds,
  setShowCheckoutModal,
  checkOutTime,
  setCheckInStatus,
  setTimerSeconds,
}) {
  const [checkInTime, setCheckInTime] = useState("");

  const handleCheckInAction = () => {
    const timeStr = getTimeStr();

    setCheckInStatus("working");
    setCheckInTime(timeStr);
    setTimerSeconds(0);
  };

  // Refactor code
  const badge = {
    not_checked_in: {
      text: "Not checked in",
      cls: "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-850/60 text-slate-500 dark:text-slate-400",
      dot: "bg-slate-450 dark:bg-slate-500 animate-pulse",
    },
    working: {
      text: "Working",
      cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-450",
      dot: "bg-emerald-500 animate-ping",
    },
    done: {
      text: "Done",
      cls: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      dot: "bg-blue-550 dark:bg-blue-400",
    },
  };
  const attendanceBadge = badge[checkInStatus] ?? badge.not_checked_in;

  return (
    <>
      <div
        className="w-full rounded-2xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300 relative overflow-hidden group
                      bg-white dark:bg-[#0D1117]  dark:border-[#30363D]"
      >
        {/* TOP HEADER SECTION */}
        <div className="flex justify-between items-start z-10">
          <div className="space-y-0.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Tuesday
            </p>
            <h3 className="text-lg font-black text-slate-850 dark:text-white leading-tight">
              26 May 2026
            </h3>
          </div>

          {/* Pill status badge */}
          <div>
            <span
              className={`px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${attendanceBadge.cls}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${attendanceBadge.dot}`}
              />
              {attendanceBadge.text}
            </span>
          </div>
        </div>

        {/* MIDDLE CLOCK / HOURS SECTION */}
        <div className="flex flex-col items-center justify-center py-6 text-center z-10 gap-2 flex-grow">
          {checkInStatus !== "done" ? (
            <>
              <h1
                className={`text-5xl font-black font-mono tracking-wider leading-none transition-colors duration-500
                                ${
                                  checkInStatus === "working"
                                    ? "text-emerald-550 dark:text-emerald-400"
                                    : "text-slate-400 dark:text-slate-650"
                                }`}
              >
                {formatTimer(timerSeconds)}
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {checkInStatus === "working"
                  ? "Time elapsed since check-in"
                  : "Your timer starts when you check in"}
              </p>
            </>
          ) : (
            <>
              {/* Done State Work Hours View */}
              <h1 className="text-5xl font-black text-slate-850 dark:text-white leading-none font-sans">
                {getElapsedHoursMinsStr(timerSeconds)}
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Total hours worked today
              </p>
            </>
          )}

          {/* ACTION TRIGGERS (BIG CIRCLE INTERACTIVE WORKFLOW) */}
          <div className="mt-8 flex justify-center items-center">
            {checkInStatus === "not_checked_in" && (
              <div className="relative flex items-center justify-center w-56 h-56">
                {/* Concentric ripples */}
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-[#bf40bf]/30 dark:border-purple-500/25 concentric-pulse pointer-events-none" />
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-[#bf40bf]/20 dark:border-purple-500/15 concentric-pulse pulse-delay-1 pointer-events-none" />
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-[#bf40bf]/10 dark:border-purple-500/5 concentric-pulse pulse-delay-2 pointer-events-none" />

                <button
                  onClick={handleCheckInAction}
                  className="w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 p-1.5 hover:scale-105 active:scale-95 transition-all duration-300 group/btn bg-slate-50/50 dark:bg-slate-900/10 z-10 cursor-pointer"
                >
                  <div className="w-full h-full rounded-full bg-[#1F6FEB] flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all">
                    <FiLogIn className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" />
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      Check In
                    </span>
                  </div>
                </button>
              </div>
            )}

            {checkInStatus === "working" && (
              <div className="relative flex items-center justify-center w-36 h-36">
                {/* Concentric ripples */}
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-red/30 dark:border-red-500/25 concentric-pulse pointer-events-none" />
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-red/20 dark:border-red-500/15 concentric-pulse pulse-delay-1 pointer-events-none" />
                <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-red/10 dark:border-red-500/5 concentric-pulse pulse-delay-2 pointer-events-none" />
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-red-950/60 p-1.5 hover:scale-105 active:scale-95 transition-all duration-300 group/btn bg-slate-50/50 dark:bg-slate-900/10"
                >
                  <div className="w-full h-full rounded-full bg-rose-600 dark:bg-rose-650 flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all">
                    <FiLogOut className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      Check Out
                    </span>
                  </div>
                </button>
              </div>
            )}

            {checkInStatus === "done" && (
              <div className="flex flex-col items-center gap-4 animate-scale-up">
                {/* Glowing success checkbox */}
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-md">
                  <FiCheck className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-850 dark:text-white leading-tight">
                    Great work!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1.5">
                    <span>See you later</span>
                    <PiHandWaving className="w-4.5 h-4.5 text-indigo-400 dark:text-indigo-400" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LOWER LOGS BOX & FOOTER SECTION */}
        <div className="space-y-4 z-10">
          {/* Checked In card detail card */}
          {checkInStatus !== "not_checked_in" && (
            <div className="p-4 rounded-2xl border transition-all duration-300 animate-fade-in bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-850/60">
              <div
                className={`grid gap-4 ${
                  checkInStatus === "done"
                    ? "grid-cols-2 divide-x divide-slate-200 dark:divide-slate-850/50"
                    : "flex items-center justify-between"
                }`}
              >
                <div className="space-y-0.5 text-left">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Checked in
                  </p>
                  <p className="text-sm font-black text-slate-850 dark:text-white flex items-center gap-1.5">
                    {checkInTime}
                  </p>
                </div>
                {checkInStatus === "working" ? (
                  "" // <span className="px-2.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-405 text-[8px] font-black uppercase tracking-wider">Lajte</span>
                ) : (
                  <div className="space-y-0.5 text-left pl-4">
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Checked out
                    </p>
                    <p className="text-sm font-black text-slate-850 dark:text-white">
                      {checkOutTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-center">
            {checkInStatus === "not_checked_in" ? (
              <>
                <FiMapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Location will be captured on check-in
                </span>
              </>
            ) : (
              <>
                <FiAlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-bold text-rose-500">
                  Location unavailable
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
