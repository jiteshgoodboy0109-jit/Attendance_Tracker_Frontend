import RecentAttendanceRow from "./RecentAttendanceRow";

export default function RecentAttendanceTable({ data }) {
  const tableHeadings = [
    "Date",
    "First Check In",
    "Last Check Out",
    "Duration",
    "Status",
  ];
  return (
    <>
      {/* Header */}

      <table className="w-full">
        <thead className="border-y-2 border-dark-muted-border ">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="pr-4 py-3 pl-6 text-left dark:text-dark-secondary-text text-[12px] uppercase">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((attendance) => (
            <RecentAttendanceRow key={attendance.id} attendance={attendance} />
          ))}
        </tbody>
      </table>
    </>
  );
}
