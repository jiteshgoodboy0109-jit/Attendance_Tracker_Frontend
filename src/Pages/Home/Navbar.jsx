import { useState, useEffect } from 'react'
import {
  HiSun,
  HiMoon,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineMenu
} from 'react-icons/hi'

function Navbar({
  isDark,
  setIsDark,
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  notifications,
  setNotifications,
  showNotificationDropdown,
  setShowNotificationDropdown,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-16 px-3 sm:px-8 flex-shrink-0 flex items-center justify-between border-b transition-colors duration-300
                      bg-white dark:bg-[#08090C] border-slate-200 dark:border-slate-800/60 sticky top-0 z-30">
      
      {/* Search Input Container with Mobile Hamburger */}
      <div className="flex items-center gap-1.5 sm:gap-2 max-w-[220px] sm:max-w-md flex-shrink-0">
        {/* Mobile Hamburger Drawer Trigger */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#111625]/40 border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-[#111625] transition-colors"
        >
          <HiOutlineMenu className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <HiOutlineSearch className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-32 sm:w-64 px-3 py-1.5 text-xs rounded-lg border outline-none bg-transparent transition-all duration-300
            ${showSearch || searchQuery 
              ? 'opacity-100 scale-100 pointer-events-auto border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white' 
              : 'opacity-0 scale-95 pointer-events-none border-transparent text-transparent w-0'
            }`}
        />
      </div>

      {/* Right Side Widgets (Theme, Alerts, Profile) */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        
        {/* Shortcut Theme Icon */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border transition-colors duration-300
                     bg-slate-50 dark:bg-[#111625]/40 
                     border-slate-200 dark:border-slate-800/60
                     text-slate-500 dark:text-slate-400
                     hover:bg-slate-100 dark:hover:bg-[#111625]
                     hover:text-slate-800 dark:hover:text-white"
        >
          {isDark ? <HiSun className="w-5 h-5 text-amber-500" /> : <HiMoon className="w-5 h-5" />}
        </button>

        {/* Notification Alerts Bell with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border relative transition-colors duration-300
                       bg-slate-50 dark:bg-[#111625]/40 
                       border-slate-200 dark:border-slate-800/60
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-[#111625]
                       hover:text-slate-800 dark:hover:text-white"
          >
            <HiOutlineBell className="w-5 h-5" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-[#08090C] text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Notifications dropdown panel */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border overflow-hidden transition-colors duration-300 z-50
                            bg-white dark:bg-[#111625] border-slate-200 dark:border-slate-800">
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <span className="font-semibold text-xs tracking-tight">Recent Alerts</span>
                <button 
                  onClick={() => {
                    setNotifications([]);
                    setShowNotificationDropdown(false);
                  }}
                  className="text-[10px] text-[#bf40bf] dark:text-purple-400 hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No new alerts</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="p-3 border-b border-slate-50 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs transition-colors">
                      {n.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Realtime Date & Time Indicator */}
        <div className="flex flex-col items-end pl-1.5 sm:pl-3.5 border-l border-slate-200 dark:border-slate-800/60 text-right whitespace-nowrap">
          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-800 dark:text-white leading-none">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
          <p className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
            {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            <span className="hidden sm:inline"> {currentTime.getFullYear()}</span>
          </p>
        </div>
      </div>
    </header>
  )
}

export default Navbar
