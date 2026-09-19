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
  { label: "Nearby", href: "#nearby" },
]

const rightLinks = [
  { label: "Location", href: "#about" },
  { label: "Contact", href: "#enquire" },
]

export default function HeaderBlock() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <nav className="hidden md:flex items-center justify-end gap-6 flex-1">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-2 py-2 text-sm font-medium tracking-wide text-white/80 transition-all duration-300 hover:text-white group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-3/4" />
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
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-11 md:h-14" : "h-13 md:h-16"
              }`}
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-start gap-6 flex-1">
          {rightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-2 py-2 text-sm font-medium tracking-wide text-white/80 transition-all duration-300 hover:text-white group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}

          <div className="flex-1" />

          <a
            href="#enquire"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-400/10 px-5 py-2.5 text-sm font-semibold text-amber-300 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:scale-105 active:scale-95"
          >
            <Phone className="size-3.5" />
            Enquire Now
          </a>
        </nav>

        <div className="ml-auto md:hidden flex items-center">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" />
              }
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full sm:max-w-xs bg-neutral-950/95 backdrop-blur-2xl border-white/10 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <SheetTitle className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-medium">
                  Menu
                </SheetTitle>
                <SheetClose
                  render={
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    />
                  }
                >
                  <X className="size-5" />
                </SheetClose>
              </div>

              <nav className="flex flex-col items-center justify-center my-auto divide-y divide-white/10 w-full py-6">
                {[...leftLinks, ...rightLinks].map((link) => (
                  <div key={link.label} className="w-full text-center py-4 first:pt-0 last:pb-0">
                    <SheetClose
                      render={<a href={link.href} />}
                      nativeButton={false}
                      className="block text-base font-medium tracking-wider text-white/80 transition-colors hover:text-amber-300"
                    >
                      {link.label}
                    </SheetClose>
                  </div>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <SheetClose
                  render={<a href="#enquire" />}
                  nativeButton={false}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-amber-400/60 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 transition-all duration-300 hover:bg-amber-400/20 active:scale-95 text-center"
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
