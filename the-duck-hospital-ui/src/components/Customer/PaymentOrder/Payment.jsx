import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import createTableLine from "./TableLine";
import FormatCurrency from "../../General/FormatCurrency";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../services/customer/BookingServices";
import Loading from "../../General/Loading";
import { enqueueSnackbar } from "notistack";

Payment.propTypes = {
  booking: PropTypes.object,
};

const Body = styled(Grid)(({ theme }) => ({
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "12px",
  paddingBottom: "20px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
}));
const CustomTypographyValue = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  textAlign: "justify",
}));
const CustomTypographyLable = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.text.main,
  textAlign: "justify",
}));
const CustomGridItem = styled(Box)(({ theme }) => ({
  padding: "8px 12px",
  border: "1px solid #1da1f2",
  borderRadius: "8px",
}));
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function Row(props) {
  const { row } = props;
  const textTransformValue =
    row.label.toLowerCase() === "chuyên khoa:" ? "uppercase" : "none";

  const textColorValue =
    row.label.toLowerCase() === "tiền khám:" ? "#109df5" : "#17496c";
  const textFontWeightValue =
    row.label.toLowerCase() === "tiền khám:" ? "500" : "400";
  const isFee = row.label.toLowerCase() === "tiền khám:";

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        sx={{
          minWidth: "150px",
        }}
      >
        <Stack direction={"row"} spacing={0.7} alignItems={"center"}>
          {row.icon}
          <CustomTypographyLable variant="subtitle1">
            {row.label}
          </CustomTypographyLable>
        </Stack>
      </Stack>
      <CustomTypographyValue
        variant="subtitle1"
        textTransform={textTransformValue}
        sx={{
          color: textColorValue,
          fontWeight: textFontWeightValue,
        }}
      >
        {isFee ? <FormatCurrency amount={row.value} /> : row.value}
      </CustomTypographyValue>
    </Stack>
  );
}

function Payment(props) {
  const { schedules, profile } = props;
  const navigate = useNavigate();
  let total = 0;
  const tableLines = schedules.map((item) => {
    total += item?.doctor.price;
    return createTableLine(item);
  });
  const theme = useTheme();
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("VNPAY");

  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const response = await createBooking({
      patientProfileId: profile.patientProfileId,
      timeSlotIds: schedules.map((schedule) => schedule.timeSlot.timeSlotId),
      paymentMethod: paymentMethod,
      mobile: false,
    });
    setIsLoading(false);
    if (response.success && response.data.data) {
      window.location.href = response.data.data.paymentUrl;
    } else {
      enqueueSnackbar("Đặt lịch không thành công", { variant: "error" });
    }
  };

  if (isLoading) return <Loading />;
  return (
    <Body container spacing={1}>
      <Grid item xs={12} sm={12} md={4.5} justifyContent={"flex-start"}>
        <Typography
          variant="subtitle1"
          style={{
            color: theme.palette.template.darker,
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "left",
          }}
        >
          Phương thức thanh toán:
        </Typography>
        <RadioGroup value={paymentMethod} onChange={handleChangePaymentMethod}>
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            <Radio
              value={"VNPAY"}
              size="small"
              color="text"
              defaultChecked
              sx={{ p: 0 }}
            />
            <img
              width="40px"
              src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702101343/06ncktiwd6dc1694418196384-removebg-preview_kd8y6g.png"
              alt="VNPAY"
            />
            <Typography
              sx={{
                color: theme.palette.template.darker,
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              Thanh toán bằng VNPAY
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            <Radio
              value={"MOMO"}
              size="small"
              color="text"
              defaultChecked
              sx={{ p: 0 }}
            />
            <img
              width="40px"
              src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1717401212/v7mhl3ibipnqt47iqqoc.png"
              alt="MOMO"
            />
            <Typography
              sx={{
                color: theme.palette.template.darker,
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              Thanh toán bằng MOMO
            </Typography>
          </Stack>
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={7.5}>
        <Stack
          direction={"row"}
          spacing={0.7}
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          <CreditCardIcon
            sx={{
              fontSize: "18px",
              color: theme.palette.template.darker,
            }}
          />
          <Typography
            variant="subtitle1"
            style={{
              color: theme.palette.template.darker,
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Thông tin thanh toán
          </Typography>
        </Stack>
        {tableLines.map((tableLine, index) => (
          <CustomGridItem marginBottom={1} key={`table-lines-${index}`}>
            <Stack direction={"column"} spacing={0.7} alignItems={"flex-start"}>
              {tableLine.map((row, index) => (
                <Row key={index} row={row} value={row.value} />
              ))}
            </Stack>
          </CustomGridItem>
        ))}
        <Stack
          alignItems={"flex-end"}
          spacing={0.5}
          sx={{
            marginTop: "16px",
            paddingTop: "10px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Stack direction={"row"}>
            <CustomTypographyLable
              sx={{
                width: "150px",
              }}
            >
              Phí tiện ích dịch vụ:
            </CustomTypographyLable>
            <CustomTypographyValue
              style={{
                width: "140px",
                textAlign: "right",
              }}
            >
              <FormatCurrency amount={15000} />
            </CustomTypographyValue>{" "}
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: theme.palette.text.main,
                fontSize: "20px",
                width: "150px",
                textAlign: "left",
              }}
            >
              Tổng cộng:
            </Typography>
            <Typography
              variant="h6"
              style={{
                width: "140px",
                textAlign: "right",
                fontWeight: "550",
                color: "#109df5",
                fontSize: "20px",
              }}
            >
              <FormatCurrency amount={total + 15000} />
            </Typography>{" "}
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <CheckCircleIcon
              sx={{
                color: "#0aa54b",
                fontSize: "20px",
                marginRight: "4px",
                paddingTop: "4px",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                fontSize: "14px",
                textAlign: "justify",
                color: "#787777",
              }}
            >
              Tôi đồng ý sử dụng Phí tiện ích dịch vụ của The Duck Hospital cung
              cấp để đặt khám, tra cứu kết quả khám và các tính năng tiện lợi
              khác trên nền tảng.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          paddingLeft: "0px",
          paddingRight: isMdUp ? "20px" : "0",
          textAlign: "left",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          variant="text"
          sx={{
            "&:hover": {
              backgroundColor: "	#ffffff",
            },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon
            sx={{
              marginRight: "5px",
            }}
          />
          Quay lại
        </CustomButton>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          textAlign: "right",
        }}
      >
        <CustomButton
          variant="contained"
          sx={{
            width: "120px",
            backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
            color: "#fff", // Màu chữ
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
            },
          }}
          onClick={handlePayment}
        >
          Thanh toán
        </CustomButton>
      </Grid>
    </Body>
  );
}

export default Payment;
