"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, set } from "date-fns"
import React, { useEffect, useState } from "react"
import { Carousel } from "./carousel"
import { createBooking } from "@/app/_actions/create-booking"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { getBookings } from "@/app/_actions/get-booking"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
]

// function getTimeList(bookings: Book)

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const { data } = useSession()

  const [dayBookings, setDayBookings] = useState<Booking[]>()

  useEffect(() => {
    async function fetch() {
      if (!selectedDay) return

      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  console.log(dayBookings)

  function handleSelectedTime(time: string | undefined) {
    setSelectedTime(time)
  }

  function handleSelectedDay(date: Date | undefined) {
    setSelectedDay(date)
  }

  //Utilizar o server action - create-booking
  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])

      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })

      toast.success("Reserva feita com sucesso!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (error) {
      console.log(error)
      toast.error("Erro ao fazer reserva!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="tru7 text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            {/* Para formar o valor para real, vamos utilizar o Intl.NumberFormat */}
            <p className="text-sm font-medium text-primaryPurple">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-[10px] bg-gray01">Reservar</Button>
              </SheetTrigger>

              <SheetContent className="border-none bg-neutral-900 px-0">
                <SheetHeader className="px-5">
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid border-gray01 py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    onSelect={handleSelectedDay}
                    selected={selectedDay}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className="border-b border-solid border-gray01 p-5">
                    <Carousel>
                      {TIME_LIST.map((time) => (
                        <Button
                          onClick={() => handleSelectedTime(time)}
                          key={time}
                          className={`rounded-full border border-gray01 transition-all duration-150 hover:bg-gray01 ${selectedTime === time ? "bg-primaryPurple" : "bg-transparent"}`}
                        >
                          {time}
                        </Button>
                      ))}
                    </Carousel>
                  </div>
                )}

                {selectedDay && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <span className="text-sm font-medium">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <span className="text-sm font-medium">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <span className="text-sm font-medium">
                            {selectedTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <span className="text-sm font-medium">
                            {barbershop.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {selectedDay && selectedTime && (
                  <SheetFooter className="w-full px-5">
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        className="bg-primaryPurple"
                        onClick={handleCreateBooking}
                      >
                        Confirmar reserva
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
