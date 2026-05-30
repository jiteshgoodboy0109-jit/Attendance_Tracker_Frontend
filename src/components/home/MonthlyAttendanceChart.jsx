function MonthlyAttendanceChart({
    hoveredWeek,
    setHoveredWeek
}) {
    return (
        <>
            <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 relative overflow-hidden group">

                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 z-10 relative">
                    <div>
                        <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                            Monthly Attendance
                        </h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">
                            Last 5 Weeks Trend
                        </p>
                    </div>

                    {/* Legend Indicators */}
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Present
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Absent
                        </span>
                    </div>
                </div>

                {/* Stacked Vertical Bar Graph Wrapper */}
                <div className="h-60 relative z-10 mt-4 flex flex-col justify-between">

                    {/* Dynamic Floating HUD tooltip glassmorphic card */}
                    {hoveredWeek !== null && (
                        <div
                            className="absolute z-30 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-2.5 shadow-xl transition-all duration-200 pointer-events-none animate-fade-in"
                            style={{
                                left: `${Math.min(Math.max(50 + hoveredWeek * 70 - 65, 10), 220)}px`,
                            }}
                        >
                            <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Week {hoveredWeek + 1} Trend
                            </p>
                            <div className="flex flex-col gap-1.5 mt-1.5">
                                {hoveredWeek % 2 === 0 ? (
                                    <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                                        Present: <span className="font-extrabold text-slate-800 dark:text-slate-200">{[90, 85, 94, 88, 92][hoveredWeek]}%</span>
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm" />
                                        Absent: <span className="font-extrabold text-slate-800 dark:text-slate-200">{[10, 15, 6, 12, 8][hoveredWeek]}%</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* SVG Canvas Columns */}
                    <div className="relative flex-1">
                        <svg viewBox="0 0 380 240" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="presentBarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1D4ED8" />
                                </linearGradient>
                                <linearGradient id="absentBarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FBBF24" />
                                    <stop offset="100%" stopColor="#F59E0B" />
                                </linearGradient>
                            </defs>

                            {/* Horizontal Helpers */}
                            {[30, 75, 120, 165, 210].map((yVal, idx) => (
                                <line
                                    key={idx}
                                    x1="30"
                                    y1={yVal}
                                    x2="350"
                                    y2={yVal}
                                    stroke="#D0D7DE"
                                    strokeWidth="0.5"
                                    strokeDasharray="3 3"
                                    className="dark:stroke-slate-800/30"
                                />
                            ))}

                            {/* Y-Axis scale tags (Native SVG font scaling) */}
                            <g fontSize="8" fontWeight="900" className="fill-slate-400 dark:fill-slate-500">
                                <text x="22" y="33" textAnchor="end">100%</text>
                                <text x="22" y="78" textAnchor="end">75%</text>
                                <text x="22" y="123" textAnchor="end">50%</text>
                                <text x="22" y="168" textAnchor="end">25%</text>
                                <text x="22" y="213" textAnchor="end">0%</text>
                            </g>

                            {/* Bar tracks & capsule highlights */}
                            {[
                                { type: 'Present', height: 162, y: 48, color: 'url(#presentBarGradient)', hoverGlow: 'rgba(59,130,246,0.5)' },
                                { type: 'Absent', height: 27, y: 183, color: 'url(#absentBarGradient)', hoverGlow: 'rgba(245,158,11,0.5)' },
                                { type: 'Present', height: 169, y: 41, color: 'url(#presentBarGradient)', hoverGlow: 'rgba(59,130,246,0.5)' },
                                { type: 'Absent', height: 22, y: 188, color: 'url(#absentBarGradient)', hoverGlow: 'rgba(245,158,11,0.5)' },
                                { type: 'Present', height: 166, y: 44, color: 'url(#presentBarGradient)', hoverGlow: 'rgba(59,130,246,0.5)' }
                            ].map((item, idx) => {
                                const isHovered = hoveredWeek === idx;
                                const xVal = 50 + idx * 70;
                                return (
                                    <g key={`col-${idx}`}>

                                        {/* Ambient background glow card highlight on hover */}
                                        {isHovered && (
                                            <rect
                                                x={xVal - 22}
                                                y={20}
                                                width={44}
                                                height={200}
                                                rx={10}
                                                fill="currentColor"
                                                className="text-blue-500/5 dark:text-blue-500/5 transition-all duration-300 pointer-events-none"
                                            />
                                        )}

                                        {/* Transparent 100% height track capsule backing */}
                                        <rect
                                            x={xVal - 10}
                                            y={30}
                                            width={20}
                                            height={180}
                                            rx={4}
                                            fill="currentColor"
                                            className="text-slate-150 dark:text-slate-900/60 stroke-slate-200/40 dark:stroke-slate-800/40 transition-colors duration-300"
                                            strokeWidth="1"
                                        />

                                        {/* Single Metric Segment (Bottom-up, either Present or Absent separately) */}
                                        <rect
                                            x={xVal - 10}
                                            y={item.y}
                                            width={20}
                                            height={item.height}
                                            rx={3}
                                            fill={item.color}
                                            className={`transition-all duration-300 ${isHovered ? 'brightness-110' : ''}`}
                                            style={{
                                                filter: isHovered ? `drop-shadow(0 0 8px ${item.hoverGlow})` : 'none'
                                            }}
                                        />
                                    </g>
                                );
                            })}

                            {/* Invisible vertical hover zones to lock hover tracking */}
                            {[50, 120, 190, 260, 330].map((xVal, idx) => (
                                <rect
                                    key={`zone-${idx}`}
                                    x={xVal - 30}
                                    y="20"
                                    width="60"
                                    height="200"
                                    fill="transparent"
                                    className="cursor-pointer"
                                    onMouseEnter={() => setHoveredWeek(idx)}
                                    onMouseLeave={() => setHoveredWeek(null)}
                                />
                            ))}

                            {/* Embedded X-Axis labels (Native SVG font scaling) */}
                            <g fontSize="8" fontWeight="900" className="fill-slate-400 dark:fill-slate-500">
                                <text x="50" y="232" textAnchor="middle">WEEK 1</text>
                                <text x="120" y="232" textAnchor="middle">WEEK 2</text>
                                <text x="190" y="232" textAnchor="middle">WEEK 3</text>
                                <text x="260" y="232" textAnchor="middle">WEEK 4</text>
                                <text x="330" y="232" textAnchor="middle">WEEK 5</text>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MonthlyAttendanceChart