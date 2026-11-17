"use client";

import { ReactLenis } from "lenis/react";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

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

/** Splits text into words that rise in from behind a mask, one after another. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  toneFirst = 0,
  toneClass,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  /** Color the first N words with `toneClass` (two-tone headlines). */
  toneFirst?: number;
  toneClass?: string;
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
            className={`inline-block ${i < toneFirst ? (toneClass ?? "") : ""}`}
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
            <span className="text-accent-ink">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
