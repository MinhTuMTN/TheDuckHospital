import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DialogConfirm from "../../General/DialogConfirm";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { deleteService, restoreService, updateService } from "../../../services/admin/MedicalServiceServices";
import FormatCurrency from "../../General/FormatCurrency";

const serviceTypes = [
  {
    value: "MedicalExamination",
    label: "Dịch vụ khám",
  },
  {
    value: "MedicalTest",
    label: "Dịch vụ xét nghiệm",
  },
  {
    value: "Other",
    label: "Dịch vụ khác",
  },
]

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
  textAlign: "justify",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingX: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const InputText = styled(TextField)(({ theme }) => ({
  borderRadius: "4px !important",
  "& .MuiInputBase-input": {
    fontSize: "16px !important",
    padding: "18px 12px !important",
  },
}));

function MedicalServiceDetail(props) {
  const navigate = useNavigate();
  const { service } = props;
  let status = service.deleted;
  const [statusService, setStatusService] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [serviceEdit, setServiceEdit] = useState({});
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setEditStatus(status);
    setStatusService(status);
  }, [status]);

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
    if (statusService !== event.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handleUpdateStatusButtonClick = async () => {
    let response;
    if (statusService) {
      response = await restoreService(service.serviceId);
      if (response.success) {
        enqueueSnackbar("Mở khóa dịch vụ thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusService(editStatus);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteService(service.serviceId);
      if (response.success) {
        enqueueSnackbar("Khóa dịch vụ thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusService(editStatus);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  const handleUpdateService = async () => {
    setUpdateButtonClicked(true);
    if (serviceEdit.price === 0) {
      enqueueSnackbar("Giá dịch vụ phải lớn hơn 0", { variant: "error" });
      return;
    }

    const response = await updateService(service.serviceId, serviceEdit);
    if (response.success) {
      enqueueSnackbar("Cập nhật thông tin dịch vụ thành công!", {
        variant: "success",
      });
      setOpenPopup(false);
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleEditButtonClick = () => {
    setOpenPopup(true);
    setServiceEdit({
      price: service.price,
    });
  };

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle
        component={Grid}
        alignItems={"center"}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
        container
      >
        <Grid item xs={6}>
          <TieuDe>Thông tin cơ bản</TieuDe>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Button
            variant="text"
            sx={{
              paddingRight: "0px !important",
              color: "#4d4f53",
              fontWeight: "600 !important",
              fontSize: "14px !important",
            }}
            onClick={() => {
              setUpdateButtonClicked(false);
              handleEditButtonClick();
            }}
          >
            Chỉnh sửa
          </Button>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tên dịch vụ</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{service.serviceName}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Mô tả</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{service.description}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Loại dịch vụ</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <NoiDung>{serviceTypes.find(s => s.value === service.serviceType)?.label}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Giá dịch vụ</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"row"} spacing={2}>
              <NoiDung><FormatCurrency amount={service.price} /></NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container alignItems={"center"} paddingBottom={1}>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>
          <Grid item xs={5} md={7.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                value={typeof editStatus === "undefined" ? false : editStatus}
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
              title={statusService ? "Mở khóa dịch vụ" : "Khóa dịch vụ"}
              content={
                statusService
                  ? "Bạn có chắc chắn muốn mở khóa dịch vụ này?"
                  : "Bạn có chắc chắn muốn khóa dịch vụ này?"
              }
              okText={statusService ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateStatusButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
          </Grid>
        </Grid>
      </BoxStyle>
      <BootstrapDialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="customized-dialog-title"
        sx={{
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <DialogTitle sx={{ m: 0, px: 4, py: 2 }} id="customized-dialog-title">
          <Typography
            style={{
              fontSize: "24px",
            }}
            sx={{
              fontWeight: 700,
            }}
          >
            Chỉnh sửa
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          style={{
            padding: "0px 32px 0px 32px",
            width: isSmallScreen ? "30rem" : "35rem",
          }}
        >
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="body1"
              style={{
                fontSize: "14px",
                color: serviceEdit.price === 0 && updateButtonClicked ? "red" : "",
              }}
            >
              Giá dịch vụ
            </Typography>
            <InputText
              sx={{
                padding: "0 !important",
                fontSize: "16px !important",
              }}
              type="number"
              autoFocus
              autoComplete="off"
              required
              fullWidth
              InputProps={{ inputProps: { min: 1000 } }}
              value={serviceEdit.price ? serviceEdit.price.toString() : "0"}
              onChange={(e) => {
                setServiceEdit((prev) => ({
                  ...prev,
                  price: e.target.value ? parseInt(e.target.value) : 0,
                }));
              }}
              error={serviceEdit.price === 0 && updateButtonClicked}
              helperText={
                serviceEdit.price === 0 && updateButtonClicked &&
                "Giá dịch vụ phải lớn hơn 0"
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateService}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Stack>
  );
}

export default MedicalServiceDetail;
