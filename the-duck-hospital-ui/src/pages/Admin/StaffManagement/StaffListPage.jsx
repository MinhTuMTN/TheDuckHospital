import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import SearchStaffList from "../../../components/Admin/StaffManagement/SearchStaffList";
import StaffTable from "../../../components/Admin/StaffManagement/StaffTable";
import DialogForm from "../../../components/DialogForm";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const items = [
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Bác sĩ",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Thu ngân",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Điều dưỡng",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Thu ngân",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Bác sĩ",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Dược sĩ",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Bác sĩ",
    deleted: false,
  },
  {
    fullName: "Nguyễn Văn Staff",
    phoneNumber: "0123456789",
    role: "Bác sĩ",
    deleted: false,
  },
];

const roles = [
  {
    value: "ADMIN",
    label: "Quản lý",
  },
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
  {
    value: "RECEPTIONIST",
    label: "Lễ tân",
  },
];
const totalItems = items.length;

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
  const [search, setSearch] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(true);
  // const [catalogs, setCatalogs] = useState([]);
  // const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  // const [productItems, setProductItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [staff, setStaff] = useState({
    fullName: "",
    phoneNumber: "",
    identityNumber: "",
    dateOfBirth: dayjs(),
    role: "",
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  // useEffect(() => {
  //   const handleGetCatalogs = async () => {
  //     const response = await getActiveCatalogs();
  //     if (response.success) {
  //       setCatalogs(response.data.data);
  //       setTotalItems(response.data.data.totalObjects);
  //     } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  //   };
  //   if (catalogs.length === 0) {
  //     handleGetCatalogs();
  //   }
  // }, [catalogs]);

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
                    dateOfBirth: "",
                    role: "",
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
                items={items}
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

      <DialogForm
        cancelText={"Hủy"}
        okText={"Thêm"}
        onCancel={() => {
          setOpenDialogForm(false);
          setStaff({
            fullName: "",
            phoneNumber: "",
            identityNumber: "",
            dateOfBirth: "",
            role: "",
          })
        }}
        // onOk={handleAddCatalog}
        open={openDialogForm}
        title={"Thêm nhân viên"}
        onClose={() => setOpenDialogForm(false)}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
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
          />
          <Stack direction={"row"} spacing={1}>
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
            />
          </Stack>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <CustomDatePicker
              label="Ngày sinh"
              value={dayjs(staff.dateOfBirth)}
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
          <Box>
            <CustomTypography variant="body1">
              Vai trò
            </CustomTypography>

            <FormControl fullWidth>
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
                  <MenuItem
                    key={index}
                    value={item.value}
                  >
                    <Typography style={{ fontSize: "16px" }}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </DialogForm>
    </>
  );
}

export default StaffListPage;
