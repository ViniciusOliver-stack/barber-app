import Image from "next/image"
import { SearchIcon } from "lucide-react"

{
  /*Components */
}
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { db } from "@/lib/prisma"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Vinicius!</h2>
        <p>Segunda-feira, 22 de agosto.</p>

        <div className="mt-6 flex flex-row items-center gap-1">
          <Input placeholder="Faça a sua busca" className="border-gray01" />
          <Button
            size="icon"
            className="rounded-[8px] bg-primaryPurple px-3 py-2"
          >
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="banner apresentação das melhores barbearias"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* agendamentos */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card className="rounded-[8px] border-none bg-secondaryBlack">
          <CardContent className="flex justify-between">
            <div className="flex flex-col gap-2 py-5">
              <Badge className="w-fit bg-primaryPurple/30 text-primaryPurple hover:bg-primaryPurple/30">
                Confirmado
              </Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid border-gray01 pl-5">
              <p className="text-sm">Fevereiro</p>
              <p className="text-3xl">06</p>
              <p className="text-sm">09:45</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        {/* Para esconder o scrollbar, usamos uma div com a classe [&::-webkit-scrollbar]:hidden. */}
        {/* <div className="flex items-center gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div> */}

        <Carousel barbershops={barbershops} />
      </div>
    </div>
  )
}
