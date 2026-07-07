

export function CheckoutModal({
  open,
  onClose,
  checkoutData,
  setCheckoutData,
  onSubmit,
  workedHours,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border bg-white dark:bg-[#0D1117] border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#F0F6F5]">Check Out</h2>

            <p className="text-sm text-[#F0F6F5] mt-1">
              Complete your work summary
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
            <p className="text-xs uppercase text-[#F0F6F5]">Worked Time</p>

            <h3 className="text-2xl font-bold mt-1 text-[#3FB950]">{workedHours}</h3>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#F0F6F5]">Work Summary *</label>

            <textarea
              required
              rows={4}
              value={checkoutData.workSummary}
              onChange={(e) =>
                setCheckoutData( e.target.value)
              }
              className="w-full rounded-xl border border-0.5px p-3 bg-transparent text-[#F0F6F5]"
              placeholder="Describe your work"
            />
          </div>

          {/* <div>
            <label className="block mb-2 font-medium">
              Blockers (Optional)
            </label>

            <textarea
              rows={3}
              value={checkoutData.blockers}
              onChange={(e) =>
                setCheckoutData((prev) => ({
                  ...prev,
                  blockers: e.target.value,
                }))
              }
              className="w-full rounded-xl border p-3 bg-transparent"
              placeholder="Any issues faced?"
            />
          </div> */}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-[#F0F6F5] cursor-pointer">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-5 py-2 rounded-lg bg-rose-600 text-white cursor-pointer"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
