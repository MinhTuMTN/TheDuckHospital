import styled from "@emotion/styled";
import {
  ClearOutlined,
  ExpandMore,
  RoomOutlined,
  WbTwilightOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NurseContext } from "../../auth/NurseProvider";
import { findRoom, getDoctorSchedule } from "../../services/nurse/RoomServices";

const RoomItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const StyledDoctorSchedule = styled(Card)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  padding: "8px",
  cursor: "pointer",
  width: "50%",
  maxWidth: "50%",
  overflow: "hidden",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  fontSize: "14px",
}));

function RoomItem(props) {
  const { room } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [schedules, setSchedules] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    updateDoctorScheduleId,
    updateRoomId,
    updateRoomName,
    updateDepartmentName,
  } = useContext(NurseContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleGetSchedule = async () => {
      if (!expanded) return;
      setIsLoading(true);
      const response = await getDoctorSchedule(room.roomId);
      if (response.success) {
        const data = response.data.data;
        data.sort((a, b) => {
          if (a.doctorSchedule?.scheduleType === "MORNING") return -1;
          return 1;
        });
        setSchedules(data);
      }
      setIsLoading(false);
    };
    handleGetSchedule();
  }, [room.roomId, expanded]);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      elevation={3}
      variant="outlined"
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <RoomItemContainer>
          <Typography flex={1} color={"template.darker"} fontWeight={500}>
            {room.roomName}
          </Typography>
          <Typography flex={2} color={"template.darker"} fontWeight={500}>
            {room.departmentName}
          </Typography>
        </RoomItemContainer>
      </AccordionSummary>

      {isLoading && (
        <AccordionDetails>
          <Typography>
            Đang tải dữ liệu. Vui lòng đợi trong giây lát...
          </Typography>
        </AccordionDetails>
      )}

      {!isLoading && (!schedules || schedules.length === 0) && (
        <AccordionDetails>
          <Typography>Không có lịch khám nào được tạo</Typography>
        </AccordionDetails>
      )}

      {!isLoading && schedules && schedules.length > 0 && (
        <AccordionDetails>
          <Typography variant="h6">Chọn ca trực</Typography>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            {schedules.map((schedule) => (
              <StyledDoctorSchedule
                onClick={() => {
                  updateDoctorScheduleId(
                    schedule.doctorSchedule?.doctorScheduleId
                  );
                  updateRoomId(room.roomId);
                  updateRoomName(room.roomName);
                  updateDepartmentName(room.departmentName);
                  navigate("/nurse-room");
                }}
              >
                <StyledTypography color={"template.normal1"} fontWeight={500}>
                  <WbTwilightOutlined
                    sx={{
                      marginRight: "8px",
                    }}
                  />
                  Buổi{" "}
                  {schedule.doctorSchedule?.scheduleType === "MORNING"
                    ? "sáng"
                    : "chiều"}
                </StyledTypography>
                <StyledTypography color={"red.main"}>
                  <Typography
                    src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701684643/doctor_jpgjbk.png"
                    component={"img"}
                    width={"24px"}
                    height={"24px"}
                    marginRight={"8px"}
                  />
                  {`${schedule.doctor?.degree} ${schedule.doctor?.fullName}`}
                </StyledTypography>
                <StyledTypography color={"template.darker"}>
                  <RoomOutlined
                    sx={{
                      marginRight: "8px",
                    }}
                  />
                  {schedule.department?.departmentName}
                </StyledTypography>
              </StyledDoctorSchedule>
            ))}
          </Stack>
        </AccordionDetails>
      )}
    </Accordion>
  );
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));

function DialogSearchRoom(props) {
  const { open, setOpen, onClose } = props;

  const [roomNameSearch, setRoomNameSearch] = React.useState("");
  const [rooms, setRooms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const handleSearchRoom = async () => {
      if (roomNameSearch.trim() === "") return;
      setIsLoading(true);
      const response = await findRoom(roomNameSearch);
      if (response.success) setRooms(response.data.data);
      setIsLoading(false);
    };
    handleSearchRoom();
  }, [roomNameSearch]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        onClose();
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "0px",
        }}
      >
        <Typography variant="h6">Tìm kiếm phòng khám</Typography>
        <IconButton
          sx={{ border: "1px solid #000", p: 0.3 }}
          onClick={() => {
            setOpen(false);
            onClose();
          }}
        >
          <ClearOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography minWidth={450}>
            Vui lòng nhập tên phòng khám để tiếp tục
          </Typography>
        </DialogContentText>
        <CustomTextField
          autoFocus
          fullWidth
          style={{ margin: "16px 0" }}
          variant="outlined"
          label="Tên phòng khám"
          size="small"
          autoComplete="off"
          value={roomNameSearch}
          onChange={(e) => setRoomNameSearch(e.target.value)}
        />
        <Box height={220} minWidth={"100%"} maxWidth={"100%"} overflow={"auto"}>
          {isLoading && (
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress color="normal1" />
            </Box>
          )}

          {!isLoading && rooms && rooms.length === 0 && (
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Không có kết quả nào phù hợp</Typography>
            </Box>
          )}

          {!isLoading &&
            rooms &&
            rooms.length > 0 &&
            rooms.map((room) => <RoomItem room={room} />)}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DialogSearchRoom;
