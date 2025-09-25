"use client"

import { useState, useEffect } from "react"
import { authStore } from "@/lib/auth-store"

export function useAuth() {
  const [authState, setAuthState] = useState(authStore.getState())

  useEffect(() => {
    setAuthState(authStore.getState())

    const unsubscribe = authStore.subscribe(() => {
      setAuthState(authStore.getState())
    })

    return unsubscribe
  }, [])

  return {
    ...authState,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    isAdmin: authStore.isAdmin.bind(authStore),
    isSuperAdmin: authStore.isSuperAdmin.bind(authStore),
  }
}
