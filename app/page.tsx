import { Header } from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
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

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="banner apresentação das melhores barbearias"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <Card className="mt-6 rounded-[8px] border-none bg-secondaryBlack">
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

            <div className="flex flex-col items-center justify-center border-l-2 border-solid border-gray01 px-5">
              <p className="text-sm">Fevereiro</p>
              <p className="text-3xl">06</p>
              <p className="text-sm">09:45</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
