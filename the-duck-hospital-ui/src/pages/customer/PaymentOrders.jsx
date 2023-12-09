import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CustomerProfileInPaymentPage from "../../components/Customer/PaymentOrder/CustomerProfileInPaymentPage";
import Payment from "../../components/Customer/PaymentOrder/Payment";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

const patient = {
  name: "Nguyễn Ngọc Tuyết Vi",
  phone: "0123456789",
  address: "210 Lê Văn Thịnh, phường Cát Lái, quận 2, thành phố Hồ Chí Minh",
};
const booking = {
  doctor: "Nguyễn Thị B",
  departmentName: "Nội thần kinh",
  date: "27/12/2023",
  scheduleType: "Sáng",
  fee: 200000,
};
const CustomOutline = styled(Paper)(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  padding: " 0px",
}));
const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "10px",
  paddingBottom: "10px",
  display: "flex",
  width: "100%",
}));

const TextHeader = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "500",
  color: "white",
  textAlign: "left",
  padding: 0,
  width: "100%",
}));

function PaymentOrders(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Thanh toán</CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#E8F2F7",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          mt: 2,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          textAlign: "center",
          width: "100%",
          marginLeft: "-8px",
        }}
      >
        <Grid item xs={12} md={3.75}>
          <CustomOutline elevation={3}>
            <Header>
              <TextHeader variant="body2">Thông tin bệnh nhân</TextHeader>
            </Header>
            <CustomerProfileInPaymentPage patient={patient} />
          </CustomOutline>
        </Grid>
        <Grid
          item
          xs={12}
          md={8.25}
          sx={{
            width: "825px",
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomOutline elevation={3}>
            <Header>
              <TextHeader variant="body2">Thanh toán</TextHeader>
            </Header>
            <Payment booking={booking} />
          </CustomOutline>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentOrders;
