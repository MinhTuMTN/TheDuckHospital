import styled from "@emotion/styled";
import { CheckOutlined } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import FormatCurrency from "../components/General/FormatCurrency";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkTransaction } from "../services/customer/TransactionServices";

const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem 0",
}));

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.text.main,
  textAlign: "left",
}));

function PaymentSuccessPage(props) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = React.useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const transactionId = searchParams.get("transactionId");
    if (!transactionId) navigate("/", { replace: true });

    const handleGetTransaction = async () => {
      const response = await checkTransaction(transactionId);
      if (response.success && response.data.data.status === "SUCCESS")
        setTransaction(response.data.data);
      else navigate("/", { replace: true });
    };
    handleGetTransaction();
  }, [navigate, searchParams]);

  return (
    <Container>
      <Grid
        container
        spacing={1}
        component={Paper}
        width={{
          xs: "90%",
          sm: "80%",
          md: "50%",
        }}
        marginLeft={0}
        p={{
          xs: 1,
          sm: 2,
          md: 5,
        }}
      >
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography
            component={"span"}
            sx={{
              backgroundColor: "#74e397",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              height: "4rem",
              width: "4rem",
            }}
          >
            <CheckOutlined sx={{ fontSize: 50 }} />
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Typography
            color={"template.normal1"}
            fontSize={24}
            fontWeight={"bold"}
          >
            Thanh toán thành công !
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <Typography color={"template.darker"} fontSize={16} fontWeight={500}>
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
          </Typography>
        </Grid>

        <Grid container item xs={12} mt={3}>
          <StyledText
            component={"span"}
            minWidth={{
              xs: "55%",
              md: "35%",
            }}
          >
            Hình thức thanh toán:
          </StyledText>
          <StyledText component={"span"}>
            {transaction.paymentMethod}
          </StyledText>
        </Grid>
        <Grid container item xs={12}>
          <StyledText
            component={"span"}
            minWidth={{
              xs: "55%",
              md: "35%",
            }}
          >
            Ngân hàng:
          </StyledText>
          <StyledText component={"span"}>{transaction.bankCode}</StyledText>
        </Grid>

        <Grid container item xs={12} mt={3}>
          <Typography
            minWidth={{
              xs: "55%",
              sm: "25%",
              md: "25%",
            }}
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "template.darker",
            }}
          >
            Mã giao dịch:
          </Typography>
          <Typography
            component={"span"}
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "template.darker",
            }}
          >
            {transaction.transactionId}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography
            component={"span"}
            minWidth={{
              xs: "55%",
              sm: "25%",
              md: "25%",
            }}
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "template.darker",
            }}
          >
            Số tiền:
          </Typography>
          <Typography
            component={"span"}
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "template.darker",
            }}
          >
            <FormatCurrency amount={transaction.amount} />
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          mt={3}
          justifyContent={"center"}
          columnGap={2}
        >
          <Button
            variant="contained"
            color="normal1"
            sx={{
              fontWeight: "600",
              color: "#fff",
              fontSize: {
                xs: "12px",
                sm: "14px",
                md: "14px",
              },
            }}
            onClick={() => navigate("/", { replace: true })}
          >
            Quay lại trang chủ
          </Button>
          <Button
            variant="contained"
            color="delete"
            sx={{
              fontWeight: "600",
              color: "#fff",
              fontSize: {
                xs: "12px",
                sm: "14px",
                md: "14px",
              },
            }}
            onClick={() => navigate("/user/medical-bills", { replace: true })}
          >
            Xem phiếu khám
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentSuccessPage;
