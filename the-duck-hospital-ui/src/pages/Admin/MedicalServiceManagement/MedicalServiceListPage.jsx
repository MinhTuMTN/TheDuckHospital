import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import DialogForm from "../../../components/General/DialogForm";
import { enqueueSnackbar } from "notistack";
import { addService, getPaginationServices } from "../../../services/admin/MedicalServiceServices";
import SearchServiceList from "../../../components/Admin/MedicalServiceManagment/SearchServiceList";
import MedicalServiceTable from "../../../components/Admin/MedicalServiceManagment/MedicalServiceTable";
import { getDepartmentsWithoutServices } from "../../../services/admin/DepartmentServices";
import MuiTextFeild from "../../../components/General/MuiTextFeild";

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

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "2px !important",
}));

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

function MedicalServiceListPage(props) {
  const [search, setSearch] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(true);
  const [services, setServices] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [medicalService, setMedicalService] = useState({
    serviceName: "",
    serviceType: "MedicalExamination",
    departmentId: "",
    price: 1000,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
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

  const handleGetServices = useCallback(async () => {
    // if (!buttonClicked) return;
    const response = await getPaginationServices({
      page: page - 1,
      limit: limit,
    });
    if (response.success) {
      setServices(response.data.data.medicalServices);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    // setButtonClicked(false);
  }, [page, limit]);

  useEffect(() => {
    handleGetServices();
  }, [handleGetServices]);

  const handleGetDepartment = async () => {
    const response = await getDepartmentsWithoutServices();
    if (response.success) {
      setDepartments(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleAddMedicalService = async () => {
    setAddButtonClicked(true);

    if (medicalService.serviceType === "") {
      enqueueSnackbar("Loại dịch vụ không được để trống", { variant: "error" });
      return;
    }

    if (medicalService.serviceType !== "MedicalExamination") {
      enqueueSnackbar("Chưa hỗ trợ", { variant: "error" });
      return;
    }

    if (medicalService.price === 0) {
      enqueueSnackbar("Giá dịch vụ phải lớn hơn 0", { variant: "error" });
      return;
    }

    if (medicalService.departmentId === null) {
      enqueueSnackbar("Khoa không được để trống", { variant: "error" });
      return;
    }

    const response = await addService({
      serviceName: medicalService.serviceName,
      serviceType: medicalService.serviceType,
      price: medicalService.price,
      departmentId: medicalService.departmentId,
    });
    if (response.success) {
      enqueueSnackbar("Thêm dịch vụ thành công!", { variant: "success" });
      setOpenDialogForm(false);
      handleGetServices();
    } else enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  };

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
                Danh sách dịch vụ
              </Typography>
              <CustomButton
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setMedicalService({
                    serviceName: "",
                    serviceType: "MedicalExamination",
                    departmentId: "",
                    price: 1000,
                  });
                  setOpenDialogForm(true);
                  setAddButtonClicked(false);
                  handleGetDepartment();
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
              <SearchServiceList
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
              <MedicalServiceTable
                count={totalItems ? totalItems : 0}
                items={services}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <DialogForm
        cancelText={"Hủy"}
        okText={"Thêm"}
        onCancel={() => {
          setOpenDialogForm(false);
          setMedicalService({
            serviceName: "",
            serviceType: "MedicalExamination",
            departmentId: "",
            price: 1000,
          });
          setAddButtonClicked(false);
        }}
        onOk={handleAddMedicalService}
        open={openDialogForm}
        title={"Thêm dịch vụ"}
        onClose={() => {
          setOpenDialogForm(false);
          setMedicalService({
            serviceName: "",
            serviceType: "MedicalExamination",
            departmentId: "",
            price: 1000,
          });
          setAddButtonClicked(false);
        }}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
          <Box>
            <CustomTypography
              variant="body1"
              style={{
                color: medicalService.serviceType === "" && addButtonClicked ? "red" : "",
              }}
            >
              Loại dịch vụ
            </CustomTypography>

            <FormControl fullWidth error={medicalService.serviceType === "" && addButtonClicked}>
              <Select
                value={medicalService.serviceType}
                onChange={(e) =>
                  setMedicalService((prev) => {
                    return {
                      ...prev,
                      serviceType: e.target.value,
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
                {serviceTypes?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {medicalService.serviceType === "" && addButtonClicked && (
                <FormHelperText>Loại dịch vụ không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
          {medicalService.serviceType === "MedicalExamination" ?
            <>
              <MuiTextFeild
                type="number"
                label="Giá dịch vụ"
                autoFocus
                autoComplete="off"
                InputProps={{ inputProps: { min: 1000 } }}
                value={medicalService.price ? medicalService.price.toString() : "0"}
                onChange={(e) => {
                  setMedicalService((prev) => ({
                    ...prev,
                    price: e.target.value ? parseInt(e.target.value) : 0,
                  }));
                }}
                required
                error={medicalService.price === 0 && addButtonClicked}
                helperText={
                  medicalService.price === 0 && addButtonClicked &&
                  "Giá dịch vụ phải lớn hơn 0"
                }
              />
              <Box>
                <CustomTypography
                  variant="body1"
                  style={{
                    color: medicalService.departmentId === "" && addButtonClicked ? "red" : "",
                  }}
                >
                  Khoa
                </CustomTypography>

                <FormControl fullWidth error={medicalService.departmentId === "" && addButtonClicked}>
                  <Select
                    value={medicalService.departmentId}
                    onChange={(e) =>
                      setMedicalService((prev) => {
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
                  {medicalService.departmentId === "" && addButtonClicked && (
                    <FormHelperText>Khoa không được để trống</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </> : <Typography>Nope</Typography>
          }
        </Stack>
      </DialogForm>
    </>
  );
}

export default MedicalServiceListPage;
