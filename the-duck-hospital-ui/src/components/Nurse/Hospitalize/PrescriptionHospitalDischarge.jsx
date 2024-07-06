import { Grid, Typography, styled } from "@mui/material";
import React from "react";
import Prescription from "../../Doctor/Prescription";

const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "18px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

function PrescriptionHospitalDischarge(props) {
  const { info, diagnostic } = props;
  return (
    <ViewStyle container>
      <Grid item xs={12} justifyContent={"center"} marginBottom={1}>
        <Typography
          variant="subtitle1"
          textTransform={"capitalize"}
          fontWeight={600}
          letterSpacing={0.5}
          fontSize={"24px"}
          textAlign={"center"}
        >
          Toa thuốc ra viện
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Prescription patientInfo={info} diagnostic={diagnostic} />
      </Grid>
    </ViewStyle>
  );
}

export default PrescriptionHospitalDischarge;
