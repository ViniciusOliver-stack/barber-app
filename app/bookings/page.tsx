import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Booking() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/")
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      date: {
        gte: new Date(), //A data é maior ou igual a data atual
      },
      userId: (session.user as any).id,
    },
    include: {
      //Adicionando o include, vai ser incluído tudo do serviço na nossa query
      service: {
        include: {
          // Add esse include, além de adicionar o service também vai ser adicionado o barbershop
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      date: {
        lt: new Date(), // A data é menor
      },
      userId: (session.user as any).id,
    },
    include: {
      //Adicionando o include, vai ser incluído tudo do serviço na nossa query
      service: {
        include: {
          // Add esse include, além de adicionar o service também vai ser adicionado o barbershop
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  return (
    <div>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 ? (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Confirmados
          </h2>
        ) : (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Nenhum agendamento confirmado
          </h2>
        )}
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        {concludedBookings.length > 0 && (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Finalizados
          </h2>
        )}
        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}
