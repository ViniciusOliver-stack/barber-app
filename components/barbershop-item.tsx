import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface Props {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: Props) {
  return (
    <div>
      <Card className="min-w-[160px]">
        <CardContent className="p-0">
          <div className="relative h-[159px] w-full">
            <Image
              fill
              className="rounded-t-[8px] object-cover"
              src={barbershop.imageUrl}
              alt={`Imagem da barbearia ${barbershop.name}`}
            />

            {/* TODO - Fazer feature a avaliação dos clientes */}
            <Badge
              className="absolute left-2 top-2 flex items-center gap-1 bg-gray01/80"
              variant="secondary"
            >
              <StarIcon
                size={14}
                className="fill-primaryPurple text-primaryPurple"
              />
              <p className="text-xs font-medium">5,0</p>
            </Badge>
          </div>

          <div className="px-3 py-3">
            <h3 className="truncate font-semibold">{barbershop.name}</h3>
            <p className="truncate text-xs text-gray-400">
              {barbershop.address}
            </p>
            <Button className="mt-3 w-full rounded-[10px] bg-gray01">
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
