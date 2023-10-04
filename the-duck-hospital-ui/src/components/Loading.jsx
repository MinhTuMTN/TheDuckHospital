import styled from "@emotion/styled";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Root = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#21212114",
}));

function Loading(props) {
  return (
    <Root>
      <CircularProgress />
    </Root>
  );
}

export default Loading;
