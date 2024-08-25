import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export function BookingItem() {
  return (
    <>
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
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/124599?v=4"
                  className="rounded-full"
                />
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
    </>
  )
}
