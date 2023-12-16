import { Box, CardMedia } from "@mui/material";
import React from "react";

function LoadingCute(props) {
  return (
    <Box width={"100%"} height={"100%"} display={"flex"}>
      <CardMedia
        src="https://i.redd.it/3oibd39gysz21.gif"
        component="img"
        sx={{
          width: "50%",
          height: "50%",
          objectFit: "contain",
          margin: "auto",
        }}
      />
    </Box>
  );
}

export default LoadingCute;
