"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { useRouter, usePathname } from "next/navigation"
import { RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always declare hooks; guard logic inside
  useEffect(() => {
    if (!mounted) return
    if (pathname === "/admin/login") return
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      router.push("/admin/login")
    }
  }, [user, router, pathname, mounted])

  // If we're on the login page, render it without gating
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Defer rendering until mounted to avoid hydration mismatches
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emh-red" />
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    )
  }

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">{children}</div>
    </div>
  )
}
