import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { CtaFooter } from "@/components/cta-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About — Creaw",
  description: "Who we are: one creaw of designers, engineers and project managers.",
};

export default function About() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <AboutPage />
      </main>
      <CtaFooter />
    </>
  );
}
