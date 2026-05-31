import { FiX } from 'react-icons/fi'
import { CATEGORY_TAGS, DEPARTMENTS } from '../../utils/taskHelpers'

export default function TaskFormModal({
  mode, // 'add' | 'edit'
  formData,
  setFormData,
  onClose,
  onSubmit,
  taskId
}) {
  const isEdit = mode === 'edit'

  const handleChange = (field, val) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: val }
      
      // Auto-adjustments:
      if (isEdit) {
        if (field === 'status' && val === 'Completed') {
          updated.completionPercentage = 100
        } else if (field === 'completionPercentage') {
          const percent = Number(val)
          if (percent === 100) {
            updated.status = 'Completed'
          } else if (prev.status === 'Completed') {
            updated.status = 'In Progress'
          }
        }
      }
      return updated
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <form 
        onSubmit={onSubmit} 
        className="w-full max-w-lg rounded-3xl border bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-2xl p-6 relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#EAEDEF] dark:border-[#30363D]/50 pb-4">
          <h3 className="text-base font-black text-[#24292F] dark:text-[#F0F6FC]">
            {isEdit ? `Edit Task Details (${taskId})` : 'Self Assign New Task'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E] hover:bg-[#EBEDF0] dark:hover:bg-[#21262D] transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body Controls */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 text-left">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Task Title</label>
            <input
              type="text"
              placeholder={isEdit ? '' : 'e.g. Implement heartbeat checks for sockets...'}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F] text-left"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Description</label>
            <textarea
              rows="3"
              placeholder={isEdit ? '' : 'Detail the specific tasks details, goals, and technical guidelines...'}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F] text-left"
              required
            />
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F]"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                {isEdit && <option value="Overdue">Overdue</option>}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Progress Slider (Only visible in edit mode) & Est Hours */}
          <div className={`grid ${isEdit ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            {isEdit && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">
                  Completion % ({formData.completionPercentage}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.completionPercentage}
                  onChange={(e) => handleChange('completionPercentage', e.target.value)}
                  className="w-full h-1.5 bg-[#EBEDF0] dark:bg-[#0D1117] rounded-lg appearance-none cursor-pointer accent-[#2EA44F]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Estimated Hours</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.estimatedHours}
                onChange={(e) => handleChange('estimatedHours', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F]"
                required
              />
            </div>
          </div>

          {/* Grid 3: Category & Department & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-2 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F]"
              >
                {CATEGORY_TAGS.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Dept</label>
              <select
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-2 py-2 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F]"
              >
                {DEPARTMENTS.slice(1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="w-full px-2 py-1.5 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] focus:outline-none focus:border-[#2EA44F] text-left"
                required
              />
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="border-t border-[#EAEDEF] dark:border-[#30363D]/50 pt-4 flex justify-end gap-2 text-left">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-bold text-white rounded-xl shadow bg-[#2EA44F] dark:bg-[#238636] hover:bg-[#2C974B] dark:hover:bg-[#2EA043] transition-all cursor-pointer"
          >
            {isEdit ? 'Save Changes' : 'Self Assign'}
          </button>
        </div>

      </form>
    </div>
  )
}
