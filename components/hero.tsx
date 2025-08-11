"use client"

import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { UploadBox } from "@/components/upload-box"
import { FeatherPen } from "@/components/feather-pen"
import type { GradeResult } from "@/components/result-panel"
import { Star } from "lucide-react"
import { useParallax } from "@/hooks/use-parallax"
import { useTilt } from "@/hooks/use-tilt"

type Props = {
  onResult?: (r: GradeResult) => void
}

export function Hero({ onResult = () => {} }: Props) {
  const penParallax = useParallax({ translateY: 0.035, rotate: -0.006 })
  const auroraParallax = useParallax({ translateY: 0.02 })
  const leftTilt = useTilt({ maxTiltX: 5, maxTiltY: 8, perspective: 1000, spring: 0.15, scale: 1.005 })
  const cardTilt = useTilt({ maxTiltX: 3, maxTiltY: 4, perspective: 900, spring: 0.18, scale: 1.01 })

  return (
    <section id="top" className="relative px-4 md:px-8">
      {/* Background styling layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* divider */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-20" />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(70% 50% at 50% 18%, black, transparent 70%)",
          }}
        />
        {/* ultra-fine scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.14) 0, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 3px)",
            maskImage: "radial-gradient(70% 50% at 50% 25%, black, transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
        {/* aurora ribbons */}
        <div
          className="absolute -top-16 left-[-6vw] h-[46vh] w-[60vw] blur-2xl opacity-45"
          style={{
            background:
              "radial-gradient(700px 320px at 22% 18%, rgba(187,222,251,0.30), rgba(187,222,251,0.06) 60%, rgba(187,222,251,0) 70%)",
            ...auroraParallax,
          }}
        />
        <div
          className="absolute -top-24 right-[-8vw] h-[54vh] w-[46vw] blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(520px 360px at 82% 18%, rgba(255,255,255,0.22), rgba(187,222,251,0.12) 50%, rgba(187,222,251,0) 70%)",
          }}
        />
        {/* constellation sparkles */}
        <span className="absolute right-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/85 shadow-[0_0_18px_6px_rgba(187,222,251,0.35)]" />
        <span className="absolute left-[6%] top-[12%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_12px_4px_rgba(187,222,251,0.25)]" />
        {/* floating dust around hero */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/70"
              style={{
                top: `${10 + ((i * 5) % 70)}%`,
                left: `${(i * 37) % 90}%`,
                opacity: 0.25 + ((i * 13) % 50) / 200,
                filter: "drop-shadow(0 0 12px rgba(187,222,251,.35))",
                animation: `sg-drift ${7 + (i % 5)}s ease-in-out ${i * 0.12}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="w-full pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="grid items-start gap-10 md:gap-14 md:[grid-template-columns:minmax(0,1fr)_minmax(320px,400px)]">
            {/* Left: text column with tilt */}
            <Reveal className="flex flex-col gap-7 md:gap-8">
              {/* overline */}
              <div className="inline-flex items-center gap-2 text-xs text-neutral-300">
                <span className="relative inline-flex h-5 w-5 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), rgba(187,222,251,0.2) 40%, transparent 70%)",
                      filter: "blur(6px)",
                    }}
                  />
                  <Star
                    className="relative h-3.5 w-3.5 text-white"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(255,255,255,.7)) drop-shadow(0 0 22px rgba(187,222,251,.35))",
                    }}
                    aria-hidden="true"
                  />
                </span>
                <span>{"Bringing clarity where there's vagueness."}</span>
              </div>

              <div
                ref={leftTilt.ref}
                style={leftTilt.style}
                onMouseMove={leftTilt.onMouseMove}
                onMouseLeave={leftTilt.onMouseLeave}
                className="relative"
              >
                {/* Pen diagonal with parallax */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[-120%] z-0 w-[132%] -translate-x-1/2 rotate-[-14deg] opacity-75 mix-blend-screen md:top-[-130%] md:w-[142%]"
                  style={penParallax}
                >
                  <FeatherPen className="w-full [filter:drop-shadow(0_0_28px_rgba(187,222,251,0.34))_drop-shadow(0_0_72px_rgba(255,255,255,0.2))]" />
                </div>

                {/* Lens flare near pen tip */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[18%] top-[-10%] h-20 w-20 rounded-full opacity-70 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(187,222,251,0.7) 35%, rgba(187,222,251,0) 70%)",
                    boxShadow:
                      "0 0 24px rgba(255,255,255,.45), 0 0 56px rgba(187,222,251,.35), 0 0 96px rgba(187,222,251,.25)",
                    animation: "sg-flare 5.5s ease-in-out infinite",
                  }}
                />

                {/* Headline with animated shine gradient */}
                <h1
                  className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.08] tracking-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #EAF3FF 25%, #BBDEFB 55%, #FFFFFF 85%)",
                    backgroundSize: "220% 100%",
                    animation: "sg-shine 7.5s ease-in-out infinite",
                  }}
                >
                  {"Lighting up your academic journey"}
                </h1>

                {/* Luminous underline beam */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-10 -bottom-5 h-10 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(60% 100% at 50% 90%, rgba(255,255,255,0.6), rgba(187,222,251,0.5) 55%, rgba(187,222,251,0) 75%)",
                  }}
                />
                {/* Micro accent line */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[2px] w-44 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,.95), rgba(187,222,251,.6), rgba(187,222,251,0))",
                    boxShadow: "0 0 12px rgba(187,222,251,.35)",
                  }}
                />
              </div>

              {/* subhead */}
              <p className="max-w-2xl text-neutral-300 text-base md:text-lg md:mt-1">
                {"Lighting up your academic journey like a star."}
              </p>

              {/* CTAs with magnetic glow */}
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-full border border-white/10 bg-[#BBDEFB] px-5 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-[#A7D3FA] transition-colors relative overflow-hidden"
                >
                  <span className="relative z-10">{"Experience StarGrader"}</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(120px 120px at 50% 50%, rgba(255,255,255,0.6), rgba(187,222,251,0.5), transparent 70%)",
                    }}
                  />
                </Link>
                <a
                  href="#features"
                  className="text-sm text-neutral-300 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                >
                  {"See features"}
                </a>
              </div>
            </Reveal>

            {/* Right: compact upload with glow + tilt */}
            <Reveal delay={80} className="md:sticky md:top-24">
              <div
                ref={cardTilt.ref}
                style={cardTilt.style}
                onMouseMove={cardTilt.onMouseMove}
                onMouseLeave={cardTilt.onMouseLeave}
                className="relative mx-auto md:mx-0 w-full max-w-[400px]"
              >
                {/* Glow*/}
                <div
                  className="pointer-events-none absolute -inset-2 rounded-[22px] opacity-70 blur-2xl"
                  style={{
                    background: "radial-gradient(60% 80% at 70% 30%, rgba(187,222,251,0.30), rgba(187,222,251,0) 60%)",
                  }}
                />
                {/* Shimmer ring */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[22px] [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)] [mask-composite:exclude] p-[2px] bg-[conic-gradient(from_0deg,transparent,rgba(187,222,251,.4),transparent_70%)] animate-[sg-rotate_9s_linear_infinite]"
                />
                <UploadBox compact defaultApiKey={""} onResult={onResult} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sg-shine {
          0% {
            background-position: 0% 50%;
            letter-spacing: 0px;
            text-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          45% {
            background-position: 100% 50%;
            letter-spacing: 0.2px;
            text-shadow: 0 0 18px rgba(255, 255, 255, 0.22), 0 0 36px rgba(187, 222, 251, 0.24);
          }
          100% {
            background-position: 0% 50%;
            letter-spacing: 0px;
            text-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        @keyframes sg-flare {
          0% {
            transform: scale(0.98);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
          100% {
            transform: scale(0.98);
            opacity: 0.7;
          }
        }
        @keyframes sg-drift {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          100% {
            transform: translateY(-8px) translateX(6px);
          }
        }
        @keyframes sg-rotate {
          to {
            transform: rotate(360deg);
          }
        }

        /* Reduce motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          :global(.animate-[sg-rotate_9s_linear_infinite]) {
            animation: none !important;
          }
          :global(.FeatherPen) {
            animation: none !important;
          }
          :global(#top *) {
            animation-duration: 0.001s !important;
            transition-duration: 0.001s !important;
          }
        }
      `}</style>
    </section>
  )
}
