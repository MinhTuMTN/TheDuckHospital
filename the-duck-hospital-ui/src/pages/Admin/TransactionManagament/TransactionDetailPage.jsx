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

const PatientId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

// const bookings = [
//   {
//     booking: {
//       bookingId: "ccf09fbe-8cb1-467f-aca4-0e956fb44a57",
//       bookingCode: "CCF09FBE8CB1",
//       queueNumber: 1,
//       createdAt: "2023-12-12T14:21:19.829+00:00",
//       updatedAt: "2023-12-12T14:21:52.059+00:00",
//       deleted: false
//     },
//     patientProfile: {
//       patientProfileId: "040e8479-f742-4138-ab23-accc65ec3549",
//       fullName: "Ân Mạnh Hùng",
//       identityNumber: "450058878111",
//       phoneNumber: "0963852428",
//       email: "",
//       address: "1 Trần Hưng Đạo, Xã Ba Vì, Huyện Ba Vì, Thành phố Hà Nội",
//       gender: "MALE",
//       nation: "Kinh",
//       dateOfBirth: "1993-12-09T21:05:28.000+00:00",
//       deleted: false,
//       medicalExaminationRecords: []
//     },
//     doctorSchedule: {
//       doctorScheduleId: "82da7d03-aae5-4235-ac5e-f06a29538683",
//       scheduleType: "MORNING",
//       doctorName: "Lưu Bá Cường",
//       doctorGender: "MALE",
//       doctorDegree: "PGS",
//       price: 150000.0,
//       departmentName: "Khoa da liễu",
//       serviceName: "Khám da liễu",
//       roomName: "A1-101",
//       phoneNumber: "09536812436",
//       queueNumber: 0,
//       numberOfBookings: 1,
//       date: "2023-12-13T17:00:00.000+00:00"
//     }
//   },
//   {
//     booking: {
//       bookingId: "9e4d09af-7b29-406c-abdb-4675baef9999",
//       bookingCode: "9E4D09AF7B29",
//       queueNumber: 1,
//       createdAt: "2023-12-12T14:21:19.829+00:00",
//       updatedAt: "2023-12-12T14:21:52.079+00:00",
//       deleted: false
//     },
//     patientProfile: {
//       patientProfileId: "040e8479-f742-4138-ab23-accc65ec3549",
//       fullName: "Ân Mạnh Hùng",
//       identityNumber: "450058878111",
//       phoneNumber: "0963852428",
//       email: "",
//       address: "1 Trần Hưng Đạo, Xã Ba Vì, Huyện Ba Vì, Thành phố Hà Nội",
//       gender: "MALE",
//       nation: "Kinh",
//       dateOfBirth: "1993-12-09T21:05:28.000+00:00",
//       deleted: false,
//       medicalExaminationRecords: []
//     },
//     doctorSchedule: {
//       doctorScheduleId: "f6ebb461-131d-4eb6-b2dd-cb40ce6e8edc",
//       scheduleType: "MORNING",
//       doctorName: "Quang Thanh Tuyết",
//       doctorGender: "FEMALE",
//       doctorDegree: "PGS",
//       price: 160000.0,
//       departmentName: "Khoa tim mạch",
//       serviceName: "Khám tim mạch",
//       roomName: "B1-202",
//       phoneNumber: "0956847532",
//       queueNumber: 8,
//       numberOfBookings: 8,
//       date: "2024-01-02T17:00:00.000+00:00"
//     }
//   }
// ]

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
              onClick={() => { navigate("/admin/transaction-management") }}
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
                  {transaction.userName}
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
          <BookingTransactionTable bookings={transaction.bookings} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default TransactionDetailPage;
