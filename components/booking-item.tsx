import { Prisma } from "@prisma/client"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  //Através do prisma podemos dizer o que se encontra incluso na nossa query do Booking
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const isConfirmed = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-[80%] rounded-[8px] border-none bg-secondaryBlack">
        <CardContent className="flex justify-between">
          <div className="flex flex-col gap-2 py-5">
            <Badge
              className={`w-fit ${isConfirmed ? "bg-primaryPurple text-white hover:bg-primaryPurple" : "bg-neutral-800 hover:bg-neutral-800"}`}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3>{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={booking.service.imageUrl}
                  className="rounded-full"
                />
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid border-gray01 pl-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-3xl">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
