// Homepage. Copy, stats and work items are placeholders until real content lands.
import {
  Counter,
  FadeIn,
  RevealText,
} from "@/components/motion";
import { ArrowRight } from "@/components/brand";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SiteHeader } from "@/components/site-header";
import { CtaFooter } from "@/components/cta-footer";
import { ProcessSteps, type Step } from "@/components/process-steps";
import { WorkShowcase } from "@/components/work-showcase";
import { Pricing } from "@/components/pricing";
import { ServicesFan, type Service } from "@/components/services-fan";

const services: Service[] = [
  {
    no: "01",
    title: "Project Management",
    body: "Scoping, roadmaps and weekly check-ins that keep every launch on time and on budget.",
  },
  {
    no: "02",
    title: "Product Design",
    body: "UX research, interface design and prototypes for web and mobile products.",
  },
  {
    no: "03",
    title: "Web Development",
    body: "Fast, accessible marketing sites and web apps built on modern stacks.",
  },
  {
    no: "04",
    title: "App Development",
    body: "Native-feeling mobile apps, from MVP to scale, shipped by the same creaw.",
  },
];


const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 18, suffix: "+", label: "Years of combined experience" },
  { to: 98, suffix: "%", label: "Clients who return" },
];

// Kubai Icons (MIT), recolored to brand green via icons.kubai.design.
const process: Step[] = [
  { step: "Discover", body: "We get to know the business, the users and the goal.", icon: "/icons/process/search.svg" },
  { step: "Design", body: "We explore directions fast and refine the one that works.", icon: "/icons/process/pen-tool.svg" },
  { step: "Build", body: "Design and engineering ship together, not in hand-offs.", icon: "/icons/process/code.svg" },
  { step: "Grow", body: "We stay on to measure, iterate and scale.", icon: "/icons/process/external-link.svg" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="flex-1">
        {/* Hero: one full viewport; the terrain band sits at the bottom edge of the view. */}
        <section className="relative h-screen min-h-[640px] overflow-hidden">
          <HeroBackdrop />
          <div className="relative mx-auto flex h-3/4 max-w-7xl flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
            <RevealText
              as="h1"
              delay={0.1}
              text="We design and build digital products, as one creaw."
              className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl"
            />
            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <FadeIn delay={0.6}>
                <p className="max-w-md text-lg text-muted">
                  Brand, product and engineering under one roof, for teams who
                  want ideas shipped, not just presented.
                </p>
              </FadeIn>
              <FadeIn delay={0.75}>
                <a href="#work" className="group inline-flex items-center gap-1 text-sm underline underline-offset-4 transition-colors hover:text-accent-text">
                  See selected work
                  <ArrowRight className="size-4 rotate-90 transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <RevealText
              text="Everything you need to launch, under one roof."
              className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
            />
            <FadeIn delay={0.2} className="mt-12 md:mt-16">
              <ServicesFan services={services} />
            </FadeIn>
          </div>
        </section>

        {/* Work */}
        <section id="work">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32">
            <WorkShowcase />
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3 md:px-10">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  className="block text-6xl font-medium tracking-tight md:text-8xl"
                />
                <p className="mt-2 text-muted">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process">
          <div className="mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-48">
            <RevealText
              text="A simple process, run by the people doing the work."
              className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
            />
            <FadeIn delay={0.1} className="mt-12">
              <ProcessSteps steps={process} />
            </FadeIn>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing">
          <div className="mx-auto max-w-7xl px-5 pb-32 md:px-10 md:pb-48">
            <Pricing compareLink />
          </div>
        </section>
      </main>

      <CtaFooter />
    </>
  );
}
