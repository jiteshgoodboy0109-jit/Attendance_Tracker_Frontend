import RecentAttendanceToolbar from "./RecentAttendanceToolbar";
import RecentAttendanceTable from "./RecentAttendanceTable";

export default function RecentAttendance() {
  const attendanceData = [
    {
      id: 1,
      date: "Sun, 31 May 2026",
      firstCheckIn: "09:05 AM",
      lastCheckOut: "06:30 PM",
      duration: "9h 25m",
      status: "Present",
    },
    {
      id: 2,
      date: "Mon, 1 Jun 2026",
      firstCheckIn: "08:58 AM",
      lastCheckOut: "06:15 PM",
      duration: "9h 17m",
      status: "Present",
    },
    {
      id: 3,
      date: "Tue, 2 Jun 2026",
      firstCheckIn: "10:22 AM",
      lastCheckOut: "07:00 PM",
      duration: "8h 38m",
      status: "Late",
    },
    {
      id: 4,
      date: "Wed, 3 Jun 2026",
      firstCheckIn: "09:02 AM",
      lastCheckOut: "06:20 PM",
      duration: "9h 18m",
      status: "Present",
    },
    {
      id: 5,
      date: "Thu, 4 Jun 2026",
      firstCheckIn: "-",
      lastCheckOut: "-",
      duration: "-",
      status: "On Leave",
    },
  ];
  return (
    <div className="rounded-2xl border rounded-2xl overflow-hidden border bg-white dark:bg-dark-main-bg border-slate-200 dark:border-[#30363D] mb-10">
      <RecentAttendanceToolbar />

      <RecentAttendanceTable data={attendanceData} />
    </div>
  );
}
