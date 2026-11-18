"use client";

import { ReactLenis } from "lenis/react";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
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
