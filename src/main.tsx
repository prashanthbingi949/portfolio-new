import { createRoot } from "react-dom/client";
import AdminApp from "./app/AdminApp.tsx";
import ClientApp from "./app/ClientApp.tsx";
import "./styles/index.css";
import { handleAuthCallback } from "@netlify/identity";

async function boot() {
  try {
    const result = await handleAuthCallback();
    if (result?.type === "recovery" && window.location.pathname !== "/admin") {
      window.history.replaceState({}, "", "/admin");
    }
  } catch (error) {
    console.error("Netlify Identity callback failed", error);
  }

  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  createRoot(root).render(window.location.pathname.startsWith("/admin") ? <AdminApp /> : <ClientApp />);
}

void boot();
