"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userStore } from "@/lib/user-store"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { Separator } from "@/components/ui/separator"
import { Shield, CircleCheck as CheckCircle2, Zap, ArrowRight, Eye, EyeOff, User, Building } from "lucide-react"
import { signIn } from "next-auth/react"

export default function SignupPage() {
  const router = useRouter()
  const { login } = useCustomerAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [audience, setAudience] = useState<"pro" | "particulier">("particulier")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        {/* Floating Orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Brand Hero */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emh-red to-red-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">EMH</h1>
                  <p className="text-sm text-gray-300">Solutions Électriques</p>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Rejoignez la communauté EMH
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Créez votre compte pour accéder à notre catalogue exclusif et bénéficier de nos services personnalisés.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, text: "Accès au catalogue complet" },
                  { icon: Shield, text: "Suivi de commandes en temps réel" },
                  { icon: Zap, text: "Support technique prioritaire" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-emh-red/20 transition-colors">
                      <benefit.icon className="w-4 h-4 text-emh-red" />
                    </div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Partnership Badge */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/legrand-logo.png"
                    alt="Legrand"
                    width={80}
                    height={25}
                    className="h-6 w-auto filter brightness-0 invert"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">Partenaire Officiel</p>
                    <p className="text-xs text-gray-400">Revendeur agréé Legrand France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emh-red to-red-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold">EMH</h1>
                  <p className="text-xs text-gray-300">Solutions Électriques</p>
                </div>
              </div>
            </div>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2">Créer un compte</CardTitle>
                <p className="text-gray-300">Rejoignez la famille EMH</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Social Signup */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/bridge" })}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    S'inscrire avec Google
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-300">ou</span>
                  </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nom complet</label>
                    <Input
                      placeholder="Mohamed Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Mot de passe</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Type de compte</label>
                    <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="particulier" className="focus:bg-slate-700 focus:text-white">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Particulier</div>
                              <div className="text-xs text-gray-400">Pour votre maison</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="pro" className="focus:bg-slate-700 focus:text-white">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Professionnel</div>
                              <div className="text-xs text-gray-400">Pour vos projets</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm backdrop-blur-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emh-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Création...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Créer mon compte
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-300">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-emh-red hover:text-red-400 font-medium transition-colors">
                      Se connecter
                    </Link>
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>Données protégées et sécurisées</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Account Type Selection */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emh-red to-red-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold">EMH</h1>
                  <p className="text-xs text-gray-300">Solutions Électriques</p>
                </div>
              </div>
            </div>

            {/* Account Type Cards */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white text-center mb-6">Choisissez votre profil</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 backdrop-blur-sm ${
                    audience === "particulier" 
                      ? "border-emh-red bg-emh-red/20" 
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                  onClick={() => setAudience("particulier")}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      audience === "particulier" ? "bg-emh-red" : "bg-white/10"
                    }`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Particulier</h4>
                      <p className="text-sm text-gray-300">Pour votre maison et projets personnels</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 backdrop-blur-sm ${
                    audience === "pro" 
                      ? "border-emh-red bg-emh-red/20" 
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                  onClick={() => setAudience("pro")}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      audience === "pro" ? "bg-emh-red" : "bg-white/10"
                    }`}>
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Professionnel</h4>
                      <p className="text-sm text-gray-300">Pour vos projets d'entreprise et chantiers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card - Only show when account type is selected */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardContent className="p-6 space-y-6">
                {/* Social Signup */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/bridge" })}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-300">ou</span>
                  </div>
                </div>

                {/* Manual Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe (min. 6 caractères)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emh-red focus:ring-emh-red/20 backdrop-blur-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm backdrop-blur-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emh-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Création...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Créer mon compte
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-300">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-emh-red hover:text-red-400 font-medium transition-colors">
                      Se connecter
                    </Link>
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>Données protégées et sécurisées</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-emh-red rounded-full animate-ping hidden lg:block"></div>
      <div className="absolute bottom-32 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/3 left-32 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce hidden lg:block"></div>
    </div>
  )
}