import type { Metadata } from "next";
import { CtaFooter } from "@/components/cta-footer";
import { PricingPage } from "@/components/pricing-page";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Pricing — Creaw",
  description: "Three ways to work with Creaw, from one flat monthly price.",
};

export default function Pricing() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <PricingPage />
      </main>
      <CtaFooter />
    </>
  );
}
