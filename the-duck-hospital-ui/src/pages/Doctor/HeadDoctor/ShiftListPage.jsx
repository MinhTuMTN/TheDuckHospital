import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import ScheduleItem from "../../../components/Doctor/HeadDoctor/ShiftList/ScheduleItem";
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { getDateHasSchedule, getRoomsDepartmentPagination, getSchedulesHeadDoctor } from "../../../services/doctor/headDoctor/ScheduleServices";

function Row(props) {
  const { row, index, onClick, selectedRow } = props;
  const theme = useTheme();

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

function ShiftListPage(props) {
  const theme = useTheme();
  const [valueDate, setValueDate] = useState(dayjs());
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [dateSchedule, setDateSchedule] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleGetRoomInDepartment = useCallback(async () => {
    const response = await getRoomsDepartmentPagination({
      page: page - 1,
      limit: limit,
    });
    if (response.success) {
      setRooms(response.data.data.rooms);
      if (response.data.data.rooms.length > 0) {
        setSelectedRow(response.data.data.rooms[0].roomId);
      }
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    }
  }, [limit, page]);

  useEffect(() => {
    handleGetRoomInDepartment();
  }, [handleGetRoomInDepartment]);

  useEffect(() => {
    const handleGetSchedules = async () => {
      const response = await getSchedulesHeadDoctor({
        roomId: selectedRow,
        date: dayjs(valueDate).format("YYYY/MM/DD"),
      });
      if (response.success) {
        setSchedules(response.data.data);
      }
    }

    handleGetSchedules();
  }, [selectedRow, valueDate, refresh]);

  useEffect(() => {
    const handleGetDateHasSchedule = async () => {
      const response = await getDateHasSchedule({
        roomId: selectedRow,
      });
      if (response.success) {
        setDateSchedule(
          response.data.data.map(
            (date) => dayjs(date).format("YYYY/MM/DD")
          )
        );
      }
    };

    handleGetDateHasSchedule();
  }, [selectedRow, refresh]);

  function disableDateNotHasSchedule(date) {
    return !dateSchedule?.includes(date.format("YYYY/MM/DD"));
  }

  const handleClick = (key) => {
    setSelectedRow(key);
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
            shouldDisableDate={disableDateNotHasSchedule}
          />
        </LocalizationProvider>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{ mt: 3, justifyContent: "space-between" }}
      >
        <Grid item xs={9.8}>
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
              {schedules.morning?.doctor ?
                <ScheduleItem
                  schedule={schedules.morning}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  valueDate={valueDate}
                /> :
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
              {schedules.afternoon?.doctor ?
                <ScheduleItem
                  schedule={schedules.afternoon}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  valueDate={valueDate}
                /> :
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
        <Grid item xs={2.2}>
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
                {rooms?.map((row, index) => (
                  <Row
                    key={index}
                    row={row}
                    onClick={handleClick}
                    selectedRow={selectedRow}
                  />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component={"div"}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
              count={totalItems}
              onPageChange={handlePageChange}
              page={page - 1}
              rowsPerPage={limit}
              rowsPerPageOptions={[]}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ShiftListPage;
