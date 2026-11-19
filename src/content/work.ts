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

export type CaseStudy = {
  client: string;
  duration: string;
  platforms: string[];
  /** Live product URL, if public. */
  liveUrl?: string;
  overview: string;
  challenge: string;
  /** What we did, in order. */
  approach: { title: string; text: string }[];
  results: { to: number; suffix?: string; prefix?: string; label: string }[];
  stack: string[];
  /** Gallery shots in /public/work/<slug>/. Placeholders render until added. */
  gallery: { src?: string; caption: string; wide?: boolean }[];
  testimonial?: { quote: string; name: string; role: string };
};

export type ShowcaseProject = {
  slug: string;
  name: string;
  icon: LucideIcon;
  category: string;
  summary: string;
  highlights: { icon: LucideIcon; text: string }[];
  /** Product shot for the right-hand panel. Drop files in /public/work. */
  image?: string;
  /** Placeholder backdrop colors until real images land. */
  colors: [string, string];
  /** Work page (/work) details. */
  year: string;
  outcome: string;
  tags: string[];
  caseStudy: CaseStudy;
};

export const caseStudyHref = (p: Pick<ShowcaseProject, "slug">) => `/work/${p.slug}`;

export const workPage = {
  title: "Work.",
  range: "2024–26©",
  searchPlaceholder: "Search projects…",
};

export const workHeading = "Products we took charge of, completely";

// Placeholder case studies: swap in real clients, numbers and images.
export const showcase: ShowcaseProject[] = [
  {
    slug: "kiln",
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
    year: "2026",
    outcome: "Cut no-shows by 35% – one booking flow across nine venues",
    tags: ["Product Design", "Web Development", "Project Management"],
    caseStudy: {
      client: "Kiln Restaurant Group",
      duration: "14 weeks",
      platforms: ["Web", "iPad"],
      overview:
        "Kiln runs nine neighbourhood restaurants, each with its own booking tool, its own spreadsheet and its own way of handling a busy Friday. We replaced all of it with one reservations platform for guests and one floor app for staff.",
      challenge:
        "Guests booked through four different widgets, a third of tables were lost to no-shows on weekends, and hosts juggled paper maps with a tablet. Any new system had to go live venue by venue without a single night of downtime.",
      approach: [
        { title: "Discover", text: "Two weeks on the floor across five venues: shadowing hosts, timing turns and mapping every way a booking could go wrong." },
        { title: "Design", text: "A single booking flow for guests and a live table map for staff, tested in service on iPads with real hosts." },
        { title: "Build", text: "A Next.js booking site and a React Native floor app on a shared API, with SMS reminders and deposit holds." },
        { title: "Launch", text: "Rolled out one venue a week with on-site training, then handed over a playbook for new openings." },
      ],
      results: [
        { to: 35, suffix: "%", label: "Fewer no-shows" },
        { to: 9, label: "Venues on one flow" },
        { to: 18, suffix: "%", label: "More covers per weekend" },
      ],
      stack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Twilio", "Stripe"],
      gallery: [
        { caption: "Guest booking flow", wide: true },
        { caption: "Live table map" },
        { caption: "Shift overview" },
      ],
      testimonial: {
        quote: "Our hosts stopped firefighting. Friday nights feel calm now, and the tables we used to lose are full.",
        name: "Operations Director",
        role: "Kiln Restaurant Group",
      },
    },
  },
  {
    slug: "marrow",
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
    year: "2025",
    outcome: "A 23-day average study streak – offline-first on iOS and Android",
    tags: ["Product Design", "App Development"],
    caseStudy: {
      client: "Marrow Learning",
      duration: "16 weeks",
      platforms: ["iOS", "Android"],
      overview:
        "Marrow helps university students actually remember their lectures. Students drop in their notes and the app turns them into a five-minute practice session every day.",
      challenge:
        "Students had great notes and no habit of revisiting them. The founders needed an MVP that felt fast, worked on a train with no signal, and gave people a reason to come back tomorrow.",
      approach: [
        { title: "Discover", text: "Interviews with 30 students and a diary study to find when and where revision really happens." },
        { title: "Design", text: "A daily session built around streaks, spaced repetition and one-thumb answers, prototyped and tested weekly." },
        { title: "Build", text: "An offline-first React Native app with an AI pipeline that turns notes into quizzes in seconds." },
        { title: "Launch", text: "A staged beta with three campuses, then a public launch on both app stores." },
      ],
      results: [
        { to: 23, label: "Day average streak" },
        { to: 48, suffix: "%", label: "Still practising at day 30" },
        { to: 12, suffix: "k", label: "Students in the first term" },
      ],
      stack: ["React Native", "Expo", "TypeScript", "SQLite", "OpenAI", "Supabase"],
      gallery: [
        { caption: "Daily practice session", wide: true },
        { caption: "Notes to quiz" },
        { caption: "Streaks and progress" },
      ],
      testimonial: {
        quote: "They treated the product like their own. We went from a pitch deck to a live app with real students in one term.",
        name: "Co-founder",
        role: "Marrow Learning",
      },
    },
  },
  {
    slug: "fieldnote",
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
    year: "2025",
    outcome: "Field reports in under two minutes – forecasts across 1,200 farms",
    tags: ["App Development", "Web Development"],
    caseStudy: {
      client: "Fieldnote Co-operative Network",
      duration: "20 weeks",
      platforms: ["Android", "Web dashboard"],
      overview:
        "Fieldnote gives farming co-ops one place to record soil health, inputs and harvests, and turns those field reports into yield forecasts the whole network can plan around.",
      challenge:
        "Reports were written on paper and typed up weeks later, if at all. Field officers worked on low-end Android phones, often with no signal for hours at a time.",
      approach: [
        { title: "Discover", text: "Field visits with officers across three regions to understand what gets recorded, by whom and on what device." },
        { title: "Design", text: "Big-target forms that work with gloves on, in bright sun, and in three local languages." },
        { title: "Build", text: "An offline-first Android app that queues and syncs on weak signal, plus a web dashboard for co-op managers." },
        { title: "Launch", text: "Trained officer champions in each region who trained the rest, with in-app feedback from day one." },
      ],
      results: [
        { to: 2, suffix: " min", label: "Average field report" },
        { to: 1200, suffix: "+", label: "Farms reporting" },
        { to: 3, label: "Languages supported" },
      ],
      stack: ["Kotlin", "Jetpack Compose", "Next.js", "Python", "PostgreSQL"],
      gallery: [
        { caption: "Field report flow", wide: true },
        { caption: "Co-op dashboard" },
        { caption: "Yield forecast" },
      ],
      testimonial: {
        quote: "For the first time we can see the whole season while it is happening, not months after.",
        name: "Programme Lead",
        role: "Fieldnote Co-operative Network",
      },
    },
  },
  {
    slug: "plinth",
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
    year: "2024",
    outcome: "Repairs resolved twice as fast – one brand system across 40 buildings",
    tags: ["Product Design", "Web Development", "Project Management"],
    caseStudy: {
      client: "Plinth Property Management",
      duration: "18 weeks",
      platforms: ["iOS", "Android", "Web"],
      overview:
        "Plinth manages 40 residential buildings across the city. We designed and built a tenant app for rent and repairs, a maintenance dashboard for the ops team, and one brand system to tie it together.",
      challenge:
        "Repairs arrived by phone, email and WhatsApp and were tracked in a shared inbox. Tenants had no idea what was happening, and every building looked and felt like a different company.",
      approach: [
        { title: "Discover", text: "Mapped every repair from first message to closed job, and audited brand touchpoints across all 40 buildings." },
        { title: "Design", text: "A tenant app with one-tap rent and photo-first repair requests, and a single brand system from app icon to lobby signage." },
        { title: "Build", text: "Cross-platform apps and a triage dashboard that routes jobs to the right contractor automatically." },
        { title: "Launch", text: "Building-by-building onboarding with QR codes in every lobby and a support line for the first month." },
      ],
      results: [
        { to: 2, suffix: "x", label: "Faster repair resolution" },
        { to: 40, label: "Buildings on one system" },
        { to: 87, suffix: "%", label: "Rent paid in-app" },
      ],
      stack: ["React Native", "Next.js", "NestJS", "PostgreSQL", "Stripe"],
      gallery: [
        { caption: "Tenant app home", wide: true },
        { caption: "Repair request" },
        { caption: "Maintenance dashboard" },
      ],
      testimonial: {
        quote: "Tenants can finally see what we are doing for them, and our team spends its time fixing things instead of chasing emails.",
        name: "Head of Operations",
        role: "Plinth Property Management",
      },
    },
  },
];
