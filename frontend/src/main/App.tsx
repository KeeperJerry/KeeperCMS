import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import HeaderComponent from './components/HeaderComponent';
import NavigatorCore from "./cores/NavigatorCore";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#D6D6D6'
    },
    secondary: {
      main: `#E6E6E6`
    },
    text: {
      primary: `#E6E6E6`,
      secondary: `#D6D6D6`,
    }
  }
});

export default function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderComponent/>
        <NavigatorCore/>
      </ThemeProvider>
    </main>
  );
}
