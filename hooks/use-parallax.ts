"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

type Options = {
  /** vertical factor in px per scroll px */
  translateY?: number
  /** horizontal factor in px per scroll px */
  translateX?: number
  /** rotation factor in deg per scroll px */
  rotate?: number
  /** scale target (optional, static) */
  scale?: number
}

/**
 * useParallax — returns an inline style object for subtle parallax transforms.
 * Safe for SSR, uses rAF for smoothness and detaches on unmount.
 */
export function useParallax(opts: Options = {}) {
  const { translateY = 0.06, translateX = 0, rotate = -0.01, scale } = opts
  const [style, setStyle] = useState<React.CSSProperties>({})
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY || 0
        const x = y * translateX
        const ty = y * translateY
        const r = y * rotate
        const t = `translate3d(${x.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg)${
          scale ? ` scale(${scale})` : ""
        }`
        setStyle({
          transform: t,
          willChange: "transform",
        })
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
    }
  }, [translateY, translateX, rotate, scale])

  return style
}
