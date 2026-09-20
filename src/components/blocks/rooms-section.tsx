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
    name: "Deluxe",
    tagline: "Premium Luxury",
    description:
      "Indulge in our finest rooms with premium furnishings, elegant interiors, AC/Non-AC options, and top-tier amenities for a rejuvenating stay.",
    coverImage: "/deluxe-doublebed.jpeg",
    washroom: ["/deluxe-washroom.jpeg", "/deluxe-washroom2.jpeg"],
    subCategories: [
      {
        name: "double",
        label: "Double Bed",
        icon: Bed,
        description: "Elegant double bed room with premium furnishings, AC/Non-AC options, and luxurious bath amenities.",
        images: ["/deluxe-doublebed.jpeg", "/deluxe-doublebed2.jpeg"],
        features: ["King Bed", "AC & Non-AC Available", "Premium Bath", "Room Service", "Mountain View"],
      },
      {
        name: "triple",
        label: "Triple Bed",
        icon: Users,
        description: "Spacious deluxe triple room — perfect for families who appreciate extra comfort and fine decor.",
        images: ["/deluxe-triplebed.jpeg"],
        features: ["Three Beds", "AC & Non-AC Available", "Premium Bath", "Room Service"],
      },
      {
        name: "four",
        label: "Four Bed",
        icon: Users,
        description: "Our largest deluxe offering with four beds, ideal for group pilgrimages or family gatherings.",
        images: ["/deluxe-fourbed.jpeg"],
        features: ["Four Beds", "AC & Non-AC Available", "Premium Bath", "Room Service"],
      },
    ],
  },
  {
    name: "Standard",
    tagline: "Elevated Comfort",
    description:
      "Step up to modern amenities with AC and Non-AC options, flat-screen TV, Wi-Fi, and scenic hill views — ideal for families, couples, and pilgrims.",
    coverImage: "/standard-doublebed.jpeg",
    washroom: ["/standard-washroom.jpeg"],
    subCategories: [
      {
        name: "double",
        label: "Double Bed",
        icon: Bed,
        description: "Comfortable double bed room with AC/Non-AC options, scenic hill view, flat-screen TV, and clean attached bathroom.",
        images: ["/standard-doublebed.jpeg", "/gallery-view.jpeg"],
        features: ["Double Bed", "AC & Non-AC Available", "Scenic Hill View", "Flat-Screen TV", "Attached Bath", "Room Service"],
      },
      {
        name: "triple",
        label: "Triple Bed",
        icon: Users,
        description: "Standard triple bed room with modern amenities, AC/Non-AC choice, and comfortable spacing for group stays.",
        images: ["/standard-doublebed.jpeg", "/gallery-view.jpeg"],
        features: ["Three Beds", "AC & Non-AC Available", "Flat-Screen TV", "Wi-Fi", "Attached Bath", "Room Service"],
      },
      {
        name: "four",
        label: "Four Bed",
        icon: Users,
        description: "Spacious four-bed standard room with modern amenities — great for families and pilgrim groups.",
        images: ["/standard-doublebed.jpeg", "/gallery-view.jpeg"],
        features: ["Four Beds", "AC & Non-AC Available", "Flat-Screen TV", "Wi-Fi", "Attached Bath", "Room Service"],
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
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-full bg-white/90 border border-stone-200 text-stone-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-full bg-white/90 border border-stone-200 text-stone-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 shadow-md"
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
                  ? "w-6 bg-white shadow-sm"
                  : "w-1.5 bg-white/60 hover:bg-white/90"
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
    <section id="rooms" className="relative bg-[#FAF8F5] py-20 md:py-28 overflow-hidden border-t border-stone-200/60">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#8C6A3C] uppercase">
            Accommodation
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Our Rooms
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-[#8C6A3C]/40 rounded-full" />
          <p className="mt-4 mx-auto max-w-xl text-stone-600 text-base leading-relaxed">
            Choose from our thoughtfully designed rooms, offering the right balance
            of comfort, cleanliness, and value for every traveller.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-stone-200 bg-stone-100/90 p-1.5 shadow-xs">
            {roomCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`relative px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeCategory === i
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6A3C] uppercase mb-1.5">
            {category.tagline}
          </p>
          <p className="mx-auto max-w-2xl text-stone-600 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="lg:w-3/5">
            <div className="h-72 sm:h-80 md:h-96 lg:h-[480px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
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
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 border ${
                    activeSubCategory === i && !showWashroom
                      ? "border-[#8C6A3C] bg-[#8C6A3C] text-white shadow-xs"
                      : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <sub.icon className="size-4" />
                  {sub.label}
                </button>
              ))}
              {category.washroom.length > 0 && (
                <button
                  onClick={() => setShowWashroom(true)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 border ${
                    showWashroom
                      ? "border-[#8C6A3C] bg-[#8C6A3C] text-white shadow-xs"
                      : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <Bath className="size-4" />
                  Washroom
                </button>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center lg:items-start w-full">
              {showWashroom ? (
                <div className="w-full flex flex-col items-center lg:items-start">
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-2">
                    {category.name} Washroom
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-md">
                    All {category.name.toLowerCase()} rooms feature clean, modern
                    attached washrooms with hot water, fresh towels, and quality
                    toiletries for a refreshing stay.
                  </p>
                </div>
              ) : (
                <div
                  key={`${activeCategory}-${activeSubCategory}`}
                  className="w-full flex flex-col items-center lg:items-start"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-1">
                    {category.name} — {subCat.label}
                  </h3>
                  <p className="text-xs font-medium tracking-[0.2em] text-stone-500 uppercase mb-3">
                    {category.tagline}
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-md">
                    {subCat.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                    {subCat.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3.5 py-1.5 text-xs font-medium text-stone-700"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8C6A3C] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#785930] hover:gap-3 group shadow-xs"
                >
                  Book {category.name} Room
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-12 rounded-full bg-[#8C6A3C]/10 border border-[#8C6A3C]/20">
              <Car className="size-5 text-[#8C6A3C]" />
            </div>
            <div>
              <h4 className="text-stone-900 font-semibold text-base md:text-lg">
                Ample Parking Available
              </h4>
              <p className="text-stone-600 text-sm">
                Free, secure parking for all our guests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
