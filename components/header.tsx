import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { SidebarButton } from "./sidebar-button"
import Link from "next/link"

export function Header() {
  return (
    <Card className="border-none">
      <CardContent className="flex flex-row items-center justify-between border-b border-neutral-800 p-5">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={130} height={22} />
        </Link>

        <SidebarButton />
      </CardContent>
    </Card>
  )
}
