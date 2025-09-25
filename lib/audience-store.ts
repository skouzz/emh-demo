"use client"

export type Audience = "pro" | "particulier"

const AUDIENCE_KEY = "emh_audience"

class AudienceStore {
  private audience: Audience = "pro"
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(AUDIENCE_KEY)
        if (saved === "pro" || saved === "particulier") this.audience = saved
      } catch {}
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((l) => l())
  }

  get(): Audience {
    return this.audience
  }

  set(a: Audience) {
    this.audience = a
    try {
      localStorage.setItem(AUDIENCE_KEY, a)
    } catch {}
    this.notify()
  }
}

export const audienceStore = new AudienceStore() 