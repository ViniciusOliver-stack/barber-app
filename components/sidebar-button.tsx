"use client"

import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { SignInDialog } from "./sigin-in-dialog"

export function SidebarButton() {
  const { data } = useSession()

  async function handleLogoutButton() {
    signOut()
  }

  return (
    <Sheet>
      <SheetTrigger className="bg-transparent" asChild>
        <Button size="icon" variant="outline" className="border-none">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto overflow-x-hidden border-none bg-neutral-900">
        <SheetHeader>
          <SheetTitle className="text-left text-sm">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between border-b border-solid border-gray01 py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image || ""}
                  className="max-h-10 min-h-10 min-w-10 max-w-10 rounded-full"
                />
              </Avatar>
              <div className="ml-3 flex flex-col">
                <span className="truncate font-bold">{data.user.name}</span>
                <span className="w-[90%] truncate text-xs text-gray-500">
                  {data.user.email}
                </span>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-medium">Olá, faça o seu login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="rounded-[8px] bg-primaryPurple"
                  >
                    <LogInIcon size={16} />
                  </Button>
                </DialogTrigger>
                <SignInDialog />
              </Dialog>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4 border-b border-solid border-gray01 py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2 bg-gray01" asChild>
              <Link href="/">
                <HomeIcon size={16} />
                Início
              </Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button className="justify-start gap-2 bg-gray01" asChild>
              <Link href="/bookings">
                <CalendarIcon size={16} />
                Agendamentos
              </Link>
            </Button>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-4 border-b border-solid border-gray01 py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button className="justify-start gap-2 bg-gray01" asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    width={16}
                    height={16}
                    alt={option.title}
                  />
                  <p>{option.title}</p>
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {data?.user && (
          <div className="flex flex-col gap-4 py-5">
            <Button
              className="gap-2 rounded-[8px] bg-primaryPurple hover:bg-primaryPurple/80"
              onClick={handleLogoutButton}
            >
              <LogOutIcon size={16} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
