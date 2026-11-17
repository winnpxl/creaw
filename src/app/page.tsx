// Homepage. Copy, stats and work items are placeholders until real content lands.
import {
  Counter,
  FadeIn,
  Marquee,
  ParallaxMedia,
  RevealText,
  RollButton,
  SmartHeader,
} from "@/components/motion";
import { ArrowRight, Logo } from "@/components/brand";
import { ServicesFan, type Service } from "@/components/services-fan";

const services: Service[] = [
  {
    no: "01",
    title: "Brand & Identity",
    body: "Strategy, naming, visual identity and the systems that keep it consistent.",
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
    body: "Native-feeling mobile apps, from MVP to scale, shipped by the same crew.",
  },
];

const work = [
  { name: "Project One", tags: "Brand · Web", year: "2026" },
  { name: "Project Two", tags: "Product · App", year: "2026" },
  { name: "Project Three", tags: "Web · Development", year: "2025" },
  { name: "Project Four", tags: "Brand · Product", year: "2025" },
];

const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 6, suffix: "yrs", label: "Designing & building" },
  { to: 98, suffix: "%", label: "Clients who return" },
];

const process = [
  { step: "Discover", body: "We get to know the business, the users and the goal." },
  { step: "Design", body: "We explore directions fast and refine the one that works." },
  { step: "Build", body: "Design and engineering ship together, not in hand-offs." },
  { step: "Grow", body: "We stay on to measure, iterate and scale." },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest text-muted">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <SmartHeader>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" aria-label="Crews, back to top" className="flex transition-colors hover:text-accent">
            <Logo />
          </a>
          <ul className="hidden gap-8 text-sm md:flex">
            <li><a href="#services" className="transition-colors hover:text-accent">Services</a></li>
            <li><a href="#work" className="transition-colors hover:text-accent">Work</a></li>
            <li><a href="#process" className="transition-colors hover:text-accent">Process</a></li>
          </ul>
          <RollButton href="#contact">Start a project</RollButton>
        </nav>
      </SmartHeader>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-24 md:px-10 md:pt-36">
          <FadeIn y={12}>
            <Label>Design & Development Studio</Label>
          </FadeIn>
          <RevealText
            as="h1"
            delay={0.1}
            text="We design and build digital products, as one crew."
            className="mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl"
          />
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <FadeIn delay={0.6}>
              <p className="max-w-md text-lg text-muted">
                Brand, product and engineering under one roof, for teams who
                want ideas shipped, not just presented.
              </p>
            </FadeIn>
            <FadeIn delay={0.75}>
              <a href="#work" className="group inline-flex items-center gap-1 text-sm underline underline-offset-4 transition-colors hover:text-accent">
                See selected work
                <ArrowRight className="size-4 rotate-90 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
            </FadeIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 md:px-10">
          <ParallaxMedia className="aspect-[16/9] md:aspect-[21/9]" />
        </section>

        {/* Marquee */}
        <section className="py-20 md:py-28">
          <Marquee items={["Brand", "Product", "Web", "Mobile", "Motion"]} />
        </section>

        {/* Services */}
        <section id="services" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <Label>Services</Label>
            <RevealText
              text="Everything you need to launch, under one roof."
              className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
            />
            <FadeIn delay={0.2} className="mt-12 md:mt-16">
              <ServicesFan services={services} />
            </FadeIn>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <div className="flex items-end justify-between">
              <Label>Selected Work</Label>
              <span className="text-xs text-muted">({work.length})</span>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {work.map((w, i) => (
                <a
                  key={w.name}
                  href="#"
                  className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
                >
                  <ParallaxMedia className="aspect-[4/3]" />
                  <FadeIn y={16}>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
                        {w.name}
                      </h3>
                      <span className="text-xs text-muted">{w.year}</span>
                    </div>
                    <p className="text-sm text-muted">{w.tags}</p>
                  </FadeIn>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-line">
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
        <section id="process" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <Label>How we work</Label>
            <RevealText
              text="A simple process, run by the people doing the work."
              className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl"
            />
            <ol className="mt-12 grid gap-10 md:grid-cols-4">
              {process.map((p, i) => (
                <li key={p.step}>
                  <FadeIn delay={i * 0.1} className="border-t border-foreground pt-6">
                    <span className="text-xs text-muted">0{i + 1}</span>
                    <h3 className="mt-2 text-xl font-medium">{p.step}</h3>
                    <p className="mt-2 text-muted">{p.body}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
            <p className="text-xs uppercase tracking-widest opacity-60">
              Have a project?
            </p>
            <RevealText
              text="Let's build something worth shipping."
              className="mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-7xl"
            />
            <FadeIn delay={0.4} className="mt-10">
              <RollButton href="mailto:hello@crews.studio" variant="accent">
                hello@crews.studio
              </RollButton>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:justify-between md:px-10">
          <span>© 2026 Crews Studio</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Instagram</a>
            <a href="#" className="transition-colors hover:text-foreground">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-foreground">Dribbble</a>
          </div>
        </div>
      </footer>
    </>
  );
}
