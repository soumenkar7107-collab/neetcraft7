'use client'
import { motion } from 'framer-motion'
import type { AppData } from '@/lib/types'
import { getLevelInfo, LEVEL_COLORS, LEVELS, daysUntil, XP_PER_QUESTION } from '@/lib/constants'
import Card from '@/components/ui/Card'
import CircularProgress from '@/components/ui/CircularProgress'
import PageHeader from '@/components/ui/PageHeader'
import { Flame, Zap, TrendingUp, BookOpen, Clock, TestTube } from 'lucide-react'

interface Props {
  data: AppData
  update: (fn: (d: AppData) => void) => void
  notify: (icon: string, title: string, body: string) => void
  showXP: (amount: number) => void
}

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } },
}

export default function Dashboard({ data, update, notify, showXP }: Props) {
  const daysLeft = daysUntil(data.examDate)
  const li = getLevelInfo(data.xp)

  const topStats = [
    {
      label: 'Days Left',
      value: daysLeft,
      sub: 'Until NEET 2025',
      icon: Clock,
      color: daysLeft < 30 ? '#ef4444' : daysLeft < 60 ? '#f59e0b' : '#8b7cf8',
    },
    { label: 'Study Days', value: data.studyDays, sub: 'Days logged', icon: BookOpen, color: '#8b7cf8' },
    { label: 'Hours Studied', value: data.hoursStudied, sub: 'Total hours', icon: TrendingUp, color: '#14b8a6' },
    { label: 'Mock Tests', value: data.mockTests, sub: 'Completed', icon: TestTube, color: '#f97316' },
  ]

  function addQuestions(n: number) {
    update(d => {
      d.dailyDone = Math.min(d.dailyTarget, d.dailyDone + n)
      d.xp += n * XP_PER_QUESTION
    })
    showXP(n * XP_PER_QUESTION)
    const newDone = Math.min(data.dailyDone + n, data.dailyTarget)
    if (newDone >= data.dailyTarget) {
      notify('🎉', 'Daily target achieved!', "Excellent work. You've hit your question goal for today.")
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <PageHeader
          title="Dashboard"
          subtitle="NEET 2025 — Stay consistent, stay ahead"
        />

        {/* Top 4 stat cards */}
        <motion.div
          className="grid grid-cols-4 gap-3 mb-4"
          variants={stagger.container}
          initial="initial"
          animate="animate"
        >
          {topStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div key={i} variants={stagger.item as any}>
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium">
                      {stat.label}
                    </p>
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{ background: stat.color + '22' }}
                    >
                      <Icon size={12} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold tracking-tight tabular-nums" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-text-tertiary text-[11px] mt-1">{stat.sub}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Second row */}
        <div className="grid grid-cols-[1fr_180px_1fr] gap-3 mb-4">
          {/* Daily Target */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="flex flex-col items-center gap-4 py-5">
              <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium self-start">
                Daily Target
              </p>
              <CircularProgress
                value={data.dailyDone}
                max={data.dailyTarget}
                label="questions"
                size={130}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => addQuestions(1)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:brightness-110 active:scale-95"
                  style={{ background: 'rgba(139,124,248,0.12)', color: '#8b7cf8', border: '1px solid rgba(139,124,248,0.2)' }}
                >
                  +1 Question
                </button>
                <button
                  onClick={() => addQuestions(10)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:brightness-110 active:scale-95"
                  style={{ background: 'rgba(139,124,248,0.12)', color: '#8b7cf8', border: '1px solid rgba(139,124,248,0.2)' }}
                >
                  +10 Questions
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <Card className="flex-1">
              <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-3">
                Streak
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl"
                  style={{
                    animation: 'flame 1.6s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.5))',
                  }}
                >
                  🔥
                </span>
                <div>
                  <p className="text-3xl font-extrabold text-[#f97316] tracking-tight tabular-nums">
                    {data.streak}
                  </p>
                  <p className="text-text-secondary text-xs">day streak</p>
                </div>
              </div>
            </Card>
            <button
              onClick={() => update(d => { d.streak += 1; d.studyDays += 1; d.xp += 5; })}
              className="text-xs text-text-secondary bg-bg-card border border-border rounded-lg py-2 hover:border-accent-purple-border hover:text-accent-purple transition-all"
            >
              + Log today
            </button>
          </motion.div>

          {/* XP / Level */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium">XP & Level</p>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                  style={{ background: li.color + '22', color: li.color, border: `1px solid ${li.color}44` }}
                >
                  Level {li.level}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold flex-shrink-0"
                  style={{ background: li.color + '22', color: li.color, border: `1px solid ${li.color}44` }}
                >
                  {li.level}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-primary text-sm font-semibold">{data.xp} XP</span>
                    <span className="text-text-tertiary text-xs">
                      {li.toNext > 0 ? `${li.toNext} to next` : 'MAX'}
                    </span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${li.color}, ${LEVEL_COLORS[Math.min(5, li.lvlIdx + 1)]})`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${li.pct}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                {LEVELS.map((lv, i) => (
                  <div
                    key={lv}
                    className="flex-1 h-1.5 rounded-full"
                    style={{
                      background: i <= li.lvlIdx ? li.color + 'cc' : '#1e2130',
                    }}
                  />
                ))}
              </div>
              <p className="text-text-tertiary text-[10px] mt-1.5">
                E → D → C → B → A → S
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-3">
              Intelligent Insights
            </p>
            <div className="flex flex-col gap-2">
              <InsightRow
                icon="⚠️"
                color="#f97316"
                title="Physics lagging"
                body="Your Physics question count is below target. Consider adding 20 more today to maintain balance."
              />
              <InsightRow
                icon="📅"
                color="#8b7cf8"
                title="Revision backlog building"
                body="3 spaced repetition sessions are due this week. Stay ahead to avoid cramming."
              />
              {data.dailyDone >= data.dailyTarget && (
                <InsightRow
                  icon="🎉"
                  color="#22c55e"
                  title="Daily target achieved!"
                  body="Outstanding consistency. Your streak continues — keep it going tomorrow."
                />
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

function InsightRow({ icon, color, title, body }: { icon: string; color: string; title: string; body: string }) {
  return (
    <div
      className="flex items-start gap-3 px-3 py-2.5 rounded-lg"
      style={{ background: color + '0f', border: `1px solid ${color}22` }}
    >
      <span className="text-sm mt-0.5">{icon}</span>
      <p className="text-sm text-text-primary leading-relaxed">
        <span className="font-semibold" style={{ color }}>{title}: </span>
        {body}
      </p>
    </div>
  )
}
