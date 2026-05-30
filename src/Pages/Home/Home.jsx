import { useState, useEffect } from 'react'

import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'

import Dashboard from '../dashboard/Dashboard'
import Leave from '../leave/Leave'

import DigitalClockCard from '../../components/home/DigitalClockCard'
import StatsCards from '../../components/home/StatsCards'
import AttendanceChart from '../../components/home/AttendanceChart'
import MonthlyAttendanceChart from '../../components/home/MonthlyAttendanceChart'
import AttendanceTable from '../../components/home/AttendanceTable'

function Home({ defaultMenu = 'Home' }) {

  const [isDark, setIsDark] = useState(true)
  const [activeMenu, setActiveMenu] = useState(defaultMenu)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)

  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')

  const [time, setTime] = useState(new Date())

  const [splinePeriod, setSplinePeriod] = useState('Daily')

  const [hoveredWeek, setHoveredWeek] = useState(null)

  useEffect(() => {
    setActiveMenu(defaultMenu)
  }, [defaultMenu])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const [stats, setStats] = useState({
    employees: 452,
    present: 360,
    leave: 42,
    pending: 62,
    orgRate: 81
  })

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Rahul Kumar requested Sick Leave (2 days)', read: false },
    { id: 2, text: 'Sneha Sharma requested Casual Leave (1 day)', read: false },
    { id: 3, text: 'Org attendance reached 81% today!', read: false },
    { id: 4, text: 'Divya Krishnan checked in early (08:58)', read: false }
  ])

  const [leaveHistory, setLeaveHistory] = useState([])
  const [approvals, setApprovals] = useState([])
  const [teamMembers, setTeamMembers] = useState([
  {
    id: 'EMP001',
    name: 'Priya Nair',
    role: 'UI/UX Designer',
    dept: 'Design',
    date: '25 May 2026',
    status: 'Present',
    checkIn: '09:02 AM',
    checkOut: '05:30 PM',
    hours: '8.5 hrs',
    avatar: 'PN',
    bg: 'bg-teal-500'
  },
  {
    id: 'EMP002',
    name: 'Rahul Kumar',
    role: 'React Developer',
    dept: 'Engineering',
    date: '25 May 2026',
    status: 'Present',
    checkIn: '09:15 AM',
    checkOut: '06:00 PM',
    hours: '8.7 hrs',
    avatar: 'RK',
    bg: 'bg-amber-500'
  },
  {
    id: 'EMP003',
    name: 'Sneha Sharma',
    role: 'QA Engineer',
    dept: 'QA',
    date: '25 May 2026',
    status: 'Late',
    checkIn: '10:22 AM',
    checkOut: '06:30 PM',
    hours: '8.1 hrs',
    avatar: 'SS',
    bg: 'bg-purple-500'
  }
])
const filteredTeam = teamMembers.filter(m =>
  m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
  m.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
  m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  m.status.toLowerCase().includes(searchQuery.toLowerCase())
)

 const handleCheckIn = () => {

  if (!isCheckedIn) {

    const now = new Date()

    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    setIsCheckedIn(true)

    setCheckInTime(timeStr)

    const newMember = {
      id: 'EMP999',
      name: 'You',
      role: 'Super Admin',
      dept: 'Management',
      date: '25 May 2026',
      status: 'Present',
      checkIn: timeStr,
      checkOut: '—',
      hours: '—',
      avatar: 'YO',
      bg: 'bg-[#bf40bf]'
    }

    setTeamMembers(prev => [
      newMember,
      ...prev
    ])

    setStats(prev => ({
      ...prev,
      present: prev.present + 1,
      orgRate: Math.round(
        ((prev.present + 1) / prev.employees) * 100
      )
    }))

  } else {

    setIsCheckedIn(false)

    setTeamMembers(prev =>
      prev.filter(
        member => member.id !== 'EMP999'
      )
    )

    setStats(prev => ({
      ...prev,
      present: prev.present - 1,
      orgRate: Math.round(
        ((prev.present - 1) / prev.employees) * 100
      )
    }))
  }
}

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#080B11]">

        <Sidebar
          isDark={isDark}
          setIsDark={setIsDark}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-1 flex flex-col min-w-0">

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

          <main className="flex-1 p-6 relative">


            {activeMenu === 'Home' && (
              <div className="space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <DigitalClockCard
                    time={time}
                    isCheckedIn={isCheckedIn}
                    checkInTime={checkInTime}
                    handleCheckIn={handleCheckIn}
                  />

                  <StatsCards stats={stats} />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <AttendanceChart
                    splinePeriod={splinePeriod}
                    setSplinePeriod={setSplinePeriod}
                  />

                  <MonthlyAttendanceChart
                    hoveredWeek={hoveredWeek}
                    setHoveredWeek={setHoveredWeek}
                  />

                </div>

                <AttendanceTable
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredTeam={filteredTeam}
                />

              </div>
            )}

            {activeMenu === 'Dashboard' && (
              <Dashboard />
            )}

            {activeMenu === 'Leave' && (
              <Leave
                leaveHistory={leaveHistory}
                setLeaveHistory={setLeaveHistory}
                approvals={approvals}
                setApprovals={setApprovals}
              />
            )}

          </main>

        </div>

      </div>
    </div>
  )
}

export default Home