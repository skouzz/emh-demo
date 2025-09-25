"use client"

import { useEffect, useState } from "react"
import { customerAuthStore } from "@/lib/customer-auth-store"

export function useCustomerAuth() {
  const [state, setState] = useState(customerAuthStore.getState())

  useEffect(() => {
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