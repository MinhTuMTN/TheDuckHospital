import styled from "@emotion/styled";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FormatDate from "../../../General/FormatDate";
import {
  deleteDoctorSchedule,
  getDoctorsInDepartmentHasNoScheduleOnDate,
  updateDoctorSchedule,
} from "../../../../services/doctor/headDoctor/ScheduleServices";
import { enqueueSnackbar } from "notistack";
import DialogConfirm from "../../../General/DialogConfirm";
import DialogForm from "../../../General/DialogForm";
import dayjs from "dayjs";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "2px !important",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  input: {
    height: "3.5rem",
  },
}));

function ScheduleItem(props) {
  const { schedule, setRefresh, refresh, valueDate } = props;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [editDoctorSchedule, setEditDoctorSchedule] = useState({
    selectedDoctor: "",
    slotPerHour: null,
  });
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const currentDay = dayjs();

  const handleDeleteSchedule = async () => {
    const response = await deleteDoctorSchedule(schedule.doctorScheduleId);
    if (response.success) {
      enqueueSnackbar("Xóa lịch trực thành công", { variant: "success" });
      setRefresh(!refresh);
    } else enqueueSnackbar("Xóa lịch trực thất bại", { variant: "error" });
  };

  const getDoctorsInDepartment = useCallback(async () => {
    const response = await getDoctorsInDepartmentHasNoScheduleOnDate(
      schedule?.doctorScheduleId,
      schedule?.doctor?.staffId,
      { isExamination: schedule?.scheduleType === "EXAMINATION" }
    );
    if (response.success) {
      setDoctors(response.data.data);
    }
  }, [schedule]);

  useEffect(() => {
    if (openDialogForm)
      setEditDoctorSchedule((prev) => ({
        ...prev,
        selectedDoctor: schedule?.doctor.staffId,
      }));
  }, [openDialogForm, schedule]);

  useEffect(() => {
    getDoctorsInDepartment();
  }, [getDoctorsInDepartment]);

  const handleUpdateSchedule = async () => {
    setUpdateButtonClicked(true);

    if (editDoctorSchedule.selectedDoctor === "") {
      enqueueSnackbar("Bác sĩ không được để trống", { variant: "error" });
      return;
    }

    if (
      (editDoctorSchedule.slotPerHour * 4 < schedule.slot ||
        editDoctorSchedule.slotPerHour === 0) &&
      schedule?.scheduleType === "EXAMINATION"
    ) {
      enqueueSnackbar("Số chỗ phải lớn hơn số lượng cũ", {
        variant: "error",
      });
      return;
    }

    if (
      dayjs(valueDate).isSame(currentDay, "day") ||
      dayjs(valueDate).isBefore(currentDay, "day")
    ) {
      enqueueSnackbar("Chỉ được cập nhật lịch trực trước hôm nay một ngày", {
        variant: "error",
      });
      return;
    }

    const response = await updateDoctorSchedule(schedule.doctorScheduleId, {
      staffId: editDoctorSchedule.selectedDoctor,
      slotPerHour: editDoctorSchedule.slotPerHour,
      date: dayjs(valueDate).format("YYYY-MM-DD"),
    });
    if (response.success) {
      enqueueSnackbar("Cập nhật lịch trực thành công!", {
        variant: "success",
      });
      setOpenDialogForm(false);
      setRefresh(!refresh);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  return (
    <Stack
      sx={{
        padding: 2,
      }}
      spacing={1}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <Person2OutlinedIcon />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Bác sĩ
          </Typography>
        </Stack>
        <Typography>
          {`${schedule.doctor.degree}. ${schedule.doctor.fullName}`}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <WcOutlinedIcon />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Giới tính
          </Typography>
        </Stack>
        <Typography>
          {schedule.doctor.gender === "MALE" ? "Nam" : "Nữ"}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <PhoneAndroidOutlinedIcon />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Số điện thoại
          </Typography>
        </Stack>
        <Typography>{schedule.doctor.phoneNumber}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <FingerprintIcon />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            CCCD
          </Typography>
        </Stack>
        <Typography>{schedule.doctor.identityNumber}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <CakeOutlinedIcon />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Ngày sinh
          </Typography>
        </Stack>
        <Typography>
          <FormatDate dateTime={schedule.doctor.dateOfBirth} />
        </Typography>
      </Stack>

      {schedule?.scheduleType === "EXAMINATION" && (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1}>
              <BookmarkAddedOutlinedIcon />
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Đặt trước
              </Typography>
            </Stack>
            <Typography>{schedule.numberOfBookings}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1}>
              <EventAvailableOutlinedIcon />
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Chỗ còn lại
              </Typography>
            </Stack>
            <Typography>{schedule.slot - schedule.numberOfBookings}</Typography>
          </Stack>
        </>
      )}
      <Stack
        spacing={1}
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{
          paddingTop: 2,
        }}
      >
        <CustomButton
          variant="contained"
          disabled={schedule.numberOfBookings > 0 || dayjs(valueDate).isBefore(currentDay, "day")}
          sx={{
            background: "linear-gradient(to right, rgba(253, 57, 122, 0.229), rgba(232, 106, 148, 0.229))",
            color: "#fd397a",
            width: "35%",
            "&:hover": {
              background: "linear-gradient(to right, rgba(253, 57, 122, 0.229), rgba(232, 106, 148, 0.229))",
            },
          }}
          onClick={() => setDeleteDialog(true)}
        >
          Xóa
        </CustomButton>
        <CustomButton
          variant="contained"
          disabled={
            dayjs(valueDate).isSame(currentDay, "day") ||
            dayjs(valueDate).isBefore(currentDay, "day")
          }
          sx={{
            background: "linear-gradient(to right, #42a5f5, #6fccea)",
            color: "#fff",
            width: "35%",
            "&:hover": {
              background: "linear-gradient(to right, #42a5f5, #6fccea)",
            },
          }}
          onClick={() => {
            setEditDoctorSchedule((prev) => ({
              ...prev,
              selectedDoctor: "",
            }));
            setOpenDialogForm(true);
          }}
        >
          Cập nhật
        </CustomButton>
      </Stack>
      <DialogConfirm
        open={deleteDialog}
        title={"Xóa lịch làm việc"}
        content={"Bạn có chắc chắn muốn xóa lịch làm việc này này?"}
        okText={"Xóa"}
        cancelText={"Hủy"}
        onOk={handleDeleteSchedule}
        onCancel={() => setDeleteDialog(false)}
        onClose={() => setDeleteDialog(false)}
      />

      <DialogForm
        cancelText={"Hủy"}
        okText={"Cập nhật"}
        onCancel={() => {
          setOpenDialogForm(false);
          setUpdateButtonClicked(false);
        }}
        onOk={handleUpdateSchedule}
        open={openDialogForm}
        title={"Cập nhật lịch trực"}
        onClose={() => {
          setOpenDialogForm(false);
          setUpdateButtonClicked(false);
        }}
      >
        <Stack direction="row" width={"30rem"} mt={3} spacing={1}>
          <Box
            style={{
              width: schedule?.scheduleType !== "EXAMINATION" ? "100%" : "60%",
            }}
          >
            <CustomTypography
              variant="body1"
              style={{
                color:
                  editDoctorSchedule.selectedDoctor === "" &&
                  updateButtonClicked
                    ? "red"
                    : "",
              }}
            >
              Bác sĩ
            </CustomTypography>
            <FormControl
              fullWidth
              error={
                editDoctorSchedule.selectedDoctor === "" && updateButtonClicked
              }
            >
              <Select
                value={editDoctorSchedule.selectedDoctor}
                onChange={(e) => {
                  setEditDoctorSchedule((prev) => ({
                    ...prev,
                    selectedDoctor: e.target.value,
                  }));
                }}
                displayEmpty
                required
                sx={{
                  fontSize: "16px !important",
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                {doctors?.map((item, index) => (
                  <MenuItem key={index} value={item.staffId}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.fullName}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {editDoctorSchedule.selectedDoctor === "" &&
                updateButtonClicked && (
                  <FormHelperText>Bác sĩ không được để trống</FormHelperText>
                )}
            </FormControl>
          </Box>
          {schedule?.scheduleType === "EXAMINATION" && (
            <Box
              style={{
                width: "40%",
              }}
            >
              <CustomTypography
                variant="body1"
                style={{
                  color:
                    (editDoctorSchedule.slotPerHour * 4 < schedule.slot ||
                      editDoctorSchedule.slotPerHour === 0) &&
                    updateButtonClicked
                      ? "red"
                      : "",
                }}
              >
                Số lượng chỗ
              </CustomTypography>
              <CustomTextField
                type="number"
                autoFocus
                autoComplete="off"
                InputProps={{
                  inputProps: { min: schedule.numberOfBookings / 4 },
                }}
                value={
                  editDoctorSchedule.slotPerHour
                    ? editDoctorSchedule.slotPerHour.toString()
                    : (schedule.slot / 4).toString()
                }
                onChange={(e) => {
                  setEditDoctorSchedule((prev) => ({
                    ...prev,
                    slotPerHour:
                      e.target.value &&
                      parseInt(e.target.value) * 4 >= schedule.slot
                        ? parseInt(e.target.value)
                        : schedule.slot / 4,
                  }));
                }}
                required
                error={
                  (editDoctorSchedule.slotPerHour * 4 < schedule.slot ||
                    editDoctorSchedule.slotPerHour === 0) &&
                  updateButtonClicked
                }
                helperText={
                  (editDoctorSchedule.slotPerHour * 4 < schedule.slot ||
                    editDoctorSchedule.slotPerHour === 0) &&
                  updateButtonClicked &&
                  "Số lượng chỗ không hợp lệ"
                }
              />
            </Box>
          )}
        </Stack>
        {schedule?.scheduleType === "EXAMINATION" && (
          <CustomTypography
            style={{ width: "100%", marginTop: 8 }}
            color={"#8e8e8e"}
          >
            Trong một buổi khám sẽ có tổng cộng{" "}
            {editDoctorSchedule.slotPerHour
              ? editDoctorSchedule.slotPerHour * 4
              : schedule.slot}{" "}
            người có thể đăng ký online
          </CustomTypography>
        )}
      </DialogForm>
    </Stack>
  );
}

export default ScheduleItem;
