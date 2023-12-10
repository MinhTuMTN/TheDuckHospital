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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PatientProfileDetail from "../../../components/Admin/PatientManagement/PatientProfileDetail";
import { getPatientProfileById } from "../../../services/admin/PatientProfileServices";

const PatientProfileId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function PatientProfileDetailPage() {
  const navigate = useNavigate();
  const { patientProfileId, patientId } = useParams();
  const { state } = useLocation();

  const [patientProfile, setPatientProfile] = useState({});

  const handleGetPatientProfile = useCallback(async () => {
    const response = await getPatientProfileById(patientProfileId);
    if (response.success) {
      setPatientProfile(response.data.data);
    }
  }, [patientProfileId]);

  useEffect(() => {
    handleGetPatientProfile();
  }, [handleGetPatientProfile]);

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
              onClick={() => { navigate(`/admin/patient-management/${patientId}`) }}
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
              Thông tin bệnh nhân {state?.patientName}
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
                  {patientProfile.fullName}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    variant="body1"
                    fontWeight={450}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    patient_profile_id:
                  </Typography>
                  <PatientProfileId>{patientProfile.patientProfileId}</PatientProfileId>
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
                <PatientProfileDetail patientProfile={patientProfile} />
              </Stack>
            </Grid>
          </Grid>
          {/* {patientProfile.medicalExaminationRecords?.length > 0 && <Grid container>
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
                <MedicalExamRecordTable items={patientProfile.medicalExaminationRecords} />
              </Stack>
            </Grid>
          </Grid>} */}
        </Stack>
      </Stack>
    </Box>
  );
}

export default PatientProfileDetailPage;
