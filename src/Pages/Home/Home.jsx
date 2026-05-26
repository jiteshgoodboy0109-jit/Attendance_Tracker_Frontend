import { useState, useEffect } from 'react'
import {
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCloud,
} from 'react-icons/hi'
import {
  FiSliders
} from 'react-icons/fi'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

/**
 * ============================================================================
 * Home Component
 * ============================================================================
 * Main Premium Analytics Dashboard View for the Attendance Tracker System.
 * 
 * Features:
 * 1. Realtime Digital Clock Panel with Interactive Click-to-Check-In
 * 2. Uniform Metric Summary Cards (Present logs, Absent logs, Dashboard Placeholders)
 * 3. Daily Attendance Comparison Spline Chart (Activity Analytics)
 * 4. Monthly Attendance Trend (5-Week Non-Overlapping Vertical Stacked Bar Chart)
 * 5. High-Fidelity Responsive Attendance Table with real-time multi-field search and filters
 * 
 * Sizing & Responsiveness (Perfect Alignment):
 * - Block A (Metrics) and Block B (Charts) grids align to identical 'lg' layout breakpoints.
 * - Embedded SVG text labels use native scalable viewbox properties for perfect viewport scaling.
 * - Search input containers collapse/expand responsively to eliminate overflows on small screens.
 * - 100% fluid slide-out sidebar mobile drawer overlay with tap backdrop closing support.
 * 
 * Design Aesthetics:
 * - Pure premium Light Mode accents utilizing HSL-tailored soft borders and gradients
 * - Semi-transparent glassmorphic float HUD tooltips (`bg-white/95`) in light mode
 * - Ambient radial glow overlays with high contrast typography readability
 */
function Home() {
  
  // ==========================================
  // 1. THEME & NAVIGATION STATES
  // ==========================================
  const [isDark, setIsDark] = useState(true)
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [splinePeriod, setSplinePeriod] = useState('Daily')

  // High-Fidelity multi-period datasets for interactive chart switching
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
  
  // ==========================================
  // 2. REAL-TIME CLOCK STATE
  // ==========================================
  const [time, setTime] = useState(new Date())

  // Ticks every second to ensure the digital clock is self-updating in real-time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // ==========================================
  // 3. SEARCH & DROPDOWN FILTERS
  // ==========================================
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  
  // ==========================================
  // 4. STATS & INTERACTIVE CHECK-IN STATES
  // ==========================================
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')
  
  const [stats, setStats] = useState({
    employees: 452,
    present: 360,
    leave: 42,
    pending: 62,
    orgRate: 81
  })

  // ==========================================
  // 5. CHART HOVER & INTERACTION STATE
  // ==========================================
  const [hoveredWeek, setHoveredWeek] = useState(null)

  // ==========================================
  // 6. RECENT ALERTS LIST
  // ==========================================
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Rahul Kumar requested Sick Leave (2 days)', read: false },
    { id: 2, text: 'Sneha Sharma requested Casual Leave (1 day)', read: false },
    { id: 3, text: 'Org attendance reached 81% today!', read: false },
    { id: 4, text: 'Divya Krishnan checked in early (08:58)', read: false }
  ])

  // ==========================================
  // 7. PENDING APPROVALS LIST
  // ==========================================
  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Rahul Kumar', type: 'Sick', duration: '2d', date: '10 Jan', avatar: 'RK', bg: 'bg-amber-500' },
    { id: 2, name: 'Sneha Sharma', type: 'Casual', duration: '1d', date: '15 Jan', avatar: 'SS', bg: 'bg-indigo-500' }
  ])

  // ==========================================
  // 8. TEAM LOGS DATA RECORD LIST
  // ==========================================
  const [teamMembers, setTeamMembers] = useState([
    { id: 'EMP001', name: 'Priya Nair', role: 'UI/UX Designer', dept: 'Design', date: '25 May 2026', status: 'Present', checkIn: '09:02 AM', checkOut: '05:30 PM', hours: '8.5 hrs', avatar: 'PN', bg: 'bg-teal-500' },
    { id: 'EMP002', name: 'Rahul Kumar', role: 'React Developer', dept: 'Engineering', date: '25 May 2026', status: 'Present', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: '8.7 hrs', avatar: 'RK', bg: 'bg-amber-500' },
    { id: 'EMP003', name: 'Sneha Sharma', role: 'QA Engineer', dept: 'QA', date: '25 May 2026', status: 'Late', checkIn: '10:22 AM', checkOut: '06:30 PM', hours: '8.1 hrs', avatar: 'SS', bg: 'bg-purple-500' },
    { id: 'EMP004', name: 'Arjun Mehta', role: 'Project Manager', dept: 'Management', date: '25 May 2026', status: 'Absent', checkIn: '—', checkOut: '—', hours: '—', avatar: 'AM', bg: 'bg-rose-500' },
    { id: 'EMP005', name: 'Divya Krishnan', role: 'Backend Developer', dept: 'Engineering', date: '25 May 2026', status: 'Present', checkIn: '08:58 AM', checkOut: '05:00 PM', hours: '8.0 hrs', avatar: 'DK', bg: 'bg-emerald-500' },
    { id: 'EMP006', name: 'Karan Patel', role: 'DevOps Specialist', dept: 'Operations', date: '25 May 2026', status: 'On Leave', checkIn: '—', checkOut: '—', hours: '—', avatar: 'KP', bg: 'bg-sky-500' },
    { id: 'EMP007', name: 'Meera Iyer', role: 'HR Manager', dept: 'Human Resources', date: '25 May 2026', status: 'Present', checkIn: '09:05 AM', checkOut: '05:30 PM', hours: '8.4 hrs', avatar: 'MI', bg: 'bg-indigo-500' }
  ])

  // ==========================================
  // 9. EVENT & STATE HANDLERS (JSDoc Documented)
  // ==========================================
  
  /**
   * Approves or rejects a pending employee leave request and updates stats.
   * 
   * @param {number} id - The ID of the leave request item.
   * @param {string} action - Action type: 'approve' or 'reject'.
   * @param {string} name - Name of the employee requesting leave.
   */
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

  /**
   * Toggles the dynamic check-in / check-out status for the Super Admin (Jitesh).
   * 
   * When checked in:
   * 1. Generates an active timestamp in AM/PM format.
   * 2. Prepends "Jitesh (You)" directly to the top of the logs table.
   * 3. Increments the overall organization metrics and updates ratio counts.
   * 
   * When checked out:
   * 1. Reverts state changes and clean-filters out "Jitesh (You)" from the data.
   */
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

  // ==========================================
  // 10. REAL-TIME TEAM FILTER LOGIC
  // ==========================================
  const filteredTeam = teamMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ==========================================
  // 11. DASHBOARD COMPONENT RENDER
  // ==========================================
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen flex transition-colors duration-300 bg-[#F8FAFC] dark:bg-[#080B11] text-slate-850 dark:text-slate-200">
        
        {/* === SECTION: Sidebar Nav === */}
        <Sidebar
          isDark={isDark}
          setIsDark={setIsDark}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* === SECTION: Main Body Wrap === */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* === SECTION: Top Header Bar === */}
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
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* === SECTION: Core Page Analytics Dashboard === */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 bg-[#FAFBFD] dark:bg-[#070A0F] transition-colors duration-300 relative overflow-hidden">
            
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.03] dark:bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/[0.03] dark:bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* ==========================================
                BLOCK A: DIGITAL CLOCK & METRICS GRID
                ========================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              
              {/* CARD A1: Digital Clock Card (Interactive Click-to-Check-In) */}
              <div 
                onClick={handleCheckIn}
                className={`relative overflow-hidden p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-auto gap-6 cursor-pointer select-none active:scale-[0.98] group
                            shadow-lg shadow-slate-100/10 dark:shadow-black/20 
                            ${isCheckedIn 
                              ? 'bg-gradient-to-br from-emerald-500/[0.04] to-emerald-500/[0.01] dark:from-[#0C0F16] dark:to-[#0C0F16] border-emerald-500/40 dark:border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/5' 
                              : 'bg-gradient-to-br from-white to-purple-500/[0.01] hover:to-purple-500/[0.03] dark:from-[#0C0F16] dark:to-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 hover:border-[#bf40bf]/40 dark:hover:border-[#bf40bf]/30 hover:shadow-purple-500/5'
                            }`}
              >
                {/* Radial Glow Overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-125" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300
                                    ${isCheckedIn 
                                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                                      : 'bg-purple-500/10 border-purple-500/20 text-[#bf40bf] dark:text-purple-400'
                                    }`}
                    >
                      <HiOutlineClock className={`w-7 h-7 ${isCheckedIn ? 'animate-none' : 'animate-pulse'}`} />
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

                  {/* Checked In status indicator */}
                  {isCheckedIn && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm animate-fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Checked In
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Today:
                    </p>
                    <p className="text-lg font-black text-slate-850 dark:text-white mt-0.5">
                      {time.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  {isCheckedIn && (
                    <div className="text-right animate-fade-in">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Check-in Time:
                      </p>
                      <p className="text-sm font-bold text-emerald-500 mt-0.5">
                        {checkInTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* METRICS ROW: 3 Balanced Metric Summary Cards (Perfectlg Grid aligned) */}
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
            </div>

            {/* ==========================================
                BLOCK B: VISUAL CHARTS GRAPH SECTION
                ========================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* CARD B1: Spline Area Chart (Daily/Weekly/Monthly Interactive Activity Analytics) */}
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

              {/* CARD B2: Weekly Attendance Trend (Non-overlapping Stacked Bar) */}
              <div className="p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:border-[#bf40bf]/30 relative overflow-hidden group">
                
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 z-10 relative">
                  <div>
                    <h2 className="text-base font-bold text-slate-850 dark:text-white tracking-tight">
                      Weekly Attendance Trend
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

            </div>

            {/* ==========================================
                BLOCK C: HIGH-FIDELITY ATTENDANCE OVERVIEW TABLE
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
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border
                              ${row.status === 'Present' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border-emerald-500/20' : ''}
                              ${row.status === 'Late' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : ''}
                              ${row.status === 'Absent' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/20' : ''}
                              ${row.status === 'On Leave' ? 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20' : ''}
                            `}>
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

          </main>
        </div>
      </div>
    </div>
  )
}

export default Home
