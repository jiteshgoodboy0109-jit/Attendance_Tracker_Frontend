function AttendanceChart({
    splinePeriod,
    setSplinePeriod

}) {
    const splineData = {
        Daily: {
            path: "M 50 165 C 90 150, 110 138, 130 135 C 170 128, 190 140, 210 145 C 250 155, 270 56, 290 46 C 310 36, 350 130, 370 140 C 390 148, 430 152, 450 150 C 490 145, 510 135, 530 130 C 570 120, 590 122, 610 125 C 650 130, 670 145, 690 150 C 730 160, 750 120, 770 100",
            fill: "M 50 165 C 90 150, 110 138, 130 135 C 170 128, 190 140, 210 145 C 250 155, 270 56, 290 46 C 310 36, 350 130, 370 140 C 390 148, 430 152, 450 150 C 490 145, 510 135, 530 130 C 570 120, 590 122, 610 125 C 650 130, 670 145, 690 150 C 730 160, 750 120, 770 100 L 770 210 L 50 210 Z",
            nodes: [
                { x: 50, y: 165 },
                { x: 130, y: 135 },
                { x: 210, y: 145 },
                { x: 290, y: 46 },
                { x: 370, y: 140 },
                { x: 450, y: 150 },
                { x: 530, y: 130 },
                { x: 610, y: 125 },
                { x: 690, y: 150 },
                { x: 770, y: 100 }
            ],
            labels: ["01 AUG", "02 AUG", "03 AUG", "04 AUG", "07 AUG", "08 AUG", "09 AUG", "10 AUG", "11 AUG", "14 AUG"],
            peak: { x: 290, y: 46, value: "91%" }
        },
        Weekly: {
            path: "M 50 135 C 90 130, 110 150, 130 145 C 170 135, 190 110, 210 100 C 250 80, 270 140, 290 125 C 310 110, 350 65, 370 55 C 390 45, 430 70, 450 80 C 490 100, 510 145, 530 150 C 570 155, 590 135, 610 140 C 650 150, 670 170, 690 165 C 730 160, 750 130, 770 120",
            fill: "M 50 135 C 90 130, 110 150, 130 145 C 170 135, 190 110, 210 100 C 250 80, 270 140, 290 125 C 310 110, 350 65, 370 55 C 390 45, 430 70, 450 80 C 490 100, 510 145, 530 150 C 570 155, 590 135, 610 140 C 650 150, 670 170, 690 165 C 730 160, 750 130, 770 120 L 770 210 L 50 210 Z",
            nodes: [
                { x: 50, y: 135 },
                { x: 130, y: 145 },
                { x: 210, y: 100 },
                { x: 290, y: 125 },
                { x: 370, y: 55 },
                { x: 450, y: 80 },
                { x: 530, y: 150 },
                { x: 610, y: 140 },
                { x: 690, y: 165 },
                { x: 770, y: 120 }
            ],
            labels: ["WK 01", "WK 02", "WK 03", "WK 04", "WK 05", "WK 06", "WK 07", "WK 08", "WK 09", "WK 10"],
            peak: { x: 370, y: 55, value: "86%" }
        },
        Monthly: {
            path: "M 50 150 C 90 140, 110 115, 130 120 C 170 125, 190 125, 210 130 C 250 135, 270 170, 290 160 C 310 150, 350 150, 370 145 C 390 140, 430 120, 450 110 C 490 100, 510 95, 530 90 C 570 85, 590 48, 610 38 C 630 28, 670 65, 690 75 C 730 85, 750 110, 770 120",
            fill: "M 50 150 C 90 140, 110 115, 130 120 C 170 125, 190 125, 210 130 C 250 135, 270 170, 290 160 C 310 150, 350 150, 370 145 C 390 140, 430 120, 450 110 C 490 100, 510 95, 530 90 C 570 85, 590 48, 610 38 C 630 28, 670 65, 690 75 C 730 85, 750 110, 770 120 L 770 210 L 50 210 Z",
            nodes: [
                { x: 50, y: 150 },
                { x: 130, y: 120 },
                { x: 210, y: 130 },
                { x: 290, y: 160 },
                { x: 370, y: 145 },
                { x: 450, y: 110 },
                { x: 530, y: 90 },
                { x: 610, y: 38 },
                { x: 690, y: 75 },
                { x: 770, y: 120 }
            ],
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
            peak: { x: 610, y: 38, value: "95%" }
        }
    }

    const currentData = splineData[splinePeriod]

    return (
        <>

            <div className="lg:col-span-2 p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 relative overflow-hidden group">

                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 z-10 relative">
                    <div>
                        <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                            Attendance Comparison Chart
                        </h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">
                            {splinePeriod} Activity Analytics
                        </p>
                    </div>

                    {/* SaaS Period Segmented Tab Selector Badges */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                        {['Daily', 'Weekly', 'Monthly'].map(period => {
                            const isActive = splinePeriod === period;
                            return (
                                <button
                                    key={period}
                                    onClick={() => setSplinePeriod(period)}
                                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-200
                            ${isActive
                                            ? 'bg-blue-600 text-white shadow-sm font-bold'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200'
                                        }`}
                                >
                                    {period}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Spline Area SVG Graph (Dynamic flex-1 container for flawless responsiveness) */}
                <div className="h-60 relative z-10 mt-4 flex flex-col justify-between">
                    <div className="relative flex-1">
                        <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Dashed Horizontal Helper Lines */}
                            {[30, 75, 120, 165, 210].map((yVal, idx) => (
                                <line
                                    key={idx}
                                    x1="50"
                                    y1={yVal}
                                    x2="770"
                                    y2={yVal}
                                    stroke="#D0D7DE"
                                    strokeWidth="0.5"
                                    strokeDasharray="3 3"
                                    className="dark:stroke-slate-800/30"
                                />
                            ))}

                            {/* Percentage Labels on left of Y-axis (Native viewbox scaling) */}
                            <g fontSize="8" fontWeight="900" className="fill-slate-400 dark:fill-slate-500">
                                <text x="32" y="33" textAnchor="end">100%</text>
                                <text x="32" y="78" textAnchor="end">75%</text>
                                <text x="32" y="123" textAnchor="end">50%</text>
                                <text x="32" y="168" textAnchor="end">25%</text>
                                <text x="32" y="213" textAnchor="end">0%</text>
                            </g>

                            {/* Spline Area Fill (Mathematically intersects all active period nodes) */}
                            <path
                                d={currentData.fill}
                                fill="url(#splineGradient)"
                                className="transition-all duration-300"
                            />

                            {/* Spline Curve Path (Mathematically intersects all active period nodes) */}
                            <path
                                d={currentData.path}
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="3.5"
                                className="drop-shadow-[0_4px_12px_rgba(59,130,246,0.5)] transition-all duration-300"
                            />

                            {/* Node Highlight Line Marker (Peak for active period) */}
                            <line x1={currentData.peak.x} y1="30" x2={currentData.peak.x} y2="210" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-80 transition-all duration-300" />
                            <rect x={currentData.peak.x - 18} y="5" width="36" height="18" rx="9" fill="#3B82F6" className="shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-300" />
                            <text x={currentData.peak.x} y="17" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" className="transition-all duration-300">{currentData.peak.value}</text>

                            {/* Nodes Coordinates (Sitting perfectly on the spline path) */}
                            {currentData.nodes.map((pt, i) => (
                                <circle
                                    key={i}
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="4.5"
                                    fill="#3B82F6"
                                    stroke="white"
                                    strokeWidth="2"
                                    className="dark:stroke-[#0C0F16] cursor-pointer hover:scale-125 transition-all duration-300"
                                />
                            ))}

                            {/* Embedded X-Axis labels inside the SVG for perfect mathematical alignment */}
                            <g fontSize="8" fontWeight="900" className="fill-slate-400 dark:fill-slate-500">
                                {currentData.nodes.map((pt, i) => (
                                    <text key={i} x={pt.x} y="232" textAnchor="middle" className="transition-all duration-300">
                                        {currentData.labels[i]}
                                    </text>
                                ))}
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendanceChart


