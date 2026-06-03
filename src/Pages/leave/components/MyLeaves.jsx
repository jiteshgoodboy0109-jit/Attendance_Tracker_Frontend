import {
  FiCalendar,
  FiClock,
  FiUmbrella
} from 'react-icons/fi'

import {
  getStatusCfg,
  getLeaveIcon
} from '../utils/leaveHelpers'

function MyLeaves({ leaveHistory }) {
  return (
    <div className="w-full rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group
      bg-white dark:bg-[#0C0F16] border-slate-200/60 dark:border-slate-850/60 shadow-md hover:shadow-xl min-h-[450px]">

      <div className="flex justify-between items-start z-10 mb-6">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-550">
            Personal Logs
          </p>

          <h3 className="text-base font-black text-slate-800 dark:text-white leading-tight">
            My Historical Applications
          </h3>
        </div>
      </div>

      <div className="flex-grow space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-slate-850/50 z-10 max-h-[420px] overflow-y-auto">

        {leaveHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-550">
            <FiUmbrella className="w-10 h-10 mb-2 stroke-1" />
            <p className="text-xs font-bold uppercase tracking-wider">
              No leave logs recorded yet
            </p>
          </div>
        ) : (
          leaveHistory.map(item => {

            const statusCfg = getStatusCfg(item.status)
            const Icon = statusCfg.icon
            const LeaveIcon = getLeaveIcon(item.type)

            return (
              <div key={item.id} className="relative">

                <span
                  className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0C0F16] ${statusCfg.glow}`}
                />

                <div className="p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/10">

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div className="space-y-1">

                      <div className="flex items-center gap-2">
                        <LeaveIcon className="w-4 h-4 text-purple-500" />

                        <h4 className="text-xs font-black">
                          {item.type} Application
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-4 text-[10px]">

                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {item.duration}
                        </span>

                        <span className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {item.days} day(s)
                        </span>

                      </div>

                      <p className="text-[10px] italic">
                        "{item.reason}"
                      </p>

                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-xl border text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${statusCfg.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {item.status}
                    </span>

                  </div>

                </div>
              </div>
            )
          })
        )}

      </div>
    </div>
  )
}

export default MyLeaves