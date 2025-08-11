"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ResultPanel, type GradeResult } from "@/components/result-panel"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import { FeatureCards } from "@/components/feature-cards"
import { Reveal } from "@/components/reveal"
import { Hero } from "@/components/hero"

export default function Page() {
  const [result, setResult] = useState<GradeResult | null>(null)

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />

      {/* Redesigned Hero */}
      <Hero onResult={(r) => setResult(r)} />

      {/* Show results after grading */}
      <main className="flex-1">
        {result && (
          <section className="relative px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
              <Reveal className="mt-2 md:mt-6">
                <ResultPanel result={result} />
              </Reveal>
            </div>
          </section>
        )}

        {/* Problem + Solution */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-7xl pb-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Reveal>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur p-8 md:p-10 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{"The problem is vagueness."}</h2>
                  <p className="mt-4 text-neutral-300">
                    {
                      "Essay grading is subjective, unclear, and incredibly time-consuming. It's demoralizing for students, and draining for teachers."
                    }
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur p-8 md:p-10 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {"We bring precision to chaos."}
                  </h2>
                  <p className="mt-4 text-neutral-300">
                    {
                      "StarGrader transforms grading using AI — giving teachers a reliable assistant, and students a personalized coach."
                    }
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section id="features" className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-16 md:py-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{"Core Features"}</h2>
            </Reveal>
            <div className="mt-12">
              <FeatureCards />
            </div>
          </div>
        </section>

        {/* Preview block */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-7xl pb-8">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur p-8 md:p-10 shadow-sm">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="hidden md:block">
                    <div className="relative mx-auto max-w-md">
                      <div
                        className="absolute -inset-4 rounded-2xl opacity-60 blur-2xl"
                        style={{
                          background:
                            "radial-gradient(40% 60% at 50% 50%, rgba(187,222,251,0.25), rgba(187,222,251,0))",
                        }}
                      />
                      <Image
                        alt="Report preview"
                        src="/grading-report-dark-ui.png"
                        width={540}
                        height={360}
                        className="relative rounded-xl border border-white/10"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="space-y-4 text-neutral-300">
                      <p>{"Precision grading. Clear fixes. Faster growth."}</p>
                      <div className="flex gap-6 text-sm">
                        <Link href="/pricing" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                          {"Pricing"}
                        </Link>
                        <Link href="/members" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                          {"Members"}
                        </Link>
                        <Link
                          href="/testimonials"
                          className="text-[#BBDEFB] hover:text-white underline underline-offset-4"
                        >
                          {"Testimonials"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-20 md:py-28">
            <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-10 md:p-14 text-center">
              <Reveal>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {"Choose your path to excellence."}
                </h3>
                <p className="mt-3 text-neutral-300">{"For schools and individuals. Precision that scales."}</p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/pricing"
                    className="rounded-full border border-white/10 bg-[#BBDEFB] px-5 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-[#A7D3FA]"
                  >
                    {"See pricing"}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
