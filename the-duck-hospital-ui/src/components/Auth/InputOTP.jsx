import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

const yourPhone = "0123456789";

const CustomTextFieldPhone = styled(TextField)(({ theme }) => ({
  width: "390px",
  height: "50px",
  backgroundColor: "#f2f2f2",
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

const CustomOTPItem = styled(TextField)(({ theme }) => ({
  "& div": {
    display: "block",
    width: "50px",
    height: "50px",
    textAlign: "center",
  },

  "& input": {
    display: "flex",
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: "1rem",
  },
}));

function InputOTP(props) {
  const [timeLeft, setTimeLeft] = React.useState(300);
  const [errorText, setErrorText] = React.useState("");

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);

  const handleLogin = () => {
    const isAnyEmpty = otp.some((value) => {
      console.log(value);
      return value === "" || value === undefined || value === null;
    });

    if (isAnyEmpty) {
      setErrorText("Vui lòng nhập đầy đủ mã OTP!");
    } else {
      setErrorText("");
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value[value.length - 1];
    console.log(index, value, newOtp);

    // Kiểm tra nếu giá trị nhập vào không phải là số thì không cập nhật
    if (!isNaN(value) && value !== "") {
      setOtp(newOtp);
      setErrorText("");

      // Nếu giá trị nhập vào là số thì chuyển focus đến ô tiếp theo
      if (index < otp.length - 1 && value !== "") {
        console.log(2);
        document.getElementsByName(`otp-${index + 1}`)[0].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    console.log(index, e.key);
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";

      setOtp(newOtp);

      if (index > 0) {
        document.getElementsByName(`otp-${index - 1}`)[0].focus();
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }
    // Đếm ngược thời gian
    const timer = setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    // Clear timeout khi component bị hủy
    return () => clearTimeout(timer);
  }, [timeLeft]);

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
        Vui lòng nhập mã 6 số đã gửi cho bạn qua số điện thoại
      </Typography>

      <CustomTextFieldPhone
        variant="outlined"
        size="large"
        disabled
        value={yourPhone}
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
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          width: "390px",
        }}
      >
        {otp.map((value, index) => (
          <CustomOTPItem
            key={index}
            variant="outlined"
            size="large"
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            name={`otp-${index}`}
          />
        ))}
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
      <Box>
        {timeLeft > 0 ? (
          <Typography
            style={{
              color: "red",
            }}
          >
            Mã sẽ hết hạn sau{" "}
            {Math.floor(timeLeft / 60) < 10
              ? "0" + Math.floor(timeLeft / 60)
              : Math.floor(timeLeft / 60)}
            :
            {Math.floor(timeLeft % 60) < 10
              ? "0" + Math.floor(timeLeft % 60)
              : Math.floor(timeLeft % 60)}
          </Typography>
        ) : (
          <Typography
            style={{
              color: "red",
            }}
          >
            Mã OTP đã hết hạn. Vui lòng thử lại sau!
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default InputOTP;
