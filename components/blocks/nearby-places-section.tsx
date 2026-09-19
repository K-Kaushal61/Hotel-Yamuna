"use client"

import { MapPin, Clock, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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

function PlaceCard({ place, index }: { place: (typeof places)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-700 hover:border-amber-400/20 hover:bg-white/[0.04] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-amber-400/90 px-3.5 py-1.5 shadow-lg">
          <MapPin className="size-3.5 text-neutral-900" />
          <span className="text-xs font-bold text-neutral-900">{place.distance}</span>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {place.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-white/60">
            <Clock className="size-3" />
            <span className="text-xs">{place.driveTime} drive from hotel</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-white/55 text-sm leading-relaxed">
          {place.description}
        </p>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(place.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-400/80 transition-all duration-300 hover:text-amber-300 hover:gap-3 group/link"
        >
          View on Maps
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

export default function NearbyPlacesSection() {
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

  return (
    <section id="nearby" className="relative bg-neutral-900 py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/[0.02] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-light tracking-[0.6em] text-amber-400/70 uppercase">
            Explore
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Nearby Attractions
          </h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <svg className="size-2.5 text-amber-400/60" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="2" width="8" height="8" rx="1" transform="rotate(45 6 6)" />
            </svg>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="mt-6 mx-auto max-w-2xl text-white/50 text-base leading-relaxed">
            Strategically located near sacred temples and key landmarks, Hotel Yamuna is your perfect base to explore the spiritual and cultural heart of Himachal Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, i) => (
            <PlaceCard key={place.name} place={place} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
