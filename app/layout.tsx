import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { AuthProvider } from "./_providers/auth"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  manifest: "./manifest.json",
  title: "App Barber Flow",
  description:
    "Barber Flow: Transforme a Experiência de Agendamento na Sua Barbearia Descubra o Barber Flow, a ferramenta definitiva para um agendamento de barbearia mais eficiente e intuitivo. Projetado para conectar clientes e barbeiros de maneira fluida, o Barber Flow simplifica o processo de reserva e gestão de compromissos, oferecendo uma experiência de usuário excepcional para ambos os lados. Eleve sua barbearia com tecnologia de ponta. Experimente o Barber Flow e veja a diferença que uma gestão eficiente pode fazer no seu negócio. Agende uma demonstração hoje mesmo e revolucione a forma como você gerencia seus agendamentos!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-primaryDark text-white">
      <link rel="shortcut icon" href="/favicon.svg" />

      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Footer />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  )
}
