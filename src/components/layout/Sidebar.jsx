import {
  HiOutlineX
} from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import {
  FiGrid,
  FiUserCheck,
  FiCalendar,
  FiFileText,
  FiGithub,
  FiVideo,
  FiCheckSquare
} from 'react-icons/fi'

import logoAtr from '../../assets/logo atr .webp'


function Sidebar({ 
  isSidebarOpen,
  setIsSidebarOpen
}) {


  const menuItems = [
    {
      title: 'Main',
      items: [
        { name: 'Home', icon: FiGrid, path: '/home' },
        { name: 'Dashboard', icon: FiUserCheck, path: 'dashboard/' },
        { name: 'Leave', icon: FiCalendar, path: 'leave/' },
        { name: 'Reports', icon: FiFileText, path: 'reports/' },
        { name: 'Task', icon: FiCheckSquare, path: 'tasks/' },
      ]
    },
    {
      title: 'Integrations',
      items: [
        { name: 'GitHub', icon: FiGithub, path: 'github/' },
        { name: 'Meetings', icon: FiVideo, path: 'mettings/' }
      ]
    }
  ]
  return (
    <>
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 cursor-pointer"
        />
      )}

    
      <aside 
        className={`fixed inset-y-0 left-0 w-64 z-50 flex flex-col border-r transition-all duration-300 md:sticky md:top-0 h-screen overflow-y-auto md:translate-x-0
                    bg-white dark:bg-[#08090C] border-slate-200 dark:border-slate-800/60
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
      >
        
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
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>


        <div className="flex-1 px-4 py-6 space-y-7 overflow-y-auto">
          {menuItems.map(cat => (
            <div key={cat.title} className="space-y-1.5">
              <p className="px-2  text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {cat.title}
              </p>
              {cat.items.map(item => {
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                  >
                    {({ isActive }) => {

                      const Icon = item.icon;

                      return (
                        <div
                          className={`w-full my-1.5 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group 
                          ${
                            isActive
                            ? 'bg-[#EBEDF0] dark:bg-[#30363D] text-[#0969DA] dark:text-[#C9D1D9] shadow-sm'
                            : 'text-[#0D1117] dark:text-slate-400 hover:bg-[#DFE2E5] dark:hover:bg-[#484F58] hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Icon />
                          <span>{item.name}</span>
                        </div>
                      );
                    }}
                  </NavLink>
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
