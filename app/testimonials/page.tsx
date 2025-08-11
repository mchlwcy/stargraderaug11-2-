import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { Reveal } from "@/components/reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsPage() {
  const items = [
    {
      quote: "StarGrader’s feedback was clear and specific. I finally understood how to push for 5**.",
      name: "Student (HKDSE 2025)",
      img: "/student-avatar.png",
    },
    {
      quote: "The rubric breakdown maps closely to what I teach. Great for targeted practice.",
      name: "English Teacher",
      img: "/teacher-avatar.png",
    },
    {
      quote: "Fast, helpful, and motivating. My structure and language improved in weeks.",
      name: "Student",
      img: "/student-avatar-2.png",
    },
  ]

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1 px-4 md:px-8">
        <div className="mx-auto max-w-6xl pt-20 md:pt-28 pb-10 md:pb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{"Loved by students"}</h1>
          </Reveal>
          <p className="mt-4 text-neutral-300 max-w-2xl">{"Real results. Real gains."}</p>

          <div className="mt-12">
            <TestimonialCarousel items={items} />
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {items.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Image
                        alt={t.name}
                        src={t.img || "/placeholder.svg?height=56&width=56&query=avatar"}
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
                    <p className="mt-4 text-sm text-neutral-200">“{t.quote}”</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
