import styled from "@emotion/styled";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import DialogConfirm from "../../General/DialogConfirm";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { removeDoctorDepartment } from "../../../services/admin/DepartmentServices";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

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
  const { row, departmentId, departmentName } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxWidth = useCustomMediaQuery();

  const handleRemoveDoctorDepartment = async () => {
    const response = await removeDoctorDepartment(departmentId, doctorId);
    if (response.success) {
      enqueueSnackbar("Xóa bác sĩ khỏi khoa thành công", { variant: "success" });
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }

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
            {row.fullName}{row.headOfDepartment ? " (Trưởng khoa)" : ""}
          </CustomText>
        </TableCell>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.phoneNumber}
          </CustomText>
        </TableCell>
        <TableCell>

          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.identityNumber}
          </CustomText>
        </TableCell>
        <TableCell align="right">
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon
              sx={{
                fontSize: 10,
                color: row.deleted ? "#c52700" : "#00C58D",
              }}
            />
            <CustomText>{row.deleted ? "Ngưng hoạt động" : "Còn hoạt động"}</CustomText>
          </Stack>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            borderBottom: "none !important",
          }}
        >
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
                        navigate(`/admin/department-management/${departmentId}/staff/${row.staffId}`, {
                          state: {
                            departmentName: departmentName
                          }
                        });
                      }}
                    >
                      Xem
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
                        setDoctorId(row.staffId);
                        setDeleteDialog(true);
                      }}
                    >
                      Xóa
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
                    navigate(`/admin/department-management/${departmentId}/staff/${row.staffId}`, {
                      state: {
                        departmentName: departmentName,
                      }
                    });
                  }}
                >
                  <InfoOutlinedIcon color="black" />
                </IconButton>
                <IconButton
                  color="black"
                  onClick={(e) => {
                    setDoctorId(row.staffId);
                    setDeleteDialog(true);
                  }}
                >
                  <DeleteIcon color="black" />
                </IconButton>
              </>
            )}
          </>
        </TableCell>
      </TableRow>
      <DialogConfirm
        open={deleteDialog}
        title={"Xóa bác sĩ"}
        content={"Bạn có chắc chắn muốn xóa bác sĩ này khỏi khoa?"}
        okText={"Xóa"}
        cancelText={"Hủy"}
        onOk={handleRemoveDoctorDepartment}
        onCancel={() => setDeleteDialog(false)}
        onClose={() => setDeleteDialog(false)}
      />
    </React.Fragment>
  );
}

function DoctorTable(props) {
  const { items, setOpenPopup, handleGetAllDoctorNotInDepartment, departmentId, departmentName } = props;

  return (
    <>
      <Stack
        sx={{
          borderRadius: "15px",
          paddingTop: 1,
        }}
      >
        <BoxStyle>
          <Stack direction={"row"}>
            <TieuDe>Danh sách bác sĩ</TieuDe>
            <CustomButton
              color="normal2"
              variant="contained"
              size="medium"
              sx={{ width: "10%" }}
              onClick={() => {
                handleGetAllDoctorNotInDepartment();
                setOpenPopup(true);
              }}
            >
              Thêm
            </CustomButton>
          </Stack>

        </BoxStyle>
        <Box sx={{ width: "100%" }}>
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
                  <TableCell style={{ width: "30%" }}>
                    <CustomText
                      style={{ fontWeight: "500" }}
                      color={"#101828"}
                    >
                      Họ tên
                    </CustomText>
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <CustomText
                      style={{ fontWeight: "500" }}
                      color={"#101828"}
                    >
                      Số điện thoại
                    </CustomText>
                  </TableCell>
                  <TableCell style={{ width: "15%" }}>
                    <CustomText
                      style={{ fontWeight: "500" }}
                      color={"#101828"}
                    >
                      CCCD
                    </CustomText>
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <CustomText
                      style={{ fontWeight: "500" }}
                      color={"#101828"}
                    >
                      Trạng thái
                    </CustomText>
                  </TableCell>
                  <TableCell align="center" style={{ width: "15%" }}>
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
                {items?.map((row, index) => (
                  <Row key={index} row={row} departmentId={departmentId} departmentName={departmentName} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Stack>

    </>
  );
}

export default DoctorTable;
