"use server"

import { db } from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingProps {
  serviceId: string
  date: Date
}

export async function getBookings({ date }: GetBookingProps) {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date), //Menor ou igual
        gte: startOfDay(date), //Maior ou igual
      },
    },
  })
}
