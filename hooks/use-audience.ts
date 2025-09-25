"use client"

import { useEffect, useState } from "react"
import { audienceStore, type Audience } from "@/lib/audience-store"

export function useAudience() {
  const [audience, setAudience] = useState<Audience>(audienceStore.get())

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