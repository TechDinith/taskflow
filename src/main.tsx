import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { store } from "@/store";
import App from "@/App";
import "@/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
