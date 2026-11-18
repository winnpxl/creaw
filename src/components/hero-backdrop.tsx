"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero backdrop: a dithered "terrain" band along the bottom of the hero,
 * capped by a thin horizon line, drifting left forever.
 * The terrain is generated procedurally (no image asset) and tiles seamlessly.
 */

const TILE_W = 1792; // css px; one seamless loop
const CELL = 3; // css px per dither pixel
const SPEED = 32; // px per second

// 4×4 Bayer matrix for ordered dithering.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
);

function hash(x: number, y: number, seed: number) {
  let h = x * 374761393 + y * 668265263 + seed * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Value noise, periodic in x with period `px` lattice cells → seamless tile.
function noise(x: number, y: number, px: number, seed: number) {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const w = (i: number) => ((i % px) + px) % px;
  const a = hash(w(x0), y0, seed), b = hash(w(x0 + 1), y0, seed);
  const c = hash(w(x0), y0 + 1, seed), d = hash(w(x0 + 1), y0 + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function renderTile(height: number, color: string) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cols = TILE_W / CELL;
  const rows = Math.ceil(height / CELL);
  const canvas = document.createElement("canvas");
  canvas.width = TILE_W * dpr;
  canvas.height = rows * CELL * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;

  const base = 8; // lattice period (in x) for the lowest octave
  for (let j = 0; j < rows; j++) {
    const t = j / rows; // 0 at horizon, 1 at bottom
    for (let i = 0; i < cols; i++) {
      const u = (i / cols) * base;
      const v = (j / cols) * base * 3.2;
      let n = 0, amp = 0.55, f = 1, total = 0;
      for (let o = 0; o < 4; o++) {
        n += noise(u * f, v * f, base * f, o + 1) * amp;
        total += amp;
        amp *= 0.5;
        f *= 2;
      }
      n /= total;
      // Ridges: denser toward the bottom, sparse near the horizon.
      const val = (n - 0.47) * 3.2 + t * 0.5 - 0.1;
      if (val > BAYER[(j % 4) * 4 + (i % 4)]) {
        ctx.fillRect(i * CELL, j * CELL, CELL - 1, CELL - 1);
      }
    }
  }
  return canvas.toDataURL("image/png");
}

export function HeroBackdrop() {
  const bandRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState<{ url: string; h: number } | null>(null);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    let raf = 0;
    let lastH = 0;
    let lastColor = "";
    const draw = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      // Dot color follows the theme (--terrain token).
      const color =
        getComputedStyle(document.documentElement).getPropertyValue("--terrain").trim() ||
        "rgb(32 32 32 / 0.16)";
      if (!h || (Math.abs(h - lastH) < 24 && color === lastColor)) return;
      lastH = h;
      lastColor = color;
      const url = renderTile(h, color);
      if (url) setTile({ url, h });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    const mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      ro.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Dithered terrain band: bottom quarter of the hero. */}
      <div
        ref={bandRef}
        className="absolute inset-x-0 bottom-0 h-1/4 motion-safe:animate-[terrain-drift_var(--terrain-dur)_linear_infinite]"
        style={
          {
            "--terrain-dur": `${TILE_W / SPEED}s`,
            backgroundImage: tile ? `url(${tile.url})` : undefined,
            backgroundSize: tile ? `${TILE_W}px ${tile.h}px` : undefined,
            backgroundRepeat: "repeat-x",
            opacity: tile ? 1 : 0,
            transition: "opacity 1s ease",
          } as React.CSSProperties
        }
      />

      {/* Horizon. */}
      <span className="absolute inset-x-0 bottom-1/4 h-px bg-foreground/[0.12]" />
    </div>
  );
}
