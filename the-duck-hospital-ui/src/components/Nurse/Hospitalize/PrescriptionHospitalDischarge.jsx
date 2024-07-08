import { Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";
import Prescription from "../../Doctor/Prescription";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { getAge } from "../../../utils/getAgeUtils";
import { getGender } from "../../../utils/genderUtils";
const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "18px 20px 24px 20px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

const LableTypography = styled(Typography)(({ theme }) => ({
  marginRight: "4px",
  display: "flex",
  fontSize: "13px",
  fontWeight: 700,
  color: "#303e67",
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: "#303e67",
}));

function PrescriptionHospitalDischarge(props) {
  const { info, diagnostic, doctorName } = props;
  return (
    <ViewStyle container>
      <Grid
        item
        xs={12}
        justifyContent={"center"}
        style={{
          paddingTop: "12px",
        }}
      >
        <Stack direction={"column"} alignItems={"center"}>
          <Typography
            variant="subtitle1"
            textTransform={"capitalize"}
            fontWeight={600}
            letterSpacing={0.5}
            fontSize={"24px"}
            textAlign={"center"}
            color={"#565e74"}
          >
            Toa thuốc ra viện
          </Typography>
          <Stack direction={"row"}>
            <LableTypography
              fontStyle={"italic"}
              style={{
                minWidth: "30px",
              }}
            >
              Khoa:
            </LableTypography>
            <ValueTypography fontStyle={"italic"} textTransform={"capitalize"}>
              {info?.departmentName.slice(5)}
            </ValueTypography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Stack direction={"row"}>
          <LableTypography
            style={{
              minWidth: "100px",
            }}
          >
            Họ và tên:
          </LableTypography>
          <ValueTypography
            style={{
              textTransform: "uppercase",
            }}
          >
            {info?.patientName}
          </ValueTypography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4} marginTop={1}>
        <Stack direction={"row"}>
          <LableTypography
            style={{
              minWidth: "100px",
            }}
          >
            Ngày sinh:
          </LableTypography>
          <ValueTypography>
            {dayjs(info?.patientBirthDate).format("DD/MM/YYYY")}
          </ValueTypography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={5} marginTop={1}>
        <Stack direction={"row"} justifyContent={"end"}>
          <LableTypography>Tuổi:</LableTypography>
          <ValueTypography>{getAge(info?.patientBirthDate)}</ValueTypography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={3} marginTop={1}>
        <Stack direction={"row"} justifyContent={"end"}>
          <LableTypography>Giới tính:</LableTypography>
          <ValueTypography>{getGender(info?.gender)}</ValueTypography>
        </Stack>
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Stack direction={"row"}>
          <LableTypography
            style={{
              minWidth: "100px",
            }}
          >
            Địa chỉ:
          </LableTypography>
          <ValueTypography>
            {`${info?.streetName}, ${info?.wardName}, ${info?.provinceName}`}
          </ValueTypography>
        </Stack>
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Stack direction={"row"}>
          <LableTypography
            style={{
              minWidth: "100px",
            }}
          >
            Bác sĩ điều trị:
          </LableTypography>
          {doctorName === "" ? (
            <ValueTypography
              fontWeight={"450 !important"}
              style={{
                fontStyle: "italic",
              }}
            >
              Vui lòng chọn bác sĩ điều trị tại phần{" "}
              <strong>Phiếu xuất viện</strong>
            </ValueTypography>
          ) : (
            <ValueTypography>BS. {doctorName}</ValueTypography>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Stack direction={"row"}>
          <LableTypography
            style={{
              minWidth: "100px",
            }}
          >
            Chuẩn đoán:
          </LableTypography>
          {!diagnostic ? (
            <ValueTypography
              fontWeight={"450 !important"}
              style={{
                fontStyle: "italic",
              }}
            >
              Vui lòng nhập chuẩn đoán cuối cùng tại phần{" "}
              <strong>Phiếu xuất viện</strong>
            </ValueTypography>
          ) : (
            <ValueTypography>{diagnostic}</ValueTypography>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={3}>
        <Prescription
          patientInfo={info}
          diagnostic={diagnostic}
          hospitalizationId={info?.hospitalAdmissionId}
          role={"nurse"}
        />
      </Grid>
    </ViewStyle>
  );
}

PrescriptionHospitalDischarge.propTypes = {
  info: PropTypes.object,
  diagnostic: PropTypes.string,
};
export default PrescriptionHospitalDischarge;
