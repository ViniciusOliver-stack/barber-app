import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Ops, barbearia não encontrada</p>

      <Link
        href="/"
        className="mt-6 flex items-center gap-2 rounded-[8px] bg-gray01 px-4 py-2"
      >
        <ChevronLeft size={16} className="mr-2" />
        Voltar ao início
      </Link>
    </div>
  )
}
