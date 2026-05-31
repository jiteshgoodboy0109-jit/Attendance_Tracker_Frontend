import { useState, useEffect } from 'react'

import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'

import Dashboard from '../dashboard/Dashboard'
import Leave from '../leave/Leave'
import Github from '../Github/Github'
import Reports from '../reports/Reports'
import Task from '../Task/Task'


import DigitalClockCard from '../../components/home/DigitalClockCard'
import StatsCards from '../../components/home/StatsCards'
import AttendanceChart from '../../components/home/AttendanceChart'
import MonthlyAttendanceChart from '../../components/home/MonthlyAttendanceChart'
import AttendanceTable from '../../components/home/AttendanceTable'

function Home() {

  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')

  const [time, setTime] = useState(new Date())

  const [splinePeriod, setSplinePeriod] = useState('Daily')

  const [hoveredWeek, setHoveredWeek] = useState(null)

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
  m.name.toLowerCase()
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
        
    <div className="space-y-6">

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
            {activeMenu === 'Reports' && (
              <Reports />
            )}

            {activeMenu === 'Tasks' && (
              <Task />
            )}


      </div>

      <AttendanceTable
        filteredTeam={filteredTeam}
      />

    </div>
  )
}

export default Home