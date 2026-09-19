"use client"

import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Send,
  MessageCircle,
  CheckCircle,
  Users,
} from "lucide-react"
import { useEffect, useRef, useState, type FormEvent } from "react"

const WHATSAPP_NUMBER = "919418569661"

const WEB3FORMS_KEY = ""

const roomOptions = [
  "Ordinary — Double Bed",
  "Ordinary — Triple Bed",
  "Ordinary — Four Bed",
  "Standard — Double Bed",
  "Standard — Triple Bed",
  "Standard — Four Bed",
  "Deluxe — Double Bed",
  "Deluxe — Triple Bed",
  "Deluxe — Four Bed",
]

export default function EnquireSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    roomType: "",
    guests: "1",
    message: "",
  })

  useEffect(() => {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildWhatsAppMessage = () => {
    const lines = [
      `New Booking Enquiry - Hotel Yamuna`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      ``,
      `Check-in: ${form.checkin}`,
      `Check-out: ${form.checkout}`,
      form.roomType ? `Room: ${form.roomType}` : null,
      `Guests: ${form.guests}`,
      form.message ? `\nMessage: ${form.message}` : null,
    ]
    return lines.filter(Boolean).join("\n")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)

    if (WEB3FORMS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Booking Enquiry from ${form.name}`,
            from_name: "Hotel Yamuna Website",
            name: form.name,
            phone: form.phone,
            email: form.email,
            checkin: form.checkin,
            checkout: form.checkout,
            room_type: form.roomType,
            guests: form.guests,
            message: form.message,
          }),
        })
      } catch {
      }
    }

    const message = encodeURIComponent(buildWhatsAppMessage())
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, "_blank")

    setSending(false)
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setForm({
        name: "",
        phone: "",
        email: "",
        checkin: "",
        checkout: "",
        roomType: "",
        guests: "1",
        message: "",
      })
    }, 5000)
  }

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-amber-400/20"
  const labelClass = "block text-xs font-medium text-white/50 mb-1.5 tracking-wide uppercase"

  return (
    <section
      id="enquire"
      ref={sectionRef}
      className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-400/[0.015] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-light tracking-[0.6em] text-amber-400/70 uppercase">
            Get in Touch
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Enquire Now
          </h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <svg
              className="size-2.5 text-amber-400/60"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <rect
                x="2"
                y="2"
                width="8"
                height="8"
                rx="1"
                transform="rotate(45 6 6)"
              />
            </svg>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="mt-6 mx-auto max-w-xl text-white/50 text-base leading-relaxed">
            Fill in your details and we&apos;ll get back to you instantly on
            WhatsApp. You can also reach us directly via phone or email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                  <div className="flex items-center justify-center size-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                    <CheckCircle className="size-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Enquiry Sent!
                  </h3>
                  <p className="text-white/50 text-sm max-w-sm">
                    Your booking details have been sent via WhatsApp. We&apos;ll
                    confirm your reservation shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={handleChange}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com (optional)"
                        value={form.email}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="checkin" className={labelClass}>
                        Check-in Date <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          id="checkin"
                          name="checkin"
                          type="date"
                          required
                          value={form.checkin}
                          onChange={handleChange}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="checkout" className={labelClass}>
                        Check-out Date <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          id="checkout"
                          name="checkout"
                          type="date"
                          required
                          value={form.checkout}
                          onChange={handleChange}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="roomType" className={labelClass}>
                        Room Preference
                      </label>
                      <select
                        id="roomType"
                        name="roomType"
                        value={form.roomType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="" className="bg-neutral-900">
                          Select a room type
                        </option>
                        {roomOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-neutral-900"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="guests" className={labelClass}>
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          max="20"
                          value={form.guests}
                          onChange={handleChange}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Any special requests or questions..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-sm font-semibold text-white uppercase tracking-wide transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="size-5" />
                    {sending ? "Sending..." : "Send Enquiry via WhatsApp"}
                  </button>

                  <p className="text-center text-xs text-white/30 mt-2">
                    Clicking submit will open WhatsApp with your booking details
                    pre-filled.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-1000 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-5">
                Reach Us Directly
              </h3>
              <div className="flex flex-col gap-5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:bg-green-500/5 hover:border-green-500/20 group"
                >
                  <div className="flex items-center justify-center size-11 rounded-full bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="size-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">WhatsApp</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Chat with us instantly
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919418569661"
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:bg-amber-400/5 hover:border-amber-400/20 group"
                >
                  <div className="flex items-center justify-center size-11 rounded-full bg-amber-400/10 border border-amber-400/20 group-hover:bg-amber-400/20 transition-colors">
                    <Phone className="size-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Call Us</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      +91 94185 69661
                    </p>
                    <p className="text-xs text-white/40">
                      +91 94183 92661
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:hotelyamunajwalamukhi08@gmail.com"
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:bg-blue-400/5 hover:border-blue-400/20 group"
                >
                  <div className="flex items-center justify-center size-11 rounded-full bg-blue-400/10 border border-blue-400/20 group-hover:bg-blue-400/20 transition-colors">
                    <Mail className="size-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Email</p>
                    <p className="text-xs text-white/40 mt-0.5 break-all">
                      hotelyamunajwalamukhi08@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-center size-11 rounded-full bg-amber-400/10 border border-amber-400/20 shrink-0">
                    <MapPin className="size-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Address</p>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
                      Hotel Yamuna, Near Jwalamukhi Temple,
                      <br />
                      Jwalamukhi-Kangra Road, Himachal Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3">
                Good to Know
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-white/45">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber-400/50" />
                  Check-out by 12:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber-400/50" />
                  Free parking available
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber-400/50" />
                  1.7 km from Jwalamukhi Temple
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber-400/50" />
                  Instant confirmation on WhatsApp
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
