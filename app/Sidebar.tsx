export type Subject = 'Physics' | 'Chemistry' | 'Biology'

export interface Revision {
  day: 3 | 7 | 14 | 30
  due: string // ISO date string
  done: boolean
}

export interface Task {
  id: string
  subject: Subject
  topic: string
  done: boolean
  addedDate: string
  revisions: Revision[]
}

export interface PlanItem {
  id: string
  time: string
  subject: Subject
  topic: string
  done: boolean
}

export interface DailyStats {
  day: string
  questions: number
}

export interface SubjectAccuracy {
  subject: Subject
  accuracy: number
}

export interface AppStats {
  physicsPercent: number
  chemistryPercent: number
  biologyPercent: number
  dailyQuestions: DailyStats[]
  accuracy: SubjectAccuracy[]
}

export type LevelChar = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'

export interface Notification {
  id: string
  icon: string
  title: string
  body: string
}

export interface AppData {
  xp: number
  streak: number
  hoursStudied: number
  mockTests: number
  studyDays: number
  examDate: string
  dailyTarget: number
  dailyDone: number
  tasks: Task[]
  plan: PlanItem[]
  stats: AppStats
}
