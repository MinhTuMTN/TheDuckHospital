import {
  Box,
  Breadcrumbs,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Barcode from "react-barcode";
import CustomLink from "../../components/General/CustomLink";
import styled from "@emotion/styled";
import CustomLi from "../../components/Customer/BookingItemPage/CustomLi";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

function BookingItemPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const breakcrumbs = [
    <CustomLink to={"/"} key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={2}>
      Thông tin phiếu khám bệnh
    </CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        backgroundColor: "#E8F2F7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Box
        sx={{
          padding: "20px 0px",
          backgroundColor: "#e8f2f7",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: "360px",
            margin: "auto",
            padding: "3px 20px",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "20px",
              lineHeight: "1.3rem",
              borderTop: "2px dashed #f0f2f5",
              color: "#3e3e3e",
              position: "relative",
              "&::before": {
                left: "-40px",
                content: "''",
                position: "absolute",
                top: "-20px",
                width: "35px",
                height: "35px", // Adjust the height as needed
                backgroundColor: "#e8f2f7",
                borderRadius: "50%",
              },
              "&::after": {
                right: "-40px",
                content: "''",
                position: "absolute",
                top: "-20px",
                width: "35px",
                height: "35px", // Adjust the height as needed
                backgroundColor: "#e8f2f7",
                borderRadius: "50%",
              },
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "1em",
                  marginTop: "0",
                }}
              >
                Phiếu khám bệnh
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "700",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                The Duck Hospital
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "300",
                  fontSize: "13px",
                }}
              >
                1 Võ Văn Ngân, phường Linh Chiểu, Thủ Đức, TP.HCM
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              sx={{
                margin: "20px 0",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "700",
                  fontSize: "14px",
                  marginBottom: "1em",
                }}
              >
                Mã phiếu
              </Typography>
              <Barcode
                value="123456789"
                width={1.2}
                height={"80px"}
                margin={0}
                fontSize={"14px"}
              />
              <Box
                sx={{
                  backgroundColor: "#3bb54a",
                  fontSize: "14px",
                  display: "inline-block",
                  padding: "10px 25px",
                  lineHeight: 1,
                  textAlign: "center",
                  borderRadius: "20px",
                  color: "#fff",
                  vẻticalAlign: "baseline",
                  margin: "20px",
                }}
              >
                Đã khám
              </Box>
            </Stack>
            <Box
              sx={{
                padding: "20px 0px",
                borderTop: "2px dashed #f0f2f5",
                position: "relative",
                "&::before": {
                  left: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
                "&::after": {
                  right: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
              }}
            >
              <Stack direction={"column"} textAlign={"center"}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", fontSize: "14px", marginBottom: 1 }}
                >
                  Số thứ tự tiếp nhận
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    color: "#00b5f1",
                    fontSize: "60px",
                    paddingTop: "20px",
                    paddingBottom: "45px",
                    lineHeight: "1.3rem",
                  }}
                >
                  07
                </Typography>
              </Stack>
              <ul style={{ width: "100%" }}>
                <CustomLi lableName="Mã phiếu" value="A2134678" />
                <CustomLi lableName="Dịch vụ" value="Khám dịch vụ" />
                <CustomLi lableName="Phòng khám" value="Phòng 77" />
                <CustomLi lableName="Chuyên khoa" value="Tâm thần kinh" />
                <CustomLi lableName="Bác sĩ" value="Hứa Thị Ngọc Hà" />
                <CustomLi lableName="Ngày khám" value="20/10/2021" />
                <CustomLi lableName="Buổi khám" value="Sáng" />
                <CustomLi lableName="Phí khám" value="150000" />
              </ul>
            </Box>
            <Box
              sx={{
                padding: "20px 0px",
                borderTop: "2px dashed #f0f2f5",
                position: "relative",
                "&::before": {
                  left: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
                "&::after": {
                  right: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
              }}
            >
              <ul style={{ width: "100%" }}>
                <CustomLi lableName="Bệnh nhân:" value="NGUYỄN NGỌC TUYẾT VI" />
                <CustomLi lableName="Ngày sinh:" value="12/01/2001" />
                <CustomLi lableName="Mã bệnh nhân:" value="Chưa cập nhật" />
              </ul>
            </Box>
            <Box
              sx={{
                paddingTop: "20px",
                borderTop: "2px dashed #f0f2f5",
                position: "relative",
                "&::before": {
                  left: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
                "&::after": {
                  right: "-40px",
                  content: "''",
                  position: "absolute",
                  top: "-20px",
                  width: "35px",
                  height: "35px", // Adjust the height as needed
                  backgroundColor: "#e8f2f7",
                  borderRadius: "50%",
                },
              }}
            >
              <Stack direction={"column"} textAlign={"center"}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Bản quyền thuộc về{" "}
                  <span
                    style={{
                      color: "#00b5f1",
                    }}
                  >
                    The Duck Hospital
                  </span>
                </Typography>
                <Box
                  sx={{
                    fontWeight: "500",
                    fontSize: "11px",
                    textAlign: "center",
                    paddingBottom: "20px",
                    borderBottom: "2px dashed #f0f2f5",
                    "&::before": {
                      left: "-40px",
                      content: "''",
                      position: "absolute",
                      bottom: "-20px",
                      width: "35px",
                      height: "35px", // Adjust the height as needed
                      backgroundColor: "#e8f2f7",
                      borderRadius: "50%",
                    },
                    "&::after": {
                      right: "-40px",
                      content: "''",
                      position: "absolute",
                      bottom: "-20px",
                      width: "35px",
                      height: "35px", // Adjust the height as needed
                      backgroundColor: "#e8f2f7",
                      borderRadius: "50%",
                    },
                  }}
                >
                  Phiên bản 1.0.0
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingItemPage;
