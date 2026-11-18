"use client";

import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/brand";
import { Terrain } from "@/components/hero-backdrop";
import { Counter, FadeIn, RevealText } from "@/components/motion";
import { SweepButton } from "@/components/sweep-button";
import { about } from "@/content/about";

const ease = [0.22, 1, 0.36, 1] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/** Portrait frame: photo if provided, otherwise a tinted placeholder with initials. */
function Portrait({ name, tint, photo }: { name: string; tint: [string, string]; photo?: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-surface">
      <div className="absolute inset-0 transition-transform duration-700 ease-lens group-hover:scale-[1.04]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="size-full object-cover" />
        ) : (
          <div
            className="grid size-full place-items-center grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            style={{ backgroundImage: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})` }}
          >
            <span className="text-6xl font-semibold tracking-tight text-white/90">{initials(name)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      {/* Title */}
      <section className="mx-auto max-w-7xl px-5 pt-36 md:px-10 md:pt-48">
        <RevealText
          as="h1"
          text={about.title}
          className="text-7xl font-semibold leading-[0.9] tracking-tight md:text-[140px]"
        />
      </section>

      {/* Intro + stats */}
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-32">
        <div className="grid gap-8 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <Logo className="h-4" />
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-9">
            <p className="max-w-4xl text-2xl font-medium leading-snug tracking-tight md:text-[28px]">
              <span className="inline-block w-16 md:w-24" aria-hidden />
              {about.intro}
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          <span className="hidden md:col-span-3 md:block" />
          {about.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="md:col-span-3">
              <Counter to={s.to} suffix={s.suffix} className="block text-6xl font-medium tracking-[-0.04em] md:text-7xl" />
              <p className="mt-4 max-w-[16rem] text-muted">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Team: four cards, aligned in one row */}
      <section className="mx-auto max-w-7xl px-5 pt-32 md:px-10 md:pt-48">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-5">
          {about.team.map((m, i) => (
            <motion.li
              key={m.name}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            >
              <Portrait name={m.name} tint={m.tint} photo={m.photo} />
              <h3 className="mt-5 text-xl font-medium tracking-tight">{m.name}</h3>
              <p className="mt-1 text-sm text-muted">{m.role}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-7xl px-5 pt-32 md:px-10 md:pt-48">
        <div className="grid md:grid-cols-12">
          <FadeIn className="md:col-span-7 md:col-start-4">
            <Quote className="size-12 fill-accent text-accent" strokeWidth={0} />
            <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight md:text-[28px]">
              {about.quote.text}
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-surface text-sm font-semibold">
                {initials(about.quote.name)}
              </span>
              <div>
                <p className="font-medium">{about.quote.name}</p>
                <p className="text-sm text-muted">{about.quote.role}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature number + studio image */}
      <section className="mx-auto max-w-7xl px-5 pt-32 md:px-10 md:pt-48">
        <div className="flex items-end justify-between">
          <FadeIn>
            <p className="flex items-start text-8xl font-semibold leading-none tracking-[-0.05em] md:text-[150px]">
              <Counter to={about.feature.to} />
              <span className="text-[0.4em] leading-none text-accent-text">{about.feature.suffix}</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="pb-4 text-sm text-muted">{about.feature.range}</p>
          </FadeIn>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <p className="max-w-[14rem] text-muted">{about.feature.label}</p>
          </FadeIn>
          <motion.div
            className="relative aspect-[16/11] overflow-hidden rounded-[2px] bg-surface md:col-span-9"
            initial={{ clipPath: "inset(8% 4% 8% 4%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease }}
          >
            {about.feature.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={about.feature.image} alt="The Crews studio" className="size-full object-cover" />
            ) : (
              // Placeholder until the studio photo lands: our drifting terrain.
              <>
                <Terrain className="absolute inset-0" />
                <span className="absolute inset-0 grid place-items-center text-muted">Studio photo</span>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-7xl px-5 pb-32 pt-32 md:px-10 md:pb-48 md:pt-48">
        <div className="grid gap-8 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <Logo className="h-4" />
          </FadeIn>
          <div className="md:col-span-9">
            <RevealText
              as="p"
              text={about.closing.heading}
              className="max-w-4xl text-3xl font-medium leading-tight tracking-tight md:text-[40px]"
            />
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-xl text-lg text-muted">{about.closing.body}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <SweepButton href="#contact" tone="dark" className="mt-12 h-14 px-8 text-base font-medium">
                {about.closing.cta}
              </SweepButton>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
