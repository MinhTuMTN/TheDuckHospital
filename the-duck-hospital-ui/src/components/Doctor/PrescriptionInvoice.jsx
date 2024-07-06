import styled from "@emotion/styled";
import { Language, Phone, PinDrop } from "@mui/icons-material";

import {
  CardMedia,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import QRCode from "react-qr-code";
import { getGender } from "../../utils/genderUtils";
import { getMedicineUnit } from "../../utils/medicineUtils";
import FormatCurrency from "../General/FormatCurrency";
import Barcode from "react-barcode";

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

const cellStyle = {
  padding: "12px 16px",
  color: "#1C252E",
};

const headCellStyle = {
  ...cellStyle,
  backgroundColor: "#f4f6f8",
};
const TypographyCustom = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#1C252E",
}));

function ContactItem(props) {
  const {
    title,
    content,
    titleMinWidth = 0,
    textTransformValue = "none",
    justifyContent = "start",
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
        }}
      >
        {content}
      </ValueTypography>
    </Stack>
  );
}

function PrescriptionInvoice(props, ref) {
  const {
    patientInfo,
    doctorName,
    prescriptionItems,
    diagnostic,
    prescriptionCode,
  } = props;

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
      width: "130px",
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
          value={patientInfo?.patient?.patientCode || "0000000000"}
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
          Mã hồ sơ: <strong>{patientInfo?.patient?.patientCode}</strong>
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
          TOA THUỐC
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop={1} container>
        <Grid item xs={12} sm={7}>
          <ContactItem
            title="Họ tên:"
            content={patientInfo?.patient?.fullName}
            titleMinWidth={"80px"}
            textTransformValue={"uppercase"}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <ContactItem
            title="Ngày sinh:"
            content={dayjs(patientInfo?.patient?.dateOfBirth).format(
              "DD/MM/YYYY"
            )}
            justifyContent={"end"}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <ContactItem
            title="Giới tính:"
            content={getGender(patientInfo?.patient?.gender)}
            justifyContent={"end"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0}>
          <ContactItem
            title="Địa chỉ:"
            content={`${patientInfo?.patient?.district} - ${patientInfo?.patient?.address}`}
            titleMinWidth={"80px"}
          />
        </Grid>
        <Grid item xs={12} marginTop={0.5}>
          <ContactItem
            title="Chuẩn đoán:"
            content={`${diagnostic}`}
            titleMinWidth={"80px"}
            textTransformValue={"uppercase"}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} marginTop={2}>
        <Table>
          <TableHead style={headCellStyle}>
            <TableRow>
              {["#", "Tên thuốc", "Số lượng", "Đơn giá", "Thành tiền"].map(
                (text, index) => (
                  <TableCell
                    key={index}
                    align={
                      index === 0 ? "center" : index > 1 ? "right" : "left"
                    }
                    style={{
                      ...cellStyle,
                      width:
                        index === 0
                          ? "5%"
                          : index === 1
                          ? "49%"
                          : index === 4
                          ? "18%"
                          : "14%",
                      color: "#637381",
                      fontSize: "14px",
                    }}
                  >
                    {text}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionItems?.map((item, index) => (
              <TableRow key={`prescription-item-${index}`}>
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  style={cellStyle}
                >
                  {index + 1}
                </TableCell>
                <TableCell align="left" style={{ ...cellStyle }}>
                  {item?.medicine?.medicineName} <br />
                  <i style={{ fontWeight: "400" }}>{item?.dosageInstruction}</i>
                </TableCell>
                <TableCell align="right" style={{ ...cellStyle }}>
                  {item?.quantity} {getMedicineUnit(item?.medicine?.unit)}
                </TableCell>
                <TableCell align="right" style={{ ...cellStyle }}>
                  <FormatCurrency
                    amount={item?.price}
                    showCurrencySymbol={false}
                  />
                </TableCell>
                <TableCell align="right" style={{ ...cellStyle }}>
                  <FormatCurrency
                    amount={item?.totalCost}
                    showCurrencySymbol={false}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={4}
                style={{
                  ...cellStyle,
                  textAlign: "right",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                Thành tiền
              </TableCell>
              <TableCell
                style={{
                  ...cellStyle,
                  textAlign: "right",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                <FormatCurrency
                  showCurrencySymbol={false}
                  amount={prescriptionItems.reduce(
                    (sum, item) => sum + item?.totalCost,
                    0
                  )}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
          <Stack direction={"column"} textAlign={"left"} flex={2}>
            <Stack
              direction={"column"}
              width={"200px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TypographyCustom fontWeight={500} fontSize={"14px !important"}>
                Xác nhận của bác sĩ:
              </TypographyCustom>
              <br />
              <br />
              <TypographyCustom fontWeight={600} fontSize={"15px !important"}>
                BS. {doctorName}
              </TypographyCustom>
              <TypographyCustom fontSize={"12px !important"}>
                Ngày ký: {dayjs().format("HH:mm DD/MM/YYYY")}
              </TypographyCustom>
            </Stack>
          </Stack>

          <Stack
            direction={"column"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={12}
              fontWeight={500}
              textAlign={"center"}
              style={{
                marginBottom: "4px",
              }}
            >
              Mã QR thanh toán
            </Typography>
            <QRCode value={prescriptionCode || ""} size={64} style={{}} />
            <Typography fontSize={12} fontWeight={500}>
              {prescriptionCode}
            </Typography>
          </Stack>
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
  );
}

export default React.forwardRef(PrescriptionInvoice);
