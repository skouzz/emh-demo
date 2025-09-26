"use client"

import { useEffect, useState } from "react"
import { User } from "@/lib/db/models/user"

export type UserRole = "superadmin" | "admin" | "customer"
export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/users")
      
      if (response.ok) {
        const usersData = await response.json()
        const parsedUsers = usersData.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }))
        setUsers(parsedUsers)
      }
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (userData: { email: string; name: string; role: UserRole; password?: string; audience?: "pro" | "particulier" }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      
      if (response.ok) {
        await loadUsers()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create user")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      
      if (response.ok) {
        await loadUsers()
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const removeUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        await loadUsers()
      }
    } catch (error) {
      console.error("Error removing user:", error)
    }
  }

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    removeUser,
    refreshData: loadUsers,
  }
} 