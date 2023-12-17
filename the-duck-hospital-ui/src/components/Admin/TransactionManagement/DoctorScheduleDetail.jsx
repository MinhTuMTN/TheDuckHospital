import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";

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

function DoctorScheduleDetail(props) {
  const { doctorSchedule, queueNumber } = props;

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin buổi khám</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Thời gian</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <Stack direction="row" spacing={0.5}>
                <TieuDeCot>
                  {doctorSchedule.scheduleType === "MORNING" ?
                    "Buổi sáng - " : "Buổi chiều - "}
                </TieuDeCot>
                <TieuDeCot>
                  {dayjs(doctorSchedule?.date).format("DD/MM/YYYY")}
                </TieuDeCot>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tại</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>Phòng {doctorSchedule.roomName}</NoiDung>
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
            <TieuDeCot>Số thứ tự</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{queueNumber}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default DoctorScheduleDetail;
