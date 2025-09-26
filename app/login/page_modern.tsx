"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useCustomerAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/products")
    }
  }, [isLoading, isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)
    if (result.success) {
      router.push("/products")
    } else {
      setError(result.error || "Identifiants invalides")
    }
    setLoading(false)
  }

  // Avoid flashing the login UI if already authenticated or while loading auth state
  if (isLoading || isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Brand / Hero */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-emh-red via-red-600 to-red-700 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                <Image src="/images/emh-logo.png" alt="EMH" width={40} height={40} className="h-8 w-auto" />
              </div>
              <span className="text-xl font-bold">EMH</span>
            </Link>
          </div>
          
          <div className="relative z-10 max-w-lg">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Bienvenue chez <span className="text-yellow-300">EMH</span>
            </h1>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Accédez à votre espace pour commander, suivre vos commandes et recevoir des conseils personnalisés.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-yellow-300" />
                </div>
                <span className="text-lg">Catalogue complet</span>
              </div>
              <div className="flex items-center gap-3 text-red-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-yellow-300" />
                </div>
                <span className="text-lg">Conseils techniques</span>
              </div>
              <div className="flex items-center gap-3 text-red-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-yellow-300" />
                </div>
                <span className="text-lg">Suivi de commande</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-2 text-red-200">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Données sécurisées et chiffrées</span>
          </div>
        </div>

        {/* Right: Auth Card */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Se connecter</h2>
              <p className="text-gray-600">Accédez à votre compte EMH</p>
            </div>

            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 text-gray-700 font-medium transition-all duration-200 hover:shadow-md"
                    onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/bridge" })}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </Button>

                  <div className="relative">
                    <Separator className="my-6" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-4 text-sm text-gray-500">ou</span>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          type="email" 
                          placeholder="Adresse email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                          className="pl-10 h-12 border-gray-200 focus:border-emh-red focus:ring-emh-red"
                        />
                      </div>
                      
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mot de passe" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-emh-red focus:ring-emh-red"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {error}
                      </div>
                    )}

                    <Button 
                      disabled={loading} 
                      type="submit" 
                      className="w-full h-12 bg-emh-red hover:bg-red-700 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Connexion...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Se connecter
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Pas encore de compte ?{" "}
                      <Link href="/signup" className="text-emh-red hover:text-red-700 font-medium transition-colors duration-200">
                        Créer un compte
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
