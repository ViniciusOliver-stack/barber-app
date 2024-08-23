import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

export function Header() {
  return (
    <Card className="border-none">
      <CardContent className="flex flex-row items-center justify-between border-b border-neutral-800 p-5">
        <Image src="/logo.svg" alt="Logo" width={130} height={22} />
        <Button size="icon" variant="outline" className="border-none">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}
