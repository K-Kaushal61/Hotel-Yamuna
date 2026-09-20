"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"

const leftLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Gallery", href: "#gallery" },
]

const rightLinks = [
  { label: "Nearby", href: "#nearby" },
  { label: "Location", href: "#about" },
]

export default function HeaderBlock() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-[background-color,border-color,box-shadow] duration-200 ease-out ${
        scrolled
          ? "bg-white border-b border-stone-200/80 shadow-xs"
          : "bg-gradient-to-b from-black/60 via-black/25 to-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <nav className="hidden md:flex items-center justify-end gap-6 flex-1">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group ${
                scrolled
                  ? "text-stone-700 hover:text-stone-900"
                  : "text-white/95 hover:text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-[width] duration-300 group-hover:w-3/4 ${
                  scrolled ? "bg-[#8C6A3C]" : "bg-white"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex md:contents">
          <a
            href="/"
            className="flex items-center justify-center flex-shrink-0 mx-auto md:mx-8 lg:mx-12 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-1/2 max-md:-translate-y-1/2 group"
          >
            <img
              src="hotelyamuna-logo.png"
              alt="Hotel Yamuna Logo"
              className={`w-auto object-contain rounded-full transition-[height] duration-300 ${
                scrolled ? "h-11 md:h-14" : "h-13 md:h-16 shadow-md"
              }`}
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-start gap-6 flex-1">
          {rightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group ${
                scrolled
                  ? "text-stone-700 hover:text-stone-900"
                  : "text-white/95 hover:text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-[width] duration-300 group-hover:w-3/4 ${
                  scrolled ? "bg-[#8C6A3C]" : "bg-white"
                }`}
              />
            </a>
          ))}

          <div className="flex-1" />

          <a
            href="#enquire"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
              scrolled
                ? "bg-[#8C6A3C] text-white hover:bg-[#785930] shadow-xs"
                : "bg-white/20 text-white border border-white/40 backdrop-blur-xs hover:bg-white hover:text-stone-900 hover:border-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]"
            }`}
          >
            <Phone className="size-3.5" />
            Enquire Now
          </a>
        </nav>

        <div className="ml-auto md:hidden flex items-center">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-stone-800 hover:bg-stone-100" : "text-white hover:bg-white/20"}
                />
              }
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full sm:max-w-xs bg-white border-stone-200 p-6 flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <SheetTitle className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
                  Hotel Yamuna
                </SheetTitle>
                <SheetClose
                  render={
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    />
                  }
                >
                  <X className="size-5" />
                </SheetClose>
              </div>

              <nav className="flex flex-col items-center justify-center my-auto divide-y divide-stone-100 w-full py-6">
                {[...leftLinks, ...rightLinks].map((link) => (
                  <div key={link.label} className="w-full text-center py-4 first:pt-0 last:pb-0">
                    <SheetClose
                      render={<a href={link.href} />}
                      nativeButton={false}
                      className="block text-base font-medium tracking-wide text-stone-800 transition-colors hover:text-[#8C6A3C]"
                    >
                      {link.label}
                    </SheetClose>
                  </div>
                ))}
              </nav>

              <div className="pt-4 border-t border-stone-200">
                <SheetClose
                  render={<a href="#enquire" />}
                  nativeButton={false}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8C6A3C] text-white px-5 py-3 text-sm font-semibold transition-all duration-200 hover:bg-[#785930] active:scale-95 text-center"
                >
                  <Phone className="size-4" />
                  Enquire Now
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
