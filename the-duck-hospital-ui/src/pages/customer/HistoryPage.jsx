import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import HistoryDetail from "../../components/Customer/History/HistoryDetail";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
const patientInfo = {
  patient: [
    {
      patientCode: "BN001",
      fullName: "Trần Thị Kim Tuyết",
      dateOfBirth: "20/10/1999",
      address: "1 Võ Văn Ngân, Thủ Đức, TP.HCM",
    },
    // Add more patient objects as needed
  ],
};

function HistoryPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Lịch sử khám bệnh</CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 35 : 2,
        py: 4,
        backgroundColor: "#E8F2F7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            paddingRight: isMdUp ? "20px" : "0",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            variant="text"
            sx={{
              "&:hover": {
                backgroundColor: "	#ffffff",
              },
            }}
            onClick={() => {
              navigate("/");
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
        <Grid item xs={12}>
          <HistoryDetail
            diagnostic={"Bình thường"}
            doctorName={"Nguyễn Trần Thi Uyên"}
            departmentName={"Khoa nội"}
            patientInfo={patientInfo}
            prescriptionItems={[
              {
                medicineName: "Thuốc A",
                quantity: 1,
                unit: "Viên",
                usage: "Uống",
                note: "Sau bữa ăn",
              },
              {
                medicineName: "Thuốc B",
                quantity: 1,
                unit: "Viên",
                usage: "Uống",
                note: "Sau bữa ăn",
              },
              {
                medicineName: "Thuốc C",
                quantity: 1,
                unit: "Viên",
                usage: "Uống",
                note: "Sau bữa ăn",
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HistoryPage;
