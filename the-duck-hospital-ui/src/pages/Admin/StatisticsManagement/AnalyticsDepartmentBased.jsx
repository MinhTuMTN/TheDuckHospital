import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { getStatisticsByDepartment } from "../../../services/admin/StatisticsServices";
import { getAllActiveDepartments } from "../../../services/admin/DepartmentServices";
import TopDoctor from "../../../components/Admin/Analytics/DepartmentBased/TopDoctor";
import BasicTotals from "../../../components/Admin/Analytics/DepartmentBased/BasicTotals";
import BookingChartDepartment from "../../../components/Admin/Analytics/DepartmentBased/BookingChartDepartment";
import RevenueChartDepartment from "../../../components/Admin/Analytics/DepartmentBased/RevenueChartDepartment";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

function AnalyticsDepartmentBased(props) {
  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 4 : 0;
  const [statistics, setStatistics] = useState({});
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");

  const handleGetStatistics = useCallback(async () => {
    const response = await getStatisticsByDepartment(department.departmentId);

    if (response.success) {
      setStatistics(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [department]);

  const handleGetAllActiveDepartments = useCallback(async () => {
    const response = await getAllActiveDepartments();

    if (response.success) {
      setDepartments(response.data.data);
      // console.log(response.data.data[0]);
      setDepartment(response.data.data[0]);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, []);

  useEffect(() => {
    handleGetAllActiveDepartments();
  }, [handleGetAllActiveDepartments]);

  useEffect(() => {
    if (
      department.departmentId !== null &&
      department.departmentId !== undefined
    ) {
      handleGetStatistics();
    }
  }, [handleGetStatistics, department]);

  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: 0, pb: 4 }}>
      <Container>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Stack direction={"column"} width={"100%"}>
            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
              <Box width={"45%"}>
                <Typography
                  variant="h3"
                  fontWeight={600}
                  style={{
                    textTransform: "uppercase",
                    fontSize: "2rem",
                  }}
                >
                  Thống kê theo khoa
                </Typography>
              </Box>
              <Box width={"100%"}>
                <FormControl fullWidth>
                  <Select
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    displayEmpty
                    required
                    sx={{
                      fontSize: "18px !important",
                      width: "30%",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {departments?.map((item, index) => (
                      <MenuItem key={`department-${index}`} value={item}>
                        <Typography style={{ fontSize: "18px" }}>
                          {item.departmentName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            <Grid container spacing={spacingValue}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <BasicTotals
                      total={statistics.totalDoctors}
                      label={"Số Bác Sĩ"}
                      managementLabel={"Quản lý nhân viên"}
                      managementLink={"/admin/staff-management"}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <BasicTotals
                      total={statistics.totalNurses}
                      label={"Số Điều Dưỡng"}
                      managementLabel={"Quản lý nhân viên"}
                      managementLink={"/admin/staff-management"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <BasicTotals
                      total={statistics.totalDoctors}
                      label={"Số Bệnh Nhân"}
                      managementLabel={"Quản lý bệnh nhân"}
                      managementLink={"/admin/patient-management"}
                    />
                  </Grid>
                </Grid>

                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <BookingChartDepartment
                      departmentId={department?.departmentId}
                    />
                  </Stack>
                </Stack>
                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <RevenueChartDepartment
                      departmentId={department?.departmentId}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <TopDoctor topDoctors={statistics.topDoctors} />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnalyticsDepartmentBased;
