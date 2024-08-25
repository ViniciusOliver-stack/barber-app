import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarberShops({ params }: BarbershopPageProps) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={
            barbershop?.imageUrl ||
            "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
          }
          fill
          className="object-cover"
          alt={`Imagem mostrando o local ${barbershop?.name}`}
        />

        <Button
          className="absolute left-4 top-4 rounded-[8px] bg-gray01 hover:bg-gray01"
          asChild
        >
          <Link href="/" className="flex items-center justify-center">
            <ChevronLeft size={16} />
          </Link>
        </Button>

        <Button className="absolute right-4 top-4 rounded-[8px] bg-gray01">
          <MenuIcon size={16} />
        </Button>
      </div>

      <div className="border-b border-solid border-gray01 p-5">
        <h1 className="mb-3 text-xl font-medium">{barbershop?.name}</h1>

        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon size={18} className="text-primaryPurple" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon
            size={18}
            className="fill-primaryPurple text-primaryPurple"
          />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid border-gray01 p-5">
        <p className="text-xs font-bold uppercase text-gray-400">Sobre nós</p>

        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}
