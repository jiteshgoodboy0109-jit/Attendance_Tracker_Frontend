import {
  FiActivity,
  FiCoffee,
  FiUmbrella,
  FiHeart,
  FiUser,
  FiFileText
} from 'react-icons/fi'

import {
  getStatusCfg,
  getLeaveIcon
} from '../utils/leaveHelpers'

function LeaveOverview({
  balanceCards,
  historyFilter,
  setHistoryFilter,
  filteredHistory,
  approvals,
  handleCancelRequest
}) {
  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">

      {/* LEAVE BALANCES */}
      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 dark:text-[#E4E6EB] tracking-tight uppercase">
            Leave Balances
          </h2>

          <span className="px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-[#222429] bg-slate-50 dark:bg-[#121318] text-[9px] font-bold text-slate-500 dark:text-[#888A96] uppercase tracking-wider">
            FY 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {balanceCards.map((b) => {

            const IconComp = b.icon

            return (
              <div
                key={b.type}
                className="p-5 rounded-xl border bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128]"
              >

                <div className="flex justify-between items-start">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2 text-slate-500 dark:text-[#888A96]">
                      <IconComp className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {b.type}
                      </span>
                    </div>

                    <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                      {b.remaining}
                      <span className="text-xs font-normal text-slate-400">
                        {' '}
                        / {b.total} days left
                      </span>
                    </p>

                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 dark:text-[#585966] bg-slate-50 dark:bg-[#1C1D24] px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800/40">
                    {b.used} used
                  </span>

                </div>

                <div className="mt-6 space-y-1.5">

                  <div className="w-full h-1 bg-slate-100 dark:bg-[#1D1E24] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${b.barColor}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[9px] font-semibold text-slate-400 dark:text-[#585966]">
                    <span>{b.pct}% REMAINING</span>
                    <span>{b.total}D TOTAL</span>
                  </div>

                </div>

              </div>
            )
          })}
        </div>

        {/* OTHER LEAVES */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          {[
            {
              type: 'Maternity Leave',
              icon: FiHeart,
              iconColor: 'text-rose-500',
              desc: '90 days remaining',
              badge: '90d'
            },
            {
              type: 'Paternity Leave',
              icon: FiUser,
              iconColor: 'text-blue-500',
              desc: '15 days remaining',
              badge: '15d'
            },
            {
              type: 'Unpaid Leave',
              icon: FiFileText,
              iconColor: 'text-slate-400',
              desc: '0 days remaining',
              badge: '0d'
            }
          ].map((o) => {

            const IconComp = o.icon

            return (
              <div
                key={o.type}
                className="p-4 rounded-xl border bg-white dark:bg-[#121318] border-slate-200 dark:border-[#1F2128] flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <IconComp className={`w-4 h-4 ${o.iconColor}`} />

                  <div>
                    <h4 className="text-xs font-bold">
                      {o.type}
                    </h4>

                    <p className="text-[10px] text-slate-400">
                      {o.desc}
                    </p>
                  </div>

                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-50 dark:bg-[#1C1D24]">
                  {o.badge}
                </span>

              </div>
            )
          })}
        </div>

      </div>

      {/* HISTORY + APPROVALS */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* MY HISTORY */}

        <div className="lg:col-span-8 space-y-4">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <h3 className="text-base font-bold">
              My Leave History
            </h3>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0C0F16] p-1 rounded-xl border">

              {['All', 'Pending', 'Approved', 'Rejected'].map(filt => {

                const isActive = historyFilter === filt

                return (
                  <button
                    key={filt}
                    onClick={() => setHistoryFilter(filt)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    {filt}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border bg-white dark:bg-[#121318] rounded-xl overflow-hidden">

            {filteredHistory.length === 0 ? (
              <div className="p-12 text-center">
                <FiUmbrella className="w-8 h-8 mx-auto mb-3" />
                <p className="text-xs font-bold uppercase">
                  No leave logs match filter criteria
                </p>
              </div>
            ) : (
              <div className="divide-y">

                {filteredHistory.map(item => {

                  const statusCfg = getStatusCfg(item.status)
                  const LeaveIcon = getLeaveIcon(item.type)

                  return (
                    <div
                      key={item.id}
                      className="p-5 flex flex-col sm:flex-row justify-between gap-4"
                    >

                      <div>

                        <div className="flex items-center gap-2">

                          <LeaveIcon className="w-4 h-4" />

                          <h4 className="font-bold text-xs">
                            {item.type}
                          </h4>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] border ${statusCfg.color}`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <p className="text-xs mt-2">
                          {item.duration}
                        </p>

                        <p className="text-[11px] italic mt-1">
                          "{item.reason}"
                        </p>

                      </div>

                      {item.status === 'Pending' && (
                        <button
                          onClick={() => handleCancelRequest(item.id)}
                          className="px-3 py-1.5 rounded-lg text-[10px] border"
                        >
                          Cancel
                        </button>
                      )}

                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* TEAM APPROVALS */}

        <div className="lg:col-span-4">

          <div className="p-5 rounded-xl border bg-white dark:bg-[#121318]">

            <h3 className="text-sm font-bold mb-4">
              Team Leave Requests
            </h3>

            {approvals.length === 0 ? (
              <p className="text-xs text-slate-400">
                No requests available
              </p>
            ) : (
              approvals.map(app => (
                <div
                  key={app.id}
                  className="mb-3 p-3 rounded-lg border"
                >
                  <h4 className="text-xs font-bold">
                    {app.name}
                  </h4>

                  <p className="text-[10px] mt-1">
                    {app.type} Leave
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {app.duration}
                  </p>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default LeaveOverview