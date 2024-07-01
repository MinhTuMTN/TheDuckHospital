import { CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

function PleaseChooseRoom() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
      <CardMedia
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1719376956/point-removebg-preview_l10q0x.png"
        component="img"
        alt="point"
        sx={{ width: "30%" }}
      />
      <Typography
        variant="h5"
        color="textSecondary"
        maxWidth={"30%"}
        textAlign={"center"}
      >
        Vui lòng chọn phòng trực ở thanh điều hướng bên trái để tiếp tục
      </Typography>
    </Stack>
  );
}

export default PleaseChooseRoom;
