import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React from "react";
import Barcode from "react-barcode";
import { useNavigate, useParams } from "react-router-dom";
import CustomLi from "../../components/Customer/BookingItemPage/CustomLi";
import CustomLink from "../../components/General/CustomLink";
import { getBookingById } from "../../services/customer/BookingServices";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function BookingItemPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { medicalBillId } = useParams();
  const [medicalBill, setMedicalBill] = React.useState({});
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleGetMedicalBill = async () => {
      const response = await getBookingById(medicalBillId);
      if (response.success) setMedicalBill(response.data.data);
      else
        enqueueSnackbar("Lỗi lấy dữ liệu phiếu khám bệnh", {
          variant: "error",
        });
    };
    handleGetMedicalBill();
  }, [medicalBillId]);

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

      <Grid
        item
        container
        xs={12}
        style={{
          paddingRight: isMdUp ? "20px" : "0",
          textAlign: "left",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Grid item xs={6}>
          <CustomButton
            variant="text"
            sx={{
              "&:hover": {
                backgroundColor: "	#ffffff",
              },
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon
              sx={{
                marginRight: "5px",
              }}
            />
            Quay lại
          </CustomButton>
        </Grid>
      </Grid>

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
                value={medicalBill.bookingCode?.toUpperCase() || "0000000000"}
                width={1.2}
                height={80}
                margin={0}
                fontSize={14}
              />
              <Box
                sx={{
                  backgroundColor: medicalBill.status
                    ? "#3bb54a"
                    : "template.normal1",
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
                {medicalBill.status ? "Đã khám" : "Chưa khám"}
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
                  {medicalBill.queueNumber < 10
                    ? "0" + medicalBill.queueNumber
                    : medicalBill.queueNumber}
                </Typography>
              </Stack>
              <ul style={{ width: "100%" }}>
                <CustomLi
                  lableName="Mã phiếu"
                  uppercase
                  value={medicalBill.bookingCode}
                />
                <CustomLi lableName="Dịch vụ" value="Khám dịch vụ" />
                <CustomLi lableName="Khu vực" value={medicalBill.roomArea} />
                <CustomLi lableName="Phòng khám" value={medicalBill.roomName} />
                <CustomLi
                  lableName="Chuyên khoa"
                  value={medicalBill.departmentName}
                />
                <CustomLi lableName="Bác sĩ" value={medicalBill.doctorName} />
                <CustomLi
                  lableName="Ngày khám"
                  value={dayjs(medicalBill.date).format("DD/MM/YYYY")}
                  color="#1abc9c"
                />
                <CustomLi
                  lableName="Buổi khám"
                  value={
                    medicalBill.scheduleType === "MORING" ? "Sáng" : "Chiều"
                  }
                  color="#1abc9a"
                />
                <CustomLi
                  lableName="Phí khám"
                  value={medicalBill.price}
                  currency
                />
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
                <CustomLi
                  lableName="Bệnh nhân:"
                  value={medicalBill.patientName}
                />
                <CustomLi
                  lableName="Ngày sinh:"
                  value={dayjs(medicalBill.patientDateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
                />
                <CustomLi
                  lableName="Mã bệnh nhân:"
                  value={
                    medicalBill.patientCode
                      ? medicalBill.patientCode
                      : "Chưa cập nhật"
                  }
                />
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
