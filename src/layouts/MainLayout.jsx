import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";


export function MainLayout() {

    const [isDark, setIsDark] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [notifications, setNotifications] = useState([{
        id: 1,
        text: "Rahul requested leave",
        read: false
    }])
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)

      


    return (
        <div className={isDark ? 'dark': ''}>
            <div className="flex min-h-screen">

                <Sidebar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <div className="flex-1 bg-white dark:bg-[#0D1117]">
                    <Navbar
                        isDark={isDark}
                        setIsDark={setIsDark}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        showNotificationDropdown={showNotificationDropdown}
                        setShowNotificationDropdown={
                        setShowNotificationDropdown
                        }
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen} 
                    />

                    <main className="px-4 mt-4">
                        <Outlet />
                    </main>
                </div>
            
            </div>
        </div>
    );
}