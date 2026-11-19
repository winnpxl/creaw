import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { CtaFooter } from "@/components/cta-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { about } from "@/content/about";
import { absolute, site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Creaw",
  url: absolute("/about"),
  mainEntity: {
    "@id": `${site.url}/#organization`,
    employee: about.team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      ...(m.photo ? { image: absolute(m.photo) } : {}),
    })),
  },
};

export const metadata: Metadata = {
  title: "About Us: Product Designers & Software Engineers",
  description:
    "Meet Creaw: product designers, software engineers, AI engineers and project managers with 18+ years of combined experience, shipping as one team.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Us: Product Designers & Software Engineers | Creaw", images: ["/opengraph-image"] },
  twitter: { title: "About Us: Product Designers & Software Engineers | Creaw", images: ["/opengraph-image"] },
};

export default function About() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main id="top" className="flex-1">
        <AboutPage />
      </main>
      <CtaFooter />
    </>
  );
}
