"use client"

import { useEffect, useState } from "react"
import { audienceStore, type Audience } from "@/lib/audience-store"

export function useAudience() {
  // Initialize with SSR-safe default; server renders as "pro" and client syncs after mount
  const [audience, setAudience] = useState<Audience>(() => "pro")

  useEffect(() => {
    setAudience(audienceStore.get())
    const unsub = audienceStore.subscribe(() => setAudience(audienceStore.get()))
    return unsub
  }, [])

  return {
    audience,
    setAudience: audienceStore.set.bind(audienceStore),
  }
} 