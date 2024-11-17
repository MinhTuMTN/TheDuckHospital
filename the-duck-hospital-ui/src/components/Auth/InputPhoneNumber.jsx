import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { checkPhoneOrEmail } from "../../services/customer/AuthServices";

const CustomTextField = styled(TextField)(({ theme }) => ({
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

InputPhoneNumber.propTypes = {
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  setStep: PropTypes.func,
  setLoginType: PropTypes.func,
};

function InputPhoneNumber(props) {
  const { phone, setPhone, setStep, setLoginType } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleCheckPhone = async () => {
    setIsLoading(true);
    const phoneTrim = phone.trim();
    if (!phoneTrim.includes("@")) {
      if (phoneTrim === "") {
        enqueueSnackbar("Vui lòng nhập số điện thoại!", { variant: "error" });
        setIsLoading(false);
        return false;
      }

      if (phoneTrim.length !== 10 || phoneTrim.startsWith("0") === false) {
        enqueueSnackbar("Số điện thoại không hợp lệ!", { variant: "error" });
        setIsLoading(false);
        return false;
      }
    }

    const response = await checkPhoneOrEmail({
      emailOrPhoneNumber: phoneTrim,
    });
    setIsLoading(false);

    if (!response.success) {
      enqueueSnackbar(
        response.statusCode === 400
          ? "Email đăng nhập không tồn tại"
          : "Đã có lỗi xảy ra vui lòng thử lại sau",
        { variant: "error" }
      );
      return;
    }

    if (response.data.data) setLoginType("password");
    else setLoginType("register");

    setStep();
  };
  return (
    <Stack
      direction={"column"}
      spacing={2.25}
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
        Vui lòng nhập số điện thoại để đăng nhập
      </Typography>
      <Box
        sx={{
          padding: "0",
        }}
      >
        <CustomTextField
          id="input-phone-number"
          autoFocus
          variant="outlined"
          placeholder="Số điện thoại"
          size="large"
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheckPhone();
          }}
          autoComplete="off"
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
        {phone === "" ? (
          <FormHelperText error style={{ textAlign: "left", width: "100%" }}>
            Vui lòng nhập số điện thoại!
          </FormHelperText>
        ) : null}
      </Box>
      <CustomButton
        id="btn-continue"
        variant="contained"
        onClick={handleCheckPhone}
        disabled={isLoading}
      >
        Tiếp tục
      </CustomButton>
    </Stack>
  );
}

export default InputPhoneNumber;
