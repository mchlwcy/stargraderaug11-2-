import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            {"© "} {new Date().getFullYear()} {"StarGrader. All rights reserved."}
          </p>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:text-white" href="/">
              {"Home"}
            </Link>
            <Link className="hover:text-white" href="/members">
              {"Members"}
            </Link>
            <Link className="hover:text-white" href="/pricing">
              {"Pricing"}
            </Link>
            <Link className="hover:text-white" href="/testimonials">
              {"Testimonials"}
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-xs text-neutral-400">{"Built for 5**."}</div>
      </div>
    </footer>
  )
}
