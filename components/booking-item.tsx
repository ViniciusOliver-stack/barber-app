import { Prisma } from "@prisma/client"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { PhoneItem } from "./phone-item"

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
      <Sheet>
        <SheetTrigger className="w-full">
          <Card className="min-w-[80%] rounded-[8px] border-none bg-secondaryBlack">
            <CardContent className="flex justify-between">
              <div className="flex flex-col gap-2 py-5">
                <Badge
                  className={`w-fit ${isConfirmed ? "bg-primaryPurple text-white hover:bg-primaryPurple" : "bg-neutral-800 hover:bg-neutral-800"}`}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="text-left">{booking.service.name}</h3>

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
        </SheetTrigger>

        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-[240px] w-full items-end">
            <Image
              alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
              src={booking.service.barbershop.imageUrl}
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage
                    className="h-14 w-14 rounded-full object-cover"
                    src={booking.service.barbershop.imageUrl}
                  />
                </Avatar>

                <div>
                  <h3 className="truncate text-base font-semibold">
                    {booking.service.barbershop.name}
                  </h3>
                  <p className="truncate text-sm text-gray-400">
                    {booking.service.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="my-6">
            <Badge
              className={`w-fit ${isConfirmed ? "bg-primaryPurple text-white hover:bg-primaryPurple" : "bg-neutral-800 hover:bg-neutral-800"}`}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
          </div>

          <Card>
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <span className="text-sm font-medium">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <span className="text-sm font-medium">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <span className="text-sm font-medium">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <span className="text-sm font-medium">
                  {booking.service.barbershop.name}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex w-full flex-col gap-4">
            {booking.service.barbershop.phones.map((phone, index) => (
              <PhoneItem phone={phone} key={index} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
