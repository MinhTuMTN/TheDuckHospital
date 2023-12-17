import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DialogConfirm from "../../General/DialogConfirm";
import { deleteAccount, restoreAccount } from "../../../services/admin/AccountServices";
import { enqueueSnackbar } from "notistack";

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

function AccountDetail(props) {
  const { account, handleGetAccount } = props;
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [statusSelected, setStatusSelected] = useState(false);

  useEffect(() => {
    setStatusSelected(typeof account.deleted !== "undefined" ? account.deleted : false);
  }, [account]);

  const handleStatusChange = (event) => {
    setStatusSelected(event.target.value);
    if (account.deleted !== event.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleUpdateButtonClick = async () => {
    let response;
    if (account.deleted) {
      response = await restoreAccount(account.userId);
      if (response.success) {
        enqueueSnackbar("Mở khóa tài khoản thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetAccount();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteAccount(account.userId);
      if (response.success) {
        enqueueSnackbar("Khóa tài khoản thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetAccount();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin cơ bản</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Họ tên</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{account.fullName}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Vai trò</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <NoiDung>{account.role} {account.headOfDepartment ? "(Trưởng khoa)" : ""}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      {account.departmentName &&
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Khoa</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{account.departmentName}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>}
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số điện thoại</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{account.phoneNumber}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      {account.email &&
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Địa chỉ email</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{account.email}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>}
      <BoxStyle
        sx={{
          borderBottom: "none !important",
        }}
      >
        <Grid container alignItems={"center"} paddingBottom={1}>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>

          <Grid item xs={5} md={7.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                value={statusSelected}
                label="Trạng thái"
                onChange={handleStatusChange}
                className="custom-select"
              >
                <MenuItem value={false} style={{ fontSize: "14px" }}>
                  Đang hoạt động
                </MenuItem>
                <MenuItem value={true} style={{ fontSize: "14px" }}>
                  Đã khóa
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            md={1.5}
            display={"flex"}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size={isSmallScreen ? "small" : "large"}
              sx={{
                padding: "auto",
                height: "100%",
                background: "#e37272",
                ":hover": {
                  background: "#e05656",
                  color: "#fff",
                },
              }}
              disabled={disabledButton}
              onClick={(e) => {
                setDeleteDialog(true);
              }}
            >
              Cập nhật
            </Button>
            <DialogConfirm
              open={deleteDialog}
              title={account.deleted ? "Mở khóa tài khoản" : "Khóa tài khoản"}
              content={
                account.deleted
                  ? "Bạn có chắc chắn muốn mở khóa tài khoản này?"
                  : "Bạn có chắc chắn muốn khóa tài khoản này?"
              }
              okText={account.deleted ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default AccountDetail;
