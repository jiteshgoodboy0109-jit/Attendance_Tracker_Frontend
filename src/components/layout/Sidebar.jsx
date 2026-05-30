import {
  HiOutlineX
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
  FiGrid,
  FiUserCheck,
  FiCalendar,
  FiFileText,
  FiGithub,
  FiVideo,
  FiMoreHorizontal
} from 'react-icons/fi'

import logoAtr from '../../assets/logo atr .webp'

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
  const navigate = useNavigate()
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
            <img 
              src={logoAtr} 
              className="w-8 h-8 rounded-lg object-contain shadow-md" 
              alt="ATR Logo" 
            />
            <span className="text-base font-extrabold tracking-wider text-slate-800 dark:text-white">
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
          {[
            {
              title: 'Main',
              items: [
                { name: 'Home', icon: FiGrid },
                { name: 'Dashboard', icon: FiUserCheck },
                { name: 'Leave', icon: FiCalendar },
                { name: 'Reports', icon: FiFileText }
              ]
            },
            {
              title: 'Integrations',
              items: [
                { name: 'GitHub', icon: FiGithub },
                { name: 'Meetings', icon: FiVideo }
              ]
            }
          ].map(cat => (
            <div key={cat.title} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {cat.title}
              </p>
              {cat.items.map(item => {
                const Icon = item.icon
                const isActive = activeMenu === item.name
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveMenu(item.name)
                      setIsSidebarOpen(false)
                      navigate(`/${item.name.toLowerCase()}`)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${isActive 
                        ? 'bg-slate-100 dark:bg-[#111625] text-[#bf40bf] dark:text-purple-400 shadow-sm font-semibold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111625]/40 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#bf40bf] dark:text-purple-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#bf40bf] dark:bg-purple-400 shadow-[0_0_8px_rgba(191,64,191,0.6)]" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Lower Sidebar Streaks and Settings */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 space-y-4 flex-shrink-0">
          <div className="flex items-center p-1.5 rounded-full transition-all duration-200
                          bg-slate-100 dark:bg-[#161B22] border border-slate-200/40 dark:border-slate-800/40
                          hover:bg-slate-200/50 dark:hover:bg-[#21262D]">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={logoAtr} 
                className="w-9 h-9 rounded-full object-cover border border-slate-200/50 dark:border-slate-800/80 shadow-inner bg-white" 
                alt="User Logo Avatar" 
              />
              
              {/* Profile details (Name & Email) */}
              <div className="text-left min-w-0 pr-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate font-sans">
                  Jitesh Kumar
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate font-sans">
                  jitesh@atr.co
                </p>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  )
}

export default Sidebar
