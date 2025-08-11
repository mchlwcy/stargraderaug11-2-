"use client"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * VeryPen — ultra-minimal, Apple-like
 * - Sleek black body, tiny cap band, crisp white/blue tip.
 * - No extra streaks or beams; just the pen with a subtle glow and float.
 */
export function VeryPen({ className }: Props) {
  return (
    <div
      className={cn(
        "relative pointer-events-none select-none flex items-center justify-center",
        "drop-shadow-[0_10px_30px_rgba(0,0,0,.6)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 960 160"
        xmlns="http://www.w3.org/2000/svg"
        className="origin-center animate-[vp-float_8s_ease-in-out_infinite]"
        style={{ width: "100%", height: "auto", willChange: "transform, filter" }}
      >
        <defs>
          <linearGradient id="vpBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0A0B" />
            <stop offset="50%" stopColor="#111113" />
            <stop offset="100%" stopColor="#0D0D0F" />
          </linearGradient>
          <linearGradient id="vpChrome" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A2A2E" />
            <stop offset="100%" stopColor="#1A1A1D" />
          </linearGradient>
          <linearGradient id="vpTipEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#BBDEFB" />
          </linearGradient>
          <radialGradient id="vpTipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#EAF3FF" />
            <stop offset="100%" stopColor="rgba(187,222,251,0)" />
          </radialGradient>
          <filter id="vpGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft tip glow */}
        <g>
          <circle cx="700" cy="80" r="28" fill="url(#vpTipGlow)" opacity="0.9" />
          <circle cx="700" cy="80" r="54" fill="url(#vpTipGlow)" opacity="0.28" />
        </g>

        {/* Body */}
        <rect x="180" y="60" width="380" height="40" rx="20" fill="url(#vpBody)" filter="url(#vpGlow)" />
        {/* subtle highlight */}
        <rect x="180" y="62" width="380" height="10" rx="5" fill="rgba(255,255,255,0.06)" />

        {/* Cap band */}
        <rect x="560" y="56" width="18" height="48" rx="9" fill="url(#vpChrome)" />
        <rect x="560" y="58" width="18" height="8" rx="4" fill="rgba(255,255,255,0.08)" />

        {/* Grip */}
        <rect x="580" y="64" width="70" height="32" rx="16" fill="#0B0B0C" />

        {/* Tip base */}
        <polygon points="650,64 700,80 650,96" fill="#0E0E10" />
        {/* Luminous tip edge */}
        <polygon points="662,70 698,80 662,90" fill="url(#vpTipEdge)" />

        {/* Hairline outlines for premium finish */}
        <rect x="180" y="60" width="380" height="40" rx="20" fill="none" stroke="rgba(255,255,255,0.06)" />
        <rect x="560" y="56" width="18" height="48" rx="9" fill="none" stroke="rgba(255,255,255,0.08)" />
        <rect x="580" y="64" width="70" height="32" rx="16" fill="none" stroke="rgba(255,255,255,0.05)" />
        <polygon points="650,64 700,80 650,96" fill="none" stroke="rgba(255,255,255,0.05)" />
      </svg>

      <style jsx>{`
        @keyframes vp-float {
          0% {
            transform: translateY(0);
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.4))
              drop-shadow(0 0 32px rgba(187, 222, 251, 0.25));
          }
          40% {
            transform: translateY(-6px);
            filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.5))
              drop-shadow(0 0 48px rgba(187, 222, 251, 0.38));
          }
          100% {
            transform: translateY(0);
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.4))
              drop-shadow(0 0 32px rgba(187, 222, 251, 0.25));
          }
        }
      `}</style>
    </div>
  )
}
