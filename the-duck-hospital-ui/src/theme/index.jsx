import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, responsiveFontSizes } from "@mui/material";
import React from "react";

import typography from "./typography";

function CustomThemeProvider(props) {
  const themeOptions = {
    palette: {
      primary: {
        main: "#006451",
      },
      oldPrimary: {
        main: "#42a5f5",
      },
      teal: {
        darker: "#033A2A",
        main: "#006451",
        lighter: "#86C8BC",
      },
      green: {
        main: "#EAFFD0",
      },
      peach: {
        main: "#F38181",
      },
      yellow: {
        main: "#FCE38A",
      },
      text: {
        teal: "#006451",
        green: "#EAFFD0",
        peach: "#F38181",
        yellow: "#FCE38A",
        oldPrimary: "#42a5f5",
      },
    },
    typography,
  };

  let theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
