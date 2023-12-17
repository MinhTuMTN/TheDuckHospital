import { SnackbarProvider } from "notistack";
import AuthProvider from "./auth/AuthProvider";
import Router from "./routes";
import CustomThemeProvider from "./theme";
import { NurseProvider } from "./auth/NurseProvider";
import { DoctorProvider } from "./auth/DoctorProvider";

function App() {
  return (
    <CustomThemeProvider>
      <SnackbarProvider
        autoHideDuration={1000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AuthProvider>
          <NurseProvider>
            <DoctorProvider>
              <Router />
            </DoctorProvider>
          </NurseProvider>
        </AuthProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  );
}

export default App;
