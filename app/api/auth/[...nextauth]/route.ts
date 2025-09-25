import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Account, Profile, Session } from "next-auth"

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile | null }) {
      if (account && profile) {
        ;(token as any).provider = account.provider
        token.name = (profile as any).name as string
        token.email = ((profile as any).email as string) || (token.email as string)
        ;(token as any).picture = (profile as any).picture || (token as any).picture
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          name: (token as any).name as string,
          email: (token as any).email as string,
          image: (token as any).picture as string,
        }
        ;(session as any).provider = (token as any).provider
      }
      return session
    },
  },
}

const handler = NextAuth(options)

export { handler as GET, handler as POST } 