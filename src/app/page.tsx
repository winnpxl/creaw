// Baseline homepage. Copy and work items are placeholders until real content lands.

const services = [
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

const process = [
  { step: "Discover", body: "We get to know the business, the users and the goal." },
  { step: "Design", body: "We explore directions fast and refine the one that works." },
  { step: "Build", body: "Design and engineering ship together, not in hand-offs." },
  { step: "Grow", body: "We stay on to measure, iterate and scale." },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-muted">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#" className="text-lg font-semibold tracking-tight">
            Crews<span className="text-accent">.</span>
          </a>
          <ul className="hidden gap-8 text-sm md:flex">
            <li><a href="#services" className="hover:text-accent">Services</a></li>
            <li><a href="#work" className="hover:text-accent">Work</a></li>
            <li><a href="#process" className="hover:text-accent">Process</a></li>
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-sm text-background transition hover:bg-accent"
          >
            Start a project
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-24 md:px-10 md:pt-36">
          <Label>Design & Development Studio</Label>
          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl">
            We design and build digital products, as one crew.
          </h1>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-muted">
              Brand, product and engineering under one roof, for teams who want
              ideas shipped, not just presented.
            </p>
            <a href="#work" className="text-sm underline underline-offset-4 hover:text-accent">
              See selected work ↓
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <Label>Services</Label>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
              {services.map((s) => (
                <article key={s.no} className="bg-background p-8 md:p-10">
                  <span className="font-mono text-xs text-accent">{s.no}</span>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-sm text-muted">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <div className="flex items-end justify-between">
              <Label>Selected Work</Label>
              <span className="font-mono text-xs text-muted">({work.length})</span>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {work.map((w) => (
                <a key={w.name} href="#" className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                    <div className="h-full w-full transition duration-500 group-hover:scale-105 group-hover:bg-foreground/10" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-accent">
                      {w.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">{w.year}</span>
                  </div>
                  <p className="text-sm text-muted">{w.tags}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
            <Label>How we work</Label>
            <ol className="mt-10 grid gap-10 md:grid-cols-4">
              {process.map((p, i) => (
                <li key={p.step} className="border-t border-foreground pt-6">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-medium">{p.step}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60">
              Have a project?
            </p>
            <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-7xl">
              Let&apos;s build something worth shipping.
            </h2>
            <a
              href="mailto:hello@crews.studio"
              className="mt-10 inline-block rounded-full bg-accent px-6 py-3 text-foreground transition hover:bg-background"
            >
              hello@crews.studio
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:justify-between md:px-10">
          <span>© 2026 Crews Studio</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
            <a href="#" className="hover:text-foreground">Dribbble</a>
          </div>
        </div>
      </footer>
    </>
  );
}
