import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CtaFooter } from "@/components/cta-footer";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { WorkDetail } from "@/components/work-detail";
import { absolute, site } from "@/content/site";
import { caseStudyHref, showcase } from "@/content/work";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => showcase.find((p) => p.slug === slug);

export function generateStaticParams() {
  return showcase.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const title = `${p.name}: ${p.category} Case Study`;
  const url = caseStudyHref(p);
  return {
    title,
    description: `${p.summary} ${p.outcome}. ${p.tags.join(", ")} by Creaw.`.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${title} | Creaw`, images: ["/opengraph-image"] },
    twitter: { title: `${title} | Creaw`, images: ["/opengraph-image"] },
  };
}

export default function WorkDetailPage({ params }: Props) {
  // Header and footer form the instant shell; the case study streams in once `params` resolves.
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <CaseStudy params={params} />
        </Suspense>
      </main>
      <CtaFooter />
    </>
  );
}

async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();

  const url = absolute(caseStudyHref(p));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      name: `${p.name} case study`,
      headline: p.outcome,
      description: p.summary,
      url,
      dateCreated: p.year,
      genre: p.category,
      keywords: [...p.tags, ...p.caseStudy.stack].join(", "),
      creator: { "@id": `${site.url}/#organization` },
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
        { "@type": "ListItem", position: 2, name: "Work", item: absolute("/work") },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkDetail slug={p.slug} />
    </>
  );
}
