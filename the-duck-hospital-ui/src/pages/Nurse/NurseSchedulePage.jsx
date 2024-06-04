import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getNurseSchedules } from "../../services/nurse/NurseScheduleServices";
import { getScheduleSession } from "../../utils/scheduleSessionUtils";

const LayoutContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: "#F5F7FB",
  height: "100%",
  minHeight: "100vh",
  [theme.breakpoints.up("lg")]: {
    paddingTop: 30,
  },
}));

const BoxLayout = styled(Grid)({
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
});

const CategoryLine = styled(Stack)({
  alignItems: "center",
  justifyContent: "left",
  borderBottom: "1px solid #E0E0E0",
  width: "100%",
  paddingLeft: 10,
  paddingBottom: 5,
  marginBottom: 10,
});

const MainCalenderLayout = styled(Grid)(({ theme }) => ({
  marginBottom: 20,
  borderRadius: 20,
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  backgroundColor: "#ffffff",
  [theme.breakpoints.up("lg")]: {
    marginLeft: 20,
    justifyContent: "right",
  },
}));

const shiftColors = {
  morning: "#f5dc00",
  afternoon: "#27c300",
  evening: "#2fa9fa",
  night: "#f56d61",
};

const ShiftLegend = React.memo(({ color, text }) => (
  <CategoryLine spacing={1} direction="row">
    <CircleIcon sx={{ color, fontSize: 15 }} />
    <Typography variant="body1" align="left" width="100%">
      {text}
    </Typography>
  </CategoryLine>
));

const Line = React.memo(({ color }) => (
  <Box
    sx={{
      display: "block",
      width: "100%",
      height: "4px",
      backgroundColor: `${color} !important`,
      marginTop: "2px",
    }}
  />
));

const ClinicalScheduleDay = React.memo((props) => {
  const {
    clinicalSchedules = [],
    day,
    outsideCurrentMonth,
    selected,
    ...other
  } = props;
  const clinicalSchedule = useMemo(
    () =>
      clinicalSchedules.filter(
        (schedule) => dayjs(day).get("day") + 1 === schedule.dayOfWeek
      ),
    [clinicalSchedules, day]
  );

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{
        borderRadius: "10px",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        backgroundColor: selected
          ? "rgba(42, 209, 246, 0.329) !important"
          : "transparent",
        padding: 1,
        height: "25%",
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography fontSize="18px">{dayjs(day).get("date")}</Typography>
        {clinicalSchedule
          .sort(
            (a, b) =>
              ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
                a.scheduleSession
              ) -
              ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
                b.scheduleSession
              )
          )
          .map((schedule) => (
            <Line
              key={schedule.nurseScheduleId}
              color={shiftColors[schedule.scheduleSession.toLowerCase()]}
            />
          ))}
      </Stack>
    </PickersDay>
  );
});

const InpatientScheduleDay = React.memo((props) => {
  const {
    inpatientSchedules = [],
    day,
    outsideCurrentMonth,
    selected,
    ...other
  } = props;
  const inpatientSchedule = useMemo(
    () =>
      inpatientSchedules.filter(
        (schedule) =>
          dayjs(day).format("YYYY/MM/DD") ===
          dayjs(schedule.date).format("YYYY/MM/DD")
      ),
    [inpatientSchedules, day]
  );
  const distictFilter = (value, index, schedules) => {
    return (
      schedules.findIndex(
        (schedule) => schedule.scheduleSession === value.scheduleSession
      ) === index
    );
  };

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{
        borderRadius: "10px",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        backgroundColor: selected
          ? "rgba(42, 209, 246, 0.329) !important"
          : "transparent",
        padding: 1,
        height: "25%",
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography fontSize="18px">{dayjs(day).get("date")}</Typography>
        {inpatientSchedule
          .filter(distictFilter)
          .sort(
            (a, b) =>
              ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
                a.scheduleSession
              ) -
              ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
                b.scheduleSession
              )
          )
          .map((schedule) => (
            <Line
              key={schedule.nurseScheduleId}
              color={shiftColors[schedule.scheduleSession.toLowerCase()]}
            />
          ))}
      </Stack>
    </PickersDay>
  );
});

function NurseSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { nurseType } = useAuth();
  const [clinicalSchedule, setClinicalSchedule] = useState([]);
  const [inpatientSchedule, setInpatientSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const { enqueueSnackbar } = useSnackbar();

  const handleMonthChange = useCallback((month) => setCurrentMonth(month), []);

  useEffect(() => {
    const selectedSchedule = clinicalSchedule
      .filter((schedule) => selectedDate.get("day") + 1 === schedule.dayOfWeek)
      .sort(
        (a, b) =>
          ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
            a.scheduleSession
          ) -
          ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
            b.scheduleSession
          )
      );

    const selectedInpatientSchedule = inpatientSchedule
      .filter(
        (schedule) =>
          dayjs(selectedDate).format("YYYY/MM/DD") ===
          dayjs(schedule.date).format("YYYY/MM/DD")
      )
      .sort(
        (a, b) =>
          ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
            a.scheduleSession
          ) -
          ["MORNING", "AFTERNOON", "EVENING", "NIGHT"].indexOf(
            b.scheduleSession
          )
      );

    setSelectedSchedule(
      nurseType === "CLINICAL_NURSE"
        ? selectedSchedule
        : selectedInpatientSchedule
    );
  }, [selectedDate, clinicalSchedule, inpatientSchedule, nurseType]);

  useEffect(() => {
    const handleGetNurseSchedule = async () => {
      const response = await getNurseSchedules(
        currentMonth.get("month") + 1,
        currentMonth.get("year")
      );
      if (response.success) {
        nurseType === "CLINICAL_NURSE"
          ? setClinicalSchedule(response.data.data)
          : setInpatientSchedule(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    };

    if (["CLINICAL_NURSE", "INPATIENT_NURSE"].includes(nurseType)) {
      handleGetNurseSchedule();
    }
  }, [nurseType, enqueueSnackbar, currentMonth]);
  return (
    <LayoutContainer container>
      <BoxLayout item md={3}>
        <Stack direction={"column"}>
          <Stack
            direction={"column"}
            sx={{
              height: 250,
              borderRadius: 4,
              paddingTop: "20px",
              paddingBottom: "15px",
              paddingLeft: 2,
              paddingRight: 1.5,
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              backgroundColor: "#ffffff",
            }}
          >
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
                marginBottom: 12,
                paddingLeft: 5,
              }}
            >
              <CalendarTodayIcon />
              <Typography
                variant="h6"
                style={{
                  marginLeft: 5,
                }}
              >
                Lịch trực {selectedDate.format("DD/MM/YYYY")}:
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              spacing={1.5}
              style={{
                paddingLeft: 15,
                flex: 1,
              }}
            >
              {selectedSchedule.map((schedule) => (
                <Stack
                  key={schedule.nurseScheduleId}
                  direction={"row"}
                  spacing={0.5}
                  alignItems={"center"}
                >
                  <RemoveIcon fontSize="1" />
                  <Typography>
                    Ca {getScheduleSession(schedule.scheduleSession)}: phòng{" "}
                    {schedule.roomName}
                  </Typography>
                </Stack>
              ))}

              {selectedSchedule.length === 0 && (
                <Typography>Không có ca trực nào</Typography>
              )}
            </Stack>
            <Typography fontSize={12} fontStyle={"italic"}>
              *Vui lòng liên hệ điều dưỡng trưởng để đổi lịch trực
            </Typography>
          </Stack>

          <Stack
            direction={"column"}
            spacing={1}
            style={{
              paddingRight: 15,
              paddingLeft: 15,
              paddingTop: 20,
              paddingBottom: 25,
              borderRadius: 10,
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              backgroundColor: "#ffffff",
              marginTop: 20,
            }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              style={{ alignItems: "center", marginBottom: 8 }}
            >
              <EventNoteIcon />
              <Typography variant="h6">Giờ trực:</Typography>
            </Stack>
            <ShiftLegend
              color={shiftColors.morning}
              text="Ca sáng từ 6h - 12h"
            />
            <ShiftLegend
              color={shiftColors.afternoon}
              text="Ca trưa từ 12h - 18h"
            />
            <ShiftLegend
              color={shiftColors.evening}
              text="Ca tối từ 18h - 0h"
            />
            <ShiftLegend color={shiftColors.night} text="Ca khuya từ 0h - 6h" />
          </Stack>
        </Stack>
      </BoxLayout>

      <MainCalenderLayout item md={8.65}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            date={selectedDate}
            onMonthChange={handleMonthChange}
            onChange={(newDate) => setSelectedDate(dayjs(newDate.toDate()))}
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
              "div:nth-of-type(2) .MuiPickersFadeTransitionGroup-root": {
                height: "500px",
              },
              "div[role='rowgroup'], div:nth-of-type(2) div[role='presentation']":
                {
                  height: "500px",
                  zIndex: 1,
                },
              "button[role='gridcell'], div[role='gridcell']": {
                height: "70px",
                width: "100px",
              },
            }}
            slots={{
              day:
                nurseType === "CLINICAL_NURSE"
                  ? ClinicalScheduleDay
                  : InpatientScheduleDay,
            }}
            slotProps={{
              day: {
                clinicalSchedules: clinicalSchedule,
                inpatientSchedules: inpatientSchedule,
                sx: {
                  "& .MuiPickersDay-root": {
                    "&.Mui-selected": {
                      backgroundColor: "blue !important",
                    },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </MainCalenderLayout>
    </LayoutContainer>
  );
}

export default NurseSchedulePage;
