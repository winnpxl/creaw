"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type Step = { step: string; body: string };

const STEP_MS = 3000;

/**
 * Process steps on one continuous rule. The active step's segment fills like a
 * timer; after 3s the next step takes over, looping forever. Hovering a step
 * holds it active until the pointer leaves. Starts at 01 when scrolled into view.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  // Bumped on every (re)start so the timer fill restarts from 0.
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || held !== null) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % steps.length);
      setRun((r) => r + 1);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [inView, held, active, run, steps.length]);

  const current = held ?? active;

  return (
    <ol ref={ref} className="grid gap-y-10 md:grid-cols-4 md:gap-y-0">
      {steps.map((s, i) => {
        const on = current === i;
        return (
          <li
            key={s.step}
            onPointerEnter={() => setHeld(i)}
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
    </ol>
  );
}
