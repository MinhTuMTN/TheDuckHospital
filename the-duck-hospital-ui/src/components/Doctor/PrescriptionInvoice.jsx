import styled from "@emotion/styled";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { getMedicineUnit } from "../../services/doctor/MedicineServices";
import FormatCurrency from "../General/FormatCurrency";

function ContactItem(props) {
  const { title, content, titleMinWidth = 0 } = props;
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: "500", fontSize: "14px" }}>
        <span style={{ minWidth: titleMinWidth, display: "inline-block" }}>
          {title}:
        </span>{" "}
        <span style={{ fontWeight: "400" }}>{content}</span>
      </Typography>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 8px",
}));

function PrescriptionInvoice(props, ref) {
  const { patientInfo, doctorName, prescriptionItems, diagnostic } = props;
  const contacts = [
    {
      title: "Email",
      value: "theduckhospital@gmail.com",
    },
    {
      title: "Số điện thoại",
      value: "(+84) 123 456 789",
    },
    {
      title: "Website",
      value: "the-duck-hospital.web.app",
    },
    {
      title: "Địa chỉ",
      value: "1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM",
    },
  ];
  return (
    <Grid container ref={ref} p={2}>
      <Grid
        item
        xs={3.75}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <CardMedia
          src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
          alt="logo"
          component="img"
          sx={{ width: "70%", objectFit: "contain", margin: "auto 0" }}
        />
      </Grid>
      <Grid item xs={8.25}>
        {contacts.map((contact, index) => (
          <ContactItem
            key={index}
            title={contact.title}
            content={contact.value}
          />
        ))}
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            color: "#8492a6",
            fontSize: "1.125rem",
            marginBottom: "8px",
          }}
        >
          Thông tin bệnh nhân
        </Typography>

        <ContactItem
          title="Mã bệnh nhân"
          content={patientInfo?.patient?.patientCode}
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Họ tên"
          content={patientInfo?.patient?.fullName}
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Ngày sinh"
          content={dayjs(patientInfo?.patient?.dateOfBirth).format(
            "DD/MM/YYYY"
          )}
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Địa chỉ"
          content={patientInfo?.patient?.address}
          titleMinWidth={"110px"}
        />
      </Grid>
      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            color: "#8492a6",
            fontSize: "1.125rem",
            marginBottom: "8px",
          }}
        >
          Thông tin hóa đơn
        </Typography>

        <ContactItem
          title="Ngày tạo"
          content={dayjs().format("DD/MM/YYYY HH:mm")}
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Người tạo"
          content={`BS. ${doctorName}`}
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Chuẩn đoán"
          content={`${diagnostic}`}
          titleMinWidth={"110px"}
        />
      </Grid>

      <Grid item xs={12}>
        <Table sx={{ margin: "8px 0" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">STT</StyledTableCell>
              <StyledTableCell align="left">Tên thuốc</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Đơn giá</StyledTableCell>
              <StyledTableCell align="center">Thành tiền</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionItems?.map((item, index) => (
              <TableRow key={item.prescirptionItemId}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  {item?.medicine?.medicineName} <br />
                  <i style={{ fontWeight: "400" }}>{item?.dosageInstruction}</i>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item?.quantity} {getMedicineUnit(item?.medicine?.unit)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormatCurrency amount={item?.price} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormatCurrency amount={item?.totalCost} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography
          variant="body1"
          sx={{ fontWeight: "500", textAlign: "right" }}
        >
          Tổng tiền:{" "}
          <FormatCurrency
            amount={prescriptionItems.reduce(
              (sum, item) => sum + item?.totalCost,
              0
            )}
          />
        </Typography>
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
    </Grid>
  );
}

export default React.forwardRef(PrescriptionInvoice);
