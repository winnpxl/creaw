// Site navigation, shared by the header menu and footer.
// Homepage sections are written as "/#id"; on the homepage itself they become
// "#id" so smooth scrolling handles them (see resolveHref).

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "#contact" }, // the CTA lives on every page
];

export const EMAIL = "hello@crews.studio";

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "TikTok", href: "#" },
];

export function resolveHref(href: string, pathname: string) {
  if (pathname === "/" && href.startsWith("/#")) return href.slice(1);
  if (pathname !== "/" && href === "/#top") return "/";
  return href;
}
