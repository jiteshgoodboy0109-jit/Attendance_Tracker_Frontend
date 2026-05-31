import { useMemo } from 'react'
import {
  FiClipboard,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi'

export default function StatsBanner({ tasks }) {
  const taskStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]
    const today = new Date(todayStr)

    const stats = {
      total: tasks.length,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0
    }

    tasks.forEach(t => {
      if (t.status === 'Pending') stats.pending++
      else if (t.status === 'In Progress') stats.inProgress++
      else if (t.status === 'Completed') stats.completed++
      
      const taskDate = new Date(t.dueDate)
      if (t.status === 'Overdue' || (taskDate < today && t.status !== 'Completed')) {
        stats.overdue++
      }
    })

    return stats
  }, [tasks])

  const cardsData = [
    {
      label: 'Total Tasks',
      value: taskStats.total,
      desc: 'All assigned tasks',
      trend: '↑ 12%',
      subTrend: '+2 from last week',
      colorClass: 'text-[#58A6FF]',
      bgClass: 'bg-[#58A6FF]/10 dark:bg-[#1f2d3d]',
      icon: FiClipboard,
      sparklinePath: 'M0,15 L10,18 L20,10 L30,22 L40,15 L50,8 L60,18 L70,25 L80,12 L90,15 L100,5'
    },
    {
      label: 'Pending',
      value: taskStats.pending,
      desc: 'Tasks waiting to start',
      trend: '↑ 5%',
      subTrend: '+1 from last week',
      colorClass: 'text-[#D29922]',
      bgClass: 'bg-[#D29922]/10 dark:bg-[#342a15]',
      icon: FiClock,
      sparklinePath: 'M0,20 L10,20 L20,15 L30,22 L40,10 L50,18 L60,15 L70,22 L80,15 L90,18 L100,10'
    },
    {
      label: 'In Progress',
      value: taskStats.inProgress,
      desc: 'Tasks in progress',
      trend: '↑ 8%',
      subTrend: '+1 from last week',
      colorClass: 'text-[#388BFD]',
      bgClass: 'bg-[#388BFD]/10 dark:bg-[#1a2336]',
      icon: FiActivity,
      sparklinePath: 'M0,18 L10,18 L20,12 L30,22 L40,15 L50,25 L60,18 L70,12 L80,22 L90,15 L100,12'
    },
    {
      label: 'Completed',
      value: taskStats.completed,
      desc: 'Tasks completed',
      trend: '↑ 20%',
      subTrend: '+1 from last week',
      colorClass: 'text-[#3FB950]',
      bgClass: 'bg-[#3FB950]/10 dark:bg-[#1b281f]',
      icon: FiCheckCircle,
      sparklinePath: 'M0,20 L10,15 L20,25 L30,18 L40,12 L50,22 L60,18 L70,10 L80,15 L90,8 L100,18'
    },
    {
      label: 'Overdue',
      value: taskStats.overdue,
      desc: 'Tasks past due date',
      trend: '↓ 10%',
      subTrend: '+1 from last week',
      colorClass: 'text-[#F85149]',
      bgClass: 'bg-[#F85149]/10 dark:bg-[#351a1a]',
      icon: FiAlertCircle,
      sparklinePath: 'M0,22 L10,22 L20,15 L30,25 L40,18 L50,22 L60,15 L70,12 L80,20 L90,18 L100,18'
    }
  ]

  return (
    <div className="flex overflow-x-auto pb-3 gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-5 md:pb-0">
      {cardsData.map((card, i) => {
        const Icon = card.icon
        return (
          <div
            key={i}
            className="flex-shrink-0 w-[230px] md:w-auto snap-start rounded-2xl border p-5 bg-white dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] transition-all duration-300 hover:shadow-lg flex flex-col justify-between relative group min-h-[180px] md:min-h-[220px] text-left hover:scale-[1.02]"
          >
            {/* Header: Icon & Trend percentage pill */}
            <div className="flex justify-between items-center w-full">
              <div className={`p-2.5 rounded-xl ${card.bgClass} border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.colorClass}`} />
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wide uppercase ${card.bgClass} ${card.colorClass}`}>
                {card.trend}
              </span>
            </div>

            {/* Main value and description labels */}
            <div className="mt-4 space-y-1 text-left flex-grow">
              <h3 className="text-3xl font-extrabold text-[#24292F] dark:text-[#F0F6FC] leading-none font-sans mt-1">
                {card.value}
              </h3>
              <p className="text-sm font-extrabold text-[#24292F] dark:text-[#F0F6FC] tracking-tight">
                {card.label}
              </p>
              <p className="text-xs text-[#57606A] dark:text-[#8B949E] mt-0.5 font-medium leading-none">
                {card.desc}
              </p>
            </div>

            {/* Mini Sparkline Chart representing commits/tasks trend */}
            <div className="mt-3.5 w-full select-none pointer-events-none opacity-85">
              <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
                <path
                  d={card.sparklinePath}
                  stroke={i === 4 ? '#F85149' : i === 3 ? '#3FB950' : i === 1 ? '#D29922' : '#58A6FF'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Bottom Trend Sub text */}
            <div className="mt-3 border-t border-[#EAEDEF] dark:border-[#30363D]/40 pt-2.5 text-[10.5px] font-extrabold text-left leading-none">
              <span className={card.colorClass}>
                {card.subTrend}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
