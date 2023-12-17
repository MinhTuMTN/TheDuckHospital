import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import FormatDate from "../../General/FormatDate";
import PatientDetail from "./PatientDetail";
import DoctorDetail from "./DoctorDetail";
import DoctorScheduleDetail from "./DoctorScheduleDetail";

const MuiAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: theme.spacing(1.2),
  marginBottom: theme.spacing(1),
  border: "1.5px solid grey",
  "&.Mui-expanded": {
    border: `2px solid ${theme.palette.template.normal2}`,
    borderRadius: `${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(1.2)} ${theme.spacing(1.2)}`,
  },
}));

const MuiAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: theme.spacing(1.2),
  "&.MuiAccordionSummary-root.Mui-expanded": {
    backgroundColor: theme.palette.template.normal2,
    borderRadius: `${theme.spacing(1.2)} ${theme.spacing(1.2)} 0 0`,
    color: "#fff",
  },
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
}));

function BookingTransactionItem(props) {
  const { item, panel, expanded, handleChange } = props;
  const theme = createTheme();

  return (
    <MuiAccordion
      expanded={expanded === panel}
      onChange={handleChange(panel)}
      sx={{
        '&:before': {
          display: 'none',
        },
        '&:last-child': {
          borderRadius: theme.spacing(1.2)
        },
        '&:first-of-type': {
          borderRadius: theme.spacing(1.2)
        },
      }}
    >
      <MuiAccordionSummary>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack width="35%">
            <Stack direction="row" spacing={1}>
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {item.doctorSchedule.doctorDegree}. {item.doctorSchedule.doctorName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography
                style={{
                  fontSize: "16px",
                }}
              >
                {item.doctorSchedule?.serviceName}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1} alignItems="flex-end">
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "18px"
              }}
            >{item.booking?.bookingCode}
            </Typography>
            <Typography
              style={{
                fontSize: "16px"
              }}
            >
              <FormatDate dateTime={item.doctorSchedule?.date} />
            </Typography>
          </Stack>
        </Stack>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
        <Stack
          direction={"column"}
          spacing={5}
          sx={{ margin: 2 }}
        >
          <Stack
            direction={"row"}
            spacing={3}
            sx={{ margin: 2 }}
          >
            <PatientDetail patient={item.patientProfile} />
            <Stack
              direction={"column"}
              spacing={1}
              sx={{
                width: "50%"
              }}
            >
              <DoctorDetail doctorSchedule={item.doctorSchedule} />
              <DoctorScheduleDetail
                doctorSchedule={item.doctorSchedule}
                queueNumber={item.booking.queueNumber}
              />
            </Stack>
          </Stack>

        </Stack>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}

export default BookingTransactionItem;
