"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
  }
  return (
    <div className="flex items-center justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={16} />
        <p
          className="text-sm hover:cursor-pointer"
          onClick={() => handleCopyPhoneClick(phone)}
        >
          {phone}
        </p>
      </div>

      <Button className="rounded-[10px] bg-gray01" asChild>
        <Link href={`https://wa.me/${phone}`}>Chamar</Link>
      </Button>
    </div>
  )
}
