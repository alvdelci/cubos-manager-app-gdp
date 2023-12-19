import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import HomeRoutes from "./routes";

import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "./themes/defaultTheme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <HomeRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
