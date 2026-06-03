import { FiPlus } from 'react-icons/fi'

function LeaveHeader({
  setActiveTab,
  setFormStep
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Leave Management
        </h1>

        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Apply for leave, track balances, and manage approvals
        </p>
      </div>

      <button
        onClick={() => {
          setActiveTab('Apply')
          setFormStep(2)
        }}
        className="
          px-5 py-2.5 rounded-xl text-xs font-black
          uppercase tracking-wider text-white
          border border-indigo-600/30
          flex items-center justify-center gap-2
          transition-all duration-300
          bg-indigo-600 hover:bg-indigo-500
          shadow-md shadow-indigo-600/10
          active:scale-[0.98]
        "
      >
        <FiPlus className="w-4 h-4" />
        <span>Apply for Leave</span>
      </button>
    </div>
  )
}

export default LeaveHeader