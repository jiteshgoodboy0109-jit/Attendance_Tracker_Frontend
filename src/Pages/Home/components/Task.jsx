import { MdOutlineTaskAlt } from "react-icons/md";
import TaskCard from "./TaskCard";
import { useState } from "react";

export function Task() {
  const tasks = [
    {
      id: 1,
      name: "Task 1: Design Premium UI/UX Guidelines",
      assignedDate: "25 May 2026",
      dueDate: "29 May 2026",
      status: "In Progress",
      priority: "Low",
      description:
        "Create premium high-fidelity wireframes and establish the global design tokens, color palette, and micro-animations for the Attendance Tracker application.",
    },
    {
      id: 2,
      name: "Task 2: Integrate Interactive Calendar API",
      assignedDate: "26 May 2026",
      dueDate: "01 Jun 2026",
      status: "Completed",
      priority: "Critical",
      description:
        "Connect the frontend interactive monthly calendar grid with Google Calendar and local logs to fetch real-time employee attendance events dynamically.",
    },
    {
      id: 3,
      name: "Task 3: Refactor State Management & Auth Flow",
      assignedDate: "26 May 2026",
      dueDate: "28 May 2026",
      status: "In Progress",
      priority: "High",
      description:
        "Migrate the active worker session states  and global theme provider to a centralized context API to resolve synchronization bugs.",
    },
  ];

  const [expandedTask, setExpandedTask] = useState(null);
  return (
    <div
      className="w-full rounded-2xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300  overflow-hidden group
            bg-white dark:bg-[#0D1117] dark:border-[#30363D]"
    >
      <div>
        <div className="flex justify-between items-center z-10 mb-4">
          <div className="space-y-0.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Organization Tasks
            </p>
            <h3 className="text-lg font-black text-slate-850 dark:text-white leading-tight">
              Task Manager
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-scroll custom-scrollbar max-h-[380px] space-y-3.5 z-10 pr-2 mt-2">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 h-full text-slate-400 dark:text-slate-500">
            {/* <FiCheck className="w-10 h-10 mb-2 stroke-1 text-[#3FB950]" /> */}
            {/* <FaClipboardCheck className="w-10 h-10 mb-2 stroke-1 text-[#3FB950]" /> */}
            <MdOutlineTaskAlt className="w-15 h-15 mb-4 text-[#3FB950]" />

            <p className="text-lg font-bold uppercase tracking-wider text-[#3FB950] border-transparent">
              All tasks completed!
            </p>
          </div>
        ) : (
          tasks.map((task) => {
            const isExpanded = expandedTask === task.id;
            return (
              // <div
              //   key={task.id}
              //   onClick={() => toggleDescription(task.id)}
              //   className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none
              //                             bg-slate-50/50 dark:bg-slate-900/20 border-slate-200/80 dark:border-slate-850/60
              //                             hover:border-[#bf40bf]/30 dark:hover:border-purple-500/30 hover:bg-slate-100/30 dark:hover:bg-slate-900/40
              //                             ${
              //                               isExpanded
              //                                 ? "border-[#bf40bf]/30 dark:border-purple-500/30 bg-slate-100/30 dark:bg-slate-900/40 shadow-inner"
              //                                 : ""
              //                             }`}
              // >
              //   <div className="flex justify-between items-start gap-4">
              //     <div className="space-y-1">
              //       <h4 className="text-xs font-black text-slate-850 dark:text-white leading-tight">
              //         {task.name}
              //       </h4>

              //       <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              //         <span className="text-[10px] text-slate-450 dark:text-slate-500 flex items-center gap-1">
              //           <FiCalendar className="w-3 h-3 text-[#bf40bf]/60 dark:text-purple-400/60" />
              //           <span className="font-semibold uppercase tracking-wider">
              //             Assigned:
              //           </span>{" "}
              //           {task.assignedDate}
              //         </span>
              //         <span className="text-[10px] text-slate-450 dark:text-slate-500 flex items-center gap-1">
              //           <FiClock className="w-3 h-3 text-rose-500/60" />
              //           <span className="font-semibold uppercase tracking-wider text-rose-600/70 dark:text-rose-450/70">
              //             Due:
              //           </span>{" "}
              //           {task.dueDate}
              //         </span>
              //       </div>
              //     </div>

              //     <div
              //       className={`transition-transform duration-300 mt-0.5 text-slate-400 dark:text-slate-500 ${
              //         isExpanded
              //           ? "-rotate-90 text-[#bf40bf] dark:text-purple-400"
              //           : "rotate-0"
              //       }`}
              //     >
              //       <FiChevronLeft className="w-4 h-4" />
              //     </div>
              //   </div>

              //   {isExpanded && (
              //     <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-[#070A0F] border border-slate-100 dark:border-slate-850/40 text-[11px] text-slate-650 dark:text-slate-400 leading-relaxed animate-fade-in shadow-inner">
              //       {task.description}
              //     </div>
              //   )}
              // </div>
              <TaskCard
                key={task.id}
                task={task}
                isExpanded={isExpanded}
                toggleDescription={(id) =>
                  setExpandedTask(expandedTask === id ? null : id)
                }
              />
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-850/30 z-10 text-[10px] font-bold text-slate-450 dark:text-white">
        <span>Total: {tasks.length} active tasks</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
          Live sync active
        </span>
      </div>
    </div>
  );
}
