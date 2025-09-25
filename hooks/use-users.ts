"use client"

import { useEffect, useState } from "react"
import { userStore, type AdminUser, type UserRole } from "@/lib/user-store"

export function useUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])

  useEffect(() => {
    setUsers(userStore.getAll())
    const unsub = userStore.subscribe(() => setUsers(userStore.getAll()))
    return unsub
  }, [])

  return {
    users,
    createUser: userStore.create.bind(userStore),
    updateUser: userStore.update.bind(userStore),
    removeUser: userStore.remove.bind(userStore),
  }
} 