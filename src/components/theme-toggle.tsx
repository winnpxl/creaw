"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the layout script.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

/** Point the favicon at the variant for the active site theme. */
function syncFavicon(t: Theme) {
  const href = `/brand/favicon-${t}.svg`;
  document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((link) => {
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
  });
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {}
}

/**
 * Switch theme with a Star Wars–style wipe: the new theme is revealed behind a
 * hard vertical edge sweeping left → right (View Transitions API; animation in
 * globals.css). Falls back to an instant switch when unsupported or when the
 * visitor prefers reduced motion.
 */
export function switchTheme(t: Theme) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) {
    setTheme(t);
    return;
  }
  document.documentElement.classList.add("theme-wipe");
  const vt = document.startViewTransition(() => setTheme(t));
  vt.finished.finally(() => document.documentElement.classList.remove("theme-wipe"));
}

/**
 * Square sun/moon toggle using the Kubai icons (brand green, public/icons/theme).
 * Sweep fill is the text color, not green, so the green icon stays visible.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "sun" : "moon";

  // Runs after hydration (and on every theme change), so React never sees a
  // mismatch. Next can stream its icon <link> in later, so keep watching <head>.
  useEffect(() => {
    syncFavicon(theme);
    const mo = new MutationObserver(() => syncFavicon(theme));
    mo.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    return () => mo.disconnect();
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => switchTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="group relative isolate grid size-[45px] shrink-0 place-items-center overflow-hidden border border-line bg-background"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-foreground transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300 group-focus-visible:scale-x-100"
      />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={icon}
          src={`/icons/theme/${icon}.svg`}
          alt=""
          width={30}
          height={30}
          draggable={false}
          className="size-[30px] select-none transition-transform duration-500 ease-lens group-hover:rotate-[20deg] group-hover:scale-110"
          initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        />
      </AnimatePresence>
    </button>
  );
}
