"use client"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * FountainPen — horizontal, premium look
 * - Black lacquer body, subtle chrome trims, cap band, understated clip.
 * - Fountain nib with tines and breather hole; white + #BBDEFB luminous edge.
 * - Left → right tapered light beam plus motion streaks.
 * - Gentle float + sweep animations for stylish motion.
 */
export function FountainPen({ className }: Props) {
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
      {/* Subtle under-glow line beneath the pen */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-[10px] sm:h-[12px] w-[70%] rounded-full blur-[9px] sm:blur-[12px] opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 25%, rgba(187,222,251,0.85) 60%, rgba(187,222,251,0) 100%)",
        }}
      />

      <svg
        width="1000"
        height="220"
        viewBox="0 0 1000 220"
        xmlns="http://www.w3.org/2000/svg"
        className="origin-center animate-[pen-sweep_7s_ease-in-out_infinite_alternate,pen-float_8s_ease-in-out_infinite]"
        style={{ willChange: "transform, filter" }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0A0B" />
            <stop offset="50%" stopColor="#111113" />
            <stop offset="100%" stopColor="#0D0D0F" />
          </linearGradient>
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A2A2E" />
            <stop offset="100%" stopColor="#1A1A1D" />
          </linearGradient>
          <linearGradient id="nibSteel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFF" />
            <stop offset="60%" stopColor="#DDE9F8" />
            <stop offset="100%" stopColor="#C6DBF3" />
          </linearGradient>
          <linearGradient id="nibEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#BBDEFB" />
          </linearGradient>
          <radialGradient id="tipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F4F9FF" />
            <stop offset="70%" stopColor="#D7EBFF" />
            <stop offset="100%" stopColor="rgba(187,222,251,0)" />
          </radialGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="45%" stopColor="rgba(187,222,251,0.9)" />
            <stop offset="85%" stopColor="rgba(187,222,251,0.25)" />
            <stop offset="100%" stopColor="rgba(187,222,251,0)" />
          </linearGradient>

          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="beamBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Tip glow */}
        <g>
          <circle cx="710" cy="110" r="30" fill="url(#tipGlow)" opacity="0.95" />
          <circle cx="710" cy="110" r="70" fill="url(#tipGlow)" opacity="0.35" />
          <circle cx="710" cy="110" r="110" fill="url(#tipGlow)" opacity="0.18" />
        </g>

        {/* Beam / slash (left → right), tapered to right */}
        <g className="animate-[beam-pulse_3.2s_ease-in-out_infinite]">
          <polygon points="710,100 1000,110 710,120" fill="url(#beamGrad)" filter="url(#beamBlur)" opacity="0.9" />
          <polygon points="710,92 1040,110 710,128" fill="url(#beamGrad)" filter="url(#beamBlur)" opacity="0.5" />
        </g>

        {/* Motion streaks near the beam */}
        <g opacity="0.75" className="animate-[streaks_2.8s_ease-in-out_infinite]">
          <rect x="780" y="118" width="2" height="34" rx="1" fill="rgba(187,222,251,0.55)" />
          <rect x="850" y="112" width="2" height="40" rx="1" fill="rgba(255,255,255,0.45)" />
          <rect x="910" y="116" width="1.6" height="30" rx="0.8" fill="rgba(187,222,251,0.45)" />
          <rect x="960" y="114" width="1.6" height="26" rx="0.8" fill="rgba(255,255,255,0.4)" />
        </g>

        {/* Fountain pen body (horizontal, nib on right) */}
        {/* Barrel (lacquer) */}
        <rect x="180" y="80" width="360" height="60" rx="30" fill="url(#bodyGrad)" filter="url(#softGlow)" />
        {/* Subtle top highlight */}
        <rect x="182" y="82" width="356" height="12" rx="6" fill="rgba(255,255,255,0.06)" />

        {/* Cap with band and clip (left side) */}
        <g>
          {/* Cap main */}
          <rect x="90" y="74" width="120" height="72" rx="36" fill="url(#bodyGrad)" />
          {/* Cap band (chrome ring) */}
          <rect x="190" y="80" width="10" height="60" rx="5" fill="url(#chromeGrad)" />
          {/* Clip — understated line */}
          <path
            d="M120 86 C 144 82, 164 84, 174 100 C 176 104, 174 108, 168 110"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M120 88 C 144 84, 162 86, 170 100"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Section connector (chrome) */}
        <rect x="540" y="76" width="28" height="68" rx="12" fill="url(#chromeGrad)" />
        <rect x="540" y="78" width="28" height="10" rx="5" fill="rgba(255,255,255,0.08)" />

        {/* Grip section (darker) */}
        <rect x="568" y="84" width="56" height="52" rx="20" fill="#0B0B0C" />

        {/* Nib assembly */}
        {/* Nib base (steel) */}
        <path d="M624 84 L 680 110 L 624 136 Q 617 125, 617 110 Q 617 95, 624 84 Z" fill="url(#nibSteel)" />
        {/* Nib edge (luminous) */}
        <path d="M636 94 L 708 110 L 636 126" fill="url(#nibEdge)" />
        {/* Nib slit (tines) */}
        <line x1="655" y1="98" x2="655" y2="122" stroke="rgba(20,24,28,0.6)" strokeWidth="1.6" />
        {/* Breather hole */}
        <circle cx="655" cy="110" r="2.8" fill="rgba(20,24,28,0.55)" />
        {/* Nib outline for definition */}
        <path
          d="M624 84 L 680 110 L 624 136 Q 617 125, 617 110 Q 617 95, 624 84 Z"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.6"
        />

        {/* Fine outlines for premium finish */}
        <rect x="180" y="80" width="360" height="60" rx="30" fill="none" stroke="rgba(255,255,255,0.06)" />
        <rect x="540" y="76" width="28" height="68" rx="12" fill="none" stroke="rgba(255,255,255,0.08)" />
        <rect x="568" y="84" width="56" height="52" rx="20" fill="none" stroke="rgba(255,255,255,0.05)" />
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
            transform: translateX(12px);
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
