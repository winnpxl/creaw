import type { Metadata } from "next";
import { CtaFooter } from "@/components/cta-footer";
import { PricingPage } from "@/components/pricing-page";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { pricing, pricingPage } from "@/content/pricing";
import { absolute, site } from "@/content/site";

// Plans as offers + FAQ, so search engines can show prices and answers.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Product design and software development",
    provider: { "@id": `${site.url}/#organization` },
    url: absolute("/pricing"),
    offers: pricing.plans.map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      description: p.fit,
      url: absolute("/pricing"),
      ...(p.monthly !== null
        ? {
            priceCurrency: "USD",
            price: p.monthly,
            priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "USD", unitCode: "MON" },
          }
        : {}),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingPage.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export const metadata: Metadata = {
  title: "Pricing: Monthly Design & Development Plans",
  description:
    "Transparent pricing for product design and software development. Three flat monthly plans from $6,500, with no hourly billing. Pause or cancel anytime.",
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing", title: "Pricing: Monthly Design & Development Plans | Creaw", images: ["/opengraph-image"] },
  twitter: { title: "Pricing: Monthly Design & Development Plans | Creaw", images: ["/opengraph-image"] },
};

export default function Pricing() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main id="top" className="flex-1">
        <PricingPage />
      </main>
      <CtaFooter />
    </>
  );
}
