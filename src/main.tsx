import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AdminApp from "./app/AdminApp.tsx";
import "./styles/index.css";
import { handleAuthCallback } from "@netlify/identity";

async function boot() {
  try {
    const result = await handleAuthCallback();
    if (result?.type === "recovery") {
      sessionStorage.setItem("portfolio_recovery", "1");
      if (window.location.pathname !== "/admin") {
        window.history.replaceState({}, "", "/admin");
      }
    }
  } catch (error) {
    console.error("Netlify Identity callback failed", error);
  }

  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  createRoot(root).render(window.location.pathname === "/admin" ? <AdminApp /> : <App />);
}

void boot();
