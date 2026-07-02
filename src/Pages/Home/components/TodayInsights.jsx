import {
  FiClock,
  FiCheckSquare,
  FiTrendingUp,
} from "react-icons/fi";

function TodayInsights() {
  const insights = [
    {
      title: "Attendance Streak",
      value: "12 Days",
      icon: FiTrendingUp,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Work Hours",
      value: "7h 42m",
      icon: FiClock,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Pending Tasks",
      value: "5",
      icon: FiCheckSquare,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        h-full
        w-full
        bg-white
        dark:bg-[#0D1117]
        border-[#bf40bf]/30
        dark:border-[#30363D]
        p-6
        flex
        flex-col
        "
    >
      {/* Header */}

      <div className="space-y-0.5">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Personal Analytics
        </p>

        <h3 className="text-lg font-black text-slate-850 dark:text-white leading-tight">
          Today's Insights
        </h3>
      </div>

      {/* Stats */}

      <div className="space-y-4.5 mt-6">
        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                p-4
                rounded-lg
                border
                bg-slate-50/50
                dark:bg-slate-900/20
                border-slate-200/80
                dark:border-slate-800/60
                "
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-10 h-10 rounded-xl border
                    flex items-center justify-center
                    ${item.color}
                    `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <h4 className="font-black text-slate-850 dark:text-white">
                    {item.value}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div
        className="
            rounded-lg
            bg-gradient-to-r
            from-[#bf40bf]/10
            to-blue-500/10
            border
            border-[#bf40bf]/20
            p-4
            mt-auto
        "
      >
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Attendance This Month
        </p>

        <div className="flex items-end justify-between mt-1">
          <h2 className="text-2xl font-black text-slate-850 dark:text-white">
            96%
          </h2>

          <span className="text-xs font-bold text-emerald-500">
            22 / 23 Days
          </span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="
                h-full
                w-[97%]
                rounded-full
                bg-gradient-to-r
                from-[#bf40bf]
                to-blue-500
            "
          />
        </div>
      </div>
    </div>
  );
}

export default TodayInsights;
