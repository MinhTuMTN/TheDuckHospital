import styled from "@emotion/styled";
import { Language, Phone, PinDrop } from "@mui/icons-material";

import { Box, CardMedia, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import Barcode from "react-barcode";
import { getAge } from "../../../utils/getAgeUtils";
import PropTypes from "prop-types";
import { getGender } from "../../../utils/genderUtils";

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: "#303e67",
}));

const LableTypography = styled(Typography)(({ theme }) => ({
  marginRight: "4px",
  display: "flex",
  fontSize: "13px",
  fontWeight: 700,
  color: "#303e67",
}));

const TypographyCustom = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#1C252E",
}));

const SignatureBlock = ({ title, name, doctorDegree }) => (
  <Stack
    direction={"column"}
    width={"250px"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <TypographyCustom fontWeight={450} fontSize={"12px !important"}>
      Ngày ... tháng ... năm ...
    </TypographyCustom>
    <TypographyCustom
      fontWeight={500}
      fontSize={"14px !important"}
      textTransform={"uppercase"}
    >
      {title}
    </TypographyCustom>
    <br />
    <br />
    <br />

    <TypographyCustom fontSize={"12px !important"} fontWeight={500}>
      {doctorDegree}. {name}
    </TypographyCustom>
  </Stack>
);

function ContactItem(props) {
  const {
    title,
    content,
    titleMinWidth = 0,
    textTransformValue = "none",
    justifyContent = "start",
    contentStyle = {},
  } = props;

  return (
    <Stack direction={"row"} justifyContent={justifyContent}>
      <LableTypography
        style={{
          minWidth: titleMinWidth,
        }}
      >
        {title}
      </LableTypography>
      <ValueTypography
        style={{
          textTransform: textTransformValue,
          ...contentStyle,
        }}
      >
        {content}
      </ValueTypography>
    </Stack>
  );
}

function HospitalDischargeInvoice(props, ref) {
  const { patientInfo, discharge } = props;
  const admissionDate = dayjs(patientInfo?.admissionDate);
  const today = dayjs();
  const contacts = [
    {
      icon: (
        <Language
          style={{
            color: "#8997bd",
            fontSize: "20px",
          }}
        />
      ),
      width: "170px",
      value: [
        { name: "theduckhospitalgmailcom" },
        { name: "the-duck-hospital.web.app" },
      ],
    },
    {
      icon: (
        <Phone
          style={{
            color: "#8997bd",
            fontSize: "20px",
          }}
        />
      ),
      width: "135px",
      value: [{ name: "(+84) 123 456 789" }, { name: "(+84) 246 813 579" }],
    },

    {
      icon: (
        <PinDrop
          style={{
            color: "#8997bd",
            fontSize: "20px",
          }}
        />
      ),
      width: "220px",
      value: [
        {
          name: "1, Võ Văn Ngân, phường Linh Chiểu, tp Thủ Đức, tp Hồ Chí Minh",
        },
      ],
    },
  ];
  return (
    <Grid
      style={{
        position: "relative",
        padding: "48px 32px",
      }}
      container
      ref={ref}
      p={2}
    >
      <Grid
        item
        xs={12}
        container
        style={{
          paddingBottom: "14px",
          borderBottom: "1px solid #b6c2e4",
        }}
      >
        <Grid
          item
          xs={4}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"start"}
        >
          <CardMedia
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
            alt="logo"
            component="img"
            sx={{ width: "150px", objectFit: "contain", margin: "auto 0" }}
          />
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Stack direction={"row"} spacing={1}>
            {contacts.map((contact, index) => (
              <Stack
                key={`invoice-${index}`}
                style={{
                  borderLeft: "2px solid #b6c2e4",
                  height: "60px",
                  paddingLeft: "12px",
                  width: contact.width,
                  alignItems: "end",
                }}
                direction={"column"}
              >
                {contact.icon}
                {contact.value.map((item, index) => (
                  <Typography
                    key={`contact-name-${index}`}
                    variant="subtitle1"
                    fontSize={"13px"}
                    style={{ color: "#8997bd" }}
                    textAlign={"end"}
                  >
                    {item.name}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Stack
        direction={"column"}
        alignItems={"center"}
        style={{
          position: "absolute",
          top: 140,
          right: 40,
        }}
      >
        <Barcode
          value={patientInfo?.patientCode}
          width={1}
          height={40}
          margin={0}
          displayValue={false}
        />
        <Typography
          fontSize={"12px"}
          style={{
            marginTop: "0px",
          }}
        >
          Mã hồ sơ: <strong>{patientInfo?.patientCode}</strong>
        </Typography>
      </Stack>
      <Grid
        item
        xs={12}
        justifyContent={"center"}
        style={{
          marginTop: "2px",
          marginBottom: "18px",
          paddingTop: "48px",
          borderTop: "1px solid #b6c2e4",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          letterSpacing={0.5}
          fontSize={"24px"}
          textAlign={"center"}
          color={"#565e74"}
        >
          PHIẾU XUẤT VIỆN
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop={1} container>
        <Grid item xs={12}>
          <ContactItem
            title="Họ tên:"
            content={patientInfo?.patientName}
            titleMinWidth={"135px"}
            textTransformValue={"uppercase"}
          />
        </Grid>

        <Grid item xs={8} marginTop={0.5}>
          <ContactItem
            title="Ngày sinh:"
            titleMinWidth={"135px"}
            content={dayjs(patientInfo?.patientBirthDate).format("DD/MM/YYYY")}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <ContactItem
            title="Tuổi:"
            content={getAge(patientInfo?.patientBirthDate)}
            justifyContent={"end"}
          />
        </Grid>

        <Grid item xs={2}>
          <ContactItem
            title="Giới tính:"
            content={getGender(patientInfo?.patientGender)}
            justifyContent={"end"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Địa chỉ:"
            content={`${patientInfo?.streetName} - ${patientInfo?.wardName} - ${patientInfo?.provinceName}`}
            titleMinWidth={"135px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Vào viện lúc:"
            content={`${admissionDate.get("hour")} giờ ${admissionDate.get(
              "minute"
            )} phút - ngày ${admissionDate.get("date")} tháng ${
              admissionDate.get("month") + 1
            } năm ${admissionDate.get("year")}`}
            titleMinWidth={"135px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Ra viện lúc:"
            content={`${today.get("hour")} giờ ${today.get(
              "minute"
            )} phút - ngày ${today.get("date")} tháng ${
              today.get("month") + 1
            } năm ${today.get("year")}`}
            titleMinWidth={"135px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Chuẩn đoán:"
            content={`- ${discharge?.dischargeSummary}`}
            titleMinWidth={"135px"}
            textTransformValue={"uppercase"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Phương pháp điều trị:"
            content={`- ${discharge?.treatments}`}
            titleMinWidth={"135px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Ghi chú:"
            content={discharge?.note}
            contentStyle={{
              whiteSpace: "pre-line",
            }}
            titleMinWidth={"135px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Tái khám:"
            content={
              discharge?.isReExamination
                ? discharge?.reExaminationDate.format("DD/MM/YYYY")
                : "- Không cần tái khám"
            }
            titleMinWidth={"135px"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            marginTop: "16px",
            padding: "16px 8px 12px 8px",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SignatureBlock
              title="Trưởng khoa điều trị:"
              name={discharge?.doctorName}
              doctorDegree={discharge?.doctorDegree}
            />
            <SignatureBlock
              title="Bác sĩ điều trị:"
              name={discharge?.doctorName}
              doctorDegree={discharge?.doctorDegree}
            />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            marginTop: "24px",
            padding: "12px",
            borderTop: "1px solid #e9ecee",
            textAlign: "center",
          }}
        >
          <Typography fontSize={"12px"}>
            Cảm ơn bạn đã sử dụng dịch vụ của The Duck Hospital
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

HospitalDischargeInvoice.prototype = {
  patientInfo: PropTypes.object,
  discharge: PropTypes.object,
  ref: PropTypes.object,
};
export default React.forwardRef(HospitalDischargeInvoice);
