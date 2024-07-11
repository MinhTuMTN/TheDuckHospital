import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getTransactionById } from "../../../services/admin/TransactionServices";
import TransactionDetail from "../../../components/Admin/TransactionManagement/TransactionDetail";
import BookingTransactionTable from "../../../components/Admin/TransactionManagement/BookingTransactionTable";
import AdmissionDetail from "../../../components/Admin/TransactionManagement/AdmissionDetail";
import DischargeDetail from "../../../components/Admin/TransactionManagement/DischargeDetail";

const PatientId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function TransactionDetailPage() {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState({});

  const handleGetTransaction = useCallback(async () => {
    const response = await getTransactionById(transactionId);
    if (response.success) {
      setTransaction(response.data.data);
    }
  }, [transactionId]);

  useEffect(() => {
    handleGetTransaction();
  }, [handleGetTransaction]);

  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => {
                navigate("/admin/transaction-management");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              Danh sách thanh toán
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"column"}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  style={{
                    textTransform: "uppercase",
                    fontSize: ["1.5rem", "2rem"],
                  }}
                >
                  {transaction.paymentType === "BOOKING"
                    ? transaction.userName
                    : transaction.paymentType === "MEDICAL_TEST"
                    ? transaction.medicalTestResponse?.patientProfile?.fullName
                    : transaction.paymentType === "TOP_UP" ||
                      transaction.paymentType === "REFUND"
                    ? transaction.accountUserName
                    : transaction.paymentType === "ADVANCE_FEE"
                    ? transaction.patientName
                    : "Đang cập nhật"}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    variant="body1"
                    fontWeight={450}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    transaction_id:
                  </Typography>
                  <PatientId>{transaction.transactionId}</PatientId>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <TransactionDetail transaction={transaction} />
              </Stack>
            </Grid>
          </Grid>

          {transaction.paymentType === "ADVANCE_FEE" && (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <Stack
                    component={Paper}
                    elevation={3}
                    sx={{
                      marginTop: 4,
                      borderRadius: "15px",
                    }}
                    spacing={"2px"}
                  >
                    <AdmissionDetail transaction={transaction} />
                  </Stack>
                </Grid>
              </Grid>

              {transaction.discharge && transaction.discharge?.doctor && (
                <Grid container>
                  <Grid item xs={12}>
                    <Stack
                      component={Paper}
                      elevation={3}
                      sx={{
                        marginTop: 4,
                        borderRadius: "15px",
                      }}
                      spacing={"2px"}
                    >
                      <DischargeDetail discharge={transaction?.discharge} />
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </>
          )}

          {transaction.paymentType === "BOOKING" && (
            <BookingTransactionTable bookings={transaction.bookings} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default TransactionDetailPage;
