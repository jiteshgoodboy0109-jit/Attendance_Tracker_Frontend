import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function TaskCard({ task, isExpanded, toggleDescription }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const priorityStyles = {
    Critical: "text-red-600",
    High: "text-orange-600",
    Medium: "text-amber-600",
    Low: " text-emerald-600",
  };

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className={`p-4 rounded-lg border transition-all duration-300
      bg-slate-50/50 dark:bg-slate-900/20
      border-slate-200/80 dark:border-slate-800/60
      hover:border-[#bf40bf]/30 dark:hover:border-[#c9d1d9]
      hover:bg-slate-100/30 dark:hover:bg-slate-900/40
      ${
        isExpanded
          ? "border-[#bf40bf]/30 dark:border-purple-500/30 shadow-inner"
          : ""
      }`}
    >
      {/* HEADER */}
      <div
        onClick={() => toggleDescription(task.id)}
        className="cursor-pointer"
      >
        <div className="flex justify-between items-start gap-5">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                {task.name}
              </h4>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-3 pt-1">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                Assigned: {task.assignedDate}
              </span>

              <span className="text-[11px] text-[#DA3633] flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                Due: {task.dueDate}
              </span>

              <span
                className={`
                      text-[11px]
                      font-semibold
                      ${priorityStyles[task.priority]}
                  `}
              >
                {task.priority}
              </span>

              <span
                className={`text-[11px] font-semibold text-nowrap
                ${
                  task.status === "In Progress"
                    ? " text-amber-600"
                    : task.status === "Completed"
                    ? "text-emerald-600"
                    : "text-slate-600"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>

          <div
            className={`transition-transform duration-300
            ${
              isExpanded
                ? "rotate-90 text-[#bf40bf]"
                : "rotate-0 text-slate-400"
            }`}
          >
            <FiChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* EXPANDED CONTENT */}

      {isExpanded && (
        <div className="mt-4 animate-fade-in">
          <div
            className="rounded-xl border p-3
            bg-white dark:bg-[#070A0F]
            border-slate-100 dark:border-slate-800"
          >
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {task.description}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="
                flex items-center gap-2
                px-4 py-2
                rounded-lg
                bg-[#238636]
                hover:bg-[#196C2F]
                text-white
                text-xs
                font-semibold
                transition-all
                cursor-pointer
                "
              >
                Open Task
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
