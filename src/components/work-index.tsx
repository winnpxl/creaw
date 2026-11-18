"use client";

import { ArrowRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { FadeIn, RevealText } from "@/components/motion";
import { showcase, workPage, type ShowcaseProject } from "@/content/work";

const ease = [0.22, 1, 0.36, 1] as const;
const ALL = "All";

/** Square segmented chips with a sliding pill (same language as the billing switch). */
function CategoryChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter by category"
      className="flex gap-1 overflow-x-auto border border-line bg-surface p-1 [scrollbar-width:none]"
    >
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`group relative isolate h-10 shrink-0 overflow-hidden px-4 text-[15px] transition-colors duration-200 ${
              on ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {on && (
              <motion.span
                layoutId="work-filter-pill"
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
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ProjectRow({ p }: { p: ShowcaseProject }) {
  const Icon = p.icon;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease }}
      className="border-b border-line py-12 md:py-16"
    >
      <a href={p.href ?? "#contact"} className="group grid gap-6 md:grid-cols-12 md:gap-8">
        {/* Year */}
        <p className="text-sm text-muted md:col-span-3">{p.year}</p>

        <div className="md:col-span-9">
          {/* Name + outcome */}
          <div className="grid gap-3 md:grid-cols-2 md:gap-8">
            <h2 className="flex items-center text-2xl font-medium tracking-tight md:text-3xl">
              {/* Arrow slides in on hover, like the buttons. */}
              <span
                aria-hidden
                className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-300 ease-lens group-hover:w-[1.15em] group-hover:opacity-100"
              >
                <ArrowRight className="size-[0.9em] shrink-0" strokeWidth={2} />
              </span>
              {p.name}
            </h2>
            <p className="max-w-sm text-muted md:pt-1.5">{p.outcome}</p>
          </div>

          {/* Media: reveals from a crop on scroll, zooms on hover. */}
          <motion.div
            className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[2px] bg-surface"
            initial={{ clipPath: "inset(8% 4% 8% 4%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease }}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-lens group-hover:scale-[1.03]">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={`${p.name} project`} className="size-full object-cover" />
              ) : (
                <div
                  className="grid size-full place-items-center"
                  style={{
                    backgroundImage: `repeating-linear-gradient(115deg, rgb(255 255 255 / 0.16) 0 2px, transparent 2px 26px), linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                  }}
                >
                  <span className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-white drop-shadow-sm">
                    <Icon className="size-8" strokeWidth={1.8} />
                    {p.name}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-[2px] border border-line px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-muted transition-colors duration-300 group-hover:border-foreground/40 group-hover:text-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.li>
  );
}

export function WorkIndex() {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(showcase.flatMap((p) => p.tags)))],
    [],
  );
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = showcase.filter(
    (p) =>
      (category === ALL || p.tags.includes(category)) &&
      (!q ||
        [p.name, p.category, p.summary, p.outcome, ...p.tags].some((s) =>
          s.toLowerCase().includes(q),
        )),
  );

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealText
          as="h1"
          text={workPage.title}
          className="text-7xl font-semibold leading-[0.9] tracking-tight md:text-[140px]"
        />
        <FadeIn delay={0.3} className="flex gap-6 text-sm text-muted md:pb-4">
          <span>({String(showcase.length).padStart(2, "0")}) projects</span>
          <span>{workPage.range}</span>
        </FadeIn>
      </div>

      {/* Filters */}
      <FadeIn delay={0.2} className="mt-16 md:mt-24">
        <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <CategoryChips options={categories} value={category} onChange={setCategory} />
          <label className="flex items-center gap-3 border-b border-line pb-2 transition-colors focus-within:border-foreground md:w-72">
            <Search className="size-4 text-muted" strokeWidth={1.8} />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={workPage.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
            />
          </label>
        </div>
      </FadeIn>

      {/* Projects */}
      <ul>
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((p) => (
            <ProjectRow key={p.name} p={p} />
          ))}
        </AnimatePresence>
      </ul>

      {results.length === 0 && (
        <p className="py-24 text-center text-muted">
          No projects match that yet.{" "}
          <button
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="text-foreground underline underline-offset-4 hover:text-accent-text"
          >
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
