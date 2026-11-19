import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { absolute, site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    // Child pages: "Pricing: Monthly Design & Development Plans | Creaw"
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false },
  // OS-adaptive favicon; ThemeToggle then points it at the light/dark variant
  // matching the site theme (see syncFavicon).
  icons: { icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }] },
};

// Organisation + website structured data, on every page.
const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absolute("/brand/favicon-light.svg"),
    image: absolute("/opengraph-image"),
    description: site.description,
    email: site.email,
    slogan: site.tagline,
    knowsAbout: site.services,
    priceRange: "$$$",
    ...(site.socials.length ? { sameAs: site.socials } : {}),
    ...(site.location
      ? { address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.country } }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: site.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  },
];

// Runs before paint: apply the saved theme, else the OS preference. No flash.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Must be a plain inline script so it runs before first paint (no theme flash).
            React logs a dev-only notice about script tags here; it's harmless. */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <JsonLd data={orgJsonLd} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
