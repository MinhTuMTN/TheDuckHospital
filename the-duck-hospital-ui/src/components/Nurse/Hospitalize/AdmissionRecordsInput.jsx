import { Box, Grid, useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import CustomLine from "../../General/CustomLine";
import { useTheme } from "@emotion/react";
import { getGender } from "../../../utils/genderUtils";
import dayjs from "dayjs";
import { appColors } from "../../../utils/appColorsUtils";

function AdmissionRecordsInput(props) {
  const { admissionRecords } = props;

  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const paid = useMemo(() => admissionRecords.paid, [admissionRecords.paid]);
  return (
    <Grid
      container
      sx={{
        position: "relative",
      }}
    >
      <Grid item xs={12}>
        <CustomLine
          lable="Mã bệnh nhân"
          value={admissionRecords.patientCode}
          valueColor="#000095"
          valueFontWeight={500}
          valueLetterSpacing={"1px"}
          marginTop={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CustomLine
          lable="Họ tên bệnh nhân"
          value={admissionRecords.patientName}
          marginTop={1}
        />
      </Grid>

      <Grid item xs={12} sm={3} md={2}>
        <CustomLine
          lable="Năm sinh"
          minWidth={isDownSm ? "120px" : "80px"}
          value={dayjs(admissionRecords.patientDateOfBirth).get("year")}
          valueLetterSpacing={"0px"}
          marginTop={1}
          lableAlign={isDownSm ? "left" : "right"}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CustomLine
          lable="Giới tính"
          minWidth={isDownSm ? "120px" : "80px"}
          value={getGender(admissionRecords.patientGender)}
          valueLetterSpacing={"0px"}
          marginTop={1}
          lableAlign={isDownSm ? "left" : "right"}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomLine
          lable="Địa chỉ"
          value={`${admissionRecords.district} - ${admissionRecords.province}`}
          valueLetterSpacing={"0px"}
          marginTop={1}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomLine
          lable="Bác sĩ chỉ định"
          value={`${admissionRecords.doctorDegree}. ${admissionRecords.doctorName}`}
          valueLetterSpacing={"0px"}
          marginTop={1}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomLine
          lable="Chuẩn đoán"
          value={admissionRecords.diagnosis}
          valueLetterSpacing={"0px"}
          marginTop={1}
        />
      </Grid>
      <Box
        sx={{
          textTransform: "uppercase",
          color: paid ? appColors.doneText : appColors.error,
          border: `3px solid ${
            paid ? appColors.doneBackground : appColors.errorBackground
          }`,
          padding: "10px",
          borderRadius: "5px",
          fontWeight: 500,

          position: "absolute",
          bottom: "10px",
          right: "20px",
        }}
      >
        {paid ? "Đã thanh toán" : "Chưa thanh toán"}
      </Box>
    </Grid>
  );
}

export default AdmissionRecordsInput;
