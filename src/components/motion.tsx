"use client";

import { ReactLenis } from "lenis/react";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/brand";

/** Shared easing: fast start, long soft settle. Most of the "feel" lives here. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Smooth momentum scrolling + respect the OS reduced-motion setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, anchors: { offset: -72 } }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}

/** Header that slides away when scrolling down and returns when scrolling up. */
export function SmartHeader({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease }}
      className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur"
    >
      {children}
    </motion.header>
  );
}

/** Splits text into words that rise in from behind a mask, one after another. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const MotionTag = motion[Tag];

  return (
    <MotionTag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.1em] align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Fade + lift + un-blur when scrolled into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Media frame that un-crops as it enters and drifts slightly while scrolling. */
export function ParallaxMedia({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden rounded-2xl bg-line ${className ?? ""}`}
      initial={{ clipPath: "inset(12% 6% 12% 6% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div
        style={{ y }}
        className="h-[120%] w-full -translate-y-[10%] bg-gradient-to-br from-foreground/5 via-foreground/15 to-foreground/5 transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </motion.div>
  );
}

/** Counts up from 0 when it comes into view. */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/** Endless horizontal ticker. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 text-5xl font-medium tracking-tight md:text-7xl"
          >
            {item}
            <span className="text-accent">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Pill button whose label rolls up on hover, Framer-style. */
export function RollButton({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: string;
  variant?: "dark" | "accent";
}) {
  const styles =
    variant === "dark"
      ? "bg-foreground text-background hover:bg-accent"
      : "bg-accent text-foreground hover:bg-background";
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded px-5 py-2.5 text-sm transition-colors duration-300 ${styles}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <ArrowRight className="-mr-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-rotate-45" />
    </motion.a>
  );
}
