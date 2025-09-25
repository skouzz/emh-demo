"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { userStore } from "@/lib/user-store"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useCustomerAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [audience, setAudience] = useState<"pro" | "particulier">("particulier")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login")
      return
    }
    setName(user.name)
    setEmail(user.email)
    setAudience((user as any).audience || "particulier")
  }, [isAuthenticated, user, router])

  const handleSave = () => {
    if (!user) return
    userStore.update(user.id, { name, email, audience })
    setMessage("Profil mis à jour ✔")
    setTimeout(() => setMessage(""), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de compte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="particulier">Particulier</SelectItem>
                <SelectItem value="pro">Professionnel</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSave} className="w-full bg-emh-red hover:bg-red-700 text-white">Enregistrer</Button>
            {message && <div className="text-sm text-green-600">{message}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 