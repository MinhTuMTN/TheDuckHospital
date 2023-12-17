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
import SearchDepartmentList from "../../../components/Admin/DepartmentManagement/SearchDepartmentList";
import DialogForm from "../../../components/General/DialogForm";
import MuiTextFeild from "../../../components/General/MuiTextFeild";
import DepartmentTable from "../../../components/Admin/DepartmentManagement/DepartmentTable";
import {
  addDepartment,
  getPaginationDepartments,
} from "../../../services/admin/DepartmentServices";
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

function DepartmentListPage(props) {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [enterPressed, setEnterPressed] = useState(true);
  const [pageChange, setPageChange] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
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

  const handleGetDepartments = useCallback(async () => {
    if (!enterPressed) return;
    const response = await getPaginationDepartments({
      search: search.trim(),
      page: pageChange ? page - 1 : 0,
      limit: limit,
    });
    if (response.success) {
      setDepartments(response.data.data.departments);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setEnterPressed(false);
    setPageChange(false);
  }, [search, page, limit, enterPressed, pageChange]);

  useEffect(() => {
    handleGetDepartments();
  }, [handleGetDepartments]);

  const handleEnterKeyPressed = (event) => {
    if (event.key === "Enter" && event.target === document.activeElement) {
      setEnterPressed(true);
    }
  }

  const handleAddDepartment = async () => {
    setAddButtonClicked(true);
    if (department.departmentName?.trim() === "") {
      enqueueSnackbar("Tên khoa không được để trống", { variant: "error" });
      return;
    }

    const response = await addDepartment({
      departmentName: department.departmentName,
      description: department.description,
    });
    if (response.success) {
      enqueueSnackbar("Thêm khoa thành công!", { variant: "success" });
      setOpenDialogForm(false);
      handleGetDepartments();
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
                Danh sách khoa
              </Typography>
              <CustomButton
                color="normal2"
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setDepartment({
                    departmentName: "",
                    description: "",
                  });
                  setOpenDialogForm(true);
                  setAddButtonClicked(false);
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
              <SearchDepartmentList
                value={search}
                onChange={setSearch}
                handleEnterKeyPressed={handleEnterKeyPressed}
              />
              <DepartmentTable
                count={totalItems ? totalItems : 0}
                items={departments}
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
          setDepartment({
            departmentName: "",
            description: "",
          });
          setAddButtonClicked(false);
        }}
        onOk={handleAddDepartment}
        open={openDialogForm}
        title={"Thêm khoa"}
        onClose={() => {
          setOpenDialogForm(false);
          setDepartment({
            departmentName: "",
            description: "",
          });
          setAddButtonClicked(false);
        }}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
          <MuiTextFeild
            label={"Tên khoa"}
            autoFocus
            autoComplete="off"
            value={department.departmentName}
            onChange={(e) => {
              setDepartment((prev) => ({
                ...prev,
                departmentName: e.target.value,
              }));
            }}
            required
            error={department.departmentName?.trim() === "" && addButtonClicked}
            helperText={
              department.departmentName?.trim() === "" && addButtonClicked &&
              "Tên khoa không được để trống"
            }
          />
          <MuiTextFeild
            label="Mô tả"
            value={department.description}
            autoComplete="off"
            multiline
            rows={4}
            onChange={(e) => {
              setDepartment((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </Stack>
      </DialogForm>
    </>
  );
}

export default DepartmentListPage;
