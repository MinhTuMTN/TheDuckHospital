import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 1),
  borderRadius: theme.spacing(1),
}));

function MuiButton(props) {
  const { children, ...others } = props;
  return <CustomButton {...others}>{props.children}</CustomButton>;
}

export default MuiButton;
