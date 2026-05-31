import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  FiFileText, FiDownload, FiActivity, FiBriefcase,
  FiTrendingUp, FiCalendar, FiClock, FiStar, FiChevronRight,
  FiAlertCircle, FiCheckCircle, FiInfo, FiLoader, FiExternalLink,
  FiSearch
} from 'react-icons/fi'

// ============================================================================
// 1. ENTERPRISE DATA DICTIONARIES & CONSTANTS
// ============================================================================

// Static configuration schema to preserve memory allocation during render cycles
const MOCK_ATTENDANCE_LOGS = [
  { date: '26 May 2026', status: 'Present', checkIn: '08:58 AM', checkOut: '05:30 PM', hours: '8.5 hrs', category: 'Punctual' },
  { date: '25 May 2026', status: 'Present', checkIn: '09:02 AM', checkOut: '06:05 PM', hours: '9.0 hrs', category: 'Punctual' },
  { date: '24 May 2026', status: 'Present', checkIn: '08:55 AM', checkOut: '05:45 PM', hours: '8.8 hrs', category: 'Punctual' },
  { date: '22 May 2026', status: 'Present', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9.1 hrs', category: 'Punctual' },
  { date: '21 May 2026', status: 'Present', checkIn: '08:59 AM', checkOut: '05:30 PM', hours: '8.5 hrs', category: 'Punctual' },
  { date: '20 May 2026', status: 'Present', checkIn: '08:50 AM', checkOut: '05:40 PM', hours: '8.8 hrs', category: 'Punctual' },
  { date: '19 May 2026', status: 'Late', checkIn: '09:45 AM', checkOut: '06:30 PM', hours: '8.7 hrs', category: 'Late' },
  { date: '18 May 2026', status: 'Present', checkIn: '08:55 AM', checkOut: '05:45 PM', hours: '8.8 hrs', category: 'Punctual' },
  { date: '15 May 2026', status: 'Leave', checkIn: '—', checkOut: '—', hours: '0.0 hrs', category: 'Approved Leave' },
  { date: '14 May 2026', status: 'Present', checkIn: '09:01 AM', checkOut: '05:35 PM', hours: '8.5 hrs', category: 'Punctual' },
]

const MOCK_LEAVE_STATS = {
  sick: { total: 8, used: 3, label: 'Sick Leaves' },
  casual: { total: 10, used: 4, label: 'Casual Leaves' },
  earned: { total: 6, used: 2, label: 'Earned Leaves' }
}

const MOCK_LEAVE_REQUESTS = [
  { id: 'LR042', type: 'Sick Leave', range: '15 May - 16 May 2026', duration: '2 days', status: 'Approved', reason: 'Fever recovery guidance', requestedOn: '13 May 2026' },
  { id: 'LR039', type: 'Casual Leave', range: '22 Apr 2026', duration: '1 day', status: 'Approved', reason: 'Personal errands', requestedOn: '18 Apr 2026' },
  { id: 'LR035', type: 'Earned Leave', range: '10 Mar - 12 Mar 2026', duration: '3 days', status: 'Approved', reason: 'Family travel arrangement', requestedOn: '01 Mar 2026' },
  { id: 'LR049', type: 'Casual Leave', range: '05 Jun 2026', duration: '1 day', status: 'Pending', reason: 'Doctor check-up check', requestedOn: '29 May 2026' }
]

const MOCK_HABITS = [
  { text: 'Optimal shift start-time alignment observed on Wednesdays, maintaining a 30-day average check-in of 08:52 AM.', style: 'border-[#2DA44E]/20 dark:border-[#238636]/20 bg-[#2DA44E]/5 dark:bg-[#238636]/5 text-[#2DA44E] dark:text-[#3FB950]', badge: 'Midweek Punctuality Peak' },
  { text: 'Friday check-out variance recorded. Cumulative daily active duty averages 8.4 hours compared to the 8.8-hour midweek baseline.', style: 'border-[#8250DF]/20 dark:border-[#8957E5]/20 bg-[#8250DF]/5 dark:bg-[#8957E5]/5 text-[#8250DF] dark:text-[#A371F7]', badge: 'Weekend Transition Deviation' },
  { text: 'Accumulated +4.5 hours of approved overtime MTD, indicating high task-completion rate while retaining standard weekly workload limits.', style: 'border-[#0969DA]/20 dark:border-[#1F6FEB]/20 bg-[#0969DA]/5 dark:bg-[#1F6FEB]/5 text-[#0969DA] dark:text-[#58A6FF]', badge: 'Productive Overtime Accumulated' }
]

// Steps for the export loading animation sequence
const EXPORT_STEPS = {
  IDLE: 0,
  FORMATTING: 1,
  COMPILING: 2,
  SEALING: 3,
  DONE: 4
}

// ============================================================================
// 2. REUSABLE ATOM & MOLECULE COMPONENTS (SOLID Principles)
// ============================================================================

/**
 * ReportStatCard Component
 * Displays a single high-level attendance metric with styling and iconography.
 */
function ReportStatCard({ name, value, desc, icon: Icon, colorClass }) {
  return (
    <div className="p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md
                    bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">{name}</p>
          <h3 className="text-xl font-black text-slate-850 dark:text-white leading-none font-sans">{value}</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{desc}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
/**
 * ConsistencyRadar Component
 * Renders the circular SVG punctuality radar indicator with premium AI aesthetic.
 */
function ConsistencyRadar({ rate = 95.8, targetShift = "9:00 AM", averageCheckIn = "8:58 AM" }) {
  // SVG Circle Geometry variables
  const radius = 68
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - rate / 100)

  return (
    <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[470px] transition-all duration-300 relative overflow-hidden group
                  bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl hover:border-[#8250DF]/30 dark:hover:border-[#A371F7]/30
                  bg-[radial-gradient(#00000003_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* High-Tech Tactical Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-br-sm pointer-events-none" />

      {/* Dynamic Rotation Style definition for the sweep line */}
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .radar-sweep-line {
          transform-origin: 80px 80px;
          animation: radar-sweep 5s linear infinite;
        }
      `}</style>

      {/* Subtle Premium Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-[#8250DF]/10 to-indigo-500/0 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tl from-[#2DA44E]/[0.03] to-[#8250DF]/0 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      <div className="flex justify-between items-start z-10">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Punctuality Score</p>
          <h3 className="text-base font-black text-slate-850 dark:text-white leading-tight">Consistency Radar</h3>
        </div>
        {/* Sleek AI Active Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-[#8250DF]/10 border border-[#8250DF]/20 text-[#8250DF] dark:bg-[#A371F7]/10 dark:border-[#A371F7]/20 dark:text-[#A371F7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8250DF] dark:bg-[#A371F7] animate-pulse shadow-[0_0_6px_rgba(130,80,223,0.8)]" />
          <span>AI Engine v2.0</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-4 z-10">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Gradient definition for glowing stroke */}
            <defs>
              <linearGradient id="radarGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8250DF" />
                <stop offset="100%" stopColor="#A371F7" />
              </linearGradient>
              <linearGradient id="sweepGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8250DF" stopOpacity="0" />
                <stop offset="100%" stopColor="#8250DF" stopOpacity="0.3" />
              </linearGradient>
              {/* Drop shadow filter to make the SVG stroke glow */}
              <filter id="radarOuterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Concentric radar rings */}
            <circle cx="80" cy="80" r="32" className="stroke-slate-100 dark:stroke-slate-800/25 fill-none" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="80" cy="80" r="50" className="stroke-slate-100 dark:stroke-slate-800/25 fill-none" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="80" cy="80" r="68" className="stroke-slate-150/40 dark:stroke-slate-800/30 fill-none" strokeWidth="1" />

            {/* Axis grid crosshairs */}
            <line x1="80" y1="12" x2="80" y2="148" className="stroke-slate-100 dark:stroke-slate-800/20" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="12" y1="80" x2="148" y2="80" className="stroke-slate-100 dark:stroke-slate-800/20" strokeWidth="1" strokeDasharray="3 3" />

            {/* Rotating radar sweep line */}
            <g className="radar-sweep-line">
              <line x1="80" y1="80" x2="80" y2="12" stroke="url(#sweepGradient)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="80" cy="12" r="3" className="fill-[#8250DF] dark:fill-[#A371F7]" filter="url(#radarOuterGlow)" />
            </g>

            {/* Inactive Track */}
            <circle cx="80" cy="80" r={radius} className="stroke-slate-100 dark:stroke-slate-800/10 fill-none" strokeWidth={strokeWidth} />
            
            {/* Glowing Active Track */}
            <circle 
              cx="80" 
              cy="80" 
              r={radius} 
              className="fill-none transition-all duration-1000 ease-out" 
              stroke="url(#radarGlowGradient)"
              strokeWidth={strokeWidth} 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
              filter="url(#radarOuterGlow)"
            />
          </svg>

          {/* Central text readouts */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-slate-850 dark:text-white leading-none font-mono drop-shadow-[0_2px_8px_rgba(130,80,223,0.25)]">
              {rate}%
            </span>
            <span className="px-2 py-0.5 mt-2 rounded-md text-[8px] font-black uppercase tracking-wider
                             bg-[#2DA44E]/10 border border-[#2DA44E]/20 text-[#2DA44E] dark:text-[#3FB950]
                             shadow-[0_0_8px_rgba(45,164,78,0.2)]">
              Tier-1 Status
            </span>
          </div>
        </div>
      </div>

      {/* AI Diagnostics Widget Grid */}
      <div className="grid grid-cols-3 gap-2 text-center py-2.5 px-3.5 my-3 rounded-2xl bg-slate-50 dark:bg-[#0d1117]/60 border border-slate-150 dark:border-slate-800/40 z-10">
        <div>
          <div className="text-[8px] text-slate-450 dark:text-slate-500 font-black uppercase tracking-wider">Stability</div>
          <div className="text-[11px] font-black text-[#2DA44E] dark:text-[#3FB950] font-mono mt-0.5">98.4%</div>
        </div>
        <div className="border-x border-slate-200 dark:border-slate-800/40">
          <div className="text-[8px] text-slate-455 dark:text-slate-500 font-black uppercase tracking-wider">Variance</div>
          <div className="text-[11px] font-black text-[#24292F] dark:text-[#F0F6FC] font-mono mt-0.5">-2.4m</div>
        </div>
        <div>
          <div className="text-[8px] text-slate-455 dark:text-slate-500 font-black uppercase tracking-wider">Coherence</div>
          <div className="text-[11px] font-black text-[#8250DF] dark:text-[#A371F7] font-mono mt-0.5">High</div>
        </div>
      </div>

      <div className="pt-3.5 border-t border-dashed border-slate-200 dark:border-slate-800/80 text-[9px] font-bold text-slate-500 dark:text-slate-400 flex justify-between z-10">
        <span>Standard Shift: <span className="font-mono text-[#24292F] dark:text-[#F0F6FC] font-black">{targetShift}</span></span>
        <span className="text-[#2DA44E] dark:text-[#3FB950] font-black flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DA44E] dark:bg-[#3FB950] animate-pulse shadow-[0_0_8px_rgba(45,164,78,0.8)]" />
          Avg: {averageCheckIn}
        </span>
      </div>
    </div>
  )
}

/**
 * HabitsBriefing Component
 * Renders structured HR narrative feedback summary cards with premium AI styling.
 */
function HabitsBriefing() {
  return (
    <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[470px] transition-all duration-300 relative overflow-hidden group
                  bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md
                  bg-[radial-gradient(#00000003_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* High-Tech Tactical Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-br-sm pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Narrative Summary</p>
          <h3 className="text-base font-black text-slate-850 dark:text-white">My Attendance Habits</h3>
        </div>
        {/* Micro AI Sparkle Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          <span>Active Analytics</span>
        </div>
      </div>

      <div className="flex-grow space-y-3.5 my-4 overflow-y-auto overflow-x-hidden no-scrollbar z-10">
        {MOCK_HABITS.map((habit, idx) => (
          <div 
            key={idx} 
            className={`p-3.5 rounded-2xl border text-xs font-semibold leading-relaxed flex flex-col gap-2 transition-all duration-300 hover:scale-[1.01] ${habit.style}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/40 dark:bg-black/35">
                {habit.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
            <p className="font-medium text-slate-700 dark:text-slate-350">{habit.text}</p>
          </div>
        ))}
      </div>

      <div className="text-[9px] font-bold text-slate-455 text-center border-t border-dashed border-slate-200 dark:border-slate-800/80 pt-3 z-10">
        *Calculated relative to your specific engineering department parameters.
      </div>
    </div>
  )
}

/**
 * AttendanceHistoryTable Component
 * Generates the clean paginated check-in records table.
 * Fully responsive: renders a table on desktop and a high-tech card list on mobile.
 */
function AttendanceHistoryTable({ logs }) {
  return (
    <div className="w-full rounded-3xl border overflow-hidden bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md">
      
      {/* 1. DESKTOP VIEWPORT: Clean tabular grid */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/40 text-[9px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Check In</th>
              <th className="py-4 px-6">Check Out</th>
              <th className="py-4 px-6">Duration</th>
              <th className="py-4 px-6 text-right">Label</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 dark:divide-slate-850/40 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-450 dark:text-slate-500">
                  <FiInfo className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No matching check-in records found</p>
                </td>
              </tr>
            ) : (
              logs.map((log, idx) => {
                const isLate = log.status === 'Late'
                const isLeave = log.status === 'Leave'
                return (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-200">
                    <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">{log.date}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border
                        ${isLeave 
                          ? 'bg-[#8250DF]/10 dark:bg-[#8957E5]/15 border-[#8250DF]/20 dark:border-[#8957E5]/20 text-[#8250DF] dark:text-[#A371F7]'
                          : isLate 
                            ? 'bg-[#D4A72C]/10 dark:bg-[#D29922]/10 border-[#D4A72C]/20 dark:border-[#D29922]/20 text-[#D4A72C] dark:text-[#E3B341]' 
                            : 'bg-[#2DA44E]/10 dark:bg-[#238636]/10 border-[#2DA44E]/20 dark:border-[#238636]/20 text-[#2DA44E] dark:text-[#3FB950]'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px]">{log.checkIn}</td>
                    <td className="py-4 px-6 font-mono text-[11px]">{log.checkOut}</td>
                    <td className="py-4 px-6 font-mono text-[11px]">{log.hours}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`text-[10px] font-bold ${isLate ? 'text-[#D4A72C] dark:text-[#E3B341]' : isLeave ? 'text-[#8250DF] dark:text-[#A371F7]' : 'text-slate-400 dark:text-slate-500'}`}>
                        {log.category}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE VIEWPORT: High-tech vertical card stack */}
      <div className="md:hidden divide-y divide-slate-150 dark:divide-slate-850/40 bg-white dark:bg-[#0C0F16]">
        {logs.length === 0 ? (
          <div className="py-12 text-center text-slate-455 dark:text-slate-500">
            <FiInfo className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold">No matching check-in records found</p>
          </div>
        ) : (
          logs.map((log, idx) => {
            const isLate = log.status === 'Late'
            const isLeave = log.status === 'Leave'
            return (
              <div key={idx} className="p-5 space-y-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-all duration-200 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{log.date}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border
                    ${isLeave 
                      ? 'bg-[#8250DF]/10 dark:bg-[#8957E5]/15 border-[#8250DF]/20 dark:border-[#8957E5]/20 text-[#8250DF] dark:text-[#A371F7]'
                      : isLate 
                        ? 'bg-[#D4A72C]/10 dark:bg-[#D29922]/10 border-[#D4A72C]/20 dark:border-[#D29922]/20 text-[#D4A72C] dark:text-[#E3B341]' 
                        : 'bg-[#2DA44E]/10 dark:bg-[#238636]/10 border-[#2DA44E]/20 dark:border-[#238636]/20 text-[#2DA44E] dark:text-[#3FB950]'}`}>
                    {log.status}
                  </span>
                </div>
                
                {/* 3-Column stats readout grid */}
                <div className="grid grid-cols-3 gap-3 text-left">
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Check In</span>
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">{log.checkIn}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Check Out</span>
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">{log.checkOut}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Duration</span>
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">{log.hours}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-850/20">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider">Classification</span>
                  <span className={`text-[10px] font-bold ${isLate ? 'text-[#D4A72C] dark:text-[#E3B341]' : isLeave ? 'text-[#8250DF] dark:text-[#A371F7]' : 'text-slate-450 dark:text-slate-400'}`}>
                    {log.category}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

/**
 * LeaveLedger Component
 * Renders personal linear progress balance bars with unified high-tech AI styling.
 */
function LeaveLedger({ stats }) {
  return (
    <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[440px] transition-all duration-300 relative overflow-hidden group
                  bg-[#FFFFFF] dark:bg-[#0C0F16] border-[#D0D7DE] dark:border-[#30363D] shadow-md hover:shadow-xl hover:border-[#0969DA]/30 dark:hover:border-[#1F6FEB]/30
                  bg-[radial-gradient(#00000003_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* High-Tech Tactical Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-br-sm pointer-events-none" />

      {/* Subtle Premium Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-[#0969DA]/5 to-indigo-500/0 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tl from-[#8250DF]/[0.03] to-[#0969DA]/0 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      <div className="flex justify-between items-start z-10">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Leave Bank</p>
          <h3 className="text-base font-black text-slate-850 dark:text-white leading-tight">Personal Balances</h3>
        </div>
        {/* Sleek Live Status Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-[#2DA44E]/10 border border-[#2DA44E]/20 text-[#2DA44E] dark:text-[#3FB950]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DA44E] dark:bg-[#3FB950] animate-pulse shadow-[0_0_6px_rgba(45,164,78,0.8)]" />
          <span>System Sync</span>
        </div>
      </div>

      <div className="space-y-6 my-6 flex-grow flex flex-col justify-center z-10">
        {Object.entries(stats).map(([key, stat]) => {
          const remaining = stat.total - stat.used
          const percentageRemaining = (remaining / stat.total) * 100
          
          // Color mappings bound to brand design palette tokens
          const barColorClass = {
            sick: 'bg-[#CF222E] dark:bg-[#F85149] shadow-rose-500/20',
            casual: 'bg-[#D4A72C] dark:bg-[#D29922] shadow-amber-500/20',
            earned: 'bg-[#8250DF] dark:bg-[#8957E5] shadow-purple-500/20',
          }[key]

          return (
            <div key={key} className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-350">{stat.label}</span>
                <span className="text-slate-850 dark:text-white font-mono font-black">{remaining} / {stat.total} Days Left</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/40 overflow-hidden relative shadow-inner">
                <div 
                  className={`h-full rounded-full ${barColorClass} transition-all duration-1000 ease-out`}
                  style={{ width: `${percentageRemaining}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-[9px] font-bold text-slate-455 border-t border-dashed border-[#D0D7DE] dark:border-[#30363D] pt-4 flex justify-between z-10">
          <span>Year Cycle: Jan - Dec 2026</span>
        <span>Lapsed carryover: No</span>
      </div>
    </div>
  )
}

/**
 * LeaveRequestsTimeline Component
 * Renders chronological list of leave applications with unified high-tech AI styling.
 */
function LeaveRequestsTimeline({ requests, onRequestClick }) {
  return (
    <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[440px] transition-all duration-300 relative overflow-hidden group
                  bg-[#FFFFFF] dark:bg-[#0C0F16] border-[#D0D7DE] dark:border-[#30363D] shadow-md hover:shadow-xl hover:border-[#8250DF]/30 dark:hover:border-[#A371F7]/30
                  bg-[radial-gradient(#00000003_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* High-Tech Tactical Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-250/60 dark:border-slate-800/80 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-250/60 dark:border-slate-800/80 rounded-br-sm pointer-events-none" />

      {/* Subtle Premium Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-[#8250DF]/5 to-indigo-500/0 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      <div className="flex justify-between items-start z-10">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">History Feed</p>
          <h3 className="text-base font-black text-slate-850 dark:text-white leading-tight">Recent Leave Requests</h3>
        </div>
        {/* Sleek Live status badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-[#8250DF]/10 border border-[#8250DF]/20 text-[#8250DF] dark:text-[#A371F7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8250DF] dark:bg-[#A371F7] animate-pulse shadow-[0_0_6px_rgba(130,80,223,0.8)]" />
          <span>Live Tracking</span>
        </div>
      </div>

      <div className="flex-grow space-y-3.5 my-5 overflow-y-auto no-scrollbar z-10">
        {requests.map((req, idx) => {
          const isPending = req.status === 'Pending'
          return (
            <div 
              key={idx}
              onClick={() => onRequestClick(req)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center group/item text-left
                        bg-slate-50/50 dark:bg-slate-900/15 border-slate-200/80 dark:border-[#30363D]
                        hover:border-[#8250DF]/30 hover:bg-slate-100/30 dark:hover:bg-slate-900/30 hover:scale-[1.01]
                        ${isPending 
                          ? 'border-l-4 border-l-[#D4A72C] dark:border-l-[#D29922]' 
                          : 'border-l-4 border-l-[#2DA44E] dark:border-l-[#238636]'}`}
            >
              <div className="space-y-1 text-left min-w-0 flex-grow pr-3">
                <h4 className="text-xs font-black text-slate-850 dark:text-white flex items-center gap-1.5 leading-tight truncate">
                  {req.type}
                  <span className="text-[9px] font-bold text-slate-400 font-mono flex-shrink-0">({req.id})</span>
                </h4>
                <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold truncate">{req.range} • {req.duration}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border
                  ${isPending 
                    ? 'bg-[#D4A72C]/10 border-[#D4A72C]/20 text-[#D4A72C] dark:text-[#E3B341]' 
                    : 'bg-[#2DA44E]/10 border-[#2DA44E]/20 text-[#2DA44E] dark:text-[#3FB950]'}`}>
                  {req.status}
                </span>
                <FiChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:translate-x-0.5 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-[9px] font-bold text-slate-455 border-t border-dashed border-[#D0D7DE] dark:border-[#30363D] pt-3.5 flex justify-between items-center z-10">
        <span>Pending review: 1 request</span>
        <span className="text-[#8250DF] dark:text-[#A371F7] flex items-center gap-0.5 cursor-pointer hover:underline font-black">
          Create new request <FiExternalLink className="w-2.5 h-2.5" />
        </span>
      </div>
    </div>
  )
}

/**
 * LeaveDetailsModal Component
 * Interactive glassmorphic modal popup detailing request reason / audit trail.
 */
function LeaveDetailsModal({ request, onClose }) {
  if (!request) return null

  const isPending = request.status === 'Pending'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="absolute inset-0 cursor-default" onClick={onClose} />
      
      <div className="w-full max-w-md rounded-3xl border p-6 space-y-5 relative z-10 shadow-2xl animate-scale-up
                     bg-white dark:bg-[#0C0F16] border-slate-200 dark:border-slate-850/80">
        
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Request Details</span>
            <h3 className="text-base font-black text-slate-850 dark:text-white leading-tight">{request.type}</h3>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border
            ${isPending 
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-450'}`}>
            {request.status}
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-850/40 text-xs">
          <div className="py-3 flex justify-between">
            <span className="text-slate-450 dark:text-slate-500 font-bold">Request ID</span>
            <span className="font-mono font-black text-slate-850 dark:text-white">{request.id}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-slate-450 dark:text-slate-500 font-bold">Duration</span>
            <span className="font-black text-slate-850 dark:text-white">{request.duration} ({request.range})</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-slate-455 dark:text-slate-500 font-bold">Requested On</span>
            <span className="font-semibold text-slate-700 dark:text-slate-350">{request.requestedOn}</span>
          </div>
          <div className="py-3 flex flex-col gap-1 text-left">
            <span className="text-slate-450 dark:text-slate-500 font-bold">Purpose / Reason</span>
            <p className="text-slate-700 dark:text-slate-350 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850/40 mt-1">
              {request.reason}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-bold text-xs border border-slate-200 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
        >
          Back to List
        </button>
      </div>
    </div>
  )
}

/**
 * ExportDrawer Component
 * Custom slide-up drawer handling visual progress of secure report generation.
 */
function ExportDrawer({ isOpen, step, progress, month, onClose }) {
  if (!isOpen) return null

  const isCompleted = step === EXPORT_STEPS.DONE

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0 cursor-default" onClick={isCompleted ? onClose : undefined} />
      
      <div className="w-full max-w-lg rounded-t-3xl border border-b-0 p-6 space-y-6 relative z-10 shadow-2xl transition-all duration-300 animate-scale-up
                     bg-white dark:bg-[#0C0F16] border-slate-200 dark:border-slate-850/80">
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-black text-slate-850 dark:text-white">Generating Attendance Package</h3>
          <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold">Creating certified digital logs for {month}</p>
        </div>

        <div className="flex flex-col items-center justify-center py-6 gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" className="stroke-slate-100 dark:stroke-slate-800/40 fill-none" strokeWidth="6" />
              <circle 
                cx="48" 
                cy="48" 
                r="40" 
                className="stroke-[#bf40bf] dark:stroke-purple-500 fill-none transition-all duration-300" 
                strokeWidth="6" 
                strokeDasharray={2 * Math.PI * 40} 
                strokeDashoffset={2 * Math.PI * 40 * (1 - (progress / 100))} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute flex items-center justify-center">
              {isCompleted ? (
                <FiCheckCircle className="w-10 h-10 text-emerald-500 animate-pulse" />
              ) : (
                <FiLoader className="w-8 h-8 text-[#bf40bf] dark:text-purple-400 animate-spin" />
              )}
            </div>
          </div>

          <div className="h-6 text-center">
            {step === EXPORT_STEPS.FORMATTING && <span className="text-xs font-bold text-slate-500 animate-pulse">Formatting grid & styling layers...</span>}
            {step === EXPORT_STEPS.COMPILING && <span className="text-xs font-bold text-slate-500 animate-pulse">Compiling personal statistics...</span>}
            {step === EXPORT_STEPS.SEALING && <span className="text-xs font-bold text-slate-500 animate-pulse">Affixing secure digital certificate signature...</span>}
            {isCompleted && <span className="text-xs font-black text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Attendance log exported successfully!
            </span>}
          </div>
        </div>

        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative shadow-inner">
          <div 
            className="h-full rounded-full bg-[#bf40bf] dark:bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="pt-2">
          {isCompleted ? (
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-xs text-white bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 cursor-pointer"
            >
              Close & Download
            </button>
          ) : (
            <button 
              disabled
              className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-xs text-slate-400 dark:text-slate-650 bg-slate-100 dark:bg-slate-850/60 cursor-not-allowed"
            >
              Generating ({progress}%)
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

// ============================================================================
// 3. MAIN ORCHESTRATOR COMPONENT (Reports Controller)
// ============================================================================

/**
 * Reports Component
 * Orchestrates user tab interactions, query searches, and visual states.
 * Fully optimized, modularized, and built according to SOLID & DRY design guidelines.
 */
function Reports() {
  // Sync tab selection directly with URL parameters for deep-linking
  const [searchParams, setSearchParams] = useSearchParams()
  const activeReportTab = searchParams.get('tab') || 'insights'

  const [selectedMonth, setSelectedMonth] = useState('May 2026')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal and Drawer active states
  const [isExportDrawerOpen, setIsExportDrawerOpen] = useState(false)
  const [exportStep, setExportStep] = useState(EXPORT_STEPS.IDLE)
  const [exportProgress, setExportProgress] = useState(0)
  const [selectedLeaveDetails, setSelectedLeaveDetails] = useState(null)

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId })
  }

  // Trigger export loading progress sequences
  const handleStartExport = () => {
    setIsExportDrawerOpen(true)
    setExportStep(EXPORT_STEPS.FORMATTING)
    setExportProgress(15)
  }

  useEffect(() => {
    if (exportStep > EXPORT_STEPS.IDLE && exportStep < EXPORT_STEPS.DONE) {
      const timers = [
        setTimeout(() => {
          setExportStep(EXPORT_STEPS.COMPILING)
          setExportProgress(45)
        }, 1200),
        setTimeout(() => {
          setExportStep(EXPORT_STEPS.SEALING)
          setExportProgress(80)
        }, 2400),
        setTimeout(() => {
          setExportStep(EXPORT_STEPS.DONE)
          setExportProgress(100)
        }, 3600)
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [exportStep])

  const handleCloseExport = () => {
    setIsExportDrawerOpen(false)
    setTimeout(() => {
      setExportStep(EXPORT_STEPS.IDLE)
      setExportProgress(0)
    }, 300)
  }

  // Filter logs using case-insensitive matches
  const filteredLogs = MOCK_ATTENDANCE_LOGS.filter(log => 
    log.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-fade-in select-none">
      
      {/* Scrollbar utilities to ensure standard containment layouts */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Performance Cockpit
          </p>
          <h2 className="text-2xl font-black text-slate-850 dark:text-white leading-tight">
            My Attendance & Insights
          </h2>
        </div>
        
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-300 outline-none cursor-pointer
                     bg-white dark:bg-[#0C0F16] border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-350
                     hover:border-[#bf40bf]/30 dark:hover:border-purple-900/30 focus:border-[#bf40bf] dark:focus:border-purple-500 shadow-sm"
        >
          <option>May 2026</option>
          <option>April 2026</option>
          <option>March 2026</option>
        </select>
      </div>

      {/* METRIC SUMMARIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStatCard name="Consistency Rate" value="95.8%" desc="▲ +3.8% above average" icon={FiActivity} colorClass="text-emerald-500 bg-emerald-500/10" />
        <ReportStatCard name="Hours Tracked" value="148.5 hrs" desc="Target: 160 hrs MTD" icon={FiClock} colorClass="text-[#bf40bf] bg-[#bf40bf]/10" />
        <ReportStatCard name="Consistency Streak" value="12 Days" desc="Pulsing Gold Status" icon={FiStar} colorClass="text-amber-500 bg-amber-500/10" />
        <ReportStatCard name="Available Leaves" value="15 / 24" desc="9 leaves taken this year" icon={FiCalendar} colorClass="text-blue-500 bg-blue-500/10" />
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex border-b border-slate-200 dark:border-slate-800/50">
        {[
          { id: 'insights', name: 'Workplace Insights', icon: FiTrendingUp },
          { id: 'history', name: 'Check-In Records & Export', icon: FiFileText },
          { id: 'leaves', name: 'Leave Ledger', icon: FiBriefcase }
        ].map(tab => {
          const Icon = tab.icon
          const isActive = activeReportTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 border-b-2 text-xs font-black uppercase tracking-wider transition-all duration-300 relative cursor-pointer
                ${isActive 
                  ? 'border-[#8250DF] dark:border-[#8957E5] text-[#8250DF] dark:text-[#A371F7] font-extrabold' 
                  : 'border-transparent text-slate-455 dark:text-slate-500 hover:text-slate-850 dark:hover:text-white'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8250DF] dark:bg-[#A371F7] shadow-[0_0_8px_rgba(130,80,223,0.6)]" />
              )}
            </button>
          )
        })}
      </div>

      {/* STAGE CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {activeReportTab === 'insights' && (
          <>
            <div className="lg:col-span-5 flex">
              <ConsistencyRadar rate={95.8} />
            </div>
            <div className="lg:col-span-7 flex">
              <HabitsBriefing />
            </div>
          </>
        )}

        {activeReportTab === 'history' && (
          <div className="lg:col-span-12 flex flex-col gap-6 w-full">
            {/* Enterprise Reports Filtering & Action Cockpit (Recreation from user screenshot in GitHub Color System) */}
            <div className="p-4 rounded-3xl border flex flex-col lg:flex-row lg:items-end justify-between gap-5 text-left
                            bg-[#FFFFFF] dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-md w-full">
              
              {/* Left Filters Deck */}
              <div className="flex flex-col md:flex-row md:items-end gap-5 w-full lg:w-auto">
                
                {/* 1. REPORT TYPE Segmented Control */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Report Type</span>
                  <div className="flex h-10 rounded-xl p-1 bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] items-center">
                    {['Weekly', 'Monthly', 'Custom'].map((type) => {
                      const isActive = type === 'Monthly'
                      return (
                        <button
                          key={type}
                          className={`flex items-center justify-center gap-1.5 px-3.5 h-8 rounded-lg text-xs font-black transition-all duration-355 cursor-pointer
                            ${isActive 
                              ? 'bg-[#0969DA] dark:bg-[#1F6FEB] text-white shadow-md shadow-blue-500/10' 
                              : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#24292F] dark:hover:text-[#F0F6FC]'}`}
                        >
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>{type}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. STATUS Dropdown Selector */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</span>
                  <select 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value === 'All Statuses' ? '' : e.target.value)}
                    className="h-10 px-3.5 rounded-xl border text-xs font-bold outline-none cursor-pointer w-40 transition-all duration-300
                               bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#C9D1D9] focus:border-[#0969DA] dark:focus:border-[#1F6FEB]"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Punctual">Punctual Logs</option>
                    <option value="Late">Late Incidents</option>
                    <option value="Leave">Leaves taken</option>
                  </select>
                </div>

                {/* 3. DATE RANGE Calendar Selectors */}
                <div className="flex flex-col gap-1.5 w-full md:w-auto">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Date Range</span>
                  <div className="flex items-center gap-2 h-10 w-full md:w-auto">
                    <div className="relative h-full flex-grow md:flex-grow-0">
                      <input 
                        type="text" 
                        defaultValue="30-04-2026"
                        className="pl-3 pr-8 h-full rounded-xl border text-xs font-bold text-center w-full md:w-28 outline-none
                                   bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#C9D1D9] focus:border-[#0969DA] dark:focus:border-[#1F6FEB]"
                      />
                      <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 w-3.5 h-3.5 pointer-events-none" />
                    </div>
                    <span className="text-slate-400 font-bold font-mono">→</span>
                    <div className="relative h-full flex-grow md:flex-grow-0">
                      <input 
                        type="text" 
                        defaultValue="30-05-2026"
                        className="pl-3 pr-8 h-full rounded-xl border text-xs font-bold text-center w-full md:w-28 outline-none
                                   bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#C9D1D9] focus:border-[#0969DA] dark:focus:border-[#1F6FEB]"
                      />
                      <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 w-3.5 h-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Export Actions Deck */}
              <div className="flex items-center gap-2.5 flex-nowrap flex-shrink-0 w-full lg:w-auto justify-start lg:justify-end">
                {/* Primary Generate Report button */}
                <button 
                  onClick={handleStartExport}
                  className="flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl font-black uppercase tracking-wider text-[10px] text-white cursor-pointer
                             bg-[#2DA44E] hover:bg-[#2C974B] dark:bg-[#238636] dark:hover:bg-[#2ea043] shadow-md shadow-emerald-500/10 active:scale-95 transition-all duration-200"
                >
                  <FiTrendingUp className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </button>

                {/* PDF export shortcut */}
                <button 
                  onClick={handleStartExport}
                  className="flex items-center justify-center gap-1.5 px-3 h-10 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer
                             bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#C9D1D9] active:scale-95
                             hover:border-[#CF222E]/30 hover:text-[#CF222E] dark:hover:border-[#F85149]/30 dark:hover:text-[#FF7B72] hover:bg-[#FEF2F2]/45 dark:hover:bg-[#DA3633]/10"
                >
                  <FiFileText className="w-3.5 h-3.5 text-[#CF222E] dark:text-[#FF7B72]" />
                  <span>PDF</span>
                </button>

                {/* Excel export shortcut */}
                <button 
                  onClick={handleStartExport}
                  className="flex items-center justify-center gap-1.5 px-3 h-10 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer
                             bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#C9D1D9] active:scale-95
                             hover:border-[#2DA44E]/30 hover:text-[#2DA44E] dark:hover:border-[#3FB950]/30 dark:hover:text-[#3FB950] hover:bg-[#F0FDF4]/45 dark:hover:bg-[#196C2E]/10"
                >
                  <FiFileText className="w-3.5 h-3.5 text-[#2DA44E] dark:text-[#3FB950]" />
                  <span>Excel</span>
                </button>
              </div>

            </div>

            <AttendanceHistoryTable logs={filteredLogs} />
          </div>
        )}

        {activeReportTab === 'leaves' && (
          <>
            <div className="lg:col-span-5 flex">
              <LeaveLedger stats={MOCK_LEAVE_STATS} />
            </div>
            <div className="lg:col-span-7 flex">
              <LeaveRequestsTimeline requests={MOCK_LEAVE_REQUESTS} onRequestClick={setSelectedLeaveDetails} />
            </div>
          </>
        )}

      </div>

      {/* OVERLAYS & MODALS */}
      <ExportDrawer 
        isOpen={isExportDrawerOpen} 
        step={exportStep} 
        progress={exportProgress} 
        month={selectedMonth} 
        onClose={handleCloseExport} 
      />

      <LeaveDetailsModal 
        request={selectedLeaveDetails} 
        onClose={() => setSelectedLeaveDetails(null)} 
      />

    </div>
  )
}

export default Reports
