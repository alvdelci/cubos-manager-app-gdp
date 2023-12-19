
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "Nunito", "Inter", "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#DA0175" },
    secondary: { main: "#228B22" },
    background: { main: "#F0F0F5" },
    text: { main: "#F8F8F9" },
    title: {main: "#343447"}
  },
});

export default defaultTheme;