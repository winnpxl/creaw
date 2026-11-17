// SVGs are rendered as CSS masks filled with `currentColor`, so they always
// take the text color of whatever they sit in (buttons, links, dark sections).
// Source files: /public/brand and /public/icons.

function MaskIcon({
  src,
  className,
  label,
}: {
  src: string;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

/** Wordmark, 130×26 (5:1). Set height via className; width follows. */
export function Logo({ className }: { className?: string }) {
  return (
    <MaskIcon
      src="/brand/crews-logo.svg"
      label="Crews"
      className={`aspect-[5/1] h-5 ${className ?? ""}`}
    />
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <MaskIcon src="/icons/arrow-right.svg" className={`size-5 ${className ?? ""}`} />
  );
}
