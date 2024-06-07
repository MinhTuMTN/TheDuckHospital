import styled from "@emotion/styled";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import FormatCurrency from "../General/FormatCurrency";
import dayjs from "dayjs";
import QRCode from "react-qr-code";

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
  padding: "8px 0",
}));

function Invoice(props, ref) {
  const { patientInfo, doctorName, medicalTest } = props;
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
      <Grid item xs={8.25} justifyContent={"flex-end"} display={"flex"}>
        <Box>
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              title={contact.title}
              content={contact.value}
            />
          ))}
        </Box>
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
      <Grid
        item
        xs={12}
        sx={{
          position: "relative",
        }}
      >
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

        <Stack
          direction={"column"}
          sx={{
            position: "absolute",
            right: "16px",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={12} fontWeight={500}>
            Quét mã QR
          </Typography>
          <Typography fontSize={12} fontWeight={500}>
            để thanh toán
          </Typography>
          <QRCode
            value={medicalTest?.medicalTestCode?.toUpperCase()}
            size={64}
          />
          <Typography fontSize={12} fontWeight={500}>
            {medicalTest?.medicalTestCode?.toUpperCase()}
          </Typography>
        </Stack>
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
          title="Mã hóa đơn"
          content={medicalTest?.medicalTestCode?.toUpperCase()}
          titleMinWidth={"110px"}
        />
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
      </Grid>

      <Grid item xs={12}>
        <Table sx={{ margin: "8px 0" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">STT</StyledTableCell>
              <StyledTableCell align="left">Tên dịch vụ</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Đơn giá</StyledTableCell>
              <StyledTableCell align="center">Thành tiền</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="left">1</StyledTableCell>
              <StyledTableCell align="left">
                {medicalTest?.serviceName} <br />
                {medicalTest?.note}
              </StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="right">
                <FormatCurrency amount={medicalTest?.price} />
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormatCurrency amount={medicalTest?.price} />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography
          variant="body1"
          sx={{ fontWeight: "500", textAlign: "right" }}
        >
          Tổng tiền: <FormatCurrency amount={medicalTest?.price} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            color: "#8492a6",
            fontSize: "1.125rem",
          }}
          mt={2}
          mb={1}
          textAlign="center"
          textTransform={"uppercase"}
        >
          Hướng dẫn thanh toán và nhận kết quả
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          1. Thanh toán hoá đơn bằng một trong các cách sau:
        </Typography>
        <Typography variant="body1">
          - Quét mã QR hoặc nhập mã hóa đơn để thanh toán trên ứng dụng
          TheDuckHospital
        </Typography>
        <Typography variant="body1">
          - Đến quầy thu ngân để thực hiện thanh toán
        </Typography>

        <Typography variant="body1" fontWeight={500}>
          2. Đến thực hiện xét nghiệm tại phòng xét nghiệm của bệnh viện
        </Typography>
        <Table sx={{ margin: "8px 0" }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên dịch vụ</TableCell>
              <TableCell align="center">Chỉ định thực hiện</TableCell>
              <TableCell align="center">Số thứ tự thực hiện</TableCell>
              <TableCell align="center">Phòng xét nghiệm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">{medicalTest?.serviceName}</TableCell>
              <TableCell align="center">{medicalTest?.note}</TableCell>
              <TableCell align="center">{medicalTest?.queueNumber}</TableCell>
              <TableCell align="center">
                Phòng {medicalTest?.roomName}
                <br />
                <i>{`(${medicalTest?.roomDescription})`}</i>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="body1" fontWeight={500}>
          3. Nhận kết quả xét nghiệm:
        </Typography>
        <Typography variant="body1">
          - Bệnh nhân quay về phòng khám để nhận kết quả xét nghiệm
        </Typography>
        <Typography variant="body1">
          - Kết quả xét nghiệm cũng sẽ được cập nhật trên ứng dụng
          TheDuckHospital
        </Typography>
      </Grid>
      <Divider sx={{ width: "100%", margin: "16px 0" }} />
    </Grid>
  );
}

export default React.forwardRef(Invoice);
