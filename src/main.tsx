import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";  // <-- import your provider
import "./index.css";

// Wrap App with AuthProvider
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);