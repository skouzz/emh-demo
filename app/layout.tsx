import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthSessionProvider from "@/components/AuthSessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EMH - Établissement Mohamed Hertilli | Solutions Électriques & Domotique Tunisie",
  description:
    "EMH, distributeur officiel Legrand en Tunisie. Spécialiste en installations électriques, domotique, réseaux informatiques et solutions industrielles.",
  keywords:
    "EMH, Legrand, électricité, domotique, Tunisie, installations électriques, smart home, réseaux informatiques, solutions industrielles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
