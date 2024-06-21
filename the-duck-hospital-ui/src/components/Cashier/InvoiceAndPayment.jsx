import {
  Box,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { appColors } from "../../utils/appColorsUtils";
import dayjs from "dayjs";
import { getPaymentType } from "../../utils/paymentTypeUtils";
import FormatCurrency from "../General/FormatCurrency";
import { createPayment } from "../../services/cashier/CashierServices";
import { useSnackbar } from "notistack";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
  padding: "20px 30px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px #00000033",
}));
const PaymentMethodItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "8px",
  marginBottom: "8px",
}));
const StyledLogo = styled("img")(({ theme }) => ({
  width: "40px",
  height: "40px",
  objectFit: "contain",
  borderRadius: "10px",
}));

function InvoiceAndPayment(props) {
  const { paymentDetails = {} } = props;
  const [paymentMethod, setPaymentMethod] = React.useState("VNPAY");
  const date = useMemo(
    () => (paymentDetails ? dayjs(paymentDetails?.date) : dayjs()),
    [paymentDetails]
  );
  const { enqueueSnackbar } = useSnackbar();
  const handlePayment = useCallback(async () => {
    const response = await createPayment({
      paymentCode: paymentDetails?.code,
      paymentMethod,
    });

    if (response.success) {
      if (paymentMethod === "CASH") {
        enqueueSnackbar("Thanh toán thành công", {
          variant: "success",
        });
        return;
      } else {
        window.open(response.data.data.paymentUrl, "_blank");
      }
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra, vui lòng thử lại sau", {
        variant: "error",
      });
    }
  }, [paymentMethod, paymentDetails, enqueueSnackbar]);
  return (
    <Container>
      <Stack mb={1}>
        <Typography
          fontSize={"18px"}
          fontWeight={600}
          textTransform={"uppercase"}
        >
          {paymentDetails?.patientName}
        </Typography>
        <Typography alignItems={"center"} display={"flex"}>
          <b>Sinh năm:&nbsp;</b>
          {paymentDetails?.yearOfBirth}&nbsp;-&nbsp;<b>Số điện thoại:&nbsp;</b>
          {paymentDetails?.phoneNumber}
        </Typography>
      </Stack>
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        columnGap={"48px"}
        mt={1}
      >
        <Typography color={"#878c91"}>
          {date.get("day") === 0 ? "Chủ Nhật" : `Thứ ${date.get("d") + 1}`},{" "}
          {date.get("date").toString().padStart(2, "0")} tháng{" "}
          {(date.get("month") + 1).toString().padStart(2, "0")} năm{" "}
          {date.get("year")}
        </Typography>
        <Typography
          color={"#878c91"}
          fontWeight={600}
          textTransform={"uppercase"}
        >
          {paymentDetails?.code}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        columnGap={"48px"}
        mt={1}
      >
        <Typography fontWeight={500} fontSize={"16px"}>
          {getPaymentType(paymentDetails?.paymentType)}
        </Typography>
        <Typography fontStyle={"italic"} fontSize={"16px"}>
          <FormatCurrency amount={paymentDetails?.amount} />
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        columnGap={"48px"}
        mb={1}
      >
        <Typography fontWeight={500} fontSize={"16px"}>
          Phí thanh toán
        </Typography>
        <Typography fontStyle={"italic"} fontSize={"16px"}>
          <FormatCurrency amount={paymentMethod === "CASH" ? 0 : 1500} />
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          columnGap={"48px"}
          mt={1}
          mb={1}
        >
          <Typography
            fontWeight={500}
            fontSize={"18px"}
            color={appColors.primary}
          >
            Tổng số tiền phải thanh toán
          </Typography>
          <Typography
            fontWeight={"bold"}
            fontSize={"18px"}
            color={appColors.primary}
          >
            <FormatCurrency
              amount={
                paymentDetails?.amount + (paymentMethod === "CASH" ? 0 : 1500)
              }
            />
          </Typography>
        </Box>
        <Typography fontWeight={500} mt={2}>
          Phương thức thanh toán
        </Typography>
        <Stack>
          <RadioGroup
            sx={{ columnGap: "16px" }}
            aria-label="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <PaymentMethodItem>
              <Radio
                id="VNPay"
                color="newPrimary"
                value="VNPAY"
                name="paymentMethod"
                inputProps={{ "aria-label": "MOMO" }}
              />
              <Typography
                component={"label"}
                htmlFor="VNPay"
                display={"flex"}
                alignItems={"center"}
              >
                <StyledLogo
                  src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702101343/06ncktiwd6dc1694418196384-removebg-preview_kd8y6g.png"
                  alt="VNPAY"
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    textAlign: "left",
                    marginLeft: "8px",
                  }}
                >
                  Thanh toán bằng VNPAY
                </Typography>
              </Typography>
            </PaymentMethodItem>
            <PaymentMethodItem>
              <Radio
                id="MOMO"
                color="newPrimary"
                value="MOMO"
                name="paymentMethod"
                inputProps={{ "aria-label": "MOMO" }}
              />
              <Typography
                component={"label"}
                htmlFor="MOMO"
                display={"flex"}
                alignItems={"center"}
              >
                <StyledLogo
                  src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1717401212/v7mhl3ibipnqt47iqqoc.png"
                  alt="MOMO"
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    textAlign: "left",
                    marginLeft: "8px",
                  }}
                >
                  Thanh toán bằng MOMO
                </Typography>
              </Typography>
            </PaymentMethodItem>
            <PaymentMethodItem>
              <Radio
                id="CASH"
                color="newPrimary"
                value="CASH"
                name="paymentMethod"
                inputProps={{ "aria-label": "MOMO" }}
              />
              <Typography
                component={"label"}
                htmlFor="CASH"
                display={"flex"}
                alignItems={"center"}
              >
                <StyledLogo
                  src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1717661955/2326641_Square_small_afitch.png"
                  alt="CASH"
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    textAlign: "left",
                    marginLeft: "8px",
                  }}
                >
                  Thanh toán bằng tiền mặt
                </Typography>
              </Typography>
            </PaymentMethodItem>
          </RadioGroup>
        </Stack>
      </Box>
      <Box mt={1} justifyContent={"flex-end"} display={"flex"}>
        <Button
          variant="outlined"
          onClick={handlePayment}
          sx={{
            color: appColors.primary,
            borderColor: appColors.primary,

            "&:hover": {
              backgroundColor: appColors.primary,
              color: "#ffffff",
            },
          }}
        >
          Thanh toán
        </Button>
      </Box>
    </Container>
  );
}

export default InvoiceAndPayment;
