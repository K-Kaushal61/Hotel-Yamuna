"use client"

import { MapPin, Phone, Mail, Clock, Navigation, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const nearbyDistances = [
  { name: "Jwalamukhi Temple", distance: "1.7 km", direction: "North" },
  { name: "CTC SSB, Sapri", distance: "1.5 km", direction: "East" },
  { name: "Mata Baglamukhi Temple", distance: "20 km", direction: "South-East" },
  { name: "Jwalamukhi Bus Stand", distance: "1.2 km", direction: "North" },
]

export default function AboutPage() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMapLoaded(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-light tracking-[0.6em] text-amber-400/70 uppercase">
            Find Us
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Location
          </h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <svg className="size-2.5 text-amber-400/60" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="2" width="8" height="8" rx="1" transform="rotate(45 6 6)" />
            </svg>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="mt-6 mx-auto max-w-2xl text-white/50 text-base leading-relaxed">
            Nestled in the sacred town of Jwalamukhi, Kangra District, Himachal Pradesh — Hotel Yamuna offers the perfect blend of accessibility and serenity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div
            className={`lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <iframe
              src="https://maps.google.com/maps?q=Hotel+Yamuna,+Jwalamukhi,+Kangra,+Himachal+Pradesh&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Yamuna Location - Jwalamukhi, Himachal Pradesh"
              className="grayscale-[40%] contrast-[1.1] brightness-[0.85]"
            />
          </div>

          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-1000 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Details</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-amber-400/10 shrink-0">
                    <MapPin className="size-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Address</p>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">
                      Hotel Yamuna, Near Jwalamukhi Temple,<br />
                      Jwalamukhi-Kangra Road, Himachal Pradesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-amber-400/10 shrink-0">
                    <Phone className="size-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Phone</p>
                    <p className="text-xs text-white/50 mt-0.5">+91 94185 69661</p>
                    <p className="text-xs text-white/50 mt-0.5">+91 94183 92661</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-amber-400/10 shrink-0">
                    <Mail className="size-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Email</p>
                    <p className="text-xs text-white/50 mt-0.5">hotelyamunajwalamukhi08@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-amber-400/10 shrink-0">
                    <Clock className="size-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Check-out</p>
                    <p className="text-xs text-white/50 mt-0.5">12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm flex-1">
              <h3 className="text-lg font-semibold text-white mb-4">Distances from Hotel</h3>
              <div className="flex flex-col gap-3">
                {nearbyDistances.map((place) => (
                  <div
                    key={place.name}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="size-3.5 text-amber-400/60" />
                      <span className="text-sm text-white/70">{place.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-1">
                        {place.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/Hotel+Yamuna+Jwalamukhi+Himachal+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-neutral-900 uppercase tracking-wide transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] group"
            >
              Get Directions
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
