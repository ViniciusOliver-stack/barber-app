import { db } from "./prisma"
import { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    //Assim conseguimos retornar toda a nossa sessão do usuário com as informações necessárias.
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id, //o user.id ele vem do banco a informação do ID do usuário.
      } as any
      return session
    },
  },
}
