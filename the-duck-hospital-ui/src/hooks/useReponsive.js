import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { createContext, useContext } from "react";

const ReponsiveContext = createContext();

const ReponsiveProvider = ({ children }) => {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ReponsiveContext.Provider
      value={{ isFullScreen, isSmallScreen, isMediumScreen }}
    >
      {children}
    </ReponsiveContext.Provider>
  );
};

export const useReponsive = () => {
  return useContext(ReponsiveContext);
};

export default ReponsiveProvider;
