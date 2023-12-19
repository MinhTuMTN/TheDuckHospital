import styled from "@emotion/styled";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FormatDate from "../../../General/FormatDate";
import { deleteDoctorSchedule, getActiveDoctors, updateDoctorSchedule } from "../../../../services/doctor/headDoctor/ScheduleServices";
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

function ScheduleItem(props) {
  const { schedule, setRefresh, refresh, valueDate } = props;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);

  const handleDeleteSchedule = async () => {
    const response = await deleteDoctorSchedule(schedule.doctorScheduleId);
    if (response.success) {
      enqueueSnackbar("Xóa lịch trực thành công", { variant: "success" });
      setRefresh(!refresh);

    } else enqueueSnackbar("Xóa lịch trực thất bại", { variant: "error" });
  }

  const getDoctorsInDepartment = useCallback(async () => {
    const response = await getActiveDoctors();
    if (response.success) {
      setDoctors(response.data.data);
    }
  }, []);

  useEffect(() => {
    getDoctorsInDepartment();
  }, [getDoctorsInDepartment]);

  const handleUpdateSchedule = async () => {
    setUpdateButtonClicked(true);

    if (selectedDoctor === "") {
      enqueueSnackbar("Bác sĩ không được để trống", { variant: "error" });
      return;
    }

    const currentDay = dayjs();
    if (dayjs(valueDate).isSame(currentDay, 'day') || dayjs(valueDate).isBefore(currentDay, 'day')) {
      enqueueSnackbar("Chỉ được cập nhật lịch trực trước hôm nay một ngày", { variant: "error" });
      return;
    }

    const response = await updateDoctorSchedule(schedule.doctorScheduleId, {
      staffId: selectedDoctor,
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
              fontSize: "18px",
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
              fontSize: "18px",
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
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Số điện thoại
          </Typography>
        </Stack>
        <Typography>
          {schedule.doctor.phoneNumber}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <FingerprintIcon />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            CCCD
          </Typography>
        </Stack>
        <Typography>
          {schedule.doctor.identityNumber}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <CakeOutlinedIcon />
          <Typography
            sx={{
              fontSize: "18px",
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

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <BookmarkAddedOutlinedIcon />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Đặt trước
          </Typography>
        </Stack>
        <Typography>
          {schedule.numberOfBookings}
        </Typography>
      </Stack>
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
          disabled={schedule.numberOfBookings > 0}
          sx={{
            backgroundColor: "rgba(253, 57, 122, 0.229)",
            color: "#fd397a",
            width: "35%",
            "&:hover": {
              backgroundColor: "rgba(253, 57, 122, 0.229)",
            },
          }}
          onClick={() => setDeleteDialog(true)}
        >
          Xóa
        </CustomButton>
        <CustomButton
          variant="contained"
          sx={{
            backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
            color: "#fff",
            width: "35%",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
            },
          }}
        onClick={() => {
          setSelectedDoctor(schedule.doctor.staffId);
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
        okText={"Thêm"}
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
        <Stack width={"30rem"} mt={3} spacing={4}>
          <Box>
            <CustomTypography
              variant="body1"
              style={{
                color: selectedDoctor === "" && updateButtonClicked ? "red" : "",
              }}
            >
              Bác sĩ
            </CustomTypography>

            <FormControl fullWidth error={selectedDoctor === "" && updateButtonClicked}>
              <Select
                value={selectedDoctor}
                onChange={(e) =>
                  setSelectedDoctor(e.target.value)
                }
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
              {selectedDoctor === "" && updateButtonClicked && (
                <FormHelperText>Bác sĩ không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Stack>
      </DialogForm>
    </Stack>
  );
}

export default ScheduleItem;
