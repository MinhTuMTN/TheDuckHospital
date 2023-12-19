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
import SearchMedicineList from "../../../components/Admin/MedicineManagement/SearchMedicineList";
import MedicineTable from "../../../components/Admin/MedicineManagement/MedicineTable";
import DialogForm from "../../../components/General/DialogForm";
import MuiTextFeild from "../../../components/General/MuiTextFeild";
import { createMedicine, getPaginationMedicines, updateMedicine } from "../../../services/admin/MedicineServices";
import { enqueueSnackbar } from "notistack";

const medicineUnit = [
  {
    value: "TUBE",
    label: "Tuýp",
  },
  {
    value: "BOTTLE",
    label: "Chai",
  },
  {
    value: "BOX",
    label: "Hộp",
  },
  {
    value: "BAG",
    label: "Túi",
  },
  {
    value: "CAPSULE",
    label: "Viên",
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

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "2px !important",
}));

function MedicineListPage(props) {
  const [search, setSearch] = useState("");
  const [enterPressed, setEnterPressed] = useState(true);
  const [pageChange, setPageChange] = useState(false);
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
    unit: "CAPSULE",
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    setPageChange(true);
    setEnterPressed(true);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
    setEnterPressed(true);
  };

  const handleGetMedicines = useCallback(async () => {
    if (!enterPressed) return;
    const response = await getPaginationMedicines({
      search: search.trim(),
      page: pageChange ? page - 1 : 0,
      limit: limit,
    });
    if (response.success) {
      setMedicines(response.data.data.medicines);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setEnterPressed(false);
    setPageChange(false);
  }, [search, page, limit, enterPressed, pageChange]);

  useEffect(() => {
    handleGetMedicines();
  }, [handleGetMedicines]);

  const handleCreateUpdateMedicine = async () => {
    setAddButtonClicked(true);

    if (medicine.medicineName?.trim() === "" ||
      medicine.price === null ||
      medicine.quantity === null ||
      medicine.unit === ""
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
        unit: medicine.unit,
      });
      if (response.success) {
        enqueueSnackbar("Thêm thuốc thành công", { variant: "success" });
        setOpenDialogForm(false);
        setEnterPressed(true);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    } else {
      const response = await updateMedicine(medicine.medicineId, {
        medicineName: medicine.medicineName.trim(),
        price: medicine.price,
        quantity: medicine.quantity,
        unit: medicine.unit,
      });
      if (response.success) {
        enqueueSnackbar("Chỉnh sửa thuốc thành công", { variant: "success" });
        setOpenDialogForm(false);
        setEnterPressed(true);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
    setAddButtonClicked(false);
  }

  const handleEnterKeyPressed = (event) => {
    if (event.key === "Enter" && event.target === document.activeElement) {
      setEnterPressed(true);
    }
  }

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
                    unit: "CAPSULE",
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
                handleEnterKeyPressed={handleEnterKeyPressed}
              />
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
            unit: "CAPSULE",
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
          <Box>
            <CustomTypography
              variant="body1"
              style={{
                color: medicine.unit === "" && addButtonClicked ? "red" : "",
              }}
            >
              Đơn vị
            </CustomTypography>
            <FormControl fullWidth error={medicine.unit === "" && addButtonClicked}>
              <Select
                value={medicine.unit}
                onChange={(e) =>
                  setMedicine((prev) => {
                    return {
                      ...prev,
                      unit: e.target.value,
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
                {medicineUnit?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {medicine.unit === "" && addButtonClicked && (
                <FormHelperText>Đơn vị không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Stack >
      </DialogForm >
    </>
  );
}

export default MedicineListPage;
