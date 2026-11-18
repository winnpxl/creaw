"use client";

import { Check } from "lucide-react";
import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeIn, RevealText } from "@/components/motion";
import { SweepButton } from "@/components/sweep-button";
import { pricing, type Plan } from "@/content/pricing";
import { Terrain } from "@/components/hero-backdrop";

type Billing = "monthly" | "quarterly";
const ease = [0.22, 1, 0.36, 1] as const;
const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Number that tweens to its new value (used when billing switches). */
function AnimatedPrice({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const controls = animate(from.current, value, {
      duration: 0.6,
      ease,
      onUpdate: (v) => setShown(Math.round(v / 10) * 10),
      onComplete: () => setShown(value),
    });
    from.current = value;
    return () => controls.stop();
  }, [value]);

  return <span className="tabular-nums">{fmt.format(shown)}</span>;
}

/** Square segmented switch with a sliding pill, matching the work tabs. */
function BillingSwitch({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const opts: { id: Billing; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
  ];
  return (
    <div className="flex items-center gap-3">
      <div role="radiogroup" aria-label="Billing period" className="flex gap-1 border border-line bg-surface p-1">
        {opts.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.id)}
              className={`group relative isolate h-10 overflow-hidden px-5 text-[15px] transition-colors duration-200 ${
                on ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="billing-pill"
                  aria-hidden
                  className="absolute inset-0 -z-10 border border-line bg-raised"
                  transition={{ duration: 0.45, ease }}
                />
              )}
              {!on && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-raised transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300"
                />
              )}
              {o.label}
            </button>
          );
        })}
      </div>
      <span className="bg-accent px-2 py-1 text-xs font-medium text-accent-ink">
        Save {Math.round(pricing.quarterlyDiscount * 100)}%
      </span>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price =
    plan.monthly === null
      ? null
      : billing === "quarterly"
        ? Math.round(plan.monthly * (1 - pricing.quarterlyDiscount))
        : plan.monthly;
  const f = plan.featured;

  return (
    <article
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-[2px] border p-5 transition-colors duration-500 md:p-6 ${
        f ? "border-foreground/40 bg-surface" : "border-line bg-surface hover:border-foreground/30"
      }`}
    >
      {f && (
        <>
          {/* Featured: the hero's drifting terrain, fading in toward the bottom. */}
          <Terrain
            className="absolute inset-x-0 bottom-0 h-3/4"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 45%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 45%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(80% 45% at 85% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium">{plan.name}</h3>
        {f && (
          <span className="bg-accent px-2 py-1 text-xs font-medium text-accent-ink">Most popular</span>
        )}
      </div>

      <p className="relative mt-6 flex items-baseline gap-2">
        <span className="text-5xl font-medium tracking-[-0.04em] md:text-[56px]">
          {price === null ? "Custom" : <AnimatedPrice value={price} />}
        </span>
        {price !== null && <span className="text-muted">/month</span>}
      </p>

      <p className="relative mt-4 min-h-[3em] text-muted">{plan.fit}</p>

      <hr className="relative my-7 border-0 border-t border-line" />

      <ul className="relative flex flex-1 flex-col gap-3.5">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-[15px]">
            <Check
              className={`mt-0.5 size-4 shrink-0 ${f ? "text-accent-text" : "text-foreground"}`}
              strokeWidth={2}
            />
            {feat}
          </li>
        ))}
      </ul>

      <SweepButton
        href="#contact"
        tone={f ? "accent" : "light"}
        className="relative mt-9 h-12 w-full text-base font-medium"
      >
        {plan.cta}
      </SweepButton>
    </article>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <RevealText
            text={pricing.heading}
            className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
          />
          <FadeIn delay={0.2}>
            <p className="mt-5 max-w-xl text-lg text-muted">{pricing.sub}</p>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <BillingSwitch value={billing} onChange={setBilling} />
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
        {pricing.plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={0.1 + i * 0.08} className="h-full">
            <PlanCard plan={plan} billing={billing} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <p className="mt-8 text-center text-sm text-muted">{pricing.fineprint}</p>
      </FadeIn>
    </div>
  );
}
