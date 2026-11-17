"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Logo } from "@/components/brand";
import { SweepButton } from "@/components/sweep-button";

const links = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;
// The panel grows out of the 45×45 menu button (top-right corner).
const CLOSED = "inset(0px 0px calc(100% - 45px) calc(100% - 45px))";
const OPEN = "inset(0px 0px 0px 0px)";

/**
 * Fixed header: logo left; "Book a call" box + square menu button right.
 * Uses the same centered container and gutters as the page body.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  // Flip the logo to white while a section marked data-header-tone="dark" is behind it.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      const hit = document
        .elementsFromPoint(40, 47)
        .find((el) => el.closest("[data-header-tone]"));
      setOnDark(hit?.closest("[data-header-tone]")?.getAttribute("data-header-tone") === "dark");
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!groupRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-start justify-between px-5 pt-[25px] md:px-10">
        <a
          href="#top"
          aria-label="Crews, back to top"
          className={`pointer-events-auto flex h-[45px] items-center transition-colors duration-300 ${onDark ? "text-white" : "text-foreground"}`}
        >
          <Logo className="h-[18px]" />
        </a>

        <div
          ref={groupRef}
          className="pointer-events-auto relative flex md:w-60"
        >
          <SweepButton
            href="#contact"
            className="hidden! h-[45px] flex-1 text-[15px] font-medium uppercase tracking-wide md:inline-flex!"
          >
            Book a call
          </SweepButton>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="group relative isolate z-20 grid size-[45px] shrink-0 place-items-center overflow-hidden bg-foreground text-background transition-colors duration-150 hover:text-accent-ink focus-visible:text-accent-ink"
          >
            {/* Same sweep fill as SweepButton. */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300 group-focus-visible:scale-x-100"
            />
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ease-lens ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ease-lens ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.nav
                id="site-menu"
                aria-label="Main"
                initial={{ clipPath: CLOSED }}
                animate={{ clipPath: OPEN, transition: { duration: 0.45, ease } }}
                exit={{ clipPath: CLOSED, transition: { duration: 0.25, ease } }}
                className="absolute right-0 top-0 z-10 h-[27rem] w-[calc(100vw-2.5rem)] bg-foreground text-background md:w-full"
              >
                <ul className="flex flex-col gap-[9px] px-5 pt-[70px]">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease, delay: 0.08 + i * 0.04 },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center text-[15px] font-medium uppercase leading-[21px] tracking-wide"
                      >
                        <span className="inline-flex w-0 overflow-hidden text-accent opacity-0 transition-all duration-300 ease-lens group-hover:w-6 group-hover:opacity-100 group-focus-visible:w-6 group-focus-visible:opacity-100">
                          <ArrowRight className="size-[18px]" />
                        </span>
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
