import styled from "@emotion/styled";
import { Box, CardMedia, Paper, Stack } from "@mui/material";
import React from "react";
//import InputPhoneNumber from "../../components/Auth/InputPhoneNumber";
import Page from "../../components/Page";
//import InputPassword from "../../components/Auth/InputPassword";
import InputOTP from "../../components/Auth/InputOTP";

const urlImage =
  "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701430503/THEDUCK__1_-removebg-preview_iag4sd.png";

const urlBackground =
  "https://id-v121.medpro.com.vn/static/media/cover-14.cdc08a1d.jpg";

const RootPageLogin = styled(Page)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}));

const Left = styled(Box)(({ theme }) => ({
  flex: 6,
  height: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundImage: `url(${urlBackground})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Right = styled(Paper)(({ theme }) => ({
  flex: 4,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  backgroundColor: "#fbfafc",
}));
function LoginPage(props) {
  return (
    <RootPageLogin title="Đăng nhập">
      <Left>
        <Box
          sx={{
            bgcolor: "white",
            width: "50px",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "auto",
            clipPath: "polygon(100% 0, 100% 0%, 100% 100%, 0% 100%)",
            border: "none",
            backgroundColor: "#fbfafc",
          }}
        />
      </Left>
      <Right>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            paddingX: "auto",
            width: "100%",
            height: "100%",
            alignItems: "center",
            paddingTop: "80px",
          }}
        >
          <CardMedia
            component={"img"}
            image={urlImage}
            sx={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              objectPosition: "center",
              marginTop: "20px",
            }}
          />
          <InputOTP />
        </Stack>
      </Right>
    </RootPageLogin>
  );
}

export default LoginPage;
