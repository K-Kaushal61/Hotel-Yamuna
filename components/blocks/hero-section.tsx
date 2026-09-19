"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hotel_yamuna_hero.webp"
          alt="Hotel Yamuna - Luxury riverside hotel"
          className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out ${
            loaded ? "scale-100" : "scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center backdrop-blur-sm transition-all duration-300">
        <div
          className={`mb-8 flex items-center gap-4 transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/70" />
          <span className="text-xs font-light tracking-[0.6em] text-amber-300/90 uppercase ">
            Welcome to
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/70" />
        </div>

        <h1
          className={`max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Hotel Yamuna
        </h1>

        <div
          className={`my-6 md:my-8 flex items-center gap-3 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
          <svg
            className="size-3 text-amber-400/70"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <rect x="2" y="2" width="8" height="8" rx="1" transform="rotate(45 6 6)" />
          </svg>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        <p
          className={`max-w-2xl text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/80 transition-all duration-1000 delay-[900ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Experience unparalleled luxury on the banks of the Yamuna. Where timeless
          elegance meets warm Indian hospitality — your perfect escape awaits.
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-[1100ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#enquire"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95"
          >
            Book Your Stay
          </a>
          <a
            href="#explore"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
          >
            Explore Rooms
          </a>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1400ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-light tracking-[0.4em] text-white/50 uppercase">
          Scroll
        </span>
        <div className="h-10 w-[1.5px] overflow-hidden rounded-full bg-white/10">
          <div className="h-3 w-full animate-bounce rounded-full bg-amber-400/60" />
        </div>
      </div>
    </section>
  )
}
