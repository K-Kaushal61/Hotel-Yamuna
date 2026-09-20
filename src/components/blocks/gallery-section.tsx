"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Film,
  Sparkles,
} from "lucide-react"

export type MediaItem = {
  id: string
  type: "image" | "video"
  title: string
  category: "hotel" | "rooms" | "views" | "videos"
  tag: string
  src: string
  thumbnail?: string
  description: string
}

const galleryMedia: MediaItem[] = [
  {
    id: "outer-video-tour",
    type: "video",
    title: "Outdoor & Property Video Tour",
    category: "videos",
    tag: "Video Tour",
    src: "/outer-video.MOV",
    thumbnail: "/hotel-cover.jpeg",
    description: "Live outdoor walkthrough showcasing Hotel Yamuna's architecture, serene hill surroundings, and premises.",
  },
  {
    id: "hotel-cover",
    type: "image",
    title: "Hotel Yamuna Exterior",
    category: "hotel",
    tag: "Exterior",
    src: "/hotel-cover.jpeg",
    description: "Grand exterior view of Hotel Yamuna with its distinctive curved architecture nestled in the Kangra hills.",
  },
  {
    id: "gallery-view",
    type: "image",
    title: "Scenic Hill & Valley View",
    category: "views",
    tag: "Scenic View",
    src: "/gallery-view.jpeg",
    description: "Breathtaking panoramic view of the lush Kangra mountains and serene landscape from our guest rooms.",
  },
  {
    id: "reception",
    type: "image",
    title: "Welcoming Reception & Lobby",
    category: "hotel",
    tag: "Lobby",
    src: "/reception.jpeg",
    description: "Our dedicated 24/7 front desk ready to assist pilgrims and travellers with warm Himachali hospitality.",
  },
  {
    id: "standard-doublebed",
    type: "image",
    title: "Standard Double Bed Room",
    category: "rooms",
    tag: "Standard",
    src: "/standard-doublebed.jpeg",
    description: "Clean, comfortable room with fresh linens, flat-screen TV, and scenic window views.",
  },
  {
    id: "parking",
    type: "image",
    title: "Spacious Private Parking",
    category: "hotel",
    tag: "Facilities",
    src: "/parking.jpeg",
    description: "Ample, secure on-premises parking space for all guest cars, vans, and pilgrim tour coaches.",
  },
  {
    id: "deluxe-doublebed",
    type: "image",
    title: "Deluxe Double Bed Room",
    category: "rooms",
    tag: "Deluxe",
    src: "/deluxe-doublebed.jpeg",
    description: "Tastefully appointed deluxe room featuring premium wood furnishings and ambient hill views.",
  },
  {
    id: "standard-washroom",
    type: "image",
    title: "Standard Attached Washroom",
    category: "rooms",
    tag: "Amenities",
    src: "/standard-washroom.jpeg",
    description: "Sparkling clean attached washroom with modern tiles, 24/7 hot water, and fresh towels.",
  },
  {
    id: "deluxe-washroom",
    type: "image",
    title: "Deluxe Washroom & Bath",
    category: "rooms",
    tag: "Amenities",
    src: "/deluxe-washroom.jpeg",
    description: "Modern attached bathroom with premium fixtures, hot water, and complimentary toiletries.",
  },
  {
    id: "hero-view",
    type: "image",
    title: "Serene Surrounding Landscape",
    category: "views",
    tag: "Surroundings",
    src: "/hotel_yamuna_hero.webp",
    description: "Picturesque riverside valley atmosphere near the holy shrine of Goddess Jwalamukhi.",
  },
]

const filterTabs = [
  { label: "All Media", category: "all" },
  { label: "Featured Videos", category: "videos" },
  { label: "Hotel & Premises", category: "hotel" },
  { label: "Rooms & Suites", category: "rooms" },
  { label: "Scenic Views", category: "views" },
]

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const featuredVideoRef = useRef<HTMLVideoElement>(null)
  const [isFeaturedMuted, setIsFeaturedMuted] = useState(true)
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(true)

  useEffect(() => {
    const video = featuredVideoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            video.muted = true
            video.play().catch(() => {})
          })
          setIsFeaturedPlaying(true)
        } else {
          video.pause()
          setIsFeaturedPlaying(false)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleFeaturedSound = () => {
    if (featuredVideoRef.current) {
      const nextMuted = !featuredVideoRef.current.muted
      featuredVideoRef.current.muted = nextMuted
      setIsFeaturedMuted(nextMuted)
    }
  }

  const toggleFeaturedPlay = () => {
    if (featuredVideoRef.current) {
      if (featuredVideoRef.current.paused) {
        featuredVideoRef.current.play()
        setIsFeaturedPlaying(true)
      } else {
        featuredVideoRef.current.pause()
        setIsFeaturedPlaying(false)
      }
    }
  }

  const openFeaturedInLightbox = () => {
    const videoIdx = filteredMedia.findIndex((m) => m.id === "outer-video-tour")
    if (videoIdx !== -1) {
      setLightboxIndex(videoIdx)
    } else {
      const allIdx = galleryMedia.findIndex((m) => m.id === "outer-video-tour")
      if (allIdx !== -1) {
        setActiveTab("all")
        setLightboxIndex(allIdx)
      }
    }
  }

  const filteredMedia =
    activeTab === "all"
      ? galleryMedia
      : activeTab === "videos"
      ? galleryMedia.filter((m) => m.type === "video" || m.category === "videos")
      : galleryMedia.filter((m) => m.category === activeTab)

  const activeItem = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredMedia.length)
  }, [lightboxIndex, filteredMedia.length])

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      (prev) => ((prev ?? 0) - 1 + filteredMedia.length) % filteredMedia.length
    )
  }, [lightboxIndex, filteredMedia.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, handleNext, handlePrev])

  return (
    <section
      id="gallery"
      className="relative bg-[#F4F0E8] py-20 md:py-28 overflow-hidden border-t border-stone-200/60"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C6A3C]/10 border border-[#8C6A3C]/20 mb-3">
            <Camera className="size-3 text-[#8C6A3C]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C6A3C] uppercase">
              Visual Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Photo & Video Gallery
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-[#8C6A3C]/40 rounded-full" />
          <p className="mt-4 mx-auto max-w-2xl text-stone-600 text-base leading-relaxed">
            Take a visual tour of Hotel Yamuna — featuring our scenic outer views,
            comfortable rooms, peaceful surroundings, and spacious premises.
          </p>
        </div>

        <div className="mb-16 max-w-5xl mx-auto rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8C6A3C]/10 border border-[#8C6A3C]/20 px-3.5 py-1 text-xs font-semibold text-[#8C6A3C] w-fit mb-3">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-red-500" />
                </span>
                Live Property Reel
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Scenic Outer View & Grounds Walkthrough
              </h3>

              <p className="mt-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
                Take a quick vertical video reel tour around Hotel Yamuna. Discover the
                serene Himalayan foothills, lush green mountain views, open airy balconies,
                and spacious guest parking.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-200/80 px-3.5 py-2.5">
                  <div className="size-2 rounded-full bg-[#8C6A3C]" />
                  <span className="text-xs font-semibold text-stone-800">Peaceful Mountain Vistas</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-200/80 px-3.5 py-2.5">
                  <div className="size-2 rounded-full bg-[#8C6A3C]" />
                  <span className="text-xs font-semibold text-stone-800">Free Spacious Parking</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-200/80 px-3.5 py-2.5">
                  <div className="size-2 rounded-full bg-[#8C6A3C]" />
                  <span className="text-xs font-semibold text-stone-800">1.7 km to Jwalamukhi Shrine</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-200/80 px-3.5 py-2.5">
                  <div className="size-2 rounded-full bg-[#8C6A3C]" />
                  <span className="text-xs font-semibold text-stone-800">Standard & Deluxe AC Rooms</span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8C6A3C] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#785930] shadow-xs"
                >
                  Book Your Stay
                </a>
                <button
                  onClick={openFeaturedInLightbox}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-all duration-200 hover:bg-stone-50"
                >
                  <Maximize2 className="size-4 text-stone-500" />
                  Expand Full Screen
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] overflow-hidden rounded-[36px] border-[5px] border-stone-900 bg-stone-950 shadow-2xl group/reel">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-stone-900 rounded-full z-20 flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-stone-800" />
                </div>

                <video
                  ref={featuredVideoRef}
                  preload="metadata"
                  muted={isFeaturedMuted}
                  loop
                  playsInline
                  poster="/hotel-cover.jpeg"
                  className="h-full w-full object-cover transform-gpu"
                >
                  <source src="/outer-video.MOV" type="video/mp4" />
                  <source src="/outer-video.MOV" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                <div className="absolute top-7 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-white text-[11px] font-semibold border border-white/10">
                    <Film className="size-3 text-[#E5C158]" />
                    <span>Reel Tour</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleFeaturedSound}
                      className="flex size-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition-colors"
                      aria-label={isFeaturedMuted ? "Unmute video" : "Mute video"}
                    >
                      {isFeaturedMuted ? (
                        <VolumeX className="size-3.5 text-white/80" />
                      ) : (
                        <Volume2 className="size-3.5 text-[#E5C158]" />
                      )}
                    </button>
                    <button
                      onClick={openFeaturedInLightbox}
                      className="flex size-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition-colors"
                      aria-label="Expand video"
                    >
                      <Maximize2 className="size-3" />
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={toggleFeaturedPlay}
                    className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-xl backdrop-blur-sm opacity-0 group-hover/reel:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-[#8C6A3C] hover:text-white"
                    aria-label={isFeaturedPlaying ? "Pause video" : "Play video"}
                  >
                    {isFeaturedPlaying ? (
                      <Pause className="size-5 fill-current" />
                    ) : (
                      <Play className="size-5 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-4 left-3.5 right-3.5 text-white z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src="/hotelyamuna-logo.png"
                      alt="Hotel Yamuna"
                      className="size-7 rounded-full bg-white p-0.5 object-contain shadow-sm"
                    />
                    <div>
                      <p className="text-xs font-bold leading-tight drop-shadow-sm">Hotel Yamuna</p>
                      <p className="text-[10px] text-white/75 drop-shadow-sm">Jwalamukhi, HP</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-white/95 leading-snug drop-shadow-sm">
                    Outer premises & scenic hill view 🌄
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex rounded-full border border-stone-200 bg-white p-1.5 shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.category}
                onClick={() => {
                  setActiveTab(tab.category)
                  setLightboxIndex(null)
                }}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.category
                    ? "bg-stone-900 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => {
            const isVideo = item.type === "video"
            const imageSrc = isVideo ? item.thumbnail || item.src : item.src

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-stone-900/80 backdrop-blur-xs px-3 py-1 text-white shadow-sm">
                    {isVideo ? (
                      <>
                        <Film className="size-3 text-[#E5C158]" />
                        <span className="text-[11px] font-semibold tracking-wide">Video Reel</span>
                      </>
                    ) : (
                      <>
                        <Camera className="size-3 text-[#E5C158]" />
                        <span className="text-[11px] font-semibold tracking-wide">{item.tag}</span>
                      </>
                    )}
                  </div>

                  {isVideo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#8C6A3C] group-hover:text-white">
                        <Play className="size-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3.5 right-3.5 flex size-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-xs text-stone-800 opacity-0 transition-all duration-200 group-hover:opacity-100">
                      <Maximize2 className="size-4" />
                    </div>
                  )}

                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-5 py-3 shadow-xs text-stone-600 text-xs sm:text-sm">
            <Sparkles className="size-4 text-[#8C6A3C] shrink-0" />
            <span>
              Have photos or video memories of your stay? Tag us or share them with us on WhatsApp!
            </span>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous item"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next item"
          >
            <ChevronRight className="size-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl w-full flex flex-col items-center"
          >
            <div className="relative max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl">
              {activeItem.type === "video" ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78vh] max-w-[90vw] aspect-[9/16] object-contain rounded-2xl"
                >
                  <source src={activeItem.src} type="video/mp4" />
                  <source src={activeItem.src} type="video/quicktime" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl"
                />
              )}
            </div>

            <div className="mt-3 text-center text-white">
              <h3 className="text-base sm:text-lg font-bold">{activeItem.title}</h3>
              <p className="text-xs text-stone-300 max-w-xl mx-auto mt-0.5">
                {activeItem.description}
              </p>
              <p className="text-[11px] text-stone-400 mt-1 font-mono">
                {lightboxIndex + 1} of {filteredMedia.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
