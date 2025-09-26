"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartButton from "@/components/cart/CartButton"
import CartSidebar from "@/components/cart/CartSidebar"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { useAudience } from "@/hooks/use-audience"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { audience, setAudience } = useAudience()
  const { isAuthenticated, user, logout } = useCustomerAuth()

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Catalogues", href: "/products" },
    { name: "Contact", href: "/contact" },
    {
      name: "Plus",
      href: "#",
      submenu: [
        { name: "Services", href: "/services" },
        { name: "Réalisations", href: "/projects" },
        { name: "Legrand & EMH", href: "/legrand" },
        { name: "Suivi commande", href: "/track-order" },
        { name: "À propos", href: "/about" },
      ],
    },
  ]

  const handleCartOpen = () => setIsCartOpen(true)
  const handleCartClose = () => setIsCartOpen(false)
  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push("/checkout")
  }

  const userInitial = (user?.name || user?.email || "?").charAt(0).toUpperCase()

  return (
    <>
      <header className="bg-emh-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/emh-logo.png"
                alt="EMH - Établissement Mohamed Hertilli"
                width={200}
                height={60}
                className="h-8 sm:h-10 lg:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <div>
                      <button className="flex items-center text-emh-black hover:text-emh-red transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-emh-gray hover:text-emh-red transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-emh-black hover:text-emh-red transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap ${
                        pathname === item.href ? "text-emh-red" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-emh-black">
                <span>Particulier</span>
                <Switch
                  checked={audience === "pro"}
                  onCheckedChange={(checked) => {
                    const next = checked ? "pro" : "particulier"
                    setAudience(next)
                    if (next === "pro") router.push("/pro")
                    else router.push("/particulier")
                  }}
                  className="data-[state=checked]:bg-emh-red"
                />
                <span>Pro</span>
              </div>
              {!isAuthenticated ? (
                <>
                  <Button asChild variant="outline" className="bg-transparent">
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button asChild className="bg-emh-red hover:bg-red-700 text-white">
                    <Link href="/signup">Créer un compte</Link>
                  </Button>
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-medium hover:ring-2 hover:ring-emh-red focus:outline-none">
                        {userInitial}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2 text-sm text-gray-600">{user?.name || user?.email}</div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">Mes commandes</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Paramètres</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/contact">Contactez-nous</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              <CartButton onClick={handleCartOpen} />
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center gap-2">
              <CartButton onClick={handleCartOpen} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-emh-black hover:text-emh-red p-2"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-emh-white max-h-screen overflow-y-auto">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setIsMoreOpen(!isMoreOpen)}
                          className="flex items-center justify-between w-full px-3 py-3 text-emh-black hover:text-emh-red transition-colors duration-200 font-medium"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isMoreOpen && (
                          <div className="pl-4 space-y-1 bg-emh-gray">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-emh-red transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-3 text-emh-black hover:text-emh-red transition-colors duration-200 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-3 pt-2 flex flex-col gap-2">
                  {!isAuthenticated ? (
                    <>
                      <Button asChild variant="outline" className="flex-1 bg-transparent">
                        <Link href="/login">Connexion</Link>
                      </Button>
                      <Button asChild className="flex-1 bg-emh-red hover:bg-red-700 text-white">
                        <Link href="/signup">Créer un compte</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700" onClick={() => setIsMenuOpen(false)}>Profil</Link>
                      <Link href="/orders" className="block px-3 py-2 text-sm text-gray-700" onClick={() => setIsMenuOpen(false)}>Mes commandes</Link>
                      <Link href="/settings" className="block px-3 py-2 text-sm text-gray-700" onClick={() => setIsMenuOpen(false)}>Paramètres</Link>
                      <Link href="/contact" className="block px-3 py-2 text-sm text-gray-700" onClick={() => setIsMenuOpen(false)}>Contactez-nous</Link>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => { logout(); setIsMenuOpen(false) }}>Déconnexion</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={handleCartClose} onCheckout={handleCheckout} />
    </>
  )
}
