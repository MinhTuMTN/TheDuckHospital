import styled from "@emotion/styled";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormatCurrency from "../../General/FormatCurrency";
import FormatDate from "../../General/FormatDate";

const paymentTypes = [
  {
    value: "BOOKING",
    name: "Đặt khám",
  },
  {
    value: "MEDICAL_TEST",
    name: "Xét nghiệm",
  },
  {
    value: "TOP_UP",
    name: "Nạp tiền ví",
  },
  {
    value: "REFUND",
    name: "Hoàn tiền",
  },
  {
    value: "ADVANCE_FEE",
    name: "Tạm ứng",
  },
  {
    value: "DISCHARGE",
    name: "Xuất viện",
  },
];

const transactionStatus = [
  {
    status: "PENDING",
    label: "Chờ xử lý",
    color: "template.normal2",
  },
  {
    status: "SUCCESS",
    label: "Thành công",
    color: "#00C58D",
  },
  {
    status: "FAILED",
    label: "Thất bại",
    color: "#c52700",
  },
];

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
  const navigate = useNavigate();
  const { row } = props;
  const [anchorEl, setAnchorEl] = useState(null);
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
            {row.paymentType === "BOOKING"
              ? row.userName
              : row.paymentType === "MEDICAL_TEST"
              ? row.medicalTestResponse?.patientProfile?.fullName
              : row.paymentType === "TOP_UP" || row.paymentType === "REFUND"
              ? row.accountUserName
              : row.paymentType === "ADVANCE_FEE"
              ? row.patientName
              : "Đang cập nhật"}
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
            <FormatCurrency amount={row.amount} />
          </CustomText>
        </TableCell>
        <TableCell align="center">
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {
              paymentTypes.find(
                (paymentType) => paymentType.value === row.paymentType
              )?.name
            }
          </CustomText>
        </TableCell>
        <TableCell align="center">
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.paymentMethod}
          </CustomText>
        </TableCell>
        <TableCell align="center">
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            <FormatDate dateTime={row.createdAt} />
          </CustomText>
        </TableCell>
        <TableCell align="right">
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon
              sx={{
                fontSize: 10,
                color: transactionStatus.find((s) => s.status === row.status)
                  .color,
              }}
            />
            <CustomText>
              {transactionStatus.find((s) => s.status === row.status).label}
            </CustomText>
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
                        navigate(
                          `/admin/transaction-management/${row.transactionId}`
                        );
                      }}
                    >
                      Xem
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
                    navigate(
                      `/admin/transaction-management/${row.transactionId}`
                    );
                  }}
                >
                  <InfoOutlinedIcon color="black" />
                </IconButton>
              </>
            )}
          </>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function TransactionTable(props) {
  const { count, onPageChange, onRowsPerPageChange, page, rowsPerPage, items } =
    props;

  return (
    <>
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
                <TableCell style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Tài khoản
                  </CustomText>
                </TableCell>
                <TableCell align="right" style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Tổng thanh toán
                  </CustomText>
                </TableCell>
                <TableCell align="right" style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Loại thanh toán
                  </CustomText>
                </TableCell>
                <TableCell align="center" style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Phương thức
                  </CustomText>
                </TableCell>
                <TableCell align="center" style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Ngày tạo
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Trạng thái
                  </CustomText>
                </TableCell>
                <TableCell align="center" style={{ width: "10%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Tùy chọn
                  </CustomText>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.slice(0, rowsPerPage).map((row, index) => (
                <Row key={index} row={row} />
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

TransactionTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default TransactionTable;
