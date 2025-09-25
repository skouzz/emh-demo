"use client"

export type UserRole = "superadmin" | "admin" | "customer"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: UserRole
  password?: string
  audience?: "pro" | "particulier"
  provider?: "google" | "linkedin"
  createdAt: Date
  updatedAt: Date
}

const USERS_KEY = "emh_users"

class UserStore {
  private users: AdminUser[] = []
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.load()
      // Ensure a default superadmin exists
      if (!this.users.some((u) => u.role === "superadmin")) {
        this.users.unshift({
          id: "0",
          email: "super@emh.tn",
          name: "Super Admin",
          role: "superadmin",
          password: "super123",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        this.save()
      }

      // Migration: if a legacy logged-in admin exists in emh_user but not in emh_users, add it
      try {
        const rawLegacy = localStorage.getItem("emh_user")
        if (rawLegacy) {
          const legacy = JSON.parse(rawLegacy) as { id: string; email: string; name: string; role: UserRole; createdAt?: string }
          if ((legacy.role === "admin" || legacy.role === "superadmin") && !this.users.some((u) => u.email.toLowerCase() === legacy.email.toLowerCase())) {
            this.users.unshift({
              id: legacy.id || Date.now().toString(),
              email: legacy.email,
              name: legacy.name,
              role: legacy.role,
              password: "",
              createdAt: legacy.createdAt ? new Date(legacy.createdAt) : new Date(),
              updatedAt: new Date(),
            })
            this.save()
          }
        }
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

  private load() {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        this.users = parsed.map((u: any) => ({
          ...u,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
        }))
      }
    } catch (e) {
      console.error("Failed to load users:", e)
    }
  }

  private save() {
    try {
      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(
          this.users.map((u) => ({
            ...u,
          })),
        ),
      )
    } catch (e) {
      console.error("Failed to save users:", e)
    }
  }

  getAll(): AdminUser[] {
    return [...this.users]
  }

  getById(id: string): AdminUser | undefined {
    return this.users.find((u) => u.id === id)
  }

  getByEmail(email: string): AdminUser | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  }

  create(data: { email: string; name: string; role: UserRole; password?: string; audience?: "pro" | "particulier"; provider?: "google" | "linkedin" }): AdminUser {
    const exists = this.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())
    if (exists) throw new Error("Un utilisateur avec cet email existe déjà")

    const user: AdminUser = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password || "",
      audience: data.audience,
      provider: data.provider,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.unshift(user)
    this.save()
    this.notify()
    return user
  }

  update(id: string, data: Partial<Omit<AdminUser, "id" | "createdAt">>): AdminUser {
    const idx = this.users.findIndex((u) => u.id === id)
    if (idx === -1) throw new Error("Utilisateur introuvable")

    const updated: AdminUser = {
      ...this.users[idx],
      ...data,
      updatedAt: new Date(),
    }
    this.users[idx] = updated
    this.save()
    this.notify()
    return updated
  }

  remove(id: string): void {
    this.users = this.users.filter((u) => u.id !== id)
    this.save()
    this.notify()
  }
}

export const userStore = new UserStore() 