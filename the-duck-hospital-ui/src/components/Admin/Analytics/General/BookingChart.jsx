import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import React, { useCallback, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getBookingStatistics } from "../../../../services/admin/StatisticsServices";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";

Chart.register(Filler);

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

function BookingChart(props) {
  const [labels, setLabels] = useState([""]);
  const [data, setData] = useState([1]);
  const [statisticRequest, setStatisticRequest] = useState({
    startDate: dayjs().add(-30, "day"),
    endDate: dayjs(),
  });

  const [maxStartDate, setMaxStartDate] = useState(statisticRequest.endDate);
  const [minEndDate, setMinEndDate] = useState(statisticRequest.startDate);

  const handleStatistics = useCallback(async () => {
    const response = await getBookingStatistics({
      startDate: statisticRequest.startDate.format("YYYY/MM/DD"),
      endDate: statisticRequest.endDate.format("YYYY/MM/DD"),
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
        <TieuDe>Biểu đồ lượt đặt khám theo ngày</TieuDe>
      </BoxStyle>
      <BoxStyle>
        {data && data.length > 0 && (
          <>
            <Line
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Đặt khám",
                    data: data,
                    fill: true,
                    backgroundColor: "#a0e4ff59",
                    borderColor: "#43b0e3",
                    tension: 0.3,
                  },
                ],
              }}
            />
          </>
        )}
      </BoxStyle>
    </>
  );
}

export default BookingChart;
