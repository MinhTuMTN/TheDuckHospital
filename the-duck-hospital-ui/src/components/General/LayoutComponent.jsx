import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { appColors } from "../../utils/appColorsUtils";
const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 15,
  paddingBottom: 25,
  flex: 1,
  backgroundColor: appColors.backgroundColorMain,
  width: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

const LayoutComponent = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default LayoutComponent;
