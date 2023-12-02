import { SnackbarProvider } from "notistack";
import Router from "./routes";
import CustomThemeProvider from "./theme";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <CustomThemeProvider>
      <SnackbarProvider
        autoHideDuration={1000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  );
}

export default App;
