import { useState, useMemo } from 'react'
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiAlertCircle,
    FiPlus,
    FiCheck,
    FiFileText,
    FiUser,
    FiUmbrella,
    FiActivity,
    FiCoffee,
    FiHeart
} from 'react-icons/fi'

// ==========================================
// STATIC HELPERS FOR STATUS CONFIG & ICONS (DRY)
// ==========================================
const STATUS_CFG = {
    Approved: { 
        icon: FiCheckCircle, 
        color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10", 
        glow: "bg-emerald-500" 
    },
    Pending: { 
        icon: FiClock, 
        color: "text-amber-500 border-amber-500/20 bg-amber-500/10", 
        glow: "bg-amber-500 animate-pulse" 
    },
    Rejected: { 
        icon: FiAlertCircle, 
        color: "text-rose-500 border-rose-500/20 bg-rose-500/10", 
        glow: "bg-rose-500" 
    }
}

const getStatusCfg = (status) => STATUS_CFG[status] || { 
    icon: FiClock, 
    color: "text-purple-500 border-purple-500/20 bg-purple-500/10", 
    glow: "bg-purple-500" 
}

const LEAVE_ICONS = {
    'Sick Leave': FiActivity,
    'Casual Leave': FiCoffee,
    'Earned Leave': FiUmbrella
}

const getLeaveIcon = (type) => LEAVE_ICONS[type] || FiUmbrella

/**
 * Leave Component
 * Premium Personal Employee & Team Leave Tracker Portal.
 * Redesigned to match the provided high-end custom visual mockups exactly.
 */
function Leave({ 
    leaveHistory = [], 
    setLeaveHistory,
    approvals = [],
    setApprovals,
    handleApproval
}) {
    
    // 1. ACTIVE PORTAL TAB STATE
    const [activeTab, setActiveTab] = useState('Overview') // Overview | Apply | My Leaves | Approvals

    // 2. ACTIVE VIEW FILTER FOR MY LEAVE HISTORY
    const [historyFilter, setHistoryFilter] = useState('All') // All | Pending | Approved | Rejected

    // ==========================================
    // 3. APPLY LEAVE STEP STATES (SCREENSHOT MATCHING)
    // ==========================================
    const [formStep, setFormStep] = useState(2) // Defaults to Step 2 (Date Range) like the screenshot
    const [leaveCategory, setLeaveCategory] = useState('Earned Leave') // Earned Leave | Sick Leave | Casual Leave
    const [startDateVal, setStartDateVal] = useState('')
    const [endDateVal, setEndDateVal] = useState('')
    const [isHalfDay, setIsHalfDay] = useState(false)
    const [formReason, setFormReason] = useState('')

    // Warnings trigger states
    const [showFromWarning, setShowFromWarning] = useState(false)
    const [showToWarning, setShowToWarning] = useState(false)

    // Helper to format date into visual dd-mm-yyyy placeholder format
    const formatDateLabel = (val) => {
        if (!val) return 'dd-mm-yyyy'
        const d = new Date(val)
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
    }

    // Format for submission
    const getFormattedSubmitDate = (val) => {
        const d = new Date(val)
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    // Calculated days
    const formNumDays = useMemo(() => {
        if (!startDateVal || !endDateVal) return 0
        const start = new Date(startDateVal)
        const end = new Date(endDateVal)
        if (start > end) return 0
        const diffTime = Math.abs(end - start)
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    }, [startDateVal, endDateVal])

    // Submits leave request
    const handleFormSubmit = () => {
        if (!startDateVal || !endDateVal || !formReason.trim()) return

        const newLeave = {
            id: Date.now(),
            type: leaveCategory,
            duration: formNumDays > 1 ? `${getFormattedSubmitDate(startDateVal)} - ${getFormattedSubmitDate(endDateVal)}` : `${getFormattedSubmitDate(startDateVal)}`,
            days: isHalfDay ? 0.5 : formNumDays,
            dates: `${getFormattedSubmitDate(startDateVal)} to ${getFormattedSubmitDate(endDateVal)}`,
            reason: formReason,
            status: "Pending",
            approver: null,
            appliedDate: `Applied ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
        }

        setLeaveHistory(prev => [newLeave, ...prev])
        
        // Reset states
        setFormStep(2)
        setStartDateVal('')
        setEndDateVal('')
        setIsHalfDay(false)
        setFormReason('')

        // Redirect to overview
        setActiveTab('Overview')
    }

    // Cancels a pending personal request
    const handleCancelRequest = (id) => {
        setLeaveHistory(prev => prev.filter(item => item.id !== id))
    }

    // ==========================================
    // 4. BALANCES DATA AND INTERACTIVE STATE
    // ==========================================
    // Counts used days from history dynamically to verify total balances
    const dynamicUsage = useMemo(() => {
        const usage = { "Earned Leave": 3, "Sick Leave": 3, "Casual Leave": 4 }
        leaveHistory.forEach(item => {
            if (item.status === 'Approved') {
                if (item.type === 'Annual Leave' || item.type === 'Earned Leave') usage["Earned Leave"] += item.days
                if (item.type === 'Sick Leave') usage["Sick Leave"] += item.days
                if (item.type === 'Casual Leave') usage["Casual Leave"] += item.days
            }
        })
        return usage
    }, [leaveHistory])

    const balanceCards = [
        {
            type: "Sick Leave",
            desc: "For illness or medical appointments",
            icon: FiActivity,
            remaining: Math.max(0, 12 - dynamicUsage["Sick Leave"]),
            used: dynamicUsage["Sick Leave"],
            total: 12,
            pct: Math.round((Math.max(0, 12 - dynamicUsage["Sick Leave"]) / 12) * 100),
            color: "text-red-500 stroke-red-500",
            bg: "border-red-500/20 shadow-red-500/5",
            barColor: "bg-red-500"
        },
        {
            type: "Casual Leave",
            desc: "For personal errands or short breaks",
            icon: FiCoffee,
            remaining: Math.max(0, 12 - dynamicUsage["Casual Leave"]),
            used: dynamicUsage["Casual Leave"],
            total: 12,
            pct: Math.round((Math.max(0, 12 - dynamicUsage["Casual Leave"]) / 12) * 100),
            color: "text-amber-500 stroke-amber-500",
            bg: "border-amber-500/20 shadow-amber-500/5",
            barColor: "bg-amber-500"
        },
        {
            type: "Earned Leave",
            desc: "Accrued annual vacation leave",
            icon: FiUmbrella,
            remaining: Math.max(0, 18 - dynamicUsage["Earned Leave"]),
            used: dynamicUsage["Earned Leave"],
            total: 18,
            pct: Math.round((Math.max(0, 18 - dynamicUsage["Earned Leave"]) / 18) * 100),
            color: "text-emerald-500 stroke-emerald-500",
            bg: "border-emerald-500/20 shadow-emerald-500/5",
            barColor: "bg-emerald-500"
        }
    ]

    // ==========================================
    // 5. FILTERED PERSONAL LOGS
    // ==========================================
    const filteredHistory = useMemo(() => {
        if (historyFilter === 'All') return leaveHistory
        return leaveHistory.filter(item => item.status === historyFilter)
    }, [leaveHistory, historyFilter])

    return (
        <div className="space-y-6 animate-fade-in select-none text-slate-800 dark:text-slate-100">
            
            {/* =========================================================
            HEADER TITLE BAR (SCREENSHOT MATCHING)
            ========================================================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                        Leave Management
                    </h1>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        Apply for leave, track balances, and manage approvals
                    </p>
                </div>

                <button 
                    onClick={() => {
                        setActiveTab('Apply')
                        setFormStep(2)
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white border border-indigo-600/30 flex items-center justify-center gap-2 transition-all duration-300
                        bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/10 active:scale-[0.98]"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Apply for Leave</span>
                </button>
            </div>

            {/* =========================================================
            TAB NAVIGATION HEADER (SCREENSHOT MATCHING)
            ========================================================= */}
            <div className="border-b border-slate-200/50 dark:border-slate-850/40">
                <nav className="flex space-x-8">
                    {[
                        { id: 'Overview', name: 'Overview' },
                        { id: 'Apply', name: 'Apply' },
                        { id: 'My Leaves', name: 'My Leaves' },
                        { id: 'Approvals', name: 'Approvals', count: leaveHistory.filter(item => item.status === 'Pending').length }
                    ].map(tab => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    if (tab.id === 'Apply') setFormStep(2)
                                }}
                                className={`pb-4 px-1 text-sm font-semibold transition-all duration-200 relative flex items-center gap-1.5 outline-none
                                    ${isActive 
                                        ? 'text-purple-600 dark:text-purple-400 font-extrabold border-b-2 border-purple-500' 
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border-b-2 border-transparent'}`}
                            >
                                <span>{tab.name}</span>
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="ml-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[9px] leading-none flex items-center justify-center shadow-sm">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* =========================================================
            TAB CONTENT: OVERVIEW (LEAVE BALANCE CARDS & SPLIT COLUMNS)
            ========================================================= */}
            {activeTab === 'Overview' && (
                <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
                    
                    {/* LEAVE BALANCES GRID ROW (SCREENSHOT MATCHING) */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-bold text-slate-800 dark:text-[#E4E6EB] tracking-tight uppercase">
                                Leave Balances
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-[#222429] bg-slate-50 dark:bg-[#121318] text-[9px] font-bold text-slate-500 dark:text-[#888A96] uppercase tracking-wider">
                                FY 2025
                            </span>
                        </div>

                        {/* Balance Loop Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {balanceCards.map((b) => {
                                const IconComp = b.icon
                                return (
                                    <div 
                                        key={b.type}
                                        className="p-5 rounded-xl border bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] transition-all duration-200 flex flex-col justify-between"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-[#888A96]">
                                                    <IconComp className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">{b.type}</span>
                                                </div>
                                                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                                                    {b.remaining} <span className="text-xs font-normal text-slate-400 dark:text-[#585966]">/ {b.total} days left</span>
                                                </p>
                                            </div>
                                            <span className="text-[10px] font-semibold text-slate-400 dark:text-[#585966] bg-slate-50 dark:bg-[#1C1D24] px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800/40">
                                                {b.used} used
                                            </span>
                                        </div>

                                        {/* Bottom indicator thin progress bar */}
                                        <div className="mt-6 space-y-1.5">
                                            <div className="w-full h-1 bg-slate-100 dark:bg-[#1D1E24] rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${b.barColor} rounded-full transition-all duration-500`} 
                                                    style={{ width: `${b.pct}%` }} 
                                                />
                                            </div>
                                            <div className="flex justify-between text-[9px] font-semibold text-slate-400 dark:text-[#585966]">
                                                <span>{b.pct}% REMAINING</span>
                                                <span>{b.total}D TOTAL</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Other Leaves Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {[
                                { type: "Maternity Leave", icon: FiHeart, iconColor: "text-rose-500 dark:text-rose-400", desc: "90 days remaining", badge: "90d" },
                                { type: "Paternity Leave", icon: FiUser, iconColor: "text-blue-500 dark:text-blue-400", desc: "15 days remaining", badge: "15d" },
                                { type: "Unpaid Leave", icon: FiFileText, iconColor: "text-slate-400 dark:text-[#888A96]", desc: "0 days remaining", badge: "0d" }
                            ].map((o) => {
                                const IconComp = o.icon
                                return (
                                    <div 
                                        key={o.type}
                                        className="p-4 rounded-xl border bg-white dark:bg-[#121318] border-slate-200/80 dark:border-[#1F2128] flex items-center justify-between transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <IconComp className={`w-4 h-4 ${o.iconColor}`} />
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800 dark:text-[#E4E6EB] leading-tight">{o.type}</h4>
                                                <p className="text-[10px] text-slate-400 dark:text-[#585966] mt-0.5">{o.desc}</p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-50 dark:bg-[#1C1D24] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                                            {o.badge}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* LOWER VIEW ROW: SPLIT HISTORY & TEAM REQUESTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        
                        {/* MY LEAVE HISTORY (Cols: 8) */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
                                    My Leave History
                                </h3>

                                {/* Category filter buttons */}
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0C0F16] p-1 rounded-xl border border-slate-200 dark:border-slate-850">
                                    {['All', 'Pending', 'Approved', 'Rejected'].map(filt => {
                                        const isActive = historyFilter === filt
                                        return (
                                            <button
                                                key={filt}
                                                onClick={() => setHistoryFilter(filt)}
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-200
                                                    ${isActive 
                                                        ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}
                                            >
                                                {filt}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Stripe-style structured table/list logs */}
                            <div className="border bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] rounded-xl overflow-hidden">
                                {filteredHistory.length === 0 ? (
                                    <div className="p-12 text-center text-slate-400 dark:text-[#585966]">
                                        <FiUmbrella className="w-8 h-8 mx-auto mb-3 text-slate-300 dark:text-[#2E303B] stroke-1" />
                                        <p className="text-xs font-bold uppercase tracking-wider">No leave logs match filter criteria</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100 dark:divide-[#1D1E24]">
                                        {filteredHistory.map((item) => {
                                            const statusCfg = getStatusCfg(item.status)
                                            const LeaveIcon = getLeaveIcon(item.type)

                                            return (
                                                <div 
                                                    key={item.id}
                                                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50/50 dark:hover:bg-[#16171D]"
                                                >
                                                    <div className="space-y-1.5 flex-grow">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-1.5 text-slate-800 dark:text-[#E4E6EB]">
                                                                <LeaveIcon className="w-3.5 h-3.5 text-slate-500" />
                                                                <h4 className="text-xs font-bold">{item.type}</h4>
                                                            </div>
                                                            <span className="text-[10px] text-slate-400 dark:text-[#585966]">•</span>
                                                            <span className="text-[10px] font-semibold text-slate-550 dark:text-[#888A96]">{item.appliedDate || "22 Jan"}</span>
                                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusCfg.color}`}>
                                                                {item.status}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-600 dark:text-[#888A96]">
                                                            <span className="font-semibold text-slate-800 dark:text-white">{item.duration}</span>
                                                            <span className="text-slate-300 dark:text-[#2E303B] font-light">|</span>
                                                            <span>{item.days} {item.days > 1 ? 'days' : 'day'}</span>
                                                        </div>
                                                        
                                                        <p className="text-[11px] text-slate-450 dark:text-[#68697A] italic leading-tight">
                                                            "{item.reason}"
                                                        </p>

                                                        {item.approver && (
                                                            <p className="text-[9px] text-slate-400 dark:text-[#585966] flex items-center gap-1">
                                                                <span>✓ Approved by</span>
                                                                <span className="font-semibold text-slate-550 dark:text-[#888A96]">{item.approver}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Cancel action */}
                                                    {item.status === 'Pending' && (
                                                        <div className="flex-shrink-0 flex items-center">
                                                            <button 
                                                                onClick={() => handleCancelRequest(item.id)}
                                                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-[#222429] bg-transparent text-slate-500 dark:text-[#888A96] hover:bg-slate-50 dark:hover:bg-[#1C1D24] active:scale-95 transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* TEAM LEAVE REQUESTS PANEL (Cols: 4) */}
                        <div className="lg:col-span-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-[#E4E6EB] tracking-tight uppercase">
                                    Team Leave Requests
                                </h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                                    {approvals.length} PENDING
                                </span>
                            </div>

                            <div className="p-5 rounded-xl border bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] space-y-5">
                                
                                {/* Section A: AWAITING APPROVAL */}
                                <div className="space-y-3">
                                    <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-[#585966] tracking-wider block">
                                        Awaiting Approval
                                    </span>

                                    {approvals.length === 0 ? (
                                        <p className="text-[11px] text-slate-400 dark:text-[#585966] italic">No leaves awaiting approval</p>
                                    ) : (
                                        approvals.map((app) => {
                                            const LeaveIcon = app.type === 'Sick' ? FiActivity : FiCoffee
                                            const pillColor = app.type === 'Sick' 
                                                ? 'bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400' 
                                                : 'bg-amber-500/10 border-amber-500/20 text-amber-500 dark:text-amber-400'

                                            return (
                                                <div key={app.id} className="space-y-2 p-3 rounded-lg border bg-slate-50 dark:bg-[#1C1D24]/40 border-slate-100 dark:border-[#1F2128]/50">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`w-6 h-6 rounded-full ${app.bg || 'bg-[#bf40bf]'} text-white font-extrabold flex items-center justify-center text-[9px]`}>
                                                            {app.avatar || 'T'}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-slate-800 dark:text-[#E4E6EB]">{app.name}</h4>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                 <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border ${pillColor} flex items-center gap-1`}>
                                                                    <LeaveIcon className="w-2.5 h-2.5" />
                                                                    <span>{app.type} Leave • {app.duration}</span>
                                                                 </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 dark:text-[#68697A] italic pl-1 leading-tight">
                                                        "{app.type === 'Sick' ? 'Stomach infection, doctor prescribed 2 days rest' : 'Bank related work'}"
                                                    </p>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Section B: RECENTLY RESOLVED */}
                                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#1D1E24]">
                                    <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-[#585966] tracking-wider block">
                                        Recently Resolved
                                    </span>

                                    <div className="space-y-2 p-3 rounded-lg border bg-slate-50 dark:bg-[#1C1D24]/40 border-slate-100 dark:border-[#1F2128]/50">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center text-[9px]">
                                                DK
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800 dark:text-[#E4E6EB]">Divya Krishnan</h4>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                                                        <FiUmbrella className="w-2.5 h-2.5" />
                                                        <span>Earned Leave • 5d</span>
                                                    </span>
                                                    <span className="px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[7px] font-bold uppercase">
                                                        Approved
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-[#68697A] italic pl-1 leading-tight">
                                            "Planned vacation"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

                    {/* =========================================================
            TAB CONTENT: APPLY (UNIFIED PREMIUM SAAS FORM)
            ========================================================= */}
            {activeTab === 'Apply' && (
                <div className="max-w-xl mx-auto py-4 animate-fade-in select-none">
                    {/* MAIN FORM CONTAINER PANEL */}
                    <div className="w-full rounded-xl p-6 bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#1F2128] flex flex-col gap-6">
                        
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-[#E4E6EB] uppercase tracking-wider">Apply for Leave</h3>
                            <p className="text-[10px] text-slate-400 dark:text-[#585966] mt-1">Submit your request below for supervisor endorsement.</p>
                        </div>

                        {/* LEAVE CATEGORY SELECTOR */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#888A96]">Leave Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { name: 'Earned Leave', icon: FiUmbrella },
                                    { name: 'Sick Leave', icon: FiActivity },
                                    { name: 'Casual Leave', icon: FiCoffee }
                                ].map((cat) => {
                                    const IconComp = cat.icon
                                    const isSelected = leaveCategory === cat.name
                                    return (
                                        <button
                                            key={cat.name}
                                            type="button"
                                            onClick={() => setLeaveCategory(cat.name)}
                                            className={`p-3 rounded-lg border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 outline-none
                                                ${isSelected 
                                                    ? 'border-[#bf40bf]/60 bg-[#bf40bf]/5 text-[#bf40bf] dark:border-purple-500/60 dark:bg-purple-500/5 dark:text-purple-400 font-bold' 
                                                    : 'border-slate-200 dark:border-[#1F2128] hover:bg-slate-50 dark:hover:bg-[#1C1D24] text-slate-550 dark:text-slate-400'}`}
                                        >
                                            <IconComp className="w-4 h-4" />
                                            <span className="text-[10px] font-semibold">{cat.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* DATE RANGE SELECTOR */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'From', value: startDateVal, setValue: setStartDateVal, warning: showFromWarning, setWarning: setShowFromWarning },
                                { label: 'To', value: endDateVal, setValue: setEndDateVal, warning: showToWarning, setWarning: setShowToWarning }
                            ].map(field => (
                                <div key={field.label} className="space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#888A96]">{field.label}</label>
                                    <div className="relative group cursor-pointer">
                                        <div className={`w-full bg-slate-50 dark:bg-[#1C1D24]/40 border rounded-lg px-4 py-2.5 text-xs flex justify-between items-center transition-all
                                            ${field.warning 
                                                ? 'border-red-500/80 shadow-inner' 
                                                : 'border-slate-200 dark:border-[#222429] hover:border-slate-350 dark:group-hover:border-slate-700'}`}>
                                            <span className={field.value ? 'text-slate-800 dark:text-slate-100 font-extrabold' : 'text-slate-400 dark:text-[#585966]'}>
                                                {field.value ? formatDateLabel(field.value) : 'dd-mm-yyyy'}
                                            </span>
                                            <FiCalendar className="text-slate-455 w-4 h-4" />
                                        </div>
                                        <input 
                                            type="date"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.setValue(e.target.value);
                                                field.setWarning(false);
                                            }}
                                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
                                        />
                                    </div>
                                    {field.warning && (
                                        <p className="text-[9px] font-bold text-red-500 mt-1 pl-1">Select {field.label.toLowerCase()} date</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* HALF DAY CHECKBOX */}
                        <div>
                            <label className="flex items-center gap-2 cursor-pointer select-none py-1 group w-fit">
                                <div className="relative">
                                    <input 
                                        type="checkbox"
                                        checked={isHalfDay}
                                        onChange={(e) => setIsHalfDay(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center
                                        ${isHalfDay 
                                            ? 'bg-purple-655 border-purple-655 text-white' 
                                            : 'border-slate-300 dark:border-slate-800 group-hover:border-slate-450 dark:group-hover:border-slate-700 bg-transparent'}`}>
                                        {isHalfDay && <FiCheck className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-500 dark:text-[#888A96]">Half day leave</span>
                            </label>
                        </div>

                        {/* EXPLAIN REASON */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#888A96]">Explain Reason for Leave</label>
                            <textarea
                                required
                                rows={3}
                                value={formReason}
                                onChange={(e) => setFormReason(e.target.value)}
                                placeholder="State reason details here..."
                                className="w-full px-4 py-2.5 text-xs rounded-lg border outline-none bg-transparent transition-all border-slate-200 dark:border-[#222429] text-slate-800 dark:text-slate-100 focus:border-[#bf40bf]/60 dark:focus:border-purple-500/60 focus:ring-0 resize-none placeholder-slate-400 dark:placeholder-[#585966]"
                            />
                        </div>

                        {/* ACTIONS BUTTONS FOOTER */}
                        <div className="mt-2 pt-5 border-t border-slate-100 dark:border-[#1D1E24] flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => setActiveTab('Overview')}
                                className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-200 dark:border-[#222429] text-slate-500 dark:text-[#888A96] hover:bg-slate-50 dark:hover:bg-[#1C1D24] transition-all"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (!startDateVal) setShowFromWarning(true)
                                    if (!endDateVal) setShowToWarning(true)
                                    if (!startDateVal || !endDateVal || !formReason.trim()) return
                                    handleFormSubmit()
                                }}
                                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#bf40bf] hover:bg-[#a83ca8] dark:bg-purple-650 dark:hover:bg-purple-600 active:scale-95 transition-all shadow-sm"
                            >
                                Confirm & Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
            TAB CONTENT: MY LEAVES LOG FEED
            ========================================================= */}
            {activeTab === 'My Leaves' && (
                <div className="w-full rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group
                    bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-850/60 shadow-md hover:shadow-xl min-h-[450px]">
                    
                    <div className="flex justify-between items-start z-10 mb-6">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-550">Personal Logs</p>
                            <h3 className="text-base font-black text-slate-800 dark:text-white leading-tight">My Historical Applications</h3>
                        </div>
                    </div>

                    <div className="flex-grow space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-slate-850/50 z-10 max-h-[420px] overflow-y-auto no-scrollbar">
                        {leaveHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-550 pl-0 before:hidden">
                                <FiUmbrella className="w-10 h-10 mb-2 stroke-1" />
                                <p className="text-xs font-bold uppercase tracking-wider">No leave logs recorded yet</p>
                            </div>
                        ) : (
                            leaveHistory.map((item) => {
                                const statusCfg = getStatusCfg(item.status)
                                const Icon = statusCfg.icon
                                const LeaveIcon = getLeaveIcon(item.type)

                                return (
                                    <div key={item.id} className="relative group/timeline animate-scale-up">
                                        <span className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0C0F16] ${statusCfg.glow} z-20 shadow-sm`} />

                                        <div className="p-4 rounded-2xl border transition-all duration-300 bg-slate-50/50 dark:bg-slate-900/10 border-slate-100 dark:border-slate-850/50 hover:border-purple-500/10">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <LeaveIcon className="w-4 h-4 text-purple-650 dark:text-purple-400" />
                                                        <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">{item.type} Application</h4>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
                                                        <span className="text-[10px] text-slate-500 dark:text-slate-500 flex items-center gap-1">
                                                            <FiCalendar className="w-3.5 h-3.5 text-purple-650 dark:text-purple-400/60" />
                                                            <span className="font-semibold uppercase tracking-wider">Duration:</span> {item.duration} ({item.days} d)
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 dark:text-slate-500 flex items-center gap-1">
                                                            <FiClock className="w-3.5 h-3.5 text-slate-400" />
                                                            <span className="font-semibold uppercase tracking-wider">Dates:</span> {item.dates}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-600 dark:text-slate-400 italic mt-1 bg-white/40 dark:bg-[#070A0F]/50 px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-900/30">
                                                        "{item.reason}"
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 sm:flex-shrink-0">
                                                    {item.approver && (
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">Approved By</p>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[8px] font-black flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-300/30">{item.approver.charAt(0)}</span>
                                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350">{item.approver}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <span className={`px-2.5 py-1 rounded-xl border text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm ${statusCfg.color}`}>
                                                        <Icon className="w-3.5 h-3.5" />
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            )}

            {/* =========================================================
            TAB CONTENT: APPROVALS STATUS (PERSONAL TRACKER)
            ========================================================= */}
            {activeTab === 'Approvals' && (
                <div className="w-full rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] min-h-[450px]">
                    
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#585966]">My Approvals Track</p>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight uppercase mt-1">My Requests Endorsements Status</h3>
                        </div>
                    </div>

                    <div className="flex-grow space-y-6 max-h-[420px] overflow-y-auto no-scrollbar">
                        {leaveHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-[#585966]">
                                <FiUmbrella className="w-10 h-10 mb-2 stroke-1 text-slate-350 dark:text-[#2E303B]" />
                                <p className="text-xs font-bold uppercase tracking-wider">No leave requests found to track.</p>
                            </div>
                        ) : (
                            leaveHistory.map((item) => {
                                const isApproved = item.status === 'Approved'
                                const isPending = item.status === 'Pending'
                                const isRejected = item.status === 'Rejected'
                                const LeaveIcon = getLeaveIcon(item.type)

                                return (
                                    <div 
                                        key={item.id} 
                                        className="p-5 rounded-xl border bg-slate-50/50 dark:bg-[#1C1D24]/20 border-slate-100 dark:border-[#1F2128]/50 flex flex-col gap-5"
                                    >
                                        {/* Header detail */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <LeaveIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-800 dark:text-[#E4E6EB]">{item.type} Application</h4>
                                                    <p className="text-[10px] text-slate-500 dark:text-[#888A96] mt-0.5 uppercase tracking-wider font-semibold">
                                                        {item.duration} {item.days > 1 ? `• ${item.days} days` : `• ${item.days} day`}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                                                ${isApproved 
                                                    ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' 
                                                    : isRejected 
                                                        ? 'text-rose-500 border-rose-500/20 bg-rose-500/10' 
                                                        : 'text-amber-500 border-amber-500/20 bg-amber-500/10'}`}>
                                                {isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending Approval'}
                                            </span>
                                        </div>

                                        {/* Workflow Signature Tracker Loop */}
                                        <div className="pt-4 border-t border-slate-100 dark:border-[#1D1E24] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                            
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                                
                                                {/* Workflow steps (Submitted, HR Review, Department Signoff) */}
                                                {[
                                                    { label: 'Submitted', person: 'By You', state: 'done' },
                                                    { label: 'HR Review', person: 'Meera Iyer', state: isApproved ? 'approved' : isRejected ? 'rejected' : 'pending' },
                                                    { label: 'Department Signoff', person: 'Priya Nair', state: isApproved ? 'approved' : isRejected ? 'rejected' : 'inactive' }
                                                ].map((step, idx) => {
                                                    const isDone = step.state === 'done' || step.state === 'approved'
                                                    const isFail = step.state === 'rejected'
                                                    const isAct = step.state === 'pending'
                                                    
                                                    const stepColor = isDone 
                                                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400' 
                                                        : isFail 
                                                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-455' 
                                                            : isAct 
                                                                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400' 
                                                                : 'bg-slate-100 dark:bg-[#1C1D24] border border-slate-200 dark:border-[#222429] text-slate-400 dark:text-[#585966]'
                                                    
                                                    const Icon = isDone ? FiCheck : isFail ? FiX : FiClock

                                                    return (
                                                        <div key={step.label} className="contents">
                                                            <div className="flex items-center gap-2.5">
                                                                <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${stepColor}`}>
                                                                    <Icon className="w-3 h-3" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className="text-[9px] font-bold text-slate-800 dark:text-[#E4E6EB] uppercase leading-none">{step.label}</p>
                                                                    <p className="text-[8px] text-slate-500 dark:text-[#585966] mt-0.5">{step.person}</p>
                                                                </div>
                                                            </div>
                                                            {idx < 2 && <div className="hidden sm:block text-slate-300 dark:text-[#2E303B] text-xs">➔</div>}
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Reason quote */}
                                            <p className="text-[10px] text-slate-500 dark:text-[#888A96] italic max-w-xs text-left bg-slate-50 dark:bg-[#1C1D24]/30 p-2.5 rounded border border-slate-100 dark:border-[#222429]/60 w-full lg:w-auto">
                                                "{item.reason}"
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Leave
