import { useTheme } from "@emotion/react";
import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { getTimeTable } from "../../services/doctor/DoctorScheduleServices";

function SchedulePage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [doctorShedules, setDoctorShedules] = React.useState([]);
  const [selectedSchedules, setSelectedSchedules] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  useEffect(() => {
    const handleGetTimeTable = async () => {
      const response = await getTimeTable();
      if (response.success) setDoctorShedules(response.data.data);
    };
    handleGetTimeTable();
  }, []);

  const handleShouldDisableDate = (date) => {
    const day = dayjs(date).format("DD/MM/YYYY");
    const isDisable = doctorShedules?.some(
      (doctorShedule) => dayjs(doctorShedule.date).format("DD/MM/YYYY") === day
    );
    return !isDisable;
  };

  useEffect(() => {
    const day = dayjs(selectedDate).format("DD/MM/YYYY");
    const schedules = doctorShedules?.filter(
      (doctorShedule) => dayjs(doctorShedule.date).format("DD/MM/YYYY") === day
    );
    setSelectedSchedules(schedules);
  }, [doctorShedules, selectedDate]);

  return (
    <Grid
      container
      sx={{
        py: 3,
        px: isFullScreen ? 4 : 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid item xs={12} mb={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["18px", "24px"],
              color: theme.palette.text.main,
            }}
            fontWeight="700"
          >
            Lịch khám chữa bệnh
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "12px",
          }}
          spacing={"2px"}
          direction={{ xs: "column", sm: "row" }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "65%",
              },
              height: "30rem",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{
                  margin: "0 auto",
                  width: "100%",
                  height: "100%",
                  maxHeight: "100%",
                  "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer": {
                    justifyContent: "space-around",
                    paddingTop: "10px",
                  },

                  "& .MuiPickersSlideTransition-root": {
                    minHeight: 300,
                  },
                }}
                shouldDisableDate={handleShouldDisableDate}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "35%",
              },
              borderTopRightRadius: "inherit",
              borderBottomRightRadius: "inherit",
              backgroundColor: "normal1.main",
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "144px",
                textAlign: "center",
              }}
            >
              {dayjs(selectedSchedules[0]?.date).format("DD")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontWeight: "400",
                fontSize: "24px",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Tháng {dayjs(selectedSchedules[0]?.date).format("MM")}
            </Typography>
            <Stack>
              {selectedSchedules?.map((selectedSchedule, index) => (
                <Stack
                  direction={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start "}
                  sx={{ p: 2, order: index + 2 }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {selectedSchedule?.scheduleType === "MORNING" ? (
                      <WbSunnyOutlined
                        sx={{
                          color: "#fff",
                          fontSize: "24px",
                          mr: 1,
                        }}
                      />
                    ) : (
                      <DarkModeOutlined
                        sx={{
                          color: "#fff",
                          fontSize: "24px",
                          mr: 1,
                        }}
                      />
                    )}
                    <Typography sx={{ color: "#fff" }}>
                      Buổi{" "}
                      {selectedSchedule?.scheduleType === "MORNING"
                        ? "sáng"
                        : "chiều"}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#fff" }}>
                    Phòng {selectedSchedule?.roomName}
                  </Typography>
                  <Typography sx={{ color: "#fff" }}>
                    {selectedSchedule?.serviceName}
                  </Typography>
                </Stack>
              ))}
              <Divider
                sx={{
                  backgroundColor: "#fff",
                  display: selectedSchedules?.length > 1 ? "" : "none",
                  order: 2,
                }}
                variant="middle"
              />
            </Stack>
            <Typography
              sx={{
                color: "#fff",
                textAlign: "center",
                fontSize: "14px",
                position: "absolute",
                bottom: 10,
                left: "0",
                right: "0",
              }}
            >
              Vui lòng liên hệ trưởng khoa để thay đổi lịch khám
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SchedulePage;
