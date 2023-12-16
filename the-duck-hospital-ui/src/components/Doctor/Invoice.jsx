import styled from "@emotion/styled";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
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
  padding: "8px 0",
}));

function Invoice(props, ref) {
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
          content="BN16729ABCHDF"
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Họ tên"
          content="Nguyễn Thị D"
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Ngày sinh"
          content="30/02/2000"
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Địa chỉ"
          content="111 Lê Văn Việt, phường Tăng Nhơn Phú A, Quận 9, TP.HCM"
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
          title="Mã hóa đơn"
          content="HD001"
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Ngày tạo"
          content="16/12/2024 14:14"
          titleMinWidth={"110px"}
        />
        <ContactItem
          title="Người tạo"
          content="BS. Nguyễn Văn A"
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
              <StyledTableCell align="left">Khám bệnh</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="right">
                <FormatCurrency amount={100000} />
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormatCurrency amount={100000} />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography
          variant="body1"
          sx={{ fontWeight: "500", textAlign: "right" }}
        >
          Tổng tiền: <FormatCurrency amount={100000} />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack margin={"0 auto"} width={"5rem"} justifyContent={"center"}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "500" }}
            component={"span"}
            align="center"
          >
            Số thứ tự
          </Typography>
          <Box
            sx={{
              border: "1px solid #8492a6",
              display: "block",
              width: "5rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", margin: "8px auto", fontSize: "2rem" }}
              s
              align="center"
            >
              1
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Divider sx={{ width: "100%", margin: "16px 0" }} />
    </Grid>
  );
}

export default React.forwardRef(Invoice);
