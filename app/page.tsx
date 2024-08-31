import Image from "next/image"

{
  /*Components */
}
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import { BookingItem } from "@/components/booking-item"
import { quickSearchOptions } from "./_constants/search"
import { BarbershopItem } from "@/components/barbershop-item"

import { db } from "@/lib/prisma"
import { Search } from "@/components/search"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
    take: 5,
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Vinicius!</h2>
        <p>Segunda-feira, 22 de agosto.</p>

        <div className="mt-6">
          <Search />
        </div>

        <Carousel>
          <div className="mt-6 flex items-center gap-3">
            {quickSearchOptions.map((option, index) => (
              <Button
                key={index}
                className="gap-2 rounded-[8px] border border-gray01 bg-secondaryBlack"
              >
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Button>
            ))}
          </div>
        </Carousel>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="banner apresentação das melhores barbearias"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* agendamentos */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <Carousel>
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </Carousel>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <Carousel>
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}
