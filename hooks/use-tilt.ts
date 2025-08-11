"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

type Options = {
  maxTiltX?: number // deg
  maxTiltY?: number // deg
  perspective?: number // px
  spring?: number // 0..1, how fast it follows
  scale?: number // optional scale on hover
}

/**
 * useTilt — subtle 3D tilt on mouse move.
 * Returns ref, style, and mouse handlers to spread on a container.
 */
export function useTilt(opts: Options = {}) {
  const { maxTiltX = 6, maxTiltY = 10, perspective = 900, spring = 0.18, scale = 1 } = opts
  const ref = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(${scale})`,
    willChange: "transform",
  })

  // Anim handle to smooth the transforms
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  const hovering = useRef(false)

  const animate = () => {
    current.current.x += (target.current.x - current.current.x) * spring
    current.current.y += (target.current.y - current.current.y) * spring
    const tx = current.current.x
    const ty = current.current.y
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${ty.toFixed(2)}deg) rotateY(${tx.toFixed(2)}deg) scale(${
        hovering.current ? scale : 1
      })`,
      transition: "transform 60ms ease",
      willChange: "transform",
    })
    raf.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height
    const rx = (px - 0.5) * 2 // -1..1
    const ry = (py - 0.5) * 2
    target.current.x = rx * maxTiltY
    target.current.y = -ry * maxTiltX
    hovering.current = true
  }

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    target.current.x = 0
    target.current.y = 0
    hovering.current = false
  }

  return { ref, style, onMouseMove, onMouseLeave }
}
