import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import HistoryRecord from "../../components/Customer/History/HistoryRecord";
import { getHistoryMedicalRecord } from "../../services/customer/MedicalRecordServices";
import { enqueueSnackbar } from "notistack";

function PaymentHistoryPage(props) {
  const [historyRecords, setHistoryRecords] = React.useState([]);
  useEffect(() => {
    const handleGetHistoryRecords = async () => {
      const response = await getHistoryMedicalRecord();
      if (response) {
        setHistoryRecords(response.data.data);
      } else {
        enqueueSnackbar("Lấy dữ liệu lịch sử khám bệnh thất bại", {
          variant: "error",
        });
      }
    };
    handleGetHistoryRecords();
  }, []);
  return (
    <Box
      py={4}
      px={{
        md: 5,
        xs: 1.5,
      }}
      sx={{ width: "100%" }}
    >
      <Typography variant="h6" fontSize={22}>
        Lịch sử khám bệnh
      </Typography>

      <Box mt={2}>
        {historyRecords?.map((history, index) => (
          <HistoryRecord
            key={`history-record-${index}`}
            historyRecord={history}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PaymentHistoryPage;
