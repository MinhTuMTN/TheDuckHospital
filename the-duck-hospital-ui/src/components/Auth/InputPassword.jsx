import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const CustomTextFieldPhone = styled(TextField)(({ theme }) => ({
  width: "390px", // Default width for larger screens

  [theme.breakpoints.down("sm")]: {
    width: "350px", // Adjusted width for smaller screens (e.g., width < 600px)
  },
  height: "50px",
  backgroundColor: "#f2f2f2",
}));

const CustomTextFieldPassword = styled(OutlinedInput)(({ theme }) => ({
  width: "390px", // Default width for larger screens

  [theme.breakpoints.down("sm")]: {
    width: "350px", // Adjusted width for smaller screens (e.g., width < 600px)
  },

  height: "50px",

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
  width: "390px", // Default width for larger screens

  [theme.breakpoints.down("sm")]: {
    width: "350px", // Adjusted width for smaller screens (e.g., width < 600px)
  },
  height: "45px",
  "&:hover": {
    background: theme.palette.oldPrimary.main, // Đổi màu nền khi hover
    boxShadow: "0px 0px 5px 0px rgba(171, 169, 169, 0.75)", // Đổ bóng
    transform: "scale(1.01)", // Scale lên 110%
  },
}));

function InputPassword(props) {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.trim() === "") {
      setErrorText("Vui lòng nhập mật khẩu!");
    } else {
      setErrorText("");
    }
  };

  const handleLogin = () => {
    if (password.trim() === "") {
      setErrorText("Vui lòng nhập mật khẩu!");
      setPassword("");
    } else {
      // Thực hiện đăng nhập khi mật khẩu không rỗng
      setErrorText("");
      // TODO: Thêm logic đăng nhập ở đây
    }
  };
  const theme = useTheme();

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Typography
        variant={"body1"}
        style={{ fontWeight: "600", fontSize: "14px" }}
      >
        Vui lòng đăng nhập để tiếp tục
      </Typography>

      <CustomTextFieldPhone
        variant="outlined"
        size="large"
        disabled
        value={props.phone}
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

      <Box
        sx={{
          padding: "0",
        }}
      >
        <FormControl
          sx={{
            width: "390px", // Default width for larger screens

            [theme.breakpoints.down("sm")]: {
              width: "350px", // Adjusted width for smaller screens (e.g., width < 600px)
            },
          }}
          variant="outlined"
        >
          <CustomTextFieldPassword
            autoFocus
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

        <Grid container sx={{ padding: "0", marginTop: "4px" }}>
          <Grid item xs={6} sx={{ padding: "0" }}>
            <Typography
              variant={"body1"}
              type="button"
              style={{
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "left",
                paddingLeft: "8px",
                cursor: "pointer",
              }}
            >
              Đăng nhập bằng OTP
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ paddingRight: "10px" }}>
            <Typography
              variant={"body1"}
              style={{
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "right",
                paddingLeft: "8px",
                cursor: "pointer",
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <CustomButton variant="contained" onClick={handleLogin}>
          Đăng nhập
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
      </Box>
    </Stack>
  );
}

export default InputPassword;
