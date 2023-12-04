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
import DialogConfirm from "../../DialogConfirm";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { deleteDepartment, getActiveDoctorsDepartment, restoreDepartment, updateDepartment } from "../../../services/admin/DepartmentServices";
import { enqueueSnackbar } from "notistack";
import { deleteHeadOfDepartment } from "../../../services/admin/DoctorServices";

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
  textAlign: 'justify',
}));

const DeleteText = styled(Typography)(({ theme }) => ({
  fontSize: "15px !important",
  variant: "body1",
  fontWeight: "400 !important",
  textAlign: 'justify',
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer",
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
  paddingTop: "2px !important",
  "& .MuiInputBase-input": {
    // Các thuộc tính của .MuiInputBase-input ở đây
    fontSize: "14px !important",
    padding: "18px 12px !important",
  },
}));

const MultilineText = styled(TextField)(({ theme }) => ({
  borderRadius: "4px !important",
  paddingY: "0px !important",
  "& .MuiInputBase-input": {
    // Các thuộc tính của .MuiInputBase-input ở đây
    fontSize: "14px !important",
  },
}));

function DepartmentDetail(props) {
  const navigate = useNavigate();
  const { department, headDoctorId, headDoctorName } = props;
  let status = department.deleted;
  const [statusDepartment, setStatusDepartment] = useState(false)
  const [editStatus, setEditStatus] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteHead, setDeleteHead] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [departmentEdit, setDepartmentEdit] = useState({});
  const [doctors, setDoctors] = useState([]);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setEditStatus(status);
    setStatusDepartment(status);
  }, [status]);

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
    if (statusDepartment !== event.target.value) {
      setDisabledButton(false);
    }
    else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    const handleGetActiveDoctorDepartment = async () => {
      if (!department.departmentId)
        return;

      const response = await getActiveDoctorsDepartment(department.departmentId);
      if (response.success) {
        setDoctors(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    handleGetActiveDoctorDepartment();
  }, [department.departmentId]);

  const handleUpdateButtonClick = async () => {
    let response;
    if (statusDepartment) {
      response = await restoreDepartment(department.departmentId);
      if (response.success) {
        enqueueSnackbar("Mở khóa khoa thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusDepartment(editStatus);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteDepartment(department.departmentId);
      if (response.success) {
        enqueueSnackbar("Khóa khoa thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusDepartment(editStatus);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  const handleUpdateDepartment = async () => {
    if (departmentEdit.departmentName?.trim() === "") {
      enqueueSnackbar("Tên khoa không được để trống", { variant: "error" });
      return;
    }

    const response = await updateDepartment(department.departmentId, {
      departmentName: departmentEdit.departmentName,
      staffId: departmentEdit.staffId,
      description: departmentEdit.description,
    });
    if (response.success) {
      enqueueSnackbar("Cập nhật thông tin khoa thành công!", { variant: "success" });
      setOpenPopup(false);
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleEditButtonClick = () => {
    setOpenPopup(true);
    setDepartmentEdit({
      departmentName: department.departmentName,
      staffId: headDoctorId,
      description: department.description,
    })
  };

  const handleDeleteHeadDoctor = () => {
    console.log("clicked");
    setDeleteHead(true);
  }

  const handleDeleteHeadClick = async () => {
    const response = await deleteHeadOfDepartment(headDoctorId);
    if (response.success) {
      enqueueSnackbar("Xóa trưởng khoa thành công!", { variant: "success" });
      setDeleteHead(false);
      navigate(0);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
    }
  }

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
            onClick={handleEditButtonClick}
          >
            Chỉnh sửa
          </Button>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tên khoa</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{department.departmentName}</TieuDeCot>
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
            <NoiDung>{department.description}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Trưởng khoa</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <Stack direction={"row"} spacing={2}>
            <NoiDung>
              {headDoctorName ? headDoctorName : "Đang cập nhật"}
            </NoiDung>
            {headDoctorName && 
            <DeleteText onClick={handleDeleteHeadDoctor}>
              Xóa
            </DeleteText>}
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số lượng bác sĩ</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{department.totalDoctors}</NoiDung>
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
                <MenuItem
                  value={false}
                  style={{ fontSize: "14px" }}
                >
                  Đang hoạt động
                </MenuItem>
                <MenuItem
                  value={true}
                  style={{ fontSize: "14px" }}
                >
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
              title={statusDepartment ? "Mở khóa khoa" : "Khóa khoa"}
              content={
                statusDepartment
                  ? "Bạn có chắc chắn muốn mở khóa khoa này?"
                  : "Bạn có chắc chắn muốn khóa khoa này?"
              }
              okText={statusDepartment ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
            <DialogConfirm
              open={deleteHead}
              title={"Xóa trưởng khoa"}
              content={"Bạn có chắc chắn muốn xóa người này khỏi chức trưởng khoa?"}
              okText={"Xóa"}
              cancelText={"Hủy"}
              onOk={handleDeleteHeadClick}
              onCancel={() => setDeleteHead(false)}
              onClose={() => setDeleteHead(false)}
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
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} spacing={1}>
              <Box width="52%">
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  Tên khoa
                </Typography>
                <InputText
                  sx={{
                    size: "small",
                    padding: "0 !important",
                    fontSize: "14px !important",
                  }}
                  autoFocus
                  required
                  fullWidth
                  value={departmentEdit.departmentName}
                  onChange={(e) => setDepartmentEdit((prev) => {
                    return {
                      ...prev,
                      departmentName: e.target.value
                    };
                  })}
                />
              </Box>
              <Box width="48%">
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  Trưởng khoa
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={departmentEdit.staffId}
                    onChange={(e) =>
                      setDepartmentEdit((prev) => {
                        return {
                          ...prev,
                          staffId: e.target.value,
                        };
                      })
                    }
                    displayEmpty
                    required
                    size="small"
                    sx={{
                      fontSize: "14px !important",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {doctors?.map((item, index) => (
                      <MenuItem value={item.staffId} key={index} >
                        <Typography style={{ fontSize: "14px" }}>
                          {item.fullName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Box>
              <Typography
                variant="body1"
                style={{
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Mô tả
              </Typography>
              <MultilineText
                className="multiline-text"
                multiline
                rows={4}
                fullWidth
                value={departmentEdit.description}
                onChange={(e) => {
                  setDepartmentEdit((prev) => {
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  })
                }}
              />
            </Box>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateDepartment}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Stack>
  );
}

export default DepartmentDetail;
