import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import React, { useCallback, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getRevenueStatistics } from "../../../services/admin/StatisticsServices";

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "12px !important",
  paddingRight: "12px !important",
  paddingTop: "7px !important",
  paddingBottom: "7px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
  },
}));

function RevenueChart(props) {
  const [labels, setLabels] = useState([""]);
  const [data, setData] = useState([1]);
  const [statisticRequest, setStatisticRequest] = useState({
    startDate: dayjs().add(-30, "day"),
    endDate: dayjs(),
  });
  
  const [maxStartDate, setMaxStartDate] = useState(statisticRequest.endDate);
  const [minEndDate, setMinEndDate] = useState(statisticRequest.startDate);

  const handleStatistics = useCallback(async () => {
    const response = await getRevenueStatistics({
      startDate: statisticRequest.startDate.format("YYYY/MM/DD"),
      endDate: statisticRequest.endDate.add(1, "day").format("YYYY/MM/DD"),
    });

    if (response.success) {
      setLabels(response.data.data.labels);
      setData(response.data.data.values);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [statisticRequest]);

  
  useEffect(() => {
    handleStatistics();
  }, [handleStatistics]);

  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        width={"100%"}
        alignItems="center"
        sx={{
          paddingY: 4,
          paddingX: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <CustomDatePicker
            label="Ngày bắt đầu"
            value={dayjs(statisticRequest.startDate)}
            maxDate={maxStartDate}
            onChange={(newDate) => {
              setMinEndDate(newDate);
              setStatisticRequest((prev) => {
                return {
                  ...prev,
                  startDate: newDate,
                };
              });
            }}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <CustomDatePicker
            label="Ngày kết thúc"
            value={dayjs(statisticRequest.endDate)}
            minDate={minEndDate}
            onChange={(newDate) => {
              setMaxStartDate(newDate);
              setStatisticRequest((prev) => {
                return {
                  ...prev,
                  endDate: newDate,
                };
              });
            }}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>
      </Stack>
      <BoxStyle
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701014001/poll_klu0kd.png"
          }
          alt="top-product"
          style={{
            width: "25px",
            height: "25px",
            objectFit: "contain",
          }}
        />
        <TieuDe>Biểu đồ doanh thu theo ngày</TieuDe>
      </BoxStyle>
      <BoxStyle>
        {labels && labels.length > 0 && (
          <LineChart
            xAxis={[{ scaleType: "point", data: labels }]}
            series={[{ data: data, label: "Doanh thu" }]}
            height={350}
            sx={{
              padding: "1.6rem",
            }}
          />
        )}
      </BoxStyle>
    </>
  );
}

export default RevenueChart;
