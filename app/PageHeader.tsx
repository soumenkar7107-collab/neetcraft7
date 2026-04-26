'use client'
import { motion } from 'framer-motion'
import type { TabId } from '@/app/page'
import type { AppData } from '@/lib/types'
import { getLevelInfo } from '@/lib/constants'
import {
  LayoutDashboard, CalendarDays, CheckSquare, RefreshCw, BarChart3, Timer
} from 'lucide-react'

interface Props {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  data: AppData
}

const tabs = [
  { id: 'dashboard' as TabId, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'plan' as TabId, label: 'Plan', icon: CalendarDays },
  { id: 'tasks' as TabId, label: 'Tasks', icon: CheckSquare },
  { id: 'revision' as TabId, label: 'Revision', icon: RefreshCw },
  { id: 'stats' as TabId, label: 'Stats', icon: BarChart3 },
  { id: 'timer' as TabId, label: 'Focus Timer', icon: Timer },
]

export default function Sidebar({ activeTab, setActiveTab, data }: Props) {
  const li = getLevelInfo(data.xp)

  return (
    <aside className="w-[200px] min-w-[200px] h-full bg-bg-card border-r border-border flex flex-col py-5 px-3 select-none">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-7">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-purple to-[#6d56f5] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
          N
        </div>
        <div>
          <p className="text-text-primary font-bold text-sm tracking-tight">NEETCraft</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full text-left focus-ring ${
                isActive
                  ? 'text-accent-purple bg-accent-purple-dim'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card2'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 bg-accent-purple-dim rounded-lg"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                />
              )}
              <Icon size={15} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Level badge at bottom */}
      <div className="mt-auto px-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: li.color + '22', color: li.color, border: `1px solid ${li.color}44` }}
          >
            {li.level}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-xs font-semibold">Level {li.level}</p>
            <p className="text-text-tertiary text-[10px]">{data.xp} XP total</p>
          </div>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: li.color }}
            initial={{ width: 0 }}
            animate={{ width: `${li.pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-text-tertiary text-[10px] mt-1.5">
          {li.toNext > 0 ? `${li.toNext} XP to next level` : 'Max level!'}
        </p>
      </div>
    </aside>
  )
}
