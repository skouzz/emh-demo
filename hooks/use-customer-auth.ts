"use client"

import { useEffect, useState } from "react"
import { customerAuthStore } from "@/lib/customer-auth-store"
import type { CustomerAuthState } from "@/lib/customer-auth-store"

export function useCustomerAuth() {
  // Initialize with an SSR-safe default so server and first client render match
  const [state, setState] = useState<CustomerAuthState>(() => ({ user: null, isAuthenticated: false, isLoading: true }))

  useEffect(() => {
    // Sync from store after mount (store may have already loaded from localStorage)
    setState(customerAuthStore.getState())
    const unsub = customerAuthStore.subscribe(() => setState(customerAuthStore.getState()))
    return unsub
  }, [])

  return {
    ...state,
    login: customerAuthStore.login.bind(customerAuthStore),
    logout: customerAuthStore.logout.bind(customerAuthStore),
  }
} 