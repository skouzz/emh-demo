"use client"

import { User } from "./db/models/user"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

class AuthStore {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  }
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    try {
      const storedUser = localStorage.getItem("emh_user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        this.state = {
          user: { ...user, createdAt: new Date(user.createdAt) },
          isAuthenticated: true,
          isLoading: false,
        }
      } else {
        this.state.isLoading = false
      }
    } catch (error) {
      console.error("Error loading auth from storage:", error)
      this.state.isLoading = false
    }
  }

  private saveToStorage() {
    try {
      if (this.state.user) {
        localStorage.setItem("emh_user", JSON.stringify(this.state.user))
      } else {
        localStorage.removeItem("emh_user")
      }
    } catch (error) {
      console.error("Error saving auth to storage:", error)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getState(): AuthState {
    return { ...this.state }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const user = {
          ...data.user,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
        }
        this.state = { user, isAuthenticated: true, isLoading: false }
        this.saveToStorage()
        this.notifyListeners()
        return { success: true }
      } else {
        return { success: false, error: data.error || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error" }
    }
  }

  logout() {
    this.state = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }

    this.saveToStorage()
    this.notifyListeners()
  }

  isAdmin(): boolean {
    return this.state.user?.role === "admin" || this.state.user?.role === "superadmin" || false
  }

  isSuperAdmin(): boolean {
    return this.state.user?.role === "superadmin" || false
  }
}

export const authStore = new AuthStore()
