import { useEffect, useState } from "react";
import { getUser, handleAuthCallback, login, logout } from "@netlify/identity";
import { SITE_CONTENT } from "../content/site";

const field = "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-lime-300";
const label = "mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500";

export default function AdminApp() {
  const [user, setUser] = useState<any>(null);
  const [content, setContent] = useState<any>(structuredClone(SITE_CONTENT));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    handleAuthCallback().catch(() => {});
    getUser().then(setUser);
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setContent)
      .catch(() => {});
  }, []);

  const projects = content.projects ?? [];
  const socials = content.contact?.socials ?? [];

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const loggedIn = await login(email, password);
      setUser(loggedIn);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  }

  async function save() {
    setSaving(true); setStatus(""); setError("");
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!response.ok) throw new Error(await response.text() || "Could not save changes");
      setStatus("Saved. Your live website has been updated.");
    } catch (err: any) {
      setError(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateProject(index: number, patch: any) {
    setContent((current: any) => ({
      ...current,
      projects: current.projects.map((project: any, i: number) => i === index ? { ...project, ...patch } : project),
    }));
  }

  function addProject() {
    setContent((current: any) => ({
      ...current,
      projects: [...current.projects, {
        id: String(current.projects.length + 1).padStart(2, "0"),
        title: "New Project",
        category: "Category",
        year: String(new Date().getFullYear()),
        tags: [],
        description: "Describe the project here.",
        accent: "#e8ff00",
        link: "#",
      }],
    }));
  }

  function removeProject(index: number) {
    setContent((current: any) => ({ ...current, projects: current.projects.filter((_: any, i: number) => i !== index) }));
  }

  function updateSocial(index: number, patch: any) {
    setContent((current: any) => ({
      ...current,
      contact: {
        ...current.contact,
        socials: current.contact.socials.map((social: any, i: number) => i === index ? { ...social, ...patch } : social),
      },
    }));
  }

  function addSocial() {
    setContent((current: any) => ({
      ...current,
      contact: {
        ...current.contact,
        socials: [...(current.contact?.socials ?? []), { label: "New Social", handle: "@username", url: "https://" }],
      },
    }));
  }

  function removeSocial(index: number) {
    setContent((current: any) => ({
      ...current,
      contact: {
        ...current.contact,
        socials: current.contact.socials.filter((_: any, i: number) => i !== index),
      },
    }));
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
        <form onSubmit={submitLogin} className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-300 mb-3">Private area</p>
          <h1 className="text-4xl font-bold mb-2">Website Manager</h1>
          <p className="text-zinc-400 mb-8">Sign in to update this website.</p>
          <label className={label}>Email<input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label className={`${label} mt-5`}>Password<input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
          <button className="mt-6 w-full rounded-xl bg-lime-300 px-4 py-3 font-semibold text-zinc-950 hover:bg-lime-200">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div><p className="text-xs uppercase tracking-[0.25em] text-lime-300">Website Manager</p><p className="text-sm text-zinc-500">{user.email}</p></div>
          <div className="flex gap-3"><a href="/" className="rounded-xl border border-zinc-700 px-4 py-2 text-sm">View site</a><button onClick={() => logout().then(() => setUser(null))} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm">Log out</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
          <h2 className="text-2xl font-semibold">Basic information</h2>
          <p className="mt-1 text-sm text-zinc-400">These fields control the main hero section.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <label className={label}>Name<input className={field} value={content.identity.name} onChange={(e) => setContent({ ...content, identity: { ...content.identity, name: e.target.value } })} /></label>
            <label className={label}>Role<input className={field} value={content.identity.role} onChange={(e) => setContent({ ...content, identity: { ...content.identity, role: e.target.value } })} /></label>
            <label className="md:col-span-2"><span className={label}>Tagline</span><textarea className={`${field} min-h-28`} value={content.identity.tagline} onChange={(e) => setContent({ ...content, identity: { ...content.identity, tagline: e.target.value } })} /></label>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
          <h2 className="text-2xl font-semibold">About</h2>
          <div className="mt-7 space-y-5">
            <label><span className={label}>Headline</span><textarea className={`${field} min-h-24`} value={content.about.headline} onChange={(e) => setContent({ ...content, about: { ...content.about, headline: e.target.value } })} /></label>
            {content.about.bio.map((paragraph: string, i: number) => <label key={i}><span className={label}>Paragraph {i + 1}</span><textarea className={`${field} min-h-28`} value={paragraph} onChange={(e) => setContent({ ...content, about: { ...content.about, bio: content.about.bio.map((item: string, j: number) => j === i ? e.target.value : item) } })} /></label>)}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold">Projects</h2><p className="mt-1 text-sm text-zinc-400">Edit or add work without touching code.</p></div><button onClick={addProject} className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950">+ Add project</button></div>
          <div className="mt-7 space-y-6">
            {projects.map((project: any, i: number) => <div key={`${project.id}-${i}`} className="rounded-2xl border border-zinc-800 p-5">
              <div className="flex items-center justify-between"><h3 className="font-semibold">Project {i + 1}</h3><button onClick={() => removeProject(i)} className="text-xs text-red-300">Remove</button></div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label><span className={label}>Title</span><input className={field} value={project.title} onChange={(e) => updateProject(i, { title: e.target.value })} /></label>
                <label><span className={label}>Category</span><input className={field} value={project.category} onChange={(e) => updateProject(i, { category: e.target.value })} /></label>
                <label><span className={label}>Year</span><input className={field} value={project.year} onChange={(e) => updateProject(i, { year: e.target.value })} /></label>
                <label><span className={label}>Project URL</span><input className={field} value={project.link} onChange={(e) => updateProject(i, { link: e.target.value })} /></label>
                <label className="md:col-span-2"><span className={label}>Description</span><textarea className={`${field} min-h-24`} value={project.description} onChange={(e) => updateProject(i, { description: e.target.value })} /></label>
                <label className="md:col-span-2"><span className={label}>Tags (comma separated)</span><input className={field} value={project.tags.join(", ")} onChange={(e) => updateProject(i, { tags: e.target.value.split(",").map((x: string) => x.trim()).filter(Boolean) })} /></label>
              </div>
            </div>)}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
          <div className="flex items-center justify-between gap-4">
            <div><h2 className="text-2xl font-semibold">Contact & Social Links</h2><p className="mt-1 text-sm text-zinc-400">Manage the email and social profiles shown on the public website.</p></div>
            <button onClick={addSocial} className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950">+ Add social link</button>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <label><span className={label}>Email</span><input className={field} value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} /></label>
            <label><span className={label}>Contact headline</span><input className={field} value={content.contact.headline} onChange={(e) => setContent({ ...content, contact: { ...content.contact, headline: e.target.value } })} /></label>
          </div>
          <div className="mt-7 space-y-5">
            {socials.map((social: any, i: number) => (
              <div key={`${social.label}-${i}`} className="rounded-2xl border border-zinc-800 p-5">
                <div className="flex items-center justify-between gap-4 mb-5"><h3 className="font-semibold">Social link {i + 1}</h3><button onClick={() => removeSocial(i)} className="text-xs text-red-300">Remove</button></div>
                <div className="grid gap-5 md:grid-cols-3">
                  <label><span className={label}>Platform</span><input className={field} value={social.label} onChange={(e) => updateSocial(i, { label: e.target.value })} /></label>
                  <label><span className={label}>Display handle</span><input className={field} value={social.handle} onChange={(e) => updateSocial(i, { handle: e.target.value })} /></label>
                  <label><span className={label}>URL</span><input className={field} type="url" placeholder="https://..." value={social.url} onChange={(e) => updateSocial(i, { url: e.target.value })} /></label>
                </div>
              </div>
            ))}
            {socials.length === 0 && <div className="rounded-2xl border border-dashed border-zinc-700 p-6 text-sm text-zinc-500">No social links yet. Click “Add social link” to create one.</div>}
          </div>
        </section>

        <div className="sticky bottom-4 flex justify-end"><div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-3 backdrop-blur">{status && <span className="text-sm text-lime-300">{status}</span>}{error && <span className="text-sm text-red-300">{error}</span>}<button onClick={save} disabled={saving} className="rounded-xl bg-lime-300 px-6 py-3 font-semibold text-zinc-950 disabled:opacity-50">{saving ? "Saving…" : "Save changes"}</button></div></div>
      </main>
    </div>
  );
}
