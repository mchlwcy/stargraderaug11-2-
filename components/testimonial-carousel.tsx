"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Reveal } from "./reveal"

type Item = {
  quote: string
  name: string
  img: string
}

export function TestimonialCarousel({ items }: { items: Item[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % items.length)
    }, 4500)
    return () => clearInterval(t)
  }, [items.length])

  const prev = () => setI((p) => (p - 1 + items.length) % items.length)
  const next = () => setI((p) => (p + 1) % items.length)

  return (
    <Reveal>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {items.map((t, idx) => (
              <div key={idx} className="min-w-full">
                <Card className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Image
                        alt={t.name}
                        src={t.img || "/placeholder.svg?height=56&width=56&query=avatar%20portrait"}
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{t.name}</div>
                        <div className="flex items-center gap-0.5 text-[#BBDEFB]">
                          <Star className="h-4 w-4 fill-[#BBDEFB] text-[#BBDEFB]" />
                          <Star className="h-4 w-4 fill-[#BBDEFB] text-[#BBDEFB]" />
                          <Star className="h-4 w-4 fill-[#BBDEFB] text-[#BBDEFB]" />
                          <Star className="h-4 w-4 fill-[#BBDEFB] text-[#BBDEFB]" />
                          <Star className="h-4 w-4 fill-[#BBDEFB] text-[#BBDEFB]" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-neutral-200">“{t.quote}”</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-neutral-950/70 p-2 text-neutral-200 hover:text-white hover:bg-neutral-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-neutral-950/70 p-2 text-neutral-200 hover:text-white hover:bg-neutral-900"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, idx) => (
            <span key={idx} className={`h-1.5 w-6 rounded-full ${i === idx ? "bg-[#BBDEFB]" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}
