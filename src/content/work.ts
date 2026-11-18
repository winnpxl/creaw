import {
  Building2,
  CalendarCheck,
  ChartColumn,
  ClipboardCheck,
  CreditCard,
  Flame,
  GraduationCap,
  Palette,
  Signal,
  Sparkles,
  Sprout,
  Store,
  UtensilsCrossed,
  WifiOff,
  Wrench,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export type ShowcaseProject = {
  name: string;
  icon: LucideIcon;
  category: string;
  summary: string;
  highlights: { icon: LucideIcon; text: string }[];
  href?: string;
  /** Product shot for the right-hand panel. Drop files in /public/work. */
  image?: string;
  /** Placeholder backdrop colors until real images land. */
  colors: [string, string];
};

export const workHeading = "Products we took charge of, completely";

// Placeholder case studies: swap in real clients, numbers and images.
export const showcase: ShowcaseProject[] = [
  {
    name: "Kiln",
    icon: UtensilsCrossed,
    category: "Hospitality",
    summary: "A reservations platform and floor app for a group of neighbourhood restaurants.",
    highlights: [
      { icon: CalendarCheck, text: "No-shows down 35% with smart reminders" },
      { icon: LayoutGrid, text: "Live table map for every shift" },
      { icon: Store, text: "One booking flow across nine venues" },
    ],
    colors: ["#c8643b", "#ead7bf"],
  },
  {
    name: "Marrow",
    icon: GraduationCap,
    category: "Education",
    summary: "A study app that turns lecture notes into five minutes of daily practice.",
    highlights: [
      { icon: Flame, text: "Average study streak of 23 days" },
      { icon: Sparkles, text: "Quizzes generated from notes in seconds" },
      { icon: WifiOff, text: "Works offline on the commute" },
    ],
    colors: ["#4f4fb8", "#cfcaf0"],
  },
  {
    name: "Fieldnote",
    icon: Sprout,
    category: "Agriculture",
    summary: "A field data tool for farming co-ops tracking soil health and harvests.",
    highlights: [
      { icon: ClipboardCheck, text: "Field reports filed in under two minutes" },
      { icon: ChartColumn, text: "Yield forecasts across 1,200 farms" },
      { icon: Signal, text: "Syncs reliably on weak rural signal" },
    ],
    colors: ["#4d7a3a", "#d6e6b8"],
  },
  {
    name: "Plinth",
    icon: Building2,
    category: "Property",
    summary: "A tenant app and maintenance dashboard for a city-wide property manager.",
    highlights: [
      { icon: Wrench, text: "Repair requests resolved twice as fast" },
      { icon: CreditCard, text: "Rent paid in a single tap" },
      { icon: Palette, text: "One brand system across 40 buildings" },
    ],
    colors: ["#3f6b8f", "#c9dbe8"],
  },
];
