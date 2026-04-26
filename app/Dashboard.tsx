'use client'
import { useState, useCallback } from 'react'
import type { Notification } from '@/lib/types'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [xpPops, setXpPops] = useState<{ id: string; amount: number }[]>([])

  const notify = useCallback((icon: string, title: string, body: string) => {
    const id = Date.now().toString() + Math.random()
    setNotifications(prev => [...prev, { id, icon, title, body }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const showXP = useCallback((amount: number) => {
    const id = Date.now().toString() + Math.random()
    setXpPops(prev => [...prev, { id, amount }])
    setTimeout(() => setXpPops(prev => prev.filter(x => x.id !== id)), 1600)
  }, [])

  return { notifications, xpPops, notify, dismiss, showXP }
}
