import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters" //Estamos passando o tipo para o nosso Prisma Adapter
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/prisma"

const handler = NextAuth({
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
})

export { handler as GET, handler as POST }
