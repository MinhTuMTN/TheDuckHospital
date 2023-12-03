import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { register } from "../../services/customer/AuthServices";

const CustomTextFieldPhone = styled(TextField)(({ theme }) => ({
  width: "390px",
  height: "50px",
  backgroundColor: "#f2f2f2",
}));

const CustomTextField = styled(OutlinedInput)(({ theme }) => ({
  width: "390px",
  height: "50px",
  margin: "0px",

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.template.normal1,
      boxShadow: "0px 0px 5px 0px rgba(0, 148, 212, 0.488)",
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  background: theme.palette.oldPrimary.main,
  color: "white",
  width: "390px",
  height: "45px",
  "&:hover": {
    background: theme.palette.oldPrimary.main, // Đổi màu nền khi hover
    boxShadow: "0px 0px 5px 0px rgba(171, 169, 169, 0.75)", // Đổ bóng
    transform: "scale(1.01)", // Scale lên 110%
  },
}));

function Register(props) {
  const { phone } = props;
  const [otp, setOTP] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [errorTextConfirmation, setErrorTextConfirmation] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { setToken } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmationPassword, setShowConfirmationPassword] =
    React.useState(false);

  const handleClickShowConfirmationPassword = () =>
    setShowConfirmationPassword((show) => !show);

  const handleMouseDownConfirmationPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  useEffect(() => {
    if (password.trim() === "") {
      setErrorText("Vui lòng nhập mật khẩu!");
    } else {
      setErrorText("");
    }

    if (passwordConfirmation.trim() === "") {
      setErrorTextConfirmation("Vui lòng xác nhận mật khẩu!");
    } else if (passwordConfirmation !== password) {
      setErrorTextConfirmation("Mật khẩu không khớp!");
    } else {
      setErrorTextConfirmation("");
    }
  }, [passwordConfirmation, password]);

  const handleRegister = async () => {
    if (password.trim() === "") {
      enqueueSnackbar("Vui lòng nhập mật khẩu!", { variant: "error" });
      return;
    }

    if (passwordConfirmation.trim() === "") {
      enqueueSnackbar("Vui lòng xác nhận mật khẩu!", { variant: "error" });
      return;
    }

    if (passwordConfirmation !== password) {
      enqueueSnackbar("Mật khẩu không khớp!", { variant: "error" });
      return;
    }

    if (otp.trim() === "") {
      enqueueSnackbar("Vui lòng nhập mã OTP!", { variant: "error" });
      return;
    }

    if (fullName.trim() === "") {
      enqueueSnackbar("Vui lòng nhập họ và tên!", { variant: "error" });
      return;
    }

    const response = await register({
      phoneNumber: phone,
      password: password,
      otp: otp,
      fullName: fullName,
    });

    if (!response.success) {
      enqueueSnackbar("Đã có lỗi xảy ra vui lòng thử lại sau", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Đăng ký thành công", { variant: "success" });
    setToken(response.data.data);
  };

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingBottom: 5,
      }}
    >
      <Typography
        variant={"body1"}
        style={{ fontWeight: "600", fontSize: "14px" }}
      >
        Vui lòng đăng ký để tiếp tục
      </Typography>

      <CustomTextFieldPhone
        variant="outlined"
        size="large"
        disabled
        value={phone}
        InputProps={{
          startAdornment: (
            <img
              src="https://flagcdn.com/w20/vn.png"
              alt="Vietnam Flag"
              style={{
                width: "30px",
                height: "20px",
                margin: "0px 8px",
              }}
            />
          ),
          style: {
            padding: ".5rem .7rem",
          },
        }}
      />
      <CustomTextField
        autoFocus
        size="large"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <CustomTextField
        size="large"
        placeholder="Nhập họ và tên"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <FormControl sx={{ width: "390px" }} variant="outlined">
        <CustomTextField
          size="large"
          placeholder="Nhập mật khẩu"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          style={{ padding: ".5rem .7rem" }}
          onChange={handleChangePassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{
                  marginRight: "0",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "390px" }} variant="outlined">
        <CustomTextField
          size="large"
          placeholder="Xác nhận mật khẩu"
          id="outlined-adornment-password-confirmation"
          type={showConfirmationPassword ? "text" : "password"}
          style={{ padding: ".5rem .7rem" }}
          onChange={handleChangePasswordConfirmation}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmationPassword}
                onMouseDown={handleMouseDownConfirmationPassword}
                edge="end"
                sx={{
                  marginRight: "0",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Box
        sx={{
          width: "390px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography textAlign={"center"}>
          Bằng việc đăng ký, bạn đã đồng ý với các{" "}
          <span style={{ color: "#0066cc" }}>Điều khoản sử dụng</span> của chúng
          tôi
        </Typography>
      </Box>

      <Box>
        <CustomButton variant="contained" onClick={handleRegister}>
          Đăng ký
        </CustomButton>
        {errorText !== "" ? (
          <FormHelperText
            error
            style={{
              textAlign: "right",
              width: "100%",
              marginTop: "4px",
              paddingLeft: "8px",
            }}
          >
            {errorText}
          </FormHelperText>
        ) : null}
        {errorTextConfirmation !== "" ? (
          <FormHelperText
            error
            style={{
              textAlign: "right",
              width: "100%",
              marginTop: "4px",
              paddingLeft: "8px",
            }}
          >
            {errorTextConfirmation}
          </FormHelperText>
        ) : null}
      </Box>
    </Stack>
  );
}

export default Register;
