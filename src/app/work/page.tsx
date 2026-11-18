import type { Metadata } from "next";
import { CtaFooter } from "@/components/cta-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Work — Crews",
  description: "Products Crews has designed, built and shipped.",
};

export default function WorkPage() {
  return (
    <>
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
