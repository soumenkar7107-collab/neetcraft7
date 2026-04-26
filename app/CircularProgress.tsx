'use client'
import { motion } from 'framer-motion'
import type { AppData } from '@/lib/types'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'

interface Props {
  data: AppData
  update: (fn: (d: AppData) => void) => void
  notify: (icon: string, title: string, body: string) => void
  showXP: (amount: number) => void
}

const SUBJECT_COLORS = ['#8b7cf8', '#f97316', '#22c55e']

const tooltipStyle = {
  contentStyle: {
    background: '#181c26',
    border: '1px solid #1e2130',
    borderRadius: 8,
    color: '#e2e8f0',
    fontSize: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  itemStyle: { color: '#e2e8f0' },
  labelStyle: { color: '#8892a4' },
  cursor: { fill: 'rgba(139,124,248,0.07)' },
}

export default function Stats({ data }: Props) {
  const pieData = [
    { name: 'Physics', value: data.stats.physicsPercent },
    { name: 'Chemistry', value: data.stats.chemistryPercent },
    { name: 'Biology', value: data.stats.biologyPercent },
  ]

  const totalDone = data.tasks.filter(t => t.done).length
  const totalTasks = data.tasks.length
  const completionRate = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0
  const totalQuestions = data.stats.dailyQuestions.reduce((s, d) => s + d.questions, 0)
  const avgAccuracy = Math.round(data.stats.accuracy.reduce((s, a) => s + a.accuracy, 0) / data.stats.accuracy.length)

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <PageHeader title="Stats" subtitle="Performance analytics and insights" />

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Task Completion', value: completionRate + '%', sub: `${totalDone}/${totalTasks} topics done`, color: '#8b7cf8' },
            { label: 'Weekly Questions', value: totalQuestions, sub: 'This week total', color: '#14b8a6' },
            { label: 'Avg Accuracy', value: avgAccuracy + '%', sub: 'Across subjects', color: '#22c55e' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card>
                <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold tracking-tight tabular-nums" style={{ color: s.color }}>{s.value}</p>
                <p className="text-text-tertiary text-[11px] mt-1">{s.sub}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Pie chart */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full">
              <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-4">
                Subject Distribution
              </p>
              <div className="flex items-center gap-4">
                <PieChart width={160} height={160}>
                  <Pie
                    data={pieData}
                    cx={75} cy={75}
                    innerRadius={42} outerRadius={62}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={SUBJECT_COLORS[i]} opacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                </PieChart>
                <div className="flex flex-col gap-3">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: SUBJECT_COLORS[i] }} />
                      <div>
                        <p className="text-text-secondary text-xs">{d.name}</p>
                        <p className="text-text-primary text-sm font-semibold tabular-nums">{d.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Accuracy bars */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="h-full">
              <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-4">
                Accuracy by Subject
              </p>
              <div className="flex flex-col gap-4">
                {data.stats.accuracy.map((a, i) => {
                  const col = SUBJECT_COLORS[i]
                  const grade = a.accuracy >= 80 ? 'Excellent' : a.accuracy >= 65 ? 'Good' : 'Needs work'
                  return (
                    <div key={a.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-primary text-sm font-medium">{a.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: col + '15', color: col }}>
                            {grade}
                          </span>
                          <span className="text-sm font-bold tabular-nums" style={{ color: col }}>{a.accuracy}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: col }}
                          initial={{ width: 0 }}
                          animate={{ width: `${a.accuracy}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Daily questions bar chart */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="mb-3">
            <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-4">
              Daily Questions — This Week
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.stats.dailyQuestions} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#8892a4', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#8892a4', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [v, 'Questions']} />
                <Bar
                  dataKey="questions"
                  fill="#8b7cf8"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* XP progress line */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card>
            <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-4">
              XP Progress — This Week
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart
                data={[
                  { day: 'Mon', xp: 40 }, { day: 'Tue', xp: 75 }, { day: 'Wed', xp: 60 },
                  { day: 'Thu', xp: 110 }, { day: 'Fri', xp: 90 }, { day: 'Sat', xp: 140 }, { day: 'Sun', xp: data.xp % 40 + 10 },
                ]}
                margin={{ top: 5, right: 5, left: -28, bottom: 0 }}
              >
                <CartesianGrid stroke="#1e2130" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#8892a4', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8892a4', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [v, 'XP']} />
                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: '#14b8a6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
