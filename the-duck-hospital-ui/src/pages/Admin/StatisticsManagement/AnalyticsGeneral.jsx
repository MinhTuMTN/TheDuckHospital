import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import BookingChart from "../../../components/Admin/Analytics/General/BookingChart";
import PaymentMethodsPieChart from "../../../components/Admin/Analytics/General/PaymentMethodsPieChart";
import RevenueChart from "../../../components/Admin/Analytics/General/RevenueChart";
import TopDepartment from "../../../components/Admin/Analytics/General/TopDepartment";
import TotalPatients from "../../../components/Admin/Analytics/General/TotalPatients";
import { getAllStatistics } from "../../../services/admin/StatisticsServices";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

function AnalyticsGeneral(props) {
  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 4 : 0;
  const [statistics, setStatistics] = useState({});

  const handleGetStatistics = useCallback(async () => {
    const response = await getAllStatistics();

    if (response.success) {
      setStatistics(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, []);

  useEffect(() => {
    handleGetStatistics();
  }, [handleGetStatistics]);

  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: 0, pb: 4 }}>
      <Container>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Stack direction={"column"} width={"100%"}>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              Thống kê tổng quát
            </Typography>

            <Grid container spacing={spacingValue}>
              <Grid item xs={12} md={8}>
                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <BookingChart />
                  </Stack>
                </Stack>
                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <RevenueChart />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <TopDepartment
                  topDepartments={statistics.topDepartments?.slice(0, 5)}
                />
                <TotalPatients statisticData={statistics} />
                <PaymentMethodsPieChart
                  pieChartData={statistics.paymentMethodStatistics}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnalyticsGeneral;
