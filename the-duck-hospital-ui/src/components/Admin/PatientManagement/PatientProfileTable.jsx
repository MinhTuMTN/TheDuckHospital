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
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import FormatDate from "../../General/FormatDate";
import { useNavigate } from "react-router-dom";

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
  const { row, patientId, patientName, userId, userName } = props;
  const navigate = useNavigate();
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
            {row.fullName}
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
            <FormatDate dateTime={row.createdAt} />
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
                        patientId ?
                          navigate(`/admin/patient-management/${patientId}/patient-profile/${row.patientProfileId}`, {
                            state: {
                              patientName: patientName,
                            }
                          }) :
                          navigate(`/admin/account-management/${userId}/patient-profile/${row.patientProfileId}`, {
                            state: {
                              userName: userName,
                            }
                          })
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
                    patientId ?
                      navigate(`/admin/patient-management/${patientId}/patient-profile/${row.patientProfileId}`, {
                        state: {
                          patientName: patientName,
                        }
                      }) :
                      navigate(`/admin/account-management/${userId}/patient-profile/${row.patientProfileId}`, {
                        state: {
                          userName: userName,
                        }
                      })
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

function PatientProfileTable(props) {
  const { items, patientId, patientName, userId, userName } = props;

  return (
    <>
      <Stack
        sx={{
          borderRadius: "15px",
          paddingTop: 1,
        }}
      >
        <BoxStyle>
          <TieuDe>Danh sách hồ sơ bệnh nhân</TieuDe>
        </BoxStyle>
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
                  <TableCell style={{ width: "20%" }}>
                    <CustomText
                      style={{ fontWeight: "500" }}
                      color={"#101828"}
                    >
                      Ngày tạo
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
                  <TableCell align="center" style={{ width: "10%" }}>
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
                  <Row
                    key={index}
                    row={row}
                    patientId={patientId}
                    patientName={patientName}
                    userId={userId}
                    userName={userName}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Stack>

    </>
  );
}

export default PatientProfileTable;
