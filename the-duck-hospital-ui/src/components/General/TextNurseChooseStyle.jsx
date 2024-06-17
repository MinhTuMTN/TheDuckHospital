import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
const TextStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: 0.5,
  color: "black",
  textAlign: "left",
  fontSize: 14,
  width: "100%",
}));

const TextNurseChooseStyle = ({ children, ...props }) => {
  return <TextStyled {...props}>{children}</TextStyled>;
};

export default TextNurseChooseStyle;
