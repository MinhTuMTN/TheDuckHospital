import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import SearchStaffList from "../../../components/Admin/StaffManagement/SearchStaffList";
import StaffTable from "../../../components/Admin/StaffManagement/StaffTable";
import DialogForm from "../../../components/General/DialogForm";
import MuiTextFeild from "../../../components/General/MuiTextFeild";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createStaff,
  getPaginationStaffs,
} from "../../../services/admin/StaffServices";
import { enqueueSnackbar } from "notistack";
import { getAllDepartments } from "../../../services/admin/DepartmentServices";
import DialogConfirm from "../../../components/General/DialogConfirm";
import StaffFilter from "../../../components/Admin/StaffManagement/StaffFilter";

// const roles = [
//   {
//     value: "DOCTOR",
//     label: "Bác sĩ",
//   },
//   {
//     value: "NURSE",
//     label: "Điều dưỡng",
//   },
//   {
//     value: "PHARMACIST",
//     label: "Dược sĩ",
//   },
//   {
//     value: "CASHIER",
//     label: "Thu ngân",
//   },
//   {
//     value: "LABORATORY_TECHNICIAN",
//     label: "Bác sĩ xét nghiệm",
//   },
// ];

const degrees = ["BS", "ThS", "TS", "PGS", "GS"];

const statusOptions = [
  {
    value: false,
    name: "Còn hoạt động",
  },
  {
    value: true,
    name: "Ngưng hoạt động",
  },
];

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
    value: "LABORATORY_TECHNICIAN",
    name: "Bác sĩ xét nghiệm",
  },
  {
    value: "SUPPORT_AGENT",
    name: "Hỗ trợ viên",
  },
];

const CustomButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    background: "#00a0ff",
  },
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

function StaffListPage(props) {
  const [search, setSearch] = useState("");
  const [buttonClicked, setButtonClicked] = useState(true);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const [departmentsFilter, setDepartmentsFilter] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxDateOfBirth = dayjs().subtract(18, "year");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [staff, setStaff] = useState({
    fullName: "",
    phoneNumber: "",
    identityNumber: "",
    dateOfBirth: maxDateOfBirth,
    degree: null,
    role: "",
    gender: 1,
    email: "",
    departmentId: "",
    nurseType: "null",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const [selectedRole, setSelectedRole] = useState([]);
  const handleChangeRoleFilter = (event) => {
    if (event.target.checked) {
      setSelectedRole((prev) => [...prev, event.target.value]);
    } else {
      setSelectedRole((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  // const [selectedDepartments, setSelectedDepartments] = useState([]);
  // const handleChangeDepartmentsFilter = (event) => {
  //   if (event.target.checked) {
  //     setSelectedDepartments((prev) => [...prev, parseInt(event.target.value)]);
  //   } else {
  //     setSelectedDepartments((prev) =>
  //       prev.filter((item) => item !== parseInt(event.target.value))
  //     );
  //   }
  // };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value === "true"]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== (event.target.value === "true"))
      );
    }
  };

  const handleGetDepartments = useCallback(async () => {
    const response = await getAllDepartments();
    if (response.success) {
      setDepartments(response.data.data);
      // setDepartmentsFilter(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, []);
  useEffect(() => {
    handleGetDepartments();
  }, [handleGetDepartments]);

  const handleGetStaffs = useCallback(async () => {
    if (!buttonClicked) return;
    const response = await getPaginationStaffs({
      search: search.trim(),
      page: filterButtonClicked ? 0 : page - 1,
      limit: limit,
      staffRole: selectedRole,
      staffStatus: selectedStatus,
      // departmentIds: selectedDepartments
    });

    if (filterButtonClicked) {
      setFilterButtonClicked(false);
    }

    if (response.success) {
      setStaffs(response.data.data.staffs);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setButtonClicked(false);
  }, [
    search,
    page,
    limit,
    selectedStatus,
    selectedRole,
    // selectedDepartments,
    buttonClicked,
    filterButtonClicked,
  ]);

  useEffect(() => {
    handleGetStaffs();
  }, [handleGetStaffs]);

  // const handleGetDepartments = async () => {
  //   const response = await getAllDepartments();
  //   if (response.success) {
  //     setDepartments(response.data.data);
  //     setDepartmentsFilter(response.data.data)
  //   } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  // };

  const handleCreateStaff = async () => {
    // console.log(staff.nurseType);
    // return;
    setAddButtonClicked(true);
    setIsLoading(true);

    if (
      staff.fullName?.trim() === "" ||
      staff.email?.trim() === "" ||
      staff.phoneNumber?.trim() === "" ||
      staff.identityNumber?.trim() === "" ||
      staff.role?.trim() === ""
    ) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
      setIsLoading(false);
      return;
    }

    if (staff.role?.trim() === "DOCTOR") {
      if (staff.degree === null || staff.departmentId === "") {
        enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
        setIsLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("fullName", staff.fullName);
    formData.append("phoneNumber", staff.phoneNumber);
    formData.append("identityNumber", staff.identityNumber);
    formData.append("email", staff.email);
    formData.append(
      "dateOfBirth",
      dayjs(staff.dateOfBirth).format("MM/DD/YYYY")
    );
    formData.append("role", staff.role);
    formData.append("gender", staff.gender);
    formData.append("degree", staff.degree ? staff.degree : "");
    formData.append("departmentId", staff.departmentId);
    formData.append(
      "nurseType",
      staff.nurseType === null ? "" : staff.nurseType
    );
    formData.append("avatar", selectedFile);

    const response = await createStaff(formData);
    setIsLoading(false);
    if (response.success) {
      enqueueSnackbar("Thêm nhân viên thành công", { variant: "success" });
      setOpenDialogForm(false);
      setOpenDialogConfirm(true);
      setEmail(response.data.data.email);
      setPhoneNumber(response.data.data.phoneNumber);
      setPassword(response.data.data.password);
      setButtonClicked(true);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleCloseDialog = () => {
    setOpenDialogConfirm(false);
    setPassword("");
    setPhoneNumber("");
    setEmail("");
  };

  useEffect(() => {
    setButtonClicked(true);
  }, [page, limit]);

  return (
    <>
      <Box component={"main"} sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth={"lg"}>
          <Stack spacing={4}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                variant="h3"
                fontWeight={"680"}
                style={{
                  fontSize: "32px",
                }}
              >
                Danh sách nhân viên
              </Typography>
              <CustomButton
                color="normal1"
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setStaff({
                    fullName: "",
                    phoneNumber: "",
                    identityNumber: "",
                    dateOfBirth: maxDateOfBirth,
                    degree: null,
                    role: "",
                    gender: 0,
                    email: "",
                    departmentId: "",
                    nurseType: null,
                  });
                  setOpenDialogForm(true);
                }}
              >
                Thêm
              </CustomButton>
            </Stack>
            <Stack
              component={Paper}
              elevation={3}
              sx={{
                paddingBottom: 2,
                borderRadius: "10px",
              }}
              spacing={"2px"}
            >
              <SearchStaffList
                value={search}
                onChange={setSearch}
                onApply={() => {
                  setButtonClicked(true);
                  setFilterButtonClicked(true);
                }}
              />
              <Box py={2} px={3}>
                {selectedRole.length === 0 && selectedStatus.length === 0 && (
                  // selectedDepartments.length === 0 && (
                  <TextField
                    disabled
                    variant="standard"
                    fullWidth
                    size="medium"
                    InputProps={{
                      disableUnderline: true,
                      fontSize: "14px",
                    }}
                    placeholder="Không có bộ lọc nào được chọn"
                  />
                )}
                <Stack direction="row" spacing={1}>
                  {selectedRole.map((item, index) => (
                    <Chip
                      color="info"
                      label={roleOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedRole((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                  {/* {selectedDepartments.map((item, index) => (
                    <Chip
                      color="primary"
                      label={
                        departmentsFilter.find(
                          (i) => i.departmentId === item
                        )?.departmentName
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedDepartments((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))} */}
                  {selectedStatus.map((item, index) => (
                    <Chip
                      color="warning"
                      label={statusOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                </Stack>
              </Box>
              <Stack
                direction={"row"}
                spacing={1}
                paddingLeft={2}
                paddingBottom={1}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <StaffFilter
                  label={"Vai trò"}
                  options={roleOptions}
                  selectedValues={selectedRole}
                  onChange={handleChangeRoleFilter}
                />
                {/* <StaffFilter
                  label={"Khoa"}
                  isDepartmentFilter={true}
                  options={departmentsFilter}
                  selectedValues={selectedDepartments}
                  onChange={handleChangeDepartmentsFilter}
                /> */}
                <StaffFilter
                  label={"Trạng thái"}
                  options={statusOptions}
                  selectedValues={selectedStatus}
                  onChange={handleChangeStatusFilter}
                />
              </Stack>
              <StaffTable
                count={totalItems ? totalItems : 0}
                items={staffs}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <DialogConfirm
        open={openDialogConfirm}
        okText={"Đồng ý"}
        onCancel={handleCloseDialog}
        onOk={handleCloseDialog}
        title={"Tạo tài khoản thành công"}
        onClose={handleCloseDialog}
        content={`Mật khẩu của nhân viên ${email} (số điện thoại: ${phoneNumber}) là ${password}`}
      />

      <DialogForm
        cancelText={"Hủy"}
        okText={"Thêm"}
        onCancel={() => {
          setOpenDialogForm(false);
          setAddButtonClicked(false);
          setStaff({
            fullName: "",
            phoneNumber: "",
            identityNumber: "",
            dateOfBirth: dayjs(),
            degree: null,
            role: "",
            gender: 0,
            email: "",
            departmentId: "",
            nurseType: null,
          });
        }}
        onOk={handleCreateStaff}
        open={openDialogForm}
        isLoading={isLoading}
        title={"Thêm nhân viên"}
        onClose={() => {
          setOpenDialogForm(false);
          setAddButtonClicked(false);
          setStaff({
            fullName: "",
            phoneNumber: "",
            identityNumber: "",
            dateOfBirth: maxDateOfBirth,
            degree: null,
            role: "",
            gender: 0,
            email: "",
            departmentId: "",
            nurseType: null,
          });
        }}
      >
        <Stack width={"30rem"} mt={1} spacing={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1}
          >
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
              alt="top-product"
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
            <TextField
              variant="outlined"
              type="text"
              value={selectedFile ? selectedFile.name : ""}
              disabled
              InputProps={{
                endAdornment: (
                  <IconButton component="label">
                    <FileUploadOutlined />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </IconButton>
                ),
              }}
            />
          </Stack>
          <MuiTextFeild
            label={"Họ tên"}
            autoFocus
            autoComplete="off"
            value={staff.fullName}
            onChange={(e) => {
              setStaff((prev) => ({
                ...prev,
                fullName: e.target.value,
              }));
            }}
            required
            error={staff.fullName?.trim() === "" && addButtonClicked}
            helperText={
              staff.fullName?.trim() === "" &&
              addButtonClicked &&
              "Tên nhân viên không được để trống"
            }
          />
          <Stack direction={"row"} spacing={2}>
            <MuiTextFeild
              label="Số điện thoại"
              value={staff.phoneNumber}
              autoComplete="off"
              style={{ width: "50%" }}
              onChange={(e) => {
                setStaff((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
              required
              error={staff.phoneNumber?.trim() === "" && addButtonClicked}
              helperText={
                staff.phoneNumber?.trim() === "" &&
                addButtonClicked &&
                "Số điện thoại không được để trống"
              }
            />
            <MuiTextFeild
              label="CCCD"
              value={staff.identityNumber}
              autoComplete="off"
              style={{ width: "50%" }}
              onChange={(e) => {
                setStaff((prev) => ({
                  ...prev,
                  identityNumber: e.target.value,
                }));
              }}
              required
              error={staff.identityNumber?.trim() === "" && addButtonClicked}
              helperText={
                staff.identityNumber?.trim() === "" &&
                addButtonClicked &&
                "CCCD không được để trống"
              }
            />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Box style={{ width: "50%" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <CustomDatePicker
                  label="Ngày sinh"
                  value={dayjs(staff.dateOfBirth)}
                  maxDate={maxDateOfBirth}
                  defaultValue={maxDateOfBirth}
                  onChange={(newDate) => {
                    setStaff((prev) => {
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
                <RadioGroup defaultValue="0" value={staff.gender} row>
                  <FormControlLabel
                    // checked={staff.gender === 0}
                    onChange={(e) => {
                      setStaff((prev) => ({
                        ...prev,
                        gender: parseInt(e.target.value),
                      }));
                    }}
                    value="0"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    // checked={staff.gender === 1}
                    onChange={(e) => {
                      setStaff((prev) => ({
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
          <MuiTextFeild
            label={"Email"}
            autoComplete="off"
            value={staff.email}
            onChange={(e) => {
              setStaff((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            required
            error={staff.email?.trim() === "" && addButtonClicked}
            helperText={
              staff.email?.trim() === "" &&
              addButtonClicked &&
              "Email không được để trống"
            }
          />
          <Box>
            <CustomTypography
              variant="body1"
              style={{
                color: staff.role === "" && addButtonClicked ? "red" : "",
              }}
            >
              Vai trò
            </CustomTypography>
            <FormControl
              fullWidth
              error={staff.role === "" && addButtonClicked}
            >
              <Select
                value={staff.role}
                onChange={(e) =>
                  setStaff((prev) => {
                    return {
                      ...prev,
                      role: e.target.value,
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
                {roleOptions?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {staff.role === "" && addButtonClicked && (
                <FormHelperText>Vai trò không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
          {staff.role === "NURSE" && (
            <Stack>
              <FormControl>
                <CustomTypography variant="body1">
                  Loại điều dưỡng
                </CustomTypography>
                <RadioGroup defaultValue="null" value={staff.nurseType} row>
                  <FormControlLabel
                    // checked={staff.nurseType === null}
                    onChange={(e) => {
                      setStaff((prev) => ({
                        ...prev,
                        nurseType: null,
                      }));
                    }}
                    value="null"
                    control={<Radio />}
                    label="Không"
                  />
                  <FormControlLabel
                    // checked={staff.nurseType === 0}
                    onChange={(e) => {
                      setStaff((prev) => ({
                        ...prev,
                        nurseType: e.target.value,
                      }));
                    }}
                    value="CLINICAL_NURSE"
                    control={<Radio />}
                    label="Phòng khám"
                  />
                  <FormControlLabel
                    // checked={staff.nurseType === 1}
                    onChange={(e) => {
                      setStaff((prev) => ({
                        ...prev,
                        nurseType: e.target.value,
                      }));
                    }}
                    value="INPATIENT_NURSE"
                    control={<Radio />}
                    label="Nội trú"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          )}
          {(staff.role === "DOCTOR" ||
            (staff.role === "NURSE" && staff.nurseType !== null)) && (
            <Box>
              <Stack direction={"row"} spacing={2}>
                {staff.role === "DOCTOR" && (
                  <Box style={{ width: "50%" }}>
                    <CustomTypography
                      variant="body1"
                      style={{
                        color:
                          staff.degree === null &&
                          staff.role === "DOCTOR" &&
                          addButtonClicked
                            ? "red"
                            : "",
                      }}
                    >
                      Bằng cấp
                    </CustomTypography>
                    <FormControl
                      fullWidth
                      error={
                        staff.degree === null &&
                        staff.role === "DOCTOR" &&
                        addButtonClicked
                      }
                    >
                      <Select
                        value={staff.degree}
                        onChange={(e) =>
                          setStaff((prev) => {
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
                      {staff.degree === null &&
                        staff.role === "DOCTOR" &&
                        addButtonClicked && (
                          <FormHelperText>
                            Bằng cấp không được để trống
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                )}
                <Box style={{ width: staff.role === "NURSE" ? "100%" : "50%" }}>
                  <CustomTypography
                    variant="body1"
                    style={{
                      color:
                        staff.departmentId === "" &&
                        staff.role === "DOCTOR" &&
                        addButtonClicked
                          ? "red"
                          : "",
                    }}
                  >
                    Khoa
                  </CustomTypography>
                  <FormControl
                    fullWidth
                    error={
                      staff.departmentId === "" &&
                      staff.role === "DOCTOR" &&
                      addButtonClicked
                    }
                  >
                    <Select
                      value={staff.departmentId}
                      onChange={(e) =>
                        setStaff((prev) => {
                          return {
                            ...prev,
                            departmentId: e.target.value,
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
                      <MenuItem key={-1} value={""}>
                        <Typography style={{ fontSize: "16px" }}>
                          Trống
                        </Typography>
                      </MenuItem>
                      {departments?.map((item, index) => (
                        <MenuItem key={index} value={item.departmentId}>
                          <Typography style={{ fontSize: "16px" }}>
                            {item.departmentName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {staff.departmentId === "" &&
                      staff.role === "DOCTOR" &&
                      addButtonClicked && (
                        <FormHelperText>
                          Khoa không được để trống
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogForm>
    </>
  );
}

export default StaffListPage;
