import { useState, useMemo } from 'react'

// Subcomponents
import StatsBanner from './components/StatsBanner'
import ControlPanel from './components/ControlPanel'
import TaskGrid from './components/TaskGrid'
import RecentUpdates from './components/RecentUpdates'
import BulkActionsBar from './components/BulkActionsBar'

// Modals
import TaskDetailsModal from './components/modals/TaskDetailsModal'
import TaskFormModal from './components/modals/TaskFormModal'

// Utilities & Mock Database
import {
  INITIAL_TASKS,
  INITIAL_ACTIVITIES
} from './utils/taskHelpers'

export default function Task() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [recentActivities, setRecentActivities] = useState(INITIAL_ACTIVITIES)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All') // All | Today | This Week | Overdue
  const [sortBy, setSortBy] = useState('dueDateAsc') // dueDateAsc | priorityDesc | progressDesc | titleAsc | createdDesc

  // Bulk Selection
  const [selectedTaskIds, setSelectedTaskIds] = useState([])

  // Modal States
  const [viewDetailsTask, setViewDetailsTask] = useState(null)
  const [activeDetailsTab, setActiveDetailsTab] = useState('overview') // overview | timeline | comments | history
  const [commentText, setCommentText] = useState('')

  const [editTask, setEditTask] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Pagination (6 items per page)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  // Form States
  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    estimatedHours: 8,
    category: 'Frontend',
    department: 'Engineering',
    dueDate: ''
  })

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    estimatedHours: 8,
    completionPercentage: 0,
    category: 'Frontend',
    department: 'Engineering',
    dueDate: ''
  })

  // Activity logger
  const logActivity = (taskTitle, action) => {
    const newActivity = {
      id: Date.now(),
      taskTitle,
      action,
      user: 'You',
      time: 'Just now'
    }
    setRecentActivities(prev => [newActivity, ...prev])
  }

  // Create Task
  const handleCreateTask = (e) => {
    e.preventDefault()
    if (!newForm.title || !newForm.dueDate) return

    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

    const newTaskItem = {
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newForm.title,
      description: newForm.description,
      priority: newForm.priority,
      status: newForm.status,
      assignedBy: 'You (Self Assigned)',
      assignedDate: formattedDate,
      dueDate: newForm.dueDate,
      estimatedHours: Number(newForm.estimatedHours),
      completionPercentage: newForm.status === 'Completed' ? 100 : 0,
      department: newForm.department,
      category: newForm.category,
      attachmentsCount: 0,
      commentsCount: 0,
      createdTime: `${formattedDate} ${formattedTime}`,
      lastUpdatedTime: `${formattedDate} ${formattedTime}`,
      comments: [],
      history: [
        { action: 'Task Self-Created', user: 'Jitesh Kumar', time: `${formattedDate} ${formattedTime}` }
      ]
    }

    setTasks(prev => [newTaskItem, ...prev])
    logActivity(newForm.title, 'Created self-assigned task')
    setShowAddModal(false)

    // Reset Form
    setNewForm({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      estimatedHours: 8,
      category: 'Frontend',
      department: 'Engineering',
      dueDate: ''
    })
  }

  // Save Edits
  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (!editTask) return

    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const updatedTime = `${formattedDate} ${formattedTime}`

    setTasks(prev =>
      prev.map(task => {
        if (task.id === editTask.id) {
          const changes = []
          if (task.status !== editForm.status) changes.push(`Changed status to ${editForm.status}`)
          if (task.priority !== editForm.priority) changes.push(`Changed priority to ${editForm.priority}`)
          if (task.completionPercentage !== editForm.completionPercentage) {
            changes.push(`Updated progress to ${editForm.completionPercentage}%`)
          }

          const actionMessage = changes.length > 0 ? changes.join(', ') : 'Updated task details'
          
          return {
            ...task,
            title: editForm.title,
            description: editForm.description,
            priority: editForm.priority,
            status: editForm.status,
            dueDate: editForm.dueDate,
            estimatedHours: Number(editForm.estimatedHours),
            completionPercentage: Number(editForm.completionPercentage),
            department: editForm.department,
            category: editForm.category,
            lastUpdatedTime: updatedTime,
            history: [
              { action: actionMessage, user: 'Jitesh Kumar', time: updatedTime },
              ...task.history
            ]
          }
        }
        return task
      })
    )

    logActivity(editForm.title, 'Updated task details')
    setEditTask(null)
  }

  // Mark Completed
  const handleMarkComplete = (taskId) => {
    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const updatedTime = `${formattedDate} ${formattedTime}`

    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          logActivity(task.title, 'Marked task as Completed')
          return {
            ...task,
            status: 'Completed',
            completionPercentage: 100,
            lastUpdatedTime: updatedTime,
            history: [
              { action: 'Marked task as Completed', user: 'Jitesh Kumar', time: updatedTime },
              ...task.history
            ]
          }
        }
        return task
      })
    )
  }

  // Delete Task
  const handleDeleteTask = (taskId, title) => {
    if (window.confirm(`Are you sure you want to delete task ${title}?`)) {
      setTasks(prev => prev.filter(task => task.id !== taskId))
      setSelectedTaskIds(prev => prev.filter(id => id !== taskId))
      logActivity(title, 'Deleted task')
      if (viewDetailsTask && viewDetailsTask.id === taskId) {
        setViewDetailsTask(null)
      }
    }
  }

  // Add Comment to Active Details Modal
  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim() || !viewDetailsTask) return

    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const commentTime = `${formattedDate} ${formattedTime}`

    const newComment = {
      id: Date.now(),
      author: 'Jitesh Kumar',
      role: 'You',
      text: commentText,
      time: commentTime
    }

    setTasks(prev =>
      prev.map(task => {
        if (task.id === viewDetailsTask.id) {
          const updatedComments = [...task.comments, newComment]
          const updatedHistory = [
            { action: 'Added a comment', user: 'Jitesh Kumar', time: commentTime },
            ...task.history
          ]
          const updatedTask = {
            ...task,
            comments: updatedComments,
            commentsCount: updatedComments.length,
            lastUpdatedTime: commentTime,
            history: updatedHistory
          }
          setViewDetailsTask(updatedTask)
          return updatedTask
        }
        return task
      })
    )

    logActivity(viewDetailsTask.title, 'Added a comment')
    setCommentText('')
  }

  // Trigger Edit Form Prepopulation
  const openEditModal = (task) => {
    setEditTask(task)
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      estimatedHours: task.estimatedHours,
      completionPercentage: task.completionPercentage,
      category: task.category,
      department: task.department,
      dueDate: task.dueDate
    })
  }

  // Bulk Actions
  const handleBulkComplete = () => {
    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const updatedTime = `${formattedDate} ${formattedTime}`

    setTasks(prev =>
      prev.map(task => {
        if (selectedTaskIds.includes(task.id)) {
          return {
            ...task,
            status: 'Completed',
            completionPercentage: 100,
            lastUpdatedTime: updatedTime,
            history: [
              { action: 'Marked Completed via Bulk Actions', user: 'Jitesh Kumar', time: updatedTime },
              ...task.history
            ]
          }
        }
        return task
      })
    )

    logActivity(`${selectedTaskIds.length} Tasks`, 'Bulk marked as Completed')
    setSelectedTaskIds([])
  }

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTaskIds.length} selected tasks?`)) {
      setTasks(prev => prev.filter(task => !selectedTaskIds.includes(task.id)))
      logActivity(`${selectedTaskIds.length} Tasks`, 'Bulk deleted tasks')
      setSelectedTaskIds([])
    }
  }

  const handleBulkChangePriority = (priority) => {
    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const updatedTime = `${formattedDate} ${formattedTime}`

    setTasks(prev =>
      prev.map(task => {
        if (selectedTaskIds.includes(task.id)) {
          return {
            ...task,
            priority,
            lastUpdatedTime: updatedTime,
            history: [
              { action: `Changed Priority to ${priority} via Bulk Actions`, user: 'Jitesh Kumar', time: updatedTime },
              ...task.history
            ]
          }
        }
        return task
      })
    )

    logActivity(`${selectedTaskIds.length} Tasks`, `Bulk set Priority to ${priority}`)
    setSelectedTaskIds([])
  }

  // Quick reset filters helper
  const handleResetFilters = () => {
    setSearchQuery('')
    setStatusFilter('All')
    setPriorityFilter('All')
    setCategoryFilter('All')
    setDateFilter('All')
  }

  // Filter calculations
  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]
    
    let result = tasks.filter(task => {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        task.title.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.department.toLowerCase().includes(query)

      const matchesStatus = statusFilter === 'All' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter

      let matchesDate = true
      if (dateFilter === 'Today') {
        matchesDate = task.dueDate === todayStr
      } else if (dateFilter === 'This Week') {
        const today = new Date()
        const oneWeekLater = new Date()
        oneWeekLater.setDate(today.getDate() + 7)
        const taskDate = new Date(task.dueDate)
        matchesDate = taskDate >= today && taskDate <= oneWeekLater
      } else if (dateFilter === 'Overdue') {
        const taskDate = new Date(task.dueDate)
        const today = new Date(todayStr)
        matchesDate = taskDate < today && task.status !== 'Completed'
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDate
    })

    result.sort((a, b) => {
      if (sortBy === 'dueDateAsc') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'priorityDesc') {
        const weight = { Critical: 4, High: 3, Medium: 2, Low: 1 }
        return weight[b.priority] - weight[a.priority]
      }
      if (sortBy === 'progressDesc') {
        return b.completionPercentage - a.completionPercentage
      }
      if (sortBy === 'titleAsc') {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === 'createdDesc') {
        return new Date(b.createdTime) - new Date(a.createdTime)
      }
      return 0
    })

    return result
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter, dateFilter, sortBy])

  // Reset pagination if filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter, dateFilter])

  // Pagination calculation
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTasks.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredTasks, currentPage])

  return (
    <div className="space-y-8 animate-fade-in select-none text-[#24292F] dark:text-[#C9D1D9]">
      {/* 1. Top Deck Statistics KPI Cards */}
      <StatsBanner tasks={tasks} />

      {/* 2. Controls & List Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left pane: search filters & card grid */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <ControlPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredTasks={filteredTasks}
            onSelfAssign={() => setShowAddModal(true)}
          />

          <TaskGrid
            paginatedTasks={paginatedTasks}
            filteredTasks={filteredTasks}
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            onViewDetails={setViewDetailsTask}
            onEditTask={openEditModal}
            onMarkComplete={handleMarkComplete}
            onDeleteTask={handleDeleteTask}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Right pane: recent activities list logs */}
        <RecentUpdates activities={recentActivities} />
      </div>

      {/* 3. Fixed Bulk Operations Bar */}
      <BulkActionsBar
        selectedTaskIds={selectedTaskIds}
        setSelectedTaskIds={setSelectedTaskIds}
        onBulkComplete={handleBulkComplete}
        onBulkDelete={handleBulkDelete}
        onBulkChangePriority={handleBulkChangePriority}
      />

      {/* 4. Details Modal */}
      {viewDetailsTask && (
        <TaskDetailsModal
          task={viewDetailsTask}
          onClose={() => setViewDetailsTask(null)}
          activeTab={activeDetailsTab}
          setActiveTab={setActiveDetailsTab}
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={handleAddComment}
          onEditFromDetails={(task) => {
            setViewDetailsTask(null)
            openEditModal(task)
          }}
        />
      )}

      {/* 5. Create Task Modal */}
      {showAddModal && (
        <TaskFormModal
          mode="add"
          formData={newForm}
          setFormData={setNewForm}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {/* 6. Edit Task Modal */}
      {editTask && (
        <TaskFormModal
          mode="edit"
          formData={editForm}
          setFormData={setEditForm}
          onClose={() => setEditTask(null)}
          onSubmit={handleSaveEdit}
          taskId={editTask.id}
        />
      )}
    </div>
  )
}
