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
import AccountDetail from "../../../components/Admin/AccountManagement/AccountDetail";
import PatientProfileTable from "../../../components/Admin/PatientManagement/PatientProfileTable";
import { useState } from "react";

const UserId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

const account = {
  userId: "1234-5678-9101-1121",
  fullName: "Nguyễn Quốc Patient",
  role: "Bệnh nhân",
  phoneNumber: "0123456789",
  email: "patient-nq@minhtunguyen.onmicrosoft.com",
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
const totalItems = account.patientProfiles?.length;

function AccountDetailPage() {
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
              onClick={() => { navigate("/admin/account-management") }}
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
              Danh sách tài khoản
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
                    {account.fullName}
                  </Typography>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography
                      variant="body1"
                      fontWeight={450}
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      user_id:
                    </Typography>
                    <UserId>{account.userId}</UserId>
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
                <AccountDetail account={account} />
              </Stack>
            </Grid>
          </Grid>
          {account.patientProfiles?.length > 0 &&
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
                  items={account.patientProfiles}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={limit}
                />
              </Stack>
            </Grid>
          </Grid>}
        </Stack>
      </Stack>
    </Box>
  );
}

export default AccountDetailPage;
