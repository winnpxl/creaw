// Site-wide facts used for SEO (metadata, sitemap, structured data).
// Update `url` if the production domain differs, and fill in `location`
// to unlock local search ("design agency in <city>").

import { EMAIL, socialLinks } from "@/content/nav";

export const site = {
  name: "Creaw",
  url: "https://creaw.studio",
  locale: "en_US",
  /** Default <title> for the homepage (≤ 60 chars). */
  title: "Creaw | Product Design & Software Development Studio",
  /** Default meta description (≤ 160 chars). */
  description:
    "Creaw is a product design and software development studio. We design, build and launch websites, web apps, mobile apps and AI products, start to finish.",
  /** One-line positioning used on share cards. */
  tagline: "Product design & software development, start to finish.",
  email: EMAIL,
  /** Real profile URLs only; placeholders ("#") are skipped in structured data. */
  socials: socialLinks.map((s) => s.href).filter((h) => h.startsWith("http")),
  /** e.g. { city: "Lagos", country: "NG" } */
  location: null as null | { city: string; country: string },
  services: [
    "Product design",
    "UI/UX design",
    "Web development",
    "Web app development",
    "Mobile app development",
    "AI product development",
    "Design systems",
    "Project management",
  ],
  keywords: [
    "product design studio",
    "software development agency",
    "web design and development",
    "web app development",
    "mobile app development",
    "UI/UX design agency",
    "AI product development",
    "MVP development",
    "design system",
    "digital product agency",
  ],
};

/** Absolute URL for a site path. */
export const absolute = (path = "/") => new URL(path, site.url).toString();
