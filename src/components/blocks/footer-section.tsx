"use client"

import { MapPin, Phone, Mail, ArrowUp } from "lucide-react"

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#EBE7DF] border-t border-stone-300/70 text-stone-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="inline-block group">
              <span className="text-xl font-bold tracking-[0.18em] text-stone-900 uppercase transition-all duration-200 group-hover:tracking-[0.22em]">
                Hotel Yamuna
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.35em] text-[#8C6A3C] uppercase mt-0.5">
                Comfort & Hospitality
              </span>
            </a>
            <p className="mt-3.5 text-sm text-stone-600 leading-relaxed max-w-xs text-center md:text-left">
              Experience the warmth of genuine hospitality
              amidst the spiritual serenity of Jwalamukhi.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3.5">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              {["Rooms", "Gallery", "Nearby", "About", "Enquire"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-stone-600 transition-colors hover:text-[#8C6A3C]"
                >
                  {item === "About" ? "Location" : item === "Nearby" ? "Nearby Places" : item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3.5">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 items-center md:items-start">
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <MapPin className="size-3.5 text-[#8C6A3C] shrink-0" />
                <span>Near Jwalamukhi Temple, Kangra, HP</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <Phone className="size-3.5 text-[#8C6A3C] shrink-0" />
                <span>+91 94185 69661</span> |
                <span>+91 94183 92661</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <Mail className="size-3.5 text-[#8C6A3C] shrink-0" />
                <span>hotelyamunajwalamukhi08@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Hotel Yamuna. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-medium text-stone-600 transition-colors hover:text-[#8C6A3C] group"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
