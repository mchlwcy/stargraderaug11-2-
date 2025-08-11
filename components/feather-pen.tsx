"use client"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * FeatherPen — Simple yet sharp, Apple-like
 * - Minimal quill silhouette with a crisp shaft (rachis) and subtle barbs.
 * - Black body with delicate highlights; luminous white + #BBDEFB nib.
 * - Left → right tapered light beam and discreet motion streaks.
 * - Gentle float + sweep animations for premium feel without distraction.
 */
export function FeatherPen({ className }: Props) {
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
      {/* Under-glow line beneath the sweep */}
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
          <linearGradient id="quillFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B0B0C" />
            <stop offset="60%" stopColor="#101113" />
            <stop offset="100%" stopColor="#0D0E10" />
          </linearGradient>
          <linearGradient id="quillHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
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
          <circle cx="720" cy="110" r="30" fill="url(#tipGlow)" opacity="0.95" />
          <circle cx="720" cy="110" r="70" fill="url(#tipGlow)" opacity="0.35" />
          <circle cx="720" cy="110" r="110" fill="url(#tipGlow)" opacity="0.18" />
        </g>

        {/* Beam / slash (left → right), tapered to right */}
        <g className="animate-[beam-pulse_3.2s_ease-in-out_infinite]">
          <polygon points="720,100 1000,110 720,120" fill="url(#beamGrad)" filter="url(#beamBlur)" opacity="0.9" />
          <polygon points="720,92 1040,110 720,128" fill="url(#beamGrad)" filter="url(#beamBlur)" opacity="0.5" />
        </g>

        {/* Motion streaks near the beam */}
        <g opacity="0.75" className="animate-[streaks_2.8s_ease-in-out_infinite]">
          <rect x="790" y="118" width="2" height="34" rx="1" fill="rgba(187,222,251,0.55)" />
          <rect x="860" y="112" width="2" height="40" rx="1" fill="rgba(255,255,255,0.45)" />
          <rect x="920" y="116" width="1.6" height="30" rx="0.8" fill="rgba(187,222,251,0.45)" />
          <rect x="970" y="114" width="1.6" height="26" rx="0.8" fill="rgba(255,255,255,0.4)" />
        </g>

        {/* Feather (quill) — simple yet sharp silhouette */}
        {/* Main vane shape */}
        <path
          d="M180 60 C 130 40, 90 40, 60 80 C 40 110, 54 150, 92 172 C 130 194, 170 184, 210 150 C 260 108, 330 96, 410 100 C 450 102, 490 108, 520 116"
          fill="url(#quillFill)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          filter="url(#softGlow)"
        />
        {/* Rachis (shaft) */}
        <path
          d="M120 86 C 156 78, 200 86, 248 110 C 296 134, 338 146, 388 148 C 450 150, 560 138, 640 120"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Minimal barbs (subtle) */}
        <path d="M150 76 L 128 62" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M178 70 L 160 56" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M210 70 L 198 54" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M238 84 L 230 66" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M268 98 L 264 80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M300 110 L 300 92" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M330 118 L 334 100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
        <path d="M360 124 L 368 108" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />

        {/* Handle / lower shaft (subtle thickening before nib) */}
        <rect x="560" y="94" width="110" height="32" rx="16" fill="url(#quillFill)" />
        <rect x="560" y="96" width="110" height="10" rx="5" fill="url(#quillHighlight)" />

        {/* Nib (sharp, minimal) at right */}
        {/* Taper base to tip */}
        <polygon points="670,94 720,110 670,126" fill="#0E0E10" />
        {/* Luminous cutting edge */}
        <polygon points="680,100 718,110 680,120" fill="url(#nibEdge)" />
        {/* Subtle outline for definition */}
        <polygon points="670,94 720,110 670,126" fill="none" stroke="rgba(255,255,255,0.06)" />
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
