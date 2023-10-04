import Router from "./routes";
import CustomThemeProvider from "./theme";

function App() {
  return (
    <CustomThemeProvider>
      <Router />
    </CustomThemeProvider>
  );
}

export default App;
