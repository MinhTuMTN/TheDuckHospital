import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PatientRecordItem from "../../components/Customer/PatientRecord/PatientRecordItem";

function PatientRecordsPage(props) {
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
        Hồ sơ bệnh nhân
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <PatientRecordItem />
        </Grid>
        <Grid item xs={12}>
          <PatientRecordItem />
        </Grid>
        <Grid item xs={12}>
          <PatientRecordItem />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientRecordsPage;
