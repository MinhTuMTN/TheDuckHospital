import { Box, Typography } from "@mui/material";
import React from "react";
import MedicalBillProfileItem from "../../components/Customer/MedicalBill/MedicalBillProfileItem";

function MedicalBillsPage(props) {
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
        Phiếu khám bệnh
      </Typography>

      <Box mt={2}>
        <MedicalBillProfileItem />
      </Box>
    </Box>
  );
}

export default MedicalBillsPage;
