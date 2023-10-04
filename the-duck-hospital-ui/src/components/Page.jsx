import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

function Page({ title, children, ...other }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <Box {...other}>{children}</Box>;
}

export default Page;
