import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE_CONTENT } from "../content/site";

function AccentText({ text }: { text: string }) {
  return <>{text.split(/(<accent>.*?<\/accent>)/g).map((part, i) => {
    const match = part.match(/^<accent>(.*?)<\/accent>$/);
    return match ? <span key={i} className="text-accent">{match[1]}</span> : <span key={i}>{part}</span>;
  })}</>;
}

const MONO = { fontFamily: "'DM Mono', monospace" };
const DISPLAY = { fontFamily: "'Bricolage Grotesque', sans-serif" };

export default function ClientApp() {
  const [content, setContent] = useState<any>(SITE_CONTENT);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setContent)
      .catch(() => {});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 80 ? "border-b border-border bg-background/95 backdrop-blur-md" : ""}`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-14">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`text-xs tracking-[0.2em] uppercase transition-colors ${scrollY > 80 ? "text-foreground/60 hover:text-foreground" : "text-foreground/70 hover:text-foreground"}`} style={MONO}>{content.identity.name}</button>
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-xs tracking-[0.2em] uppercase transition-colors ${scrollY > 80 ? "text-foreground/60 hover:text-accent" : "text-[#0b0b0a]/80 hover:text-[#0b0b0a]"}`} style={MONO}>{item.label}</button>)}
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`md:hidden inline-flex h-9 w-9 items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${scrollY > 80 ? "text-white" : "text-black"}`}
          >
            {menuOpen ? <X size={19} strokeWidth={2.25} /> : <Menu size={19} strokeWidth={2.25} />}
          </button>
        </div>
        {menuOpen && <div className="md:hidden border-t border-border bg-background px-6 py-10 flex flex-col gap-8">{navItems.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-4xl font-bold tracking-tight hover:text-accent transition-colors" style={DISPLAY}>{item.label}</button>)}</div>}
      </nav>

      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(108deg, #080807 56%, #e8ff00 56%)" }} />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "120px 120px" }} />
        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 pt-28">
          <div className="flex items-center gap-4 mb-5" style={MONO}><div className="w-6 h-px bg-foreground/25" /><span className="text-xs tracking-[0.25em] uppercase text-foreground/35">{content.identity.role}</span></div>
          <h1 className="font-extrabold leading-[0.88] tracking-tight text-foreground mb-10 md:mb-14" style={{ ...DISPLAY, fontSize: "clamp(4.5rem, 13vw, 12rem)" }}>
            {content.identity.name.split(" ").map((word: string, i: number, arr: string[]) => <span key={i} className="block">{word}{i === arr.length - 1 ? "." : ""}</span>)}
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"><p className="text-lg md:text-xl text-foreground/55 max-w-sm leading-relaxed">{content.identity.tagline}</p><button onClick={() => scrollTo("work")} className="group inline-flex items-center gap-2 bg-accent text-background px-7 py-3.5 font-bold text-sm hover:bg-foreground transition-colors shrink-0" style={{ ...MONO, letterSpacing: "0.1em" }}>VIEW WORK <ArrowUpRight size={14} /></button></div>
        </div>
        <div className="absolute bottom-8 right-6 md:right-10 flex items-center gap-3 text-foreground/25" style={MONO}><span className="text-xs tracking-[0.2em] uppercase">Scroll</span><div className="w-8 h-px bg-foreground/20" /></div>
      </section>

      <section id="work" className="px-6 md:px-10 py-24 md:py-36">
        <SectionHeader label="Selected Work" aside={`${Math.min(...content.projects.map((p: any) => parseInt(p.year) || new Date().getFullYear()))} – ${Math.max(...content.projects.map((p: any) => parseInt(p.year) || new Date().getFullYear()))}`} />
        <div>{content.projects.map((project: any) => {
          const hovered = hoveredProject === project.id;
          const clickable = project.link && project.link !== "#";
          const Tag: any = clickable ? "a" : "div";
          return <Tag key={project.id} href={clickable ? project.link : undefined} target={clickable ? "_blank" : undefined} rel={clickable ? "noopener noreferrer" : undefined} className="group block border-b border-border" onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)} style={{ textDecoration: "none" }}>
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-10 md:py-14">
              <span className="text-xs text-foreground/25 md:w-12 shrink-0 pt-2" style={MONO}>{project.id}</span>
              <div className="flex-1 min-w-0"><div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3"><h3 className="font-extrabold tracking-tight leading-tight transition-colors duration-200" style={{ ...DISPLAY, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", color: hovered ? project.accent : undefined }}>{project.title}</h3><span className="text-xs text-foreground/25 shrink-0" style={MONO}>{project.year}</span></div><div className="flex flex-wrap items-center gap-2 mb-4"><span className="text-xs tracking-[0.18em] uppercase text-foreground/35" style={MONO}>{project.category}</span><span className="text-foreground/20">·</span>{project.tags.map((tag: string) => <span key={tag} className="text-xs px-2 py-0.5 border border-border text-foreground/35" style={MONO}>{tag}</span>)}</div><p className="text-foreground/50 leading-relaxed max-w-xl text-sm md:text-base">{project.description}</p></div>
              <ArrowUpRight size={18} className="shrink-0 mt-2" style={{ color: hovered ? project.accent : "rgba(240,235,227,0.18)" }} />
            </div>
          </Tag>;
        })}</div>
      </section>

      <section id="about" className="bg-card border-t border-b border-border px-6 md:px-10 py-24 md:py-36">
        <SectionHeader label="About" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24"><div><p className="font-bold leading-tight mb-8 text-foreground" style={{ ...DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}><AccentText text={content.about.headline} /></p><div className="space-y-4 text-foreground/50 leading-relaxed text-sm md:text-base">{content.about.bio.map((para: string, i: number) => <p key={i}>{para}</p>)}</div><div className="grid grid-cols-3 gap-6 border-t border-border mt-10 pt-10">{content.about.stats.map((stat: any) => <div key={stat.label}><div className="font-extrabold text-accent mb-1" style={{ ...DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}>{stat.value}</div><div className="text-xs tracking-[0.2em] uppercase text-foreground/30" style={MONO}>{stat.label}</div></div>)}</div></div><div className="space-y-10">{content.skills.map((group: any) => <div key={group.category}><div className="text-xs tracking-[0.25em] uppercase text-foreground/25 border-b border-border pb-3 mb-5" style={MONO}>{group.category}</div><div className="flex flex-wrap gap-2">{group.items.map((item: string) => { const skillId = `${group.category}:${item}`; const pressed = pressedSkill === skillId; return <button type="button" key={skillId} onPointerDown={(event) => { if (event.pointerType === "touch") setPressedSkill(skillId); }} onPointerUp={(event) => { if (event.pointerType === "touch") setPressedSkill(null); }} onPointerCancel={() => setPressedSkill(null)} onPointerLeave={() => setPressedSkill(null)} className={`text-sm px-3 py-2 border transition-colors duration-150 touch-manipulation select-none appearance-none bg-transparent font-inherit focus:outline-none ${pressed ? "border-accent text-accent" : "border-border text-foreground/55 hover:border-accent hover:text-accent"}`} style={MONO}>{item}</button>; })}</div></div>)}</div></div>
      </section>

      <section id="contact" className="px-6 md:px-10 py-24 md:py-36"><SectionHeader label="Contact" /><div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-end"><div><h2 className="font-extrabold leading-[0.92] text-foreground mb-8" style={{ ...DISPLAY, fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>{content.contact.headline}</h2><p className="text-foreground/45 leading-relaxed max-w-xs text-sm md:text-base">{content.contact.subtext}</p></div><div className="space-y-3"><a href={`mailto:${content.contact.email}`} className="group flex items-center justify-between border border-border p-6 hover:border-accent transition-all"><div><div className="text-xs tracking-[0.2em] uppercase text-foreground/30 mb-1" style={MONO}>Email</div><div className="text-lg font-medium group-hover:text-accent">{content.contact.email}</div></div><ArrowUpRight size={18} /></a><div className="grid grid-cols-2 gap-3">{content.contact.socials.map((social: any) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="group border border-border p-4 hover:border-accent transition-all"><div className="text-xs tracking-[0.2em] uppercase text-foreground/25 mb-1.5" style={MONO}>{social.label}</div><div className="text-sm text-foreground/50 group-hover:text-foreground" style={MONO}>{social.handle}</div></a>)}</div></div></div></section>

      <footer className="border-t border-border px-6 md:px-10 py-7 flex items-center justify-between"><span className="text-xs text-foreground/20" style={MONO}>© {new Date().getFullYear()} {content.identity.name} — Designed and built with intention.</span><span className="text-xs text-foreground/15" style={MONO}>React · TypeScript · Tailwind</span></footer>
    </div>
  );
}

function SectionHeader({ label, aside }: { label: string; aside?: string }) {
  return <div className="flex items-center justify-between border-b border-border pb-4 mb-16" style={{ fontFamily: "'DM Mono', monospace" }}><span className="text-xs tracking-[0.25em] uppercase text-foreground/35">{label}</span>{aside && <span className="text-xs text-foreground/25">{aside}</span>}</div>;
}
