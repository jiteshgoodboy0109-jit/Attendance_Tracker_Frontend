import { HiOutlineClock } from 'react-icons/hi'

function DigitalClockCard({
  time,
  isCheckedIn,
  checkInTime,
  handleCheckIn
}) {
  return (
    <div
      onClick={handleCheckIn}
      className={`relative overflow-hidden p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-auto gap-6 cursor-pointer select-none active:scale-[0.98] group
      shadow-lg shadow-slate-100/10 dark:shadow-black/20 
      ${
        isCheckedIn
          ? 'bg-gradient-to-br from-emerald-500/[0.04] to-emerald-500/[0.01] dark:from-[#0C0F16] dark:to-[#0C0F16] border-emerald-500/40 dark:border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/5'
          : 'bg-gradient-to-br from-white to-purple-500/[0.01] hover:to-purple-500/[0.03] dark:from-[#0C0F16] dark:to-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 hover:border-[#bf40bf]/40 dark:hover:border-[#bf40bf]/30 hover:shadow-purple-500/5'
      }`}
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border
            ${
              isCheckedIn
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                : 'bg-purple-500/10 border-purple-500/20 text-[#bf40bf]'
            }`}
          >
            <HiOutlineClock className="w-7 h-7" />
          </div>

          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-850 dark:text-white leading-none">
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </p>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              Realtime Insight
            </p>
          </div>
        </div>

        {isCheckedIn && (
          <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-wider">
            Checked In
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Today
          </p>

          <p className="text-lg font-black text-slate-850 dark:text-white">
            {time.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

        {isCheckedIn && (
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Check-in Time
            </p>

            <p className="text-sm font-bold text-emerald-500">
              {checkInTime}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DigitalClockCard