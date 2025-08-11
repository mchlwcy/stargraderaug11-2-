"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "./reveal"

const features = [
  {
    title: "⚡ Instant Precision",
    desc: "274 micro-metrics analyzed in seconds. No more subjective guesswork.",
  },
  {
    title: "🎯 Actionable Insights",
    desc: "Students know exactly which part cost them marks — and how to fix it.",
  },
  {
    title: "🚀 Time Liberation",
    desc: "Teachers save 320 hours yearly. Spend time teaching, not grading.",
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 80}>
          <Card className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(187,222,251,.35),0_20px_60px_-20px_rgba(0,0,0,.5)] hover:border-[#BBDEFB]/40">
            <CardContent className="p-6">
              <div className="font-medium text-white text-lg">{f.title}</div>
              <p className="mt-3 text-sm text-neutral-300">{f.desc}</p>
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}
