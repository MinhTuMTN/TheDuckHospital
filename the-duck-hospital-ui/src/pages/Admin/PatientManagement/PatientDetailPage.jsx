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
import PatientDetail from "../../../components/Admin/PatientManagement/PatientDetail";
import { useCallback, useEffect, useState } from "react";
import PatientProfileTable from "../../../components/Admin/PatientManagement/PatientProfileTable";
import { getPatientById } from "../../../services/admin/PatientServices";

const PatientId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function PatientDetailPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});

  const handleGetPatient = useCallback(async () => {
    const response = await getPatientById(patientId);
    if (response.success) {
      setPatient(response.data.data);
    }
  }, [patientId]);

  useEffect(() => {
    handleGetPatient();
  }, [handleGetPatient]);

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
              onClick={() => { navigate("/admin/patient-management") }}
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
              Danh sách bệnh nhân
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
                  {patient.fullName}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    variant="body1"
                    fontWeight={450}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    patient_code:
                  </Typography>
                  <PatientId>{patient.patientCode}</PatientId>
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
                <PatientDetail patient={patient} />
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
                <PatientProfileTable
                  items={patient.patientProfiles}
                  patientId={patient.patientId}
                  patientName={patient.fullName}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PatientDetailPage;
