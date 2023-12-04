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
import { useNavigate } from "react-router-dom";
import PatientDetail from "../../../components/Admin/PatientManagement/PatientDetail";
import { useState } from "react";
import PatientProfileTable from "../../../components/Admin/PatientManagement/PatientProfileTable";

const StaffId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

const patient = {
  patientId: "1234-5678-9101-1121",
  fullName: "Nguyễn Quốc Patient",
  phoneNumber: "0123456789",
  identityNumber: "123456789012",
  dateOfBirth: "27/01/2002",
  deleted: false,
  patientProfiles: [
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
    {
      fullName: "Nguyễn Quốc Patient",
      phoneNumber: "0123456789",
      createdAt: "27/01/2002",
      deleted: false,
    },
  ]
}

const totalItems = patient.patientProfiles.length;

function PatientDetailPage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };
  // const [customer, setCustomer] = useState({});

  // const handleGetCustomer = useCallback(async () => {
  //   const response = await getCustomerById(state.id);
  //   if (response.success) {
  //     setCustomer(response.data.data);
  //   }
  // }, [state.id]);

  // useEffect(() => {
  //   handleGetCustomer();
  // }, [handleGetCustomer]);

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
                    patient_id:
                  </Typography>
                  <StaffId>{patient.patientId}</StaffId>
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
                  count={totalItems ? totalItems : 0}
                  items={patient.patientProfiles}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={limit}
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
