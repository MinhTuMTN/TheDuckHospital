import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DialogConfirm from "../../General/DialogConfirm";
import FormatDate from "../../General/FormatDate";
import { deleteStaff, restoreStaff, updateStaff } from "../../../services/admin/StaffServices";
import { enqueueSnackbar } from "notistack";
import DialogForm from "../../General/DialogForm";
import MuiTextFeild from "../../General/MuiTextFeild";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const degrees = ["BS", "ThS", "TS", "PGS", "GS"];

const roleOptions = [
  {
    value: "DOCTOR",
    name: "Bác sĩ",
  },
  {
    value: "NURSE",
    name: "Điều dưỡng",
  },
  {
    value: "CASHIER",
    name: "Thu ngân",
  },
  {
    value: "PHARMACIST",
    name: "Dược sĩ",
  },
  {
    value: "LABORATORY_TECHNICIAN",
    name: "Bác sĩ xét nghiệm",
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

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "2px !important",
}));

function StaffDetail(props) {
  const { staff, handleGetStaff } = props;
  let status = staff.deleted;
  const [statusStaff, setStatusStaff] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [staffEdit, setStaffEdit] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const maxDateOfBirth = dayjs().subtract(18, 'year');

  useEffect(() => {
    setEditStatus(status);
    setStatusStaff(status);
  }, [status]);

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
    if (statusStaff !== event.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleUpdateButtonClick = async () => {
    let response;
    if (statusStaff) {
      response = await restoreStaff(staff.staffId);
      if (response.success) {
        enqueueSnackbar("Mở khóa nhân viên thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetStaff();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteStaff(staff.staffId);
      if (response.success) {
        enqueueSnackbar("Khóa nhân viên thành công!", { variant: "success" });
        setDisabledButton(true);
        handleGetStaff();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };


  const handleUpdateStaff = async () => {
    setUpdateButtonClicked(true);

    if (staffEdit.fullName?.trim() === "") {
      enqueueSnackbar("Tên nhân viên không được để trống", { variant: "error" });
      return;
    }

    let dateOfBirth = dayjs(staffEdit.dateOfBirth).format("YYYY-MM-DD");
    const response = await updateStaff(staff.staffId, {
      fullName: staffEdit.fullName,
      gender: staffEdit.gender,
      phoneNumber: staffEdit.phoneNumber,
      identityNumber: staffEdit.identityNumber,
      email: staff.email,
      dateOfBirth: dateOfBirth,
      degree: staffEdit.degree,
      role: roleOptions.find(option => option.name === staff.role)?.value
    });
    if (response.success) {
      enqueueSnackbar("Cập nhật thông tin nhân viên thành công!", {
        variant: "success",
      });
      setOpenPopup(false);
      handleGetStaff();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleEditButtonClick = () => {
    setOpenPopup(true);
    setUpdateButtonClicked(false);
    setStaffEdit({
      fullName: staff.fullName,
      gender: staff.gender,
      phoneNumber: staff.phoneNumber,
      identityNumber: staff.identityNumber,
      dateOfBirth: staff.dateOfBirth,
      degree: staff.degree,
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
            <TieuDeCot>Họ tên</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{staff.fullName}</TieuDeCot>
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
              <NoiDung>{staff.role}  {staff.headOfDepartment ? "(Trưởng khoa)" : ""}</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      {staff.departmentName && (
        <BoxStyle>
          <Grid container>
            <Grid item xs={4} md={3}>
              <TieuDeCot>Khoa</TieuDeCot>
            </Grid>
            <Grid item xs={8} md={9}>
              <NoiDung>{staff.departmentName ? staff.departmentName : "Đang cập nhật"}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
      )}
      {staff.degree && (
        <BoxStyle>
          <Grid container>
            <Grid item xs={4} md={3}>
              <TieuDeCot>Bằng cấp</TieuDeCot>
            </Grid>

            <Grid item xs={8} md={9}>
              <NoiDung>{staff.degree}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
      )}
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số điện thoại</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{staff.phoneNumber}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>CCCD</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{staff.identityNumber}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày sinh</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung><FormatDate dateTime={staff.dateOfBirth} /></NoiDung>
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
              title={statusStaff ? "Mở khóa nhân viên" : "Khóa nhân viên"}
              content={
                statusStaff
                  ? "Bạn có chắc chắn muốn mở khóa nhân viên này?"
                  : "Bạn có chắc chắn muốn khóa nhân viên này?"
              }
              okText={statusStaff ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
          </Grid>
        </Grid>
      </BoxStyle>

      <DialogForm
        cancelText={"Hủy"}
        okText={"Cập nhật"}
        onCancel={() => {
          setOpenPopup(false);
        }}
        onOk={handleUpdateStaff}
        open={openPopup}
        title={"Chỉnh sửa nhân viên"}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <Stack width={"30rem"} mt={1} spacing={3}>
          <MuiTextFeild
            label={"Họ tên"}
            autoFocus
            autoComplete="off"
            value={staffEdit.fullName ? staffEdit.fullName : ""}
            onChange={(e) => {
              setStaffEdit((prev) => ({
                ...prev,
                fullName: e.target.value,
              }));
            }}
            required
            error={staffEdit.fullName?.trim() === "" && updateButtonClicked}
            helperText={
              staffEdit.fullName?.trim() === "" &&
              updateButtonClicked &&
              "Tên nhân viên không được để trống"
            }
          />
          <Stack direction={"row"} spacing={2}>
            <MuiTextFeild
              label="Số điện thoại"
              value={staffEdit.phoneNumber ? staffEdit.phoneNumber : ""}
              autoComplete="off"
              style={{ width: "50%" }}
              onChange={(e) => {
                setStaffEdit((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
              required
              error={staffEdit.phoneNumber?.trim() === "" && updateButtonClicked}
              helperText={
                staffEdit.phoneNumber?.trim() === "" &&
                updateButtonClicked &&
                "Số điện thoại không được để trống"
              }
            />
            <MuiTextFeild
              label="CCCD"
              value={staffEdit.identityNumber ? staffEdit.identityNumber : ""}
              autoComplete="off"
              style={{ width: "50%" }}
              onChange={(e) => {
                setStaffEdit((prev) => ({
                  ...prev,
                  identityNumber: e.target.value,
                }));
              }}
              required
              error={staffEdit.identityNumber?.trim() === "" && updateButtonClicked}
              helperText={
                staffEdit.identityNumber?.trim() === "" &&
                updateButtonClicked &&
                "CCCD không được để trống"
              }
            />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Box
              style={{ width: "50%" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <CustomDatePicker
                  label="Ngày sinh"
                  value={dayjs(staffEdit.dateOfBirth)}
                  maxDate={maxDateOfBirth}
                  defaultValue={maxDateOfBirth}
                  onChange={(newDate) => {
                    setStaffEdit((prev) => {
                      return {
                        ...prev,
                        dateOfBirth: newDate,
                      };
                    });
                  }}
                  sx={{ mt: 2 }}
                />
              </LocalizationProvider>
            </Box>
            <Stack>
              <FormControl>
                <CustomTypography variant="body1">Giới tính</CustomTypography>
                <RadioGroup
                  value={staffEdit.gender ? staffEdit.gender.toString() : "0"}
                  row
                >
                  <FormControlLabel
                    checked={staffEdit.gender === 0}
                    onChange={(e) => {
                      setStaffEdit((prev) => ({
                        ...prev,
                        gender: parseInt(e.target.value),
                      }));
                    }}
                    value="0"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    checked={staffEdit.gender === 1}
                    onChange={(e) => {
                      setStaffEdit((prev) => ({
                        ...prev,
                        gender: parseInt(e.target.value),
                      }));
                    }}
                    value="1"
                    control={<Radio />}
                    label="Nữ"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
          {staff.role === "Bác sĩ" &&
            <Box>
              <CustomTypography
                variant="body1"
                style={{
                  color: staffEdit.degree === null &&
                    staff.role === "Bác sĩ" &&
                    updateButtonClicked ? "red" : "",
                }}
              >
                Bằng cấp
              </CustomTypography>
              <FormControl fullWidth error={
                staffEdit.degree === null &&
                staff.role === "Bác sĩ" &&
                updateButtonClicked
              }>
                <Select
                  value={staffEdit.degree ? staffEdit.degree : ""}
                  onChange={(e) =>
                    setStaffEdit((prev) => {
                      return {
                        ...prev,
                        degree: e.target.value,
                      };
                    })
                  }
                  displayEmpty
                  required
                  sx={{
                    fontSize: "16px !important",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {degrees?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <Typography style={{ fontSize: "16px" }}>
                        {item}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
                {staffEdit.degree === null &&
                  staff.role === "Bác sĩ" &&
                  updateButtonClicked && (
                    <FormHelperText>Bằng cấp không được để trống</FormHelperText>
                  )}
              </FormControl>
            </Box>}
        </Stack >
      </DialogForm >
    </Stack>
  );
}

export default StaffDetail;
