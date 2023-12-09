import { Box } from "@mui/material";
import React, { useEffect } from "react";

function Page({ title, children, ...other }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <Box {...other}>{children}</Box>;
}

export default Page;
