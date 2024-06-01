import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
import React, { useCallback, useEffect, useState } from "react";
import DialogConfirm from "../../General/DialogConfirm";
import CloseIcon from "@mui/icons-material/Close";
import { getAllDepartments } from "../../../services/admin/DepartmentServices";
import { enqueueSnackbar } from "notistack";
import {
  deleteRoom,
  getRoomTypes,
  restoreRoom,
  updateRoom,
} from "../../../services/admin/RoomServices";
import { getRoomType } from "../../../utils/roomTypesUtils";

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

function RoomDetail(props) {
  const { room, handleGetRoom, handleGetSchedules } = props;
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [roomEdit, setRoomEdit] = useState({
    roomName: "",
    departmentId: "",
    description: "",
    roomType: "",
  });
  const [departments, setDepartments] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [statusSelected, setStatusSelected] = useState(false);

  useEffect(() => {
    setStatusSelected(
      typeof room.deleted !== "undefined" ? room.deleted : false
    );
  }, [room]);

  const handleStatusChange = (event) => {
    setStatusSelected(event.target.value);
    if (room.deleted !== event.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleUpdateButtonClick = async () => {
    let response;
    if (room.deleted) {
      response = await restoreRoom(room.roomId);
      if (response.success) {
        enqueueSnackbar("Mở khóa phòng thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetRoom();
        handleGetSchedules();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteRoom(room.roomId);
      if (response.success) {
        enqueueSnackbar("Khóa phòng thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetRoom();
        handleGetSchedules();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  const handleGetDepartment = useCallback(async () => {
    const response = await getAllDepartments();
    if (response.success) {
      setDepartments(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, []);

  const handleGetRoomTypes = useCallback(async () => {
    const response = await getRoomTypes();
    if (response.success) {
      setRoomTypes(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, []);

  const handleUpdateRoom = async () => {
    if (roomEdit.roomName?.trim() === "") {
      enqueueSnackbar("Tên phòng không được để trống", { variant: "error" });
      return;
    }

    if (roomEdit.departmentId === -1) {
      enqueueSnackbar("Khoa không được để trống", { variant: "error" });
      return;
    }

    const response = await updateRoom(room.roomId, {
      roomName: roomEdit.roomName,
      departmentId: roomEdit.departmentId,
      description: roomEdit.description,
      roomType: roomEdit.roomType,
    });
    if (response.success) {
      enqueueSnackbar("Cập nhật thông tin phòng thành công!", {
        variant: "success",
      });
      setOpenPopup(false);
      handleGetRoom();
      // handleGetSchedules();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleEditButtonClick = () => {
    handleGetDepartment();
    handleGetRoomTypes();
    setOpenPopup(true);
    setRoomEdit({
      roomName: room.roomName,
      departmentId: room.departmentId || "",
      description: room.description,
      roomType: room.roomType || "",
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
            onClick={handleEditButtonClick}
          >
            Chỉnh sửa
          </Button>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tên phòng</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{room.roomName}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Tên khoa</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>
              {room.departmentName ? room.departmentName : "Đang cập nhật"}
            </NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Loại phòng</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{getRoomType(room.roomType)}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Mô tả</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{room.description}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
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
              title={room.deleted ? "Mở khóa phòng" : "Khóa phòng"}
              content={
                room.deleted
                  ? "Bạn có chắc chắn muốn mở khóa phòng này?"
                  : "Bạn có chắc chắn muốn khóa phòng này?"
              }
              okText={room.deleted ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
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
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} spacing={2}>
              <Box width="50%">
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "14px",
                    marginBottom: "4px",
                    color: roomEdit.roomName?.trim() === "" ? "red" : "",
                  }}
                >
                  Tên phòng
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
                  error={roomEdit.roomName?.trim() === ""}
                  helperText={
                    roomEdit.roomName?.trim() === "" &&
                    "Tên phòng không được để trống"
                  }
                  value={roomEdit.roomName}
                  onChange={(e) =>
                    setRoomEdit((prev) => {
                      return {
                        ...prev,
                        roomName: e.target.value,
                      };
                    })
                  }
                />
              </Box>
              <Box width="50%">
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "14px",
                    marginBottom: "4px",
                    color: roomEdit.departmentId === -1 ? "red" : "",
                  }}
                >
                  Khoa
                </Typography>
                <FormControl fullWidth error={roomEdit.departmentId === -1}>
                  <Select
                    value={roomEdit.departmentId}
                    onChange={(e) =>
                      setRoomEdit((prev) => {
                        return {
                          ...prev,
                          departmentId: e.target.value,
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
                    error={roomEdit.departmentId === -1}
                  >
                    {departments?.map((item, index) => (
                      <MenuItem value={item.departmentId} key={index}>
                        <Typography style={{ fontSize: "14px" }}>
                          {item.departmentName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {roomEdit.departmentId === -1 && (
                    <FormHelperText>Khoa không được để trống</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Stack>
            <Box>
              <Typography
                variant="body1"
                style={{
                  fontSize: "14px",
                  marginBottom: "4px",
                  color: roomEdit.departmentId === -1 ? "red" : "",
                }}
              >
                Loại phòng
              </Typography>
              <FormControl fullWidth error={roomEdit.roomType === -1}>
                <Select
                  value={roomEdit.roomType || ""}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setRoomEdit((prev) => {
                      return {
                        ...prev,
                        roomType: e.target.value,
                      };
                    });
                  }}
                  displayEmpty
                  required
                  size="small"
                  sx={{
                    fontSize: "14px !important",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {roomTypes?.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      <Typography style={{ fontSize: "14px" }}>
                        {getRoomType(item)}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
                {roomEdit.roomType === -1 && (
                  <FormHelperText>
                    Loại phòng không được để trống
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
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
                value={roomEdit.description}
                onChange={(e) => {
                  setRoomEdit((prev) => {
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  });
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateRoom}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Stack>
  );
}

export default RoomDetail;
