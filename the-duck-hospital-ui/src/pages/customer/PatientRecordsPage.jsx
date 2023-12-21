import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import PatientRecordItem from "../../components/Customer/PatientRecord/PatientRecordItem";
import { getAllPatientProfiles } from "../../services/customer/PatientProfileServices";
import { enqueueSnackbar } from "notistack";
import SearchNotFound from "../../components/Nurse/SearchNotFound";

function PatientRecordsPage(props) {
  const [profiles, setProfiles] = React.useState([]);

  const handleGetActiveProfiles = useCallback(async () => {
    const response = await getAllPatientProfiles();
    if (response.success) setProfiles(response.data.data);
    else
      enqueueSnackbar("Lấy danh sách hồ sơ bệnh nhân thất bại", {
        variant: "error",
      });
  }, []);

  useEffect(() => {
    handleGetActiveProfiles();
  }, [handleGetActiveProfiles]);

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
        {profiles.map((profile) => (
          <Grid item xs={12} key={profile.patientProfileId}>
            <PatientRecordItem
              profile={profile}
              reload={handleGetActiveProfiles}
            />
          </Grid>
        ))}

        {profiles?.length === 0 && (
          <SearchNotFound text="Không có hồ sơ bệnh nhân nào" />
        )}
      </Grid>
    </Box>
  );
}

export default PatientRecordsPage;
