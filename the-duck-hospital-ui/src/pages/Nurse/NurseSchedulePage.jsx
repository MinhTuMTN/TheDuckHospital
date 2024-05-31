import { Grid, styled } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const LayoutContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,

    backgroundColor: "#F5F7FB",
  },
}));

const BoxLayout = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  borderRadius: 20,
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  backgroundColor: "#ffffff",
  width: "300px",
  height: "300px",
}));
const MainCalenderLayout = styled(Grid)(({ theme }) => ({
  display: "flex",
  marginBottom: 20,
  borderRadius: 20,
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  backgroundColor: "#ffffff",
}));

const appointments = [
  { date: "2023-05-30", shift: "morning" },
  { date: "2023-05-30", shift: "afternoon" },
  { date: "2023-05-31", shift: "evening" },
  { date: "2023-06-01", shift: "night" },
];

const shiftColors = {
  morning: "#fb11a5",
  afternoon: "#31ff3b",
  evening: "#4cb7ff",
  night: "#fcff68",
};

function NurseSchedulePage() {
  const renderDay = (day, _value, DayComponentProps) => {
    const dateString = day.format("YYYY-MM-DD");
    const dayAppointments = appointments.filter(
      (appointment) => appointment.date === dateString
    );

    return (
      <div style={{ position: "relative" }}>
        <PickersDay {...DayComponentProps} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 2,
            left: 0,
            right: 0,
          }}
        >
          {dayAppointments.map((appointment, index) => (
            <div
              key={index}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: shiftColors[appointment.shift],
                margin: "0 1px",
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <LayoutContainer container>
      <BoxLayout item xs={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{ height: "100%", width: "90%" }}
            renderDay={renderDay}
          />
        </LocalizationProvider>
      </BoxLayout>
      <MainCalenderLayout
        item
        xs={9}
        style={{
          width: "90%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      ></MainCalenderLayout>
    </LayoutContainer>
  );
}

export default NurseSchedulePage;
