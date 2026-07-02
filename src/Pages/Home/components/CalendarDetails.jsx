import {
  FiClock,
  FiLogIn,
  FiLogOut,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";

export function CalendarDetails({ selectedDay, data }) {
  data = {
    status: "Present",
    firstCheckIn: "09:02 AM",
    lastCheckOut: "06:18 PM",
    workHours: "8h 47m",

    events: [
      {
        type: "CHECK_IN",
        time: "09:02 AM",
        location: "Office",
      },
      {
        type: "CHECK_OUT",
        time: "12:31 PM",
        location: "Office",
      },
      {
        type: "CHECK_IN",
        time: "01:16 PM",
        location: "Office",
      },
      {
        type: "CHECK_OUT",
        time: "06:18 PM",
        location: "Office",
      },
      {
        type: "CHECK_OUT",
        time: "06:18 PM",
        location: "Office",
      },
      {
        type: "CHECK_OUT",
        time: "06:18 PM",
        location: "Office",
      },
      
    ],
  };
  if (!data) {
    return (
      <div className="h-full rounded-xl bg-slate-50 dark:bg-slate-900/30 p-6 mr-2 flex items-center justify-center">
        <div className="text-center">
          <FiActivity className="mx-auto text-4xl text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">
            Select a date to view attendance details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col rounded-xl bg-slate-50 dark:bg-[#C9D1D9]/3 p-5 mr-2">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Attendance Summary
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {selectedDay} July 2026
          </h2>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-[12px] font-semibold uppercase ${
            data.status === "Present"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
              : data.status === "Absent"
              ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <SummaryCard
          icon={<FiLogIn />}
          title="First In"
          value={data.firstCheckIn || "--"}
        />

        <SummaryCard
          icon={<FiLogOut />}
          title="Last Out"
          value={data.lastCheckOut || "--"}
        />

        <SummaryCard
          icon={<FiClock />}
          title="Worked"
          value={data.workHours || "--"}
        />

        <SummaryCard
          icon={<FiCheckCircle />}
          title="Events"
          value={data.events?.length || 0}
        />
      </div>

      {/* Timeline */}
      <div className="flex-1  overflow-y-scroll custom-scrollbar">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Activity Timeline
        </h3>

        <div className="space-y-3 mr-2">
          {data.events?.length ? (
            data.events.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#6E7681]/2 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      event.type === "CHECK_IN"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20"
                        : "bg-red-100 text-red-600 dark:bg-red-500/20"
                    }`}
                  >
                    {event.type === "CHECK_IN" ? (
                      <FiLogIn size={15} />
                    ) : (
                      <FiLogOut size={15} />
                    )}
                  </div>

                  <div>
                    <p className="text-slate-900 dark:text-white text-[13px]">
                      {event.type === "CHECK_IN" ? "Check In" : "Check Out"}
                    </p>

                    {/* <p className="text-xs text-slate-500">
                      {event.location || "Office"}
                    </p> */}
                  </div>
                </div>

                <span className="text-slate-700 dark:text-slate-300">
                  {event.time}
                </span>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center">
              <p className="text-sm text-slate-500">
                No attendance events for this day.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#6E7681]/2 p-3">
      <div className="flex items-center gap-2 text-[#D29922] mb-2">
        {icon}
        <span className="text-xs text-slate-500">{title}</span>
      </div>

      <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
