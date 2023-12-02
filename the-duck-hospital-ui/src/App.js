import { SnackbarProvider } from "notistack";
import Router from "./routes";
import CustomThemeProvider from "./theme";

function App() {
  return (
    <CustomThemeProvider>
      <SnackbarProvider
        autoHideDuration={1000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Router />
      </SnackbarProvider>
    </CustomThemeProvider>
  );
}

export default App;
