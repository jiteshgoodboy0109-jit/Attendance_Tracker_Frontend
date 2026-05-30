import { HiOutlineCalendar } from 'react-icons/hi'
import { FiSliders } from 'react-icons/fi'

function AttendanceTable({
    searchQuery,
    setSearchQuery,
    filteredTeam
}) {
    return (
        <>
            <div className="p-6 rounded-2xl border transition-colors duration-300
                                  bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm">

                {/* Header and filters widget */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                            Attendance Overview
                        </h2>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap items-center gap-3.5 w-full xl:w-auto">

                        {/* Quick Search Input (Responsive full width on mobile) */}
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Quick Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-3.5 pr-8 py-2 text-xs rounded-xl border outline-none transition-all duration-300
                                       bg-slate-50 dark:bg-slate-900/60
                                       border-slate-200 dark:border-slate-800/60
                                       text-slate-850 dark:text-white
                                       placeholder:text-slate-400 dark:placeholder:text-slate-500
                                       focus:border-[#bf40bf] focus:ring-1 focus:ring-[#bf40bf]/30"
                            />
                        </div>

                        {/* Selected Date Indicator */}
                        <button className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto
                                           bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                            <HiOutlineCalendar className="w-4 h-4 text-slate-400" />
                            <span>25 May 2026</span>
                        </button>

                        {/* Advanced Filters Trigger */}
                        <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white border border-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto
                                           bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/10">
                            <FiSliders className="w-4 h-4" />
                            <span>Advanced Filters</span>
                        </button>
                    </div>
                </div>

                {/* Table responsive canvas */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800/50 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-4">ID</th>
                                <th className="py-4 px-4">Employee</th>
                                <th className="py-4 px-4">Role</th>
                                <th className="py-4 px-4">Department</th>
                                <th className="py-4 px-4">Date</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4">Check-in</th>
                                <th className="py-4 px-4">Check-out</th>
                                <th className="py-4 px-4">Work hours</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-850/20">
                            {filteredTeam.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="py-10 text-center text-slate-450 font-semibold uppercase tracking-wider">
                                        No attendance logs matched your search
                                    </td>
                                </tr>
                            ) : (
                                filteredTeam.map(row => (
                                    <tr key={row.id} className="transition-all hover:bg-slate-50/50 dark:hover:bg-slate-850/15">
                                        <td className="py-4 px-4 font-bold text-slate-400">{row.id}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full ${row.bg} text-white font-black flex items-center justify-center text-[10px] shadow-sm`}>
                                                    {row.avatar}
                                                </div>
                                                <span className="font-extrabold text-slate-850 dark:text-white">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-400">{row.role}</td>
                                        <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-400">{row.dept}</td>
                                        <td className="py-4 px-4 text-slate-400 font-semibold">{row.date}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${{
                                                Present: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border-emerald-500/20',
                                                Late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                                                Absent: 'bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/20',
                                                'On Leave': 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20'
                                            }[row.status] || ''}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold">{row.checkIn}</td>
                                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold">{row.checkOut}</td>
                                        <td className="py-4 px-4 font-black text-slate-850 dark:text-white">{row.hours}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}

export default AttendanceTable