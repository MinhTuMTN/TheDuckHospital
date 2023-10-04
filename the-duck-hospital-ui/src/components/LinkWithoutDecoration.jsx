import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: ($props) => $props.fontWeight || "normal",

  "&:hover": {
    textDecoration: "underline",
  },
}));

function LinkWithoutDecoration(props) {
  const { children, ...others } = props;
  return <CustomLink {...others}>{children}</CustomLink>;
}

export default LinkWithoutDecoration;
