import styled from "@emotion/styled";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Paper,
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
import { getMedicineUnit } from "../../../services/doctor/MedicineServices";
import FormatCurrency from "../../General/FormatCurrency";
import PropTypes from "prop-types";
function ContactItem(props) {
  const { title, content, titleMinWidth = 0 } = props;
  return (
    <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
      <Typography variant="body1" sx={{ fontWeight: "500", fontSize: "14px" }}>
        <span
          style={{
            minWidth: titleMinWidth,
            display: "inline-block",
            marginRight: 2,
          }}
        >
          {title}:
        </span>{" "}
        <span style={{ fontWeight: "400" }}>{content}</span>
      </Typography>
    </Box>
  );
}

function ContactCustomerInfo(props) {
  const { title, content, titleMinWidth } = props;
  return (
    <Box display={"flex"} justifyContent={"flex-start"} width={"100%"}>
      <Typography
        variant="body1"
        sx={{
          minWidth: titleMinWidth,
          fontWeight: "500",
          fontSize: "16px",
          textAlign: "start",
        }}
      >
        {title}:
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: "400", fontSize: "16px", textAlign: "left" }}
      >
        {content}
      </Typography>
    </Box>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 8px",
}));

HistoryDetail.propTypes = {
  patientInfo: PropTypes.object,
  doctorName: PropTypes.string,
  departmentName: PropTypes.string,
  prescriptionItems: PropTypes.array,
  diagnostic: PropTypes.string,
};

function HistoryDetail(props) {
  const {
    patientInfo,
    doctorName,
    prescriptionItems,
    diagnostic,
    departmentName,
    reExaminationDate,
    date,
  } = props;
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
    <Grid container p={4} component={Paper} elevation={2}>
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
      <Grid
        component={Stack}
        direction="column"
        item
        xs={8.25}
        sx={{
          display: "flex",
        }}
      >
        {contacts.map((contact, index) => (
          <ContactItem
            key={index}
            title={contact.title}
            content={contact.value}
          />
        ))}
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid container item xs={12} width={"100%"}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              textAlign: "start",
              fontWeight: "600",
              color: "#8492a6",
              fontSize: "22px",
              marginBottom: "8px",
            }}
          >
            Thông tin bệnh nhân
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ContactCustomerInfo
            sx={{ width: "100%", textAlign: "flex-start" }}
            title="Mã bệnh nhân"
            content={patientInfo?.patientCode}
            titleMinWidth={"125px"}
          />
        </Grid>
        <ContactCustomerInfo
          title="Họ tên"
          content={patientInfo?.fullName}
          titleMinWidth={"125px"}
        />
        <ContactCustomerInfo
          title="Ngày sinh"
          content={dayjs(patientInfo?.dateOfBirth).format("DD/MM/YYYY")}
          titleMinWidth={"125px"}
        />
        <ContactCustomerInfo
          title="Địa chỉ"
          content={`${patientInfo?.streetName}, ${patientInfo?.ward?.wardName}, ${patientInfo?.district?.districtName}, ${patientInfo?.province?.provinceName}`}
          titleMinWidth={"125px"}
        />
      </Grid>
      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid container item xs={12}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              textAlign: "start",
              fontWeight: "600",
              color: "#8492a6",
              fontSize: "22px",
              marginBottom: "8px",
            }}
          >
            Thông tin khám bệnh
          </Typography>
        </Grid>

        <ContactCustomerInfo
          title="Ngày khám"
          content={dayjs(date).format("DD/MM/YYYY HH:mm")}
          titleMinWidth={"125px"}
        />
        <ContactCustomerInfo
          title="Chuyên khoa"
          content={`${departmentName}`}
          titleMinWidth={"125px"}
        />
        <ContactCustomerInfo
          title="Bác sĩ chữa trị"
          content={`BS. ${doctorName}`}
          titleMinWidth={"125px"}
        />

        <ContactCustomerInfo
          title="Chuẩn đoán"
          content={`${diagnostic}`}
          titleMinWidth={"125px"}
        />
      </Grid>

      <Grid item xs={12}>
        <Table sx={{ margin: "16px 0" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" width={"5%"}>
                STT
              </StyledTableCell>
              <StyledTableCell align="left" width={"35%"}>
                Tên thuốc
              </StyledTableCell>
              <StyledTableCell align="center" width={"20%"}>
                Số lượng
              </StyledTableCell>
              <StyledTableCell align="center" width={"20%"}>
                Đơn giá
              </StyledTableCell>
              <StyledTableCell align="center" width={"20%"}>
                Thành tiền
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionItems?.map((item, index) => (
              <TableRow key={item.prescirptionItemId}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
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
            amount={prescriptionItems?.reduce(
              (sum, item) => sum + item?.totalCost,
              0
            )}
          />
        </Typography>
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            textAlign: "start",
            fontWeight: "450",
            color: "#2a2a2a",
            fontSize: "14px",
          }}
        >
          Tái khám ngày:{" "}
          {reExaminationDate
            ? dayjs(reExaminationDate).format("DD/MM/YYYY")
            : "Không có"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            textAlign: "start",
            fontWeight: "400",
            color: "#2a2a2a",
            fontSize: "12px",
            marginBottom: "8px",
          }}
        >
          Lưu ý: Trẻ em cần có bố mẹ đi tái khám chung
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HistoryDetail;
