import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HistoryDetail from "../../components/Customer/History/HistoryDetail";
import { getHistoryMedicalRecordDetails } from "../../services/customer/MedicalRecordServices";
import { enqueueSnackbar } from "notistack";
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

function HistoryPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Lịch sử khám bệnh</CustomTextBreakcrumb>,
  ];

  const { medicalRecordId } = useParams();
  const [medicalRecord, setMedicalRecord] = useState({});
  useEffect(() => {
    const handleGetMedicalRecord = async () => {
      const response = await getHistoryMedicalRecordDetails(medicalRecordId);
      if (response.success) setMedicalRecord(response.data.data);
      else {
        enqueueSnackbar("Lấy thông tin lịch sử khám bệnh thất bại", {
          variant: "error",
        });
        navigate(-1);
      }
    };
    handleGetMedicalRecord();
  }, [medicalRecordId, navigate]);

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
        <Grid item xs={12}>
          <HistoryDetail
            diagnostic={medicalRecord?.diagnosis}
            doctorName={medicalRecord?.doctorName}
            departmentName={medicalRecord?.departmentName}
            patientInfo={medicalRecord?.patientProfile}
            prescriptionItems={medicalRecord?.prescriptionItems}
            reExaminationDate={medicalRecord?.reExaminationDate}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HistoryPage;
