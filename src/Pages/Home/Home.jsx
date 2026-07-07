import { useState, useEffect, useRef } from "react";

import CheckoutModal from "../../components/modals/CheckoutModal";
import TodayInsights from "./components/TodayInsights";
import AttendanceCalendar from "./components/AttendanceCalendar";
import RecentAttendance from "./components/RecentAttendance";
import { getElapsedHoursMinsStr, getTimeStr } from "../../utils/home";
import { Task } from "./components/Task";

// import { AttendanceSection } from "./components/AttendanceSection";

import { AttendanceSection } from "./components/AttendanceSection";

function Home() {
  const [checkInStatus, setCheckInStatus] = useState("not_checked_in");

  const [checkOutTime, setCheckOutTime] = useState("");

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (checkInStatus === "working") {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [checkInStatus]);

  const handleCheckOutAction = () => {
    const timeStr = getTimeStr();
    setCheckInStatus("done");
    setCheckOutTime(timeStr);
    setShowCheckoutModal(false);
  };

  const [remarks, setRemarks] = useState("");
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 items-start animate-fade-in">


        {/* Attendance Section */}
        <div className="lg:col-span-4 flex h-[500px]">
          <AttendanceSection
            checkInStatus={checkInStatus}
            timerSeconds={timerSeconds}
            setShowCheckoutModal={setShowCheckoutModal}
            checkOutTime={checkOutTime}
            setCheckInStatus={setCheckInStatus}
            setTimerSeconds={setTimerSeconds}
          />
        </div>

        {/* Task Box  */}
        <div className="lg:col-span-5 flex h-[500px]">
          <Task />
        </div>

        <div className="lg:col-span-3 h-[500px]">
          <TodayInsights />
        </div>

        <div className="lg:col-span-12">
          <AttendanceCalendar />
        </div>

        <div className="lg:col-span-12">
          <RecentAttendance />
        </div>
      </div>

      <CheckoutModal
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        checkoutData={remarks}
        setCheckoutData={setRemarks}
        workedHours={getElapsedHoursMinsStr(timerSeconds)}
        onSubmit={handleCheckOutAction}
      />
    </>
  );
}

export default Home;
