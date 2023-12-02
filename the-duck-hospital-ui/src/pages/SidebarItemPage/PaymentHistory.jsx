import { Box, Typography, styled } from "@mui/material";

const RootPagePaymentHistory = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: theme.spacing(5),
}));

function PaymentHistory() {
    return (
        <RootPagePaymentHistory>
            <Typography>Payment History</Typography>
            <Typography variant="h3">Lịch sử thanh toán viện phí</Typography>
            <Typography marginTop={5} variant="body1" align="center" >Bạn không có lịch sử thanh toán tại TheDuckHospital.</Typography>
        </RootPagePaymentHistory>
    );
}

export default PaymentHistory;