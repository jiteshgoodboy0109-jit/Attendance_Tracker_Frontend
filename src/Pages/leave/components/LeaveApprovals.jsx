import {
  FiCheck,
  FiClock,
  FiUmbrella,
  FiXCircle
} from 'react-icons/fi'

import { getLeaveIcon } from '../utils/leaveHelpers'

function LeaveApprovals({ leaveHistory }) {
  return (
    <div className="w-full rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] min-h-[450px]">

      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            My Approvals Track
          </p>

          <h3 className="text-sm font-bold uppercase mt-1">
            My Requests Endorsements Status
          </h3>
        </div>
      </div>

      <div className="flex-grow space-y-6 max-h-[420px] overflow-y-auto">

        {leaveHistory.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <FiUmbrella className="w-10 h-10 mb-2" />

            <p className="text-xs font-bold uppercase tracking-wider">
              No leave requests found
            </p>
          </div>

        ) : (

          leaveHistory.map(item => {

            const LeaveIcon = getLeaveIcon(item.type)

            const isApproved =
              item.status === 'Approved'

            const isPending =
              item.status === 'Pending'

            const isRejected =
              item.status === 'Rejected'

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border bg-slate-50/50 dark:bg-[#1C1D24]/20"
              >

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <LeaveIcon className="w-4 h-4" />

                    <div>
                      <h4 className="text-xs font-bold">
                        {item.type}
                      </h4>

                      <p className="text-[10px] text-slate-500">
                        {item.duration}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase

                    ${
                      isApproved
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : isRejected
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }
                  `}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="pt-4 mt-4 border-t flex flex-wrap items-center gap-4">

                  <div className="flex items-center gap-2">

                    <div className="w-5 h-5 rounded flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                      <FiCheck className="w-3 h-3" />
                    </div>

                    <span className="text-[10px]">
                      Submitted
                    </span>
                  </div>

                  <span>➜</span>

                  <div className="flex items-center gap-2">

                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center

                      ${
                        isApproved
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : isRejected
                          ? 'bg-rose-500/10 text-rose-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }
                    `}
                    >
                      {isApproved ? (
                        <FiCheck className="w-3 h-3" />
                      ) : isRejected ? (
                        <FiX className="w-3 h-3" />
                      ) : (
                        <FiClock className="w-3 h-3" />
                      )}
                    </div>

                    <span className="text-[10px]">
                      HR Review
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

export default LeaveApprovals