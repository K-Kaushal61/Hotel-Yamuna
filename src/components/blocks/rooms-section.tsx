"use client"

import { Car, ChevronLeft, ChevronRight, ArrowRight, Bed, Bath, Users } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"

type SubCategory = {
  name: string
  label: string
  icon: React.ElementType
  description: string
  images: string[]
  features: string[]
}

type RoomCategory = {
  name: string
  tagline: string
  description: string
  coverImage: string
  washroom: string[]
  subCategories: SubCategory[]
}

const roomCategories: RoomCategory[] = [
  {
    name: "Ordinary",
    tagline: "Comfort Essentials",
    description:
      "Clean and comfortable rooms with all the essentials for a restful stay. Perfect for budget-conscious travellers and pilgrims.",
    coverImage: "/room-ordinary.jpg",
    washroom: [],
    subCategories: [
      {
        name: "double",
        label: "Double Bed",
        icon: Bed,
        description: "Cosy double bed room with fresh linens, ceiling fan, TV, and attached bathroom.",
        images: ["/room-ordinary.jpg"],
        features: ["Double Bed", "Ceiling Fan", "TV", "Attached Bathroom", "Hot Water"],
      },
      {
        name: "triple",
        label: "Triple Bed",
        icon: Users,
        description: "Spacious room with three beds — ideal for small groups or families on a budget.",
        images: ["/room-ordinary.jpg"],
        features: ["Three Beds", "Ceiling Fan", "TV", "Attached Bathroom", "Hot Water"],
      },
      {
        name: "four",
        label: "Four Bed",
        icon: Users,
        description: "Our largest ordinary room, accommodating four guests comfortably.",
        images: ["/room-ordinary.jpg"],
        features: ["Four Beds", "Ceiling Fan", "TV", "Attached Bathroom", "Hot Water"],
      },
    ],
  },
  {
    name: "Standard",
    tagline: "Elevated Comfort",
    description:
      "Step up to modern amenities with air conditioning, flat-screen TV, Wi-Fi, and premium furnishings — ideal for families and couples.",
    coverImage: "/room-standard.jpg",
    washroom: [],
    subCategories: [
      {
        name: "double",
        label: "Double Bed",
        icon: Bed,
        description: "Comfortable queen-sized bed with AC, flat-screen TV, and modern decor.",
        images: ["/room-standard.jpg"],
        features: ["Queen Bed", "Air Conditioning", "Flat-Screen TV", "Wi-Fi", "Room Service"],
      },
      {
        name: "triple",
        label: "Triple Bed",
        icon: Users,
        description: "Standard triple bed room with all modern amenities for group stays.",
        images: ["/room-standard.jpg"],
        features: ["Three Beds", "Air Conditioning", "Flat-Screen TV", "Wi-Fi", "Room Service"],
      },
      {
        name: "four",
        label: "Four Bed",
        icon: Users,
        description: "Spacious four-bed standard room — great for families and larger groups.",
        images: ["/room-standard.jpg"],
        features: ["Four Beds", "Air Conditioning", "Flat-Screen TV", "Wi-Fi", "Room Service"],
      },
    ],
  },
  {
    name: "Deluxe",
    tagline: "Premium Luxury",
    description:
      "Indulge in our finest rooms with premium furnishings, elegant interiors, and top-tier amenities for the most discerning guests.",
    coverImage: "/deluxe-doublebed.jpeg",
    washroom: ["/deluxe-washroom.jpeg", "/deluxe-washroom2.jpeg"],
    subCategories: [
      {
        name: "double",
        label: "Double Bed",
        icon: Bed,
        description: "Elegant double bed room with premium furnishings and luxurious bath amenities.",
        images: ["/deluxe-doublebed.jpeg", "/deluxe-doublebed2.jpeg"],
        features: ["King Bed", "Premium Bath", "Mini Bar", "Room Service", "Mountain View"],
      },
      {
        name: "triple",
        label: "Triple Bed",
        icon: Users,
        description: "Spacious deluxe triple room — perfect for families who don't compromise on luxury.",
        images: ["/deluxe-triplebed.jpeg"],
        features: ["Three Beds", "Premium Bath", "Mini Bar", "Room Service", "Lounge Area"],
      },
      {
        name: "four",
        label: "Four Bed",
        icon: Users,
        description: "Our largest deluxe offering with four beds, ideal for group pilgrimages or family gatherings.",
        images: ["/deluxe-fourbed.jpeg"],
        features: ["Four Beds", "Premium Bath", "Mini Bar", "Room Service", "Lounge Area"],
      },
    ],
  },
]

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [total, next])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group/carousel">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} - Photo ${i + 1}`}
            className="h-full w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-amber-400"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function RoomsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeSubCategory, setActiveSubCategory] = useState(0)
  const [showWashroom, setShowWashroom] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (headingRef.current) observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setActiveSubCategory(0)
    setShowWashroom(false)
  }, [activeCategory])

  const category = roomCategories[activeCategory]
  const subCat = category.subCategories[activeSubCategory]
  const displayImages = showWashroom
    ? category.washroom
    : subCat.images

  return (
    <section id="rooms" className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-light tracking-[0.6em] text-amber-400/70 uppercase">
            Accommodation
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Rooms
          </h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <svg className="size-2.5 text-amber-400/60" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="2" width="8" height="8" rx="1" transform="rotate(45 6 6)" />
            </svg>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="mt-6 mx-auto max-w-xl text-white/50 text-base leading-relaxed">
            Choose from our thoughtfully designed rooms, each offering a unique
            blend of comfort and elegance for every traveller.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">
            {roomCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`relative px-6 md:px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === i
                    ? "bg-amber-400 text-neutral-900 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] text-amber-400/60 uppercase mb-2">
            {category.tagline}
          </p>
          <p className="mx-auto max-w-2xl text-white/45 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="lg:w-3/5">
            <div className="h-72 sm:h-80 md:h-96 lg:h-[480px] rounded-2xl overflow-hidden border border-white/[0.06]">
              <ImageCarousel
                key={`${activeCategory}-${activeSubCategory}-${showWashroom}`}
                images={displayImages.length > 0 ? displayImages : [category.coverImage]}
                alt={showWashroom ? `${category.name} Washroom` : `${category.name} ${subCat.label}`}
              />
            </div>
          </div>

          <div className="lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex gap-2 mb-6 flex-wrap justify-center lg:justify-start">
              {category.subCategories.map((sub, i) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setActiveSubCategory(i)
                    setShowWashroom(false)
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 border ${
                    activeSubCategory === i && !showWashroom
                      ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                      : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  <sub.icon className="size-4" />
                  {sub.label}
                </button>
              ))}
              {category.washroom.length > 0 && (
                <button
                  onClick={() => setShowWashroom(true)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 border ${
                    showWashroom
                      ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                      : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  <Bath className="size-4" />
                  Washroom
                </button>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center lg:items-start w-full">
              {showWashroom ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col items-center lg:items-start">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                    {category.name} Washroom
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                    All {category.name.toLowerCase()} rooms feature clean, modern
                    attached washrooms with hot water, fresh towels, and quality
                    toiletries for a refreshing stay.
                  </p>
                </div>
              ) : (
                <div
                  key={`${activeCategory}-${activeSubCategory}`}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col items-center lg:items-start"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                    {category.name} — {subCat.label}
                  </h3>
                  <p className="text-xs tracking-[0.3em] text-amber-400/50 uppercase mb-4">
                    {category.tagline}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                    {subCat.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                    {subCat.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/60"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto w-full flex justify-center lg:justify-start">
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-6 py-3 text-sm font-semibold text-amber-300 transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/60 hover:gap-3 group"
                >
                  Book {category.name} Room
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-12 rounded-full bg-amber-400/10 border border-amber-400/20">
              <Car className="size-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">
                Ample Parking Available
              </h4>
              <p className="text-white/50 text-sm">
                Free, spacious parking for all our guests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
