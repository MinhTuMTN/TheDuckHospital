import { Stack, Typography } from "@mui/material";
import React from "react";

function WelcomePage() {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <img
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1713930402/support_welcome_foequp.png"
        alt="welcome"
        width="30%"
        style={{ marginTop: "20px" }}
      />
      <Typography
        variant="h2"
        fontWeight={"600"}
        fontSize={"32px"}
        color={"#0184c6"}
      >
        The Duck Hospital
      </Typography>
      <Typography
        variant="body1"
        maxWidth={"70%"}
        textAlign={"center"}
        fontSize={"18px"}
        color={"#989898"}
        marginTop={"8px"}
      >
        Chào mừng bạn đến với The Duck Hospital. Đây là trang trung tâm hỗ trợ
        khách hàng của The Duck Hospital. Hãy chọn một trong các mục bên trái để
        bắt đầu.
      </Typography>
    </Stack>
  );
}

export default WelcomePage;
