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
              <span>/</span>
              <span className="text-slate-400 dark:text-slate-500">Attendance Insights</span>
            </div>

            {/* ==========================================
                TOP SECTION: REALTIME CLOCK & 2x3 STATS GRID
                ========================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* LEFT CARD: Digital Clock & Configurations */}
              <div className="relative overflow-hidden p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-64
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

                  <button 
                    onClick={handleCheckIn}
                    className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:scale-[1.01]
                      ${isCheckedIn 
                        ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white border-rose-600/30 shadow-rose-500/20 hover:shadow-rose-500/35' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-600/30 shadow-blue-500/20 hover:shadow-blue-500/35'
                      }`}
                  >
                    <FiSliders className="w-4 h-4" />
                    <span>{isCheckedIn ? 'Log Check-Out' : 'Advanced Configuration'}</span>
                  </button>
                </div>
              </div>

              {/* RIGHT GRID: 2x3 High-End Metric Cards */}
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Metric 1: Total Employees */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#bf40bf]/5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                        {stats.employees}
                      </p>
                      <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        Total Employees
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <HiOutlineUserGroup className="w-5 h-5 text-blue-550 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-450 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    + 2 new employees added!
                  </p>
                </div>

                {/* Metric 2: On Time */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                        {stats.present}
                      </p>
                      <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        On Time
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

                {/* Metric 3: Absent */}
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
                      <HiOutlineCloud className="w-5 h-5 text-rose-600 dark:text-rose-450" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-rose-600 dark:text-rose-450 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-605" />
                    +3% Increase than yesterday
                  </p>
                </div>

                {/* Metric 4: Late Arrival */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-500/5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                        {stats.pending}
                      </p>
                      <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        Late Arrival
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <HiOutlineExclamationCircle className="w-5 h-5 text-amber-600 dark:text-amber-450" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-rose-600 dark:text-rose-450 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-605" />
                    +3% Increase than yesterday
                  </p>
                </div>

                {/* Metric 5: Early Departures */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#bf40bf]/5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                        6
                      </p>
                      <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        Early Departures
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#bf40bf]/10 flex items-center justify-center border border-[#bf40bf]/20">
                      <HiOutlineMoon className="w-5 h-5 text-[#bf40bf] dark:text-purple-400" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-455 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    -10% Less than yesterday
                  </p>
                </div>

                {/* Metric 6: Time-off */}
                <div className="relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-500/5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-black tracking-tight text-slate-850 dark:text-white leading-none">
                        {stats.leave}
                      </p>
                      <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        Time-off
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center border border-slate-500/20">
                      <HiOutlineCalendar className="w-5 h-5 text-slate-550 dark:text-slate-455" />
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-slate-400 mt-4 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    2% Increase than yesterday
                  </p>
                </div>

              </div>
            </div>

            {/* ==========================================
                MIDDLE CHARTS SECTION: SPLINE SPLIT & WEEKLY BARS
                ========================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left spline curve spline chart — 2/3 Width */}
              <div className="lg:col-span-2 p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                      Attendance Comparison Chart
                    </h2>
                  </div>
                  {/* High-fidelity selector indicators matching the exact reference style */}
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                    <button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Daily
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-655">
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      Weekly
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-655">
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Spline SVG Chart Container */}
                <div className="h-64 relative">
                  <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Horizontal helper grid lines */}
                    {[0, 60, 120, 180, 240].map((yVal, idx) => (
                      <line key={idx} x1="40" y1={yVal} x2="780" y2={yVal} stroke="#D0D7DE" strokeWidth="0.5" strokeDasharray="3 3" className="dark:stroke-slate-800/40" />
                    ))}
                    
                    {/* Spline Curve Fill Area */}
                    <path d="M40 160 C 100 120, 120 170, 170 140 C 220 110, 240 70, 290 80 C 340 90, 360 170, 410 140 C 460 110, 480 180, 530 140 C 580 100, 600 130, 650 150 C 700 170, 720 130, 780 100 L 780 240 L 40 240 Z" fill="url(#splineGradient)" />
                    
                    {/* Spline Spline Curve Path */}
                    <path d="M40 160 C 100 120, 120 170, 170 140 C 220 110, 240 70, 290 80 C 340 90, 360 170, 410 140 C 460 110, 480 180, 530 140 C 580 100, 600 130, 650 150 C 700 170, 720 130, 780 100" fill="none" stroke="#2563EB" strokeWidth="3" className="drop-shadow-[0_4px_8px_rgba(37,99,235,0.4)]" />
                    
                    {/* Vertical guideline on high value */}
                    <line x1="290" y1="20" x2="290" y2="240" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-80" />
                    <rect x="272" y="5" width="36" height="18" rx="9" fill="#2563EB" className="shadow-[0_0_12px_rgba(37,99,235,0.5)]" />
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
                      <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#2563EB" stroke="white" strokeWidth="1.5" className="dark:stroke-[#0C0F16] cursor-pointer hover:r-5 transition-all" />
                    ))}
                  </svg>

                  {/* Spline Chart X-Axis Labels */}
                  <div className="flex justify-between text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-wider mt-4 px-2">
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
                    <span>15 Aug</span>
                    <span>16 Aug</span>
                  </div>
                </div>
              </div>

              {/* Right weekly column bars chart — 1/3 Width */}
              <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                    Monthly Meeting
                  </h2>
                </div>

                {/* Columns Bar Chart Display */}
                <div className="h-64 flex items-end justify-between px-4 pb-6 relative">
                  
                  {/* Horizontal background grids */}
                  <div className="absolute inset-0 flex flex-col justify-between pb-[54px] pt-[20px] pointer-events-none">
                    {[1, 2, 3, 4].map(lineIdx => (
                      <div key={lineIdx} className="w-full border-t border-slate-100 dark:border-slate-850/45" />
                    ))}
                  </div>

                  {/* Individual Columns */}
                  {[
                    { dept: 'Sales', val: 40, active: false },
                    { dept: 'IT', val: 60, active: false },
                    { dept: 'Marketing', val: 86, active: true },
                    { dept: 'Legal', val: 60, active: false },
                    { dept: 'API', val: 40, active: false }
                  ].map(barItem => (
                    <div key={barItem.dept} className="flex flex-col items-center gap-3 w-10 z-10 group cursor-pointer">
                      
                      {/* Active highlighted percent tag on top of bar */}
                      {barItem.active && (
                        <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 tracking-wider shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                          {barItem.val}%
                        </div>
                      )}

                      {/* Bar capsule container */}
                      <div className="h-36 w-6 rounded-md bg-slate-50 dark:bg-slate-800/20 overflow-hidden flex flex-col justify-end shadow-inner border border-slate-100 dark:border-slate-850/10">
                        <div 
                          style={{ height: `${barItem.val}%` }} 
                          className={`w-full rounded-md transition-all duration-300 group-hover:brightness-110
                            ${barItem.active 
                              ? 'bg-gradient-to-t from-blue-650 to-blue-400 dark:from-blue-600 dark:to-blue-350 shadow-[0_0_12px_rgba(37,99,235,0.3)]' 
                              : 'bg-slate-350 dark:bg-slate-800/70'
                            }`}
                        />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest leading-none rotate-45 mt-2 origin-left">
                        {barItem.dept}
                      </span>
                    </div>
                  ))}
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
