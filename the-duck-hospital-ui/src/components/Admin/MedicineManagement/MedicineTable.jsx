import styled from "@emotion/styled";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@emotion/react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import FormatCurrency from "../../General/FormatCurrency";
import { enqueueSnackbar } from "notistack";
import { deleteMedicine, restoreMedicine } from "../../../services/admin/MedicineServices";
import DialogConfirm from "../../General/DialogConfirm";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

function useCustomMediaQuery() {
  const isLargeScreen = useMediaQuery("(min-width: 850px)");
  const isMediumScreen = useMediaQuery("(min-width: 750px)");

  return useMemo(() => {
    if (isLargeScreen) {
      return "300px";
    } else if (isMediumScreen) {
      return "150px";
    } else {
      return "50px";
    }
  }, [isLargeScreen, isMediumScreen]);
}

function Row(props) {
  const { row, handleGetMedicines, setMedicine, setAddNew, setOpenDialogForm } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [medicineId, setMedicineId] = useState();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxWidth = useCustomMediaQuery();

  const handleDeleteButtonClick = async () => {
    let response;
    if (row.deleted) {
      response = await restoreMedicine(medicineId);
      if (response.success) {
        enqueueSnackbar("Mở khóa thuốc thành công!", { variant: "success" });
        handleGetMedicines();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else {
      response = await deleteMedicine(medicineId);
      if (response.success) {
        enqueueSnackbar("Khóa thuốc thành công!", { variant: "success" });
        handleGetMedicines();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.medicineName}
          </CustomText>
        </TableCell>
        <TableCell align="right">
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            <FormatCurrency amount={row.price} />
          </CustomText>
        </TableCell>
        <TableCell align="right">
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.quantity}
          </CustomText>
        </TableCell>
        <TableCell align="center">
          <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"center"}>
            <CircleIcon
              sx={{
                fontSize: 10,
                color: row.deleted ? "#c52700" : "#00C58D",
              }}
            />
            <CustomText>{row.deleted ? "Ngưng hoạt động" : "Còn hoạt động"}</CustomText>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <>
            {isSmallScreen ? (
              // Hiển thị cho màn hình nhỏ
              <>
                <IconButton
                  color="black"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <MoreVertIcon color="black" />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Stack direction={"column"}>
                    <Button
                      variant="text"
                      size="medium"
                      sx={{
                        paddingX: 2,
                        paddingY: 1,
                        textAlign: "left",
                      }}
                      onClick={(e) => {
                        setMedicine({
                          medicineId: row.medicineId,
                          medicineName: row.medicineName,
                          price: row.price,
                          quantity: row.quantity
                        });
                        setAddNew(false);
                        setOpenDialogForm(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="text"
                      size="medium"
                      sx={{
                        paddingX: 2,
                        paddingY: 1,
                        textAlign: "left",
                      }}
                      onClick={(e) => {
                        setMedicineId(row.medicineId);
                        setDeleteDialog(true);
                      }}
                    >
                      {row.deleted ? "Mở khóa" : "Khóa"}
                    </Button>
                  </Stack>
                </Popover>
              </>
            ) : (
              // Hiển thị cho màn hình vừa và lớn
              <>
                <IconButton
                  color="black"
                  onClick={(e) => {
                    setMedicine({
                      medicineId: row.medicineId,
                      medicineName: row.medicineName,
                      price: row.price,
                      quantity: row.quantity
                    });
                    setAddNew(false);
                    setOpenDialogForm(true);
                  }}
                >
                  <ModeEditIcon color="black" />
                </IconButton>
                <IconButton
                  color="black"
                  onClick={(e) => {
                    setMedicineId(row.medicineId);
                    setDeleteDialog(true);
                  }}
                >
                  {row.deleted ?
                    <RestoreFromTrashOutlinedIcon color="black" /> :
                    <DeleteOutlinedIcon color="black" />}
                </IconButton>
              </>
            )}
          </>
        </TableCell>
        <DialogConfirm
          open={deleteDialog}
          title={row.deleted ? "Mở khóa thuốc" : "Khóa thuốc"}
          content={
            row.deleted
              ? "Bạn có chắc chắn muốn mở khóa thuốc này?"
              : "Bạn có chắc chắn muốn khóa thuốc này?"
          }
          okText={row.deleted ? "Khôi phục" : "Khóa"}
          cancelText={"Hủy"}
          onOk={handleDeleteButtonClick}
          onCancel={() => setDeleteDialog(false)}
          onClose={() => setDeleteDialog(false)}
        />
      </TableRow>
    </React.Fragment>
  );
}

function MedicineTable(props) {
  const {
    count,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    items,
    handleGetMedicines,
    setMedicine,
    setAddNew,
    setOpenDialogForm
  } = props;

  return (
    <>
      <Box paddingX={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Table
            sx={{
              "& .MuiTableCell-sizeMedium": {
                paddingX: "20px !important",
              },
            }}
          >
            <TableHead
              sx={{
                bgcolor: "#F5F6FA",
              }}
            >
              <TableRow>
                <TableCell style={{ width: "20%" }}>
                  <CustomText
                    style={{ fontWeight: "500" }}
                    color={"#101828"}
                  >
                    Tên
                  </CustomText>
                </TableCell>
                <TableCell align="right" style={{ width: "15%" }}>
                  <CustomText
                    style={{ fontWeight: "500" }}
                    color={"#101828"}
                  >
                    Giá
                  </CustomText>
                </TableCell>
                <TableCell align="right" style={{ width: "15%" }}>
                  <CustomText
                    style={{ fontWeight: "500" }}
                    color={"#101828"}
                  >
                    Số lượng
                  </CustomText>
                </TableCell>
                <TableCell align="center" style={{ width: "30%" }}>
                  <CustomText
                    style={{ fontWeight: "500" }}
                    color={"#101828"}
                  >
                    Trạng thái
                  </CustomText>
                </TableCell>
                <TableCell align="center" style={{ width: "20%" }}>
                  <CustomText
                    style={{ fontWeight: "500" }}
                    color={"#101828"}
                  >
                    Tùy chọn
                  </CustomText>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.slice(0, rowsPerPage).map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  handleGetMedicines={handleGetMedicines}
                  setMedicine={setMedicine}
                  setAddNew={setAddNew}
                  setOpenDialogForm={setOpenDialogForm}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </>
  );
}

export default MedicineTable;
