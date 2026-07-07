

export default function RecentAttendanceRow({ attendance }) {
  const badge = {
    Present: "bg-emerald-500/10 text-emerald-600",

    Late: "bg-amber-500/10 text-amber-600",

    Absent: "bg-rose-500/10 text-rose-600",

    "On Leave": "bg-slate-500/10 text-slate-500",
  };

  return (
    <tr className="border-b-1 border-dark-default-border">
      <td className="pr-4 py-3 pl-6 text-left dark:text-dark-primary-text text-[12px]">{attendance.date}</td>

      <td className="pr-4 py-3 pl-6 text-left dark:text-dark-primary-text text-[12px]">{attendance.firstCheckIn}</td>

      <td className="pr-4 py-3 pl-6 text-left dark:text-dark-primary-text text-[12px]">{attendance.lastCheckOut}</td>

      <td className="pr-4 py-3 pl-6 text-left dark:text-dark-primary-text text-[12px]">{attendance.duration}</td>

      <td className="pr-4 py-3 pl-6 text-left dark:text-dark-primary-text text-[12px]">
        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-bold
          ${badge[attendance.status]}
          `}
        >
          {attendance.status}
        </span>

        {/* <button
          className="
          w-9
          h-9
          rounded-xl
          hover:bg-slate-100
          dark:hover:bg-slate-800
          flex
          items-center
          justify-center
          "
        >
          <FiArrowRight />
        </button> */}
      </td>
    </tr>
  );
}
