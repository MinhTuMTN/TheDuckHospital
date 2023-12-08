import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import React from "react";

function CustomThemeProvider(props) {
  const themeOptions = {
    palette: {
      primary: {
        main: "#006451",
      },
      oldPrimary: {
        main: "#42a5f5",
      },
      oldPrimaryDarker: {
        main: "#064374",
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
        darker: "#6C5604",
        main: "#FCE38A",
      },
      template: {
        darker: "#17496c",
        main: "#0b5394",
        normal1: "	rgb(0, 148, 212)",
        normal2: "#00a9dd",
        normal3: "#6fccea",
        lighter1: "#c7ebf8",
        lighter2: "#9fc5e8",
        lightest: "#cfe2f3",
      },
      normal1: {
        main: "	rgb(0, 148, 212)",
      },
      normal2: {
        main: "#00a9dd",
      },
      delete: {
        main: "#f0857f",
      },
      black: {
        main: "#46555e",
      },
      text: {
        teal: "#006451",
        green: "#EAFFD0",
        peach: "#F38181",
        yellow: "#FCE38A",
        oldPrimary: "#42a5f5",
      },
      white: {
        main: "#fff",
      },
    },
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
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
