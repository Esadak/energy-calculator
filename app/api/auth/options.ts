import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Importera din databas-klient och bcrypt här
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Din existerande authorize-logik här
        // Exempel:
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials?.email }
        // });
        // 
        // if (user && await bcrypt.compare(credentials?.password || "", user.password)) {
        //   return { id: user.id, email: user.email, name: user.name };
        // }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
  async session({ session, token }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};