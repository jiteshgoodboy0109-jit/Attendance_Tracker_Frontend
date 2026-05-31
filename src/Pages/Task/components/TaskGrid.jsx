import { FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import TaskCard from './TaskCard'

export default function TaskGrid({
  paginatedTasks,
  filteredTasks,
  selectedTaskIds,
  setSelectedTaskIds,
  currentPage,
  setCurrentPage,
  totalPages,
  onViewDetails,
  onEditTask,
  onMarkComplete,
  onDeleteTask,
  onResetFilters
}) {
  const allVisibleIds = filteredTasks.map(t => t.id)
  const isAllSelected = selectedTaskIds.length === allVisibleIds.length && allVisibleIds.length > 0

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      setSelectedTaskIds([])
    } else {
      setSelectedTaskIds(allVisibleIds)
    }
  }

  const handleSingleSelect = (taskId) => {
    setSelectedTaskIds(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    )
  }

  return (
    <div className="lg:col-span-8 flex flex-col space-y-6">
      {/* MASTER BULK CONTROL BAR INDICATOR */}
      {filteredTasks.length > 0 && (
        <div className="flex items-center justify-between px-2 text-xs font-black text-[#57606A] dark:text-[#8B949E] tracking-wide select-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAllToggle}
              className="w-4 h-4 rounded bg-[#FAF5FF] border-[#D0D7DE] dark:border-[#30363D] text-[#2EA44F] focus:ring-[#2EA44F] cursor-pointer"
            />
            <span>Select All Visible ({filteredTasks.length} tasks)</span>
          </div>
          <span>Total filtered: {filteredTasks.length}</span>
        </div>
      )}

      {/* TASKS CARDS CONTAINER GRID */}
      {paginatedTasks.length === 0 ? (
        /* POLISHED EMPTY STATE DESIGN */
        <div className="w-full rounded-3xl border p-12 bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-inner flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] flex items-center justify-center text-slate-400 dark:text-slate-500">
            <FiCheck className="w-8 h-8 stroke-1 text-[#2EA44F] dark:text-[#3FB950]" />
          </div>
          <div className="max-w-md space-y-1.5">
            <h4 className="text-base font-extrabold text-[#24292F] dark:text-[#F0F6FC]">
              No Matching Personal Tasks
            </h4>
            <p className="text-xs text-[#57606A] dark:text-[#8B949E] leading-relaxed">
              We couldn't find any tasks that match your active filters or search terms. Try clearing selectors to reload your sprint view.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-bold text-white rounded-xl shadow bg-[#2EA44F] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {paginatedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTaskIds.includes(task.id)}
              onSelect={handleSingleSelect}
              onViewDetails={() => onViewDetails(task)}
              onEdit={() => onEditTask(task)}
              onMarkComplete={() => onMarkComplete(task.id)}
              onDelete={() => onDeleteTask(task.id, task.title)}
            />
          ))}
        </div>
      )}

      {/* PAGINATION WRAPPER DRAWER */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-3 select-none text-xs font-black text-[#57606A] dark:text-[#8B949E]">
          <span>
            Showing {((currentPage - 1) * 6) + 1} - {Math.min(currentPage * 6, filteredTasks.length)} of {filteredTasks.length}
          </span>
          
          <div className="flex gap-1.5 items-center">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBEDF0] dark:hover:bg-[#21262D] transition-colors cursor-pointer"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                  pageNum === currentPage 
                    ? 'bg-[#2EA44F] dark:bg-[#238636] text-white shadow-md' 
                    : 'border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] hover:bg-[#EBEDF0] dark:hover:bg-[#21262D] text-[#57606A] dark:text-[#8B949E]'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-1.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBEDF0] dark:hover:bg-[#21262D] transition-colors cursor-pointer"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
