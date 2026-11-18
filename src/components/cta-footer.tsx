"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand";
import { FadeIn, RevealText } from "@/components/motion";
import { SweepButton } from "@/components/sweep-button";
import { GRAIN } from "@/lib/grain";
import { navLinks, resolveHref } from "@/content/nav";

const EMAIL = "hello@crews.studio";

const social = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

/** Opens the visitor's mail app with the form contents (no backend yet). */
function compose(subject: string, lines: string[]) {
  const body = lines.filter(Boolean).join("\n");
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Grain({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{ backgroundImage: GRAIN }}
    />
  );
}

export function CtaFooter() {
  return (
    <>
      <Cta />
      <Footer />
    </>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden bg-accent text-accent-ink"
    >
      {/* Soft waves + grain. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(120% 60% at 15% -10%, rgb(0 0 0 / 0.10), transparent 60%)",
            "radial-gradient(90% 50% at 85% 30%, rgb(0 0 0 / 0.08), transparent 65%)",
            "radial-gradient(110% 55% at 40% 85%, rgb(255 255 255 / 0.06), transparent 60%)",
          ].join(","),
        }}
      />
      <Grain className="opacity-25 mix-blend-multiply" />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-32">
        <div className="flex justify-end text-accent-ink">
          <Logo className="h-3.5" />
        </div>

        <RevealText
          text="Let's build something together."
          className="mt-4 text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
        />

      </div>
    </section>
  );
}

function Footer() {
  const pathname = usePathname();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const field =
    "w-full border-b border-white/15 bg-transparent pb-4 text-[19px] font-medium tracking-[-0.02em] text-white outline-none transition-colors placeholder:text-white/50 focus:border-white/60";

  return (
    <footer
      data-header-tone="dark"
      className="relative overflow-hidden bg-[#0f0f0f] text-white dark:border-t dark:border-line dark:bg-surface"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 40% at 70% 20%, rgb(255 255 255 / 0.04), transparent 70%), radial-gradient(70% 40% at 20% 75%, rgb(255 255 255 / 0.03), transparent 70%)",
        }}
      />
      <Grain className="opacity-[0.18] mix-blend-screen" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-10 md:pt-36">
        {/* Row 1: big email. */}
        <FadeIn className="grid gap-8 md:grid-cols-3 md:gap-5">
          <span className="text-[13px] font-bold leading-[1.05]">
            20©
            <br />
            26
          </span>
          <div className="md:col-span-2">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">Say hello</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group relative mt-2 inline-block text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.04em]"
            >
              {EMAIL}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-lens group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <ul className="mt-6 flex gap-5 text-[13px] font-medium text-white/60">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="transition-colors hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Row 2: contact form. Target of every "Contact" / "#contact" link. */}
        <div id="contact" className="scroll-mt-28 pt-24 md:pt-32">
          <FadeIn className="grid gap-10 md:grid-cols-3 md:gap-5">
            <p className="max-w-[13rem] text-[15px] font-medium leading-[1.4] text-white/70">
              Contact us today for a free consultation and let&apos;s discuss your
              next project.
            </p>
            <form
              className="flex flex-col gap-8 md:col-span-2"
              onSubmit={(e) => {
                e.preventDefault();
                compose(`Project enquiry from ${form.name}`, [
                  `Name: ${form.name}`,
                  `Email: ${form.email}`,
                  "",
                  form.message,
                ]);
              }}
            >
              <input required placeholder="Your name *" value={form.name} onChange={set("name")} className={field} />
              <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")} className={field} />
              <textarea
                rows={5}
                placeholder="Enter your message..."
                value={form.message}
                onChange={set("message")}
                className={`${field} resize-none`}
              />
              <SweepButton
                type="submit"
                tone="accent"
                className="mt-2 h-[61px] w-full text-base font-semibold tracking-[-0.02em]"
              >
                Get in touch
              </SweepButton>
              <p className="-mt-3 text-[13px] font-medium text-white/50">
                Or email us directly at{" "}
                <a href={`mailto:${EMAIL}`} className="text-white hover:underline">
                  {EMAIL}
                </a>
                .
              </p>
            </form>
          </FadeIn>
        </div>

        {/* Row 3: link columns. */}
        <FadeIn className="mt-24 grid gap-10 md:mt-32 md:grid-cols-3 md:gap-5">
          <span className="hidden md:block" />
          <div className="grid grid-cols-2 gap-10 md:col-span-2 md:grid-cols-3 md:gap-5">
            <nav aria-label="Footer">
              <p className="text-[13px] font-medium text-white/60">Navigation</p>
              <ul className="mt-5 flex flex-col gap-2">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={resolveHref(l.href, pathname)}
                      className="inline-block text-[17px] font-medium tracking-[-0.03em] transition-[color,transform] duration-300 ease-lens hover:translate-x-1 hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[13px] font-medium text-white/60">Social</p>
              <ul className="mt-5 flex flex-col gap-2">
                {social.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-block text-[17px] font-medium tracking-[-0.03em] transition-[color,transform] duration-300 ease-lens hover:translate-x-1 hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 text-[13px] font-medium leading-[1.3] text-white/60 md:col-span-1">
              <p>
                © 2026 Crews Studio.
                <br />
                All rights reserved.
              </p>
              <Logo className="mt-5 h-3.5 text-white" />
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
