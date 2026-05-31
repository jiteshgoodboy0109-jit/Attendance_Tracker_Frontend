import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

export default function CustomSelect({ label, value, options, onChange, displayMap = {} }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className={`relative space-y-1 text-left select-none transition-all ${isOpen ? 'z-40' : 'z-10'}`}>
      {label && (
        <label className="text-[9px] font-black uppercase text-[#57606A] dark:text-[#8B949E] tracking-wider">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#C9D1D9] focus:outline-none focus:border-[#2EA44F] dark:focus:border-[#238636] cursor-pointer"
      >
        <span className="truncate pr-2">{displayMap[value] || value}</span>
        <span className="text-[7px] opacity-60 flex-shrink-0">▼</span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-1.5 w-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] rounded-xl shadow-xl z-40 p-1 animate-scale-up max-h-[220px] overflow-y-auto no-scrollbar">
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors leading-none flex items-center justify-between cursor-pointer
                  ${opt === value 
                    ? 'bg-[#2EA44F] dark:bg-[#238636] text-white font-bold' 
                    : 'text-[#24292F] dark:text-[#C9D1D9] hover:bg-[#2EA44F] dark:hover:bg-[#238636] hover:text-white'}`}
              >
                <span className="truncate">{displayMap[opt] || opt}</span>
                {opt === value && <FiCheck className="w-3 h-3 text-white flex-shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
