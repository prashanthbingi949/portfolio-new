import { createRoot } from "react-dom/client";
import ClientApp from "./app/ClientApp.tsx";
import "./styles/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(<ClientApp />);
