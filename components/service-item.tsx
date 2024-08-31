import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
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

            <Button className="rounded-[10px] bg-gray01" asChild>
              <Link href={`/barbershops`} className="h-full">
                Reservar
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
