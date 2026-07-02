import { FiSearch } from "react-icons/fi";

export default function RecentAttendanceToolbar() {
  const toolBarButtons = ["All", "Present", "Absent", "Leave", "Newest"]
  return (
    <>
      <div className="flex flex-wrap gap-3 justify-between p-5">
        {/* Search */}

        <div className="relative flex-1 max-w-lg">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            placeholder="Search attendance"
            className="
            w-full
            rounded-lg
            border
            py-2
            pl-11
            pr-4
            bg-transparent
            border-slate-200
            dark:border-dark-default-border
            focus:outline-none
            dark:text-dark-primary-text
            "
          />
        </div>

        {/* Filters */}

        <div className="flex gap-2 flex-wrap">
          {toolBarButtons.map((item) => (
            <button
              key={item}
              className="
              px-4
              py-2
              rounded-lg
              border
              dark:text-dark-primary-text
              hover:bg-slate-100
              dark:border-dark-default-border
              dark:hover:bg-slate-800
              cursor-pointer
              text-[12px]
              "
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
