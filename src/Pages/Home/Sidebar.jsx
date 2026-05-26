import {
  HiSun,
  HiMoon,
  HiOutlineX
} from 'react-icons/hi'
import {
  FiGrid,
  FiUserCheck,
  FiCalendar,
  FiFileText,
  FiGithub,
  FiVideo,
  FiAward
} from 'react-icons/fi'

/**
 * Sidebar Component
 * Highly structured left navigation drawer that supports collapsible overlay transitions on mobile viewports.
 * Features theme toggle button and a dynamic streak/achievement indicator card.
 */
function Sidebar({ 
  isDark, 
  setIsDark, 
  activeMenu, 
  setActiveMenu,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  return (
    <>
      {/* 1. COLLAPSIBLE BACKDROP OVERLAY (Mobile Viewport Only) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 cursor-pointer"
        />
      )}

      {/* 2. SIDEBAR CONTAINER NAVIGATION */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 z-50 flex flex-col border-r transition-all duration-300 md:static md:translate-x-0
                    bg-white dark:bg-[#08090C] border-slate-200 dark:border-slate-800/60
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
      >
        
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#bf40bf] flex items-center justify-center font-bold text-white shadow-lg shadow-[#bf40bf]/20">
              J
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
              ATR
            </span>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="flex-1 px-4 py-6 space-y-7 overflow-y-auto">
          
          {/* MAIN Category group */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Main
            </p>
            
            {[
              { name: 'Home', icon: FiGrid },
              { name: 'Dashboard', icon: FiUserCheck },
              { name: 'Leave', icon: FiCalendar },
              { name: 'Reports', icon: FiFileText }
            ].map(item => { 
              const IconComponent = item.icon
              const isActive = activeMenu === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveMenu(item.name)
                    setIsSidebarOpen(false) // Close drawer on mobile upon selection
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-slate-100 dark:bg-[#111625] text-[#bf40bf] dark:text-purple-400 shadow-sm font-semibold' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111625]/40 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4 h-4 transition-colors ${isActive ? 'text-[#bf40bf] dark:text-purple-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bf40bf] dark:bg-purple-400 shadow-[0_0_8px_rgba(191,64,191,0.6)]" />
                  )}
                </button>
              )
            })}
          </div>

          {/* INTEGRATIONS Category group */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Integrations
            </p>
            {[
              { name: 'GitHub', icon: FiGithub },
              { name: 'Meetings', icon: FiVideo }
            ].map(item => {
              const IconComponent = item.icon
              const isActive = activeMenu === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveMenu(item.name)
                    setIsSidebarOpen(false) // Close drawer on mobile
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-slate-100 dark:bg-[#111625] text-[#bf40bf] dark:text-purple-400 shadow-sm font-semibold' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111625]/40 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4 h-4 transition-colors ${isActive ? 'text-[#bf40bf] dark:text-purple-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bf40bf] dark:bg-purple-400 shadow-[0_0_8px_rgba(191,64,191,0.6)]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Lower Sidebar Streaks and Settings */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 space-y-4 flex-shrink-0">
          
          {/* Streak Widget Card */}
          <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-[#1C162E] to-[#0A0713] border border-indigo-900/30 shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between">
              <div className="space-y-1 z-10">
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span className="text-amber-500 animate-bounce">🔥</span> 12 day streak
                </p>
                <p className="text-[10px] text-purple-200/70">
                  Keep it going!
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-900/40 border border-purple-500/20 flex items-center justify-center shadow-inner">
                <FiAward className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Theme Switcher trigger */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                       text-slate-600 dark:text-slate-400 
                       hover:bg-slate-50 dark:hover:bg-[#111625]/40
                       hover:text-slate-900 dark:hover:text-white"
          >
            {isDark ? (
              <>
                <HiSun className="w-5 h-5 text-amber-500" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <HiMoon className="w-5 h-5 text-slate-500" />
                <span>Dark mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
