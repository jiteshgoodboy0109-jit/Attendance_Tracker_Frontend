import { useState, useEffect } from 'react'
import {
  HiSun,
  HiMoon,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineClock,
  HiOutlineCloud,
  HiOutlineMoon
} from 'react-icons/hi'
import {
  FiGrid,
  FiUserCheck,
  FiCalendar,
  FiFileText,
  FiGithub,
  FiVideo,
  FiActivity,
  FiSliders,
  FiAward
} from 'react-icons/fi'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Home() {
  // ── States ──────────────────────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(true) // Theme toggle state (default dark as per uploaded images)
  const [activeMenu, setActiveMenu] = useState('Dashboard') // Sidebar active menu
  const [showSearch, setShowSearch] = useState(false) // Toggle search bar
  const [searchQuery, setSearchQuery] = useState('') // Search query for Attendance Table
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Rahul Kumar requested Sick Leave (2 days)', read: false },
    { id: 2, text: 'Sneha Sharma requested Casual Leave (1 day)', read: false },
    { id: 3, text: 'Org attendance reached 81% today!', read: false },
    { id: 4, text: 'Divya Krishnan checked in early (08:58)', read: false }
  ])
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [isCheckedIn, setIsCheckedIn] = useState(false) // Interactive check-in button state
  const [checkInTime, setCheckInTime] = useState('')
  
  // Realtime clock state
  const [time, setTime] = useState(new Date())

  // Realtime clock runner
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Interactive pending approvals list
  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Rahul Kumar', type: 'Sick', duration: '2d', date: '10 Jan', avatar: 'RK', bg: 'bg-amber-500' },
    { id: 2, name: 'Sneha Sharma', type: 'Casual', duration: '1d', date: '15 Jan', avatar: 'SS', bg: 'bg-indigo-500' }
  ])

  // Org attendance counter state
  const [stats, setStats] = useState({
    employees: 452,
    present: 360,
    leave: 42,
    pending: 62,
    orgRate: 81
  })

  // Attendance Overview Table Rows (Mapped directly to high-fidelity dashboard user status logs)
  const [teamMembers, setTeamMembers] = useState([
    { id: 'EMP001', name: 'Priya Nair', role: 'UI/UX Designer', dept: 'Design', date: '25 May 2026', status: 'Present', checkIn: '09:02 AM', checkOut: '05:30 PM', hours: '8.5 hrs', avatar: 'PN', bg: 'bg-teal-500' },
    { id: 'EMP002', name: 'Rahul Kumar', role: 'React Developer', dept: 'Engineering', date: '25 May 2026', status: 'Present', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: '8.7 hrs', avatar: 'RK', bg: 'bg-amber-500' },
    { id: 'EMP003', name: 'Sneha Sharma', role: 'QA Engineer', dept: 'QA', date: '25 May 2026', status: 'Late', checkIn: '10:22 AM', checkOut: '06:30 PM', hours: '8.1 hrs', avatar: 'SS', bg: 'bg-purple-500' },
    { id: 'EMP004', name: 'Arjun Mehta', role: 'Project Manager', dept: 'Management', date: '25 May 2026', status: 'Absent', checkIn: '—', checkOut: '—', hours: '—', avatar: 'AM', bg: 'bg-rose-500' },
    { id: 'EMP005', name: 'Divya Krishnan', role: 'Backend Developer', dept: 'Engineering', date: '25 May 2026', status: 'Present', checkIn: '08:58 AM', checkOut: '05:00 PM', hours: '8.0 hrs', avatar: 'DK', bg: 'bg-emerald-500' },
    { id: 'EMP006', name: 'Karan Patel', role: 'DevOps Specialist', dept: 'Operations', date: '25 May 2026', status: 'On Leave', checkIn: '—', checkOut: '—', hours: '—', avatar: 'KP', bg: 'bg-sky-500' },
    { id: 'EMP007', name: 'Meera Iyer', role: 'HR Manager', dept: 'Human Resources', date: '25 May 2026', status: 'Present', checkIn: '09:05 AM', checkOut: '05:30 PM', hours: '8.4 hrs', avatar: 'MI', bg: 'bg-indigo-500' }
  ])

  const [hoveredWeek, setHoveredWeek] = useState(null)

  // Handle Approvals Actions
  const handleApproval = (id, action, name) => {
    setApprovals(prev => prev.filter(item => item.id !== id))
    
    setStats(prev => {
      let updatedStats = { ...prev };
      if (action === 'approve') {
        updatedStats.pending = Math.max(0, prev.pending - 1)
        updatedStats.leave = prev.leave + 1
      } else {
        updatedStats.pending = Math.max(0, prev.pending - 1)
      }
      return updatedStats
    })
    alert(`Leave request for ${name} has been ${action === 'approve' ? 'Approved ✅' : 'Rejected ❌'}`)
  }

  // Handle Interactive Check-In
  const handleCheckIn = () => {
    if (!isCheckedIn) {
      const now = new Date()
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      setIsCheckedIn(true)
      setCheckInTime(timeStr)
      
      const newMember = {
        id: 'EMP008',
        name: 'Jitesh (You)',
        role: 'Super Admin',
        dept: 'Management',
        date: '25 May 2026',
        status: 'Present',
        checkIn: timeStr,
        checkOut: '—',
        hours: '—',
        avatar: 'J(',
        bg: 'bg-[#bf40bf]'
      }
      setTeamMembers(prev => [newMember, ...prev])
      setStats(prev => ({
        ...prev,
        present: prev.present + 1,
        orgRate: Math.round(((prev.present + 1) / prev.employees) * 100)
      }))
    } else {
      setIsCheckedIn(false)
      setTeamMembers(prev => prev.filter(m => m.name !== 'Jitesh (You)'))
      setStats(prev => ({
        ...prev,
        present: Math.max(0, prev.present - 1),
        orgRate: Math.round((Math.max(0, prev.present - 1) / prev.employees) * 100)
      }))
    }
  }

  // Filter team members based on Quick Search input query
  const filteredTeam = teamMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen flex transition-colors duration-300 bg-[#F8FAFC] dark:bg-[#080B11] text-slate-850 dark:text-slate-200">
        
        {/* Sidebar Component */}
        <Sidebar
          isDark={isDark}
          setIsDark={setIsDark}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Navbar Component */}
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            notifications={notifications}
            setNotifications={setNotifications}
            showNotificationDropdown={showNotificationDropdown}
            setShowNotificationDropdown={setShowNotificationDropdown}
          />

          {/* ==========================================
              MAIN CONTENT CONTAINER (Premium Dark Dashboard Match)
              ========================================== */}
          <main className="flex-1 p-8 space-y-8 bg-[#FAFBFD] dark:bg-[#070A0F] transition-colors duration-300 relative overflow-hidden">
            
            {/* Ambient Background Glow Filters */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Path Header Indicator */}
            <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#bf40bf] dark:text-purple-400">
              <span>Dashboard</span>
             
            </div>

            {/* ==========================================
                TOP SECTION: REALTIME CLOCK & 2x3 STATS GRID
                ========================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              
              {/* LEFT CARD: Digital Clock & Configurations */}
              <div className="relative overflow-hidden p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-auto gap-6
                              bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-slate-100/10 dark:shadow-black/20 hover:border-[#bf40bf]/40 dark:hover:border-[#bf40bf]/30">
                
                {/* Ambient glow inside card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-[#bf40bf] dark:text-purple-400">
                    <HiOutlineClock className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold tracking-tight text-slate-850 dark:text-white leading-none">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                      Realtime Insight
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest">
                      Today:
                    </p>
                    <p className="text-lg font-black text-slate-850 dark:text-white mt-0.5">
                      {time.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT GRID: 3 Balanced Metric Cards */}
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Metric 1: Present */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/5">
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
                      <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-450" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-[#2563EB] dark:text-blue-400 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    -10% Less than yesterday
                  </p>
                </div>

                {/* Metric 2: Absent */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-500/5">
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
                      <HiOutlineCloud className="w-5 h-5 text-rose-600 dark:text-rose-455" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-rose-600 dark:text-rose-455 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-605" />
                    +3% Increase than yesterday
                  </p>
                </div>

                {/* Metric 3: Blank Card Placeholder */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 flex flex-col justify-center items-center min-h-[110px] group">
                  {/* Subtle glassmorphic decorative background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-8 h-8 rounded-full border border-dashed border-slate-350 dark:border-slate-700/60 flex items-center justify-center text-slate-350 dark:text-slate-500 group-hover:border-[#bf40bf]/40 group-hover:text-[#bf40bf]/60 transition-all duration-300">
                    <span className="text-sm font-light">+</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mt-2 group-hover:text-purple-400 transition-all duration-300">
                    Placeholder
                  </p>
                </div>

              </div>
            </div>

            {/* ==========================================
                MIDDLE CHARTS SECTION: SPLINE SPLIT & WEEKLY BARS
                ========================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 relative overflow-hidden group">
                {/* Subtle internal glowing filter */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 z-10 relative">
                  <div>
                    <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                      Attendance Comparison Chart
                    </h2>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                      Daily Activity Analytics
                    </p>
                  </div>
                  {/* High-fidelity SaaS segmented tab selectors */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                    <button className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-sm transition-all duration-200">
                      Daily
                    </button>
                    <button className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-200 transition-all duration-200">
                      Weekly
                    </button>
                    <button className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-200 transition-all duration-200">
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Spline SVG Chart Container */}
                <div className="h-64 relative z-10 mt-4">
                  <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Horizontal helper grid lines */}
                    {[0, 60, 120, 180, 240].map((yVal, idx) => (
                      <line key={idx} x1="40" y1={yVal} x2="780" y2={yVal} stroke="#D0D7DE" strokeWidth="0.5" strokeDasharray="3 3" className="dark:stroke-slate-800/30" />
                    ))}
                    
                    {/* Spline Curve Fill Area */}
                    <path d="M40 160 C 100 120, 120 170, 170 140 C 220 110, 240 70, 290 80 C 340 90, 360 170, 410 140 C 460 110, 480 180, 530 140 C 580 100, 600 130, 650 150 C 700 170, 720 130, 780 100 L 780 240 L 40 240 Z" fill="url(#splineGradient)" />
                    
                    {/* Spline Spline Curve Path */}
                    <path d="M40 160 C 100 120, 120 170, 170 140 C 220 110, 240 70, 290 80 C 340 90, 360 170, 410 140 C 460 110, 480 180, 530 140 C 580 100, 600 130, 650 150 C 700 170, 720 130, 780 100" fill="none" stroke="#3B82F6" strokeWidth="3.5" className="drop-shadow-[0_4px_12px_rgba(59,130,246,0.5)]" />
                    
                    {/* Vertical guideline on high value */}
                    <line x1="290" y1="20" x2="290" y2="240" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-80" />
                    <rect x="272" y="5" width="36" height="18" rx="9" fill="#3B82F6" className="shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                    <text x="290" y="17" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">91%</text>

                    {/* Nodes on points */}
                    {[
                      { x: 40, y: 160 },
                      { x: 100, y: 120 },
                      { x: 170, y: 140 },
                      { x: 290, y: 80 },
                      { x: 410, y: 140 },
                      { x: 530, y: 140 },
                      { x: 650, y: 150 },
                      { x: 780, y: 100 }
                    ].map((pt, i) => (
                      <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#3B82F6" stroke="white" strokeWidth="2" className="dark:stroke-[#0C0F16] cursor-pointer hover:r-6 transition-all duration-200" />
                    ))}
                  </svg>

                  {/* Spline Chart X-Axis Labels */}
                  <div className="flex justify-between text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest mt-4 px-4">
                    <span>01 Aug</span>
                    <span>02 Aug</span>
                    <span>03 Aug</span>
                    <span>04 Aug</span>
                    <span>07 Aug</span>
                    <span>08 Aug</span>
                    <span>09 Aug</span>
                    <span>10 Aug</span>
                    <span>11 Aug</span>
                    <span>14 Aug</span>
                  </div>
                </div>
              </div>

              {/* Right weekly line graph — 1/3 Width */}
              <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 relative overflow-hidden group">
                {/* Internal ambient glowing filter for Right Chart */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 z-10 relative">
                  <div>
                    <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                      Monthly Attendance 
                    </h2>
                    <p className="text-[10px] text-slate-400 dark:text-slate-555 uppercase tracking-widest mt-0.5">
                      Last 5 Weeks Trend
                    </p>
                  </div>cd 
                  {/* Legend Indicators in Capsule/Pill Style */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Present
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-455 text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Absent
                    </span>
                  </div>
                </div>

                {/* Horizontal Line SVG Chart Container */}
                <div className="h-60 relative z-10 mt-4 flex flex-col justify-between">
                  <div className="relative flex-1">
                    <svg viewBox="0 0 380 240" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="presentLineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="absentLineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Horizontal helper grid lines at 0%, 25%, 50%, 75%, 100% */}
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

                      {/* Percentage Labels on left of Y-axis */}
                      <g className="text-[8px] font-black text-slate-400 dark:text-slate-650 tracking-wider">
                        <text x="22" y="33" textAnchor="end">100%</text>
                        <text x="22" y="78" textAnchor="end">75%</text>
                        <text x="22" y="123" textAnchor="end">50%</text>
                        <text x="22" y="168" textAnchor="end">25%</text>
                        <text x="22" y="213" textAnchor="end">0%</text>
                      </g>
                      
                      {/* Area fill under Present line */}
                      <path 
                        d="M 50 48 L 120 57 L 190 40.8 L 260 51.6 L 330 44.4 L 330 210 L 50 210 Z" 
                        fill="url(#presentLineGradient)" 
                      />

                      {/* Present line path */}
                      <path 
                        d="M 50 48 L 120 57 L 190 40.8 L 260 51.6 L 330 44.4" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                      />

                      {/* Area fill under Absent line */}
                      <path 
                        d="M 50 192 L 120 183 L 190 199.2 L 260 188.4 L 330 195.6 L 330 210 L 50 210 Z" 
                        fill="url(#absentLineGradient)" 
                      />

                      {/* Absent line path */}
                      <path 
                        d="M 50 192 L 120 183 L 190 199.2 L 260 188.4 L 330 195.6" 
                        fill="none" 
                        stroke="#F43F5E" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                      />

                      {/* Dynamic Present Data Points & Value text */}
                      {[
                        { x: 50, y: 48, val: '90%' },
                        { x: 120, y: 57, val: '85%' },
                        { x: 190, y: 40.8, val: '94%' },
                        { x: 260, y: 51.6, val: '88%' },
                        { x: 330, y: 44.4, val: '92%' }
                      ].map((pt, i) => (
                        <g key={`pres-${i}`} className="group/node cursor-pointer">
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r="4" 
                            fill="#3B82F6" 
                            stroke="white" 
                            strokeWidth="1.5" 
                            className="dark:stroke-[#0C0F16] transition-all duration-200 group-hover/node:r-5.5 group-hover/node:fill-white group-hover/node:stroke-[#3B82F6]" 
                          />
                          <text 
                            x={pt.x} 
                            y={pt.y - 8} 
                            textAnchor="middle" 
                            className="text-[9px] font-black fill-blue-600 dark:fill-blue-400 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200"
                          >
                            {pt.val}
                          </text>
                        </g>
                      ))}

                      {/* Dynamic Absent Data Points & Value text */}
                      {[
                        { x: 50, y: 192, val: '10%' },
                        { x: 120, y: 183, val: '15%' },
                        { x: 190, y: 199.2, val: '6%' },
                        { x: 260, y: 188.4, val: '12%' },
                        { x: 330, y: 195.6, val: '8%' }
                      ].map((pt, i) => (
                        <g key={`abs-${i}`} className="group/node cursor-pointer">
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r="4" 
                            fill="#F43F5E" 
                            stroke="white" 
                            strokeWidth="1.5" 
                            className="dark:stroke-[#0C0F16] transition-all duration-200 group-hover/node:r-5.5 group-hover/node:fill-white group-hover/node:stroke-[#F43F5E]" 
                          />
                          <text 
                            x={pt.x} 
                            y={pt.y - 8} 
                            textAnchor="middle" 
                            className="text-[9px] font-black fill-rose-600 dark:fill-rose-400 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200"
                          >
                            {pt.val}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Spline Chart X-Axis Labels */}
                  <div className="flex justify-between text-[8px] font-black text-slate-400 dark:text-slate-555 uppercase tracking-widest mt-2 px-8">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                    <span>Week 5</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ==========================================
                BOTTOM SECTION: ATTENDANCE OVERVIEW TABLE
                ========================================== */}
            <div className="p-6 rounded-2xl border transition-colors duration-300
                            bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm">
              
              {/* Header and filters widget */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                    Attendance Overview
                  </h2>
                </div>

                {/* Right filters aligning to reference screen precisely */}
                <div className="flex flex-wrap items-center gap-3.5">
                  
                  {/* Quick Search */}
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Quick Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-2 text-xs rounded-xl border outline-none transition-all duration-300
                                 bg-slate-50 dark:bg-slate-900/60
                                 border-slate-200 dark:border-slate-850/60
                                 text-slate-850 dark:text-white
                                 placeholder:text-slate-400 dark:placeholder:text-slate-500
                                 focus:border-[#bf40bf] focus:ring-1 focus:ring-[#bf40bf]/30"
                    />
                  </div>

                  {/* Selected Date */}
                  <button className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all duration-200
                                     bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-850/60 text-slate-500 dark:text-slate-450 hover:bg-slate-100">
                    <HiOutlineCalendar className="w-4 h-4 text-slate-400" />
                    <span>29 July 2023</span>
                  </button>

                  {/* Advanced Filters */}
                  <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white border border-blue-600/30 flex items-center gap-2 transition-all duration-200
                                     bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/10">
                    <FiSliders className="w-4 h-4" />
                    <span>Advanced Filters</span>
                  </button>
                </div>
              </div>

              {/* High-Fidelity Responsive Attendance Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-850/50 text-[10px] font-black text-slate-450 dark:text-slate-550 uppercase tracking-widest">
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
                          <td className="py-4 px-4 font-semibold text-slate-650 dark:text-slate-400">{row.dept}</td>
                          <td className="py-4 px-4 text-slate-400 font-semibold">{row.date}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border
                              ${row.status === 'Present' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : ''}
                              ${row.status === 'Late' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : ''}
                              ${row.status === 'Absent' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/20' : ''}
                              ${row.status === 'On Leave' ? 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20' : ''}
                            `}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold">{row.checkIn}</td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold">{row.checkOut}</td>
                          <td className="py-4 px-4 font-black text-slate-855 dark:text-white">{row.hours}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  )
}

export default Home
