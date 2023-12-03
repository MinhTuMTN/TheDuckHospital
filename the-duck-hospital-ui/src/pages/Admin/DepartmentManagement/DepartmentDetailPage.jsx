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
import { useState } from "react";
import DoctorTable from "../../../components/Admin/DepartmentManagement/DoctorTable";
import DepartmentDetail from "../../../components/Admin/DepartmentManagement/DepartmentDetail";
import { useNavigate } from "react-router-dom";

const department = {
  departmentName: "Cardiology",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore veli",
  doctors: [
    {
      fullName: "Nguyễn Văn Doctor 1",
      phoneNumber: "0123456789",
      headOfDepartment: false,
      identityNumber: "123456789012",
      deleted: false,
    },
    {
      fullName: "Nguyễn Văn Doctor 2",
      phoneNumber: "0123456788",
      headOfDepartment: false,
      identityNumber: "123456789011",
      deleted: false,
    },
    {
      fullName: "Nguyễn Văn Doctor 3",
      phoneNumber: "0123456787",
      headOfDepartment: false,
      identityNumber: "123456789010",
      deleted: false,
    },
    {
      fullName: "Nguyễn Văn Doctor 4",
      phoneNumber: "0123456786",
      headOfDepartment: false,
      identityNumber: "123456789013",
      deleted: false,
    },
    {
      fullName: "Nguyễn Văn Head Doctor",
      phoneNumber: "0123456785",
      headOfDepartment: true,
      identityNumber: "123456789014",
      deleted: false,
    },
    {
      fullName: "Nguyễn Văn Doctor 5",
      phoneNumber: "0123456784",
      headOfDepartment: false,
      identityNumber: "123456789015",
      deleted: false,
    },
  ],
  deleted: false
}

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

function DepartmentDetailPage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const headDoctor = department.doctors.find(doctor => doctor.headOfDepartment === true);
  department.doctors.sort((a, b) => {
    if (a.headOfDepartment === b.headOfDepartment) {
      return 0;
    } else if (a.headOfDepartment) {
      return -1;
    } else {
      return 1;
    }
  });
  const totalItems = department.doctors.length;

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
              onClick={() => { navigate("/admin/department-management") }}
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
              Danh sách khoa
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>


              <Typography
                variant="h3"
                fontWeight={600}
                style={{
                  textTransform: "uppercase",
                  fontSize: ["1.5rem", "2rem"],
                }}
              >
                {department.departmentName}
              </Typography>
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
                <DepartmentDetail department={department} headDoctor={headDoctor} />
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

                    <DoctorTable
                      count={totalItems ? totalItems : 0}
                      items={department.doctors}
                      headDoctor={headDoctor}
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

export default DepartmentDetailPage;
