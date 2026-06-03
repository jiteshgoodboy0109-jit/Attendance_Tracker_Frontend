import {
  FiCalendar,
  FiCheck,
  FiUmbrella,
  FiActivity,
  FiCoffee
} from 'react-icons/fi'

function LeaveApplyForm({
  leaveCategory,
  setLeaveCategory,
  startDateVal,
  setStartDateVal,
  endDateVal,
  setEndDateVal,
  isHalfDay,
  setIsHalfDay,
  formReason,
  setFormReason,
  showFromWarning,
  setShowFromWarning,
  showToWarning,
  setShowToWarning,
  handleFormSubmit,
  setActiveTab
}) {

  const formatDateLabel = (val) => {
    if (!val) return 'dd-mm-yyyy'

    const d = new Date(val)

    return d
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      .replace(/\//g, '-')
  }

  return (
    <div className="max-w-xl mx-auto py-4 animate-fade-in select-none">

      <div className="w-full rounded-xl p-6 bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#1F2128] flex flex-col gap-6">

        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-[#E4E6EB] uppercase tracking-wider">
            Apply for Leave
          </h3>

          <p className="text-[10px] text-slate-400 dark:text-[#585966] mt-1">
            Submit your request below for supervisor endorsement.
          </p>
        </div>

        {/* Leave Type */}

        <div className="space-y-2">

          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#888A96]">
            Leave Type
          </label>

          <div className="grid grid-cols-3 gap-3">

            {[
              {
                name: 'Earned Leave',
                icon: FiUmbrella
              },
              {
                name: 'Sick Leave',
                icon: FiActivity
              },
              {
                name: 'Casual Leave',
                icon: FiCoffee
              }
            ].map((cat) => {

              const IconComp = cat.icon

              const isSelected =
                leaveCategory === cat.name

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() =>
                    setLeaveCategory(cat.name)
                  }
                  className={`p-3 rounded-lg border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5

                  ${
                    isSelected
                      ? 'border-[#bf40bf]/60 bg-[#bf40bf]/5 text-[#bf40bf]'
                      : 'border-slate-200 dark:border-[#1F2128]'
                  }
                `}
                >
                  <IconComp className="w-4 h-4" />

                  <span className="text-[10px] font-semibold">
                    {cat.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dates */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {[
            {
              label: 'From',
              value: startDateVal,
              setValue: setStartDateVal,
              warning: showFromWarning,
              setWarning: setShowFromWarning
            },
            {
              label: 'To',
              value: endDateVal,
              setValue: setEndDateVal,
              warning: showToWarning,
              setWarning: setShowToWarning
            }
          ].map(field => (

            <div
              key={field.label}
              className="space-y-2"
            >

              <label className="block text-[10px] font-bold uppercase tracking-wider">
                {field.label}
              </label>

              <div className="relative">

                <div
                  className={`w-full bg-slate-50 dark:bg-[#1C1D24]/40 border rounded-lg px-4 py-2.5 text-xs flex justify-between items-center

                  ${
                    field.warning
                      ? 'border-red-500'
                      : 'border-slate-200 dark:border-[#222429]'
                  }
                `}
                >
                  <span>
                    {field.value
                      ? formatDateLabel(field.value)
                      : 'dd-mm-yyyy'}
                  </span>

                  <FiCalendar className="w-4 h-4" />
                </div>

                <input
                  type="date"
                  value={field.value}
                  onChange={(e) => {
                    field.setValue(e.target.value)
                    field.setWarning(false)
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {field.warning && (
                <p className="text-[9px] text-red-500 font-bold">
                  Select {field.label.toLowerCase()} date
                </p>
              )}

            </div>
          ))}
        </div>

        {/* Half Day */}

        <div>

          <label className="flex items-center gap-2 cursor-pointer">

            <input
              type="checkbox"
              checked={isHalfDay}
              onChange={(e) =>
                setIsHalfDay(e.target.checked)
              }
              className="hidden"
            />

            <div
              className={`w-4 h-4 rounded border flex items-center justify-center

              ${
                isHalfDay
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-slate-300'
              }
            `}
            >
              {isHalfDay && (
                <FiCheck className="w-3 h-3" />
              )}
            </div>

            <span className="text-xs font-semibold">
              Half day leave
            </span>

          </label>

        </div>

        {/* Reason */}

        <div className="space-y-2">

          <label className="block text-[10px] font-bold uppercase tracking-wider">
            Explain Reason for Leave
          </label>

          <textarea
            rows={3}
            value={formReason}
            onChange={(e) =>
              setFormReason(e.target.value)
            }
            placeholder="State reason details here..."
            className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-[#222429] resize-none"
          />

        </div>

        {/* Footer */}

        <div className="mt-2 pt-5 border-t border-slate-100 dark:border-[#1D1E24] flex justify-between">

          <button
            type="button"
            onClick={() =>
              setActiveTab('Overview')
            }
            className="px-4 py-2 rounded-lg text-xs font-bold border"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {

              if (!startDateVal)
                setShowFromWarning(true)

              if (!endDateVal)
                setShowToWarning(true)

              if (
                !startDateVal ||
                !endDateVal ||
                !formReason.trim()
              )
                return

              handleFormSubmit()
            }}
            className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#bf40bf]"
          >
            Confirm & Submit Request
          </button>

        </div>

      </div>

    </div>
  )
}

export default LeaveApplyForm