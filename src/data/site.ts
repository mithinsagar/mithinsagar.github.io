export const site = {
  name: "Mithin Sagar S",
  display: "Mithin Sagar",
  first: "Mithin",
  last: "Sagar",
  role: "AI / ML Engineer",
  location: "Chennai, India",
  email: "mithinsagar@gmail.com",
  phone: "+91 63817 90265",
  github: "https://github.com/mithinsagar",
  githubUser: "mithinsagar",
  linkedin: "https://www.linkedin.com/in/mithinsagar",
  huggingface: "https://huggingface.co/mithinsagar",
  instagram: "https://www.instagram.com/mithinsagar11",
  instagramHandle: "@mithinsagar11",
  x: "https://x.com/mithin_sagar",
  xHandle: "@mithin_sagar",
  resume: "/Mithin-Sagar-S-Resume.pdf",
  // Live domain — drives canonical URLs, the sitemap and OG image resolution.
  url: "https://mithinsagar.github.io",

  headline: ["Building intelligent systems", "that solve real-world problems."],
  intro:
    "I work with machine learning, deep learning and generative AI to turn data into useful, reliable products — systems that explain their reasoning instead of asking to be trusted.",

  disciplines: [
    { n: "01", label: "Machine Learning" },
    { n: "02", label: "Deep Learning" },
    { n: "03", label: "Generative AI" },
    { n: "04", label: "AI Engineering" },
  ],

  mantra: ["Data", "Ideas", "Models", "Impact"],
} as const;

export type NavItem = {
  label: string;
  href: string;
  index: string;
  children?: { label: string; href: string; note: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/", index: "01" },
  { label: "About", href: "/about", index: "02" },
  { label: "Projects", href: "/projects", index: "03" },
  { label: "Experience", href: "/experience", index: "04" },
  { label: "Research", href: "/research", index: "05" },
  {
    label: "More",
    href: "/leadership",
    index: "06",
    children: [
      { label: "Leadership", href: "/leadership", note: "People, teams, events" },
      { label: "Achievements", href: "/achievements", note: "Awards & certifications" },
      { label: "Photography", href: "/photography", note: "Light, stage, streets" },
      { label: "Currently", href: "/currently", note: "What I’m on right now" },
      { label: "Contact", href: "/contact", note: "Let’s talk" },
    ],
  },
];

export const flatNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Research", href: "/research" },
  { label: "Leadership", href: "/leadership" },
  { label: "Achievements", href: "/achievements" },
  { label: "Photography", href: "/photography" },
  { label: "Currently", href: "/currently" },
  { label: "Contact", href: "/contact" },
];
