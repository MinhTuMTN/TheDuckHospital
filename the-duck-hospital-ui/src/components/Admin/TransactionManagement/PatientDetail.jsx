import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FormatDate from "../../General/FormatDate";

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

function PatientDetail(props) {
  const { patient } = props;

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
        width: "50%",
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin bệnh nhân</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Bệnh nhân</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{patient.fullName}</TieuDeCot>
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
              <NoiDung>{patient.phoneNumber}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>CCCD</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{patient.identityNumber}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Giới tính</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{patient.gender === "MALE" ? "Nam" : "Nữ"}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Địa chỉ</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{patient.address}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Dân tộc</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{patient.nation}</NoiDung>
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
            <TieuDeCot>Ngày sinh</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung><FormatDate dateTime={patient.dateOfBirth} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default PatientDetail;
