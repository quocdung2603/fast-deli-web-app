import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./common/context/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";
import "@ant-design/v5-patch-for-react-19";
import "./Lang/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
