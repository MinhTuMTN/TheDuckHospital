import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Paper,
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
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

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

const scheduleTypes = [
  {
    key: "MORNING",
    value: "Buổi sáng",
  },
  {
    key: "AFTERNOON",
    value: "Buổi chiều",
  }
]

function Row(props) {
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
            {row.doctorName}
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
            {scheduleTypes.find(type => type.key === row.scheduleType).value}
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
            {row.numberOfBookings}
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
            {row.slot - row.numberOfBookings}
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
            {row.queueNumber}
          </CustomText>
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
                    // onClick={(e) => {
                    //   navigate(`/admin/product-management/${row.productId}`, {
                    //     state: {
                    //       id: row.productId,
                    //     },
                    //   });
                    // }}
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
                // onClick={(e) => {
                //   navigate(`/admin/product-management/${row.productId}`, {
                //     state: {
                //       id: row.productId,
                //     },
                //   });
                // }}
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

function ScheduleTable(props) {
  const { items } = props;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper>
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
                <TableCell style={{ width: "25%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Họ tên
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Số điện thoại
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "15%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Buổi trực
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Đặt trước
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Chỗ còn lại
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Số hiện tại
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
              {items?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
}

ScheduleTable.propTypes = {
  items: PropTypes.array,
};

export default ScheduleTable;
