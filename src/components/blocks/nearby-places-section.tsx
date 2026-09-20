"use client"

import { MapPin, Clock, ArrowRight } from "lucide-react"

const places = [
  {
    name: "Jwalamukhi Temple",
    distance: "1.7 km",
    driveTime: "~5 min",
    image: "/jwalamukhi_temple.JPG",
    description:
      "One of the 51 Shakti Peethas, Jwalamukhi Temple is famed for its eternal natural flames that burn without any fuel source. Dedicated to Goddess Jwalamukhi, this ancient temple attracts lakhs of devotees annually. The golden dome was gifted by Mughal Emperor Akbar, and the temple is set amidst the verdant Kangra hills — a deeply spiritual and awe-inspiring destination.",
  },
  {
    name: "Mata Baglamukhi Temple",
    distance: "20 km",
    driveTime: "~40 min",
    image: "/mata_baglamukhi.jpg",
    description:
      "Perched in the serene hills of Kangra, Mata Baglamukhi Temple is one of the ten Mahavidya temples in India. The striking yellow-coloured temple is dedicated to Goddess Baglamukhi, believed to grant victory over enemies and obstacles. Surrounded by lush greenery and breathtaking Himalayan views, it's a must-visit pilgrimage for devotees and architecture enthusiasts alike.",
  },
  {
    name: "CTC SSB, Sapri",
    distance: "1.5 km",
    driveTime: "~4 min",
    image: "/ctc_ssb_sapri.webp",
    description:
      "The Central Training College (CTC) of the Sashastra Seema Bal (SSB) at Sapri is a premier paramilitary training facility nestled in the mountains of Himachal Pradesh. Our hotel is the ideal accommodation choice for visiting officers, trainees' families, and official delegations — offering proximity, comfort, and convenience just minutes from the campus gate.",
  },
]

function PlaceCard({ place }: { place: (typeof places)[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs hover:shadow-md">
      <div className="relative h-60 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-stone-900/85 backdrop-blur-xs px-3 py-1 text-white shadow-sm">
          <MapPin className="size-3 text-[#E5C158]" />
          <span className="text-xs font-semibold tracking-wide">{place.distance}</span>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {place.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-white/80">
            <Clock className="size-3 text-[#E5C158]" />
            <span className="text-xs font-medium">{place.driveTime} drive from hotel</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-4">
          {place.description}
        </p>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(place.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8C6A3C] transition-all duration-200 hover:text-[#785930] hover:gap-3 group/link"
        >
          View on Google Maps
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

export default function NearbyPlacesSection() {
  return (
    <section id="nearby" className="relative bg-[#F4F0E8] py-20 md:py-28 overflow-hidden border-t border-stone-200/60">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#8C6A3C] uppercase">
            Explore
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Nearby Attractions
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-[#8C6A3C]/40 rounded-full" />
          <p className="mt-4 mx-auto max-w-2xl text-stone-600 text-base leading-relaxed">
            Strategically located near sacred temples and key landmarks, Hotel Yamuna is your perfect base to explore the spiritual and cultural heart of Himachal Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.name} place={place} />
          ))}
        </div>
      </div>
    </section>
  )
}
