import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import backgroundLogin from "../../assets/background_login.jpg";
import LinkWithoutDecoratLink from "../../components/LinkWithoutDecoration";
import MuiButton from "../../components/MuiButton";
import MuiTextFeild from "../../components/MuiTextFeild";
import Page from "../../components/Page";

const RootPageRegister = styled(Page)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${backgroundLogin})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  [theme.breakpoints.down("sm")]: {
    overflow: "scroll",
  },
}));

const FormRegister = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  backgroundColor: "#ffffffc7",
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[5],
  width: "60%",

  [theme.breakpoints.between("sm", "lg")]: {
    width: "90%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "95%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

function PageRegister(props) {
  return (
    <RootPageRegister title="Đăng ký">
      <FormRegister>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h3">Đăng ký</Typography>
          <Typography variant="body1">
            Tạo tài khoản để khám, chữa bệnh tại The Duck Hospital
          </Typography>
          <Typography variant="body1">
            Bạn đã có tài khoản?{" "}
            <Typography
              component={LinkWithoutDecoratLink}
              to={"/auth/login"}
              color={"teal.main"}
              fontWeight={"bold"}
            >
              Đăng nhập
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <MuiTextFeild
            label="Họ"
            type="text"
            margin="normal"
            sx={{ flexBasis: "30%" }}
          />
          <MuiTextFeild
            sx={{ flexBasis: "69%" }}
            label="Tên"
            type="text"
            margin="normal"
          />
        </Box>

        <MuiTextFeild label="Email" type="email" margin="normal" />
        <MuiTextFeild label="Mật khẩu" type="password" margin="normal" />
        <MuiTextFeild
          label="Nhập lại mật khẩu"
          type="password"
          margin="normal"
        />
        <MuiButton variant="contained" color="oldPrimaryDarker">
          <Typography color={"white"} textTransform={"uppercase"}>
            Đăng ký
          </Typography>
        </MuiButton>
        <Typography
          variant="body2"
          marginTop={2}
          color="teal.main"
          fontWeight={"bold"}
        >
          Bằng việc đăng ký, bạn đã đồng ý với các điều khoản của chúng tôi
        </Typography>
      </FormRegister>
    </RootPageRegister>
  );
}

export default PageRegister;
