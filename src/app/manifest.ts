import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotel Yamuna — Luxury & Comfort",
    short_name: "Hotel Yamuna",
    description:
      "Experience unparalleled luxury on the banks of the Yamuna. Where timeless elegance meets warm Indian hospitality.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#8C6A3C",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
