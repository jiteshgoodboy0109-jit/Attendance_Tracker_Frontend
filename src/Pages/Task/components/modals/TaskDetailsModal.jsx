import { useState } from 'react'
import {
  FiX,
  FiUser,
  FiBriefcase,
  FiClock,
  FiInfo,
  FiCalendar,
  FiCheck
} from 'react-icons/fi'
import { getTimelineSteps } from '../../utils/taskHelpers'

export default function TaskDetailsModal({
  task,
  onClose,
  activeTab,
  setActiveTab,
  commentText,
  setCommentText,
  onAddComment,
  onEditFromDetails
}) {
  const [copied, setCopied] = useState(false)

  if (!task) return null

  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="w-full max-w-2xl rounded-3xl border bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-2xl p-6 relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-[#EAEDEF] dark:border-[#30363D]/50 pb-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyId}
                className="px-2.5 py-0.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] text-[9px] font-black font-mono uppercase tracking-wider bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#8B949E] hover:border-[#2EA44F] dark:hover:border-[#238636] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Task ID"
              >
                <span>{task.id}</span>
                {copied ? (
                  <span className="text-[#2EA44E] dark:text-[#3FB950] font-black">✓ Copied</span>
                ) : (
                  <span className="opacity-60 text-[8px]">📋</span>
                )}
              </button>
              <span className="px-2.5 py-0.5 rounded-lg border border-[#D0D7DE] dark:border-[#30363D] text-[9px] font-black font-mono uppercase tracking-wider bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#8B949E]">
                {task.category}
              </span>
            </div>
            <h3 className="text-base font-black text-[#24292F] dark:text-[#F0F6FC] leading-snug mt-1">
              {task.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E] hover:bg-[#EBEDF0] dark:hover:bg-[#21262D] hover:text-[#24292F] dark:hover:text-white transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* TAB SELECTORS BUTTONS */}
        <div className="w-full flex overflow-x-auto no-scrollbar border-b border-[#EAEDEF] dark:border-[#30363D]/50 text-xs font-black uppercase tracking-wider text-[#57606A] dark:text-[#8B949E] select-none whitespace-nowrap scroll-smooth">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'timeline', label: 'Timeline Stepper' },
            { key: 'comments', label: `Comments (${task.comments.length})` },
            { key: 'history', label: 'Activity Log' }
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3.5 border-b-2 transition-all cursor-pointer flex-shrink-0 ${
                activeTab === tab.key 
                  ? 'border-[#2EA44F] dark:border-[#3FB950] text-[#2EA44F] dark:text-[#3FB950] font-black' 
                  : 'border-transparent hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS PANEL */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-5 min-h-[300px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#57606A] dark:text-[#8B949E]">Description</p>
                <p className="text-xs text-[#57606A] dark:text-[#C9D1D9] leading-relaxed bg-[#F6F8FA]/50 dark:bg-[#0D1117]/50 p-4 rounded-2xl border border-[#D0D7DE] dark:border-[#30363D]">
                  {task.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Assigned By', value: task.assignedBy, icon: FiUser },
                  { label: 'Department / Team', value: task.department, icon: FiBriefcase },
                  { label: 'Estimated Sprint Time', value: `${task.estimatedHours} Hours`, icon: FiClock },
                  { label: 'Status & Priority', value: `${task.status} (${task.priority})`, icon: FiInfo },
                  { label: 'Assigned Date', value: task.assignedDate, icon: FiCalendar },
                  { label: 'Target Deadline', value: task.dueDate, icon: FiCalendar }
                ].map((detail, idx) => {
                  const Icon = detail.icon
                  return (
                    <div key={idx} className="p-3.5 rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA]/30 dark:bg-[#0D1117]/30 flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#2EA44F] dark:text-[#3FB950]/85" />
                      <div className="text-left space-y-0.5">
                        <p className="text-[9px] font-black uppercase text-[#57606A] dark:text-[#8B949E]">{detail.label}</p>
                        <p className="text-xs font-extrabold text-[#24292F] dark:text-[#C9D1D9]">{detail.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE STEPPER */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 py-2 px-4 animate-fade-in text-left">
              <div className="relative border-l-2 border-[#EAEDEF] dark:border-[#30363D]/80 ml-3.5 pl-6 space-y-7">
                {getTimelineSteps(task).map((step, idx) => (
                  <div key={step.key} className="relative group text-left">
                    {/* Stepper Node circle */}
                    <span className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-all ${
                      step.done 
                        ? 'bg-[#2EA44F] dark:bg-[#238636] border-[#2EA44F] dark:border-[#238636] text-white shadow-md' 
                        : 'bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E]'
                    }`}>
                      {step.done ? <FiCheck className="w-3.5 h-3.5 stroke-[3px]" /> : idx + 1}
                    </span>

                    <div className="space-y-0.5">
                      <h5 className={`text-xs font-black uppercase tracking-wider ${step.done ? 'text-[#24292F] dark:text-[#F0F6FC]' : 'text-[#57606A] dark:text-[#8B949E]'}`}>
                        {step.label}
                      </h5>
                      <p className="text-[11px] text-[#57606A] dark:text-[#8B949E]">
                        {step.done ? step.desc : 'Awaiting initialization'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMENTS SECTION */}
          {activeTab === 'comments' && (
            <div className="space-y-6 animate-fade-in flex flex-col h-full justify-between text-left">
              {/* List of comments */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {task.comments.length === 0 ? (
                  <p className="text-xs text-[#57606A] dark:text-[#8B949E] text-center py-6">
                    No comments posted yet. Type below to add a personal updates note.
                  </p>
                ) : (
                  task.comments.map(c => (
                    <div key={c.id} className="p-3.5 rounded-2xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA]/30 dark:bg-[#0D1117]/30 text-left space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-black">
                        <span className="text-[#2EA44F] dark:text-[#3FB950]">{c.author} ({c.role})</span>
                        <span className="text-[#57606A] dark:text-[#8B949E] font-mono">{c.time}</span>
                      </div>
                      <p className="text-xs text-[#24292F] dark:text-[#C9D1D9] font-sans leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add comment textarea */}
              <form onSubmit={onAddComment} className="border-t border-[#EAEDEF] dark:border-[#30363D]/50 pt-4 space-y-2 text-left">
                <textarea
                  rows="2.5"
                  placeholder="Type a comments note on your progress update..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] placeholder-[#6E7781] dark:placeholder-[#8B949E] focus:outline-none focus:border-[#2EA44F] dark:focus:border-[#238636] text-left"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white rounded-xl shadow bg-[#2EA44F] dark:bg-[#238636] hover:bg-[#2C974B] dark:hover:bg-[#2EA043] transition-all cursor-pointer"
                  >
                    Submit Comment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ACTIVITY LOG LIST */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fade-in max-h-[300px] overflow-y-auto pr-1 text-left">
              {task.history.map((hist, i) => (
                <div key={i} className="flex gap-3 text-left border-l-2 border-[#EAEDEF] dark:border-[#30363D] ml-2 pl-4 py-1 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2EA44F] dark:bg-[#3FB950]" />
                  <div className="space-y-0.5 text-left">
                    <p className="text-xs font-extrabold text-[#24292F] dark:text-[#C9D1D9] text-left">
                      {hist.action}
                    </p>
                    <div className="flex gap-2 text-[9px] font-semibold text-[#57606A] dark:text-[#8B949E] font-mono">
                      <span>By {hist.user}</span>
                      <span>•</span>
                      <span>{hist.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-[#EAEDEF] dark:border-[#30363D]/50 pt-4 flex justify-between items-center text-[10px] font-black text-[#57606A] dark:text-[#8B949E] uppercase">
          <span>Last updated: {task.lastUpdatedTime}</span>
          <button
            type="button"
            onClick={() => onEditFromDetails(task)}
            className="px-4 py-1.5 text-xs font-bold rounded-xl border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#21262D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] hover:text-[#24292F] dark:hover:text-[#F0F6FC] cursor-pointer"
          >
            Edit
          </button>
        </div>

      </div>
    </div>
  )
}
