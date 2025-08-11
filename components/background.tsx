"use client"

import { useEffect, useRef } from "react"

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(187,222,251,0.18),transparent),radial-gradient(800px_400px_at_10%_0%,rgba(187,222,251,0.12),transparent),radial-gradient(800px_400px_at_90%_0%,rgba(187,222,251,0.1),transparent)]" />
      <Starfield />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </div>
  )
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = Math.floor(window.innerWidth * dpr))
    let h = (canvas.height = Math.floor(window.innerHeight * dpr))
    canvas.style.width = "100%"
    canvas.style.height = "100%"

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * Math.PI * 2,
      s: 0.002 + Math.random() * 0.004,
    }))

    let raf = 0
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.a += s.s
        const twinkle = (Math.sin(s.a) + 1) / 2
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * (0.6 + twinkle * 0.6), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.3 + twinkle * 0.7})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = Math.floor(window.innerWidth * dpr)
      h = canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = "100%"
      canvas.style.height = "100%"
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
