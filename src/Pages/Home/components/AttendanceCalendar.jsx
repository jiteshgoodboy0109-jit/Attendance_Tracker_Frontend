import { useState } from "react";
import { CalendarDetails } from "./CalendarDetails";
import { CalendarGrid } from "./CalendarGrid";

export default function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const attendanceData = {
    "2026-06-25": "present",
    "2026-06-26": "late",
    "2026-06-27": "absent",
    "2026-06-28": "leave",
  };

  return (
    <div
      className="
      rounded-2xl
      border
      bg-white
      dark:bg-[#0C0F16]
      border-[#30363D]
      dark:border-[#30363D]
      py-5
      px-5
      flex
      gap-7
      h-[650px]
      "
    >
      <div className="flex-1/3 h-full">
        <CalendarDetails
          selectedDay={selectedDay}
          data={attendanceData[selectedDay]}
        />
      </div>

      <div className="flex-2/3 h-full">
        <CalendarGrid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          attendanceData={attendanceData}
        />
      </div>
    </div>
  );
}
