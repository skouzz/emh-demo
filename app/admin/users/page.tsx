"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { useUsers } from "@/hooks/use-users"
import type { UserRole } from "@/lib/user-store"

export default function AdminUsersPage() {
  const { user, isLoading, isSuperAdmin } = useAuth()
  const router = useRouter()
  const { users, createUser, removeUser } = useUsers()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<UserRole>("admin")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading) {
      if (!user || !isSuperAdmin()) {
        router.push("/admin/dashboard")
      }
    }
  }, [user, isLoading, isSuperAdmin, router])

  const handleCreate = () => {
    setError("")
    try {
      if (!email || !name || !password) {
        setError("Veuillez remplir tous les champs requis")
        return
      }
      createUser({ email, name, role, password })
      setEmail("")
      setName("")
      setPassword("")
      setRole("admin")
    } catch (e: any) {
      setError(e.message || "Erreur lors de la création de l'utilisateur")
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emh-red" />
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Comptes</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Nouveau compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="customer">Client</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button onClick={handleCreate} className="bg-emh-red hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Créer
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comptes existants ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">{u.role}</span>
                    {u.role !== "superadmin" && (
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => removeUser(u.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 