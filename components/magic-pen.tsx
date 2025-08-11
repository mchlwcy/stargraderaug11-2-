"use client"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * MagicPen — Horizontal, sword-like slash
 * - Black body, white + #BBDEFB luminous tip.
 * - Wide, tapered beam that sweeps left → right.
 * - Animated streaks and subtle float for premium motion.
 * - Apple-like minimal finish with soft glows.
 */
export function MagicPen({ className }: Props) {
  return (
    <div
      className={cn(
        "relative pointer-events-none select-none",
        "drop-shadow-[0_12px_36px_rgba(0,0,0,.6)]",
        "flex items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      {/* Light slice underlay for extra glow (beneath the SVG) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-[10px] sm:h-[12px] w-[70%] rounded-full blur-[8px] sm:blur-[10px] opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 25%, rgba(187,222,251,0.9) 60%, rgba(187,222,251,0) 100%)",
        }}
      />
      <svg
        width="960"
        height="180"
        viewBox="0 0 960 180"
        xmlns="http://www.w3.org/2000/svg"
        className="origin-center animate-[pen-sweep_6.5s_ease-in-out_infinite_alternate,pen-float_8s_ease-in-out_infinite] will-change-transform"
      >
        <defs>
          <linearGradient id="penBodyH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0A0B" />
            <stop offset="50%" stopColor="#111113" />
            <stop offset="100%" stopColor="#0D0D0F" />
          </linearGradient>
          <linearGradient id="metalCapH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A2A2E" />
            <stop offset="100%" stopColor="#1A1A1D" />
          </linearGradient>
          <radialGradient id="tipGlowH" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F4F9FF" />
            <stop offset="70%" stopColor="#D7EBFF" />
            <stop offset="100%" stopColor="rgba(187,222,251,0)" />
          </radialGradient>
          <linearGradient id="tipEdgeH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#BBDEFB" />
          </linearGradient>

          {/* Beam sweep */}
          <linearGradient id="beamGradH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="45%" stopColor="rgba(187,222,251,0.9)" />
            <stop offset="85%" stopColor="rgba(187,222,251,0.25)" />
            <stop offset="100%" stopColor="rgba(187,222,251,0)" />
          </linearGradient>

          <filter id="softGlowH" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="beamBlurH" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Soft glow around the tip */}
        <g>
          <circle cx="610" cy="90" r="28" fill="url(#tipGlowH)" opacity="0.95" />
          <circle cx="610" cy="90" r="64" fill="url(#tipGlowH)" opacity="0.35" />
          <circle cx="610" cy="90" r="96" fill="url(#tipGlowH)" opacity="0.18" />
        </g>

        {/* BEAM / SLASH from left to right (tapered to the right) */}
        <g className="animate-[beam-pulse_3.2s_ease-in-out_infinite]">
          {/* Inner sharp core */}
          <polygon points="610,84 940,90 610,96" fill="url(#beamGradH)" filter="url(#beamBlurH)" opacity="0.9" />
          {/* Outer halo */}
          <polygon points="610,78 980,90 610,102" fill="url(#beamGradH)" filter="url(#beamBlurH)" opacity="0.5" />
        </g>

        {/* MOTION STREAKS near the beam */}
        <g opacity="0.75" className="animate-[streaks_2.8s_ease-in-out_infinite]">
          <rect x="700" y="98" width="2" height="30" rx="1" fill="rgba(187,222,251,0.55)" />
          <rect x="770" y="92" width="2" height="36" rx="1" fill="rgba(255,255,255,0.45)" />
          <rect x="830" y="96" width="1.6" height="28" rx="0.8" fill="rgba(187,222,251,0.45)" />
          <rect x="900" y="94" width="1.6" height="24" rx="0.8" fill="rgba(255,255,255,0.4)" />
        </g>

        {/* PEN BODY (horizontal), tip at right */}
        {/* Barrel */}
        <rect x="150" y="62" width="360" height="36" rx="18" fill="url(#penBodyH)" filter="url(#softGlowH)" />
        {/* Subtle highlight */}
        <rect x="150" y="64" width="360" height="10" rx="5" fill="rgba(255,255,255,0.06)" />

        {/* Connector cap */}
        <rect x="510" y="58" width="28" height="44" rx="10" fill="url(#metalCapH)" />
        <rect x="510" y="60" width="28" height="8" rx="4" fill="rgba(255,255,255,0.08)" />

        {/* Tip collar */}
        <rect x="540" y="66" width="26" height="48" rx="10" fill="#0B0B0C" />
        {/* Taper to tip */}
        <polygon points="566,66 610,90 566,114" fill="#0E0E10" />
        {/* Glowing tip edge */}
        <polygon points="574,74 608,90 574,106" fill="url(#tipEdgeH)" />

        {/* Premium outlines */}
        <rect x="150" y="62" width="360" height="36" rx="18" fill="none" stroke="rgba(255,255,255,0.06)" />
        <rect x="510" y="58" width="28" height="44" rx="10" fill="none" stroke="rgba(255,255,255,0.08)" />
        <polygon points="566,66 610,90 566,114" fill="none" stroke="rgba(255,255,255,0.05)" />
      </svg>

      <style jsx>{`
        @keyframes pen-float {
          0% {
            transform: translateY(0);
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.45))
              drop-shadow(0 0 38px rgba(187, 222, 251, 0.28));
          }
          40% {
            transform: translateY(-6px);
            filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.55))
              drop-shadow(0 0 56px rgba(187, 222, 251, 0.42));
          }
          100% {
            transform: translateY(0);
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.45))
              drop-shadow(0 0 38px rgba(187, 222, 251, 0.28));
          }
        }
        @keyframes pen-sweep {
          0% {
            transform: translateX(-8%);
          }
          100% {
            transform: translateX(8%);
          }
        }
        @keyframes beam-pulse {
          0% {
            opacity: 0.7;
            transform: scaleX(1);
          }
          45% {
            opacity: 1;
            transform: scaleX(1.06);
          }
          60% {
            opacity: 0.92;
            transform: scaleX(1.1);
          }
          100% {
            opacity: 0.75;
            transform: scaleX(1);
          }
        }
        @keyframes streaks {
          0% {
            transform: translateX(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(10px);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  )
}
