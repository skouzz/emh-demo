"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userStore } from "@/lib/user-store"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle2 } from "lucide-react"
import { signIn } from "next-auth/react"

export default function SignupPage() {
  const router = useRouter()
  const { login } = useCustomerAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [audience, setAudience] = useState<"pro" | "particulier">("particulier")
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      userStore.create({ email, name, role: "customer", password, audience })
      const result = await login(email, password)
      if (result.success) {
        router.push("/products")
      } else {
        setError(result.error || "Erreur de connexion")
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* Left: Brand / Hero */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-emh-gray to-white">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/emh-logo.png" alt="EMH" width={180} height={54} className="h-10 w-auto" />
          </Link>
        </div>
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-emh-black mb-4">Rejoindre EMH</h1>
          <p className="text-lg text-gray-600 mb-6">
            Créez votre compte pour accéder à nos produits, conseils et services.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emh-red" /> Commande facile</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emh-red" /> Historique et suivi</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emh-red" /> Support prioritaire</li>
          </ul>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2"><Shield className="h-4 w-4" /> Données sécurisées</div>
      </div>

      {/* Right: Auth Card */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Créer un compte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 mb-4">
              <Button variant="outline" className="bg-white" onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/bridge" })}>Google</Button>
            </div>
            <Separator className="my-4" />
            <form onSubmit={handleSignup} className="space-y-4">
              <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="pro">Professionnel</SelectItem>
                </SelectContent>
              </Select>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <Button type="submit" className="w-full bg-emh-red hover:bg-red-700 text-white">S'inscrire</Button>
              <div className="text-sm text-gray-600 text-center">
                Déjà un compte ? <Link href="/login" className="text-emh-red hover:underline">Se connecter</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 