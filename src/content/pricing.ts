// Placeholder plans and prices: adjust to real rates before launch.

export type Plan = {
  name: string;
  /** Monthly price in USD; null = custom quote. */
  monthly: number | null;
  fit: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export const pricing = {
  heading: "Pick your creaw. Pay one flat monthly price.",
  sub: "Three ways to work with us, from $6,500 a month. Pause or cancel any time with 30 days’ notice.",
  quarterlyDiscount: 0.1,
  fineprint: "Prices in USD, excluding tax. Quarterly plans are billed every three months.",
  plans: [
    {
      name: "Launch",
      monthly: 6500,
      fit: "For founders taking a first product from idea to launch.",
      features: [
        "A designer, an engineer and a project manager, three days a week",
        "Bi-weekly demo and progress review",
        "Figma files and production-ready code",
        "Shared Slack channel",
      ],
      cta: "Book a call",
    },
    {
      name: "Creaw",
      monthly: 12000,
      fit: "For teams shipping new features every single week.",
      features: [
        "Designer, two engineers and a project manager",
        "Full time, five days a week",
        "User testing every sprint",
        "Design system in Figma and code",
      ],
      featured: true,
      cta: "Book a call",
    },
    {
      name: "Fleet",
      monthly: null,
      fit: "For platform builds, rebrands and full rebuilds.",
      features: [
        "A team sized to your roadmap",
        "Web, mobile and backend under one roof",
        "In-person kickoff workshops",
        "A dedicated delivery lead",
      ],
      cta: "Get a quote",
    },
  ] satisfies Plan[],
};

// Standalone /pricing page extras.
export const pricingPage = {
  title: "Pricing.",
  meta: "3 plans · Monthly or quarterly",
  compare: {
    heading: "What each plan includes",
    rows: [
      { label: "Team on your project", values: ["3 people", "4 people", "Sized to scope"] },
      { label: "Days a week", values: ["3", "5", "5"] },
      { label: "Project manager", values: ["Yes", "Yes", "Dedicated lead"] },
      { label: "Demos", values: ["Bi-weekly", "Weekly", "Weekly"] },
      { label: "User testing", values: ["On request", "Every sprint", "Every sprint"] },
      { label: "Design system", values: ["Limited to Figma", "Full capacity", "Full capacity"] },
      { label: "Backend and AI features", values: ["—", "On request", "On request"] },
      { label: "In-person workshops", values: ["—", "—", "Yes"] },
      { label: "Notice period", values: ["30 days", "30 days", "30 days"] },
    ],
  },
  faq: {
    heading: "Questions about pricing",
    items: [
      {
        q: "Can we switch plans later?",
        a: "Yes. Move up or down at the start of any month. Most teams start on Launch and move to Creaw once the product has users.",
      },
      {
        q: "Is there a minimum term?",
        a: "No. Plans run month to month and you can pause or cancel with 30 days’ notice. Quarterly plans are billed up front for three months.",
      },
      {
        q: "Do you take fixed-price projects?",
        a: "For a well-defined scope, yes. We’ll send a fixed quote after a short discovery call, usually within two days.",
      },
      {
        q: "Who owns the work?",
        a: "You do, from day one. Figma files, code and documentation live in your own accounts, so there’s no lock-in.",
      },
      {
        q: "What happens after launch?",
        a: "We hand over everything and train your team. Many clients keep a lighter plan to keep shipping improvements.",
      },
      {
        q: "Which currencies do you bill in?",
        a: "We bill in USD by default and can invoice in GBP, EUR or NGN on request.",
      },
    ],
  },
};
