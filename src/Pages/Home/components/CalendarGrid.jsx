import { useMemo } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export function CalendarGrid({
  currentDate,
  setCurrentDate,
  selectedDay,
  setSelectedDay,
  attendanceData = {},
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysGrid = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const grid = [];

    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      grid.push(i);
    }

    return grid;
  }, [month, year]);

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const today = new Date();

  return (
    <div className="h-full flex flex-col">

      {/* HEADER */}

      <div className="flex items-center justify-between mx-9">

        <button
          onClick={previousMonth}
          className="
          w-10 h-10
          rounded-xl
          border
          flex
          items-center
          justify-center
          bg-slate-50
          dark:bg-slate-900/60
          border-slate-200
          dark:border-slate-800
          dark:text-white
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition-all
          "
        >
          <FiChevronLeft />
        </button>

        <div className="text-center">

          <h3 className="text-lg font-black text-slate-850 dark:text-white">
            {monthName} {year}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Attendance Calendar
          </p>

        </div>

        <button
          onClick={nextMonth}
          className="
          w-10 h-10
          rounded-xl
          border
          flex
          items-center
          justify-center
          bg-slate-50
          dark:bg-slate-900/60
          border-slate-200
          dark:border-slate-800
          dark:text-white
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition-all
          "
        >
          <FiChevronRight />
        </button>

      </div>

      {/* WEEKDAYS */}

      <div className="grid grid-cols-7 gap-2 mt-8 justify-items-center">

        {[
          "SUN",
          "MON",
          "TUE",
          "WED",
          "THU",
          "FRI",
          "SAT",
        ].map((day) => (
          <div
            key={day}
            className="
            text-center
            text-[10px]
            font-black
            tracking-wider
            text-slate-400
            dark:text-slate-500
            w-16
            "
          >
            {day}
          </div>
        ))}

      </div>

      {/* CALENDAR */}

      <div className="grid grid-cols-7 gap-2 mt-2 flex-grow justify-items-center">

        {daysGrid.map((dayNum, index) => {

          if (!dayNum) {
            return (
              <div
                key={`empty-${index}`}
                className=""
              />
            );
          }

          const isToday =
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            selectedDay === dayNum;

          const key = `${year}-${String(
            month + 1
          ).padStart(2, "0")}-${String(
            dayNum
          ).padStart(2, "0")}`;

          const status = attendanceData[key];

          return (
            <button
              key={dayNum}
              onClick={() =>
                setSelectedDay(dayNum)
              }
              className={`
                h-16
                w-16
                rounded-2xl
                transition-all
                relative
                flex
                flex-col
                items-center
                justify-center

                ${
                  isSelected
                    ? "bg-[#34b940]/10 border border-[#34b940]"
                    : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                }

                ${
                  isToday
                    ? "ring-1 ring-[#34b940]/40"
                    : ""
                }
              `}
            >
              <span
                className={`
                text-sm
                font-bold

                ${
                  isSelected
                    ? "text-[#34b940]"
                    : "text-slate-850 dark:text-slate-200"
                }
                `}
              >
                {dayNum}
              </span>

              {/* STATUS DOT */}

              {status && (
                <span
                  className={`
                  w-2 h-2 rounded-full mt-1

                  ${
                    status === "present"
                      ? "bg-emerald-500"
                      : status === "late"
                      ? "bg-amber-500"
                      : status === "absent"
                      ? "bg-rose-500"
                      : "bg-slate-400"
                  }
                  `}
                />
              )}

            </button>
          );
        })}

      </div>

     

      <div className="flex flex-wrap gap-4 justify-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">

        <Legend
          color="bg-emerald-500"
          label="Present"
        />

        <Legend
          color="bg-amber-500"
          label="Late"
        />

        <Legend
          color="bg-rose-500"
          label="Absent"
        />

        <Legend
          color="bg-slate-400"
          label="Leave"
        />

      </div>

    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">

      <span
        className={`w-2 h-2 rounded-full ${color}`}
      />

      {label}

    </div>
  );
}