import type { Metadata } from "next";
import { CtaFooter } from "@/components/cta-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkIndex } from "@/components/work-index";
import { JsonLd } from "@/components/json-ld";
import { showcase } from "@/content/work";
import { absolute, site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Creaw case studies",
  url: absolute("/work"),
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: showcase.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.summary,
        dateCreated: p.year,
        genre: p.category,
        keywords: p.tags.join(", "),
        creator: { "@id": `${site.url}/#organization` },
      },
    })),
  },
};

export const metadata: Metadata = {
  title: "Our Work: Web, App & Product Design Case Studies",
  description:
    "Case studies from Creaw: websites, web apps, mobile apps and AI products we designed, built and launched for startups and growing businesses.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Our Work: Web, App & Product Design Case Studies | Creaw", images: ["/opengraph-image"] },
  twitter: { title: "Our Work: Web, App & Product Design Case Studies | Creaw", images: ["/opengraph-image"] },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main id="top" className="flex-1">
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-10 md:pb-32 md:pt-48">
          <WorkIndex />
        </section>
      </main>
      <CtaFooter />
    </>
  );
}
