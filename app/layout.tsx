'use client'
import { useState } from 'react'
import { useAppData } from '@/hooks/useAppData'
import { useNotifications } from '@/hooks/useNotifications'
import Sidebar from '@/components/layout/Sidebar'
import NotificationToast from '@/components/ui/NotificationToast'
import XpPopup from '@/components/ui/XpPopup'
import Dashboard from '@/components/dashboard/Dashboard'
import Plan from '@/components/plan/Plan'
import Tasks from '@/components/tasks/Tasks'
import Revision from '@/components/revision/Revision'
import Stats from '@/components/stats/Stats'
import FocusTimer from '@/components/timer/FocusTimer'

export type TabId = 'dashboard' | 'plan' | 'tasks' | 'revision' | 'stats' | 'timer'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const { data, update, hydrated } = useAppData()
  const { notifications, xpPops, notify, dismiss, showXP } = useNotifications()

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center bg-bg-primary">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent-purple to-[#6d56f5] animate-pulse" />
          <span className="text-text-secondary text-sm">Loading NEETCraft...</span>
        </div>
      </div>
    )
  }

  const tabProps = { data, update, notify, showXP }

  const views: Record<TabId, React.ReactNode> = {
    dashboard: <Dashboard {...tabProps} />,
    plan: <Plan {...tabProps} />,
    tasks: <Tasks {...tabProps} />,
    revision: <Revision {...tabProps} />,
    stats: <Stats {...tabProps} />,
    timer: <FocusTimer {...tabProps} />,
  }

  return (
    <div className="flex h-full overflow-hidden bg-bg-primary">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} data={data} />

      <main className="flex-1 overflow-hidden flex flex-col min-w-0">
        {views[activeTab]}
      </main>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map(n => (
          <NotificationToast key={n.id} notification={n} onDismiss={() => dismiss(n.id)} />
        ))}
      </div>

      {/* XP Popups */}
      <div className="fixed bottom-20 right-6 z-50 pointer-events-none">
        {xpPops.map(p => (
          <XpPopup key={p.id} amount={p.amount} />
        ))}
      </div>
    </div>
  )
}
