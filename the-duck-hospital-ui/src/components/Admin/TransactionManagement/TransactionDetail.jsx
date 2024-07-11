import styled from "@emotion/styled";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FormatDate from "../../General/FormatDate";
import FormatCurrency from "../../General/FormatCurrency";

const transactionStatus = [
  {
    status: "PENDING",
    label: "Chờ xử lý",
    color: "info",
  },
  {
    status: "SUCCESS",
    label: "Thành công",
    color: "success",
  },
  {
    status: "FAILED",
    label: "Thất bại",
    color: "error",
  },
];

const paymentTypes = [
  {
    value: "BOOKING",
    name: "Đặt khám",
  },
  {
    value: "MEDICAL_TEST",
    name: "Xét nghiệm",
  },
  {
    value: "TOP_UP",
    name: "Nạp tiền ví",
  },
  {
    value: "REFUND",
    name: "Hoàn tiền",
  },
  {
    value: "ADVANCE_FEE",
    name: "Tạm ứng",
  },
  {
    value: "DISCHARGE",
    name: "Xuất viện",
  },
];

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

function TransactionDetail(props) {
  const { transaction } = props;
  const statusColor = transactionStatus.find(
    (s) => s.status === transaction.status
  )?.color;
  const statusLabel = transactionStatus.find(
    (s) => s.status === transaction.status
  )?.label;

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin giao dịch</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Loại thanh toán</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>
                {
                  paymentTypes.find(
                    (paymentType) =>
                      paymentType.value === transaction.paymentType
                  )?.name
                }
              </NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      {transaction?.paymentType === "MEDICAL_TEST" && (
        <BoxStyle>
          <Grid container>
            <Grid item xs={4} md={3}>
              <TieuDeCot>Loại xét nghiệm</TieuDeCot>
            </Grid>
            <Grid item xs={8} md={9}>
              <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
                <NoiDung>
                  {transaction?.medicalTestResponse?.serviceName}
                </NoiDung>
              </Stack>
            </Grid>
          </Grid>
        </BoxStyle>
      )}

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Phương thức</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{transaction.paymentMethod}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      {transaction.bankCode && transaction.paymentMethod !== "CASH" && (
        <BoxStyle>
          <Grid container>
            <Grid item xs={4} md={3}>
              <TieuDeCot>Thẻ</TieuDeCot>
            </Grid>
            <Grid item xs={8} md={9}>
              <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
                <NoiDung>{transaction.bankCode}</NoiDung>
              </Stack>
            </Grid>
          </Grid>
        </BoxStyle>
      )}

      {transaction.paymentType === "REFUND" && (
        <BoxStyle>
          <Grid container>
            <Grid item xs={4} md={3}>
              <TieuDeCot>Lý do hoàn tiền</TieuDeCot>
            </Grid>
            <Grid item xs={8} md={9}>
              <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
                <NoiDung>{transaction.refundedBooking?.refundReason}</NoiDung>
              </Stack>
            </Grid>
          </Grid>
        </BoxStyle>
      )}

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tổng tiền</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>
              <FormatCurrency amount={transaction.amount} />
            </NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày tạo</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>
              <FormatDate dateTime={transaction.createdAt} />
            </NoiDung>
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

export default TransactionDetail;
