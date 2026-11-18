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
  heading: "Pick your crew. Pay one flat monthly price.",
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
      name: "Crew",
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
