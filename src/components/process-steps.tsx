"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

export type Step = { step: string; body: string; icon?: string | StaticImageData };

// Static SVG imports resolve to a URL string under Turbopack, an object under webpack.
const iconSrc = (icon?: string | StaticImageData) =>
  typeof icon === "string" ? icon : icon?.src;

const STEP_MS = 3000;
const ICON = 100; // px
const OFFSET = 14; // gap between cursor tip and icon

/**
 * Process steps on one continuous rule. The active step's segment fills like a
 * timer; after 3s the next step takes over, looping forever. Hovering a step
 * holds it active until the pointer leaves, and shows that step's icon trailing
 * the cursor (kept inside the hovered step). Starts at 01 when scrolled into view.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  // Bumped on every (re)start so the timer fill restarts from 0.
  const [run, setRun] = useState(0);

  // Cursor-follow icon position (relative to the list), sprung for a soft trail.
  const x = useSpring(0, { stiffness: 350, damping: 28, mass: 0.6 });
  const y = useSpring(0, { stiffness: 350, damping: 28, mass: 0.6 });
  // Lean into horizontal movement.
  const rotate = useTransform(useVelocity(x), [-1500, 0, 1500], [-14, 0, 14], { clamp: true });

  useEffect(() => {
    if (!inView || held !== null) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % steps.length);
      setRun((r) => r + 1);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [inView, held, active, run, steps.length]);

  /** Place the icon just past the cursor, clamped inside the hovered step. */
  const follow = (e: React.PointerEvent<HTMLLIElement>, jump = false) => {
    const list = ref.current;
    if (!list) return;
    const lr = list.getBoundingClientRect();
    const cr = e.currentTarget.getBoundingClientRect();
    const minX = cr.left - lr.left;
    const minY = cr.top - lr.top;
    const maxX = Math.max(minX, cr.right - lr.left - ICON);
    const maxY = Math.max(minY, cr.bottom - lr.top - ICON);
    const nx = Math.min(maxX, Math.max(minX, e.clientX - lr.left + OFFSET));
    const ny = Math.min(maxY, Math.max(minY, e.clientY - lr.top + OFFSET));
    if (jump) {
      x.jump(nx);
      y.jump(ny);
    } else {
      x.set(nx);
      y.set(ny);
    }
  };

  const current = held ?? active;
  const heldIcon = held !== null ? iconSrc(steps[held]?.icon) : undefined;

  return (
    <ol ref={ref} className="relative grid gap-y-10 md:grid-cols-4 md:gap-y-0">
      {steps.map((s, i) => {
        const on = current === i;
        return (
          <li
            key={s.step}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return setHeld(i);
              // First entry: appear at the cursor; moving between steps: glide over.
              follow(e, held === null);
              setHeld(i);
            }}
            onPointerMove={(e) => e.pointerType === "mouse" && follow(e)}
            onPointerLeave={() => {
              // Resume the loop from the step that was hovered, fresh timer.
              setActive(i);
              setHeld(null);
              setRun((r) => r + 1);
            }}
            className="relative cursor-default pr-6 pt-6"
          >
            {/* Rule segment (segments touch to form one line) + timer fill. */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
            {on && (
              <motion.span
                key={held === i ? `held-${i}` : `run-${run}-${i}`}
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
                initial={{ scaleX: held === i ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={held === i ? { duration: 0.3, ease: "easeOut" } : { duration: STEP_MS / 1000, ease: "linear" }}
              />
            )}

            <div
              className={`transition-opacity duration-500 ease-lens ${on ? "opacity-100" : "opacity-35"}`}
              aria-current={on ? "step" : undefined}
            >
              <span className="text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-medium">{s.step}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          </li>
        );
      })}

      {/* Floating icon that trails the cursor while a step is hovered. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x, y, rotate, width: ICON, height: ICON }}
      >
        <AnimatePresence mode="popLayout">
          {heldIcon && (
            <motion.img
              key={held}
              src={heldIcon}
              alt=""
              width={ICON}
              height={ICON}
              draggable={false}
              className="size-full select-none"
              initial={{ opacity: 0, scale: 0.3, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 25 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </ol>
  );
}
