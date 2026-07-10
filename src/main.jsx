import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { AdminAuthProvider } from "./context/AdminAuthContext";

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </BrowserRouter>
);