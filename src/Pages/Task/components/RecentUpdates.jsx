import { FiActivity, FiUser } from 'react-icons/fi'

export default function RecentUpdates({ activities }) {
  return (
    <div className="lg:col-span-4 flex text-[#24292F] dark:text-[#C9D1D9]">
      <div className="w-full rounded-3xl border p-5 flex flex-col justify-between transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm relative overflow-hidden group">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none bg-[#2DA44E]/[0.02]" />

        <div className="space-y-5 flex-grow">
          {/* Header block */}
          <div className="flex justify-between items-center border-b border-[#EAEDEF] dark:border-[#30363D]/65 pb-4">
            <div className="space-y-0.5 text-left">
              <p className="text-[9px] font-black uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">Live Status</p>
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <FiActivity className="w-4 h-4 text-[#2DA44E] dark:text-[#3FB950]" />
                <span>Recent Updates</span>
              </h4>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#2DA44E] dark:bg-[#3FB950] animate-ping" />
          </div>

          {/* STACKS OF TIMELINE LOGS */}
          <div className="space-y-4 overflow-y-auto no-scrollbar max-h-[460px] pr-0.5">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 text-left group/item text-xs">
                {/* Circle bullet with connector line */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] flex items-center justify-center text-[10px] text-[#57606A] dark:text-[#8B949E] group-hover/item:border-[#2DA44E] dark:group-hover/item:border-[#3FB950] transition-colors">
                    <FiUser className="w-3.5 h-3.5 text-[#57606A] dark:text-[#8B949E]" />
                  </div>
                  <div className="w-0.5 flex-grow bg-[#EBEDF0] dark:bg-[#30363D] mt-1 min-h-[30px]" />
                </div>

                {/* Label details */}
                <div className="space-y-1 flex-grow pb-3">
                  <p className="text-[11px] font-extrabold text-[#24292F] dark:text-[#F0F6FC] leading-snug">
                    {act.action}
                  </p>
                  <p className="text-[10px] text-[#57606A] dark:text-[#8B949E] line-clamp-1">
                    Task: {act.taskTitle}
                  </p>
                  <div className="flex justify-between items-center text-[9px] font-bold text-[#6E7781] dark:text-[#8B949E]">
                    <span>By {act.user}</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer sync badge */}
        <div className="mt-4 pt-3.5 border-t border-[#EAEDEF] dark:border-[#30363D]/50 flex justify-between items-center text-[9px] font-black text-[#57606A] dark:text-[#8B949E] uppercase tracking-widest">
          <span>Personal Timeline</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DA44E] animate-pulse" />
            Interactive Session
          </span>
        </div>

      </div>
    </div>
  )
}
