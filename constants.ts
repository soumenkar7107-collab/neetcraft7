'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setCompleted(true)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const start = useCallback(() => { if (!completed) setRunning(true) }, [completed])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback((newSeconds?: number) => {
    setRunning(false)
    setCompleted(false)
    setSeconds(newSeconds ?? initialSeconds)
  }, [initialSeconds])

  const toggle = useCallback(() => {
    if (completed) return
    setRunning(r => !r)
  }, [completed])

  return { seconds, running, completed, start, pause, reset, toggle }
}
