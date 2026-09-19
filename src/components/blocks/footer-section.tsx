"use client"

import { MapPin, Phone, Mail, ArrowUp } from "lucide-react"

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-neutral-950 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="inline-block group">
              <span className="text-xl font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 group-hover:tracking-[0.25em]">
                Hotel Yamuna
              </span>
              <span className="block text-[9px] font-light tracking-[0.5em] text-amber-300/60 uppercase mt-0.5">
                Luxury & Comfort
              </span>
            </a>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs text-center md:text-left">
              Experience the warmth of hospitality
              amidst the spiritual serenity of Jwalamukhi.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-white/80 tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5 items-center md:items-start">
              {["Rooms", "Nearby Places", "Location", "Enquire"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-white/40 transition-colors hover:text-amber-400/80"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-white/80 tracking-wider uppercase mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <MapPin className="size-3.5 text-amber-400/50 shrink-0" />
                <span>Near Jwalamukhi Temple, Kangra, HP</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <Phone className="size-3.5 text-amber-400/50 shrink-0" />
                <span>+91 94185 69661</span> |
                <span>+91 94183 92661</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <Mail className="size-3.5 text-amber-400/50 shrink-0" />
                <span>hotelyamunajwalamukhi08@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Hotel Yamuna. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/30 transition-colors hover:text-amber-400/70 group"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
