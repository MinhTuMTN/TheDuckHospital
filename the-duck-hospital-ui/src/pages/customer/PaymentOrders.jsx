import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import CustomerProfileInPaymentPage from "../../components/Customer/PaymentOrder/CustomerProfileInPaymentPage";
import Payment from "../../components/Customer/PaymentOrder/Payment";
import { useLocation, useNavigate } from "react-router-dom";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.profile || !location.state?.schedules)
      navigate("/choose-patient-profiles", {
        replace: true,
      });
  }, [location.state, navigate]);
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
            <CustomerProfileInPaymentPage profile={location.state?.profile} />
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
            <Payment schedules={location.state?.schedules} />
          </CustomOutline>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentOrders;
