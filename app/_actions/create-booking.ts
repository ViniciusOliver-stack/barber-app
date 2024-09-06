"use server"

/* Quando a gente deseja por exemplo realizar o cadastro de informação no Banco de dados, mas nosso componente se encontra do lado do cliente ("use client")
Podemos utilizar no NextJS server Action. Server Action nada mais é do que função que podem ser executadas do lado do servidor mas podem ser chamadas do lado do cliente.
Assim podemos chamar o banco de dados que vai ser feita do lado servidor e consegui realizar essa chamada da função do lado do cliente.
(Utilizando o server actions é como se a gente criasse uma rota de API, só que de uma forma mais fácil.)*/

import { db } from "@/lib/prisma"

interface CreateBookingProps {
  serviceId: string
  userId: string
  date: Date
}

export async function createBooking(params: CreateBookingProps) {
  await db.booking.create({
    data: params,
  })
}
