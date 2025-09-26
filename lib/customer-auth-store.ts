"use client"

import { CustomerUser } from "./db/models/user"

export interface CustomerAuthState {
  user: CustomerUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

class CustomerAuthStore {
  private state: CustomerAuthState = {
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
      const storedUser = localStorage.getItem("emh_customer_user")
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
      console.error("Error loading customer auth:", error)
      this.state.isLoading = false
    }
  }

  private saveToStorage() {
    try {
      if (this.state.user) {
        localStorage.setItem("emh_customer_user", JSON.stringify(this.state.user))
      } else {
        localStorage.removeItem("emh_customer_user")
      }
    } catch (error) {
      console.error("Error saving customer auth:", error)
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

  getState(): CustomerAuthState {
    return { ...this.state }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch("/api/auth/customer-login", {
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
      console.error("Customer login error:", error)
      return { success: false, error: "Network error" }
    }
  }

  loginWithUser(user: CustomerUser) {
    this.state = { user, isAuthenticated: true, isLoading: false }
    this.saveToStorage()
    this.notifyListeners()
  }

  logout() {
    this.state = { user: null, isAuthenticated: false, isLoading: false }
    this.saveToStorage()
    this.notifyListeners()
  }
}

export const customerAuthStore = new CustomerAuthStore() 