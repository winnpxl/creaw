"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the layout script.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {}
}

/** Square sun/moon toggle in the header's button language (sweep on hover). */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="group relative isolate grid size-[45px] shrink-0 place-items-center overflow-hidden border border-line bg-background text-foreground transition-colors duration-150 hover:text-accent-ink focus-visible:text-accent-ink"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300 group-focus-visible:scale-x-100"
      />
      {theme === "dark" ? (
        <Sun className="size-[18px]" strokeWidth={1.6} />
      ) : (
        <Moon className="size-[18px]" strokeWidth={1.6} />
      )}
    </button>
  );
}
