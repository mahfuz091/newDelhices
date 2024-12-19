// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/nunito/latin.css";
import "@fontsource/roboto/latin.css";
import "./assets/vendors/fontawesome/css/all.min.css";
import "./assets/vendors/icofont/icofont.min.css";
import "./assets/vendors/tolak-icons/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "tiny-slider/dist/tiny-slider.css";
import "./assets/css/theme.css";
import "./assets/css/responsive.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import ThemeProvider from "./Provider/ThemeProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position='top-right' reverseOrder={false} />
  </ThemeProvider>
);
