import {
  Box,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlreadyPaid from "../../components/Cashier/AlreadyPaid";
import CashierAvatar from "../../components/Cashier/CashierAvatar";
import InvoiceAndPayment from "../../components/Cashier/InvoiceAndPayment";
import InvoiceNotFound from "../../components/Cashier/InvoiceNotFound";
import SearchPaymentCode from "../../components/Cashier/SearchPaymentCode";
import { getPaymentDetails } from "../../services/cashier/CashierServices";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f8f9fd",
  minHeight: "100vh",
}));
const StyledHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "0px 20px",
}));
const StyledContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}));
const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "120px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  marginRight: "10px",
  flexBasis: "10%",
}));

function CashierPage() {
  const navigate = useNavigate();
  const [paymentCode, setPaymentCode] = React.useState("HAD80187D4-4FB0");
  const [loading, setLoading] = React.useState(false);
  const [paymentDetails, setPaymentDetails] = React.useState(null);

  useEffect(() => {
    const handleGetPaymentDetails = async () => {
      setLoading(true);
      const response = await getPaymentDetails(paymentCode);
      setLoading(false);

      if (response.success) {
        setPaymentDetails(response.data.data);
      } else if (response.statusCode === 404) {
        setPaymentDetails(null);
      } else {
        setPaymentDetails(undefined);
      }
    };

    if (paymentCode && paymentCode.length === 15) {
      handleGetPaymentDetails();
    } else {
      setPaymentDetails(null);
    }
  }, [paymentCode]);
  const resetPaymentCode = useCallback(() => {
    setPaymentCode("");
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLogo
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
        />
        <SearchPaymentCode
          value={paymentCode}
          onChange={(value) => setPaymentCode(value)}
        />
        <CashierAvatar />
      </StyledHeader>
      <StyledContent>
        {loading ? (
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            rowGap={2}
          >
            <CircularProgress color="newPrimary" />
            <Typography fontWeight={500}>
              Đang tải dữ liệu, vui lòng chờ trong giây lát...
            </Typography>
          </Stack>
        ) : paymentDetails === null ? (
          <InvoiceNotFound />
        ) : paymentDetails === undefined ? (
          <AlreadyPaid />
        ) : (
          <InvoiceAndPayment
            paymentDetails={paymentDetails}
            onSuccess={resetPaymentCode}
          />
        )}
      </StyledContent>
    </StyledContainer>
  );
}

export default CashierPage;
