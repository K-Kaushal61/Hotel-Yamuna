export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hotel_yamuna_hero.webp"
          alt="Hotel Yamuna - Luxury riverside hotel"
          className="h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/60" />
          <span className="text-xs font-medium tracking-[0.35em] text-white/90 uppercase">
            Welcome to Jwalamukhi
          </span>
          <span className="h-px w-8 bg-white/60" />
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)]">
          Hotel Yamuna
        </h1>

        <div className="my-5 md:my-6 flex items-center justify-center">
          <span className="h-0.5 w-12 rounded-full bg-[#E5C158]" />
        </div>

        <p className="max-w-2xl text-base md:text-lg lg:text-xl font-normal leading-relaxed text-white/90 [text-shadow:_0_1px_6px_rgba(0,0,0,0.6)]">
          Experience comfortable luxury and heartfelt hospitality near the sacred
          Jwalamukhi Temple. Your serene haven in the hills of Himachal Pradesh.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#enquire"
            className="inline-flex items-center justify-center rounded-full bg-[#8C6A3C] px-8 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-all duration-200 hover:bg-[#785930] hover:scale-105 active:scale-95 shadow-md"
          >
            Book Your Stay
          </a>
          <a
            href="#rooms"
            className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/90 px-8 py-3.5 text-sm font-semibold tracking-wide text-stone-900 uppercase transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 shadow-md"
          >
            Explore Rooms
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase">
          Scroll Down
        </span>
        <div className="h-9 w-[1.5px] overflow-hidden rounded-full bg-white/30">
          <div className="h-3 w-full animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}
