"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight } from "@/components/brand";

export type Service = {
  no: string;
  title: string;
  body: string;
  /** Small line under the body (e.g. deliverables or a price). */
  meta?: string;
  href?: string;
  /** Portrait image (~3:4). Drop files in /public/services and set the path. */
  image?: string;
  imageAlt?: string;
};

// The fan only follows the pointer on desktop-style devices; touch gets an accordion.
const FAN_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(FAN_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useCanFan() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FAN_QUERY).matches,
    () => false,
  );
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function ServicesFan({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const canFan = useCanFan();

  return (
    <ul role="list" className="flex flex-col gap-2 md:h-[34rem] md:flex-row">
      {services.map((s, i) => {
        const on = active === i;
        const id = `service-${s.no}`;

        return (
          <li
            key={s.no}
            onPointerEnter={() => canFan && setActive(i)}
            onFocusCapture={() => canFan && setActive(i)}
            className={cx(
              "relative overflow-hidden rounded-[12px] border border-line bg-surface",
              "transition-[flex,height] duration-700 ease-lens md:h-auto",
              on ? "h-[22rem] md:flex-[3.4]" : "h-[4.25rem] md:flex-1",
            )}
          >
            {/* Media: grayscale and dimmed until the card gets the room. */}
            <div
              className={cx(
                "absolute inset-0 transition-all duration-700 ease-lens",
                on ? "opacity-100 grayscale-0" : "opacity-40 grayscale",
              )}
            >
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // Placeholder until real images land.
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,var(--color-accent)_0%,transparent_45%)] opacity-30" />
              )}
              <div
                className={cx(
                  "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent transition-opacity duration-700",
                  on ? "opacity-100" : "opacity-0 md:opacity-100",
                )}
              />
            </div>

            {/* Collapsed state (desktop): number + vertical title. */}
            <span
              aria-hidden
              className={cx(
                "pointer-events-none absolute bottom-7 left-6 top-7 z-[6] hidden transition-[opacity,transform] ease-lens md:block",
                on
                  ? "translate-y-4 opacity-0 duration-200"
                  : "translate-y-0 opacity-100 delay-300 duration-500",
              )}
            >
              <span className="block text-xs text-muted">{s.no}</span>
              <span className="absolute bottom-0 left-0 rotate-180 whitespace-nowrap text-xl font-medium tracking-tight [writing-mode:vertical-rl] lg:text-2xl">
                {s.title}
              </span>
            </span>

            {/* Mobile accordion header. */}
            <button
              type="button"
              aria-expanded={on}
              aria-controls={id}
              onClick={() => setActive(on ? -1 : i)}
              className="absolute inset-x-0 top-0 z-10 flex h-[4.25rem] w-full items-center justify-between px-5 text-left md:hidden"
            >
              <span className="text-xl font-medium tracking-tight">{s.title}</span>
              <span
                aria-hidden
                className={cx(
                  "grid size-8 place-items-center rounded-full bg-background transition-transform duration-500",
                  on && "rotate-45",
                )}
              >
                <span className="relative block size-3">
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground" />
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground" />
                </span>
              </span>
            </button>

            {/* Expanded content. */}
            <div
              id={id}
              className={cx(
                "relative z-[5] flex h-full flex-col justify-end p-5 pt-20 transition-opacity duration-500 ease-lens md:p-7",
                on ? "opacity-100" : "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100",
              )}
            >
              <div className="hidden md:block">
                <h3
                  className={cx(
                    "text-2xl font-medium tracking-tight transition-[opacity,transform] ease-lens",
                    on
                      ? "translate-y-0 opacity-100 delay-300 duration-500"
                      : "pointer-events-none absolute translate-y-3 opacity-0 duration-200",
                  )}
                >
                  {s.title}
                </h3>
              </div>
              <div
                className={cx(
                  "transition-all ease-lens md:max-w-[36ch]",
                  on ? "translate-y-0 opacity-100 delay-300 duration-700" : "translate-y-4 opacity-0 duration-150",
                )}
              >
                <p className="mt-2 text-muted md:mt-3">{s.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  {s.meta && <span className="text-xs">{s.meta}</span>}
                  <a
                    href={s.href ?? "#contact"}
                    tabIndex={on ? 0 : -1}
                    className="group/link inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors hover:text-accent"
                  >
                    Take a closer look
                    <ArrowRight className="size-4 transition-transform duration-500 ease-lens group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
