"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type UseFadingUiOptions = {
  idleMs?: number
  enabled?: boolean
  pinned?: boolean
}

export function useFadingUi({
  idleMs = 2800,
  enabled = true,
  pinned = false,
}: UseFadingUiOptions = {}) {
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markActive = useCallback(() => {
    if (!enabled) {
      setVisible(true)
      return
    }

    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!pinned) {
      timerRef.current = setTimeout(() => setVisible(false), idleMs)
    }
  }, [enabled, idleMs, pinned])

  useEffect(() => {
    if (!enabled) return

    markActive()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [enabled, markActive])

  useEffect(() => {
    if (pinned) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setVisible(true)
    }
  }, [pinned])

  return { controlsVisible: pinned || visible, markActive }
}