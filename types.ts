'use client'
import { useState, useEffect, useCallback } from 'react'
import type { AppData } from '@/lib/types'
import { DEFAULT_DATA } from '@/lib/constants'

const STORAGE_KEY = 'neetcraft_v1'

function loadData(): AppData {
  if (typeof window === 'undefined') return DEFAULT_DATA
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) }
  } catch (e) {}
  return DEFAULT_DATA
}

function saveData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {}
}

export function useAppData() {
  const [data, setData] = useState<AppData>(DEFAULT_DATA)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setData(loadData())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveData(data)
  }, [data, hydrated])

  const update = useCallback((fn: (draft: AppData) => void) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as AppData
      fn(next)
      return next
    })
  }, [])

  return { data, update, hydrated }
}
