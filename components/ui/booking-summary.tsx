import { format } from "date-fns"
import { Card, CardContent } from "./card"
import { ptBR } from "date-fns/locale"
import { Barbershop, BarbershopService } from "@prisma/client"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDay: Date
}

export function BookingSummary({
  barbershop,
  service,
  selectedDay,
}: BookingSummaryProps) {
  return (
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
            {format(selectedDay, "HH:mm")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <span className="text-sm font-medium">{barbershop.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}
