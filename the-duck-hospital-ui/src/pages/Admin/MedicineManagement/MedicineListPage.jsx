import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import SearchMedicineList from "../../../components/Admin/MedicineManagement/SearchMedicineList";
import MedicineTable from "../../../components/Admin/MedicineManagement/MedicineTable";
import DialogForm from "../../../components/General/DialogForm";
import MuiTextFeild from "../../../components/General/MuiTextFeild";
import { createMedicine, getPaginationMedicines, updateMedicine } from "../../../services/admin/MedicineServices";
import { enqueueSnackbar } from "notistack";

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

function MedicineListPage(props) {
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [medicine, setMedicine] = useState({
    medicineName: "",
    price: 1000,
    quantity: 1,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handleGetMedicines = useCallback(async () => {
    // if (!buttonClicked) return;
    const response = await getPaginationMedicines({
      page: page - 1,
      limit: limit,
    });
    if (response.success) {
      setMedicines(response.data.data.medicines);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    // setButtonClicked(false);
  }, [page, limit]);

  useEffect(() => {
    handleGetMedicines();
  }, [handleGetMedicines]);

  const handleCreateUpdateMedicine = async () => {
    setAddButtonClicked(true);

    if (medicine.medicineName?.trim() === "" ||
      medicine.price === null ||
      medicine.quantity === null
    ) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
      return;
    }

    if (medicine.price === 0) {
      enqueueSnackbar("Giá thuốc phải lớn hơn 0", { variant: "error" });
      return;
    }

    if (medicine.quantity === 0) {
      enqueueSnackbar("Số lượng thuốc phải lớn hơn 0", { variant: "error" });
      return;
    }

    if (addNew) {
      const response = await createMedicine({
        medicineName: medicine.medicineName.trim(),
        price: medicine.price,
        quantity: medicine.quantity,
      });
      if (response.success) {
        enqueueSnackbar("Thêm thuốc thành công", { variant: "success" });
        setOpenDialogForm(false);
        handleGetMedicines();
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    } else {
      const response = await updateMedicine(medicine.medicineId, {
        medicineName: medicine.medicineName.trim(),
        price: medicine.price,
        quantity: medicine.quantity,
      });
      if (response.success) {
        enqueueSnackbar("Chỉnh sửa thuốc thành công", { variant: "success" });
        setOpenDialogForm(false);
        handleGetMedicines();
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
    setAddButtonClicked(false);
  }

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
                Danh sách thuốc
              </Typography>
              <CustomButton
                color="normal1"
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setAddNew(true);
                  setMedicine({
                    medicineName: "",
                    price: 1000,
                    quantity: 1,
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
              <SearchMedicineList
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
              <MedicineTable
                count={totalItems ? totalItems : 0}
                items={medicines}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
                handleGetMedicines={handleGetMedicines}
                setMedicine={setMedicine}
                setAddNew={setAddNew}
                setOpenDialogForm={setOpenDialogForm}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
      {/* )} */}

      <DialogForm
        cancelText={"Hủy"}
        okText={addNew ? "Thêm" : "Cập nhật"}
        onCancel={() => {
          setOpenDialogForm(false);
          setAddButtonClicked(false);
          setMedicine({
            medicineName: "",
            price: 1000,
            quantity: 1,
          });
        }}
        onOk={handleCreateUpdateMedicine}
        open={openDialogForm}
        title={addNew ? "Thêm thuốc" : "Chỉnh sửa thông tin thuốc"}
        onClose={() => {
          setOpenDialogForm(false);
          setAddButtonClicked(false);
        }}
      >
        <Stack width={"30rem"} mt={1} spacing={3}>
          <MuiTextFeild
            label={"Tên thuốc"}
            autoFocus
            autoComplete="off"
            value={medicine.medicineName}
            onChange={(e) => {
              setMedicine((prev) => ({
                ...prev,
                medicineName: e.target.value,
              }));
            }}
            required
            error={medicine.medicineName?.trim() === "" && addButtonClicked}
            helperText={
              medicine.medicineName?.trim() === "" && addButtonClicked && "Tên thuốc không được để trống"
            }
          />
          <MuiTextFeild
            type="number"
            label="Giá thuốc"
            autoFocus
            autoComplete="off"
            InputProps={{ inputProps: { min: 1000 } }}
            value={medicine.price ? medicine.price.toString() : "0"}
            onChange={(e) => {
              setMedicine((prev) => ({
                ...prev,
                price: e.target.value ? parseInt(e.target.value) : 0,
              }));
            }}
            required
            error={medicine.price === 0 && addButtonClicked}
            helperText={
              medicine.price === 0 && addButtonClicked &&
              "Giá thuốc phải lớn hơn 0"
            }
          />
          <MuiTextFeild
            type="number"
            label="Số lượng"
            autoFocus
            autoComplete="off"
            InputProps={{ inputProps: { min: 1000 } }}
            value={medicine.quantity ? medicine.quantity.toString() : "1000"}
            onChange={(e) => {
              setMedicine((prev) => ({
                ...prev,
                quantity: e.target.value ? parseInt(e.target.value) : 1000,
              }));
            }}
            required
            error={medicine.quantity === 0 && addButtonClicked}
            helperText={
              medicine.quantity === 0 && addButtonClicked &&
              "Số lượng thuốc phải lớn hơn 0"
            }
          />
        </Stack >
      </DialogForm >
    </>
  );
}

export default MedicineListPage;
