import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Yamuna — Luxury & Comfort",
  description: "Experience unparalleled luxury on the banks of the Yamuna. Where timeless elegance meets warm Indian hospitality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
        <link rel="preload" href="/outer-video.mp4" as="video" type="video/mp4" />
        <meta name="google-site-verification" content="BwO1Miy7f7thrUoJwDa-ReUYGZJRffVBdXY9d2wBJKs" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-stone-900">{children}</body>
    </html>
  );
}
