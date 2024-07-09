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
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import {
  getDateHasSchedule,
  getExaminationRoomsDepartmentPagination,
  getSchedulesHeadDoctor,
  getTreatmentRoomsDepartmentPagination,
} from "../../../services/doctor/headDoctor/ScheduleServices";

function Row(props) {
  const { row, index, onClick, selectedRow } = props;
  const theme = useTheme();

  return (
    <>
      <TableRow
        key={index}
        onClick={() => onClick(row.roomId)}
        sx={{
          background:
            row.roomId === selectedRow ? theme.palette.template.normal1 : "",
          color: row.roomId === selectedRow ? "#fff" : "",
          "&:hover": {
            cursor: "pointer",
            background:
              row.roomId === selectedRow
                ? theme.palette.template.normal1
                : "#dfeaff",
          },
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

const TieuDeLichTruc = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem !important",
  fontWeight: "720 !important",
  borderBottom: "1px solid #d1d1d1",
}));

const TieuDePhong = styled(Typography)(({ theme }) => ({
  fontSize: "1.0rem !important",
  fontWeight: "720 !important",
  borderBottom: "1px solid #d1d1d1",
}));

function ShiftListPage(props) {
  const theme = useTheme();
  const [valueDate, setValueDate] = useState(dayjs());
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [totalItems, setTotalItems] = useState(0);
  const [examinationLimit, setExaminationLimit] = useState(5);
  const [examinationPage, setExaminationPage] = useState(1);
  const [treatmentLimit, setTreatmentLimit] = useState(5);
  const [treatmentPage, setTreatmentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [examinationRooms, setExaminationRooms] = useState([]);
  const [treatmentRooms, setTreatmentRooms] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [dateSchedule, setDateSchedule] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const handleExaminationPageChange = (event, newPage) => {
    setExaminationPage(newPage + 1);
  };

  const handleTreatmentPageChange = (event, newPage) => {
    setTreatmentPage(newPage + 1);
  };

  const handleGetExaminationRoomInDepartment = useCallback(async () => {
    const response = await getExaminationRoomsDepartmentPagination({
      page: examinationPage - 1,
      limit: examinationLimit,
    });
    if (response.success) {
      setExaminationRooms(response.data.data.rooms);
      if (response.data.data.rooms.length > 0) {
        setSelectedRow(response.data.data.rooms[0].roomId);
      }
      setTotalItems(response.data.data.total);
      setExaminationPage(response.data.data.page + 1);
      setExaminationLimit(response.data.data.limit);
    }
  }, [examinationPage, examinationLimit]);

  useEffect(() => {
    handleGetExaminationRoomInDepartment();
  }, [handleGetExaminationRoomInDepartment]);

  const handleGetTreatmentRoomInDepartment = useCallback(async () => {
    const response = await getTreatmentRoomsDepartmentPagination({
      page: treatmentPage - 1,
      limit: treatmentLimit,
    });
    if (response.success) {
      setTreatmentRooms(response.data.data.rooms);
      if (
        response.data.data.rooms.length > 0 &&
        !response.data.data.hasExaminationRooms
      ) {
        setSelectedRow(response.data.data.rooms[0].roomId);
      }
      setTotalItems(response.data.data.total);
      setTreatmentPage(response.data.data.page + 1);
      setTreatmentLimit(response.data.data.limit);
    }
  }, [treatmentPage, treatmentLimit]);

  useEffect(() => {
    handleGetTreatmentRoomInDepartment();
  }, [handleGetTreatmentRoomInDepartment]);

  useEffect(() => {
    const handleGetSchedules = async () => {
      const response = await getSchedulesHeadDoctor({
        roomId: selectedRow,
        date: dayjs(valueDate).format("YYYY/MM/DD"),
      });
      if (response.success) {
        setSchedules(response.data.data);
      }
    };

    if (selectedRow !== -1) handleGetSchedules();
  }, [selectedRow, valueDate, refresh]);

  useEffect(() => {
    const handleGetDateHasSchedule = async () => {
      const response = await getDateHasSchedule({
        roomId: selectedRow,
      });
      if (response.success) {
        setDateSchedule(
          response.data.data.map((date) => dayjs(date).format("YYYY/MM/DD"))
        );
      }
    };

    if (selectedRow !== -1) handleGetDateHasSchedule();
  }, [selectedRow, refresh]);

  function disableDateNotHasSchedule(date) {
    return !dateSchedule?.includes(date.format("YYYY/MM/DD"));
  }

  const handleClick = (key) => {
    setSelectedRow(key);
  };

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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
          <Stack spacing={2}>
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
                <TieuDeLichTruc
                  sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
                >
                  Buổi Sáng
                </TieuDeLichTruc>
                {schedules.morning?.doctor ? (
                  <ScheduleItem
                    schedule={schedules.morning}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    valueDate={valueDate}
                  />
                ) : (
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
                  </Stack>
                )}
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
                  <TieuDeLichTruc
                    sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
                  >
                    Buổi Chiều
                  </TieuDeLichTruc>
                </Box>
                {schedules.afternoon?.doctor ? (
                  <ScheduleItem
                    schedule={schedules.afternoon}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    valueDate={valueDate}
                  />
                ) : (
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
                  </Stack>
                )}
              </Stack>
            </Stack>
            {treatmentRooms?.find((room) => room.roomId === selectedRow) !==
              undefined && (
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
                  <TieuDeLichTruc
                    sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
                  >
                    Buổi Tối
                  </TieuDeLichTruc>
                  {schedules.evening?.doctor ? (
                    <ScheduleItem
                      schedule={schedules.evening}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      valueDate={valueDate}
                    />
                  ) : (
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
                    </Stack>
                  )}
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
                  <TieuDeLichTruc
                    sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
                  >
                    Buổi Khuya
                  </TieuDeLichTruc>
                  {schedules.night?.doctor ? (
                    <ScheduleItem
                      schedule={schedules.night}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      valueDate={valueDate}
                    />
                  ) : (
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
                    </Stack>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={2.2}>
          <Stack spacing={1}>
            <Stack
              direction="column"
              component={Paper}
              sx={{
                borderRadius: "10px",
                border: `1px solid #dadada`,
              }}
              spacing="2px"
            >
              <TieuDePhong
                sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
              >
                Phòng khám bệnh
              </TieuDePhong>
              <Table>
                <TableBody>
                  {examinationRooms?.map((row, index) => (
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
                onPageChange={handleExaminationPageChange}
                page={examinationPage - 1}
                rowsPerPage={examinationLimit}
                rowsPerPageOptions={[]}
              />
            </Stack>
            <Stack
              direction="column"
              component={Paper}
              sx={{
                borderRadius: "10px",
                border: `1px solid #dadada`,
              }}
              spacing="2px"
            >
              <TieuDePhong
                sx={{ paddingTop: 2, paddingBottom: 1, paddingX: 2 }}
              >
                Phòng nội trú
              </TieuDePhong>
              <Table>
                <TableBody>
                  {treatmentRooms?.map((row, index) => (
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
                onPageChange={handleTreatmentPageChange}
                page={treatmentPage - 1}
                rowsPerPage={treatmentLimit}
                rowsPerPageOptions={[]}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ShiftListPage;
