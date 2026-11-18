"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FadeIn, RevealText } from "@/components/motion";
import { Pricing } from "@/components/pricing";
import { pricing, pricingPage } from "@/content/pricing";

const ease = [0.22, 1, 0.36, 1] as const;

function CompareTable() {
  const plans = pricing.plans;
  return (
    <div className="overflow-x-auto rounded-[2px] border border-line bg-surface [scrollbar-width:thin]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="w-[34%] px-6 py-5 text-sm font-normal text-muted">Plan</th>
            {plans.map((p) => (
              <th key={p.name} className="px-6 py-5 text-center text-base font-medium">
                {p.name}
                {p.featured && <span className="ml-2 bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-ink align-middle">Popular</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingPage.compare.rows.map((r) => (
            <tr key={r.label} className="border-b border-line transition-colors last:border-b-0 hover:bg-raised">
              <th scope="row" className="px-6 py-4 text-[15px] font-normal">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i} className={`px-6 py-4 text-center text-[15px] ${v === "—" ? "text-muted" : ""}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${i}`;
  return (
    <div className="h-fit rounded-[2px] border border-line bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[17px] font-medium"
      >
        {q}
        <span aria-hidden className={`relative block size-3.5 shrink-0 transition-transform duration-500 ease-lens ${open ? "rotate-45" : ""}`}>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingPage() {
  return (
    <>
      {/* Title */}
      <section className="mx-auto max-w-7xl px-5 pt-36 md:px-10 md:pt-48">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h1"
            text={pricingPage.title}
            className="text-7xl font-semibold leading-[0.9] tracking-tight md:text-[140px]"
          />
          <FadeIn delay={0.3} className="text-sm text-muted md:pb-4">
            {pricingPage.meta}
          </FadeIn>
        </div>
      </section>

      {/* Plans (same component as the homepage) */}
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-32">
        <Pricing />
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-7xl px-5 pt-32 md:px-10 md:pt-48">
        <RevealText
          text={pricingPage.compare.heading}
          className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
        />
        <FadeIn delay={0.15} className="mt-12">
          <CompareTable />
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 pb-32 pt-32 md:px-10 md:pb-48 md:pt-48">
        <RevealText
          text={pricingPage.faq.heading}
          className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {pricingPage.faq.items.map((f, i) => (
            <FadeIn key={f.q} delay={(i % 2) * 0.08}>
              <FaqItem q={f.q} a={f.a} i={i} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
