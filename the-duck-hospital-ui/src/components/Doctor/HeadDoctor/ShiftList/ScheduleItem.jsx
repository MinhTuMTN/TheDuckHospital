import styled from "@emotion/styled";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function ScheduleItem(props) {
  const { schedule } = props;

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
          {schedule.doctorName}
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
          {schedule.gender === "MALE" ? "Nam" : "Nữ"}
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
          {schedule.phoneNumber}
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
          {schedule.identityNumber}
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
          {schedule.dateOfBirth}
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
          {schedule.booking}
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
          sx={{
            backgroundColor: "rgba(253, 57, 122, 0.229)",
            color: "#fd397a",
            width: "35%",
            "&:hover": {
              backgroundColor: "rgba(253, 57, 122, 0.229)",
            },
          }}
        // onClick={handleCancel}
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
        // onClick={handleOk}
        >
          Cập nhật
        </CustomButton>
      </Stack>
    </Stack>
  );
}

export default ScheduleItem;
