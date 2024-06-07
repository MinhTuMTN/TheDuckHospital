import { Stack, Typography } from "@mui/material";
import React from "react";

function AlreadyPaid() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <img
        alt="alreadyPaid"
        width={"350px"}
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1717658960/2005.i402.001_winner_people_flat_icons-13_n2rwjx-Square-removebg-preview_pt6cse.png"
      />
      <Typography
        variant="h4"
        color="text"
        align="center"
        fontSize={"22px"}
        fontWeight={400}
      >
        Hoá đơn này đã được thanh toán
      </Typography>
    </Stack>
  );
}

export default AlreadyPaid;
