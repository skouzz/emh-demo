"use client"

interface User {
  id: string
  email: string
  name: string
  role: "superadmin" | "admin" | "customer"
  createdAt: Date
}

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Try local user-store first
    try {
      const raw = localStorage.getItem("emh_users")
      const users: Array<Omit<User, "createdAt"> & { createdAt: string; password?: string }> = raw
        ? JSON.parse(raw)
        : []
      const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
      if (matched) {
        const user: User = {
          id: matched.id,
          email: matched.email,
          name: matched.name,
          role: matched.role as User["role"],
          createdAt: new Date(matched.createdAt),
        }
        this.state = { user, isAuthenticated: true, isLoading: false }
        this.saveToStorage()
        this.notifyListeners()
        return { success: true }
      }
    } catch (e) {
      // ignore and fall back to defaults
    }

    // Default built-in credentials (superadmin and admin) for initial access
    if (email === "super@emh.tn" && password === "super123") {
      const user: User = {
        id: "0",
        email: "super@emh.tn",
        name: "Super Admin",
        role: "superadmin",
        createdAt: new Date(),
      }
      this.state = { user, isAuthenticated: true, isLoading: false }
      this.saveToStorage()
      this.notifyListeners()
      return { success: true }
    }

    if (email === "admin@emh.tn" && password === "admin123") {
      const user: User = {
        id: "1",
        email: "admin@emh.tn",
        name: "Administrateur EMH",
        role: "admin",
        createdAt: new Date(),
      }
      this.state = { user, isAuthenticated: true, isLoading: false }
      this.saveToStorage()
      this.notifyListeners()
      return { success: true }
    }

    return { success: false, error: "Email ou mot de passe incorrect" }
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
