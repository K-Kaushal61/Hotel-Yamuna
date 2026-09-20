"use client"

import { MapPin, Phone, Mail, Clock, Navigation, ArrowRight } from "lucide-react"
import { useState } from "react"

const nearbyDistances = [
  { name: "Jwalamukhi Temple", distance: "1.7 km", direction: "North" },
  { name: "CTC SSB, Sapri", distance: "1.5 km", direction: "East" },
  { name: "Mata Baglamukhi Temple", distance: "20 km", direction: "South-East" },
  { name: "Jwalamukhi Bus Stand", distance: "1.2 km", direction: "North" },
]

export default function AboutPage() {
  const [mapInteractive, setMapInteractive] = useState(false)

  return (
    <section id="about" className="relative bg-[#FAF8F5] py-20 md:py-28 overflow-hidden border-t border-stone-200/60">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#8C6A3C] uppercase">
            Find Us
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Our Location
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-[#8C6A3C]/40 rounded-full" />
          <p className="mt-4 mx-auto max-w-2xl text-stone-600 text-base leading-relaxed">
            Nestled in the sacred town of Jwalamukhi, Kangra District, Himachal Pradesh — Hotel Yamuna offers the perfect blend of accessibility and serenity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div
            className="relative lg:col-span-3 rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100"
            onMouseLeave={() => setMapInteractive(false)}
          >
            <iframe
              src="https://maps.google.com/maps?q=Hotel+Yamuna,+Jwalamukhi,+Kangra,+Himachal+Pradesh&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "440px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Yamuna Location - Jwalamukhi, Himachal Pradesh"
              className={`w-full h-full min-h-[440px] ${
                mapInteractive ? "pointer-events-auto" : "pointer-events-none"
              }`}
            />
            {!mapInteractive && (
              <button
                type="button"
                onClick={() => setMapInteractive(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/15 transition-colors cursor-pointer"
                aria-label="Click to interact with map"
              >
                <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-stone-800 shadow-md">
                  Click to interact with map
                </span>
              </button>
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-4">Contact Details</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-[#8C6A3C]/10 shrink-0">
                    <MapPin className="size-4 text-[#8C6A3C]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Address</p>
                    <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                      Hotel Yamuna, Near Jwalamukhi Temple,<br />
                      Jwalamukhi-Kangra Road, Himachal Pradesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-[#8C6A3C]/10 shrink-0">
                    <Phone className="size-4 text-[#8C6A3C]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Phone</p>
                    <p className="text-xs text-stone-600 mt-0.5">+91 94185 69661</p>
                    <p className="text-xs text-stone-600 mt-0.5">+91 94183 92661</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-[#8C6A3C]/10 shrink-0">
                    <Mail className="size-4 text-[#8C6A3C]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Email</p>
                    <p className="text-xs text-stone-600 mt-0.5">hotelyamunajwalamukhi08@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center size-8 rounded-lg bg-[#8C6A3C]/10 shrink-0">
                    <Clock className="size-4 text-[#8C6A3C]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Check-out</p>
                    <p className="text-xs text-stone-600 mt-0.5">12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex-1">
              <h3 className="text-base font-bold text-stone-900 mb-4">Distances from Hotel</h3>
              <div className="flex flex-col gap-2.5">
                {nearbyDistances.map((place) => (
                  <div
                    key={place.name}
                    className="flex items-center justify-between rounded-xl bg-stone-50 border border-stone-200/80 px-4 py-2.5 transition-colors hover:bg-stone-100/80"
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="size-3.5 text-[#8C6A3C]" />
                      <span className="text-sm font-medium text-stone-800">{place.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8C6A3C] bg-[#8C6A3C]/10 rounded-full px-2.5 py-0.5">
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
              className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white uppercase tracking-wider transition-all duration-200 hover:bg-stone-800 active:scale-95 shadow-xs group"
            >
              Navigate to Hotel
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
