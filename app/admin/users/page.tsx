"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Shield, Save, RotateCcw, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { useUsers } from "@/hooks/use-users"
import type { UserRole } from "@/hooks/use-users"

export default function AdminUsersPage() {
  const { user, isLoading, isAdmin, isSuperAdmin } = useAuth()
  const router = useRouter()
  const { users, createUser, removeUser, updateUser } = useUsers()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<UserRole>("customer")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Local edit state for existing users
  const [edits, setEdits] = useState<Record<string, { name: string; email: string; role: UserRole; password?: string }>>({})
  const [editRowId, setEditRowId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading) {
      if (!user || !isAdmin()) {
        router.push("/admin/dashboard")
      }
    }
  }, [user, isLoading, isAdmin, router])

  const handleCreate = () => {
    setError("")
    try {
      if (!email || !name || !password) {
        setError("Veuillez remplir tous les champs requis")
        return
      }
      // Admins (not superadmin) can only create customer accounts
      const createRole: UserRole = isSuperAdmin() ? role : "customer"
      createUser({ email, name, role: createRole, password })
      setEmail("")
      setName("")
      setPassword("")
      setRole("customer")
    } catch (e: unknown) {
      const error = e as Error
      setError(error.message || "Erreur lors de la création de l'utilisateur")
    }
  }

  const getEdit = (id: string) => {
    const current = users.find((u) => u.id === id)
    const existing = edits[id]
    return (
      existing || {
        name: current?.name || "",
        email: current?.email || "",
        role: (current?.role as UserRole) || "customer",
        password: "",
      }
    )
  }

  const setEdit = (id: string, patch: Partial<{ name: string; email: string; role: UserRole; password?: string }>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...getEdit(id), ...patch } }))
  }

  const startEditRow = (id: string) => {
    setEdits((prev) => ({ ...prev, [id]: getEdit(id) }))
    setEditRowId(id)
  }

  const cancelEditRow = (id: string) => {
    setEdits((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setEditRowId((cur) => (cur === id ? null : cur))
  }

  const handleSave = async (id: string) => {
    const original = users.find((u) => u.id === id)
    if (!original) return

    const { name, email, role: editedRole, password } = getEdit(id)
    const payload: any = { name, email }

    // Role change rules:
    // - superadmin may change any non-superadmin role
    // - admin may NOT set role to admin, and may not modify admin accounts
    if (isSuperAdmin()) {
      if (original.role !== "superadmin") payload.role = editedRole
    } else {
      // admin can only manage customers
      if (original.role === "customer") {
        payload.role = "customer"
      } else {
        // block changes to admin/superadmin rows
        return
      }
    }

    if (password && password.length >= 6) payload.password = password
    await updateUser(id, payload)
    setEdits((prev) => ({ ...prev, [id]: { ...getEdit(id), password: "" } }))
    setEditRowId(null)
  }

  const handleResetEdit = (id: string) => {
    setEdits((prev) => ({ ...prev, [id]: getEdit(id) }))
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nom complet <span className="text-red-600">*</span></label>
              <Input aria-label="Nom complet" placeholder="Ex: Mohamed Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
              <Input aria-label="Email" placeholder="nom@domaine.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rôle</label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                  {/* Admins can only create customers */}
                  {!isSuperAdmin() && <SelectItem value="customer">Client</SelectItem>}
                  {isSuperAdmin() && (
                    <>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="customer">Client</SelectItem>
                    </>
                  )}
              </SelectContent>
            </Select>
              <p className="text-xs text-gray-500">Les administrateurs peuvent gérer le catalogue et les commandes.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mot de passe <span className="text-red-600">*</span></label>
              <Input aria-label="Mot de passe" placeholder="Au moins 6 caractères" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600" role="alert" aria-live="polite">{error}</p>}
            <Button onClick={handleCreate} className="w-full bg-emh-red hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Créer le compte
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comptes existants ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-gray-50">
                  <tr className="text-sm text-gray-600">
                    <th className="py-3 px-3 border-b">Nom</th>
                    <th className="py-3 px-3 border-b">Email</th>
                    <th className="py-3 px-3 border-b">Rôle</th>
                    <th className="py-3 px-3 border-b">Nouveau mot de passe</th>
                    <th className="py-3 px-3 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const e = getEdit(u.id)
                    const isTargetSuper = u.role === "superadmin"
                    const isTargetAdmin = u.role === "admin"
                    const canEditTarget = isSuperAdmin() ? !isTargetSuper : u.role === "customer"
                    const canDeleteTarget = canEditTarget && (!isTargetAdmin || isSuperAdmin())
                    const roleSelectDisabled = isTargetSuper || (!isSuperAdmin())
                    const isEditing = editRowId === u.id

                    return (
                      <tr key={u.id} className="align-top hover:bg-gray-50/60">
                        <td className="py-3 px-3 border-b">
                          {!isEditing ? (
                            <div className="text-sm text-gray-900">{u.name}</div>
                          ) : (
                            <Input
                              aria-label={`Nom pour ${u.email}`}
                              placeholder="Nom"
                              value={e.name}
                              onChange={(ev) => setEdit(u.id, { name: ev.target.value })}
                              disabled={!canEditTarget}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 border-b">
                          {!isEditing ? (
                            <div className="text-sm text-gray-900">{u.email}</div>
                          ) : (
                            <Input
                              aria-label={`Email pour ${u.name || u.email}`}
                              placeholder="Email"
                              type="email"
                              value={e.email}
                              onChange={(ev) => setEdit(u.id, { email: ev.target.value })}
                              disabled={!canEditTarget}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 border-b min-w-[160px]">
                          {!isEditing ? (
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${u.role === "admin" ? "bg-blue-50 text-blue-700" : u.role === "superadmin" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                              {u.role}
                            </span>
                          ) : (
                            <Select
                              value={e.role}
                              onValueChange={(v) => setEdit(u.id, { role: v as UserRole })}
                              disabled={roleSelectDisabled}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Rôle" />
                              </SelectTrigger>
                              <SelectContent>
                                {isSuperAdmin() && <SelectItem value="admin">Admin</SelectItem>}
                                <SelectItem value="customer">Client</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </td>
                        <td className="py-3 px-3 border-b">
                          {!isEditing ? (
                            <span className="text-xs text-gray-500">••••••••</span>
                          ) : (
                            <Input
                              aria-label={`Nouveau mot de passe pour ${u.name || u.email}`}
                              placeholder="Facultatif (min 6)"
                              type="password"
                              value={e.password || ""}
                              onChange={(ev) => setEdit(u.id, { password: ev.target.value })}
                              disabled={!canEditTarget}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 border-b">
                          <div className="flex items-center gap-2 justify-end">
                            {!isEditing ? (
                              <>
                                <Button variant="outline" onClick={() => startEditRow(u.id)} disabled={!canEditTarget}>
                                  <PencilLine className="h-4 w-4 mr-2" />
                                  Modifier
                                </Button>
                                {canDeleteTarget && (
                                  <Button
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => removeUser(u.id)}
                                  >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                                )}
                              </>
                            ) : (
                              <>
                                <Button variant="outline" onClick={() => handleSave(u.id)} disabled={!canEditTarget}>
                                  <Save className="h-4 w-4 mr-2" />
                                  Enregistrer
                                </Button>
                                <Button variant="outline" onClick={() => handleResetEdit(u.id)}>
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Réinitialiser
                                </Button>
                                <Button variant="ghost" onClick={() => cancelEditRow(u.id)}>Annuler</Button>
                              </>
                    )}
                  </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 