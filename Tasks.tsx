import type { AppData, LevelChar, Subject } from './types'

export const LEVELS: LevelChar[] = ['E', 'D', 'C', 'B', 'A', 'S']
export const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 4000]
export const LEVEL_COLORS = ['#6b7280', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444']
export const XP_PER_TASK = 10
export const XP_PER_QUESTION = 1
export const REVISION_DAYS = [3, 7, 14, 30] as const

export const SUBJECT_COLORS: Record<Subject, string> = {
  Physics: '#8b7cf8',
  Chemistry: '#f97316',
  Biology: '#22c55e',
}

export const SUBJECT_BG: Record<Subject, string> = {
  Physics: 'rgba(139,124,248,0.12)',
  Chemistry: 'rgba(249,115,22,0.12)',
  Biology: 'rgba(34,197,94,0.12)',
}

export function getLevelInfo(xp: number) {
  let lvlIdx = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { lvlIdx = i; break }
  }
  const nextThreshold = lvlIdx < LEVELS.length - 1 ? LEVEL_THRESHOLDS[lvlIdx + 1] : 9999
  const prevThreshold = LEVEL_THRESHOLDS[lvlIdx]
  const pct = lvlIdx < LEVELS.length - 1
    ? Math.min(100, Math.round((xp - prevThreshold) / (nextThreshold - prevThreshold) * 100))
    : 100
  return {
    level: LEVELS[lvlIdx],
    color: LEVEL_COLORS[lvlIdx],
    pct,
    toNext: Math.max(0, nextThreshold - xp),
    lvlIdx,
  }
}

export function addDays(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

export function daysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000))
}

export const DEFAULT_DATA: AppData = {
  xp: 140,
  streak: 7,
  hoursStudied: 142,
  mockTests: 8,
  studyDays: 65,
  examDate: '2025-05-04',
  dailyTarget: 180,
  dailyDone: 141,
  tasks: [
    {
      id: '1', subject: 'Physics', topic: 'Rotational Motion', done: false,
      addedDate: '2025-04-01',
      revisions: [
        { day: 3, due: '2025-04-25', done: true },
        { day: 7, due: '2025-04-26', done: false },
      ],
    },
    {
      id: '2', subject: 'Chemistry', topic: 'General Organic Chemistry', done: false,
      addedDate: '2025-04-05',
      revisions: [{ day: 3, due: '2025-04-26', done: false }],
    },
    {
      id: '3', subject: 'Biology', topic: 'Cell Division', done: true,
      addedDate: '2025-04-10',
      revisions: [
        { day: 3, due: '2025-04-13', done: true },
        { day: 7, due: '2025-04-17', done: true },
      ],
    },
    {
      id: '4', subject: 'Physics', topic: 'Wave Optics', done: false,
      addedDate: '2025-04-18',
      revisions: [],
    },
    {
      id: '5', subject: 'Biology', topic: 'Genetics & Heredity', done: false,
      addedDate: '2025-04-20',
      revisions: [],
    },
  ],
  plan: [
    { id: 'p1', time: '08:00', subject: 'Physics', topic: 'Rotational Motion', done: false },
    { id: 'p2', time: '10:00', subject: 'Chemistry', topic: 'GOC', done: false },
    { id: 'p3', time: '13:00', subject: 'Biology', topic: 'Cell Division', done: true },
    { id: 'p4', time: '15:30', subject: 'Physics', topic: 'Wave Optics', done: false },
    { id: 'p5', time: '17:30', subject: 'Chemistry', topic: 'Thermodynamics', done: false },
  ],
  stats: {
    physicsPercent: 45,
    chemistryPercent: 32,
    biologyPercent: 23,
    dailyQuestions: [
      { day: 'Mon', questions: 45 },
      { day: 'Tue', questions: 62 },
      { day: 'Wed', questions: 38 },
      { day: 'Thu', questions: 71 },
      { day: 'Fri', questions: 55 },
      { day: 'Sat', questions: 80 },
      { day: 'Sun', questions: 41 },
    ],
    accuracy: [
      { subject: 'Physics', accuracy: 72 },
      { subject: 'Chemistry', accuracy: 68 },
      { subject: 'Biology', accuracy: 81 },
    ],
  },
}
