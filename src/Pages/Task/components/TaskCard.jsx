import {
  FiCalendar,
  FiPaperclip,
  FiMessageSquare,
  FiEdit,
  FiCheck,
  FiTrash2,
  FiAlertCircle
} from 'react-icons/fi'
import { getDueWarningText } from '../utils/taskHelpers'

export default function TaskCard({
  task,
  isSelected,
  onSelect,
  onViewDetails,
  onEdit,
  onMarkComplete,
  onDelete
}) {
  const dueWarning = getDueWarningText(task.dueDate, task.status)
  
  // Color mapping for dynamic Priorities (mapped to authentic GitHub tags)
  const priorityCls = {
    Critical: 'bg-[#FEF2F2] dark:bg-[#F85149]/10 border-[#CF222E]/25 dark:border-[#F85149]/20 text-[#CF222E] dark:text-[#F85149]',
    High: 'bg-[#FFF8E5] dark:bg-[#D29922]/10 border-[#FB8500]/20 dark:border-[#FB8500]/20 text-[#C69026] dark:text-[#FB8500]',
    Medium: 'bg-[#DDF4FF] dark:bg-[#388BFD]/10 border-[#54AEFF]/20 dark:border-[#388BFD]/20 text-[#0969DA] dark:text-[#58A6FF]',
    Low: 'bg-[#F6F8FA] dark:bg-[#30363D]/40 border-[#D0D7DE]/40 dark:border-[#30363D]/40 text-[#57606A] dark:text-[#8B949E]'
  }[task.priority]

  // Color mapping for dynamic Statuses
  const statusCls = {
    Pending: 'bg-slate-50 dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E]',
    'In Progress': 'bg-[#DDF4FF] dark:bg-[#388BFD]/10 border-[#54AEFF]/20 dark:border-[#388BFD]/20 text-[#0969DA] dark:text-[#58A6FF]',
    Completed: 'bg-[#E6F4EA] dark:bg-[#238636]/10 border-[#3FBF5F]/20 dark:border-[#3FB950]/20 text-[#2DA44E] dark:text-[#3FB950]',
    Overdue: 'bg-[#FEF2F2] dark:bg-[#F85149]/10 border-[#CF222E]/25 dark:border-[#F85149]/20 text-[#CF222E] dark:text-[#F85149]'
  }[task.status]

  const overdueBorder = dueWarning?.type === 'overdue' ? 'border-[#F85149]/40 shadow-[#F85149]/5' : ''

  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative overflow-hidden group select-none ${overdueBorder} ${
        isSelected ? 'border-[#2EA44F] dark:border-[#3FB950] bg-[#E6F4EA]/10 dark:bg-[#238636]/5 shadow-inner' : ''
      }`}
    >
      {/* Glowing highlight indicator for critical items */}
      {(task.priority === 'Critical' || task.priority === 'High') && (
        <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none ${
          task.priority === 'Critical' ? 'bg-[#F85149]/[0.03]' : 'bg-[#D29922]/[0.03]'
        }`} />
      )}

      {/* UPPER META ROW: Checkbox & ID & Priority & Warning */}
      <div className="flex justify-between items-start gap-2.5 mb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(task.id)}
            className="w-4 h-4 rounded border-[#D0D7DE] dark:border-[#30363D] text-[#2EA44F] dark:text-[#3FB950] accent-[#2EA44F] cursor-pointer"
          />
          <span className="text-[10px] font-bold font-mono tracking-wider text-[#57606A] dark:text-[#8B949E]">
            {task.id}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {dueWarning && (
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
              dueWarning.type === 'overdue' ? 'bg-[#CF222E] dark:bg-[#F85149] text-white animate-pulse' :
              dueWarning.type === 'today' ? 'bg-[#FB8500] dark:bg-[#D29922] text-white animate-pulse' :
              'bg-[#FFF8E5] dark:bg-[#D29922]/10 border border-[#FB8500]/20 dark:border-[#D29922]/20 text-[#C69026] dark:text-[#D29922]'
            }`}>
              <FiAlertCircle className="w-2.5 h-2.5" />
              {dueWarning.text}
            </span>
          )}
          <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase tracking-wider shadow-sm ${priorityCls}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {/* MID SECTION: TITLE & DESCRIPTION */}
      <div className="space-y-1 text-left flex-grow relative z-10 text-[#24292F] dark:text-[#F0F6FC]">
        <h4 className="text-sm font-black leading-snug group-hover:text-[#2EA44F] dark:group-hover:text-[#3FB950] transition-colors">
          {task.title}
        </h4>
        <p className="text-xs text-[#57606A] dark:text-[#8B949E] line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* INTERMEDIARY CHIPS: Category & Dept & Status */}
      <div className="flex flex-wrap items-center gap-2 mt-4 text-left relative z-10">
        <span className="px-2 py-0.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[9px] font-bold text-[#57606A] dark:text-[#8B949E]">
          {task.category}
        </span>
        <span className="px-2 py-0.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[9px] font-bold text-[#57606A] dark:text-[#8B949E]">
          {task.department}
        </span>
        <span className={`px-2 py-0.5 rounded-lg border text-[9px] font-extrabold uppercase tracking-wide ml-auto shadow-sm ${statusCls}`}>
          {task.status}
        </span>
      </div>

      {/* PROGRESS BAR BLOCK */}
      <div className="mt-4 space-y-1 relative z-10">
        <div className="flex justify-between items-center text-[10px] font-black text-[#57606A] dark:text-[#8B949E] font-mono">
          <span>Progress</span>
          <span>{task.completionPercentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#EBEDF0] dark:bg-[#0D1117] rounded-full overflow-hidden border border-[#D0D7DE]/40 dark:border-[#30363D]/40">
          <div
            style={{ width: `${task.completionPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2EA44F] to-[#3FB950] dark:from-[#238636] dark:to-[#3FB950] rounded-full transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* LOWER META DETAILS GRID (Dates, Hours, Assets) */}
      <div className="mt-4 pt-3.5 border-t border-[#EAEDEF] dark:border-[#30363D]/50 grid grid-cols-2 gap-3 text-left relative z-10">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">Due Date</p>
          <p className="text-xs font-extrabold text-[#24292F] dark:text-[#C9D1D9] flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5 text-[#CF222E]/80 dark:text-[#F85149]/80" />
            {task.dueDate}
          </p>
        </div>
        <div className="space-y-0.5 text-right">
          <p className="text-[9px] font-black uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">Estimate</p>
          <p className="text-xs font-extrabold text-[#24292F] dark:text-[#C9D1D9] font-mono">
            {task.estimatedHours} Hours
          </p>
        </div>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="mt-4 pt-3.5 border-t border-[#EAEDEF] dark:border-[#30363D]/50 flex justify-between items-center relative z-10">
        {/* Social counts */}
        <div className="flex items-center gap-3.5 text-[11px] font-bold text-[#57606A] dark:text-[#8B949E] font-mono">
          <span className="flex items-center gap-1.5" title="Attachments">
            <FiPaperclip className="w-4 h-4 text-slate-400" />
            {task.attachmentsCount}
          </span>
          <span className="flex items-center gap-1.5" title="Comments">
            <FiMessageSquare className="w-4 h-4 text-[#2DA44E] dark:text-[#3FB950]/80" />
            {task.commentsCount}
          </span>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] hover:text-[#24292F] dark:hover:text-[#F0F6FC] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="View Details & Comments"
          >
            Details
          </button>
          
          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#8B949E] hover:text-[#2EA44F] dark:hover:text-[#3FB950] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
            title="Edit Task"
          >
            <FiEdit className="w-4 h-4" />
          </button>

          {task.status !== 'Completed' && (
            <button
              type="button"
              onClick={onMarkComplete}
              className="p-1.5 rounded-xl border border-[#3FBF5F]/20 bg-[#E6F4EA] dark:bg-[#238636]/10 text-[#2DA44E] dark:text-[#3FB950] hover:bg-[#2EA44F] hover:text-white dark:hover:bg-[#238636] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
              title="Mark Complete"
            >
              <FiCheck className="w-4 h-4 stroke-[3px]" />
            </button>
          )}

          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-xl border border-[#CF222E]/20 bg-[#FEF2F2] dark:bg-[#F85149]/10 text-[#CF222E] dark:text-[#F85149] hover:bg-[#CF222E] hover:text-white dark:hover:bg-[#F85149] dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
            title="Delete Task"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
