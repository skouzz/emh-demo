"use client"

interface CustomerUser {
  id: string
  email: string
  name: string
  audience?: "pro" | "particulier"
  createdAt: Date
}

interface CustomerAuthState {
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
    await new Promise((r) => setTimeout(r, 300))

    try {
      const raw = localStorage.getItem("emh_users")
      const users: Array<any> = raw ? JSON.parse(raw) : []
      const customer = users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase() && u.password === password && u.role === "customer",
      )
      if (customer) {
        const user: CustomerUser = {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          audience: customer.audience,
          createdAt: new Date(customer.createdAt || Date.now()),
        }
        this.state = { user, isAuthenticated: true, isLoading: false }
        this.saveToStorage()
        this.notifyListeners()
        return { success: true }
      }
    } catch (e) {}

    return { success: false, error: "Email ou mot de passe incorrect" }
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