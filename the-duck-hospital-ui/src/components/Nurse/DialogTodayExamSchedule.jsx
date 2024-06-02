import styled from "@emotion/styled";
import {
  ClearOutlined,
  RoomOutlined,
  WbTwilightOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NurseContext } from "../../auth/NurseProvider";
import { getTodayExaminationDoctorSchedule } from "../../services/nurse/NurseScheduleServices";

const StyledDoctorSchedule = styled(Card)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  padding: "8px",
  cursor: "pointer",
  flex: "1",
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

function DialogTodayExamSchedule(props) {
  const { open, setOpen, onClose } = props;
  const [schedules, setSchedules] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const {
    updateDoctorScheduleId,
    updateRoomId,
    updateRoomName,
    updateDepartmentName,
  } = useContext(NurseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetTodayExaminationDoctorSchedule = async () => {
      setIsLoading(true);
      const response = await getTodayExaminationDoctorSchedule();
      setIsLoading(false);
      if (response.success) setSchedules(response.data.data);
      else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };

    if (!open) return;
    handleGetTodayExaminationDoctorSchedule();
  }, [enqueueSnackbar, open]);
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
        <Typography variant="h6">Danh sách ca trực hôm nay</Typography>
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
        <Box width={"30vw"} overflow={"auto"} paddingTop={2}>
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

          {!isLoading && schedules && schedules.length === 0 && (
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Không có ca trực nào để hiển thị</Typography>
            </Box>
          )}

          {!isLoading && schedules && schedules.length > 0 && (
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
              spacing={1}
            >
              {schedules.map((schedule) => (
                <StyledDoctorSchedule
                  onClick={() => {
                    updateDoctorScheduleId(
                      schedule.doctorSchedule?.doctorScheduleId
                    );
                    updateRoomId(schedule.room.roomId);
                    updateRoomName(schedule.room.roomName);
                    updateDepartmentName(schedule.department.departmentName);
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
                    {schedule.doctorSchedule?.scheduleSession === "MORNING"
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
                    {`${schedule.department?.departmentName} - ${schedule.room?.roomName}`}
                  </StyledTypography>
                </StyledDoctorSchedule>
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DialogTodayExamSchedule;
