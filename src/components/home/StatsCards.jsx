import {
  HiOutlineCheckCircle,
  HiOutlineCloud
} from 'react-icons/hi'

function StatsCards({ stats }) {
    return (
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* CARD A2: Present Log Card */}
            <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-emerald-400/40 dark:hover:border-emerald-500/30 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/5 hover:bg-emerald-50/20 dark:hover:bg-emerald-500/5">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                            {stats.present}
                        </p>
                        <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                            Present
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
                <p className="text-[9px] font-semibold text-[#2563EB] dark:text-blue-400 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    -10% Less than yesterday
                </p>
            </div>

            {/* CARD A3: Absent Log Card */}
            <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-amber-400/40 dark:hover:border-amber-500/30 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-500/5 hover:bg-amber-50/20 dark:hover:bg-amber-500/5">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                            30
                        </p>
                        <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                            Absent
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                        <HiOutlineCloud className="w-5 h-5 text-rose-600 dark:text-rose-450" />
                    </div>
                </div>
                <p className="text-[9px] font-semibold text-rose-600 dark:text-rose-405 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    +3% Increase than yesterday
                </p>
            </div>

            {/* CARD A4: Custom Blank Placeholder Card */}
            <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 dark:hover:border-[#bf40bf]/30 flex flex-col justify-center items-center min-h-[110px] group hover:bg-purple-50/20 dark:hover:bg-purple-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 dark:border-slate-700/60 flex items-center justify-center text-slate-300 dark:text-slate-550 group-hover:border-[#bf40bf]/40 group-hover:text-[#bf40bf]/60 transition-all duration-300">
                    <span className="text-sm font-light">+</span>
                </div>
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-555 uppercase tracking-widest mt-2 group-hover:text-purple-400 transition-all duration-300">
                    Placeholder
                </p>
            </div>
        </div>
    )
}

export default StatsCards