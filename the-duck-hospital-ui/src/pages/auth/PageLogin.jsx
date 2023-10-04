import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import backgroundLogin from "../../assets/background_login.jpg";
import welcome from "../../assets/welcome.png";
import MuiButton from "../../components/MuiButton";
import MuiTextFeild from "../../components/MuiTextFeild";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Page from "../../components/Page";

const RootPageLogin = styled(Page)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${backgroundLogin})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}));

const Left = styled(Paper)(({ theme }) => ({
  flex: 3,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 6,
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const FormLogin = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  marginRight: theme.spacing(10),
  width: "50%",
  height: "80%",
  backgroundColor: "white",
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.down("sm")]: {
    width: "80%",
    height: "70%",
    margin: "auto",
  },
}));
function PageLogin(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();
  return (
    <RootPageLogin title="Đăng nhập">
      <Left>
        <Box sx={{ width: "80%" }}>
          <Typography variant="h3">Xin chào</Typography>
          <Typography variant="h4">Chào mừng bạn đã trở lại</Typography>
        </Box>
        <Box
          component="img"
          src={welcome}
          sx={{
            width: "80%",
            height: "50%",
            objectFit: "contain",
            marginTop: "1rem",
          }}
        />
      </Left>
      <Right>
        <FormLogin>
          <Typography variant="h3" color="teal.main">
            Đăng nhập
          </Typography>
          <Typography variant="body1">
            Vui lòng nhập thông tin đăng nhập để tiếp tục
          </Typography>

          <MuiTextFeild
            size="large"
            margin="normal"
            label="Email"
            variant="outlined"
            fullWidth
            autoFocus
            required
          />
          <MuiTextFeild
            margin="normal"
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Typography
              variant="body1"
              color="teal.main"
              fontWeight="bold"
              component={Link}
              to={"/auth/forgot-password"}
            >
              Quên mật khẩu?
            </Typography>
          </Box>
          <MuiButton variant="contained">Đăng nhập</MuiButton>
        </FormLogin>
      </Right>
    </RootPageLogin>
  );
}

export default PageLogin;
