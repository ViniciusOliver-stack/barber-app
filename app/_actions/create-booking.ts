"use server"

import { authOptions } from "@/lib/auth"
/* Quando a gente deseja por exemplo realizar o cadastro de informação no Banco de dados, mas nosso componente se encontra do lado do cliente ("use client")
Podemos utilizar no NextJS server Action. Server Action nada mais é do que função que podem ser executadas do lado do servidor mas podem ser chamadas do lado do cliente.
Assim podemos chamar o banco de dados que vai ser feita do lado servidor e consegui realizar essa chamada da função do lado do cliente.
(Utilizando o server actions é como se a gente criasse uma rota de API, só que de uma forma mais fácil.)*/

import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

interface CreateBookingProps {
  serviceId: string
  date: Date
}

export async function createBooking(params: CreateBookingProps) {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("User não autenticado!")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })

  revalidatePath("/barbershops/[id]")
}
