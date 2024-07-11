import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { routes } from "./routes/routes.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={routes} />
    <ToastContainer/>
  </ThemeProvider>
);
