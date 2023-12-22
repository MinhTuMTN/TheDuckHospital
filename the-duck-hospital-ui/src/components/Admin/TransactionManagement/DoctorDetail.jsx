import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "16px !important",
  variant: "body1",
  fontWeight: "520 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "15px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

function DoctorDetail(props) {
  const { doctorSchedule } = props;
  const [doctorDepartment, setDoctorDepartment] = useState("");

  useEffect(() => {
    const words = doctorSchedule.departmentName.split(" ");
    const name = words.slice(1).join(" ");
    setDoctorDepartment(name.charAt(0).toUpperCase() + name.slice(1));
  }, [doctorSchedule]);

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin bác sĩ</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Bác sĩ</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{doctorSchedule.doctorDegree}. {doctorSchedule.doctorName}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số điện thoại</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{doctorSchedule.phoneNumber}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle
        sx={{
          borderBottom: "none !important",
        }}
      >
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Khoa</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{doctorDepartment ? doctorDepartment : "Đang cập nhật"}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

    </Stack>
  );
}

export default DoctorDetail;
