import { createRoot } from "react-dom/client";
import AdminApp from "./app/AdminApp.tsx";
import ClientApp from "./app/ClientApp.tsx";
import "./styles/index.css";
import { handleAuthCallback } from "@netlify/identity";

async function boot() {
  const recoveryRequested = /(?:recovery_token|invite_token)=/.test(window.location.hash) || sessionStorage.getItem("portfolio_recovery") === "1";

  try {
    const result = await handleAuthCallback();
    if (result?.type === "recovery" || recoveryRequested) {
      sessionStorage.setItem("portfolio_recovery", "1");
    }
  } catch (error) {
    console.error("Netlify Identity callback failed", error);
  }

  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  createRoot(root).render(
    window.location.pathname.startsWith("/admin")
      ? <AdminApp recoveryMode={recoveryRequested} />
      : <ClientApp />,
  );
}

void boot();
