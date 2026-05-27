import { useState, useEffect, useRef } from 'react'
import {
    FiLogIn,
    FiLogOut,
    FiMapPin,
    FiAlertTriangle,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiCheck,
    FiPlus,
    FiTrash2,
    FiEye,
    FiEyeOff,
    FiClock,
    FiX
} from 'react-icons/fi'

/**
 * Dashboard Component
 * Premium dual-theme Check-In tracker and interactive monthly calendar.
 * Perfectly styled with rich aesthetics, glassmorphism, hover transitions, and state management.
 */
function Dashboard({
    isDark,
    isCheckedIn: parentCheckedIn,
    checkInTime: parentCheckInTime,
    handleCheckIn: parentHandleCheckIn
}) {
    // ==========================================
    // 1. COMPONENT STATES
    // ==========================================
    // Check-In State: 'not_checked_in' | 'working' | 'done'
    const [checkInStatus, setCheckInStatus] = useState('not_checked_in')
    const [checkInTime, setCheckInTime] = useState('')
    const [checkOutTime, setCheckOutTime] = useState('')
    const [timerSeconds, setTimerSeconds] = useState(0)

    // Real-time Date state
    const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 26)) // Hardcoded to matches Tuesday, 26 May 2026
    const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 4, 1)) // May 2026

    const timerRef = useRef(null)

    // ==========================================
    // TASK MANAGER STATE & ACTION HANDLERS
    // ==========================================
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Task 1: Design Premium UI/UX Guidelines",
            assignedDate: "25 May 2026",
            dueDate: "29 May 2026",
            description: "Create premium high-fidelity wireframes and establish the global design tokens, color palette, and micro-animations for the Attendance Tracker application."
        },
        {
            id: 2,
            name: "Task 2: Integrate Interactive Calendar API",
            assignedDate: "26 May 2026",
            dueDate: "01 Jun 2026",
            description: "Connect the frontend interactive monthly calendar grid with Google Calendar and local logs to fetch real-time employee attendance events dynamically."
        },
        {
            id: 3,
            name: "Task 3: Refactor State Management & Auth Flow",
            assignedDate: "26 May 2026",
            dueDate: "28 May 2026",
            description: "Migrate the active worker session states and global theme provider to a centralized context API to resolve synchronization bugs."
        }
    ])
    const [openDescriptionId, setOpenDescriptionId] = useState(null)
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskAssignedDate, setNewTaskAssignedDate] = useState('27 May 2026')
    const [newTaskDueDate, setNewTaskDueDate] = useState('')
    const [newTaskDesc, setNewTaskDesc] = useState('')

    const toggleDescription = (id) => {
        setOpenDescriptionId(prev => prev === id ? null : id)
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        if (!newTaskName.trim() || !newTaskDueDate.trim() || !newTaskDesc.trim()) return

        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
        const newTask = {
            id: newId,
            name: newTaskName,
            assignedDate: newTaskAssignedDate || "27 May 2026",
            dueDate: newTaskDueDate,
            description: newTaskDesc
        }

        setTasks(prev => [...prev, newTask])
        // Reset form fields
        setNewTaskName('')
        setNewTaskDueDate('')
        setNewTaskDesc('')
        setShowAddTaskForm(false)
    }

    const handleDeleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
        if (openDescriptionId === id) {
            setOpenDescriptionId(null)
        }
    }

    // ==========================================
    // 2. EFFECT FOR RUNNING ACTIVE WORKER TIMER
    // ==========================================
    useEffect(() => {
        if (checkInStatus === 'working') {
            timerRef.current = setInterval(() => {
                setTimerSeconds(prev => prev + 1)
            }, 1000)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [checkInStatus])

    // Sync with parent checked in state if available
    useEffect(() => {
        if (parentCheckedIn && checkInStatus === 'not_checked_in') {
            setCheckInStatus('working')
            setCheckInTime(parentCheckInTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))
        } else if (!parentCheckedIn && checkInStatus === 'working') {
            setCheckInStatus('not_checked_in')
        }
    }, [parentCheckedIn])

    // ==========================================
    // 3. ACTION HANDLERS
    // ==========================================
    const handleCheckInAction = () => {
        const now = new Date()
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

        setCheckInStatus('working')
        setCheckInTime(timeStr)
        setTimerSeconds(0)

        if (parentHandleCheckIn && !parentCheckedIn) {
            parentHandleCheckIn()
        }
    }

    const handleCheckOutAction = () => {
        const now = new Date()
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

        setCheckInStatus('done')
        setCheckOutTime(timeStr)

        if (parentHandleCheckIn && parentCheckedIn) {
            parentHandleCheckIn() // Toggles off checked in state in parent log
        }
    }

    // ==========================================
    // 4. TIMER FORMATTING UTILITY
    // ==========================================
    const formatTimer = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600)
        const mins = Math.floor((totalSecs % 3600) / 60)
        const secs = totalSecs % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getElapsedHoursMinsStr = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600)
        const mins = Math.floor((totalSecs % 3600) / 60)
        return `${hrs}h ${mins}m`
    }

    // ==========================================
    // 5. CALENDAR DATA GENERATION (May 2026)
    // ==========================================
    const monthName = calendarMonth.toLocaleString('default', { month: 'long' })
    const yearName = calendarMonth.getFullYear()

    // Attendance dot status mapping for May 2026
    const attendanceMock = {
        1: 'present',  // Green dot
        2: 'late',     // Amber dot
        3: 'present',  // Green dot
        4: 'leave',    // Gray dot
        7: 'present',  // Green dot
        8: 'present',  // Green dot
        9: 'absent',   // Red dot
        10: 'present', // Green dot
        11: 'today',   // Blue dot
        14: 'present', // Green dot
        15: 'present', // Green dot
        16: 'present', // Green dot
        17: 'late',    // Amber dot
        18: 'present', // Green dot
        21: 'present', // Green dot
        22: 'present', // Green dot
    }

    const getDaysInMonth = () => {
        const year = calendarMonth.getFullYear()
        const month = calendarMonth.getMonth()
        const firstDayIndex = new Date(year, month, 1).getDay()
        const totalDays = new Date(year, month + 1, 0).getDate()

        const days = []
        // Pad with empty spots for preceding month
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(null)
        }
        // Fill active days
        for (let d = 1; d <= totalDays; d++) {
            days.push(d)
        }
        return days
    }

    const daysGrid = getDaysInMonth()

    // Navigation handlers
    const prevMonth = () => {
        setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch animate-fade-in select-none">
            <style>{`
                @keyframes ripple-pulse {
                    0% {
                        transform: scale(0.9);
                        opacity: 0.75;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1.75);
                        opacity: 0;
                    }
                }
                .concentric-pulse {
                    animation: ripple-pulse 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
                }
                .pulse-delay-1 {
                    animation-delay: 0.9s;
                }
                .pulse-delay-2 {
                    animation-delay: 1.8s;
                }
                /* Invisible scrollbar utility */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* =========================================================
          LEFT COLUMN: PREMIUM CHECK-IN DRAWER / CARD (Cols: 5/12)
          ========================================================= */}
            <div className="lg:col-span-5 flex">
                <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300 relative overflow-hidden group
          bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl
          hover:border-[#bf40bf]/30 dark:hover:border-purple-900/30">

                    {/* Subtle Ambient Glow overlay (Checked In: glowing green, Checkout: glowing blue, Not Checked In: glowing purple) */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none transition-all duration-700
            ${checkInStatus === 'not_checked_in' && 'bg-purple-600/[0.04] dark:bg-purple-600/5 group-hover:scale-125'}
            ${checkInStatus === 'working' && 'bg-emerald-600/[0.04] dark:bg-emerald-600/5 group-hover:scale-125'}
            ${checkInStatus === 'done' && 'bg-blue-600/[0.04] dark:bg-blue-600/5 group-hover:scale-125'}
          `} />

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
                            {checkInStatus === 'not_checked_in' && (
                                <span className="px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm
                  bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 text-slate-500 dark:text-slate-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-450 dark:bg-slate-500 animate-pulse" />
                                    Not checked in
                                </span>
                            )}
                            {checkInStatus === 'working' && (
                                <span className="px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm
                  bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-450">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                    Working
                                </span>
                            )}
                            {checkInStatus === 'done' && (
                                <span className="px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm
                  bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-550 dark:bg-blue-400" />
                                    Done for today
                                </span>
                            )}
                        </div>
                    </div>

                    {/* MIDDLE CLOCK / HOURS SECTION */}
                    <div className="flex flex-col items-center justify-center py-6 text-center z-10 gap-2 flex-grow">
                        {checkInStatus !== 'done' ? (
                            <>
                                {/* Big Digital Timer Display */}
                                <h1 className={`text-5xl font-black font-mono tracking-wider leading-none transition-colors duration-500
                  ${checkInStatus === 'working' ? 'text-emerald-550 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-650'}`}>
                                    {formatTimer(timerSeconds)}
                                </h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    {checkInStatus === 'working' ? 'Time elapsed since check-in' : 'Your timer starts when you check in'}
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
                            {checkInStatus === 'not_checked_in' && (
                                <div className="relative flex items-center justify-center w-56 h-56">
                                    {/* Concentric ripples */}
                                    <div className="absolute w-full h-full rounded-full border-2 border-[#bf40bf]/30 dark:border-purple-500/25 concentric-pulse pointer-events-none" />
                                    <div className="absolute w-full h-full rounded-full border-2 border-[#bf40bf]/20 dark:border-purple-500/15 concentric-pulse pulse-delay-1 pointer-events-none" />
                                    <div className="absolute w-full h-full rounded-full border-2 border-[#bf40bf]/10 dark:border-purple-500/5 concentric-pulse pulse-delay-2 pointer-events-none" />

                                    <button
                                        onClick={handleCheckInAction}
                                        className="w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-slate-850/60 p-1.5 hover:scale-105 active:scale-95 transition-all duration-300 group/btn bg-slate-50/50 dark:bg-slate-900/10 z-10">
                                        <div className="w-full h-full rounded-full bg-[#bf40bf] dark:bg-purple-650 flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all">
                                            <FiLogIn className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" />
                                            <span className="text-[11px] font-black uppercase tracking-wider">Check In</span>
                                        </div>
                                    </button>
                                </div>
                            )}

                            {checkInStatus === 'working' && (
                                <button
                                    onClick={handleCheckOutAction}
                                    className="w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-red-950/60 p-1.5 hover:scale-105 active:scale-95 transition-all duration-300 group/btn bg-slate-50/50 dark:bg-slate-900/10">
                                    <div className="w-full h-full rounded-full bg-rose-600 dark:bg-rose-650 flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all">
                                        <FiLogOut className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                                        <span className="text-[11px] font-black uppercase tracking-wider">Check Out</span>
                                    </div>
                                </button>
                            )}

                            {checkInStatus === 'done' && (
                                <div className="flex flex-col items-center gap-4 animate-scale-up">
                                    {/* Glowing success checkbox */}
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-md">
                                        <FiCheck className="w-8 h-8 animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-850 dark:text-white leading-tight">
                                            Great work today!
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            See you tomorrow 🌙
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LOWER LOGS BOX & FOOTER SECTION */}
                    <div className="space-y-4 z-10">
                        {/* Checked In card detail card */}
                        {checkInStatus !== 'not_checked_in' && (
                            <div className="p-4 rounded-2xl border transition-all duration-300 animate-fade-in
                bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-850/60">

                                {checkInStatus === 'working' ? (
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Checked in
                                            </p>
                                            <p className="text-sm font-black text-slate-800 dark:text-white">
                                                {checkInTime}
                                            </p>
                                        </div>
                                        {/* Late badge pill */}
                                        <span className="px-2.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-405 text-[8px] font-black uppercase tracking-wider">
                                            Late
                                        </span>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-850/50">
                                        <div className="space-y-0.5 text-left pr-4">
                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Checked in
                                            </p>
                                            <p className="text-sm font-black text-slate-850 dark:text-white flex items-center gap-1.5">
                                                {checkInTime}
                                                <span className="px-1.5 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[7px] font-black uppercase">
                                                    Late
                                                </span>
                                            </p>
                                        </div>
                                        <div className="space-y-0.5 text-left pl-4">
                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Checked out
                                            </p>
                                            <p className="text-sm font-black text-slate-850 dark:text-white">
                                                {checkOutTime}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Captures geolocation metadata footer */}
                        <div className="flex items-center justify-center gap-1.5 text-center">
                            {checkInStatus === 'not_checked_in' ? (
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
            </div>

            {/* =========================================================
          RIGHT COLUMN: PREMIUM TASK MANAGER SECTION (Cols: 7/12)
          ========================================================= */}
            <div className="lg:col-span-7 flex">
                <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300 relative overflow-hidden group
          bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl
          hover:border-[#bf40bf]/30 dark:hover:border-purple-900/30">

                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-purple-600/[0.04] dark:bg-purple-600/5 group-hover:scale-125 transition-all duration-700" />

                    {/* TOP HEADER SECTION */}
                    <div>
                        <div className="flex justify-between items-center z-10 mb-4">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Organization Tasks
                                </p>
                                <h3 className="text-lg font-black text-slate-850 dark:text-white leading-tight">
                                    Task Manager
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* TASKS LIST CONTAINER (Scrollable with invisible scrollbar) */}
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[380px] space-y-3 z-10 pr-0.5">
                        {tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500">
                                <FiCheck className="w-10 h-10 mb-2 stroke-1" />
                                <p className="text-xs font-bold uppercase tracking-wider">All tasks completed!</p>
                            </div>
                        ) : (
                            tasks.map((task) => {
                                const isExpanded = openDescriptionId === task.id;
                                return (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleDescription(task.id)}
                                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none
                                            bg-slate-50/50 dark:bg-slate-900/20 border-slate-200/80 dark:border-slate-850/60
                                            hover:border-[#bf40bf]/30 dark:hover:border-purple-500/30 hover:bg-slate-100/30 dark:hover:bg-slate-900/40
                                            ${isExpanded ? 'border-[#bf40bf]/30 dark:border-purple-500/30 bg-slate-100/30 dark:bg-slate-900/40 shadow-inner' : ''}`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-black text-slate-850 dark:text-white leading-tight">
                                                    {task.name}
                                                </h4>

                                                {/* Dates Row */}
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                                                    <span className="text-[10px] text-slate-450 dark:text-slate-500 flex items-center gap-1">
                                                        <FiCalendar className="w-3 h-3 text-[#bf40bf]/60 dark:text-purple-400/60" />
                                                        <span className="font-semibold uppercase tracking-wider">Assigned:</span> {task.assignedDate}
                                                    </span>
                                                    <span className="text-[10px] text-slate-450 dark:text-slate-500 flex items-center gap-1">
                                                        <FiClock className="w-3 h-3 text-rose-500/60" />
                                                        <span className="font-semibold uppercase tracking-wider text-rose-600/70 dark:text-rose-450/70">Due:</span> {task.dueDate}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Expand/Collapse Chevron Indicator */}
                                            <div className={`transition-transform duration-300 mt-0.5 text-slate-400 dark:text-slate-500 ${isExpanded ? '-rotate-90 text-[#bf40bf] dark:text-purple-400' : 'rotate-0'}`}>
                                                <FiChevronLeft className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Expandable description block */}
                                        {isExpanded && (
                                            <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-[#070A0F] border border-slate-100 dark:border-slate-850/40 text-[11px] text-slate-650 dark:text-slate-400 leading-relaxed animate-fade-in shadow-inner">
                                                {task.description}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* FOOTER WIDGET */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-850/30 z-10 text-[9px] font-bold text-slate-450 dark:text-slate-500">
                        <span>Total: {tasks.length} active tasks</span>
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bf40bf] animate-pulse" />
                            Live sync active
                        </span>
                    </div>

                </div>
            </div>

            {/* =========================================================
          BOTTOM COLUMN: GORGEOUS MONTHLY CALENDAR GRID (Cols: 12/12)
          ========================================================= */}
            <div className="lg:col-span-12 flex">
                <div className="w-full rounded-3xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300 relative overflow-hidden group
          bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl
          hover:border-[#bf40bf]/30 dark:hover:border-purple-900/30">

                    {/* Header row: month label + navigation buttons */}
                    <div className="flex items-center justify-between z-10">
                        {/* Left Month arrow */}
                        <button
                            onClick={prevMonth}
                            className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200
                bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-850/60 text-slate-550 dark:text-slate-400 
                hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-850 dark:hover:text-white">
                            <FiChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="text-center flex flex-col items-center">
                            <h3 className="text-base font-extrabold text-slate-850 dark:text-white tracking-tight">
                                {monthName} {yearName}
                            </h3>
                            {/* This Month pill */}
                            <span className="px-2 py-0.5 rounded-full mt-1.5 border bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-wider shadow-sm">
                                This month
                            </span>
                        </div>

                        {/* Right Month arrow */}
                        <button
                            onClick={nextMonth}
                            className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200
                bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-850/60 text-slate-550 dark:text-slate-400 
                hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-850 dark:hover:text-white">
                            <FiChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* WEEKDAY LABEL HEADERS */}
                    <div className="grid grid-cols-7 gap-1 mt-6 text-center z-10">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                            <span key={day} className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500">
                                {day}
                            </span>
                        ))}
                    </div>

                    {/* DATES GRID CELL CONTAINER */}
                    <div className="grid grid-cols-7 gap-y-4 gap-x-1 mt-4 text-center z-10 flex-grow content-start">
                        {daysGrid.map((dayNum, index) => {
                            if (dayNum === null) {
                                return <div key={`empty-${index}`} className="aspect-square" />
                            }

                            // Determine status dot of this day
                            let status = attendanceMock[dayNum]

                            // Handle dynamically tracking today (May 26th) status
                            const isToday = dayNum === 26
                            if (isToday) {
                                if (checkInStatus === 'working') {
                                    status = 'working'
                                } else if (checkInStatus === 'done') {
                                    status = 'present'
                                } else {
                                    status = 'today' // Normal pulsing outline
                                }
                            }

                            return (
                                <div
                                    key={`day-${dayNum}`}
                                    className={`aspect-square flex flex-col justify-center items-center rounded-2xl relative cursor-pointer group/cell select-none transition-all duration-300
                    ${isToday
                                            ? 'border border-[#bf40bf]/40 bg-[#bf40bf]/5 dark:bg-purple-500/5'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                        }`}
                                >
                                    {/* Date label */}
                                    <span className={`text-xs font-bold leading-none transition-colors duration-200
                    ${isToday
                                            ? 'text-[#bf40bf] dark:text-purple-400 font-extrabold scale-110'
                                            : 'text-slate-850 dark:text-slate-200 group-hover/cell:text-[#bf40bf] dark:group-hover/cell:text-purple-400'
                                        }`}>
                                        {dayNum}
                                    </span>

                                    {/* Dynamic indicator dots (Perfect sizing and color palette) */}
                                    <div className="h-1.5 flex items-center justify-center mt-1">
                                        {status === 'present' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-450 shadow-sm shadow-emerald-500/40" />
                                        )}
                                        {status === 'working' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                                        )}
                                        {status === 'late' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shadow-sm shadow-amber-500/40" />
                                        )}
                                        {status === 'absent' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-450 shadow-sm shadow-rose-500/40" />
                                        )}
                                        {status === 'leave' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                                        )}
                                        {status === 'today' && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#bf40bf] dark:bg-purple-400 animate-pulse shadow-sm shadow-purple-500/40" />
                                        )}
                                    </div>

                                    {/* Hover visual highlight bar at absolute bottom */}
                                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-[#bf40bf] dark:bg-purple-400 transition-all duration-300 group-hover/cell:w-4" />
                                </div>
                            )
                        })}
                    </div>

                    {/* LEGEND BADGES BAR */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-850/30 z-10">
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                            Present
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm" />
                            Late
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm" />
                            Absent
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shadow-sm" />
                            Holiday/Leave
                        </span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dashboard