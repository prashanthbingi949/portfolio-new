import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

// =============================================================================
//  PORTFOLIO CONFIG — Edit everything here to make it yours
// =============================================================================

const CONFIG = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: "Alex Reyes",
  role: "Design Engineer · Developer",
  tagline:
    "I build interfaces where engineering and design become indistinguishable — and the seam disappears.",

  // ── Navigation links (label → section id on page) ──────────────────────────
  nav: [
    { label: "Work", sectionId: "work" },
    { label: "About", sectionId: "about" },
    { label: "Contact", sectionId: "contact" },
  ],

  // ── Projects ─────────────────────────────────────────────────────────────────
  // accent: hover color for the project title and arrow
  // link: URL to open when someone clicks; use "#" to disable
  projects: [
    {
      id: "01",
      title: "Meridian Design System",
      category: "Design Engineering",
      year: "2024",
      tags: ["React", "Figma", "TypeScript"],
      description:
        "A comprehensive component library serving 12 product teams with 200+ primitives and a fully-automated documentation site deployed on every merge.",
      accent: "#e8ff00",
      link: "#",
    },
    {
      id: "02",
      title: "Aether Motion Language",
      category: "Motion Design",
      year: "2024",
      tags: ["After Effects", "Lottie", "Web Animation"],
      description:
        "Brand motion guidelines and animation toolkit for a Series B fintech — from micro-interactions to full-screen narrative transitions.",
      accent: "#ff6b35",
      link: "#",
    },
    {
      id: "03",
      title: "Kairo Commerce Platform",
      category: "Full-Stack Development",
      year: "2023",
      tags: ["Next.js", "Postgres", "Stripe"],
      description:
        "End-to-end e-commerce infrastructure handling $4M+ in annual transactions across 40 independent storefronts with sub-80ms p99 latency.",
      accent: "#00d4aa",
      link: "#",
    },
    {
      id: "04",
      title: "Voix — Generative Music",
      category: "Product Design",
      year: "2023",
      tags: ["AI/ML", "React", "Figma"],
      description:
        "0→1 product design for a generative music composition tool — from concept sketches through shipped iOS app with 22k downloads in month one.",
      accent: "#c084fc",
      link: "#",
    },
  ],

  // ── About section ───────────────────────────────────────────────────────────
  about: {
    // The highlighted words ("design", "engineering") are rendered in accent color automatically
    headline: 'I work at the seam between <accent>design</accent> and <accent>engineering</accent> — where the hardest problems live.',
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

  // ── Skills ──────────────────────────────────────────────────────────────────
  skills: [
    {
      category: "Design",
      items: ["Figma", "Design Systems", "Motion Design", "Brand Identity", "Prototyping"],
    },
    {
      category: "Engineering",
      items: ["React / Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
    },
    {
      category: "Toolchain",
      items: ["Vercel", "AWS", "Framer", "After Effects", "Linear", "Storybook"],
    },
  ],

  // ── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    headline: "Let's build something worth remembering.",
    subtext:
      "Available for senior IC roles, design engineering consulting, and the occasional collaboration that sounds too interesting to pass up.",
    email: "alex@reyesdesign.io",
    socials: [
      { label: "LinkedIn", handle: "/in/alexreyes", url: "#" },
      { label: "GitHub", handle: "alexreyes-dev", url: "#" },
      { label: "Dribbble", handle: "alexreyes", url: "#" },
      { label: "Twitter / X", handle: "@reyesdesigns", url: "#" },
    ],
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    credit: "Designed and built with intention.",
    stack: "React · TypeScript · Tailwind",
  },
};

// =============================================================================
//  COMPONENT — No need to edit below this line unless you want to change layout
// =============================================================================

/** Parses a string with <accent>text</accent> tags into React elements */
function AccentText({ text }: { text: string }) {
  const parts = text.split(/(<accent>.*?<\/accent>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<accent>(.*?)<\/accent>$/);
        return match ? (
          <span key={i} className="text-accent">
            {match[1]}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

const MONO = { fontFamily: "'DM Mono', monospace" };
const DISPLAY = { fontFamily: "'Bricolage Grotesque', sans-serif" };

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 80 ? "border-b border-border bg-background/95 backdrop-blur-md" : ""}`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-14">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors"
            style={MONO}
          >
            {CONFIG.name}
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {CONFIG.nav.map(({ label, sectionId }) => (
              <button
                key={sectionId}
                onClick={() => scrollTo(sectionId)}
                className="text-xs tracking-[0.2em] uppercase text-foreground/40 hover:text-accent transition-colors"
                style={MONO}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-10 flex flex-col gap-8">
            {CONFIG.nav.map(({ label, sectionId }) => (
              <button
                key={sectionId}
                onClick={() => scrollTo(sectionId)}
                className="text-left text-4xl font-bold tracking-tight hover:text-accent transition-colors"
                style={DISPLAY}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Diagonal two-tone split background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(108deg, #080807 56%, #e8ff00 56%)" }}
        />
        {/* Subtle noise grain */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "120px 120px",
          }}
        />

        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 pt-28">
          {/* Role badge */}
          <div className="flex items-center gap-4 mb-5" style={MONO}>
            <div className="w-6 h-px bg-foreground/25" />
            <span className="text-xs tracking-[0.25em] uppercase text-foreground/35">
              {CONFIG.role}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-extrabold leading-[0.88] tracking-tight text-foreground mb-10 md:mb-14"
            style={{ ...DISPLAY, fontSize: "clamp(4.5rem, 13vw, 12rem)" }}
          >
            {CONFIG.name.split(" ").map((word, i, arr) => (
              <span key={i} className="block">
                {word}{i === arr.length - 1 ? "." : ""}
              </span>
            ))}
          </h1>

          {/* Tagline + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="text-lg md:text-xl text-foreground/55 max-w-sm leading-relaxed">
              {CONFIG.tagline}
            </p>
            <button
              onClick={() => scrollTo(CONFIG.nav[0].sectionId)}
              className="group inline-flex items-center gap-2 bg-accent text-background px-7 py-3.5 font-bold text-sm hover:bg-foreground transition-colors shrink-0"
              style={{ ...MONO, letterSpacing: "0.1em" }}
            >
              VIEW WORK
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-6 md:right-10 flex items-center gap-3 text-foreground/25" style={MONO}>
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-8 h-px bg-foreground/20" />
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────────────────────────── */}
      <section id="work" className="px-6 md:px-10 py-24 md:py-36">
        <SectionHeader
          label="Selected Work"
          aside={`${Math.min(...CONFIG.projects.map(p => parseInt(p.year)))} – ${Math.max(...CONFIG.projects.map(p => parseInt(p.year)))}`}
        />

        <div>
          {CONFIG.projects.map((project) => {
            const isHovered = hoveredProject === project.id;
            const isLink = project.link && project.link !== "#";
            const Tag = isLink ? "a" : "div";
            const linkProps = isLink ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <Tag
                key={project.id}
                {...linkProps}
                className="group block border-b border-border"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ cursor: isLink ? "pointer" : "default", textDecoration: "none" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-10 md:py-14">
                  {/* Index number */}
                  <span className="text-xs text-foreground/25 md:w-12 shrink-0 pt-2" style={MONO}>
                    {project.id}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                      <h3
                        className="font-extrabold tracking-tight leading-tight transition-colors duration-200"
                        style={{ ...DISPLAY, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", color: isHovered ? project.accent : undefined }}
                      >
                        {project.title}
                      </h3>
                      <span className="text-xs text-foreground/25 shrink-0" style={MONO}>
                        {project.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs tracking-[0.18em] uppercase text-foreground/35" style={MONO}>
                        {project.category}
                      </span>
                      <span className="text-foreground/20">·</span>
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 border border-border text-foreground/35" style={MONO}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-foreground/50 leading-relaxed max-w-xl text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 mt-2 transition-colors duration-200"
                    style={{ color: isHovered ? project.accent : "rgba(240,235,227,0.18)" }}
                  />
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-card border-t border-b border-border px-6 md:px-10 py-24 md:py-36">
        <SectionHeader label="About" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
          {/* Statement + stats */}
          <div>
            <p
              className="font-bold leading-tight mb-8 text-foreground"
              style={{ ...DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              <AccentText text={CONFIG.about.headline} />
            </p>

            <div className="space-y-4 text-foreground/50 leading-relaxed text-sm md:text-base">
              {CONFIG.about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-border mt-10 pt-10">
              {CONFIG.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-extrabold text-accent mb-1"
                    style={{ ...DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-foreground/30" style={MONO}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-10">
            {CONFIG.skills.map((group) => (
              <div key={group.category}>
                <div className="text-xs tracking-[0.25em] uppercase text-foreground/25 border-b border-border pb-3 mb-5" style={MONO}>
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-2 border border-border text-foreground/55 hover:border-accent hover:text-foreground transition-all duration-200 cursor-default"
                      style={MONO}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="px-6 md:px-10 py-24 md:py-36">
        <SectionHeader label="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-end">
          {/* Headline */}
          <div>
            <h2
              className="font-extrabold leading-[0.92] text-foreground mb-8"
              style={{ ...DISPLAY, fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              {CONFIG.contact.headline.split("worth remembering").length > 1 ? (
                <>
                  {CONFIG.contact.headline.split("worth remembering")[0]}
                  <span className="text-accent">worth remembering</span>
                  {CONFIG.contact.headline.split("worth remembering")[1]}
                </>
              ) : (
                CONFIG.contact.headline
              )}
            </h2>
            <p className="text-foreground/45 leading-relaxed max-w-xs text-sm md:text-base">
              {CONFIG.contact.subtext}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            {/* Email */}
            <a
              href={`mailto:${CONFIG.contact.email}`}
              className="group flex items-center justify-between border border-border p-6 hover:border-accent transition-all duration-200"
            >
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-foreground/30 mb-1" style={MONO}>
                  Email
                </div>
                <div className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {CONFIG.contact.email}
                </div>
              </div>
              <ArrowUpRight size={18} className="text-foreground/20 group-hover:text-accent transition-colors" />
            </a>

            {/* Social grid */}
            <div className="grid grid-cols-2 gap-3">
              {CONFIG.contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border p-4 hover:border-accent transition-all duration-200"
                >
                  <div className="text-xs tracking-[0.2em] uppercase text-foreground/25 mb-1.5" style={MONO}>
                    {s.label}
                  </div>
                  <div className="text-sm text-foreground/50 group-hover:text-foreground transition-colors" style={MONO}>
                    {s.handle}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 md:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-foreground/20" style={MONO}>
          © {new Date().getFullYear()} {CONFIG.name} — {CONFIG.footer.credit}
        </span>
        <span className="text-xs text-foreground/15" style={MONO}>
          {CONFIG.footer.stack}
        </span>
      </footer>
    </div>
  );
}

// ── Small reusable section header ─────────────────────────────────────────────
function SectionHeader({ label, aside }: { label: string; aside?: string }) {
  return (
    <div
      className="flex items-center justify-between border-b border-border pb-4 mb-16"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <span className="text-xs tracking-[0.25em] uppercase text-foreground/35">{label}</span>
      {aside && <span className="text-xs text-foreground/25">{aside}</span>}
    </div>
  );
}
