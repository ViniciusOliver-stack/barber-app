"use client"
import React, { useRef } from "react"
import { Barbershop } from "@prisma/client"
import { BarbershopItem } from "./barbershop-item"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  barbershops: Barbershop[]
}

export function Carousel({ barbershops }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      })
    }
  }
  return (
    <div className="relative">
      {/* Para esconder o scrollbar, usamos uma div com a classe [&::-webkit-scrollbar]:hidden. */}
      <div
        className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        ref={scrollContainerRef}
      >
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray01 p-2 text-white"
          onClick={() => scroll(-300)}
        >
          <ChevronLeft />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray01 p-2 text-white"
          onClick={() => scroll(300)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
