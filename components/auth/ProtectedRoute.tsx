"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/admin/login")
        return
      }

      if (requireAdmin && !isAdmin()) {
        router.push("/")
        return
      }
    }
  }, [isAuthenticated, isLoading, isAdmin, requireAdmin, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emh-red"></div>
      </div>
    )
  }

  if (!isAuthenticated || (requireAdmin && !isAdmin())) {
    return null
  }

  return <>{children}</>
}
