import CircleIcon from "@mui/icons-material/Circle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const LayoutContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: "#F5F7FB",
  height: "100%",

  [theme.breakpoints.up("lg")]: {
    paddingTop: 30,
  },
}));

const BoxLayout = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
}));

const CategoryLine = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "left",
  borderBottom: "1px solid #E0E0E0",
  width: "100%",
  paddingLeft: 10,
  paddingBottom: 5,
  marginBottom: 10,
}));

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

const ShiftLegend = ({ color, text }) => (
  <CategoryLine spacing={1} direction={"row"}>
    <CircleIcon sx={{ color, fontSize: 15 }} />
    <Typography variant="body1" align="left" width={"100%"}>
      {text}
    </Typography>
  </CategoryLine>
);

function Line(props) {
  const { color } = props;
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        height: "4px",
        backgroundColor: `${color} !important`,
        marginTop: "2px",
      }}
    />
  );
}

function ServerDay(props) {
  const {
    highlight = [],
    day,
    outsideCurrentMonth,
    selected,
    ...other
  } = props;
  onclick = () => {
    console.log("clicked");
  };
  const isSelected = highlight.indexOf(props.day.date()) >= 0;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        backgroundColor: selected
          ? "rgba(42, 209, 246, 0.329) !important"
          : "transparent",
        padding: 1,
        height: "25%",
      }}
    >
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Typography fontSize={"18px"}>{dayjs(day).get("date")}</Typography>
        {isSelected && (
          <>
            <Line color={shiftColors.afternoon} />
            <Line color={shiftColors.night} />
          </>
        )}
      </Stack>
    </PickersDay>
  );
}

function NurseSchedulePage() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
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
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                <RemoveIcon fontSize="1" />
                <Typography>Ca sáng: phòng A101</Typography>
              </Stack>
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                <RemoveIcon fontSize="1" />
                <Typography>Ca tối: phòng C202</Typography>
              </Stack>
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
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlight: [1, 2, 10],
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
