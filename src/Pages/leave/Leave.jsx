import { useState, useMemo } from 'react'

import {
    FiActivity,
    FiCoffee,
    FiUmbrella
} from 'react-icons/fi'

import LeaveHeader from './components/leave/LeaveHeader'
import LeaveTabs from './components/leave/LeaveTabs'
import LeaveOverview from './components/leave/LeaveOverview'
import LeaveApplyForm from './components/leave/LeaveApplyForm'
import MyLeaves from './components/leave/MyLeaves'
import LeaveApprovals from './components/leave/LeaveApprovals'

function Leave({
    leaveHistory = [],
    setLeaveHistory,
    approvals = [],
    setApprovals
}) {

    const [activeTab, setActiveTab] = useState('Overview')

    const [historyFilter, setHistoryFilter] = useState('All')

    const [formStep, setFormStep] = useState(2)

    const [leaveCategory, setLeaveCategory] =
        useState('Earned Leave')

    const [startDateVal, setStartDateVal] =
        useState('')

    const [endDateVal, setEndDateVal] =
        useState('')

    const [isHalfDay, setIsHalfDay] =
        useState(false)

    const [formReason, setFormReason] =
        useState('')

    const [showFromWarning, setShowFromWarning] =
        useState(false)

    const [showToWarning, setShowToWarning] =
        useState(false)

    const getFormattedSubmitDate = (val) => {
        const d = new Date(val)

        return d.toLocaleDateString(
            'en-US',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }
        )
    }

    const formNumDays = useMemo(() => {

        if (!startDateVal || !endDateVal)
            return 0

        const start = new Date(startDateVal)
        const end = new Date(endDateVal)

        if (start > end) return 0

        const diff =
            Math.abs(end - start)

        return (
            Math.ceil(
                diff /
                (1000 * 60 * 60 * 24)
            ) + 1
        )

    }, [startDateVal, endDateVal])

    const handleFormSubmit = () => {

        const newLeave = {
            id: Date.now(),
            type: leaveCategory,
            duration:
                formNumDays > 1
                    ? `${getFormattedSubmitDate(startDateVal)} - ${getFormattedSubmitDate(endDateVal)}`
                    : getFormattedSubmitDate(startDateVal),
            days: isHalfDay
                ? 0.5
                : formNumDays,
            dates: `${getFormattedSubmitDate(startDateVal)} to ${getFormattedSubmitDate(endDateVal)}`,
            reason: formReason,
            status: 'Pending',
            approver: null,
            appliedDate: `Applied ${new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short'
            })}`
        }

        setLeaveHistory(prev => [
            newLeave,
            ...prev
        ])

        setStartDateVal('')
        setEndDateVal('')
        setFormReason('')
        setIsHalfDay(false)

        setActiveTab('Overview')
    }

    const handleCancelRequest = (id) => {
        setLeaveHistory(prev =>
            prev.filter(
                item => item.id !== id
            )
        )
    }

    const dynamicUsage = useMemo(() => {

        const usage = {
            'Earned Leave': 3,
            'Sick Leave': 3,
            'Casual Leave': 4
        }

        leaveHistory.forEach(item => {

            if (
                item.status === 'Approved'
            ) {

                if (
                    item.type === 'Earned Leave'
                )
                    usage['Earned Leave'] +=
                        item.days

                if (
                    item.type === 'Sick Leave'
                )
                    usage['Sick Leave'] +=
                        item.days

                if (
                    item.type === 'Casual Leave'
                )
                    usage['Casual Leave'] +=
                        item.days
            }
        })

        return usage

    }, [leaveHistory])

    const balanceCards = [
        {
            type: 'Sick Leave',
            icon: FiActivity,
            remaining:
                12 -
                dynamicUsage[
                'Sick Leave'
                ],
            used:
                dynamicUsage[
                'Sick Leave'
                ],
            total: 12,
            pct: Math.round(
                ((12 -
                    dynamicUsage[
                    'Sick Leave'
                    ]) /
                    12) *
                100
            ),
            barColor: 'bg-red-500'
        },

        {
            type: 'Casual Leave',
            icon: FiCoffee,
            remaining:
                12 -
                dynamicUsage[
                'Casual Leave'
                ],
            used:
                dynamicUsage[
                'Casual Leave'
                ],
            total: 12,
            pct: Math.round(
                ((12 -
                    dynamicUsage[
                    'Casual Leave'
                    ]) /
                    12) *
                100
            ),
            barColor: 'bg-amber-500'
        },

        {
            type: 'Earned Leave',
            icon: FiUmbrella,
            remaining:
                18 -
                dynamicUsage[
                'Earned Leave'
                ],
            used:
                dynamicUsage[
                'Earned Leave'
                ],
            total: 18,
            pct: Math.round(
                ((18 -
                    dynamicUsage[
                    'Earned Leave'
                    ]) /
                    18) *
                100
            ),
            barColor: 'bg-emerald-500'
        }
    ]

    const filteredHistory =
        useMemo(() => {

            if (
                historyFilter === 'All'
            )
                return leaveHistory

            return leaveHistory.filter(
                item =>
                    item.status ===
                    historyFilter
            )

        }, [
            leaveHistory,
            historyFilter
        ])

    return (
        <div className="space-y-6 animate-fade-in">

            <LeaveHeader
                setActiveTab={setActiveTab}
                setFormStep={setFormStep}
            />

            <LeaveTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setFormStep={setFormStep}
                leaveHistory={leaveHistory}
            />

            {activeTab ===
                'Overview' && (
                    <LeaveOverview
                        balanceCards={
                            balanceCards
                        }
                        historyFilter={
                            historyFilter
                        }
                        setHistoryFilter={
                            setHistoryFilter
                        }
                        filteredHistory={
                            filteredHistory
                        }
                        approvals={
                            approvals
                        }
                        handleCancelRequest={
                            handleCancelRequest
                        }
                    />
                )}

            {activeTab ===
                'Apply' && (
                    <LeaveApplyForm
                        leaveCategory={
                            leaveCategory
                        }
                        setLeaveCategory={
                            setLeaveCategory
                        }
                        startDateVal={
                            startDateVal
                        }
                        setStartDateVal={
                            setStartDateVal
                        }
                        endDateVal={
                            endDateVal
                        }
                        setEndDateVal={
                            setEndDateVal
                        }
                        isHalfDay={
                            isHalfDay
                        }
                        setIsHalfDay={
                            setIsHalfDay
                        }
                        formReason={
                            formReason
                        }
                        setFormReason={
                            setFormReason
                        }
                        showFromWarning={
                            showFromWarning
                        }
                        setShowFromWarning={
                            setShowFromWarning
                        }
                        showToWarning={
                            showToWarning
                        }
                        setShowToWarning={
                            setShowToWarning
                        }
                        handleFormSubmit={
                            handleFormSubmit
                        }
                        setActiveTab={
                            setActiveTab
                        }
                    />
                )}

            {activeTab ===
                'My Leaves' && (
                    <MyLeaves
                        leaveHistory={
                            leaveHistory
                        }
                    />
                )}

            {activeTab ===
                'Approvals' && (
                    <LeaveApprovals
                        leaveHistory={
                            leaveHistory
                        }
                    />
                )}

        </div>
    )
}

export default Leave