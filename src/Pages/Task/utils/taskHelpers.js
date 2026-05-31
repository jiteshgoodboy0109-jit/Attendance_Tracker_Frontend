// ==========================================
// CONFIGURATION CONSTANTS
// ==========================================
export const CATEGORY_TAGS = ['All', 'Frontend', 'Backend', 'UI/UX', 'Database', 'Security']
export const DEPARTMENTS = ['All', 'Engineering', 'Design', 'QA', 'Operations']
export const PRIORITIES = ['All', 'Low', 'Medium', 'High', 'Critical']
export const STATUSES = ['All', 'Pending', 'In Progress', 'Completed', 'Overdue']

// ==========================================
// SPRINT TASK MOCK DATABASE
// ==========================================
export const INITIAL_TASKS = [
  {
    id: 'TSK-3012',
    title: 'Optimize Latency in Attendance Sync Cron',
    description: 'Analyze DB indexing and optimize the PostgreSQL query inside the attendance sync cron job. The goal is to reduce the average batch processing execution latency below 200ms.',
    priority: 'Critical',
    status: 'In Progress',
    assignedBy: 'Rahul Kumar (Lead Engineer)',
    assignedDate: '2026-05-24',
    dueDate: '2026-06-03',
    estimatedHours: 24,
    completionPercentage: 65,
    department: 'Engineering',
    category: 'Backend',
    attachmentsCount: 3,
    commentsCount: 2,
    createdTime: '2026-05-24 09:00 AM',
    lastUpdatedTime: '2026-05-30 11:30 AM',
    comments: [
      { id: 1, author: 'Rahul Kumar', role: 'Lead Engineer', text: 'Ensure database query plans are attached in the PR.', time: '2026-05-25 10:14 AM' },
      { id: 2, author: 'Jitesh Kumar', role: 'You', text: 'I indexed the primary composite keys. Batch processing latency dropped from 1.2s to 310ms.', time: '2026-05-28 02:40 PM' }
    ],
    history: [
      { action: 'Task Created', user: 'Rahul Kumar', time: '2026-05-24 09:00 AM' },
      { action: 'Changed Status to In Progress', user: 'Jitesh Kumar', time: '2026-05-24 10:15 AM' },
      { action: 'Updated Completion % to 65%', user: 'Jitesh Kumar', time: '2026-05-28 02:40 PM' }
    ]
  },
  {
    id: 'TSK-3013',
    title: 'Redesign Employee Profile Settings UI',
    description: 'Create high-fidelity profile layout settings with interactive avatars, dark-mode switches, and security setting forms. Implement transitions that match Figma specifications.',
    priority: 'High',
    status: 'Pending',
    assignedBy: 'Priya Nair (Design Lead)',
    assignedDate: '2026-05-26',
    dueDate: '2026-06-10',
    estimatedHours: 16,
    completionPercentage: 0,
    department: 'Design',
    category: 'Frontend',
    attachmentsCount: 4,
    commentsCount: 1,
    createdTime: '2026-05-26 11:15 AM',
    lastUpdatedTime: '2026-05-26 11:15 AM',
    comments: [
      { id: 1, author: 'Priya Nair', role: 'Design Lead', text: 'Figma mockups are attached in Figma tab. Focus on micro-animations on mobile views.', time: '2026-05-26 11:20 AM' }
    ],
    history: [
      { action: 'Task Created', user: 'Priya Nair', time: '2026-05-26 11:15 AM' }
    ]
  },
  {
    id: 'TSK-3014',
    title: 'Resolve WebSockets Connection Drop in Logs',
    description: 'Fix connection dropped alerts in active log dashboards when browser goes idle for more than 5 minutes. Implement robust fallback retry and backoff reconnection mechanisms.',
    priority: 'Critical',
    status: 'Overdue',
    assignedBy: 'Divya Krishnan (Product Manager)',
    assignedDate: '2026-05-20',
    dueDate: '2026-05-29',
    estimatedHours: 12,
    completionPercentage: 45,
    department: 'Engineering',
    category: 'Frontend',
    attachmentsCount: 1,
    commentsCount: 2,
    createdTime: '2026-05-20 02:00 PM',
    lastUpdatedTime: '2026-05-29 06:00 PM',
    comments: [
      { id: 1, author: 'Divya Krishnan', role: 'Product Manager', text: 'Live dashboard attendance stats must stay connected on display monitors.', time: '2026-05-20 03:00 PM' },
      { id: 2, author: 'Jitesh Kumar', role: 'You', text: 'Investigating heartbeat packets to keep WebSocket ping-pong alive.', time: '2026-05-22 04:30 PM' }
    ],
    history: [
      { action: 'Task Created', user: 'Divya Krishnan', time: '2026-05-20 02:00 PM' },
      { action: 'Changed Status to In Progress', user: 'Jitesh Kumar', time: '2026-05-21 09:30 AM' },
      { action: 'Status automatically marked Overdue by system scheduler', user: 'System', time: '2026-05-29 06:00 PM' }
    ]
  },
  {
    id: 'TSK-3015',
    title: 'Conduct Security Auditing for MFA OTP Form',
    description: 'Audit OTP code inputs and verify absolute defense against brute forcing. Implement 3-retry locking, rate limiting on resend, and verify encrypted session storage values.',
    priority: 'High',
    status: 'Completed',
    assignedBy: 'Amit Patel (Security Officer)',
    assignedDate: '2026-05-18',
    dueDate: '2026-05-25',
    estimatedHours: 8,
    completionPercentage: 100,
    department: 'QA',
    category: 'Security',
    attachmentsCount: 2,
    commentsCount: 2,
    createdTime: '2026-05-18 10:00 AM',
    lastUpdatedTime: '2026-05-24 04:15 PM',
    comments: [
      { id: 1, author: 'Amit Patel', role: 'Security Officer', text: 'Penetration testing report added to assets. Looks solid.', time: '2026-05-24 04:10 PM' },
      { id: 2, author: 'Jitesh Kumar', role: 'You', text: 'All security vulnerabilities mitigated successfully.', time: '2026-05-24 04:12 PM' }
    ],
    history: [
      { action: 'Task Created', user: 'Amit Patel', time: '2026-05-18 10:00 AM' },
      { action: 'Changed Status to In Progress', user: 'Jitesh Kumar', time: '2026-05-19 11:00 AM' },
      { action: 'Marked task as Completed', user: 'Jitesh Kumar', time: '2026-05-24 04:15 PM' }
    ]
  },
  {
    id: 'TSK-3016',
    title: 'Generate Monthly Attendance PDF Exporter',
    description: 'Develop a highly structured PDF generator backend to assemble and structure employee check-in times, holidays, and sick leaves in neat grids matching printing requirements.',
    priority: 'Medium',
    status: 'In Progress',
    assignedBy: 'Divya Krishnan (Product Manager)',
    assignedDate: '2026-05-25',
    dueDate: '2026-06-04',
    estimatedHours: 14,
    completionPercentage: 80,
    department: 'Operations',
    category: 'Database',
    attachmentsCount: 0,
    commentsCount: 0,
    createdTime: '2026-05-25 09:30 AM',
    lastUpdatedTime: '2026-05-30 05:00 PM',
    comments: [],
    history: [
      { action: 'Task Created', user: 'Divya Krishnan', time: '2026-05-25 09:30 AM' },
      { action: 'Changed Status to In Progress', user: 'Jitesh Kumar', time: '2026-05-25 02:00 PM' },
      { action: 'Updated Completion % to 80%', user: 'Jitesh Kumar', time: '2026-05-30 05:00 PM' }
    ]
  },
  {
    id: 'TSK-3017',
    title: 'Fix Mobile Sidebar Click Bubbling Defect',
    description: 'Resolve bug where clicking overlay links occasionally bubbles events to parent view elements, causing unpredictable shifts in route status inside mobile viewports.',
    priority: 'Low',
    status: 'Pending',
    assignedBy: 'Priya Nair (Design Lead)',
    assignedDate: '2026-05-28',
    dueDate: '2026-06-08',
    estimatedHours: 6,
    completionPercentage: 0,
    department: 'Design',
    category: 'UI/UX',
    attachmentsCount: 1,
    commentsCount: 0,
    createdTime: '2026-05-28 04:00 PM',
    lastUpdatedTime: '2026-05-28 04:00 PM',
    comments: [],
    history: [
      { action: 'Task Created', user: 'Priya Nair', time: '2026-05-28 04:00 PM' }
    ]
  }
]

export const INITIAL_ACTIVITIES = [
  { id: 1, taskTitle: 'Optimize Latency in Attendance Sync Cron', action: 'Updated Completion % to 65%', user: 'You', time: '1 hour ago' },
  { id: 2, taskTitle: 'Generate Monthly Attendance PDF Exporter', action: 'Updated Completion % to 80%', user: 'You', time: 'Yesterday' },
  { id: 3, taskTitle: 'Conduct Security Auditing for MFA OTP Form', action: 'Marked task as Completed', user: 'You', time: '2 days ago' },
  { id: 4, taskTitle: 'Resolve WebSockets Connection Drop in Logs', action: 'Status automatically marked Overdue by system scheduler', user: 'System', time: '2 days ago' }
]

// ==========================================
// UTILITY HELPERS
// ==========================================

export const getDueWarningText = (dueDate, status) => {
  if (status === 'Completed') return null
  const today = new Date()
  today.setHours(0,0,0,0)
  const taskDate = new Date(dueDate)
  taskDate.setHours(0,0,0,0)

  const diffTime = taskDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { type: 'overdue', text: 'Overdue' }
  }
  if (diffDays === 0) {
    return { type: 'today', text: 'Due Today' }
  }
  if (diffDays <= 3) {
    return { type: 'soon', text: `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}` }
  }
  return null
}

export const getTimelineSteps = (task) => {
  return [
    { key: 'created', label: 'Created', done: true, desc: `Task created at ${task.createdTime}` },
    { key: 'pending', label: 'Pending', done: task.completionPercentage >= 0, desc: 'Task loaded on personal sprint queue' },
    { key: 'working', label: 'In Progress', done: task.status === 'In Progress' || task.completionPercentage > 0, desc: 'Actively being worked on' },
    { key: 'completed', label: 'Completed', done: task.status === 'Completed', desc: 'Work finalized, verified and closed' }
  ]
}

// ==========================================
// CSV & JSON EXPORTERS
// ==========================================

export const handleExportCSV = (exportableTasks) => {
  const headers = ['Task ID', 'Title', 'Priority', 'Status', 'Category', 'Dept', 'Due Date', 'Progress %', 'Estimated Hours', 'Assigned By']
  const rows = exportableTasks.map(t => [
    t.id,
    `"${t.title.replace(/"/g, '""')}"`,
    t.priority,
    t.status,
    t.category,
    t.department,
    t.dueDate,
    t.completionPercentage,
    t.estimatedHours,
    t.assignedBy
  ])

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `Tasks_Export_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const handleExportJSON = (exportableTasks) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportableTasks, null, 2))
  const link = document.createElement("a")
  link.setAttribute("href", dataStr)
  link.setAttribute("download", `Tasks_Export_${new Date().toISOString().split('T')[0]}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
