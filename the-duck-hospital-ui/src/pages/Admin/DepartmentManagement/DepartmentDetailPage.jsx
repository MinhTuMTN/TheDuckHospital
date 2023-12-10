import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentDetail from "../../../components/Admin/DepartmentManagement/DepartmentDetail";
import DoctorTable from "../../../components/Admin/DepartmentManagement/DoctorTable";
import { getDepartmentById } from "../../../services/admin/DepartmentServices";

// const department = {
//   departmentName: "Khoa Nhi",
//   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore veli",
//   doctors: [
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Doctor 1",
//       phoneNumber: "0123456789",
//       headOfDepartment: false,
//       identityNumber: "123456789012",
//       deleted: false,
//     },
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Doctor 2",
//       phoneNumber: "0123456788",
//       headOfDepartment: false,
//       identityNumber: "123456789011",
//       deleted: false,
//     },
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Doctor 3",
//       phoneNumber: "0123456787",
//       headOfDepartment: false,
//       identityNumber: "123456789010",
//       deleted: false,
//     },
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Doctor 4",
//       phoneNumber: "0123456786",
//       headOfDepartment: false,
//       identityNumber: "123456789013",
//       deleted: false,
//     },
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Head Doctor",
//       phoneNumber: "0123456785",
//       headOfDepartment: true,
//       identityNumber: "123456789014",
//       deleted: false,
//     },
//     {
//       staffId: "123",
//       fullName: "Nguyễn Văn Doctor 5",
//       phoneNumber: "0123456784",
//       headOfDepartment: false,
//       identityNumber: "123456789015",
//       deleted: false,
//     },
//   ],
//   deleted: false,
// };

function DepartmentDetailPage() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});

  useEffect(() => {
    const handleGetDepartment = async () => {
      const response = await getDepartmentById(departmentId);
      if (response.success) {
        response.data.data.doctors.sort((a, b) => {
          if (a.headOfDepartment === b.headOfDepartment) {
            return 0;
          } else if (a.headOfDepartment) {
            return -1;
          } else {
            return 1;
          }
        });
        setDepartment(response.data.data);
      }
    }
    handleGetDepartment();
  }, [departmentId]);

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
              onClick={() => {
                navigate("/admin/department-management");
              }}
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
                <DepartmentDetail
                  department={department}
                  headDoctorId={department.headDoctorId}
                  headDoctorName={department.headDoctorName}
                />
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
                <DoctorTable items={department.doctors} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DepartmentDetailPage;
