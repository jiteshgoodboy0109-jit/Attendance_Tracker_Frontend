function LeaveTabs({
  activeTab,
  setActiveTab,
  setFormStep,
  leaveHistory
}) {
  return (
    <div className="border-b border-slate-200/50 dark:border-slate-850/40">
      <nav className="flex space-x-8">

        {[
          {
            id: 'Overview',
            name: 'Overview'
          },

          {
            id: 'Apply',
            name: 'Apply'
          },

          {
            id: 'My Leaves',
            name: 'My Leaves'
          },

          {
            id: 'Approvals',
            name: 'Approvals',
            count: leaveHistory.filter(
              item => item.status === 'Pending'
            ).length
          }
        ].map(tab => {

          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)

                if (tab.id === 'Apply') {
                  setFormStep(2)
                }
              }}
              className={`
                pb-4 px-1 text-sm font-semibold
                transition-all duration-200
                relative flex items-center gap-1.5 outline-none

                ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-400 font-extrabold border-b-2 border-purple-500'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border-b-2 border-transparent'
                }
              `}
            >
              <span>{tab.name}</span>

              {tab.count !== undefined &&
                tab.count > 0 && (
                  <span
                    className="
                      ml-1.5 px-2 py-0.5 rounded-full
                      bg-amber-500 text-black
                      font-extrabold text-[9px]
                      leading-none flex items-center
                      justify-center shadow-sm
                    "
                  >
                    {tab.count}
                  </span>
                )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default LeaveTabs