import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography } from "@mui/material";
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

function DischargeDetail(props) {
  const { discharge } = props;

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin xuất viện</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Bác sĩ xác nhận</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{discharge.doctor?.fullName}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Điều dưỡng xác nhận</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{discharge.nurse?.fullName}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày xuất viện</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                <FormatDate
                  dateTime={discharge.dischargeDetail?.dischargeDate}
                />
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Kết quả</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {discharge.dischargeDetail?.dischargeSummary
                  ? discharge.dischargeDetail?.dischargeSummary
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Điều trị</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {discharge.dischargeDetail?.treatments
                  ? discharge.dischargeDetail?.treatments
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ghi chú</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {discharge.dischargeDetail?.note
                  ? discharge.dischargeDetail?.note
                      .split("\n")
                      .map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                  : "Không có"}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày tái khám</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {discharge.dischargeDetail?.reExaminationDate ? (
                  <FormatDate
                    dateTime={discharge.dischargeDetail?.reExaminationDate}
                  />
                ) : (
                  "Không có"
                )}
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default DischargeDetail;
