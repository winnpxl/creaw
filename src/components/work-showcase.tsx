"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FadeIn, RevealText } from "@/components/motion";
import { SweepButton } from "@/components/sweep-button";
import { showcase, workHeading, type ShowcaseProject } from "@/content/work";

const ROTATE_MS = 6000;
const GAP = 60; // px between carousel slides
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Tabbed project showcase. A pill slides to the active tab, the panel below
 * moves like a carousel, and it auto-advances every 6s while on screen.
 * Hovering anywhere in the showcase pauses rotation. Tabs use the site's
 * button language: square, with the green sweep on hover.
 */
export function WorkShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "0px 0px -25% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // restarts the timer after a manual pick
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % showcase.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [inView, paused, active, tick]);

  const pick = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <RevealText
          text={workHeading}
          className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
        />
        <FadeIn delay={0.2}>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1.5 text-lg transition-colors hover:border-foreground"
          >
            View all work
            <ArrowRight className="size-5 transition-transform duration-300 ease-lens group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>

      <div
        ref={rootRef}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="mt-14 md:mt-20"
      >
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Projects"
          className="flex gap-1 overflow-x-auto border border-line bg-surface p-1 [scrollbar-width:none]"
        >
          {showcase.map((p, i) => {
            const on = i === active;
            const Icon = p.icon;
            return (
              <button
                key={p.name}
                role="tab"
                id={`work-tab-${i}`}
                aria-selected={on}
                aria-controls={`work-panel-${i}`}
                onClick={() => pick(i)}
                className={`group relative isolate flex h-14 min-w-36 flex-1 items-center justify-center gap-2.5 overflow-hidden text-lg transition-colors duration-200 ${
                  on ? "text-foreground" : "text-muted hover:text-accent-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="work-tab-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 border border-line bg-background"
                    transition={{ duration: 0.5, ease }}
                  />
                )}
                {/* Sweep fill on hover (inactive tabs), same as SweepButton. */}
                {!on && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300"
                  />
                )}
                <Icon className="size-5" strokeWidth={1.6} />
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Panels (carousel) */}
        <div className="mt-6 overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: -active * (width + GAP) }}
            transition={{ duration: 0.7, ease }}
          >
            {showcase.map((p, i) => (
              <Panel key={p.name} p={p} i={i} on={i === active} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Panel({ p, i, on }: { p: ShowcaseProject; i: number; on: boolean }) {
  return (
    <motion.section
      id={`work-panel-${i}`}
      role="tabpanel"
      aria-labelledby={`work-tab-${i}`}
      aria-hidden={!on}
      inert={!on}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ duration: 0.5, ease }}
      className="grid w-full shrink-0 gap-6 rounded-[12px] border border-line bg-surface p-3 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:p-4"
    >
      {/* Copy */}
      <div className="flex flex-col justify-center px-4 py-8 md:px-10">
        <p className="text-muted">{p.category}</p>
        <h3 className="mt-3 max-w-[22ch] text-3xl font-normal leading-[1.15] tracking-[-0.03em] md:text-[34px]">
          {p.summary}
        </h3>
        <ul className="mt-8 flex flex-col gap-4">
          {p.highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-[17px]">
              <Icon className="size-5 shrink-0" strokeWidth={1.6} />
              {text}
            </li>
          ))}
        </ul>
        <SweepButton
          href={p.href ?? "#contact"}
          tone="dark"
          className="mt-10 h-12 w-full text-base font-medium"
          tabIndex={on ? 0 : -1}
        >
          View case study
        </SweepButton>
      </div>

      {/* Media */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[8px] md:aspect-auto md:min-h-[34rem]"
        style={{
          backgroundImage: `repeating-linear-gradient(115deg, rgb(255 255 255 / 0.16) 0 2px, transparent 2px 26px), linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
        }}
      >
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={`${p.name} product screens`} className="absolute inset-0 size-full object-cover" />
        ) : (
          // Placeholder "screen" until the product shot lands.
          <div className="absolute inset-x-[8%] bottom-0 top-[12%] grid place-items-center rounded-t-[14px] border border-white/60 bg-white/75 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-xl font-medium text-foreground/70">
              <p.icon className="size-6" strokeWidth={1.6} />
              {p.name}
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
}
