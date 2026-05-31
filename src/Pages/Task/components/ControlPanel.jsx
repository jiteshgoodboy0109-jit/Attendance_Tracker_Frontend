import { FiSearch, FiDownload, FiPlus } from 'react-icons/fi'
import CustomSelect from './CustomSelect'
import {
  CATEGORY_TAGS,
  PRIORITIES,
  STATUSES,
  handleExportCSV,
  handleExportJSON
} from '../utils/taskHelpers'

export default function ControlPanel({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  sortBy,
  setSortBy,
  filteredTasks,
  onSelfAssign
}) {
  return (
    <div className="p-5 rounded-3xl border bg-white dark:bg-[#161B22] border-[#D0D7DE] dark:border-[#30363D] shadow-sm space-y-4">
      {/* Search + Primary Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#57606A] dark:text-[#8B949E] w-4 h-4" />
          <input
            type="text"
            placeholder="Search task ID, title, description, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-[#F6F8FA] dark:bg-[#0D1117] border-[#D0D7DE] dark:border-[#30363D] text-[#24292F] dark:text-[#F0F6FC] placeholder-[#6E7781] dark:placeholder-[#8B949E] focus:outline-none focus:border-[#2EA44F] dark:focus:border-[#238636] transition-colors"
          />
        </div>

        {/* Action Buttons: Export & New Personal Task */}
        <div className="flex gap-2.5 items-center">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl border bg-[#F6F8FA] dark:bg-[#21262D] border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#C9D1D9] hover:bg-[#EBEDF0] dark:hover:bg-[#30363D] hover:text-[#24292F] dark:hover:text-[#F0F6FC] transition-all cursor-pointer">
              <FiDownload className="w-4 h-4" />
              <span>Export</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] rounded-xl shadow-xl z-30 min-w-[130px] p-1 animate-scale-up">
              <button
                type="button"
                onClick={() => handleExportCSV(filteredTasks)}
                className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-[#24292F] dark:text-[#C9D1D9] hover:bg-[#F6F8FA] dark:hover:bg-[#21262D] transition-colors flex items-center gap-2 cursor-pointer"
              >
                CSV Format (.csv)
              </button>
              <button
                type="button"
                onClick={() => handleExportJSON(filteredTasks)}
                className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-[#24292F] dark:text-[#C9D1D9] hover:bg-[#F6F8FA] dark:hover:bg-[#21262D] transition-colors flex items-center gap-2 cursor-pointer"
              >
                JSON Format (.json)
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onSelfAssign}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl shadow-md bg-[#2EA44F] dark:bg-[#238636] hover:bg-[#2C974B] dark:hover:bg-[#2EA043] active:scale-95 transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4 stroke-[3px]" />
            <span>Self Assign</span>
          </button>
        </div>
      </div>

      {/* Filter selectors grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        {/* Status Selector */}
        <CustomSelect
          label="Status"
          value={statusFilter}
          options={STATUSES}
          onChange={setStatusFilter}
        />

        {/* Priority Selector */}
        <CustomSelect
          label="Priority"
          value={priorityFilter}
          options={PRIORITIES}
          onChange={setPriorityFilter}
        />

        {/* Category Selector */}
        <CustomSelect
          label="Category"
          value={categoryFilter}
          options={CATEGORY_TAGS}
          onChange={setCategoryFilter}
        />

        {/* Date Filter Range */}
        <CustomSelect
          label="Deadline"
          value={dateFilter}
          options={['All', 'Today', 'This Week', 'Overdue']}
          onChange={setDateFilter}
          displayMap={{
            All: 'All Dates',
            Today: 'Due Today',
            'This Week': 'Due this Week',
            Overdue: 'Overdue Active'
          }}
        />

        {/* Sort Dropdown */}
        <CustomSelect
          label="Sort By"
          value={sortBy}
          options={['dueDateAsc', 'priorityDesc', 'progressDesc', 'titleAsc', 'createdDesc']}
          onChange={setSortBy}
          displayMap={{
            dueDateAsc: 'Due Date: Soonest',
            priorityDesc: 'Priority: Critical First',
            progressDesc: 'Progress: High %',
            titleAsc: 'Title: Alphabetical',
            createdDesc: 'Created: Newest'
          }}
        />
      </div>
    </div>
  )
}
