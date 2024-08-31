import { BarbershopItem } from "@/components/barbershop-item"
import { Header } from "@/components/header"
import { Search } from "@/components/search"
import { db } from "@/lib/prisma"

interface BarberShopsPageProps {
  //O searchParams é obrigatório esse nome, mas o valor que eu passar dentro do searchParams
  //Será o valor que ele vai procurar na minha URL: http://localhost:3000/barbershops?joao=01 e exibir em tela
  searchParams: {
    search?: string
  }
}

/*Preste atenção: A gente tem um pasta da seguinte maneira: app > barbershops > page.tsx (dentro dessa pasta, podemos colocar tudo que desejamos, que não será afetada nada em outras pastas no mesmo caminho) 
Temos a pasta [id] e essa pasta não é afeta e não impede a gente ter um arquivo page.tsx na raiz da barbershops, pois são independentes...*/

export default async function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: { contains: searchParams.search, mode: "insensitive" },
    },
  })

  return (
    <div className="h-[calc(100vh_-_5rem)]">
      <Header />

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
