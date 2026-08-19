export const SITE_CONTENT = {
  site: {
    nav: [
      { label: "Work", sectionId: "work" },
      { label: "About", sectionId: "about" },
      { label: "Contact", sectionId: "contact" },
    ],
    workLabel: "Selected Work",
    aboutLabel: "About",
    contactLabel: "Contact",
    scrollLabel: "Scroll",
    viewWorkLabel: "VIEW WORK",
    emailLabel: "Email",
    footerCredit: "Designed and built with intention.",
    footerStack: "React · TypeScript · Tailwind",
    copyrightPrefix: "©",
  },
  identity: {
    name: "Alex Reyes",
    role: "Design Engineer · Developer",
    tagline: "I build interfaces where engineering and design become indistinguishable — and the seam disappears.",
  },
  about: {
    headline: "I work at the seam between <accent>design</accent> and <accent>engineering</accent> — where the hardest problems live.",
    bio: [
      "Five years building products used by hundreds of thousands of people, across fintech, creative tooling, and infrastructure. I care about the craft — the pixel, the interaction, the architecture — and about shipping things that matter.",
      "Previously at Stripe, Figma (contract), and two early-stage startups. Currently open to senior design engineering roles and selective consulting.",
    ],
    stats: [
      { value: "5+", label: "Years" },
      { value: "40+", label: "Projects" },
      { value: "12M+", label: "Users" },
    ],
  },
  skills: [
    { category: "Design", items: ["Figma", "Design Systems", "Motion Design", "Brand Identity", "Prototyping"] },
    { category: "Engineering", items: ["React / Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"] },
    { category: "Toolchain", items: ["Vercel", "AWS", "Framer", "After Effects", "Linear", "Storybook"] },
  ],
  projects: [
    { id: "01", title: "Meridian Design System", category: "Design Engineering", year: "2024", tags: ["React", "Figma", "TypeScript"], description: "A comprehensive component library serving 12 product teams with 200+ primitives and a fully-automated documentation site deployed on every merge.", accent: "#e8ff00", link: "#" },
    { id: "02", title: "Aether Motion Language", category: "Motion Design", year: "2024", tags: ["After Effects", "Lottie", "Web Animation"], description: "Brand motion guidelines and animation toolkit for a Series B fintech — from micro-interactions to full-screen narrative transitions.", accent: "#ff6b35", link: "#" },
    { id: "03", title: "Kairo Commerce Platform", category: "Full-Stack Development", year: "2023", tags: ["Next.js", "Postgres", "Stripe"], description: "End-to-end e-commerce infrastructure handling $4M+ in annual transactions across 40 independent storefronts with sub-80ms p99 latency.", accent: "#00d4aa", link: "#" },
    { id: "04", title: "Voix — Generative Music", category: "Product Design", year: "2023", tags: ["AI/ML", "React", "Figma"], description: "0→1 product design for a generative music composition tool — from concept sketches through shipped iOS app with 22k downloads in month one.", accent: "#c084fc", link: "#" },
  ],
  contact: {
    headline: "Let's build something worth remembering.",
    subtext: "Available for senior IC roles, design engineering consulting, and the occasional collaboration that sounds too interesting to pass up.",
    email: "alex@reyesdesign.io",
    socials: [
      { label: "LinkedIn", handle: "/in/alexreyes", url: "#" },
      { label: "GitHub", handle: "alexreyes-dev", url: "#" },
      { label: "Dribbble", handle: "alexreyes", url: "#" },
      { label: "Twitter / X", handle: "@reyesdesigns", url: "#" },
    ],
  },
} as const;

export function mergeSiteContent(saved: any) {
  if (!saved || typeof saved !== "object") return structuredClone(SITE_CONTENT);
  return {
    ...structuredClone(SITE_CONTENT),
    ...saved,
    site: { ...SITE_CONTENT.site, ...(saved.site ?? {}) },
    identity: { ...SITE_CONTENT.identity, ...(saved.identity ?? {}) },
    about: {
      ...SITE_CONTENT.about,
      ...(saved.about ?? {}),
      bio: Array.isArray(saved.about?.bio) ? saved.about.bio : SITE_CONTENT.about.bio,
      stats: Array.isArray(saved.about?.stats) ? saved.about.stats : SITE_CONTENT.about.stats,
    },
    skills: Array.isArray(saved.skills) ? saved.skills : SITE_CONTENT.skills,
    projects: Array.isArray(saved.projects) ? saved.projects : SITE_CONTENT.projects,
    contact: {
      ...SITE_CONTENT.contact,
      ...(saved.contact ?? {}),
      socials: Array.isArray(saved.contact?.socials) ? saved.contact.socials : SITE_CONTENT.contact.socials,
    },
  };
}
