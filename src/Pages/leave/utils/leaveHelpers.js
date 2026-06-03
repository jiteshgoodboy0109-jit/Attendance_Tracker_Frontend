import {
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiActivity,
  FiCoffee,
  FiUmbrella
} from 'react-icons/fi'

export const STATUS_CFG = {
  Approved: {
    icon: FiCheckCircle,
    color:
      'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
    glow: 'bg-emerald-500'
  },

  Pending: {
    icon: FiClock,
    color:
      'text-amber-500 border-amber-500/20 bg-amber-500/10',
    glow: 'bg-amber-500 animate-pulse'
  },

  Rejected: {
    icon: FiAlertCircle,
    color:
      'text-rose-500 border-rose-500/20 bg-rose-500/10',
    glow: 'bg-rose-500'
  }
}

export const getStatusCfg = status =>
  STATUS_CFG[status] || {
    icon: FiClock,
    color:
      'text-purple-500 border-purple-500/20 bg-purple-500/10',
    glow: 'bg-purple-500'
  }

export const LEAVE_ICONS = {
  'Sick Leave': FiActivity,
  'Casual Leave': FiCoffee,
  'Earned Leave': FiUmbrella
}

export const getLeaveIcon = type =>
  LEAVE_ICONS[type] || FiUmbrella