// About page copy. Team, numbers and quote are placeholders: swap in the real creaw.

export const about = {
  title: "Who we are.",
  intro:
    "We’re a creaw of designers, engineers and project managers who take products from first sketch to launch day. One team, one channel, no hand-offs: the people you meet on the first call are the people who ship your product.",
  stats: [
    { to: 3, suffix: "x", label: "Faster from kickoff to launch than a typical agency hand-off." },
    { to: 18, suffix: "+", label: "Years of combined individual experience, merged into one." },
    { to: 40, suffix: "+", label: "Products shipped across hospitality, education, property and more." },
  ],
  team: [
    { name: "Olamide Lawal", role: "Project Manager", tint: ["#c8643b", "#ead7bf"], photo: "/about/olamide-lawal.jpeg" },
    { name: "Ibrahim Habeeb", role: "Software Engineer", tint: ["#4f4fb8", "#cfcaf0"], photo: "/about/ibrahim-habeeb.jpeg" },
    { name: "Wasiu Ajao", role: "AI Engineer", tint: ["#4d7a3a", "#d6e6b8"], photo: "/about/wasiu-ajao.jpeg" },
    { name: "Oluwasegun Samuel", role: "Product Designer", tint: ["#3f6b8f", "#c9dbe8"], photo: "/about/oluwasegun-samuel.jpeg" },
  ] as { name: string; role: string; tint: [string, string]; photo?: string }[],
  quote: {
    text: "Design, code and delivery sit at the same table. Nothing gets lost between teams, because there’s only one team.",
    name: "Olamide Lawal",
    role: "Project Manager",
  },
  feature: {
    to: 40,
    suffix: "+",
    label: "Products shipped since 2020.",
    range: "2020–26©",
    /** Studio photo for the wide image. Drop it in /public/about. */
    image: undefined as string | undefined,
  },
  closing: {
    heading:
      "We’re always up for new products and partnerships. Tell us what you’re building, even if it’s just an idea on a napkin.",
    body: "We don’t ship and disappear. We hand over everything, train your team, and stay one message away when you need us.",
    cta: "Start a conversation",
  },
};
