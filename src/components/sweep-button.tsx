import { ArrowRight } from "@/components/brand";

/**
 * Button/link with the sweep hover: a fill wipes in from the left (300ms),
 * the label flips color instantly, and an arrow slides in before the label.
 * On leave the fill retracts back to the left (200ms).
 */

type Tone = "light" | "dark" | "accent";

const tones: Record<Tone, { base: string; fill: string; hover: string }> = {
  light: {
    base: "border border-line bg-background text-foreground",
    fill: "bg-accent",
    hover: "group-hover:text-accent-ink group-focus-visible:text-accent-ink",
  },
  dark: {
    base: "bg-foreground text-background",
    fill: "bg-accent",
    hover: "group-hover:text-accent-ink group-focus-visible:text-accent-ink",
  },
  accent: {
    base: "bg-accent text-accent-ink",
    fill: "bg-white",
    hover: "group-hover:text-[#0f0f0f] group-focus-visible:text-[#0f0f0f]",
  },
};

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  /** Show the slide-in arrow before the label. */
  arrow?: boolean;
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
);

export function SweepButton({ children, tone = "light", className, arrow = true, ...rest }: Props) {
  const t = tones[tone];
  const cls = `group relative isolate inline-flex items-center justify-center overflow-hidden outline-none ${t.base} ${className ?? ""}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:duration-300 group-focus-visible:scale-x-100 ${t.fill}`}
      />
      <span className={`relative flex items-center ${t.hover}`}>
        {arrow && (
          <span
            aria-hidden
            className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-200 ease-out group-hover:w-[1.4em] group-hover:opacity-100 group-hover:duration-300 group-focus-visible:w-[1.4em] group-focus-visible:opacity-100"
          >
            <ArrowRight className="size-[1.1em] -translate-x-2 transition-transform duration-300 ease-out group-hover:translate-x-0" />
          </span>
        )}
        {children}
      </span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {inner}
    </button>
  );
}
