import styled from "@emotion/styled";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
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

function AdmissionDetail(props) {
  const { transaction } = props;
  const statusColor =
    transaction.hospitalAdmission?.state === "BEING_TREATED"
      ? transaction.discharge && transaction.discharge?.doctor
        ? "success"
        : "info"
      : "warning";
  const statusLabel =
    transaction.hospitalAdmission?.state === "BEING_TREATED"
      ? transaction.discharge && transaction.discharge?.doctor
        ? "Đã xuất viện"
        : "Đang điều trị"
      : "Đang chờ";

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin nhập viện</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Bác sĩ tiếp nhận</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{transaction.hospitalAdmission?.doctorName}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày nhập viện</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                <FormatDate
                  dateTime={transaction.hospitalAdmission?.admissionDate}
                />
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Chuẩn đoán</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {transaction.hospitalAdmission?.diagnosis
                  ? transaction.hospitalAdmission?.diagnosis
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Triệu chứng</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {transaction.hospitalAdmission?.symptom
                  ? transaction.hospitalAdmission?.symptom
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Bệnh nền</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {transaction.hospitalAdmission?.underlyingDisease
                  ? transaction.hospitalAdmission?.underlyingDisease
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tiền sử dị ứng</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {transaction.hospitalAdmission?.historyOfAllergy
                  ? transaction.hospitalAdmission?.historyOfAllergy
                  : "Không có"}
              </NoiDung>
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
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <Chip
              color={statusColor}
              label={statusLabel}
              sx={{
                fontSize: "14px",
              }}
            />
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default AdmissionDetail;
