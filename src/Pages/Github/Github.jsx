import { useState, useEffect } from 'react'
import {
    FiGithub,
    FiGitCommit,
    FiGitBranch,
    FiActivity,
    FiCode,
    FiClock,
    FiZap,
    FiCheckCircle,
    FiRefreshCw,
    FiTrendingUp,
    FiLink2
} from 'react-icons/fi'

/**
 * Github Component
 * Premium, interactive, and gamified "Proof of Work" GitHub Integration dashboard.
 * Designed with precise color tokens from Attendifys Design System (README.md).
 */
function Github() {
    // Sync and connection states
    const [username, setUsername] = useState('jiteshgoodboy0109-jit')
    const [isSyncing, setIsSyncing] = useState(false)
    const [isConnected, setIsConnected] = useState(true)
    const [syncStep, setSyncStep] = useState(0)

    // Hover states for heatmap details
    const [hoveredCell, setHoveredCell] = useState(null)

    // Simulation steps for connection loader
    const syncMessages = [
        'Connecting to GitHub OAuth Gateway...',
        'Fetching commit hashes and branches...',
        'Analyzing code metrics and files...',
        'Syncing "Proof of Work" Attendance records...',
        'Calculated developer velocity score: 98%'
    ]

    const triggerSync = () => {
        setIsSyncing(true)
        setSyncStep(0)
    }

    // Handle syncing animation sequencing
    useEffect(() => {
        if (!isSyncing) return
        const interval = setInterval(() => {
            setSyncStep((prev) => {
                if (prev >= syncMessages.length - 1) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsSyncing(false)
                        setIsConnected(true)
                    }, 800)
                    return prev
                }
                return prev + 1
            })
        }, 900)
        return () => clearInterval(interval)
    }, [isSyncing])

    // Custom data arrays for contribution matrix (53 weeks x 7 days)
    const daysOfWeek = ['', 'Mon', '', 'Wed', '', 'Fri', '']

    // Generating authentic 53-week contribution data matching the screenshot
    const generateContributionData = () => {
        const grid = []
        for (let w = 0; w < 53; w++) {
            const week = []
            for (let d = 0; d < 7; d++) {
                let level = 0 // default empty cell
                let commits = 0

                // Inactive period (Jun to Jan)
                if (w < 35) {
                    // One single green cell in November: Week 23, Day 1 (Monday)
                    if (w === 23 && d === 1) {
                        level = 2
                        commits = 3
                    }
                    // One single green cell in January: Week 32, Day 5 (Friday)
                    else if (w === 32 && d === 5) {
                        level = 2
                        commits = 3
                    }
                }
                // Active cluster period (Feb to May)
                else {
                    // Weekly activity configuration to match the screenshot
                    if (w === 35) { // Early Feb
                        if (d === 1 || d === 3 || d === 5) { level = 2; commits = 3; }
                        else if (d === 4) { level = 1; commits = 1; }
                    }
                    else if (w === 36) { // Mid Feb (highly active vertical column)
                        if (d === 0) { level = 3; commits = 5; }
                        else if (d === 1) { level = 4; commits = 7; }
                        else if (d === 3) { level = 2; commits = 3; }
                        else if (d === 4) { level = 3; commits = 4; }
                        else if (d === 5) { level = 2; commits = 3; }
                    }
                    else if (w === 37) { // Late Feb
                        if (d === 1 || d === 2 || d === 4 || d === 5) { level = 2; commits = 2; }
                    }
                    else if (w === 38) { // End of Feb (Mon has neon green cell)
                        if (d === 1) { level = 4; commits = 8; }
                        else if (d === 3) { level = 2; commits = 3; }
                        else if (d === 5) { level = 1; commits = 1; }
                    }
                    else if (w === 39) { // Early Mar
                        if (d === 1 || d === 2) { level = 2; commits = 2; }
                    }
                    else if (w === 40) { // Mid Mar
                        if (d === 1) { level = 2; commits = 3; }
                        else if (d === 2) { level = 3; commits = 5; }
                    }
                    else if (w === 41) { // Late Mar
                        if (d === 0) { level = 2; commits = 2; }
                    }
                    else if (w === 42) { // End of Mar
                        if (d === 1) { level = 1; commits = 1; }
                    }
                    else if (w === 43) { // Early Apr
                        if (d === 0) { level = 2; commits = 3; }
                        else if (d === 3) { level = 1; commits = 1; }
                    }
                    else if (w === 44) { // Mid Apr
                        if (d === 1 || d === 2 || d === 3) { level = 2; commits = 2; }
                    }
                    else if (w === 45) { // Mid-Late Apr
                        if (d === 1) { level = 2; commits = 3; }
                        else if (d === 3) { level = 3; commits = 5; }
                        else if (d === 5) { level = 2; commits = 3; }
                    }
                    else if (w === 46) { // Late Apr
                        if (d === 1 || d === 3) { level = 1; commits = 1; }
                        else if (d === 4) { level = 2; commits = 2; }
                        else if (d === 5) { level = 4; commits = 7; }
                    }
                    else if (w === 47) { // End of Apr
                        if (d === 1) { level = 3; commits = 4; }
                        else if (d === 2) { level = 1; commits = 1; }
                        else if (d === 3) { level = 2; commits = 2; }
                        else if (d === 5) { level = 3; commits = 4; }
                    }
                    else if (w === 48) { // Early May
                        if (d === 1) { level = 3; commits = 5; }
                        else if (d === 2) { level = 2; commits = 3; }
                        else if (d === 3) { level = 1; commits = 1; }
                    }
                    else if (w === 49) { // Mid May
                        if (d === 1) { level = 2; commits = 3; }
                        else if (d === 2) { level = 4; commits = 8; }
                        else if (d === 3) { level = 3; commits = 5; }
                        else if (d === 5) { level = 2; commits = 2; }
                    }
                    else if (w === 50) { // Mid-Late May
                        if (d === 0) { level = 1; commits = 1; }
                        else if (d === 1) { level = 2; commits = 3; }
                        else if (d === 2) { level = 3; commits = 4; }
                        else if (d === 3) { level = 2; commits = 2; }
                        else if (d === 5) { level = 2; commits = 3; }
                    }
                    else if (w === 51) { // Late May (Active end of month)
                        if (d === 0) { level = 2; commits = 2; }
                        else if (d === 1) { level = 3; commits = 4; }
                        else if (d === 2) { level = 2; commits = 3; }
                        else if (d === 3) { level = 1; commits = 1; }
                        else if (d === 4) { level = 2; commits = 2; }
                        else if (d === 5) { level = 2; commits = 3; }
                    }
                    else if (w === 52) { // Last week of May (Neon cell on Monday)
                        if (d === 1) { level = 4; commits = 7; }
                        else if (d === 2) { level = 2; commits = 2; }
                    }
                }

                week.push({ level, commits, date: getMockDateString(w, d) })
            }
            grid.push(week)
        }
        return grid
    }

    // Calculate mock dates back from today for tooltips
    const getMockDateString = (weekIdx, dayIdx) => {
        const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
        const dateNum = (dayIdx + (weekIdx * 7)) % 28 + 1
        const monthName = months[Math.min(Math.floor((weekIdx / 53) * 12), 11)]
        return `${dateNum} ${monthName} 2025`
    }

    const contributionGrid = generateContributionData()

    // Dynamic list of mock commit activities
    const recentCommits = [
        {
            id: 'c1',
            repo: 'Attendance_Tracker_Frontend',
            branch: 'main',
            message: 'feat: integrated digital clock and checked-in live states',
            time: '2 hours ago',
            impact: '+48 / -12 lines',
            type: 'high',
            hash: '9a2f77c'
        },
        {
            id: 'c2',
            repo: 'Attendance_Tracker_Frontend',
            branch: 'main',
            message: 'refactor: converted dashboard graphs to responsive viewports',
            time: '5 hours ago',
            impact: '+118 / -34 lines',
            type: 'high',
            hash: '7757885'
        },
        {
            id: 'c3',
            repo: 'Attendance_Tracker_Frontend',
            branch: 'dev',
            message: 'fix: corrected dark-mode border colors and alignment gaps',
            time: 'Yesterday',
            impact: '+8 / -3 lines',
            type: 'low',
            hash: '4c968e0'
        },
        {
            id: 'c4',
            repo: 'Attendance_Tracker_Backend',
            branch: 'main',
            message: 'docs: documented authentication controllers and token flow APIs',
            time: '2 days ago',
            impact: '+22 / -0 lines',
            type: 'medium',
            hash: '8f12a3d'
        }
    ]

    return (
        <div className="space-y-8 animate-fade-in relative text-[#24292F] dark:text-[#F0F6FC]">
            {/* Ambient background glows for premium styling */}
            <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#8250DF]/[0.03] dark:bg-[#8957E5]/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#2DA44E]/[0.02] dark:bg-[#238636]/[0.03] rounded-full blur-[110px] pointer-events-none" />

            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#24292F] dark:text-[#F0F6FC] tracking-tight flex items-center gap-3">
                        <FiGithub className="w-7 h-7 text-[#8250DF] dark:text-[#8957E5]" />
                        GitPulse Dev Sync
                    </h1>
                    <p className="text-xs text-[#6E7781] dark:text-[#8B949E] mt-1 uppercase tracking-widest font-semibold">
                        Bridging Git Contributions & Realtime Attendance Verification
                    </p>
                </div>

                {/* Dynamic connection indicator pill */}
                <div className="flex items-center gap-3">
                    {isConnected && !isSyncing && (
                        <span className="px-3 py-1.5 rounded-xl bg-[#E6F4EA] dark:bg-[#238636]/10 border border-[#3FBF5F]/20 dark:border-[#3FB950]/20 text-[#2DA44E] dark:text-[#3FB950] text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#2DA44E] dark:bg-[#3FB950] animate-ping" />
                            Pulse Active
                        </span>
                    )}
                    <button
                        onClick={triggerSync}
                        disabled={isSyncing}
                        className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] active:scale-95 disabled:opacity-50"
                    >
                        <FiRefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#8250DF] dark:text-[#8957E5]' : ''}`} />
                        {isSyncing ? 'Syncing...' : 'Force Sync'}
                    </button>
                </div>
            </div>

            {/* SYNCING INTERACTION VIEW */}
            {isSyncing ? (
                <div className="p-8 rounded-2xl border bg-[#F3F4F6]/75 dark:bg-[#161B22]/75 border-[#D0D7DE] dark:border-[#30363D] shadow-lg min-h-[350px] flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md">
                    {/* Glass neon ring */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#8250DF]/20 dark:border-[#8957E5]/20 animate-spin" style={{ animationDuration: '8s' }} />
                        <div className="absolute inset-2 rounded-full border-4 border-[#8250DF] dark:border-[#8957E5] border-t-transparent animate-spin" />
                        <FiGithub className="w-8 h-8 text-[#8250DF] dark:text-[#8957E5]" />
                    </div>

                    <div className="mt-8 text-center space-y-2 z-10 max-w-sm">
                        <h3 className="text-base font-bold text-[#24292F] dark:text-[#F0F6FC]">Connecting Developer Profile</h3>
                        <div className="h-6 flex items-center justify-center">
                            <p className="text-xs text-[#8250DF] dark:text-[#A371F7] font-mono tracking-tight animate-pulse transition-all">
                                {syncMessages[syncStep]}
                            </p>
                        </div>
                        {/* Visual progress bar */}
                        <div className="w-48 h-1.5 bg-[#EBEDF0] dark:bg-[#21262D] rounded-full mx-auto overflow-hidden mt-3 border border-[#D0D7DE]/40 dark:border-[#30363D]/40">
                            <div
                                className="h-full bg-gradient-to-r from-[#8250DF] to-[#0969DA] rounded-full transition-all duration-300"
                                style={{ width: `${((syncStep + 1) / syncMessages.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* COLUMN GRID A: CONNECT DETAILS & STREAK STATUS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

                        {/* CARD 1: Developer Profile Connector Card */}
                        <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm hover:border-[#8250DF]/40 dark:hover:border-[#8957E5]/40 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#8250DF]/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] dark:bg-[#8957E5]/10 border border-[#DBB4FE]/30 dark:border-[#8957E5]/20 text-[#8250DF] dark:text-[#8957E5] flex items-center justify-center">
                                        <FiGithub className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC]">Github Connector</h2>
                                        <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest font-black">Authorized</p>
                                    </div>
                                </div>

                                {isConnected ? (
                                    <div className="space-y-3.5">
                                        {/* Input to change profile */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="username"
                                                className="flex-1 px-3 py-1.5 text-xs rounded-lg border outline-none transition-all duration-300 bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:border-[#0969DA] dark:focus:border-[#1F6FEB] focus:ring-1 focus:ring-[#0969DA]/20"
                                            />
                                            <button
                                                onClick={() => setIsConnected(false)}
                                                className="px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider border rounded-lg bg-[#FEF2F2] dark:bg-[#F85149]/10 border-[#CF222E]/25 dark:border-[#F85149]/20 text-[#CF222E] dark:text-[#F85149] hover:bg-[#FFDCE0] dark:hover:bg-[#F85149]/20 transition-all active:scale-95"
                                            >
                                                Disconnect
                                            </button>
                                        </div>

                                        {/* Brief stats */}
                                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EAEDEF] dark:border-[#21262D]">
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Repos</p>
                                                <p className="text-sm font-black text-[#24292F] dark:text-[#F0F6FC] mt-0.5">38</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Commits</p>
                                                <p className="text-sm font-black text-[#24292F] dark:text-[#F0F6FC] mt-0.5">171</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Score</p>
                                                <p className="text-sm font-black text-[#2DA44E] dark:text-[#3FB950] mt-0.5">98%</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3 pt-2">
                                        <p className="text-[11px] text-[#6E7781] dark:text-[#8B949E]">Connect your GitHub profile to unlock Commit-Driven Attendance Sync verification.</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Enter Username"
                                                className="flex-1 px-3 py-1.5 text-xs rounded-lg border outline-none bg-[#FFFFFF] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:border-[#0969DA]"
                                            />
                                            <button
                                                onClick={triggerSync}
                                                className="px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg bg-[#2DA44E] dark:bg-[#238636] hover:bg-[#2C974B] dark:hover:bg-[#2EA043] text-white shadow-md active:scale-95 transition-all"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CARD 2: Proof of Work Streak Card */}
                        <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm hover:border-[#8250DF]/40 dark:hover:border-[#8957E5]/40 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FB8500]/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />

                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC]">Proof of Work Boost</h2>
                                    <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest font-black">Commit Attendance</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#FFF8E5] dark:bg-[#D29922]/10 border border-[#FB8500]/20 dark:border-[#D29922]/20 text-[#FB8500] dark:text-[#D29922] flex items-center justify-center shadow-inner">
                                    <FiZap className="w-5 h-5 fill-[#FB8500] dark:fill-[#D29922] animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex items-baseline gap-1.5">
                                    <p className="text-4xl font-black text-[#24292F] dark:text-[#F0F6FC] tracking-tight leading-none">12</p>
                                    <p className="text-xs font-bold text-[#FB8500] dark:text-[#D29922] uppercase tracking-wide">Days Streak</p>
                                </div>
                                <div className="w-full h-1.5 bg-[#EBEDF0] dark:bg-[#21262D] rounded-full overflow-hidden border border-[#D0D7DE]/40 dark:border-[#30363D]/40">
                                    <div className="h-full bg-gradient-to-r from-[#FB8500] to-[#D4A72C] rounded-full shadow-[0_0_8px_rgba(251,133,0,0.4)]" style={{ width: '82%' }} />
                                </div>
                                <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] font-semibold">1 commit needed tomorrow to maintain multiplier streak.</p>
                            </div>

                            <div className="pt-3 border-t border-[#EAEDEF] dark:border-[#21262D] flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-wider text-[#2DA44E] dark:text-[#3FB950] bg-[#E6F4EA] dark:bg-[#238636]/10 px-2 py-0.5 rounded-full border border-[#3FBF5F]/20 dark:border-[#3FB950]/20 flex items-center gap-1.5">
                                    <FiCheckCircle className="w-3 h-3" /> Verified Active
                                </span>
                                <span className="text-[10px] font-black text-[#6E7781] dark:text-[#8B949E] tracking-widest uppercase">Boost: 1.5x</span>
                            </div>
                        </div>

                        {/* CARD 3: System Insights Gauge */}
                        <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm hover:border-[#8250DF]/40 dark:hover:border-[#8957E5]/40 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#2DA44E]/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />

                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC]">Active Productivity</h2>
                                    <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest font-black">Velocity Statistics</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#E6F4EA] dark:bg-[#238636]/10 border border-[#3FBF5F]/20 dark:border-[#238636]/20 text-[#2DA44E] dark:text-[#3FB950] flex items-center justify-center">
                                    <FiActivity className="w-5 h-5 animate-pulse" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-3">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Active Coding Hours</p>
                                    <p className="text-base font-extrabold text-[#24292F] dark:text-[#F0F6FC] flex items-center gap-1.5">
                                        <FiClock className="w-4 h-4 text-[#8250DF] dark:text-[#A371F7]" /> 4.2 hrs
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Average Quality</p>
                                    <p className="text-base font-extrabold text-[#24292F] dark:text-[#F0F6FC] flex items-center gap-1.5">
                                        <FiTrendingUp className="w-4 h-4 text-[#2DA44E] dark:text-[#3FB950]" /> 96.4%
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-[#EAEDEF] dark:border-[#21262D] flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#0969DA] dark:bg-[#1F6FEB]" />
                                    <span className="text-[9px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase">Language: React</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-black text-[#8250DF] dark:text-[#A371F7]">
                                    <FiCode className="w-3.5 h-3.5" /> View Matrix
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECTION B: AUTHENTIC 53-WEEK CONTRIBUTION CALENDAR CONTAINER */}
                    <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-md relative overflow-hidden group">

                        {/* Top Row: Title and Settings Option */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10 relative">
                            <h3 className="text-sm font-normal text-[#24292F] dark:text-[#C9D1D9] leading-snug">
                                171 contributions in the last year
                            </h3>

                            <button className="text-[11px] text-[#6E7781] dark:text-[#8B949E] hover:text-[#0969DA] dark:hover:text-[#58A6FF] transition-colors flex items-center gap-1">
                                Contribution settings <span className="text-[8px]">▼</span>
                            </button>
                        </div>

                        {/* Inner Calendar Border Wrap */}
                        <div className="border border-[#D0D7DE] dark:border-[#30363D] rounded-lg p-5 bg-[#F6F8FA]/50 dark:bg-[#0D1117] z-10 relative">

                            {/* Outer Horizontal scroll wrapper to prevent display breakage on small viewports */}
                            <div className="overflow-x-auto select-none custom-scrollbar">
                                <div className="min-w-[720px] flex flex-col gap-1">

                                    {/* Months Headers X-Axis Label Row */}
                                    <div className="flex pl-8 text-[9px] text-[#6E7781] dark:text-[#8B949E] font-sans pb-1 justify-between pr-4">
                                        <span>Jun</span>
                                        <span>Jul</span>
                                        <span>Aug</span>
                                        <span>Sep</span>
                                        <span>Oct</span>
                                        <span>Nov</span>
                                        <span>Dec</span>
                                        <span>Jan</span>
                                        <span>Feb</span>
                                        <span>Mar</span>
                                        <span>Apr</span>
                                        <span>May</span>
                                    </div>

                                    {/* Day labels + Grid Columns Box */}
                                    <div className="flex gap-2.5 items-start">

                                        {/* Y-Axis Day Labels column */}
                                        <div className="grid grid-rows-7 h-[115px] text-[9.5px] text-[#6E7781] dark:text-[#8B949E] font-sans pr-1 w-6 select-none pt-0.5">
                                            <div className="h-4 flex items-center justify-end"></div>
                                            <div className="h-4 flex items-center justify-end">Mon</div>
                                            <div className="h-4 flex items-center justify-end"></div>
                                            <div className="h-4 flex items-center justify-end">Wed</div>
                                            <div className="h-4 flex items-center justify-end"></div>
                                            <div className="h-4 flex items-center justify-end">Fri</div>
                                            <div className="h-4 flex items-center justify-end"></div>
                                        </div>

                                        {/* The 53 columns representation */}
                                        <div className="flex gap-1.5">
                                            {contributionGrid.map((week, weekIdx) => (
                                                <div key={weekIdx} className="grid grid-rows-7 gap-1 h-[115px]">
                                                    {week.map((cell, dayIdx) => {
                                                        // Authentic GitHub contribution colors for both Light (default) and Dark (dark:) themes
                                                        let cellBgClass = 'bg-[#EBEDF0] dark:bg-[#161B22] border-slate-200 dark:border-[#20262d]/40' // level 0

                                                        if (cell.level === 1) {
                                                            cellBgClass = 'bg-[#9be9a8] dark:bg-[#0e4429] border-transparent'
                                                        } else if (cell.level === 2) {
                                                            cellBgClass = 'bg-[#40c463] dark:bg-[#006d32] border-transparent'
                                                        } else if (cell.level === 3) {
                                                            cellBgClass = 'bg-[#30a14e] dark:bg-[#26a641] border-transparent'
                                                        } else if (cell.level === 4) {
                                                            cellBgClass = 'bg-[#216e39] dark:bg-[#39d353] border-transparent dark:shadow-[0_0_6px_rgba(57,211,83,0.25)]'
                                                        }

                                                        const isHovered = hoveredCell && hoveredCell.week === weekIdx && hoveredCell.day === dayIdx

                                                        return (
                                                            <div
                                                                key={dayIdx}
                                                                className={`w-[10px] h-[10px] rounded-[1.5px] border transition-all duration-150 cursor-pointer ${cellBgClass} ${isHovered ? 'ring-1 ring-purple-500 scale-125 z-10' : ''}`}
                                                                onMouseEnter={() => setHoveredCell({ week: weekIdx, day: dayIdx, commits: cell.commits, date: cell.date })}
                                                                onMouseLeave={() => setHoveredCell(null)}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Grid Footer (Left Link & Right Legend matching screenshot exactly) */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 mt-3 pt-3 border-t border-[#EAEDEF] dark:border-[#30363D]/50 text-[10.5px]">
                                <a
                                    href="https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#6E7781] dark:text-[#8B949E] hover:text-[#0969DA] dark:hover:text-[#58A6FF] hover:underline font-sans"
                                >
                                    Learn how we count contributions
                                </a>

                                {/* Grid Legend bar */}
                                <div className="flex items-center gap-1 text-[#6E7781] dark:text-[#8B949E] font-sans select-none">
                                    <span className="mr-1">Less</span>
                                    <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#EBEDF0] dark:bg-[#161B22] border border-slate-200 dark:border-[#20262d]/40" />
                                    <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#9be9a8] dark:bg-[#0e4429]" />
                                    <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#40c463] dark:bg-[#006d32]" />
                                    <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#30a14e] dark:bg-[#26a641]" />
                                    <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#216e39] dark:bg-[#39d353]" />
                                    <span className="ml-1">More</span>
                                </div>
                            </div>

                        </div>

                        {/* Hover audit detail float (floating just below the calendar container nicely) */}
                        <div className="mt-3 min-h-[30px] flex items-center justify-center text-center">
                            {hoveredCell ? (
                                <div className="text-[11px] font-sans font-medium text-[#57606A] dark:text-[#C9D1D9] bg-[#F6F8FA] dark:bg-[#161B22]/50 border border-[#D0D7DE]/40 dark:border-[#30363D]/40 px-3.5 py-1 rounded-full animate-fade-in shadow-sm">
                                    <span className="font-bold text-[#0969DA] dark:text-[#58A6FF]">{hoveredCell.commits} commits</span> on {hoveredCell.date} • Verified Attendance Present
                                </div>
                            ) : (
                                <div className="text-[10px] font-sans italic text-[#6E7781] dark:text-[#8B949E]">
                                    Hover over grid cells to audit specific day contribution records.
                                </div>
                            )}
                        </div>

                    </div>

                    {/* COLUMN GRID C: RECENT TIMELINE & SPECIFIC IMPACT STATS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

                        {/* CARD C1: Recent Contribution Timeline Feed */}
                        <div className="lg:col-span-2 p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC] tracking-tight flex items-center gap-2">
                                        <FiGitCommit className="w-4 h-4 text-[#8250DF] dark:text-[#8957E5]" />
                                        Activity Push Feed
                                    </h2>
                                    <span className="text-[9px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-widest">Live Logs</span>
                                </div>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                    {recentCommits.map((item) => (
                                        <div key={item.id} className="relative pl-6 pb-2 last:pb-0 group/item border-l border-[#EAEDEF] dark:border-[#21262D]/60">

                                            {/* Timeline dot */}
                                            <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border bg-white dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] hover:border-[#8250DF] dark:hover:border-[#8957E5] group-hover/item:scale-110 transition-all duration-300" />

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-[9.5px] font-mono text-[#57606A] dark:text-[#C9D1D9] bg-[#F6F8FA] dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] px-1.5 py-0.5 rounded leading-none">
                                                        {item.hash}
                                                    </span>
                                                    <span className="text-[10px] font-black text-[#6E7781] dark:text-[#8B949E] uppercase tracking-wider flex items-center gap-1.5">
                                                        <FiGitBranch className="w-3 h-3 text-[#8250DF] dark:text-[#8957E5]" /> {item.repo}/{item.branch}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-[#6E7781] dark:text-[#8B949E]">{item.time}</span>
                                            </div>

                                            <p className="text-xs text-[#24292F] dark:text-[#C9D1D9] font-bold mt-1.5 leading-snug">
                                                {item.message}
                                            </p>

                                            <div className="flex items-center gap-3.5 mt-2">
                                                <span className="text-[9.5px] font-mono text-[#2DA44E] dark:text-[#3FB950] font-semibold">{item.impact}</span>
                                                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E6F4EA] dark:bg-[#238636]/10 text-[#2DA44E] dark:text-[#3FB950] border border-[#3FBF5F]/20 dark:border-[#3FB950]/20 leading-none">
                                                    Synced
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CARD C2: Developer Stack & Top Repositories */}
                        <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm flex flex-col justify-between group">
                            <div>
                                <h2 className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC] tracking-tight mb-5 flex items-center gap-2">
                                    <FiCode className="w-4 h-4 text-[#8250DF] dark:text-[#8957E5]" />
                                    Developer Stack & Repos
                                </h2>

                                {/* Section A: Stack Breakdown */}
                                <div className="space-y-4">
                                    {/* Gauge React */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-wider uppercase">
                                            <span className="text-[#24292F] dark:text-[#C9D1D9] flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-[#8250DF] dark:bg-[#8957E5]" />
                                                React.js Modules
                                            </span>
                                            <span className="text-[#8250DF] dark:text-[#A371F7]">65%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#EBEDF0] dark:bg-[#21262D] rounded-full overflow-hidden border border-[#D0D7DE]/45 dark:border-[#30363D]/45">
                                            <div className="h-full bg-gradient-to-r from-[#8250DF] to-[#FAF5FF] dark:to-[#8957E5] rounded-full" style={{ width: '65%' }} />
                                        </div>
                                    </div>

                                    {/* Gauge Tailwind */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-wider uppercase">
                                            <span className="text-[#24292F] dark:text-[#C9D1D9] flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-[#0969DA] dark:bg-[#1F6FEB]" />
                                                Tailwind CSS v4
                                            </span>
                                            <span className="text-[#0969DA] dark:text-[#58A6FF]">25%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#EBEDF0] dark:bg-[#21262D] rounded-full overflow-hidden border border-[#D0D7DE]/45 dark:border-[#30363D]/45">
                                            <div className="h-full bg-gradient-to-r from-[#0969DA] to-[#DBEAFE] dark:to-[#1F6FEB] rounded-full" style={{ width: '25%' }} />
                                        </div>
                                    </div>

                                    {/* Gauge ES6 JS */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-wider uppercase">
                                            <span className="text-[#24292F] dark:text-[#C9D1D9] flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-[#D4A72C] dark:bg-[#D29922]" />
                                                ES6 Javascript
                                            </span>
                                            <span className="text-[#D4A72C] dark:text-[#F0C849]">10%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#EBEDF0] dark:bg-[#21262D] rounded-full overflow-hidden border border-[#D0D7DE]/45 dark:border-[#30363D]/45">
                                            <div className="h-full bg-gradient-to-r from-[#D4A72C] to-[#FFF8E5] dark:to-[#D29922] rounded-full" style={{ width: '10%' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Divider Line */}
                                <div className="my-5 border-t border-[#EAEDEF] dark:border-[#21262D]/60" />

                                {/* Section B: Top Repositories */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#6E7781] dark:text-[#8B949E] mb-3.5 flex items-center gap-2">
                                        <FiGitBranch className="w-3.5 h-3.5 text-[#8250DF] dark:text-[#8957E5]" />
                                        Top Repositories
                                    </h3>

                                    <div className="space-y-3">
                                        {/* Repo 1 */}
                                        <div className="p-3 rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] hover:border-[#8250DF]/40 dark:hover:border-[#8957E5]/40 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <a
                                                    href={`https://github.com/${username}/Attendance_Tracker_Frontend`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs font-bold text-[#24292F] dark:text-[#F0F6FC] hover:text-[#0969DA] dark:hover:text-[#58A6FF] flex items-center gap-1.5 transition-colors"
                                                >
                                                    Attendance_Tracker_Frontend
                                                </a>
                                                <span className="text-[9px] font-black text-[#2DA44E] dark:text-[#3FB950] bg-[#E6F4EA] dark:bg-[#238636]/10 px-2 py-0.5 rounded-full border border-[#3FBF5F]/20 dark:border-[#3FB950]/20 uppercase tracking-wide">
                                                    Public
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] mt-1">Vite • React.js • Tailwind CSS v4</p>
                                            <div className="flex items-center gap-4 mt-2.5 text-[10px] text-[#6E7781] dark:text-[#8B949E] font-semibold select-none">
                                                <span className="flex items-center gap-1">⭐ 12</span>
                                                <span className="flex items-center gap-1">🍴 4</span>
                                            </div>
                                        </div>

                                        {/* Repo 2 */}
                                        <div className="p-3 rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] hover:border-[#8250DF]/40 dark:hover:border-[#8957E5]/40 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <a
                                                    href={`https://github.com/${username}/Attendance_Tracker_Backend`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs font-bold text-[#24292F] dark:text-[#F0F6FC] hover:text-[#0969DA] dark:hover:text-[#58A6FF] flex items-center gap-1.5 transition-colors"
                                                >
                                                    Attendance_Tracker_Backend
                                                </a>
                                                <span className="text-[9px] font-black text-[#6E7781] dark:text-[#8B949E] bg-[#EBEDF0] dark:bg-[#21262D]/60 px-2 py-0.5 rounded-full border border-[#D0D7DE]/40 dark:border-[#30363D]/40 uppercase tracking-wide">
                                                    Public
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-[#6E7781] dark:text-[#8B949E] mt-1">Node.js • Express • MongoDB API</p>
                                            <div className="flex items-center gap-4 mt-2.5 text-[10px] text-[#6E7781] dark:text-[#8B949E] font-semibold select-none">
                                                <span className="flex items-center gap-1">⭐ 8</span>
                                                <span className="flex items-center gap-1">🍴 2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#EAEDEF] dark:border-[#21262D]/60 text-center">
                                <a
                                    href={`https://github.com/${username}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-[10px] font-black tracking-widest text-[#6E7781] dark:text-[#8B949E] uppercase hover:text-[#0969DA] dark:hover:text-[#58A6FF] transition-colors"
                                >
                                    <FiLink2 className="w-3.5 h-3.5" /> View Profile github.com
                                </a>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default Github
