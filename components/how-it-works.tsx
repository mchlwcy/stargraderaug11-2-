"use client"

import { Reveal } from "./reveal"

const steps = [
  {
    title: "Drop or paste",
    desc: "Get set in seconds.",
  },
  {
    title: "Grade with DSE",
    desc: "Scores and rubric that matter.",
  },
  {
    title: "Rewrite stronger",
    desc: "Act on clear fixes.",
  },
]

export function HowItWorks() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 100}>
          <div className="group relative rounded-2xl border border-white/10 bg-neutral-900/70 p-6 backdrop-blur">
            <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-[#BBDEFB] text-black flex items-center justify-center font-semibold shadow-[0_0_0_6px_rgba(187,222,251,.15)]">
              {i + 1}
            </div>
            <div className="mt-4 text-white font-medium">{s.title}</div>
            <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
