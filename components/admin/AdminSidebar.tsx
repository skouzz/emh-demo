"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  FileText,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  {
    name: "Tableau de bord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Commandes",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Produits",
    href: "/admin/products", // Updated to use dedicated products page
    icon: Package,
  },
  {
    name: "Catégories", // Added dedicated categories page
    href: "/admin/categories",
    icon: FileText,
  },
  {
    name: "Clients",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Statistiques",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { logout, isSuperAdmin } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <h2 className="text-xl font-bold text-emh-red">EMH Admin</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "bg-emh-red text-white" : "text-gray-700 hover:bg-gray-100 hover:text-emh-red"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {isSuperAdmin() && (
              <Link
                href="/admin/users"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/admin/users" ? "bg-emh-red text-white" : "text-gray-700 hover:bg-gray-100 hover:text-emh-red"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Shield className="mr-3 h-5 w-5" />
                Comptes (Admins)
              </Link>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
