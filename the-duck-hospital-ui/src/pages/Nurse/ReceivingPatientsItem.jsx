import { Stack, Typography } from "@mui/material";
import React from "react";

const medicalBill = {
  queueNumber: 1,
};
function ReceivingPatientsItem(props) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "700",
          color: "#00b5f1",
          fontSize: "60px",
          paddingTop: "20px",
          paddingBottom: "20px",
          lineHeight: "1.3rem",
          paddingRight: 2,

          borderRight: "1px solid #00b5f1",
        }}
      >
        {medicalBill.queueNumber < 10
          ? "0" + medicalBill.queueNumber
          : medicalBill.queueNumber}
      </Typography>
      <Stack spacing={1} direction={"column"}></Stack>
    </Stack>
  );
}

export default ReceivingPatientsItem;
