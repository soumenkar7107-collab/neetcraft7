'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AppData, Subject, Task } from '@/lib/types'
import { SUBJECT_COLORS, XP_PER_TASK, REVISION_DAYS, addDays, todayStr } from '@/lib/constants'
import Card from '@/components/ui/Card'
import SubjectBadge from '@/components/ui/SubjectBadge'
import PageHeader from '@/components/ui/PageHeader'
import { Check, Plus, Trash2 } from 'lucide-react'

interface Props {
  data: AppData
  update: (fn: (d: AppData) => void) => void
  notify: (icon: string, title: string, body: string) => void
  showXP: (amount: number) => void
}

export default function Tasks({ data, update, notify, showXP }: Props) {
  const [newSubject, setNewSubject] = useState<Subject>('Physics')
  const [newTopic, setNewTopic] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')

  function addTask() {
    if (!newTopic.trim()) return
    const id = Date.now().toString()
    const today = todayStr()
    const revisions = REVISION_DAYS.map(d => ({
      day: d,
      due: addDays(d),
      done: false,
    }))
    update(d => {
      d.tasks.push({ id, subject: newSubject, topic: newTopic.trim(), done: false, addedDate: today, revisions })
    })
    notify('📌', 'Topic added!', `"${newTopic.trim()}" added with spaced revision on Day 3, 7, 14, 30.`)
    setNewTopic('')
  }

  function toggleTask(id: string) {
    const task = data.tasks.find(t => t.id === id)
    update(d => {
      const t = d.tasks.find(t => t.id === id)
      if (t) {
        t.done = !t.done
        if (t.done) d.xp += XP_PER_TASK
      }
    })
    if (task && !task.done) {
      showXP(XP_PER_TASK)
      notify('✅', 'Topic completed!', `${task.topic} marked done. +${XP_PER_TASK} XP earned.`)
    }
  }

  function deleteTask(id: string) {
    update(d => { d.tasks = d.tasks.filter(t => t.id !== id) })
  }

  const filtered = data.tasks.filter(t => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const doneCount = data.tasks.filter(t => t.done).length

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <PageHeader
          title="Tasks"
          subtitle={`${doneCount} of ${data.tasks.length} topics completed`}
        />

        {/* Add form */}
        <Card className="mb-4">
          <p className="text-text-secondary text-[10px] uppercase tracking-widest font-medium mb-3">
            Add New Topic
          </p>
          <div className="flex gap-2">
            <select
              value={newSubject} onChange={e => setNewSubject(e.target.value as Subject)}
              className="bg-bg-card2 border border-border rounded-lg text-text-primary text-sm px-3 py-2 outline-none cursor-pointer focus:border-accent-purple-border transition-colors"
            >
              {(['Physics', 'Chemistry', 'Biology'] as Subject[]).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text" value={newTopic} onChange={e => setNewTopic(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addTask() }}
              placeholder="Enter topic name (e.g. Rotational Motion)..."
              className="flex-1 bg-bg-card2 border border-border rounded-lg text-text-primary text-sm px-3 py-2 outline-none focus:border-accent-purple-border transition-colors placeholder:text-text-tertiary min-w-0"
            />
            <button
              onClick={addTask}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-accent-purple text-white hover:brightness-110 transition-all flex-shrink-0"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
          <p className="text-text-tertiary text-[11px] mt-2.5">
            Auto-generates spaced revision reminders for Day 3, 7, 14, and 30.
          </p>
        </Card>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-4">
          {(['all', 'active', 'done'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-lg capitalize transition-all ${
                filter === f
                  ? 'bg-accent-purple-dim text-accent-purple border border-accent-purple-border'
                  : 'text-text-secondary border border-border hover:text-text-primary hover:border-border-strong'
              }`}
            >
              {f} {f === 'all' ? `(${data.tasks.length})` : f === 'active' ? `(${data.tasks.filter(t => !t.done).length})` : `(${doneCount})`}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {filtered.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-tertiary">
              <p className="text-3xl mb-3">📚</p>
              <p className="text-sm">No topics yet. Add your first topic above.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function TaskCard({ task, index, onToggle, onDelete }: {
  task: Task; index: number; onToggle: () => void; onDelete: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const color = SUBJECT_COLORS[task.subject]
  const today = todayStr()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: task.done ? 0.45 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, height: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-xl border p-3.5 transition-colors duration-150"
      style={{
        background: 'rgba(19,22,30,0.8)',
        borderColor: task.done ? '#1e2130' : color + '22',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.button
          onClick={onToggle}
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{
            background: task.done ? '#22c55e22' : 'rgba(30,33,48,0.8)',
            border: `1.5px solid ${task.done ? '#22c55e' : '#2a2d3a'}`,
          }}
          whileTap={{ scale: 0.85 }}
        >
          {task.done && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
              <Check size={11} color="#22c55e" />
            </motion.div>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <SubjectBadge subject={task.subject} />
            <span className="text-text-tertiary text-[10px]">{task.addedDate}</span>
          </div>
          <p
            className="text-sm font-medium mb-2.5"
            style={{
              color: task.done ? '#4a5568' : '#e2e8f0',
              textDecoration: task.done ? 'line-through' : 'none',
            }}
          >
            {task.topic}
          </p>

          {/* Revision tags */}
          {task.revisions.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {task.revisions.map(r => {
                const isOverdue = !r.done && r.due < today
                const isDueToday = !r.done && r.due === today
                const tagColor = r.done ? '#22c55e' : isOverdue ? '#ef4444' : isDueToday ? '#f59e0b' : '#8b7cf8'
                return (
                  <span
                    key={r.day}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                    style={{
                      background: tagColor + '15',
                      color: tagColor,
                      border: `1px solid ${tagColor}33`,
                    }}
                  >
                    Day {r.day}{r.done ? ' ✓' : isOverdue ? ' !' : isDueToday ? ' today' : ''}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Delete */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onDelete}
              className="text-text-tertiary hover:text-red-400 transition-colors flex-shrink-0 p-1 rounded"
            >
              <Trash2 size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
