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
    name: "Prashanth Bingi",
    role: "Design Engineer · Developer",
    tagline: "I build interfaces where engineering and design become indistinguishable — and the seam disappears.",
  },
  about: {
    headline: "I work at the seam between <accent>design</accent> and <accent>engineering</accent> — where the hardest problems live.",
    bio: [
      "I design and develop websites and digital experiences across UI/UX, frontend development, e-commerce, and performance. I care about the details — from the interface and interaction to the code behind it — and I enjoy turning ideas into websites that are useful, responsive, and built to perform.",
      "My work spans web design, frontend development, backend integration, e-commerce, SEO, and ongoing website maintenance. I’m always looking for better ways to combine thoughtful design with clean, functional development.",
    ],
    stats: [
      { value: "X+", label: "Years Experience" },
      { value: "X+", label: "Projects" },
      { value: "X+", label: "Web Experiences" },
    ],
  },
  skills: [
    { category: "Design", items: ["Figma", "Design Systems", "Motion Design", "Brand Identity", "Prototyping"] },
    { category: "Engineering", items: ["React / Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"] },
    { category: "Toolchain", items: ["Vercel", "AWS", "Framer", "After Effects", "Linear", "Storybook"] },
  ],
  projects: [
    { id: "01", title: "E-COMMERCE WEBSITE", category: "WEB DESIGN · FRONTEND · E-COMMERCE", year: "2023", tags: ["FIGMA", "HTML", "CSS", "JAVASCRIPT"], description: "A responsive e-commerce experience designed for simple product discovery, smooth navigation, and a seamless shopping experience.", accent: "#e8ff00", link: "#" },
    { id: "02", title: "BUSINESS WEBSITE", category: "WEB DESIGN · DEVELOPMENT · SEO", year: "2024", tags: ["FIGMA", "JAVASCRIPT", "SEO"], description: "A modern business website built to communicate the brand clearly while delivering a fast and responsive experience across devices.", accent: "#ff6b35", link: "#" },
    { id: "03", title: "WEB APPLICATION", category: "UI/UX · FRONTEND DEVELOPMENT", year: "2025", tags: ["FIGMA", "REACT", "API"], description: "A functional web interface focused on intuitive navigation, clear information hierarchy, and a smooth user experience.", accent: "#00d4aa", link: "#" },
    { id: "04", title: "E-COMMERCE PLATFORM", category: "FULL-STACK DEVELOPMENT", year: "2025", tags: ["REACT", "NODE.JS", "DATABASE", "PAYMENTS"], description: "An end-to-end commerce experience connecting frontend interfaces, backend functionality, product management, and online payments.", accent: "#c084fc", link: "#" },
  ],
  contact: {
    headline: "Let's build something worth remembering.",
    subtext: "Open to web design and development projects, freelance work, and collaborations with interesting people and teams.",
    email: "prashanthsai949@gmail.com",
    socials: [
      { label: "LinkedIn", handle: "/in/sai-prashanth-bingi-sp01", url: "https://www.linkedin.com/in/sai-prashanth-bingi-sp01" },
      { label: "GitHub", handle: "prashanthbingi-dev", url: "https://github.com/prashanthbingi-dev" },
      { label: "Dribbble", handle: "prashanthbingi", url: "https://dribbble.com/prashanthbingi" },
      { label: "Twitter / X", handle: "@bingidesigns", url: "https://x.com/bingidesigns" },
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
