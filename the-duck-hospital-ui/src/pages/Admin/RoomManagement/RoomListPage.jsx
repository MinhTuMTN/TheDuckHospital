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
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import SearchDepartmentList from "../../../components/Admin/DepartmentManagement/SearchDepartmentList";
import DialogForm from "../../../components/DialogForm";
import MuiTextFeild from "../../../components/MuiTextFeild";
import RoomTable from "../../../components/Admin/RoomManagement/RoomTable";
import { addRoom, getPaginationRooms } from "../../../services/admin/RoomServices";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../../services/admin/DepartmentServices";

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

function RoomListPage(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const [buttonClicked, setButtonClicked] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [room, setRoom] = useState({
    roomName: "",
    departmentId: "",
    description: "",
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  // useEffect(() => {
  //   setButtonClicked(true);
  // }, [page, limit]);

  useEffect(() => {
    const handleGetRooms = async () => {
      // if (!buttonClicked) return;
      const response = await getPaginationRooms({
        page: page - 1,
        limit: limit,
      });
      if (response.success) {
        setRooms(response.data.data.rooms);
        setTotalItems(response.data.data.total);
        setPage(response.data.data.page + 1);
        setLimit(response.data.data.limit);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      // setButtonClicked(false);
    }
    handleGetRooms();
  }, [page, limit]);

  useEffect(() => {
    const handleGetDepartment = async () => {
      const response = await getAllDepartments();
      if (response.success) {
        setDepartments(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    handleGetDepartment();
  }, []);

  const handleAddRoom = async () => {
    if (room.roomName?.trim() === "") {
      enqueueSnackbar("Tên phòng không được để trống", { variant: "error" });
      return;
    }

    if (room.departmentId === "" || room.departmentId === -1) {
      enqueueSnackbar("Khoa không được để trống", { variant: "error" });
      return;
    }

    const response = await addRoom({
      roomName: room.roomName,
      description: room.description,
      departmentId: room.departmentId
    });
    if (response.success) {
      enqueueSnackbar("Thêm phòng thành công!", { variant: "success" });
      setOpenDialogForm(false);
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
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
                Danh sách phòng
              </Typography>
              <CustomButton
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setRoom({
                    roomName: "",
                    departmentId: "",
                    description: "",
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
              <SearchDepartmentList
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
              <RoomTable
                count={totalItems ? totalItems : 0}
                items={rooms}
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
          setRoom({
            roomName: "",
            departmentId: "",
            description: "",
          });
          setOpenDialogForm(false);
        }}
        onOk={handleAddRoom}
        open={openDialogForm}
        title={"Thêm phòng"}
        onClose={() => setOpenDialogForm(false)}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
          <MuiTextFeild
            label={"Tên phòng"}
            autoFocus
            autoComplete="off"
            value={room.roomName}
            onChange={(e) => {
              setRoom((prev) => ({
                ...prev,
                roomName: e.target.value,
              }));
            }}
            required
            error={room.roomName?.trim() === ""}
            helperText={
              room.roomName?.trim() === "" &&
              "Tên phòng không được để trống"
            }
          />
          <MuiTextFeild
            label="Mô tả"
            value={room.description}
            autoComplete="off"
            multiline
            rows={4}
            onChange={(e) => {
              setRoom((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <Box>
            <CustomTypography
              variant="body1"
              style={{
                color: room.departmentId === "" ? "red" : "",
              }}
            >
              Khoa
            </CustomTypography>

            <FormControl
              fullWidth
              error={room.departmentId === ""}
            >
              <Select
                value={room.departmentId}
                onChange={(e) =>
                  setRoom((prev) => {
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
                  <MenuItem
                    key={index}
                    value={item.departmentId}
                  >
                    <Typography style={{ fontSize: "16px" }}>
                      {item.departmentName}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {room.departmentId === "" && <FormHelperText>Khoa không được để trống</FormHelperText>}
            </FormControl>
          </Box>
        </Stack>
      </DialogForm>
    </>
  );
}

export default RoomListPage;
