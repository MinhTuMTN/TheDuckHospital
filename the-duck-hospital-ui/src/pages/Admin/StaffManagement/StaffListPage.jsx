import {
  Box,
  Button,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { createStaff, getAllStaffs } from "../../../services/admin/StaffServices";
import { enqueueSnackbar } from "notistack";
import { getAllDepartments } from "../../../services/admin/DepartmentServices";
import { useNavigate } from "react-router-dom";
import DialogConfirm from "../../../components/General/DialogConfirm";

// const items = [
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Bác sĩ",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Thu ngân",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Điều dưỡng",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Thu ngân",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Bác sĩ",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Dược sĩ",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Bác sĩ",
//     deleted: false,
//   },
//   {
//     fullName: "Nguyễn Văn Staff",
//     phoneNumber: "0123456789",
//     role: "Bác sĩ",
//     deleted: false,
//   },
// ];

const roles = [
  {
    value: "DOCTOR",
    label: "Bác sĩ",
  },
  {
    value: "NURSE",
    label: "Điều dưỡng",
  },
  {
    value: "PHARMACIST",
    label: "Dược sĩ",
  },
  {
    value: "CASHIER",
    label: "Thu ngân",
  },
];

const degrees = [
  {
    value: "BS",
    label: "BS",
  },
  {
    value: "ThS",
    label: "ThS",
  },
  {
    value: "TS",
    label: "TS",
  },
  {
    value: "PGS",
    label: "PGS",
  },
  {
    value: "GS",
    label: "GS",
  },
];

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(true);
  // const [catalogs, setCatalogs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  // const [productItems, setProductItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const maxDateOfBirth = dayjs().subtract(18, 'year');
  const [staff, setStaff] = useState({
    fullName: "",
    phoneNumber: "",
    identityNumber: "",
    dateOfBirth: maxDateOfBirth,
    degree: null,
    role: "",
    gender: 1,
    email: "",
    departmentId: null,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const handleGetStaffs = async () => {
      const response = await getAllStaffs();
      if (response.success) {
        setStaffs(response.data.data);
        setTotalItems(response.data.data.length);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    handleGetStaffs();
  }, []);

  const handleGetDepartment = async () => {
    const response = await getAllDepartments();
    if (response.success) {
      setDepartments(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleCreateStaff = async () => {
    setAddButtonClicked(true);

    if (staff.fullName?.trim() === "" || staff.email?.trim() === "" ||
      staff.phoneNumber?.trim() === "" || staff.identityNumber?.trim() === "" ||
      staff.role?.trim() === ""
    ) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
      return;
    }

    if (staff.role?.trim() === "DOCTOR") {
      if (staff.degree === null || staff.departmentId === null) {
        enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
        return;
      }
    }
    let dateOfBirth = dayjs(staff.dateOfBirth).format("YYYY-MM-DD");
    const response = await createStaff({
      fullName: staff.fullName,
      phoneNumber: staff.phoneNumber,
      identityNumber: staff.identityNumber,
      dateOfBirth: dateOfBirth,
      degree: staff.degree,
      role: staff.role,
      gender: staff.gender,
      email: staff.email,
      departmentId: staff.departmentId,
    });
    if (response.success) {
      enqueueSnackbar("Thêm nhân viên thành công", { variant: "success" });
      setOpenDialogForm(false);
      setOpenDialogConfirm(true);
      setEmail(response.data.data.email);
      setPhoneNumber(response.data.data.phoneNumber);
      setPassword(response.data.data.password);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }

  const handleCloseDialog = () => {
    setOpenDialogConfirm(false);
    setPassword("");
    setPhoneNumber("");
    setEmail("");
    navigate(0);
  };
  // const handleGetFilteredProduct = useCallback(async () => {
  //   if (!buttonClicked) return;
  //   setIsLoading(true);
  //   const response = await GetFilteredProducts({
  //     search: search,
  //     page: page - 1,
  //     limit: limit,
  //     catalogIds: selectedCategory,
  //     productStatus: selectedStatus,
  //     productQuantity: selectedQuantity,
  //   });
  //   if (response.success) {
  //     setProductItems(response.data.data.objects);
  //     setPage(parseInt(response.data.data.page) + 1);
  //     setTotalItems(response.data.data.totalObjects);
  //     setLimit(response.data.data.limit);
  //   } else
  //     enqueueSnackbar("Đã có lỗi xảy ra khi lấy thông tin sản phẩm", {
  //       variant: "error",
  //     });
  //   setIsLoading(false);
  //   setButtonClicked(false);
  // }, [
  //   limit,
  //   page,
  //   search,
  //   selectedCategory,
  //   selectedQuantity,
  //   selectedStatus,
  //   buttonClicked,
  // ]);

  // useEffect(() => {
  //   setButtonClicked(true);
  // }, [page, limit]);

  // useEffect(() => {
  //   handleGetFilteredProduct();
  // }, [handleGetFilteredProduct]);

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
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
                    gender: 1,
                    email: "",
                    departmentId: null,
                  });
                  handleGetDepartment();
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
              // onApply={() => {
              //   setButtonClicked(true);
              // }}
              />
              {/* <Box py={2} px={3}>
                  {selectedCategory.length === 0 &&
                    selectedQuantity.length === 0 &&
                    selectedStatus.length === 0 && (
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
                  {selectedCategory.map((item, index) => (
                    <Chip
                      color="primary"
                      label={
                        catalogs.find((c) => c.catalogId === item)?.catalogName
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedCategory((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedStatus.map((item, index) => (
                    <Chip
                      color="secondary"
                      label={statusOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedQuantity.map((item, index) => (
                    <Chip
                      color="warning"
                      label={
                        quantityOptions.find((i) => i.value === item)?.name
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedQuantity((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                </Box> */}
              {/* <Stack
                  direction={"row"}
                  spacing={1}
                  paddingLeft={2}
                  paddingBottom={1}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ProductFilter
                    label={"Danh mục"}
                    options={catalogs}
                    selectedValues={selectedCategory}
                    onChange={handleChangeCategoryFilter}
                  />
                  <ProductFilter
                    label={"Trạng thái"}
                    options={statusOptions}
                    selectedValues={selectedStatus}
                    onChange={handleChangeStatusFilter}
                  />
                  <ProductFilter
                    label={"Số lượng"}
                    options={quantityOptions}
                    selectedValues={selectedQuantity}
                    onChange={handleChangeQuantityFilter}
                  />
                </Stack> */}
              {/* <ProductsTableBasis
                  count={dataFetched.length}
                  items={dataFetched}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                /> */}
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
      {/* )} */}

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
            gender: 1,
            email: "",
            departmentId: null,
          });
        }}
        onOk={handleCreateStaff}
        open={openDialogForm}
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
            gender: 1,
            email: "",
            departmentId: null,
          });
        }}
      >
        <Stack width={"30rem"} mt={1} spacing={3}>
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
              staff.fullName?.trim() === "" && addButtonClicked && "Tên nhân viên không được để trống"
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
                staff.phoneNumber?.trim() === "" && addButtonClicked && "Số điện thoại không được để trống"
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
                staff.identityNumber?.trim() === "" && addButtonClicked && "CCCD không được để trống"
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
                <RadioGroup
                  defaultValue="female"
                  value={staff.gender}
                  row
                >
                  <FormControlLabel
                    checked={staff.gender === 0}
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
                    checked={staff.gender === 1}
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
              staff.email?.trim() === "" && addButtonClicked && "Email không được để trống"
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
            <FormControl fullWidth error={staff.role === "" && addButtonClicked}>
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
                {roles?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {staff.role === "" && addButtonClicked && (
                <FormHelperText>Vai trò không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
          {staff.role === "DOCTOR" &&
            <Box>
              <Stack direction={"row"} spacing={2}>
                <Box style={{ width: "50%" }}>
                  <CustomTypography
                    variant="body1"
                    style={{
                      color: staff.degree === null && staff.role === "DOCTOR" && addButtonClicked ? "red" : "",
                    }}
                  >
                    Bằng cấp
                  </CustomTypography>
                  <FormControl fullWidth error={staff.degree === null && staff.role === "DOCTOR" && addButtonClicked}>
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
                        <MenuItem key={index} value={item.value}>
                          <Typography style={{ fontSize: "16px" }}>
                            {item.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {staff.degree === null && staff.role === "DOCTOR" && addButtonClicked && (
                      <FormHelperText>Bằng cấp không được để trống</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box style={{ width: "50%" }}>
                  <CustomTypography
                    variant="body1"
                    style={{
                      color: staff.departmentId === null && staff.role === "DOCTOR" && addButtonClicked ? "red" : "",
                    }}
                  >
                    Khoa
                  </CustomTypography>
                  <FormControl fullWidth error={staff.departmentId === null && staff.role === "DOCTOR" && addButtonClicked}>
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
                      {departments?.map((item, index) => (
                        <MenuItem key={index} value={item.departmentId}>
                          <Typography style={{ fontSize: "16px" }}>
                            {item.departmentName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {staff.departmentId === null && staff.role === "DOCTOR" && addButtonClicked && (
                      <FormHelperText>Khoa không được để trống</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Stack>
            </Box>}
        </Stack >
      </DialogForm >
    </>
  );
}

export default StaffListPage;
