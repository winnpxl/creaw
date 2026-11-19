"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { Counter, FadeIn, RevealText } from "@/components/motion";
import { SweepButton } from "@/components/sweep-button";
import { caseStudyHref, showcase, type ShowcaseProject } from "@/content/work";

const ease = [0.22, 1, 0.36, 1] as const;

/** Project image, or the striped brand-colour placeholder until real shots land. */
function Media({
  p,
  src,
  caption,
  className = "",
  big = false,
}: {
  p: ShowcaseProject;
  src?: string;
  caption: string;
  className?: string;
  big?: boolean;
}) {
  const Icon = p.icon;
  return (
    <motion.figure
      className={`relative overflow-hidden rounded-[2px] bg-surface ${className}`}
      initial={{ clipPath: "inset(8% 4% 8% 4%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${p.name}: ${caption}`} className="size-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`${p.name}: ${caption}`}
          className="grid size-full place-items-center"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, rgb(255 255 255 / 0.16) 0 2px, transparent 2px 26px), linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
          }}
        >
          <span
            className={`flex items-center gap-3 font-semibold tracking-tight text-white drop-shadow-sm ${
              big ? "text-4xl md:text-6xl" : "text-2xl"
            }`}
          >
            <Icon className={big ? "size-10 md:size-14" : "size-7"} strokeWidth={1.8} />
            {big ? p.name : caption}
          </span>
        </div>
      )}
    </motion.figure>
  );
}

/** Two-column text block: heading on the left, body on the right. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <FadeIn className="md:col-span-4">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
      </FadeIn>
      <FadeIn delay={0.1} className="md:col-span-8">
        {children}
      </FadeIn>
    </div>
  );
}

export function WorkDetail({ slug }: { slug: string }) {
  const index = showcase.findIndex((x) => x.slug === slug);
  const p = showcase[index];
  const next = showcase[(index + 1) % showcase.length];
  const cs = p.caseStudy;

  // Lenis keeps easing toward its old scroll target after a client navigation,
  // so jump it (and the window) to the top whenever a new case study opens.
  const lenis = useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [slug, lenis]);

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Client", value: cs.client },
    { label: "Industry", value: p.category },
    { label: "Year", value: p.year },
    { label: "Timeline", value: cs.duration },
    { label: "Platforms", value: cs.platforms.join(", ") },
    { label: "Services", value: p.tags.join(", ") },
  ];

  return (
    <>
      {/* Title */}
      <section className="mx-auto max-w-7xl px-5 pt-36 md:px-10 md:pt-48">
        <FadeIn y={12}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 ease-lens group-hover:-translate-x-1"
              strokeWidth={1.8}
            />
            All work
          </Link>
        </FadeIn>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <RevealText
            as="h1"
            text={p.name}
            className="text-7xl font-semibold leading-[0.9] tracking-tight md:col-span-7 md:text-[140px]"
          />
          <FadeIn delay={0.3} className="md:col-span-5 md:pb-4">
            <p className="text-2xl font-medium leading-snug tracking-tight md:text-[28px]">{p.summary}</p>
          </FadeIn>
        </div>

        {/* Meta */}
        <FadeIn delay={0.2} className="mt-16 md:mt-24">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-sm text-muted">{m.label}</dt>
                <dd className="mt-2 text-[15px] leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      {/* Hero media */}
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-24">
        <Media p={p} src={p.image} caption="Project overview" className="aspect-[16/10] md:aspect-[16/9]" big />
      </section>

      {/* Story */}
      <section className="mx-auto flex max-w-7xl flex-col gap-24 px-5 py-24 md:gap-32 md:px-10 md:py-32">
        <Block title="Overview">
          <p className="max-w-3xl text-xl leading-relaxed md:text-2xl md:leading-relaxed">{cs.overview}</p>
          {cs.liveUrl && (
            <SweepButton href={cs.liveUrl} target="_blank" rel="noreferrer" className="mt-8 h-12 px-5 text-base font-medium">
              Visit live site
            </SweepButton>
          )}
        </Block>

        <Block title="The challenge">
          <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">{cs.challenge}</p>
        </Block>

        <Block title="Our approach">
          <ol className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
            {cs.approach.map((s) => (
              <li key={s.title} className="bg-background p-6 md:p-8">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Block>
      </section>

      {/* Results */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <RevealText
            text="The results"
            className="text-4xl font-semibold tracking-tight md:text-6xl"
          />
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
            {cs.results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.1} className="border-t border-foreground/15 pt-6">
                <p className="text-6xl font-medium tracking-[-0.04em] md:text-7xl">
                  {r.prefix}
                  <Counter to={r.to} suffix={r.suffix} />
                </p>
                <p className="mt-3 text-muted">{r.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-24 md:grid-cols-2 md:gap-6 md:px-10 md:py-32">
        {cs.gallery.map((g) => (
          <div key={g.caption} className={g.wide ? "md:col-span-2" : ""}>
            <Media
              p={p}
              src={g.src}
              caption={g.caption}
              className={g.wide ? "aspect-[16/10] md:aspect-[2/1]" : "aspect-[4/5]"}
            />
            <p className="mt-3 text-sm text-muted">{g.caption}</p>
          </div>
        ))}
      </section>

      {/* Testimonial + stack */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
        {cs.testimonial && (
          <FadeIn>
            <figure className="max-w-5xl">
              <Quote className="size-8 text-accent-text" strokeWidth={1.6} />
              <blockquote className="mt-6 text-3xl font-medium leading-[1.2] tracking-tight md:text-5xl">
                {cs.testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 text-muted">
                <span className="text-foreground">{cs.testimonial.name}</span>, {cs.testimonial.role}
              </figcaption>
            </figure>
          </FadeIn>
        )}

        <div className="mt-24 md:mt-32">
          <Block title="Built with">
            <ul className="flex flex-wrap gap-2">
              {cs.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-[2px] border border-line px-3 py-1.5 text-[13px] font-medium uppercase tracking-[0.06em] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </section>

      {/* Next project */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
        <Link href={caseStudyHref(next)} prefetch className="group block border-t border-line pt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm text-muted">Next project</p>
              <p className="mt-3 flex items-center text-5xl font-semibold tracking-tight md:text-8xl">
                <span
                  aria-hidden
                  className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-300 ease-lens group-hover:w-[1.1em] group-hover:opacity-100"
                >
                  <ArrowRight className="size-[0.85em] shrink-0" strokeWidth={2} />
                </span>
                {next.name}
              </p>
            </div>
            <ArrowUpRight
              className="mb-2 size-8 shrink-0 text-muted transition-all duration-300 ease-lens group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:size-12"
              strokeWidth={1.5}
            />
          </div>
          <p className="mt-4 max-w-xl text-muted">{next.summary}</p>
          <div className="mt-10 overflow-hidden rounded-[2px]">
            <div className="transition-transform duration-700 ease-lens group-hover:scale-[1.02]">
              <Media p={next} src={next.image} caption="Project overview" className="aspect-[16/9] md:aspect-[3/1]" big />
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
