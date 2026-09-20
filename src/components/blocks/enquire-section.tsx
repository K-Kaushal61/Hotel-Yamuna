"use client"

import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  CheckCircle,
  Users,
} from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { useState, type FormEvent } from "react"

const WHATSAPP_NUMBER = "919418569661"

const WEB3FORMS_KEY = ""

const roomOptions = [
  "Standard — Double Bed (AC)",
  "Standard — Double Bed (Non-AC)",
  "Standard — Triple Bed (AC)",
  "Standard — Triple Bed (Non-AC)",
  "Standard — Four Bed (AC)",
  "Standard — Four Bed (Non-AC)",
  "Deluxe — Double Bed (AC)",
  "Deluxe — Double Bed (Non-AC)",
  "Deluxe — Triple Bed (AC)",
  "Deluxe — Triple Bed (Non-AC)",
  "Deluxe — Four Bed (AC)",
  "Deluxe — Four Bed (Non-AC)",
]

export default function EnquireSection() {
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
    "w-full rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 focus:border-[#8C6A3C] focus:bg-white focus:ring-2 focus:ring-[#8C6A3C]/20"
  const labelClass = "block text-xs font-semibold text-stone-700 mb-1.5 tracking-wider uppercase"

  return (
    <section
      id="enquire"
      className="relative bg-[#F4F0E8] py-20 md:py-28 overflow-hidden border-t border-stone-200/60"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#8C6A3C] uppercase">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Enquire Now
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-[#8C6A3C]/40 rounded-full" />
          <p className="mt-4 mx-auto max-w-xl text-stone-600 text-base leading-relaxed">
            Fill in your details and we&apos;ll get back to you instantly on
            WhatsApp. You can also reach us directly via phone or email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex items-center justify-center size-16 rounded-full bg-green-100 border border-green-200 mb-5">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">
                    Enquiry Sent!
                  </h3>
                  <p className="text-stone-600 text-sm max-w-sm">
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
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                        <option value="">
                          Select a room type
                        </option>
                        {roomOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
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
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
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
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 hover:bg-[#20bd5a] active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-sm"
                  >
                    <WhatsAppIcon className="size-5" />
                    {sending ? "Sending..." : "Send Enquiry via WhatsApp"}
                  </button>

                  <p className="text-center text-xs text-stone-500 mt-2">
                    Clicking submit will open WhatsApp with your booking details
                    pre-filled.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-4">
                Reach Us Directly
              </h3>
              <div className="flex flex-col gap-3.5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5 transition-all duration-200 hover:bg-green-50 hover:border-green-200 group"
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-[#25D366]/15 text-[#20bd5a] shrink-0 transition-transform group-hover:scale-105">
                    <WhatsAppIcon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">WhatsApp</p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Chat with us instantly
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919418569661"
                  className="flex items-center gap-4 rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5 transition-all duration-200 hover:bg-amber-50 hover:border-amber-200 group"
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-[#8C6A3C]/10 text-[#8C6A3C] shrink-0 transition-transform group-hover:scale-105">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Call Us</p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      +91 94185 69661 / +91 94183 92661
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:hotelyamunajwalamukhi08@gmail.com"
                  className="flex items-center gap-4 rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5 transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 group"
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-blue-100 text-blue-700 shrink-0 transition-transform group-hover:scale-105">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Email</p>
                    <p className="text-xs text-stone-600 mt-0.5 break-all">
                      hotelyamunajwalamukhi08@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5">
                  <div className="flex items-center justify-center size-10 rounded-full bg-[#8C6A3C]/10 text-[#8C6A3C] shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Address</p>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Hotel Yamuna, Near Jwalamukhi Temple,
                      <br />
                      Jwalamukhi-Kangra Road, HP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-3">
                Good to Know
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-stone-600">
                <li className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#8C6A3C]" />
                  Check-out by 12:00 PM
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#8C6A3C]" />
                  Free parking available on premises
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#8C6A3C]" />
                  1.7 km from Jwalamukhi Temple
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#8C6A3C]" />
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
