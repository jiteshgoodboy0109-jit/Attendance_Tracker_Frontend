import { FiCheck, FiTrash2 } from 'react-icons/fi'

export default function BulkActionsBar({
  selectedTaskIds,
  setSelectedTaskIds,
  onBulkComplete,
  onBulkDelete,
  onBulkChangePriority
}) {
  if (selectedTaskIds.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 dark:bg-[#161B22]/90 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3.5 rounded-2xl border border-[#D0D7DE] dark:border-[#30363D] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] animate-slide-up flex flex-col md:flex-row items-center gap-2.5 md:gap-4 select-none max-w-[95vw] w-max">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 rounded-full bg-[#2EA44F] text-white text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
          {selectedTaskIds.length}
        </span>
        <span className="text-xs font-black text-[#24292F] dark:text-[#F0F6FC]">Tasks Selected</span>
        <button
          type="button"
          onClick={() => setSelectedTaskIds([])}
          className="text-[10px] font-bold text-[#57606A] hover:text-[#24292F] dark:hover:text-white flex items-center gap-1 border-r border-[#EAEDEF] dark:border-[#30363D] pr-4 mr-2 cursor-pointer"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBulkComplete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#2EA44F] text-white shadow hover:bg-[#2C974B] active:scale-95 transition-all cursor-pointer"
        >
          <FiCheck className="w-3.5 h-3.5" />
          <span>Mark Completed</span>
        </button>
        
        {/* Priority Quick Picker */}
        <div className="relative group/bulk">
          <button 
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] transition-all cursor-pointer"
          >
            <span>Set Priority</span>
          </button>
          <div className="absolute bottom-full left-0 mb-1.5 hidden group-hover/bulk:block bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] rounded-xl shadow-xl z-50 p-1 min-w-[110px] animate-scale-up">
            {['Critical', 'High', 'Medium', 'Low'].map(prio => (
              <button
                key={prio}
                type="button"
                onClick={() => onBulkChangePriority(prio)}
                className="w-full text-left px-2.5 py-1.5 text-[10px] font-black rounded-lg text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#F6F8FA] dark:hover:bg-[#21262D] hover:text-[#2EA44F] dark:hover:text-[#3FB950] cursor-pointer"
              >
                {prio}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onBulkDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#CF222E] dark:bg-[#F85149] text-white shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span>Delete Selected</span>
        </button>
      </div>
    </div>
  )
}
