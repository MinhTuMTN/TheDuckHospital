import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import BorderTextBox from "../../../components/Admin/PatientManagement/BorderTextBox";
import { DateCalendar, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import SearchIcon from '@mui/icons-material/Search';
import ScheduleItem from "../../../components/Doctor/HeadDoctor/ShiftList/ScheduleItem";
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

// function disableInvalidMorningDate(date) {
//   return invalidDate.mornings?.includes(date.format("YYYY/MM/DD"));
// }

const items = [
  {
    roomId: 1,
    roomName: "A1-101",
    departmentName: "Khoa da liễu",
    deleted: "false",
  },
  {
    roomId: 2,
    roomName: "A1-101",
    departmentName: "Khoa da liễu",
    deleted: "false",
  },
  {
    roomId: 3,
    roomName: "A1-101",
    departmentName: "Khoa da liễu",
    deleted: "false",
  },
  {
    roomId: 4,
    roomName: "A1-101",
    departmentName: "Khoa da liễu",
    deleted: "false",
  },
  {
    roomId: 5,
    roomName: "A1-101",
    departmentName: "Khoa da liễu",
    deleted: "false",
  },
];

const morningSchedule = {
  doctorName: "PGS. Nguyễn Văn A",
  phoneNumber: "0123456789",
  identityNumber: "123456789012",
  email: "anv@theduckhospital.onmicrosoft.com",
  booking: 10,
  gender: "FEMALE",
  dateOfBirth: "27/01/2002",
};

const afternoonSchedule = {
  doctorName: "PGS. Nguyễn Văn B",
  phoneNumber: "0123456789",
  identityNumber: "123456789012",
  email: "bnv@theduckhospital.onmicrosoft.com",
  booking: 20,
  gender: "MALE",
  dateOfBirth: "27/01/2002",
};

function Row(props) {
  const { row, index, onClick, selectedRow } = props;
  const theme = useTheme()

  return (
    <>
      <TableRow
        key={index}
        onClick={() => onClick(row.roomId)}
        sx={{
          background: row.roomId === selectedRow ? theme.palette.template.normal1 : "",
          color: row.roomId === selectedRow ? "#fff" : "",
          "&:hover": {
            cursor: "pointer",
            background: row.roomId === selectedRow ? theme.palette.template.normal1 : "#dfeaff"
          }
        }}
      >
        <TableCell
          align="center"
          sx={{
            color: row.roomId === selectedRow ? "#fff" : "",
            fontWeight: row.roomId === selectedRow ? 500 : "",
          }}
        >
          {row.roomName}
        </TableCell>
      </TableRow>
    </>
  );
}

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  "& input": {
    height: "45px",
    fontSize: "18px",
  },
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  fontWeight: "720 !important",
  borderBottom: "1px solid #d1d1d1"
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F6F8",
    color: theme.palette.text.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));

function ShiftListPage(props) {
  const theme = useTheme();
  const [valueDate, setValueDate] = useState(dayjs());
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(1);

  const handleClick = (key) => {
    setSelectedRow(key);
    console.log(key);
  }

  return (
    <Stack
      direction="column"
      sx={{
        py: 3,
        px: isFullScreen ? 5 : 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction={"row"} spacing={3} alignItems={"center"}>
        <Typography
          sx={{
            fontSize: "32px",
            color: "#474747",
          }}
          fontWeight="600"
        >
          Danh sách ca trực
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="en-gb"
        >
          <CustomDatePicker
            label="Ngày làm việc"
            value={valueDate}
            onChange={(newDate) => setValueDate(newDate)}
          />
        </LocalizationProvider>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{ mt: 3, justifyContent: "space-between" }}
      >
        <Grid item xs={10}>
          <Stack direction="row" spacing={2}>
            <Stack
              direction="column"
              component={Paper}
              sx={{
                paddingBottom: 2,
                borderRadius: "10px",
                border: `1px solid #dadada`,
                width: "50%",
              }}
              spacing="2px"
            >
              <TieuDe sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}>
                Buổi Sáng
              </TieuDe>
              {morningSchedule ?
                <ScheduleItem schedule={morningSchedule} /> :
                <Stack
                  sx={{
                    padding: 2,

                  }}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"100%"}
                  direction={"row"}
                >
                  <EventBusyOutlinedIcon />
                  <Typography sx={{ fontSize: "18px" }}>
                    Không có lịch trực
                  </Typography>
                </Stack>}
            </Stack>
            <Stack
              direction="column"
              component={Paper}
              sx={{
                paddingBottom: 2,
                borderRadius: "10px",
                border: `1px solid #dadada`,
                width: "50%",
              }}
              spacing="2px"
            >
              <Box>
                <TieuDe sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}>
                  Buổi Chiều
                </TieuDe>
              </Box>
              {afternoonSchedule ?
                <ScheduleItem schedule={afternoonSchedule} /> :
                <Stack
                  sx={{
                    padding: 2,

                  }}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"100%"}
                  direction={"row"}
                >
                  <EventBusyOutlinedIcon />
                  <Typography sx={{ fontSize: "18px" }}>
                    Không có lịch trực
                  </Typography>
                </Stack>}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="column"
            component={Paper}
            sx={{
              paddingBottom: 2,
              borderRadius: "10px",
              border: `1px solid #dadada`,
            }}
            spacing="2px"
          >
            <TieuDe sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}>
              Danh sách phòng
            </TieuDe>
            <Table>
              <TableBody>
                {items?.map((row, index) => (
                  <Row
                    key={index}
                    row={row}
                    onClick={handleClick}
                    selectedRow={selectedRow}
                  />
                ))}
              </TableBody>
            </Table>
            <Pagination
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
              count={2}
              page={page + 1}
              onChange={(event, value) => setPage(value - 1)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ShiftListPage;
