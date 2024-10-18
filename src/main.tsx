import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import "./index.css";
import AuthProvider from "./hooks/useContext/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
