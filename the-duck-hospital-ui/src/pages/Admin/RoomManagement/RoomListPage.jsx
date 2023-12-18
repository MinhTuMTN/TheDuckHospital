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
import SearchRoomList from "../../../components/Admin/RoomManagement/SearchRoomList";
import DialogForm from "../../../components/General/DialogForm";
import MuiTextFeild from "../../../components/General/MuiTextFeild";
import RoomTable from "../../../components/Admin/RoomManagement/RoomTable";
import {
  addRoom,
  getPaginationRooms,
} from "../../../services/admin/RoomServices";
import { enqueueSnackbar } from "notistack";
import { getAllDepartments } from "../../../services/admin/DepartmentServices";

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

function RoomListPage(props) {
  const [search, setSearch] = useState("");
  const [enterPressed, setEnterPressed] = useState(true);
  const [pageChange, setPageChange] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [room, setRoom] = useState({
    roomName: "",
    departmentId: "",
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

  const handleGetRooms = useCallback(async () => {
    if (!enterPressed) return;
    const response = await getPaginationRooms({
      search: search.trim(),
      page: pageChange ? page - 1 : 0,
      limit: limit,
    });
    if (response.success) {
      setRooms(response.data.data.rooms);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setEnterPressed(false);
    setPageChange(false);
  }, [search, page, limit, enterPressed, pageChange]);

  useEffect(() => {
    handleGetRooms();
  }, [handleGetRooms]);

  const handleEnterKeyPressed = (event) => {
    if (event.key === "Enter" && event.target === document.activeElement) {
      setEnterPressed(true);
    }
  }

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
    setAddButtonClicked(true);
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
      departmentId: room.departmentId,
    });
    if (response.success) {
      enqueueSnackbar("Thêm phòng thành công!", { variant: "success" });
      setOpenDialogForm(false);
      handleGetRooms();
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
                Danh sách phòng
              </Typography>
              <CustomButton
                color="normal2"
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setRoom({
                    roomName: "",
                    departmentId: "",
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
              <SearchRoomList
                value={search}
                onChange={setSearch}
                handleEnterKeyPressed={handleEnterKeyPressed}
              />
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
          setAddButtonClicked(false);
        }}
        onOk={handleAddRoom}
        open={openDialogForm}
        title={"Thêm phòng"}
        onClose={() => {
          setRoom({
            roomName: "",
            departmentId: "",
            description: "",
          });
          setOpenDialogForm(false);
          setAddButtonClicked(false);
        }}
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
            error={room.roomName?.trim() === "" && addButtonClicked}
            helperText={
              room.roomName?.trim() === "" && "Tên phòng không được để trống" && addButtonClicked
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
                color: room.departmentId === "" && addButtonClicked ? "red" : "",
              }}
            >
              Khoa
            </CustomTypography>

            <FormControl fullWidth error={room.departmentId === "" && addButtonClicked}>
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
                  <MenuItem key={index} value={item.departmentId}>
                    <Typography style={{ fontSize: "16px" }}>
                      {item.departmentName}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              {room.departmentId === "" && addButtonClicked && (
                <FormHelperText>Khoa không được để trống</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Stack>
      </DialogForm>
    </>
  );
}

export default RoomListPage;
