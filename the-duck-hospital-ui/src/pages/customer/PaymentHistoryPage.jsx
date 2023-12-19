import { Box, Typography } from "@mui/material";
import React from "react";
import HistoryRecord from "../../components/Customer/History/HistoryRecord";

const histories = [
  {
    fullName: "Nguyễn Văn A",
    history: [
      {
        id: 1,
        departmentName: "Khoa nội",
        doctorName: "Nguyễn Văn A",
        date: `20 / 10 / 2021`,
      },
      {
        id: 2,
        departmentName: "Khoa tổng quát",
        doctorName: "Nguyễn Thị Nguyệt",
        date: "20 / 10 / 2022",
      },
    ],
  },
  {
    fullName: "Trần Kiều Ân",
    history: [
      {
        id: 3,
        departmentName: "Khoa ngoại",
        doctorName: "Nguyễn Văn B",
        date: "20/10/2021",
      },
    ],
  },
];

function PaymentHistoryPage(props) {
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
        {histories.map((history, index) => (
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
